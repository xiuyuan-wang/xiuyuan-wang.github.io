谈起PWA，许多人可能还只停留在“了解”的层面，比较少在实践中真正地尝试过，更多的仅仅是对着网上的教程和例子大概玩过。然而，网络上的例子多是简单的demo，鲜有与真正的开发相结合，例如和[webpack](https://so.csdn.net/so/search?q=webpack&spm=1001.2101.3001.7020)的工程化结合。这篇文章将会从一个webpack plugin出发，谈一谈如何使用这个名为`offline-plugin`的webpack插件轻松实现PWA。

> 由于PWA相关的文章太多，所以本文不再对“什么是PWA”，“PWA的生命周期”等基础内容再次赘述。

`offline-plugin`相关链接：

-   [offline-plugin](https://github.com/NekR/offline-plugin)
-   [demo](https://offline-plugin.now.sh/)

# []()一、自动生成`service-worker.js`

PWA的核心可谓是`service-worker`（以后简称SW），任何一个PWA都有且只有一个`service-worker.js`文件，用于为SW添加资源列表，进行注册、激活等生命周期操作。但是在webpack构建的项目中，生成一个`service-worker.js`可能会面临两个较大的问题：

-   1、webpack生成的资源多会生成一串hash，sw的资源列表里面需要同步更新这些带hash的资源；
-   2、每次更新代码，都需要通过更新sw文件版本号来通知客户端对所缓存的资源进行更新。（其实只要这一次的sw代码和上一次的sw代码不一样即可触发更新，但使用明确的版本号会更加合适）。

看到这你可能已经想到，万能的webpack社区是否已经提供了相应的plugin来帮我们自动处理这些事情呢？答案是肯定的。除了官方推荐的[sw-precache-webpack-plugin](https://github.com/goldhand/sw-precache-webpack-plugin)之外，还有我们今天的主角[offline-plugin](https://github.com/NekR/offline-plugin)。

相比与[sw-precache-webpack-plugin](https://github.com/goldhand/sw-precache-webpack-plugin)，个人认为[offline-plugin](https://github.com/NekR/offline-plugin)具有如下优点：

-   1、更多的可选配置项，满足更加细致的配置要求；
-   2、更为详细的文档和例子；
-   3、更新频率相对更高，star数更多；
-   4、自动处理生命周期，用户无需纠结生命周期的坑；
-   *5、支持AppCache；
-   6、自动生成`manifest`文件。
-   ...

# []()二、基本使用

### []()安装

```
npm install offline-plugin [--save-dev]
```

### []()初始化

第一步，进入`webpack.config`:

```
// webpack.config.js example
 
var OfflinePlugin = require('offline-plugin');
 
module.exports = {
  // ...
 
  plugins: [
    // ... other plugins
    // it's always better if OfflinePlugin is the last plugin added
    new OfflinePlugin()
  ]
  // ...
}
```

第二步，把`runtime`添加到你的入口js文件当中：

```
require('offline-plugin/runtime').install();
```

ES6/Babel/TypeScript

```
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
OfflinePluginRuntime.install();
```

经过上面的步骤，`offline-plugin`已经集成到项目之中，通过webpack构建即可。

# []()三、配置

前面说过，`offline-plugin`支持细致的配置，以满足不同的需求。下面将介绍几个比较常用的配置项，方便大家进一步使用。

-   [Caches: 'all' | Object](https://github.com/NekR/offline-plugin/blob/master/docs/caches.md)

    ```
    告诉插件应该缓存什么东西，并以何种方式进行缓存
    `all`: 意味着所有webpack构建出来的资源，以及在`externals`选项中的资源都会被缓存。
    `Object`: 包含三个数组或正则的配置对象（`main`, `additional`, `optional`），它们都是可选的，且默认为空。
    默认：`all`。
    ```

-   [externals: Array<string>](https://github.com/NekR/offline-plugin/blob/master/docs/options.md#externals-arraystring)

    ```
    允许开发者指定一些外部资源（比如CDN引用，或者不是通过webpack生成的资源）。配合`Caches`的`additional`项，能够实现缓存外部资源的功能。
     
    默认：`null`
    举例：`['fonts/roboto.woff']`
    ```

-   [ServiceWorker: Object | null | false](https://github.com/NekR/offline-plugin/blob/master/docs/options.md#serviceworker-object--null--false)

    ```
    该对象包含多个配置项，这里仅列举最常用的。
     
    `events`：布尔值。允许runtime接受来自sw的消息，默认值为false。
    `navigateFallbackURL`：当一个URL请求从缓存或网络都无法被获取时，将会重定向到该选项所指向的URL。
    ```

-   [AppCache: Object | null | false](https://github.com/NekR/offline-plugin/blob/master/docs/options.md#appcache-object--null--false)

    ```
    `offline-plugin`默认支持`AppCache`，但是`AppCache`草案已经被web标准所废弃，不建议使用。
    但是由于仍然有部分浏览器支持，所以插件默认提供这个功能。
    ```

# []()四、runtime

上一节介绍了`offline-plugin`在webpack当中的配置，这一节将介绍runtime的一些用法。  
若要使`offline-plugin`生效，用户必须在入口js文件中通过runtime进行初始化操作：

```
// 通过AMD方式
require('offline-plugin/runtime').install();
 
// 或者通过ES6/Babel/TypeScript方式
 
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
OfflinePluginRuntime.install();
```

`OfflinePluginRuntime`对象提供了下列三个方法：

-   [install(options: Object)](https://github.com/NekR/offline-plugin/blob/master/docs/runtime.md#installoptions-object)  
    开启ServiceWorker/AppCache的安装流程。这个方法是安全的，并且必须在页面初始化的时候就被调用。另外请勿把它放在任何的条件语句之内。（这句话不全对，在后面的降级方案里面会详细介绍）
-   [applyUpdate()](https://github.com/NekR/offline-plugin/blob/master/docs/runtime.md#applyupdate)  
    接受当前所安装的sw的更新信息。
-   [update()](https://github.com/NekR/offline-plugin/blob/master/docs/runtime.md#update)  
    检查新版本的ServiceWorker/AppCache的更新信息。

* * *

`runtime.install()`方法接受一个配置对象参数，用于处理sw各个生命周期里面的事件：

-   [onInstalled](https://github.com/NekR/offline-plugin/blob/master/docs/runtime.md#oninstalled)

    ```
    当ServiceWorker/AppCache被install时执行，可用于展示“APP已经支持离线访问”。
    ```

-   [onUpdating](https://github.com/NekR/offline-plugin/blob/master/docs/runtime.md#onupdating)

    ```
    AppCache不支持该方法
    当更新信息被获取且浏览器正在进行资源更新时触发。在这个时刻，一些资源正在被下载。
    ```

-   [onUpdateReady](https://github.com/NekR/offline-plugin/blob/master/docs/runtime.md#onupdateready)

    ```
    当`onUpdating`事件完成时触发。这时，所有资源都已经下载完毕。
    通过调用`runtime.applyUpdate()`方法来触发更新。
    ```

-   [onUpdateFailed](https://github.com/NekR/offline-plugin/blob/master/docs/runtime.md#onupdatefailed)

    ```
    当`onUpdating`事件因为某些原因失败时触发。
    这时没有任何资源被下载，同时所有的资源更新进程都应该被取消或跳过。
    ```

-   [onUpdated](https://github.com/NekR/offline-plugin/blob/master/docs/runtime.md#onupdated)

    ```
    当更新被接受时触发。
    ```

# []()五、降级方案

当某些时候我们需要撤掉sw进行降级的时候，我们需要主动注销sw。然而`offline-plugin`默认没有提供注销sw的`unregister()`方法，所以我们需要自己实现。

其实要主动注销sw非常简单，我们可以直接调用`ServiceWorkerContainer.getRegistrations()`方法来拿到`registration`实例，然后调用`registration.unregister()`方法即可，具体代码如下：

```
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistration().then((registration) => {
    registration && registration.unregister().then((boolean) => {
      boolean ? alert('注销成功') : alert('注销失败')
    });
  })
}
```

在调用该方法后，sw已经被注销，刷新一下页面就能看到资源是重新从网络获取的了。

在真实的生产环境中，我们可以通过调用接口，来决定是否使用降级方案：

```
fetch(URL).then((switch) => {
  if (switch) {
    OfflinePluginRuntime.install()
  } else {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        registration && registration.unregister().then((boolean) => {
          boolean ? alert('注销成功') : alert('注销失败')
        })
      })
    }
  }
})
```

# []()六、遇到的坑

在具体实践中，遇到一个比较大的坑，就是`sw.js`文件的更新。

在service worker的设计中，浏览器每一次加载站点的URL，都会重新请求一遍`sw.js`。若发现这一次的`sw.js`内容和上一次的不一样，就会判定为资源更新，重新触发sw的生命周期。然而，`sw.js`也是一个普通的js资源文件，会默认使用服务器设置的expired时间，也就是它的`max-age`。在理解了service worker的设计后，我们不难发现，`sw.js`的`max-age`应该尽可能短，以便浏览器能够及时更新资源列表。

这也是我在研究阶段直接使用`http-server`时所发现的问题。后来在官方的例子中，我发现`npm script`里面是这么写的：

```
"start": "http-server ./dist -p 7474 -c no-cache"
```

直接指定了所有资源都不使用缓存，这一点值得我们注意。

另外，`webpack-dev-server`里无法正常使用`offline-plugin`，因为它需要具体的文件去生成`sw.js`，但是通过`webpack-dev-server`构建的项目，其文件是存放在内存中的，所以无法和`offline-plugin`正常搭配使用。建议仅在**生产模式**内使用`offline-plugin`。

# []()七、添加到主屏

手机浏览器都提供了“添加到主屏”的功能，但普通的网站添加到主屏，仅仅是把网站的书签放到桌面。如果要想把网站以PWA的形式添加到主屏，我们需要一个[manifest.json文件](https://developer.mozilla.org/en-US/docs/Web/Manifest)：

```
{
  "name": "offline-plugin",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#181743",
  "background_color": "#181743",
  "start_url": "/",
  "display": "standalone"
}
```

然后，把这个`manifest.json`和其他**静态资源**一并打包到网站根目录即可：

![clipboard.png](https://image-static.segmentfault.com/228/378/228378582-5992a5e5b77d5_articlex)

示例地址：

![clipboard.png](https://image-static.segmentfault.com/474/681/474681700-5992a9a45305c_articlex)

打开chrome开发者工具，进入到`Application`一列，选择`Manifest`，就可以看到效果了：

![clipboard.png](https://image-static.segmentfault.com/638/669/638669649-5992a7528ca04_articlex)

~~截止到**目前（2017年8月15日）** ，我所使用的**iOS10.3.2**版本的iPhone7手机，已经支持PWA了，效果如下：~~  
经过查阅大量的资料，到目前为止，iOS并不支持PWA，但是可以通过在html里面添加几个标签，实现web页面和原生APP相似的体验效果：

```
应用图标：
<link rel="apple-touch-icon" href=“/custom_icon.png">
 
启动画面：
<link rel="apple-touch-startup-image" href="/launch.png">
 
应用名称：
<meta name="apple-mobile-web-app-title" content="AppTitle">
 
全屏效果：
<meta name="apple-mobile-web-app-capable" content="yes">
 
设置状态栏颜色：
<meta name="apple-mobile-web-app-status-bar-style" content="black">
```

*使用safari打开*  
![clipboard.png](https://image-static.segmentfault.com/215/424/2154246445-5992a915e727d_articlex)

*添加到主屏后打开*  
![clipboard.png](https://image-static.segmentfault.com/255/754/2557542468-5992a94d15fe9_articlex)

*离线后从主屏打开*

![clipboard.png](https://image-static.segmentfault.com/344/556/3445561097-5992a97a08a65_articlex)

*打开任务管理器*

![clipboard.png]( "https://image-static.segmentfault.com/283/022/2830225837-5992a9ee95065_articlex")

可以看到，PWA无论从表现还是功能，都像一个独立的APP那样存在。

# []()八、尾声

~~原来一直以为苹果对PWA支持不好，但通过这次实践，可以知道其实PWA也取得了极大的推进，开发者们可以开心地搭建自己的PWA啦！~~  
结论不能下太早。。。

相关资源：[parse-*offline*:解析JSSDK插件,用于离线处理*PWA*-其它代码类资源...](https://download.csdn.net/download/weixin_42124743/15089649?spm=1001.2101.3001.5697)