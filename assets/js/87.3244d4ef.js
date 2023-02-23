(window.webpackJsonp=window.webpackJsonp||[]).push([[87],{318:function(e,n,a){"use strict";a.r(n);var s=a(14),t=Object(s.a)({},(function(){var e=this,n=e._self._c;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("p",[e._v("谈起PWA，许多人可能还只停留在“了解”的层面，比较少在实践中真正地尝试过，更多的仅仅是对着网上的教程和例子大概玩过。然而，网络上的例子多是简单的demo，鲜有与真正的开发相结合，例如和"),n("a",{attrs:{href:"https://so.csdn.net/so/search?q=webpack&spm=1001.2101.3001.7020",target:"_blank",rel:"noopener noreferrer"}},[e._v("webpack"),n("OutboundLink")],1),e._v("的工程化结合。这篇文章将会从一个webpack plugin出发，谈一谈如何使用这个名为"),n("code",[e._v("offline-plugin")]),e._v("的webpack插件轻松实现PWA。")]),e._v(" "),n("blockquote",[n("p",[e._v("由于PWA相关的文章太多，所以本文不再对“什么是PWA”，“PWA的生命周期”等基础内容再次赘述。")])]),e._v(" "),n("p",[n("code",[e._v("offline-plugin")]),e._v("相关链接：")]),e._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"https://github.com/NekR/offline-plugin",target:"_blank",rel:"noopener noreferrer"}},[e._v("offline-plugin"),n("OutboundLink")],1)]),e._v(" "),n("li",[n("a",{attrs:{href:"https://offline-plugin.now.sh/",target:"_blank",rel:"noopener noreferrer"}},[e._v("demo"),n("OutboundLink")],1)])]),e._v(" "),n("h1",{attrs:{id:"一、自动生成service-worker-js"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#一、自动生成service-worker-js"}},[e._v("#")]),e._v(" "),n("a",{attrs:{href:""}}),e._v("一、自动生成"),n("code",[e._v("service-worker.js")])]),e._v(" "),n("p",[e._v("PWA的核心可谓是"),n("code",[e._v("service-worker")]),e._v("（以后简称SW），任何一个PWA都有且只有一个"),n("code",[e._v("service-worker.js")]),e._v("文件，用于为SW添加资源列表，进行注册、激活等生命周期操作。但是在webpack构建的项目中，生成一个"),n("code",[e._v("service-worker.js")]),e._v("可能会面临两个较大的问题：")]),e._v(" "),n("ul",[n("li",[e._v("1、webpack生成的资源多会生成一串hash，sw的资源列表里面需要同步更新这些带hash的资源；")]),e._v(" "),n("li",[e._v("2、每次更新代码，都需要通过更新sw文件版本号来通知客户端对所缓存的资源进行更新。（其实只要这一次的sw代码和上一次的sw代码不一样即可触发更新，但使用明确的版本号会更加合适）。")])]),e._v(" "),n("p",[e._v("看到这你可能已经想到，万能的webpack社区是否已经提供了相应的plugin来帮我们自动处理这些事情呢？答案是肯定的。除了官方推荐的"),n("a",{attrs:{href:"https://github.com/goldhand/sw-precache-webpack-plugin",target:"_blank",rel:"noopener noreferrer"}},[e._v("sw-precache-webpack-plugin"),n("OutboundLink")],1),e._v("之外，还有我们今天的主角"),n("a",{attrs:{href:"https://github.com/NekR/offline-plugin",target:"_blank",rel:"noopener noreferrer"}},[e._v("offline-plugin"),n("OutboundLink")],1),e._v("。")]),e._v(" "),n("p",[e._v("相比与"),n("a",{attrs:{href:"https://github.com/goldhand/sw-precache-webpack-plugin",target:"_blank",rel:"noopener noreferrer"}},[e._v("sw-precache-webpack-plugin"),n("OutboundLink")],1),e._v("，个人认为"),n("a",{attrs:{href:"https://github.com/NekR/offline-plugin",target:"_blank",rel:"noopener noreferrer"}},[e._v("offline-plugin"),n("OutboundLink")],1),e._v("具有如下优点：")]),e._v(" "),n("ul",[n("li",[e._v("1、更多的可选配置项，满足更加细致的配置要求；")]),e._v(" "),n("li",[e._v("2、更为详细的文档和例子；")]),e._v(" "),n("li",[e._v("3、更新频率相对更高，star数更多；")]),e._v(" "),n("li",[e._v("4、自动处理生命周期，用户无需纠结生命周期的坑；")]),e._v(" "),n("li",[e._v("*5、支持AppCache；")]),e._v(" "),n("li",[e._v("6、自动生成"),n("code",[e._v("manifest")]),e._v("文件。")]),e._v(" "),n("li",[e._v("...")])]),e._v(" "),n("h1",{attrs:{id:"二、基本使用"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#二、基本使用"}},[e._v("#")]),e._v(" "),n("a",{attrs:{href:""}}),e._v("二、基本使用")]),e._v(" "),n("h3",{attrs:{id:"安装"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#安装"}},[e._v("#")]),e._v(" "),n("a",{attrs:{href:""}}),e._v("安装")]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("npm install offline-plugin [--save-dev]\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br")])]),n("h3",{attrs:{id:"初始化"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#初始化"}},[e._v("#")]),e._v(" "),n("a",{attrs:{href:""}}),e._v("初始化")]),e._v(" "),n("p",[e._v("第一步，进入"),n("code",[e._v("webpack.config")]),e._v(":")]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("// webpack.config.js example\n \nvar OfflinePlugin = require('offline-plugin');\n \nmodule.exports = {\n  // ...\n \n  plugins: [\n    // ... other plugins\n    // it's always better if OfflinePlugin is the last plugin added\n    new OfflinePlugin()\n  ]\n  // ...\n}\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br"),n("span",{staticClass:"line-number"},[e._v("4")]),n("br"),n("span",{staticClass:"line-number"},[e._v("5")]),n("br"),n("span",{staticClass:"line-number"},[e._v("6")]),n("br"),n("span",{staticClass:"line-number"},[e._v("7")]),n("br"),n("span",{staticClass:"line-number"},[e._v("8")]),n("br"),n("span",{staticClass:"line-number"},[e._v("9")]),n("br"),n("span",{staticClass:"line-number"},[e._v("10")]),n("br"),n("span",{staticClass:"line-number"},[e._v("11")]),n("br"),n("span",{staticClass:"line-number"},[e._v("12")]),n("br"),n("span",{staticClass:"line-number"},[e._v("13")]),n("br"),n("span",{staticClass:"line-number"},[e._v("14")]),n("br")])]),n("p",[e._v("第二步，把"),n("code",[e._v("runtime")]),e._v("添加到你的入口js文件当中：")]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("require('offline-plugin/runtime').install();\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br")])]),n("p",[e._v("ES6/Babel/TypeScript")]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("import * as OfflinePluginRuntime from 'offline-plugin/runtime';\nOfflinePluginRuntime.install();\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br")])]),n("p",[e._v("经过上面的步骤，"),n("code",[e._v("offline-plugin")]),e._v("已经集成到项目之中，通过webpack构建即可。")]),e._v(" "),n("h1",{attrs:{id:"三、配置"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#三、配置"}},[e._v("#")]),e._v(" "),n("a",{attrs:{href:""}}),e._v("三、配置")]),e._v(" "),n("p",[e._v("前面说过，"),n("code",[e._v("offline-plugin")]),e._v("支持细致的配置，以满足不同的需求。下面将介绍几个比较常用的配置项，方便大家进一步使用。")]),e._v(" "),n("ul",[n("li",[n("p",[n("a",{attrs:{href:"https://github.com/NekR/offline-plugin/blob/master/docs/caches.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("Caches: 'all' | Object"),n("OutboundLink")],1)]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("告诉插件应该缓存什么东西，并以何种方式进行缓存\n`all`: 意味着所有webpack构建出来的资源，以及在`externals`选项中的资源都会被缓存。\n`Object`: 包含三个数组或正则的配置对象（`main`, `additional`, `optional`），它们都是可选的，且默认为空。\n默认：`all`。\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br"),n("span",{staticClass:"line-number"},[e._v("4")]),n("br")])])]),e._v(" "),n("li",[n("p",[n("a",{attrs:{href:"https://github.com/NekR/offline-plugin/blob/master/docs/options.md#externals-arraystring",target:"_blank",rel:"noopener noreferrer"}},[e._v("externals: Array"),n("string",[n("OutboundLink")],1)],1)]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("允许开发者指定一些外部资源（比如CDN引用，或者不是通过webpack生成的资源）。配合`Caches`的`additional`项，能够实现缓存外部资源的功能。\n \n默认：`null`\n举例：`['fonts/roboto.woff']`\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br"),n("span",{staticClass:"line-number"},[e._v("4")]),n("br")])])]),e._v(" "),n("li",[n("p",[n("a",{attrs:{href:"https://github.com/NekR/offline-plugin/blob/master/docs/options.md#serviceworker-object--null--false",target:"_blank",rel:"noopener noreferrer"}},[e._v("ServiceWorker: Object | null | false"),n("OutboundLink")],1)]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("该对象包含多个配置项，这里仅列举最常用的。\n \n`events`：布尔值。允许runtime接受来自sw的消息，默认值为false。\n`navigateFallbackURL`：当一个URL请求从缓存或网络都无法被获取时，将会重定向到该选项所指向的URL。\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br"),n("span",{staticClass:"line-number"},[e._v("4")]),n("br")])])]),e._v(" "),n("li",[n("p",[n("a",{attrs:{href:"https://github.com/NekR/offline-plugin/blob/master/docs/options.md#appcache-object--null--false",target:"_blank",rel:"noopener noreferrer"}},[e._v("AppCache: Object | null | false"),n("OutboundLink")],1)]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("`offline-plugin`默认支持`AppCache`，但是`AppCache`草案已经被web标准所废弃，不建议使用。\n但是由于仍然有部分浏览器支持，所以插件默认提供这个功能。\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br")])])])]),e._v(" "),n("h1",{attrs:{id:"四、runtime"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#四、runtime"}},[e._v("#")]),e._v(" "),n("a",{attrs:{href:""}}),e._v("四、runtime")]),e._v(" "),n("p",[e._v("上一节介绍了"),n("code",[e._v("offline-plugin")]),e._v("在webpack当中的配置，这一节将介绍runtime的一些用法。"),n("br"),e._v("\n若要使"),n("code",[e._v("offline-plugin")]),e._v("生效，用户必须在入口js文件中通过runtime进行初始化操作：")]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("// 通过AMD方式\nrequire('offline-plugin/runtime').install();\n \n// 或者通过ES6/Babel/TypeScript方式\n \nimport * as OfflinePluginRuntime from 'offline-plugin/runtime';\nOfflinePluginRuntime.install();\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br"),n("span",{staticClass:"line-number"},[e._v("4")]),n("br"),n("span",{staticClass:"line-number"},[e._v("5")]),n("br"),n("span",{staticClass:"line-number"},[e._v("6")]),n("br"),n("span",{staticClass:"line-number"},[e._v("7")]),n("br")])]),n("p",[n("code",[e._v("OfflinePluginRuntime")]),e._v("对象提供了下列三个方法：")]),e._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"https://github.com/NekR/offline-plugin/blob/master/docs/runtime.md#installoptions-object",target:"_blank",rel:"noopener noreferrer"}},[e._v("install(options: Object)"),n("OutboundLink")],1),n("br"),e._v("\n开启ServiceWorker/AppCache的安装流程。这个方法是安全的，并且必须在页面初始化的时候就被调用。另外请勿把它放在任何的条件语句之内。（这句话不全对，在后面的降级方案里面会详细介绍）")]),e._v(" "),n("li",[n("a",{attrs:{href:"https://github.com/NekR/offline-plugin/blob/master/docs/runtime.md#applyupdate",target:"_blank",rel:"noopener noreferrer"}},[e._v("applyUpdate()"),n("OutboundLink")],1),n("br"),e._v("\n接受当前所安装的sw的更新信息。")]),e._v(" "),n("li",[n("a",{attrs:{href:"https://github.com/NekR/offline-plugin/blob/master/docs/runtime.md#update",target:"_blank",rel:"noopener noreferrer"}},[e._v("update()"),n("OutboundLink")],1),n("br"),e._v("\n检查新版本的ServiceWorker/AppCache的更新信息。")])]),e._v(" "),n("hr"),e._v(" "),n("p",[n("code",[e._v("runtime.install()")]),e._v("方法接受一个配置对象参数，用于处理sw各个生命周期里面的事件：")]),e._v(" "),n("ul",[n("li",[n("p",[n("a",{attrs:{href:"https://github.com/NekR/offline-plugin/blob/master/docs/runtime.md#oninstalled",target:"_blank",rel:"noopener noreferrer"}},[e._v("onInstalled"),n("OutboundLink")],1)]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("当ServiceWorker/AppCache被install时执行，可用于展示“APP已经支持离线访问”。\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br")])])]),e._v(" "),n("li",[n("p",[n("a",{attrs:{href:"https://github.com/NekR/offline-plugin/blob/master/docs/runtime.md#onupdating",target:"_blank",rel:"noopener noreferrer"}},[e._v("onUpdating"),n("OutboundLink")],1)]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("AppCache不支持该方法\n当更新信息被获取且浏览器正在进行资源更新时触发。在这个时刻，一些资源正在被下载。\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br")])])]),e._v(" "),n("li",[n("p",[n("a",{attrs:{href:"https://github.com/NekR/offline-plugin/blob/master/docs/runtime.md#onupdateready",target:"_blank",rel:"noopener noreferrer"}},[e._v("onUpdateReady"),n("OutboundLink")],1)]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("当`onUpdating`事件完成时触发。这时，所有资源都已经下载完毕。\n通过调用`runtime.applyUpdate()`方法来触发更新。\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br")])])]),e._v(" "),n("li",[n("p",[n("a",{attrs:{href:"https://github.com/NekR/offline-plugin/blob/master/docs/runtime.md#onupdatefailed",target:"_blank",rel:"noopener noreferrer"}},[e._v("onUpdateFailed"),n("OutboundLink")],1)]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("当`onUpdating`事件因为某些原因失败时触发。\n这时没有任何资源被下载，同时所有的资源更新进程都应该被取消或跳过。\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br")])])]),e._v(" "),n("li",[n("p",[n("a",{attrs:{href:"https://github.com/NekR/offline-plugin/blob/master/docs/runtime.md#onupdated",target:"_blank",rel:"noopener noreferrer"}},[e._v("onUpdated"),n("OutboundLink")],1)]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("当更新被接受时触发。\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br")])])])]),e._v(" "),n("h1",{attrs:{id:"五、降级方案"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#五、降级方案"}},[e._v("#")]),e._v(" "),n("a",{attrs:{href:""}}),e._v("五、降级方案")]),e._v(" "),n("p",[e._v("当某些时候我们需要撤掉sw进行降级的时候，我们需要主动注销sw。然而"),n("code",[e._v("offline-plugin")]),e._v("默认没有提供注销sw的"),n("code",[e._v("unregister()")]),e._v("方法，所以我们需要自己实现。")]),e._v(" "),n("p",[e._v("其实要主动注销sw非常简单，我们可以直接调用"),n("code",[e._v("ServiceWorkerContainer.getRegistrations()")]),e._v("方法来拿到"),n("code",[e._v("registration")]),e._v("实例，然后调用"),n("code",[e._v("registration.unregister()")]),e._v("方法即可，具体代码如下：")]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("if ('serviceWorker' in navigator) {\n  navigator.serviceWorker.getRegistration().then((registration) => {\n    registration && registration.unregister().then((boolean) => {\n      boolean ? alert('注销成功') : alert('注销失败')\n    });\n  })\n}\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br"),n("span",{staticClass:"line-number"},[e._v("4")]),n("br"),n("span",{staticClass:"line-number"},[e._v("5")]),n("br"),n("span",{staticClass:"line-number"},[e._v("6")]),n("br"),n("span",{staticClass:"line-number"},[e._v("7")]),n("br")])]),n("p",[e._v("在调用该方法后，sw已经被注销，刷新一下页面就能看到资源是重新从网络获取的了。")]),e._v(" "),n("p",[e._v("在真实的生产环境中，我们可以通过调用接口，来决定是否使用降级方案：")]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("fetch(URL).then((switch) => {\n  if (switch) {\n    OfflinePluginRuntime.install()\n  } else {\n    if ('serviceWorker' in navigator) {\n      navigator.serviceWorker.getRegistration().then((registration) => {\n        registration && registration.unregister().then((boolean) => {\n          boolean ? alert('注销成功') : alert('注销失败')\n        })\n      })\n    }\n  }\n})\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br"),n("span",{staticClass:"line-number"},[e._v("4")]),n("br"),n("span",{staticClass:"line-number"},[e._v("5")]),n("br"),n("span",{staticClass:"line-number"},[e._v("6")]),n("br"),n("span",{staticClass:"line-number"},[e._v("7")]),n("br"),n("span",{staticClass:"line-number"},[e._v("8")]),n("br"),n("span",{staticClass:"line-number"},[e._v("9")]),n("br"),n("span",{staticClass:"line-number"},[e._v("10")]),n("br"),n("span",{staticClass:"line-number"},[e._v("11")]),n("br"),n("span",{staticClass:"line-number"},[e._v("12")]),n("br"),n("span",{staticClass:"line-number"},[e._v("13")]),n("br")])]),n("h1",{attrs:{id:"六、遇到的坑"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#六、遇到的坑"}},[e._v("#")]),e._v(" "),n("a",{attrs:{href:""}}),e._v("六、遇到的坑")]),e._v(" "),n("p",[e._v("在具体实践中，遇到一个比较大的坑，就是"),n("code",[e._v("sw.js")]),e._v("文件的更新。")]),e._v(" "),n("p",[e._v("在service worker的设计中，浏览器每一次加载站点的URL，都会重新请求一遍"),n("code",[e._v("sw.js")]),e._v("。若发现这一次的"),n("code",[e._v("sw.js")]),e._v("内容和上一次的不一样，就会判定为资源更新，重新触发sw的生命周期。然而，"),n("code",[e._v("sw.js")]),e._v("也是一个普通的js资源文件，会默认使用服务器设置的expired时间，也就是它的"),n("code",[e._v("max-age")]),e._v("。在理解了service worker的设计后，我们不难发现，"),n("code",[e._v("sw.js")]),e._v("的"),n("code",[e._v("max-age")]),e._v("应该尽可能短，以便浏览器能够及时更新资源列表。")]),e._v(" "),n("p",[e._v("这也是我在研究阶段直接使用"),n("code",[e._v("http-server")]),e._v("时所发现的问题。后来在官方的例子中，我发现"),n("code",[e._v("npm script")]),e._v("里面是这么写的：")]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('"start": "http-server ./dist -p 7474 -c no-cache"\n')])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br")])]),n("p",[e._v("直接指定了所有资源都不使用缓存，这一点值得我们注意。")]),e._v(" "),n("p",[e._v("另外，"),n("code",[e._v("webpack-dev-server")]),e._v("里无法正常使用"),n("code",[e._v("offline-plugin")]),e._v("，因为它需要具体的文件去生成"),n("code",[e._v("sw.js")]),e._v("，但是通过"),n("code",[e._v("webpack-dev-server")]),e._v("构建的项目，其文件是存放在内存中的，所以无法和"),n("code",[e._v("offline-plugin")]),e._v("正常搭配使用。建议仅在"),n("strong",[e._v("生产模式")]),e._v("内使用"),n("code",[e._v("offline-plugin")]),e._v("。")]),e._v(" "),n("h1",{attrs:{id:"七、添加到主屏"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#七、添加到主屏"}},[e._v("#")]),e._v(" "),n("a",{attrs:{href:""}}),e._v("七、添加到主屏")]),e._v(" "),n("p",[e._v("手机浏览器都提供了“添加到主屏”的功能，但普通的网站添加到主屏，仅仅是把网站的书签放到桌面。如果要想把网站以PWA的形式添加到主屏，我们需要一个"),n("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Web/Manifest",target:"_blank",rel:"noopener noreferrer"}},[e._v("manifest.json文件"),n("OutboundLink")],1),e._v("：")]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('{\n  "name": "offline-plugin",\n  "icons": [\n    {\n      "src": "/android-chrome-192x192.png",\n      "sizes": "192x192",\n      "type": "image/png"\n    },\n    {\n      "src": "/android-chrome-512x512.png",\n      "sizes": "512x512",\n      "type": "image/png"\n    }\n  ],\n  "theme_color": "#181743",\n  "background_color": "#181743",\n  "start_url": "/",\n  "display": "standalone"\n}\n')])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br"),n("span",{staticClass:"line-number"},[e._v("4")]),n("br"),n("span",{staticClass:"line-number"},[e._v("5")]),n("br"),n("span",{staticClass:"line-number"},[e._v("6")]),n("br"),n("span",{staticClass:"line-number"},[e._v("7")]),n("br"),n("span",{staticClass:"line-number"},[e._v("8")]),n("br"),n("span",{staticClass:"line-number"},[e._v("9")]),n("br"),n("span",{staticClass:"line-number"},[e._v("10")]),n("br"),n("span",{staticClass:"line-number"},[e._v("11")]),n("br"),n("span",{staticClass:"line-number"},[e._v("12")]),n("br"),n("span",{staticClass:"line-number"},[e._v("13")]),n("br"),n("span",{staticClass:"line-number"},[e._v("14")]),n("br"),n("span",{staticClass:"line-number"},[e._v("15")]),n("br"),n("span",{staticClass:"line-number"},[e._v("16")]),n("br"),n("span",{staticClass:"line-number"},[e._v("17")]),n("br"),n("span",{staticClass:"line-number"},[e._v("18")]),n("br"),n("span",{staticClass:"line-number"},[e._v("19")]),n("br")])]),n("p",[e._v("然后，把这个"),n("code",[e._v("manifest.json")]),e._v("和其他"),n("strong",[e._v("静态资源")]),e._v("一并打包到网站根目录即可：")]),e._v(" "),n("p",[n("img",{attrs:{src:"https://image-static.segmentfault.com/228/378/228378582-5992a5e5b77d5_articlex",alt:"clipboard.png"}})]),e._v(" "),n("p",[e._v("示例地址：")]),e._v(" "),n("p",[n("img",{attrs:{src:"https://image-static.segmentfault.com/474/681/474681700-5992a9a45305c_articlex",alt:"clipboard.png"}})]),e._v(" "),n("p",[e._v("打开chrome开发者工具，进入到"),n("code",[e._v("Application")]),e._v("一列，选择"),n("code",[e._v("Manifest")]),e._v("，就可以看到效果了：")]),e._v(" "),n("p",[n("img",{attrs:{src:"https://image-static.segmentfault.com/638/669/638669649-5992a7528ca04_articlex",alt:"clipboard.png"}})]),e._v(" "),n("p",[n("s",[e._v("截止到"),n("strong",[e._v("目前（2017年8月15日）")]),e._v(" ，我所使用的"),n("strong",[e._v("iOS10.3.2")]),e._v("版本的iPhone7手机，已经支持PWA了，效果如下：")]),n("br"),e._v("\n经过查阅大量的资料，到目前为止，iOS并不支持PWA，但是可以通过在html里面添加几个标签，实现web页面和原生APP相似的体验效果：")]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('应用图标：\n<link rel="apple-touch-icon" href=“/custom_icon.png">\n \n启动画面：\n<link rel="apple-touch-startup-image" href="/launch.png">\n \n应用名称：\n<meta name="apple-mobile-web-app-title" content="AppTitle">\n \n全屏效果：\n<meta name="apple-mobile-web-app-capable" content="yes">\n \n设置状态栏颜色：\n<meta name="apple-mobile-web-app-status-bar-style" content="black">\n')])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br"),n("span",{staticClass:"line-number"},[e._v("4")]),n("br"),n("span",{staticClass:"line-number"},[e._v("5")]),n("br"),n("span",{staticClass:"line-number"},[e._v("6")]),n("br"),n("span",{staticClass:"line-number"},[e._v("7")]),n("br"),n("span",{staticClass:"line-number"},[e._v("8")]),n("br"),n("span",{staticClass:"line-number"},[e._v("9")]),n("br"),n("span",{staticClass:"line-number"},[e._v("10")]),n("br"),n("span",{staticClass:"line-number"},[e._v("11")]),n("br"),n("span",{staticClass:"line-number"},[e._v("12")]),n("br"),n("span",{staticClass:"line-number"},[e._v("13")]),n("br"),n("span",{staticClass:"line-number"},[e._v("14")]),n("br")])]),n("p",[n("em",[e._v("使用safari打开")]),n("br"),e._v(" "),n("img",{attrs:{src:"https://image-static.segmentfault.com/215/424/2154246445-5992a915e727d_articlex",alt:"clipboard.png"}})]),e._v(" "),n("p",[n("em",[e._v("添加到主屏后打开")]),n("br"),e._v(" "),n("img",{attrs:{src:"https://image-static.segmentfault.com/255/754/2557542468-5992a94d15fe9_articlex",alt:"clipboard.png"}})]),e._v(" "),n("p",[n("em",[e._v("离线后从主屏打开")])]),e._v(" "),n("p",[n("img",{attrs:{src:"https://image-static.segmentfault.com/344/556/3445561097-5992a97a08a65_articlex",alt:"clipboard.png"}})]),e._v(" "),n("p",[n("em",[e._v("打开任务管理器")])]),e._v(" "),n("p",[n("img",{attrs:{src:"%22https://image-static.segmentfault.com/283/022/2830225837-5992a9ee95065_articlex%22",alt:"clipboard.png"}})]),e._v(" "),n("p",[e._v("可以看到，PWA无论从表现还是功能，都像一个独立的APP那样存在。")]),e._v(" "),n("h1",{attrs:{id:"八、尾声"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#八、尾声"}},[e._v("#")]),e._v(" "),n("a",{attrs:{href:""}}),e._v("八、尾声")]),e._v(" "),n("p",[n("s",[e._v("原来一直以为苹果对PWA支持不好，但通过这次实践，可以知道其实PWA也取得了极大的推进，开发者们可以开心地搭建自己的PWA啦！")]),n("br"),e._v("\n结论不能下太早。。。")]),e._v(" "),n("p",[e._v("相关资源："),n("a",{attrs:{href:"https://download.csdn.net/download/weixin_42124743/15089649?spm=1001.2101.3001.5697",target:"_blank",rel:"noopener noreferrer"}},[e._v("parse-"),n("em",[e._v("offline")]),e._v(":解析JSSDK插件,用于离线处理"),n("em",[e._v("PWA")]),e._v("-其它代码类资源..."),n("OutboundLink")],1)])])}),[],!1,null,null,null);n.default=t.exports}}]);