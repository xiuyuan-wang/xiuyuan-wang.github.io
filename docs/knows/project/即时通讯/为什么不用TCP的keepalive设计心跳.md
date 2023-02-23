---
title: 即时通讯
date: 2023-02-21
---

### 为什么不用TCP的keepalive，用设计的心跳

为什么不用TCP的keepalive，用设计的心跳首先，WebSocket是基于TCP连接的，TCP连接有keepalive机制，检测双方是否正常，但是keepalive有一定的局限性:<br />
1.client异常挂死，此时keepalive机制无法反馈真实的client状态；
2.client 异常断电断网出现TCP假死keepalive并不能根本性解决问题，实际上互联网环境很不稳定；
3.ws在应用层，基于传输层，在ws中操作TCP也很不方便。封装就意味着易用性提高灵活性降低。

在另一篇文章中，找到了下面一段通俗易懂的话，也是为何TCP的keepalive不行的原因:<br />
如果正在通信，忽然一端异常掉线了 – 比如断电了什么的，这种tcp是能很快的知道对方掉线的，因为tcp有应答，就算只有一方发送，那也会有双向的通信，可以保证链路是通的，且对方在线。

但是，如果链路上没有数据正在发送，那tcp就搞不清楚对方是否在线了，你们之间的链路，是虚拟的，所以如果完全没有数据传输，tcp也搞不定这个事情。

回过来说，发送ping/pong，其实就是在链路上跑个数据，这样tcp就能搞清楚有没有掉线，没掉线更好，掉线了就能很快的响应过来

所以，既然有一方发送了数据，tcp知道了，不就行了吗？为啥还要回复一下，不是浪费么，，，但是tcp是还是tcp，上层协议可就一定还是websocket了，比如ws断开后，tcp被快速的占用了，，，所以有了ping，还得有pong

keepalive的特性，我们后面再说，这里只要知道，使用TCP的keepalive机制，是有问题的，所以，最好自己实现WebSocket的心跳机制。

作为浏览器客户端而言，大部分浏览器已经实现了WebSocket的心跳机制，所以，只要WebSocket的服务端发送了Ping消息，浏览器客户端会自动回复Pong消息，而且服务端如果不发送ping，在连接一段时间后，浏览器会自动断开连接，这些功能无需程序员手动实现。但是服务端需要手动发送Ping消息，还要判断是否收到pong消息，来判断浏览器客户端的存活状态。

而如果我们自己去实现WebSocket客户端的话，就需要手动实现pong的回复了。也需要判断是否定时收到ping的消息了。手动实现的好处就是在发送ping/pong的同时，可以携带一些其他的数据，来进行处理。

通常使用的tomcat-websocket，spring-websocket，都封装了pingmessage对象和pongmessage对象，我们可以直接用这些对象进行消息的发送。

setTimeout 和 setInterval 在浏览器不可见的时候（比如最小化的时候），不同的浏览器中设置不同的时间间隔的时候，其表现不一样。根据 当浏览器切换到其他标签页或者最小化时，你的js定时器还准时吗？
> 谷歌浏览器中，当页面处于不可见状态时，setInterval 的最小间隔时间会被限制为 1s。火狐浏览器的 setInterval 和谷歌特性一致，但是 ie 浏览器没有对不可见状态时的 setInterval 进行性能优化，不可见前后间隔时间不变。
> 在谷歌浏览器中，setTimeout在浏览器不可见状态下间隔低于1s的会变为1s，大于等于1s的会变成N+1s的间隔值。火狐浏览器下setTimeout的最小间隔时间会变为1s,大于等于1s的间隔不变。ie浏览器在不可见状态前后的间隔时间不变。


加强版的reconnectingwebsocket.js实现
``` javascript
(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module !== 'undefined' && module.exports){
        module.exports = factory();
    } else {
        global.PsWebSocket = factory();
    }
})(this, function () {
 
    if (!('WebSocket' in window)) {
        return;
    }
 
    function PsWebSocket(url, options) {
 
        // 默认设置
        var settings = {
 
            /** 是否记录调试信息. */
            debug: false,
 
            /** 是否在创建时自动连接 */
            automaticOpen: true,
 
            /** 自动重连等待时间. */
            reconnectInterval: 1000,
            /** 自动重连最长等待时间. */
            maxReconnectInterval: 30000,
            /** 自动重连增加的速度 */
            reconnectDecay: 1.5, 
            /** 等待连接的最长等待时间. */
            timeoutInterval: 2000,
 
            /** 重新连接的最大次数，为空则不限制 */
            maxReconnectAttempts: null
        }
        if (!options) { options = {}; } 
         
        for (var key in settings) {
            if (typeof options[key] !== 'undefined') {
                this[key] = options[key];
            } else {
                this[key] = settings[key];
            }
        }
        /** websocket地址，绝对地址，只读 */
        this.url = url;
        /** 重新连接次数，或最后一次成功 只读 */
        this.reconnectAttempts = 0;
 
        /**
         * 连接状态
         * 可能的值: WebSocket.CONNECTING, WebSocket.OPEN, WebSocket.CLOSING, WebSocket.CLOSED
         * 只读
         */
        this.readyState = WebSocket.CONNECTING;
  
 
        var self = this;
        var ws;
        var forcedClose = false;
        var timedOut = false;
        var eventTarget = document.createElement('div'); 
        eventTarget.addEventListener('open',       function(event) { self.onopen(event); });
        eventTarget.addEventListener('close',      function(event) { self.onclose(event); });
        eventTarget.addEventListener('connecting', function(event) { self.onconnecting(event); });
        eventTarget.addEventListener('message',    function(event) { self.onmessage(event); });
        eventTarget.addEventListener('error',      function(event) { self.onerror(event); });
 
  
 
        this.addEventListener = eventTarget.addEventListener.bind(eventTarget);
        this.removeEventListener = eventTarget.removeEventListener.bind(eventTarget);
        this.dispatchEvent = eventTarget.dispatchEvent.bind(eventTarget);
 
        /**
         * 兼容IE9-IE11 
         */
        function generateEvent(s, args) {
            var evt = document.createEvent("CustomEvent");
            evt.initCustomEvent(s, false, false, args);
            return evt;
        };
 
        /**
         * 打开连接 
         */
        this.open = function (reconnectAttempt) {
            ws = new WebSocket(self.url);
 
            if (reconnectAttempt) {
                if (this.maxReconnectAttempts && this.reconnectAttempts > this.maxReconnectAttempts) {
                    return;
                }
            } else {
                eventTarget.dispatchEvent(generateEvent('connecting'));
                this.reconnectAttempts = 0;
            }
 
            if (self.debug || PsWebSocket.debugAll) {
                console.debug('PsWebSocket', 'attempt-connect', self.url);
            }
 
            var localWs = ws;
            var timeout = setTimeout(function() {
                if (self.debug || PsWebSocket.debugAll) {
                    console.debug('PsWebSocket', 'connection-timeout', self.url);
                }
                timedOut = true;
                localWs.close();
                timedOut = false;
            }, self.timeoutInterval);
 
            ws.onopen = function(event) {
                clearTimeout(timeout);
                if (self.debug || PsWebSocket.debugAll) {
                    console.debug('PsWebSocket', 'onopen', self.url);
                }
                self.protocol = ws.protocol;
                self.readyState = WebSocket.OPEN;
                self.reconnectAttempts = 0;
                var e = generateEvent('open');
                e.isReconnect = reconnectAttempt;
                reconnectAttempt = false;
                eventTarget.dispatchEvent(e);
            };
 
            ws.onclose = function(event) {
                clearTimeout(timeout);
                ws = null;
                if (forcedClose) {
                    self.readyState = WebSocket.CLOSED;
                    eventTarget.dispatchEvent(generateEvent('close'));
                } else {
                    self.readyState = WebSocket.CONNECTING;
                    var e = generateEvent('connecting');
                    e.code = event.code;
                    e.reason = event.reason;
                    e.wasClean = event.wasClean;
                    eventTarget.dispatchEvent(e);
                    if (!reconnectAttempt && !timedOut) {
                        if (self.debug || PsWebSocket.debugAll) {
                            console.debug('PsWebSocket', 'onclose', self.url);
                        }
                        eventTarget.dispatchEvent(generateEvent('close'));
                    }
 
                    var timeout = self.reconnectInterval * Math.pow(self.reconnectDecay, self.reconnectAttempts);
                    setTimeout(function() {
                        self.reconnectAttempts  ;
                        self.open(true);
                    }, timeout > self.maxReconnectInterval ? self.maxReconnectInterval : timeout);
                }
            };
            ws.onmessage = function(event) {
                if (self.debug || PsWebSocket.debugAll) {
                    console.debug('PsWebSocket', 'onmessage', self.url, event.data);
                }
                var e = generateEvent('message');
                var  eobj = eval('('   event.data   ')');
                e.ResultCode=eobj.ResultCode;
                e.DeviceID=eobj.DeviceID;
                e.ErrorMsg=eobj.ErrorMsg;
                e.Command=eobj.Command;
                e.data = eobj.ResultData;
                eventTarget.dispatchEvent(e);
            };
            ws.onerror = function(event) {
                if (self.debug || PsWebSocket.debugAll) {
                    console.debug('PsWebSocket', 'onerror', self.url, event);
                }
                eventTarget.dispatchEvent(generateEvent('error'));
            };
        } 
        if (this.automaticOpen == true) {
            this.open(false);
        }
 
        /**
         * 发送消息. 
         */
        this.send = function(data) {
            if (ws) {
                if (self.debug || PsWebSocket.debugAll) {
                    console.debug('PsWebSocket', 'send', self.url, data);
                }
                return ws.send(data);
            } else {
                throw '状态错误：websocket未连接';
            }
        };
 
        /**
         * 关闭连接 
         */
        this.close = function(code, reason) {
            // Default CLOSE_NORMAL code
            if (typeof code == 'undefined') {
                code = 1000;
            }
            forcedClose = true;
            if (ws) {
                ws.close(code, reason);
            }
        };
 
        /**
         * 刷新 
         */
        this.refresh = function() {
            if (ws) {
                ws.close();
            }
        };
    }
 
    //连接websocket后触发
    PsWebSocket.prototype.onopen = function(event) {};
    //关闭websocket后触发
    PsWebSocket.prototype.onclose = function(event) {};
    //尝试连接时触发
    PsWebSocket.prototype.onconnecting = function(event) {};
     //收到消息后触发
    PsWebSocket.prototype.onmessage = function(event) {};
     //产生错误后触发
    PsWebSocket.prototype.onerror = function(event) {};
 
    
 
    PsWebSocket.debugAll = false;
 
    PsWebSocket.CONNECTING = WebSocket.CONNECTING;
    PsWebSocket.OPEN = WebSocket.OPEN;
    PsWebSocket.CLOSING = WebSocket.CLOSING;
    PsWebSocket.CLOSED = WebSocket.CLOSED;
 
    return PsWebSocket;
});
```
