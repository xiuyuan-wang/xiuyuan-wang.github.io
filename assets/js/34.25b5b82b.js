(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{287:function(n,a,e){"use strict";e.r(a);var t=e(14),s=Object(t.a)({},(function(){var n=this,a=n._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[a("p",[n._v("js处理的8种跨域方法\n")]),n._v(" "),a("p",[n._v("这里说的js跨域是指通过js在不同的域之间进行数据传输或通信，比如用ajax向一个不同的域请求数据，或者通过js获取页面中不同域的框架中(iframe)的数据。只要协议、域名、端口有任何一个不同，都被当作是不同的域。")]),n._v(" "),a("p",[n._v("特别注意两点：")]),n._v(" "),a("p",[n._v("#1、如果是协议和端口造成的跨域问题“前台”是无能为力的；\n#2、在跨域问题上，域仅仅是通过“URL的首部”来识别而不会去尝试判断相同的ip地址对应着两个域或两个域是否在同一个ip上。\n要解决跨域的问题，我们可以使用以下几种方法：")]),n._v(" "),a("h5",{attrs:{id:"方法一、通过jsonp跨域"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#方法一、通过jsonp跨域"}},[n._v("#")]),n._v(" 方法一、通过jsonp跨域")]),n._v(" "),a("p",[n._v("JSONP包含两部分：回调函数和数据。\n回调函数：当响应到来时要放在当前页面被调用的函数。\n数据：就是传入回调函数中的json数据，也就是回调函数的参数了。")]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[n._v("    /*handleResonse({\"data\": \"zhe\"})*/\n    //原理如下：\n    //当我们通过script标签请求时\n    //后台就会根据相应的参数(json,handleResponse)\n    //来生成相应的json数据(handleResponse({\"data\": \"zhe\"}))\n    //最后这个返回的json数据(代码)就会被放在当前js文件中被执行\n    //至此跨域通信完成\n    //1、使用JS动态生成script标签，进行跨域操作\n    function handleResponse(response){\n        console.log('The responsed data is: '+response.data);\n        //处理获得的Json数据\n    }\n    var script = document.createElement('script');\n    script.src = 'http://www.example.com/data/?callback=handleResponse';\n    document.body.insertBefore(script, document.body.firstChild);\n    --------------------------\n    //2、手动生成script标签\n    function handleResponse(response){\n        console.log('The responsed data is: '+response.data);\n        //处理获得的Json数据\n    }\n    <script src=\"http://www.example.com/data/?callback=handleResponse\"><\/script>\n    --------------------------\n    //3、使用jQuery进行jsonp操作\n    //jquery会自动生成一个全局函数来替换callback=?中的问号，之后获取到数据后又会自动销毁\n    //$.getJSON方法会自动判断是否跨域，不跨域的话，就调用普通的ajax方法；跨域的话，则会以异步加载js文件的形式来调用jsonp的回调函数。\n    <script>\n        $.getJson('http://www.example.com/data/?callback=?',function(jsondata){\n        //处理获得的Json数据\n    });\n    <\/script>\n")])])]),a("p",[n._v("jsonp虽然很简单，但是有如下缺点：")]),n._v(" "),a("p",[n._v("#1）安全问题(请求代码中可能存在安全隐患)")]),n._v(" "),a("p",[n._v("#2）要确定jsonp请求是否失败并不容易")]),n._v(" "),a("h5",{attrs:{id:"方法二、通过document-domain-iframe来跨子域-只有在主域相同的时候才能使用该方法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#方法二、通过document-domain-iframe来跨子域-只有在主域相同的时候才能使用该方法"}},[n._v("#")]),n._v(" 方法二、通过document.domain+iframe来跨子域(只有在主域相同的时候才能使用该方法)")]),n._v(" "),a("p",[n._v("#（1）不能通过ajax的方法去请求不同源中的文档。\n#（2）浏览器中不同域的框架之间是不能进行js的交互操作的。")]),n._v(" "),a("p",[n._v("所以，在不同的框架之间（父子或同辈），是能够获取到彼此的window对象的，但不能使用获取到的window对象的属性和方法(html5中的postMessage方法是一个例外)，总之，你可以当做是只能获取到一个几乎无用的window对象。")]),n._v(" "),a("p",[n._v("例如，在一个页面 http:// www.example.com/a.html 中，有一个iframe框架它的src是http:// example.com/b.html, 很显然，这个页面与它里面的iframe框架是不同域的，所以我们是无法通过在页面中书写js代码来获取iframe中的东西的：")]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[n._v('    //  http://www.example.com/a.html 页面中\n     <script>\n     function onLoad(){\n         var iframe = document.getElementById(\'iframe\');\n         var win = iframe.contentWindow;\n         //这里能够获取到iframe中的window对象，但是window对象的属性和方法几乎不可用。\n         var doc = win.document;//这里获取不到iframe中的document对象\n         var name = win.name;//这里获取不到window对象的name属性\n         ······\n     }\n     <iframe id = "iframe" src ="http:// example.com/b.html" onload = "onLoad()"></iframe> \n')])])]),a("p",[n._v("所以我们就要用到document.domain")]),n._v(" "),a("ol",[a("li",[a("p",[n._v("在页面http:// www.a.com/dir/a.html中设置document.domain：")]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[n._v(' 1 <iframe src = "http://script.a.com/dir/b.html" id="iframe" onload = "loLoad()"></iframe>\n 2 <script>\n 3 document.domain = "a.com";//设置成主域\n 4 function test(){\n 5     var iframe = document.getElementById("iframe");\n 6     var win = iframe.contentWindow;\n 7     //在这里就可以操作b.html\n 8 }\n 9 <\/script>\n')])])])]),n._v(" "),a("li",[a("p",[n._v("在http:// script.a.com/dir/b.html也需要显示的设置document.domain")]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[n._v(' <script>\n      document.domain = "a.com";\n <\/script>\n')])])])])]),n._v(" "),a("p",[n._v("注意，document.domain的设置是有限制的：")]),n._v(" "),a("p",[n._v("我们只能把document.domain设置成自身或更高一级的父域，且主域必须相同。\n　　例如：a.b.c.com 中某个文档的document.domain 可以设成a.b.c.com、b.c.com 、c.com中的任意一个")]),n._v(" "),a("h5",{attrs:{id:"方法三、使用window-name-iframe来进行跨域"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#方法三、使用window-name-iframe来进行跨域"}},[n._v("#")]),n._v(" 方法三、使用window.name+iframe来进行跨域")]),n._v(" "),a("p",[n._v("window的name属性特征：name 值在不同的页面（甚至不同域名）加载后依旧存在，并且可以支持非常长的 name 值（2MB），即在一个窗口(window)的生命周期内,窗口载入的所有的页面都是共享一个window.name的，每个页面window.name都有读写的权限。")]),n._v(" "),a("p",[n._v("正是由于window的name属性的特征，所以可以使用window.name来进行跨域。\n　　举例：\n　　1）在一个a.html页面中，有如下代码：")]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[n._v("    <script>\n        window.name = \"哈哈，我是页面a设置的值哟！\";\n        //设置window.name的值\n        setTimeout(function(){\n            window.location = 'b.html';\n        },3000);//3秒后把一个新页面载入当前window\n    <\/script>\n")])])]),a("p",[n._v("2）再在b.html中读取window.name的值：")]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[n._v("    <script>\n        alert(window.name);//读取window.name的值\n    <\/script>\n")])])]),a("p",[n._v('3）a.html载入3秒后，跳转到b.html页面中，结果为  弹出框"哈哈，我是页面a设置的值哟！"')]),n._v(" "),a("p",[n._v("#注意：\n#1.window.name的值只能是字符串的形式，这个字符串的大小最大能允许2M左右甚至更大的一个容量，具体取决于不同的浏览器。")]),n._v(" "),a("p",[n._v("接下来使用window.name进行跨域举例")]),n._v(" "),a("p",[n._v("比如：有一个example.com/a.html页面,需要通过a.html页面里的js来获取另一个位于不同域上的页面cnblogs.com/data.html里的数据。")]),n._v(" "),a("p",[n._v("1)创建cnblogs.com/data.html代码：\n"),a("script",[n._v("\nwindow.name = &quot;我是data.html的数据，所有可以转化为字符串来传递的数据都可以在这里使用，比如这里可以传递Json数据&quot;;\n")])]),n._v(" "),a("p",[n._v("2)创建example.com/a.html的代码：\n想要即使a.html页面不跳转也能得到data.html里的数据。在a.html页面中使用一个隐藏的iframe来充当一个中间人角色，由iframe去获取data.html的数据，然后a.html再去得到iframe获取到的数据。")]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[n._v('    <script>\n        function getData(){\n        //iframe载入data.html页面会执行此函数\n            var ifr = document.getElementById("iframe");\n            ifr.onload = function(){\n            //这个时候iframe和a.html已经处于同一源，可以互相访问\n                var data = ifr.contentWindow.name;\n    //获取iframe中的window.name，也就是data.html中给它设置的数据\n                alert(data);\n            }\n            ifr.src = \'b.html\';//这里的b.html为随便一个页面，只要与a.html同源就行，目的是让a.html能够访问到iframe中的东西，否则访问不到\n        }\n    <\/script>\n    <iframe id = "iframe" src = "cnblogs.com/data.html" style = "display:none" onload = "getData()"></iframe>\n')])])]),a("h5",{attrs:{id:"方法四、使用window-postmessage方法来跨域-不常用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#方法四、使用window-postmessage方法来跨域-不常用"}},[n._v("#")]),n._v(" 方法四、使用window.postMessage方法来跨域(不常用)")]),n._v(" "),a("p",[n._v("window.postMessage(message,targetOrigin) 方法是html5新引进的特性，可以使用它来向其它的window对象发送消息，无论这个window对象是属于同源或不同源(可实现跨域)，目前IE8+、FireFox、Chrome、Opera等浏览器都已经支持window.postMessage方法。\n　　message：为要发送的消息，类型只能为字符串；\n　　targetOrigin：用来限定接收消息的那个window对象所在的域，如果不想限定域，可以使用通配符 “*”。")]),n._v(" "),a("p",[n._v("1)创建www.test.com/a.html页面代码：")]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[n._v('    <script>\n    function onLoad(){\n        var iframe = document.getElementById("iframe");\n        var win = iframe.contentWindow;\n        win.postMessage(\'哈哈，我是来自页面a.html的信息哟！\',\'*\');//向不同域的www.script.com/b.html发送消息\n    }\n    <\/script>\n    <iframe id="iframe" src="www.script.com/b.html" onload="onLoad()"></iframe>\n')])])]),a("p",[n._v("2)创建www.script.com/b.html页面代码：")]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[n._v("    <script>\n    window.onmessage = function(e){//注册message时间来接收消息\n        e = e || event;            //获取时间对象\n        alert(e.data);             //通过data属性来得到传送的消息\n    }\n    <\/script>\n")])])]),a("p",[n._v("优点：使用postMessage来跨域传送数据还是比较直观和方便的；\n缺点： IE6、IE7不支持，所以用不用还得根据实际需要来决定。")]),n._v(" "),a("h5",{attrs:{id:"方法五、使用跨域资源共享-cors-来跨域"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#方法五、使用跨域资源共享-cors-来跨域"}},[n._v("#")]),n._v(" 方法五、使用跨域资源共享（CORS）来跨域")]),n._v(" "),a("p",[n._v("CORS：一种跨域访问的机制，可以让AJAX实现跨域访问；CORS允许一个域上的网络应用向另一个域提交跨域AJAX请求。\n服务器设置Access-Control-Allow-Origin HTTP响应头之后，浏览器将会允许跨域请求．\n就是使用自定义的HTTP头部让浏览器与服务器进行沟通，从而决定请求或响应是应该成功，还是应该失败。")]),n._v(" "),a("ol",[a("li",[a("p",[n._v("IE中对CORS的实现是通过xdr")]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[n._v(" var xdr = new XDomainRequest();\n xdr.onload = function(){\n     console.log(xdr.responseText);\n }\n xdr.open('get', 'http://www.test.com');\n ......\n xdr.send(null);\n")])])])]),n._v(" "),a("li",[a("p",[n._v("其它浏览器中的实现就在xhr中")]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[n._v(" var xhr =  new XMLHttpRequest();\n xhr.onreadystatechange = function () {\n if(xhr.readyState === 4 && xhr.status === 200){\n         console.log(xhr.responseText);\n         } \n     }\n }\n xhr.open('get', 'http://www.test.com');\n ......\n xhr.send(null);\n")])])])]),n._v(" "),a("li",[a("p",[n._v("实现跨浏览器的CORS")]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[n._v(" function createCORS(method, url){\n     var xhr = new XMLHttpRequest();\n     if('withCredentials' in xhr){\n         xhr.open(method, url, true);\n     }else if(typeof XDomainRequest != 'undefined'){\n         var xhr = new XDomainRequest();\n         xhr.open(method, url);\n     }else{\n         xhr = null;\n     }\n     return xhr;\n }\n var request = createCORS('get', 'http://www.test.com');\n if(request){\n     request.onload = function(){\n         ......\n     };\n     request.send();\n }\n")])])])])]),n._v(" "),a("h5",{attrs:{id:"方法六、使用location-hash-iframe来跨域-不常用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#方法六、使用location-hash-iframe来跨域-不常用"}},[n._v("#")]),n._v(" 方法六、使用location.hash+iframe来跨域（不常用）")]),n._v(" "),a("p",[n._v("假设域名test.com下的文件a.html要和csdnblogs.com域名下的b.html传递信息。\n　　1) 创建test.com下的a.html页面， 同时在a.html上加一个定时器，隔一段时间来判断location.hash的值有没有变化，一旦有变化则获取获取hash值，代码如下：")]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[n._v("    <script>\n    function startRequest(){\n        var ifr = document.createElement('iframe');\n        //创建一个隐藏的iframe\n        ifr.style.display = 'none';\n        ifr.src = 'http://www.csdnblogs.com/b.html#paramdo';\n        //传递的location.hash \n        document.body.appendChild(ifr);\n    }\n\n    function checkHash() {\n        try {\n            var data = location.hash ? location.hash.substring(1):'';\n            if (console.log) {\n                console.log('Now the data is ' + data);\n            }\n        } catch (e) {};\n    }\n    setInterval(checkHash, 5000);\n    window.onload = startRequest;\n    <\/script>\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[a("p",[n._v("b.html响应请求后再将通过修改a.html的hash值来传递数据，代码如下：")]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[n._v("<script>\nfunction checkHash() {\n    var data = '';\n    //模拟一个简单的参数处理操作\n    switch (location.hash) {\n        case '#paramdo':\n            data = 'somedata';\n            break;\n        case '#paramset':\n            //do something……\n            break;\n        default:\n            break;\n    }\n    data && callBack('#' + data);\n}\n\nfunction callBack(hash) {\n    // ie、chrome的安全机制无法修改parent.location.hash\n    //所以要利用一个中间的www.csdnblogs.com域下的代理iframe\n    var proxy = document.createElement('iframe');\n    proxy.style.display = 'none';\n    proxy.src = 'http://www.csdnblogs.com/c.html' + hash; \n    // 注意该文件在\"www.csdnblogs.com\"域下\n    document.body.appendChild(proxy);\n}\nwindow.onload = checkHash;\n<\/script>\n")])])])]),n._v(" "),a("li",[a("p",[n._v("test.com域下的c.html代码：")]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[n._v(" <script>\n  //因为parent.parent和自身属于同一个域，所以可以改变其location.hash的值\n parent.parent.location.hash = self.location.hash.substring(1);\n <\/script>\n")])])])])]),n._v(" "),a("h5",{attrs:{id:"方法七、使用web-sockets来跨域"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#方法七、使用web-sockets来跨域"}},[n._v("#")]),n._v(" 方法七、使用Web sockets来跨域")]),n._v(" "),a("p",[n._v("web sockets： 是一种浏览器的API，它的目标是在一个单独的持久连接上提供全双工、双向通信。(同源策略对web sockets不适用)")]),n._v(" "),a("p",[n._v("web sockets原理：在JS创建了web socket之后，会有一个HTTP请求发送到浏览器以发起连接。取得服务器响应后，建立的连接会使用HTTP升级从HTTP协议交换为web sockt协议。")]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[n._v("    <script>\n    var socket = new WebSockt('ws://www.test.com');\n    //http->ws; https->wss\n    socket.send('hello WebSockt');\n    socket.onmessage = function(event){\n        var data = event.data;\n    }\n")])])]),a("h5",{attrs:{id:"方法八、使用flash-urlloader来跨域"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#方法八、使用flash-urlloader来跨域"}},[n._v("#")]),n._v(" 方法八、使用flash URLLoader来跨域")]),n._v(" "),a("p",[n._v("flash有自己的一套安全策略，服务器可以通过crossdomain.xml文件来声明能被哪些域的SWF文件访问，SWF也可以通过API来确定自身能被哪些域的SWF加载。\n例如：当跨域访问资源时，例如从域baidu.com请求域google.com上的数据，我们可以借助flash来发送HTTP请求。")]),n._v(" "),a("p",[n._v("跨域实现方式：")]),n._v(" "),a("p",[n._v("#1. 首先，修改域google.com上的crossdomain.xml(一般存放在根目录，如果没有需要手动创建) ，把baidu.com加入到白名单。\n#2. 其次，通过Flash URLLoader发送HTTP请求\n#3. 最后，通过Flash API把响应结果传递给JavaScript。")]),n._v(" "),a("p",[n._v("Flash URLLoader是一种很普遍的跨域解决方案，不过需要支持iOS的话，这个方案就不可行了。")]),n._v(" "),a("p",[n._v("以上八种方法，可以根据项目的实际情况来进行选择应用，个人认为window.name的方法既不复杂，也能兼容到几乎所有浏览器，这真是极好的一种跨域方法。")])])}),[],!1,null,null,null);a.default=s.exports}}]);