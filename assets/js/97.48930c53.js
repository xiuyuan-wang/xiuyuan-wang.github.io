(window.webpackJsonp=window.webpackJsonp||[]).push([[97],{313:function(t,e,s){"use strict";s.r(e);var a=s(14),_=Object(a.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("p",[t._v("近年，不论是正在快速增长的直播，远程教育以及IM聊天场景，还是在常规企业级系统中用到的系统提醒，对websocket的需求越来越大，对websocket的要求也越来越高。从早期对websocket的应用仅限于少部分功能和IM等特殊场景，逐步发展为追求支持高并发，百万、千万级每秒通讯的高可用websocket服务。\n"),e("img",{attrs:{src:"https://segmentfault.com/img/bVbEby3",alt:""}})]),t._v(" "),e("p",[t._v("面对各种新场景对websocket功能和性能越来越高的需求，不同的团队有不同的选择，有的直接使用由专业团队开发的成熟稳定的第三方websocket服务，有些则选择自建websocket服务。")]),t._v(" "),e("p",[t._v("作为一个具有多年websocket开发经验的老程序猿，经历了GoEasy企业级websocket服务从无到有，从小到大的过程，此文是根据过去几年在GoEasy开发过程中踩过的坑，以及为众多开发团队提供websocket服务、与众多开发者交流中的总结的一些经验和体会。")]),t._v(" "),e("p",[t._v("这次主要从搭建websocket服务的基本功能和特性方面做一些分享，下次有机会再从构建一个高可用websocket时要面对的高并发，海量消息，集群容灾，横向扩展，以及自动化运维等方面进更多的分享。")]),t._v(" "),e("p",[t._v("以下几点是个人认为在构建websocket服务时必须要考虑的一些技术特性以及能显著提高用户体验的功能，供各位同学参考：")]),t._v(" "),e("h4",{attrs:{id:"_1-建立心跳机制"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-建立心跳机制"}},[t._v("#")]),t._v(" 1.建立心跳机制")]),t._v(" "),e("p",[t._v("心跳机制几乎是所有网络编程的第一步，经常容易被新手忽略。因为在websocket长连接中，客户端和服务端并不会一直通信，如果双方长期没有沟通则都不清楚彼此当前状态，所以需要发送一段很小的报文告诉对方“我还活着”。另外还有两个目的：\n服务端检测到某个客户端迟迟没有心跳过来可以主动关闭通道，让它下线；\n客户端检测到某个服务端迟迟没有响应心跳也能重连获取一个新的连接。")]),t._v(" "),e("h4",{attrs:{id:"_2-建立具有良好兼容性的客户端sdk"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-建立具有良好兼容性的客户端sdk"}},[t._v("#")]),t._v(" 2.建立具有良好兼容性的客户端SDK")]),t._v(" "),e("p",[t._v("虽说现在主流浏览器都支持websocket，但在编码中还是会遇到浏览器兼容性问题，而且通过websocket通信的客户端早已不仅限于各种web浏览器，还包括越来越多的APP，小程序。因此就要求构建的websocket服务必须能够很友好的支持各种客户端。最好的方式就是构建一个能够兼容所有主流浏览器、小程序和APP，以及uni-app、vue、react-native等目前常见的各种前端框架的客户端SDK，这样不论公司的各个项目使用什么样的前端技术，都能够快速的集成websocket服务。")]),t._v(" "),e("h4",{attrs:{id:"_3-断网自动重连和消息补发机制"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-断网自动重连和消息补发机制"}},[t._v("#")]),t._v(" 3.断网自动重连和消息补发机制")]),t._v(" "),e("p",[t._v("移动互联网时代，终端用户所处的网络环境多样且复杂，如用户进出电梯，出入地下室或地铁等网络不稳定的场所，或其他原因导致的网络不稳定都是很常见的场景。因此，一个可靠的websocket服务必须具备完善的断网自动重连机制。确保断网后，网络一旦恢复，能第一时间自动重新建立长连接，并且能够立即补发在网络不稳定期间发送的消息。")]),t._v(" "),e("h4",{attrs:{id:"_4-离线消息"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_4-离线消息"}},[t._v("#")]),t._v(" 4.离线消息")]),t._v(" "),e("p",[t._v("基础的Websocket通讯从技术上来说，消息送达的前提条件就是建立起一个长连接，没有建立网络连接就来讨论通讯那是耍流氓。但是从使用者的角度上来说，随手关闭浏览器，或者将小程序、APP进程直接杀掉而导致网络连接断开的情况是随时都在发生的。然后我们下意识的期待，就是我下次打开浏览器访问网页，或者打开APP时，能够收到用户离开系统期间的所有信息。从技术上这是一个跟websocket没有多大关系的需求，但实际上却是websocket服务不可或缺的基本特性，也是一个能够极大提升用户体验的功能。")]),t._v(" "),e("h4",{attrs:{id:"_5-上下线提醒-客户端在线列表"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_5-上下线提醒-客户端在线列表"}},[t._v("#")]),t._v(" 5.上下线提醒，客户端在线列表")]),t._v(" "),e("p",[t._v("掌握当前系统有哪些用户在线，捕捉用户上下线事件，是搭建一个企业级websocket服务，必不可少的特性，尤其是开发IM和游戏类产品。")]),t._v(" "),e("h4",{attrs:{id:"_6-支持历史消息查询"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_6-支持历史消息查询"}},[t._v("#")]),t._v(" 6.支持历史消息查询")]),t._v(" "),e("p",[t._v("websocket服务，某种意义也是属于一个消息系统，对于历史消息的查询需求，是无法绕开的话题。比如IM系统中常见的历史消息，因此在websocket服务内部实现一个高速，可靠的消息队列机制来支持websocket服务实现历史消息的查询就是一个必须的工作。")]),t._v(" "),e("h4",{attrs:{id:"_7-消息的压缩机制"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_7-消息的压缩机制"}},[t._v("#")]),t._v(" 7.消息的压缩机制")]),t._v(" "),e("p",[t._v("不论是为了保证消息通讯的速度和实时性，还是为了节约流量和带宽费用，或者是出于提高网卡的使用效率和增加系统的吞吐量，在通讯过程中对消息进行必要的压缩都是必不可少的。")]),t._v(" "),e("p",[t._v("除了需要考虑以上七点以外，笔者认为，还有几个问题也是很值得初学者积极关注的：")]),t._v(" "),e("h4",{attrs:{id:"_1-缓存和持久化"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-缓存和持久化"}},[t._v("#")]),t._v(" 1.缓存和持久化")]),t._v(" "),e("p",[t._v("选择合适的消息缓存机制，是企业级websocket服务保证性能必须要考虑的问题。")]),t._v(" "),e("h4",{attrs:{id:"_2-异步调用"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-异步调用"}},[t._v("#")]),t._v(" 2.异步调用")]),t._v(" "),e("p",[t._v("要支持大量消息通讯的高性能系统，必然推荐异步调用。若设计为同步调用，调用方就需要一直等待被调用方完成。如果一层一层的同步调用下去，所有的调用方需要相同的等待时间，调用方的资源会被大量的浪费。更糟糕的是一旦被调用方出问题，其他调用就会出现多米诺骨牌效应跟着出问题，导致故障蔓延。收到请求立即返回结果，然后再异步执行，不仅可以增加系统的吞吐量，最大的好处是让服务之间的解耦更为彻底。")]),t._v(" "),e("h4",{attrs:{id:"_3-独立于业务和标准化"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-独立于业务和标准化"}},[t._v("#")]),t._v(" 3.独立于业务和标准化")]),t._v(" "),e("p",[t._v("尽管在一个web项目中可以同时存在常规http服务和websocket服务，尤其对性能要求不高的单应用web系统，这种方式更简单，更便于维护。但对于性能和可用性高的企业级系统或者互联网平台，更好的方式，是将websocket服务作为一个单独的微服务来进行设计，避免和常规的http服务抢占资源，导致系统性能不可控，同时也更便于横向扩展。")]),t._v(" "),e("p",[t._v("一个设计良好的企业级websocket服务应该是一个独立于业务系统、标准化的单独存在的技术性微服务，能够作为公司基础架构的一部分为公司的所有项目提供通讯服务。")]),t._v(" "),e("h4",{attrs:{id:"_4-幂等性和重复消息的过滤"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_4-幂等性和重复消息的过滤"}},[t._v("#")]),t._v(" 4.幂等性和重复消息的过滤")]),t._v(" "),e("p",[t._v("所谓幂等性，就是一次和多次请求一个接口都应该具有同样的后果。为什么需要？对每个接口的调用都会有三种可能的结果：成功，失败和超时。对最后一种的原因很多可能是网络丢包，可能请求没有到达，也有可能返回没有收到。于是在对接口的调用时往往都会有重试机制，但重试机制很容易导致消息的重复发送，从用户层面这往往是不可接受的，因此在接口的设计时，我们就需要考虑接口的幂等性，确保同一条消息发送一次和十次都不回导致消息的重复到达。")]),t._v(" "),e("h4",{attrs:{id:"_5-支持qos服务质量分级"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_5-支持qos服务质量分级"}},[t._v("#")]),t._v(" 5.支持QoS服务质量分级")]),t._v(" "),e("p",[t._v("其实对于上一点消息重复的问题，行业已经有了解决方案和标准规范，对于消息到达率和重复，常用的手段就是通过消息确认的方式来确保消息到达，要求越高，意味着确认机制越复杂，成本越高。为了在成本和到达率之间有很好的平衡，通常对消息系统的服务质量（QoS）分为以下三个级别 ：\nQoS 0(At most once)：“最多发一次”，意味着发送就可以了，不需要确认机制，发送了即可，适用于要求不高的场景，可以接受一定的不到达率，成本最低。")]),t._v(" "),e("p",[t._v("QoS 1(At least once)：“至少发一次”，意味着发送方必须明确收到接收方的确认信号，否则就会反复发，每条消息至少需要两次通信来确认到达，可以接受一些消息被重发，但成本不高。")]),t._v(" "),e("p",[t._v("QoS 2(Exactly once)：“确保只发一次”，意味着每条消息只能到达一次，且不允许重复到达，为了达到这个目标就需要双方至少通讯三次，成本最高。")]),t._v(" "),e("p",[t._v("一个完善的websocket服务面对不同的应用场景，应该能够支持选择不同等级的QoS，在成本和服务质量之间取得平衡。")]),t._v(" "),e("h3",{attrs:{id:"最后"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#最后"}},[t._v("#")]),t._v(" 最后")]),t._v(" "),e("p",[t._v("虽然websocket已经广泛的应用于各种系统和平台，但如果要搭建一个满足企业级或者大型互联网平台的可靠、安全稳定的websocket服务，对于没有经验的同学，在具体的技术实践过程依然是有不少的坑要踩。")]),t._v(" "),e("p",[t._v("对websocket服务有较高要求，选择成熟可靠的第三方websocket服务其实也是一个成本更低和高效的选择。GoEasy作为国内领先的第三方websocket消息平台，已经稳定运行了5年时间，支持千万级消息并发，除了兼容所有常见的浏览器以外，同时也兼容uni-app，各种小程序，以及vue、react-native等常见的前端框架。")]),t._v(" "),e("p",[t._v("希望本文能为初次搭建websocket服务的同学在思路上有所帮助和参考，也欢迎各位前辈多多批评指正，同时也希望未来有机会就更多的技术与大家进行交流。")]),t._v(" "),e("p",[t._v("GoEasy官网：https://www.goeasy.io")]),t._v(" "),e("p",[t._v("GoEasy系列教程：")]),t._v(" "),e("p",[e("a",{attrs:{href:"https://segmentfault.com/a/1190000021931596",target:"_blank",rel:"noopener noreferrer"}},[t._v("搭建websocket消息推送服务，必须要考虑的几个问题"),e("OutboundLink")],1),t._v(" "),e("br"),t._v(" "),e("a",{attrs:{href:"https://segmentfault.com/a/1190000022139554",target:"_blank",rel:"noopener noreferrer"}},[t._v("websocket IM聊天教程-教你用GoEasy快速实现IM聊天"),e("OutboundLink")],1),t._v(" "),e("br"),t._v(" "),e("a",{attrs:{href:"https://segmentfault.com/a/1190000022438130",target:"_blank",rel:"noopener noreferrer"}},[t._v("Websocket直播间聊天室教程-GoEasy快速实现聊天室"),e("OutboundLink")],1),t._v(" "),e("br"),t._v(" "),e("a",{attrs:{href:"https://segmentfault.com/a/1190000022604896",target:"_blank",rel:"noopener noreferrer"}},[t._v("微信小程序使用GoEasy实现websocket实时通讯"),e("OutboundLink")],1),t._v(" "),e("br"),t._v(" "),e("a",{attrs:{href:"https://segmentfault.com/a/1190000022118370",target:"_blank",rel:"noopener noreferrer"}},[t._v("Uniapp使用GoEasy实现websocket实时通讯"),e("OutboundLink")],1),t._v(" "),e("br"),t._v(" "),e("a",{attrs:{href:"https://segmentfault.com/a/1190000022680570",target:"_blank",rel:"noopener noreferrer"}},[t._v("IM聊天教程:发送图片/视频/语音/表情"),e("OutboundLink")],1),t._v(" "),e("br")])])}),[],!1,null,null,null);e.default=_.exports}}]);