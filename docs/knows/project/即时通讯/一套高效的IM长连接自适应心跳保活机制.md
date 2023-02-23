[微信Android客户端后台保活经验分享](https://mp.weixin.qq.com/s?__biz=MzUxMzcxMzE5Ng==&mid=2247488488&idx=1&sn=f76fb0a8f88f6958d6a7ecfe6658b5a5&source=41#wechat_redirect)

本文作者“Carson”，现就职于腾讯公司，原题“高效保活长连接：手把手教你实现自适应的心跳保活机制”，有较多修订和改动。

# 1、引言

当要实现IM即时通讯聊天、消息推送等高实时性需求时，我们一般会选择长连接的通信方式。

而真正当实现长连接方式时，会遇到很多技术问题，比如最常见的长连接保活问题。

今天， **我将通过本篇文章，手把手教大家实现一套可自适应的心跳保活机制，从而能高效稳定地维持诸如IM聊天这类需求的长连接。**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2b1ac1f73cb4b1aa20f6af1c8240f7d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

# 2、相关文章

1.  《[为何基于TCP协议的移动端IM仍然需要心跳保活机制？](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Fthread-281-1-1.html "http://www.52im.net/thread-281-1-1.html")》
1.  《[一文读懂即时通讯应用中的网络心跳包机制：作用、原理、实现思路等](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Fthread-2697-1-1.html "http://www.52im.net/thread-2697-1-1.html")》
1.  《[一种Android端IM智能心跳算法的设计与实现探讨（含样例代码）](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Fthread-783-1-1.html "http://www.52im.net/thread-783-1-1.html")》
1.  《[自已开发IM有那么难吗？手把手教你自撸一个Andriod版简易IM (有源码)](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Fthread-2671-1-1.html "http://www.52im.net/thread-2671-1-1.html")》
1.  《[跟着源码学IM(一)：手把手教你用Netty实现心跳机制、断线重连机制](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Fthread-2663-1-1.html "http://www.52im.net/thread-2663-1-1.html")》
1.  《[跟着源码学IM(五)：正确理解IM长连接、心跳及重连机制，并动手实现](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Fthread-2799-1-1.html "http://www.52im.net/thread-2799-1-1.html")》

# 3、什么是长连接

**认识长连接：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d698fb3d65c640e2ba778b489d88012b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**长连接的主要作是通过长时间保持双方连接，从而：**

-   1）提高通信速度；
-   2）确保实时性；
-   3）避免短时间内重复连接所造成的信道资源和网络资源的浪费。

**长连接与短连接的区别：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a154bde06844cb7b7f69ca0cd2b32ff~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**PS：** 对于IM这类的开发者而言，通常大家都把HTTP协议称“短连接”、把直接基于[TCP](https://link.juejin.cn?target=http%3A%2F%2Fdocs.52im.net%2Fextend%2Fdocs%2Fbook%2Ftcpip%2Fvol1%2F17%2F "http://docs.52im.net/extend/docs/book/tcpip/vol1/17/")、[UDP](https://link.juejin.cn?target=http%3A%2F%2Fdocs.52im.net%2Fextend%2Fdocs%2Fbook%2Ftcpip%2Fvol1%2F11%2F "http://docs.52im.net/extend/docs/book/tcpip/vol1/11/")或[WebSocket](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Fthread-3713-1-1.html "http://www.52im.net/thread-3713-1-1.html")的socket称为“长连接”。

# 4、导致长连接断开的原因

### 4.1 基本概念

从上节可知，在使用长连接的情况下，双方的所有通信都建立在1条长连接上（比如1次TCP连接）。所以，长连接需要持续保持双方连接才可使得双方持续通信。

然而，实际情况是，长连接会存在断开的情况。

**这些断开原因主要是：**

-   1）长连接所在进程被杀死（这主要说的是移动端）；
-   2）NAT超时；
-   3）网络状态发生变化；
-   4）其他不可抗因素（网络状态差、DHCP的租期等等 ）。

下面，我将对每种原因进行分析。

### 4.2 具体分析

**1）原因1：进程被杀死**

当进程被杀死后，长连接也会随之断开。进程被杀在Andriod端是最常见的问题，限于篇幅就不在此展开这个话题，有兴趣可以阅读这篇：《[Android P正式版即将到来：后台应用保活、消息推送的真正噩梦](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Fthread-1832-1-1.html "http://www.52im.net/thread-1832-1-1.html")》。

**2）原因2：NAT 超时（重点关注）**

**NAT超时现象如下：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/72fe895759c4409abc5cccbdceedea22~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**各运营商和地区的NAT超时时间如下：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e771c97e554a4935b70e546a1f3da1b7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**PS：** 上述数据来源于微信团队的《[移动端IM实践：实现Android版微信的智能心跳机制](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Fthread-120-1-1.html "http://www.52im.net/thread-120-1-1.html")》一文，随着4G、5G的普及，这些数据有可能已发生变化，请以实际测试结果为准。

**特别注意：** 排除其他外因（网络切换、NAT超时、人为原因），TCP长连接在双方都不断开连接的情况上，本质上是不会自动中断的（也就是不需要心跳包来维持，可以验证一下：让2台电脑连上同1个Wifi，其中1台做服务器, 另1台做客户端连接服务器（无设置KeepAlive）。只要电脑、路由器不断网断电，那么，2台电脑的长连接是不会自动中断的）。

**Jack Jiang注：** 上述论述可能不太准确，有新兴趣的读者可以详读《[拔掉网线再插上，TCP连接还在吗？一文即懂！](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Fthread-3846-1-1.html "http://www.52im.net/thread-3846-1-1.html")》。

**3）原因3：网络状态发生变化**

当移动客户端网络状态发生变化时（如移动网络 & Wifi切换、断开、重连），也会使长连接断开。

**4）原因4：其他不可抗因素**

如网络状态差、DHCP的租期到期等等，都会使得长连接发生 偶然的断开。DHCP的租期到期：对于 Android系统， DHCP到了租期后不会主动续约（继续使用过期IP），从而导致长连接断开。

# 5、高效维持长连接的解决方案

### 5.1 基本介绍

在了解长连接断开原因后，针对这些原因，此处给出我的高效维持长连接的解决方案（如下图所示）。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b77fed4fdd3d4a93b10b81d377dbe277~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**为此，若需有效维持长连接，则需要做到：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd664e0c1451438aaedfa0c093adfb03~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**说得简单点，高效维持长连接的关键在于：**

-   1）保活：处于连接状态时要做到尽量不要断；
-   2）重连：连接断了之后要能继续重连回来。

### 5.2 具体措施

**1）措施1：进程保活**

**整体概括如下：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29233edb5e1f4f62a42549182468b9b7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**PS：** 关于Android的进程保活，这个话题就很热门了，感兴趣可以顺着下面的文章详细读一读：

1.  《[应用保活终极总结(一)：Android6.0以下的双进程守护保活实践](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Fthread-1135-1-1.html "http://www.52im.net/thread-1135-1-1.html")》
1.  《[应用保活终极总结(二)：Android6.0及以上的保活实践(进程防杀篇)](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Fthread-1138-1-1.html "http://www.52im.net/thread-1138-1-1.html")》
1.  《[应用保活终极总结(三)：Android6.0及以上的保活实践(被杀复活篇)](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Fthread-1140-1-1.html "http://www.52im.net/thread-1140-1-1.html")》
1.  《[Android进程保活详解：一篇文章解决你的所有疑问](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Fthread-438-1-1.html "http://www.52im.net/thread-438-1-1.html")》
1.  《[微信团队原创分享：Android版微信后台保活实战分享(进程保活篇)](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Fthread-210-1-1.html "http://www.52im.net/thread-210-1-1.html")》
1.  《[Android P正式版即将到来：后台应用保活、消息推送的真正噩梦](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Fthread-1832-1-1.html "http://www.52im.net/thread-1832-1-1.html")》
1.  《[全面盘点当前Android后台保活方案的真实运行效果（截止2019年前）](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Fthread-2176-1-1.html "http://www.52im.net/thread-2176-1-1.html")》
1.  《[2020年了，Android后台保活还有戏吗？看我如何优雅的实现！](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Fthread-2881-1-1.html "http://www.52im.net/thread-2881-1-1.html")》
1.  《[史上最强Android保活思路：深入剖析腾讯TIM的进程永生技术](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Fthread-2893-1-1.html "http://www.52im.net/thread-2893-1-1.html")》
1.  《[Android进程永生技术终极揭密：进程被杀底层原理、APP应对被杀技巧](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Fthread-2921-1-1.html "http://www.52im.net/thread-2921-1-1.html")》
1.  《[Android保活从入门到放弃：乖乖引导用户加白名单吧(附7大机型加白示例)](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Fthread-3033-1-1.html "http://www.52im.net/thread-3033-1-1.html")》

**2）措施2：心跳保活机制**

这是本文的重点，下节开始会详细解析

**3）措施3：断线重连机制**

**原理就是：** 检测网络状态变化并及时判断连接的有效性。

**具体实现：** 这个其实跟心跳保活机制是一套完整的逻辑，所以下面会在心跳保活机制中一起讲解。

# 6、心跳保活机制简介

**心跳保活机制的整体介绍如下：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0e0c25ec6e164096845ca6d360c1ac55~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

不过，很多人容易混淆把心跳机制和传统的HTTP轮询机制搞混。

**下面给出二者区别：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/38821873010f46eeb18ccd8a9e0893a2~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

# 7、主流IM的心跳机制分析和对比

对国、内外主流的移动IM产品（WhatsApp、Line、微信）进行了心跳机制的简单分析和对比。

**具体请看下图：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b007f480277b4847ab1cb193cb7a70fc~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**PS：** 以上数据来自于微信团队分享的《[移动端IM实践：WhatsApp、Line、微信的心跳策略分析](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Fthread-121-1-1.html "http://www.52im.net/thread-121-1-1.html")》一文。

# 8、心跳保活机制方案总体设计

下面，我将根据市面上主流的心跳机制，设计了一套心跳机制方案。

**心跳机制方案的基本流程：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c919634f4834879a9ea08ff9ab3a057~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**对于心跳机制方案设计的主要考虑因素是：**

-   1）要保证消息的实时性；
-   2）要考虑耗费设备的资源（网络流量、电量、CPU等等）。

**从上图可以看出，对于心跳机制方案设计的要点在于：**

-   1）心跳包的规格（内容 & 大小）；
-   2）心跳发送的间隔时间；
-   3）断线重连机制 （核心 = 如何 判断长连接的有效性）。

在下面的方案设计中，将针对这3个问题给出详细的解决方案。

# 9、心跳机制方案的详细设计

### 9.1 心跳包的规格

为了减少流量并提高发送效率，需要精简心跳包的设计。

**主要从心跳包的内容和大小入手，设计原则具体如下：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/54cdde8ba15e4700a9ae9dc702f708f7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**设计方案：**

> 心跳包 = 1个携带少量信息 & 大小在10字节内的信息包

### 9.2 心跳发送的间隔时间

为了 防止NAT超时并减少设备资源的消耗（网络流量、电量、CPU等等），心跳发送的间隔时间是整个心跳机制方案设计的重点。

**心跳发送间隔时间的设计原则如下：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/71ea02de9bcc4160842bd8ccc9b756d8~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

### 9.3 最常用的心跳间隔方案

一般，最直接且常用的心跳发送间隔时间设置方案多采用：“每隔估计 x 分钟发送心跳包1次”。其中，x ＜5分钟即可（综合主流移动IM产品，此处建议 x= 4分钟）。

**但是，这种方案存在一些问题：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7a06d7a935e47a2b3ab3398f0a559c1~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**PS：** 关于固定心跳间隔的方案具体实现，可以详细参考：

1.  《[跟着源码学IM(一)：手把手教你用Netty实现心跳机制、断线重连机制](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Fthread-2663-1-1.html "http://www.52im.net/thread-2663-1-1.html")》；
1.  《[跟着源码学IM(五)：正确理解IM长连接、心跳及重连机制，并动手实现](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Fthread-2799-1-1.html "http://www.52im.net/thread-2799-1-1.html")》；
1.  《[自已开发IM有那么难吗？手把手教你自撸一个Andriod版简易IM (有源码)](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Fthread-2671-1-1.html "http://www.52im.net/thread-2671-1-1.html")》。

### 9.4 自适应心跳间隔方案

下面，我将详细讲解自适应心跳间隔时间的设计方案。

**基本逻辑：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1244f38a63304abbb2d24582f4b1c973~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

该方案需要解决的有2个核心问题。

**1）如何自适应计算心跳间隔 从而使得心跳间隔 接近 当前NAT 超时时间？**

**答：** 不断增加心跳间隔时间进行心跳应答测试，直到心跳失败5次后，即可找出最接近 当前NAT 超时时间的心跳间隔时间。

**具体请看下图：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c1f66c40e4934daf9dfcb0062facd65e~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**注：**只有当心跳间隔 接近 NAT 超时时间 时，才能最大化平衡 长连接不中断 & 设备资源消耗最低的问题。

**2）如何检测 当前网络环境的NAT 超时时间 发生了变化 ？**

**答：**当前发送心跳包成功 的最大间隔时间（即最接近NAT超时时间的心跳间隔） 发送失败5次后，则判断当前网络环境的NAT 超时时间 发生了变化。

**具体请看下图：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/34a52be1080b4ba29c546b71d0ee2d12~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**注：** 在检测到 NAT 超时时间 发生变化后，重新自适应计算心跳间隔 从而使得心跳间隔 接近 NAT 超时时间

**总结一下：** 统筹以上2个核心问题，总结出自适应心跳间隔时间设计方案为下图：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3e39e8fcfd6247f2aa6ec5a13faf5d96~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**PS：** 关于自适应心跳机制的设计和实现，可以详细参考：

1.  《[移动端IM实践：实现Android版微信的智能心跳机制](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Fthread-120-1-1.html "http://www.52im.net/thread-120-1-1.html")》；
1.  《[一种Android端IM智能心跳算法的设计与实现探讨（含样例代码）](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Fthread-783-1-1.html "http://www.52im.net/thread-783-1-1.html")》。

# 10、断线重连机制的实现

技术上来说：长连接的心跳保活依赖于心跳机制，在心跳机制起作用的情况下，适时启动断线重连机制，在心跳机制和断线重连机制的共同作用下才能实现真正的心跳保活。但为了让逻辑更清晰，我把断线重连机制跟心跳机制单独各作为一节来讲解。本节讲的是断片线重连机制。

该机制的核心在于：如何判断长连接的有效性。即：什么情况下视为长连接断线？

**1）设计原则：**

**基本逻辑就是：** 判断长连接是否有效的准则 = 服务器是否返回心跳应答。

**此处需要分清长连接的“存活 & 有效“状态的区别：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/690913e3026f423191a1026522bc9935~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**2）具体方案：**

实现思路：通过计数计算，若连续5次发送心跳后，服务器都无心跳应答，则视为长连接无效。

**判断流程：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/99216c385b95444f99b9687a0c5e637f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**3）网上流传的方案：**

**在网上流传着一些用于判断长连接是否有效的方案，具体介绍如下：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab3c344293d0401fa83412d070e61918~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

至此，关于心跳保活机制已经讲解完毕。

# 11、方案小结

有必要总结一下我在上两节分享的心跳机制和断线重连机制，这两个机制组成了本文的长连接心跳保活完整逻辑。

**设计方案：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/940d2e5ee90b43988b2dfb62695d1bd1~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**流程设计：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/258dd72890584ab896de1d74c94718d1~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**注：** 标识 “灰色” 的判断流程参考上文描述。

# 12、进一步优化和完善心跳保活方案

### 12.1 基本情况

上两节中的方案依然会存在技术缺陷，从而导致长连接断开（比如：长连接本身不可用（此时重连多少次也没用））。

下面将优化和完善上述方案，从而保证 客户端与服务器依然保持着通信状态。

**优化点主要是：**

-   1）确保当前网络的有效性和稳定性再开始长连接；
-   2）自适应计算心跳包间隔时间的时机。

### 12.2 确保网络的有效性和稳定性后再开始长连接

**问题描述：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce6facaaf61e473dbe6b04d9d1f6fa9f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**解决方案：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/745d913b6fd74bfb9ff9c93ed2070bfa~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**加入到原有的心跳保活机制主流程：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c7a7aeee8c234713bbf41cc854749f7c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

### 12.3 自适应计算心跳包间隔时间的时机

**问题描述：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fc9cb9ce93f742048e657f47b6c391db~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**方案设计：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6943bf2c21ea4c37bb753ee1d98c2949~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**加入到到原有的心跳保活机制主流程：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/82ac850699134dd99290801195996c2b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

### 12.4 小结一下

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4bc4c9acaf3d40798f7b6601d3ca0270~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

# 13、额外思考：TCP协议自带的KeepAlive机制能否替代心跳机制？

很多人认为，TCP 协议自身就有KeepAlive机制，为何基于它的通讯链接，仍需在应用层实现额外的心跳保活机制？

-   结论是：无法替代；
-   原因是：TCP KeepAlive机制的作用是检测连接的有无（死活），但无法检测连接是否有效。

**注：** “连接有效”的定义 = 双方具备发送 & 接收消息的能力。

**先来看看KeepAlive 机制是什么：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e96b75eb080c43d8a7d147c0a7ea959d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**KeepAlive 的机制不可替代心跳机制的具体原因如下：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/318d82eb1f8143c58cdf80c7691703aa~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**特别注意：**

-   1）KeepAlive 机制只是操作系统底层的一个被动机制，不应该被上层应用层使用；
-   2）当系统关闭一个由KeepAlive 机制检查出来的死连接时，是不会主动通知上层应用的，只能通过调用相应IO操作的返回值中发现。

**小结一下就是：** KeepAlive机制无法代替心跳机制，需要在应用层 自己实现心跳机制以检测长连接的有效性，从而高效维持长连接。

**Jack Jiang注：** 关于TCP本身的KeepAlive机制，可能详读：

1.  《[为何基于TCP协议的移动端IM仍然需要心跳保活机制？](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Fthread-281-1-1.html "http://www.52im.net/thread-281-1-1.html")》
1.  《[彻底搞懂TCP协议层的KeepAlive保活机制](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Fthread-3506-1-1.html "http://www.52im.net/thread-3506-1-1.html")》

# 14、本文总结

看完本文后，相信在高效维持长连接的需求下，你可以完美地解决了！

**本文方案的主体设计就是：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b75691e5e3714a4db1b540459d87c6b1~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**方案的优化和完善内容就是：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/887809025bf847009adf420240da780f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

# 15、参考资料

[1] [TCP/IP详解 卷1：协议](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Ftopic-tcpipvol1.html%253Fmobile%253Dno "http://www.52im.net/topic-tcpipvol1.html%3Fmobile%3Dno")

[2] [为何基于TCP协议的移动端IM仍然需要心跳保活机制？](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Fthread-281-1-1.html "http://www.52im.net/thread-281-1-1.html")

[3] [彻底搞懂TCP协议层的KeepAlive保活机制](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Fthread-3506-1-1.html "http://www.52im.net/thread-3506-1-1.html")

[4] [万字长文，一篇吃透WebSocket：概念、原理、易错常识、动手实践](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Fthread-3713-1-1.html "http://www.52im.net/thread-3713-1-1.html")

[5] [移动端IM实践：实现Android版微信的智能心跳机制](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Fthread-120-1-1.html "http://www.52im.net/thread-120-1-1.html")

[6] [移动端IM实践：WhatsApp、Line、微信的心跳策略分析](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Fthread-121-1-1.html "http://www.52im.net/thread-121-1-1.html")

[7] [微信团队原创分享：Android版微信后台保活实战分享(网络保活篇)](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Fthread-209-1-1.html "http://www.52im.net/thread-209-1-1.html")

[8] [融云技术分享：融云安卓端IM产品的网络链路保活技术实践](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Fthread-2744-1-1.html "http://www.52im.net/thread-2744-1-1.html")

[9] [阿里IM技术分享(五)：闲鱼亿级IM消息系统的及时性优化实践](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Fthread-3726-1-1.html "http://www.52im.net/thread-3726-1-1.html")

[10] [2020年了，Android后台保活还有戏吗？看我如何优雅的实现！](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Fthread-2881-1-1.html "http://www.52im.net/thread-2881-1-1.html")

（本文同步发布于：[www.52im.net/thread-3908…](https://link.juejin.cn?target=http%3A%2F%2Fwww.52im.net%2Fthread-3908-1-1.html "http://www.52im.net/thread-3908-1-1.html")）
