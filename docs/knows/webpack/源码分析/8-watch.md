本系列文章记录了我在**webpack源码学习过程中**遇到的事情，  
正如前几篇文章介绍的那样，  
一路上我遇到了很多“**江湖人物**”。

例如，Compiler，Compilation，loader-runner，babel-loader，  
tapable，uglifyjs-webpack-plugin，worker-farm，cacahe，extract-text-webpack-plugin，等等。

所以我们可以说，**webpack江湖**是由这些“人物”组成的，而不是由文本组成的，  
这正是**面向对象编程**，和模块化编程的**精髓**所在。

就好比金庸先生的武侠小说，  
引人入胜的**故事情节**，离不开鲜活的**人物形象**。

在代码的世界中，  
我们看到的各种“人物”，也是真实存在的，  
它们反映了作者对**信息组织方式**的理解和认知。

故事由哪些**人物**组成，**主线剧情**是什么，  
哪些情节要详细介绍，哪些应该略过不表，  
这些都是把故事**讲清楚**而不得不考虑的事情。

本文我们继续学习webpack源码，  
了解webpack是怎样watch文件变更的。

### 1. 修改npm scripts

#### 1.1 加入watch命令

我们修改[debug-webpack](https://www.jianshu.com/p/2fa6562210ef)项目的package.json，增加一个新的npm scripts，

**

```
{
  ...
  "scripts": {
    ...
    "watch": "webpack --watch"
  },
  ...
}
```

这样我们就可以使用`npm run watch`来调用 `node_modules/.bin/webpack --watch`了。

#### 1.2 执行watch

我们在项目根目录中，执行 `npm run watch`，

**

```
$ npm run watch

> debug-webpack@1.0.0 watch ~/Test/debug-webpack
> webpack --watch


webpack is watching the files…

Hash: 2e91628041d9a877f709
Version: webpack 4.20.2
Time: 347ms
Built at: 2018-10-25 10:50:27
   Asset       Size  Chunks             Chunk Names
index.js  937 bytes       0  [emitted]  index
Entrypoint index = index.js
[0] ./src/index.js 8 bytes {0} [built]
```

命令执行完之后，并没有退出，  
它会监控源码文件，然后只对改变的文件进行重编译。

#### 1.3 修改源代码

我们修改一下src/index.js文件，把内容改成，

**

```
alert(1);
```

然后保存。  
我们发现命令行中，在以上输出内容的尾部，又增加了如下信息，

**

```
Hash: 3d9c84dc401a1a18ea6b
Version: webpack 4.20.2
Time: 238ms
Built at: 2018-10-25 10:53:51
   Asset       Size  Chunks             Chunk Names
index.js  938 bytes       0  [emitted]  index
Entrypoint index = index.js
[0] ./src/index.js 9 bytes {0} [built]
```

其中`Hash`值发生了变化。

### 2. webpack watch流程

#### 2.1 回顾compiler.run

在[第三篇](https://www.jianshu.com/p/4f6de2d34e29)文章中，我们知道，  
`npm run build`，调用了`node_modules/.bin/webpack`，它是一个软链接，  
原身在 node_modules/_webpack@4.20.2@webpack/bin/webpack.js。

然后 webpack/bin/webpack.js `require`了 webpack-cli/bin/cli.js，  
webpack-cli中引用了webpack模块，然后调用了`compiler.run`。

![](https://images.weserv.nl/?url=upload-images.jianshu.io/upload_images/1023733-8c2d5f36c92dd7da.png?imageMogr2/auto-orient/strip|imageView2/2/w/511/format/webp)

#### 2.2 webpack-cli调用compiler.watch

![](https://images.weserv.nl/?url=upload-images.jianshu.io/upload_images/1023733-f1040a80082fb26d.png?imageMogr2/auto-orient/strip|imageView2/2/w/511/format/webp)

与`npm run build`不同是，`npm run watch`会带参数 `--watch` 调用 node_modules/.bin/webpack，

**

```
$ node_modules/.bin/webpack --watch
```

这样会影响 webpack-cli的代码逻辑，  
重新分析 [webpack-cli/bin/cli.js](https://github.com/webpack/webpack-cli/blob/v3.1.2/bin/cli.js) ，我们发现在 [第518行](https://github.com/webpack/webpack-cli/blob/v3.1.2/bin/cli.js#L518)，判断了是否处于**watch模式**，

**

```
if (firstOptions.watch || options.watch) {
    ...
    compiler.watch(watchOptions, compilerCallback);
    ...
} else compiler.run(compilerCallback);
```

如果处于watch模式，就调用`compiler.watch`。  
通过写log我们得到`watchOptions`的值为`true`。

#### 2.3 如何debug

**（1）新建debug.js**

**

```
const webpack = require('webpack');
const options = require('./webpack.config');

const compiler = webpack(options);
compiler.watch(true, (...args) => { });
```

**（2）作为node脚本执行**

**

```
$ node debug.js
```

结果命令行什么也没输出，也没有返回，卡在了那里。

**（3）修改源代码**  
现在我们修改一下 src/index.js，然后保存，

**

```
alert(2);
```

**（4）检查编译结果**  
打开 dist/index.js ，文件内容如下，

**

```
!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t){alert(2)}]);
```

我们看到它已经更新了。

**（5）调试**  
这说明debug.js是有效的，我们**复现**了watch过程，  
接下来我们就可以在`compiler.watch`位置打断点，  
跟踪watch代码逻辑了。

![](https://images.weserv.nl/?url=upload-images.jianshu.io/upload_images/1023733-bebafb4ed644b5f7.png?imageMogr2/auto-orient/strip|imageView2/2/w/489/format/webp)

进行单步调试，流程跳转到了 [Compiler.js 第189行](https://github.com/webpack/webpack/blob/v4.20.2/lib/Compiler.js#L189) 的`watch` 方法中。

#### 2.4 watch循环

**（1）Watching类**

![](https://images.weserv.nl/?url=upload-images.jianshu.io/upload_images/1023733-0f9ba24b25b3b2b5.png?imageMogr2/auto-orient/strip|imageView2/2/w/511/format/webp)

查看[Compiler.js 第189行](https://github.com/webpack/webpack/blob/v4.20.2/lib/Compiler.js#L189)，`watch`是`Compiler`类的一个实例方法，

**

```
watch(watchOptions, handler) {
    ...
    return new Watching(this, watchOptions, handler);
}
```

其中`Watching` 是在 [webpack/bin/Watching.js](https://github.com/webpack/webpack/blob/v4.20.2/lib/Watching.js) 中实现的。

**（2）compiler.readRecords**

![](https://images.weserv.nl/?url=upload-images.jianshu.io/upload_images/1023733-efc543f23a4580cc.png?imageMogr2/auto-orient/strip|imageView2/2/w/511/format/webp)

`Watching`构造函数调用了`this.compiler.readRecords`，

**

```
class Watching {
    constructor(compiler, watchOptions, handler) {
        ...
        this.compiler.readRecords(err => {
            ...
            this._go();
        });
    }
}
```

`readRecords`位于[Compiler.js 第393行](https://github.com/webpack/webpack/blob/v4.20.2/lib/Compiler.js#L393)，

**

```
readRecords(callback) {
    if (!this.recordsInputPath) {
        ...
        return callback();
    }
    ...
}
```

它判断了，`compiler.recordsInputPath`这个属性，  
在我们的例子中，它为`undefined`，于是直接调用`callback`返回了。

`this.compiler.readRecords`返回后，会调用`this._go();` 。

**（3）watching._go**  
`this._go`是`Watching`类的实例方法，位于[Watching.js 第36行](https://github.com/webpack/webpack/blob/v4.20.2/lib/Watching.js#L36)，

**

```
_go() {
    ...
    this.compiler.hooks.watchRun.callAsync(this.compiler, err => {
        ...
        this.compiler.compile(onCompiled);
    });
}
```

它会先调用`compiler.hooks.watchRun`，然后再调用`compiler.compile`方法。  
`compiler.compile`方法我们已经很熟悉了，它会先make然后在seal。

**（4）onCompiled**  
`onCompiled`是`compiler.compile`做完之后的回调，它会处理把文件内容实际写到文件中的逻辑。

**

```
const onCompiled = (err, compilation) => {
    ...
    this.compiler.emitAssets(compilation, err => {
        ...
        this.compiler.emitRecords(err => {
            ...
            return this._done(null, compilation);
        });
    });
};
```

最终调用了`this._done`，它是`Watching`类的实例方法，位于[Watching.js 第88行](https://github.com/webpack/webpack/blob/v4.20.2/lib/Watching.js#L88)。

**

```
_done(err, compilation) {
    ...
    this.compiler.hooks.done.callAsync(stats, () => {
        ...
        if (!this.closed) {
            this.watch(
                ...
            );
        }
        ...
    });
}
```

`this._done`里面会触发`compiler.hooks.done`，表示编译完成了，  
然后调用`this.watch`开始监控文件的变更。

**（5）循环**

![](https://images.weserv.nl/?url=upload-images.jianshu.io/upload_images/1023733-9082a2709bd8153a.png?imageMogr2/auto-orient/strip|imageView2/2/w/511/format/webp)

`this.watch`是`Watching`类的一个方法，位于[Watching.js 第113行](https://github.com/webpack/webpack/blob/v4.20.2/lib/Watching.js#L113)，

**

```
watch(files, dirs, missing) {
    ...
    this.watcher = this.compiler.watchFileSystem.watch(
        ...
        (
            ...
        ) => {
            ...
            this._invalidate();
        },
        (fileName, changeTime) => {
            this.compiler.hooks.invalid.call(fileName, changeTime);
        }
    );
}
```

在文件发生变化时，会调用它的最后一个回调，从而触发`compiler.hooks.invalid`这个hooks。  
我们可以拿到发生变更的文件名`fileName`，和变更时间`changeTime`。

我们在这里打个断点，然后修改一下src/index.js再保存，会发现程序会跳转到这里，  
`fileName`的值为，

**

```
~/Test/debug-webpack/src/index.js
```

`changeTime`的值是一个时间戳，

**

```
1540440595000
```

这个hooks执行完之后，程序会跳转到`this.compiler.watchFileSystem.watch`的第一个回调中，  
调用`this._invalidate();` ，然后在`_invalidate`中又调用了`this._go();` 对源码进行重编译再写入到文件中，  
最后回到`this._done`，调用`this.watch`重新监控。

`_invalidate`方法，位于 [Watching.js 第155行](https://github.com/webpack/webpack/blob/v4.20.2/lib/Watching.js#L155)，

**

```
_invalidate() {
    ...
    if (...) {
        ...
    } else {
        this._go();
    }
}
```

### 3. watch原理

![](https://images.weserv.nl/?url=upload-images.jianshu.io/upload_images/1023733-6526f0962a98b7b0.png?imageMogr2/auto-orient/strip|imageView2/2/w/511/format/webp)

#### 3.1 NodeEnvironmentPlugin

那么webpack到底是怎样监控文件变更的呢？

在[Watching.js 第115行](https://github.com/webpack/webpack/blob/v4.20.2/lib/Watching.js#L115)，`Watching`类的`watch`方法中调用了，`this.compiler.watchFileSystem.watch`，

**

```
watch(files, dirs, missing) {
    ...
    this.watcher = this.compiler.watchFileSystem.watch(
        ...
        (
           ...
        ) => {
            ...
            this._invalidate();
        },
        (fileName, changeTime) => {
            this.compiler.hooks.invalid.call(fileName, changeTime);
        }
    );
}
```

然而我们在[Compiler.js](https://github.com/webpack/webpack/blob/v4.20.2/lib/Compiler.js)中却找不到`watchFileSystem`的定义。  
通过**全文搜索**，我们发现`watchFileSystem`属性，是由[lib/node/NodeEnvironmentPlugin.js](https://github.com/webpack/webpack/blob/v4.20.2/lib/node/NodeEnvironmentPlugin.js#L20) 添加上去的。

**

```
class NodeEnvironmentPlugin {
    apply(compiler) {
        ...
        compiler.watchFileSystem = new NodeWatchFileSystem(
            compiler.inputFileSystem
        );
        ...
    }
}
```

而`NodeWatchFileSystem` 则是由 [lib/node/NodeWatchFileSystem.js](https://github.com/webpack/webpack/blob/v4.20.2/lib/node/NodeWatchFileSystem.js)实现的，它的`watch`方法如下，

**

```
watch(files, dirs, missing, startTime, options, callback, callbackUndelayed) {
    ...
    this.watcher = new Watchpack(options);

    if (callbackUndelayed) {
        this.watcher.once("change", callbackUndelayed);
    }

    this.watcher.once("aggregated", (changes, removals) => {
        ...
        callback(
            ...
        );
    });

    this.watcher.watch(files.concat(missing), dirs.concat(missing), startTime);
    ...
}
```

它实例化了一个`WatchPack`对象，然后为`watcher`注册了两个事件监听器，  
当`change`事件发生时，会触发最后一个回调`callbackUndelayed`，  
`aggregated`事件发生时会触发第一个回调`callback`。

![](https://images.weserv.nl/?url=upload-images.jianshu.io/upload_images/1023733-5620e61b296a5004.png?imageMogr2/auto-orient/strip|imageView2/2/w/511/format/webp)

#### 3.2 WatchPack

其中`WatchPack`来自一个独立的代码库，它是由模块[watchpack](https://github.com/webpack/watchpack/tree/v1.6.0)（v1.6.0）导出的，  
它可以用来监控文件和目录的变更。

**（1）watchPack.watch**  
我们来看一下`WatchPack`的`watch`方法，

**

```
Watchpack.prototype.watch = function watch(files, directories, startTime) {
    ...
    this.fileWatchers = files.map(function(file) {
        return this._fileWatcher(file, watcherManager.watchFile(file, this.watcherOptions, startTime));
    }, this);
    this.dirWatchers = directories.map(function(dir) {
        return this._dirWatcher(dir, watcherManager.watchDirectory(dir, this.watcherOptions, startTime));
    }, this);
    ...
};
```

它调用了`_fileWatcher`或`_dirWatcher`方法，第一个参数是`file`或`dir`，  
第二个参数是一个`watcher`对象，根据`_fileWatcher`或`_dirWatcher`方法的形参我们可以确定这一点，

**

```
Watchpack.prototype._fileWatcher = function _fileWatcher(file, watcher) {
    watcher.on("change", function(mtime, type) {
        ...
    }.bind(this));
    watcher.on("remove", function(type) {
        ...
    }.bind(this));
    return watcher;
};

Watchpack.prototype._dirWatcher = function _dirWatcher(item, watcher) {
    watcher.on("change", function(file, mtime, type) {
        ...
    }.bind(this));
    return watcher;
};
```

它们只是调用了第二个参数`watcher`，为之注册了`change`和`remove`事件而已。  
因此，我们要重点考虑下`watcher`是怎么来的，  
查看`watch`方法，我们知道，`watcher`是由`watcherManager.watchFile`或`watchDirectory`创建的，

**

```
watcherManager.watchFile(file, this.watcherOptions, startTime)
watcherManager.watchDirectory(dir, this.watcherOptions, startTime)
```

**（2）watcherManager.watchDirectory**  
`watcherManager.watchFile`和`watcherManager.watchDirectory`，  
定义在[watchpack/lib/watchManager.js](https://github.com/webpack/watchpack/blob/v1.6.0/lib/watcherManager.js)中，

**

```
WatcherManager.prototype.watchFile = function watchFile(p, options, startTime) {
    ...
    return this.getDirectoryWatcher(directory, options).watch(p, startTime);
};

WatcherManager.prototype.watchDirectory = function watchDirectory(directory, options, startTime) {
    return this.getDirectoryWatcher(directory, options).watch(directory, startTime);
};
```

它们都调用了`getDirectoryWatcher`。  
而 `getDirectoryWatcher`中则创建了一个`DirectoryWatcher`对象执行`watch`操作。  
位于 [watchpack/lib/watchManager.js 第18行](https://github.com/webpack/watchpack/blob/v1.6.0/lib/watcherManager.js#L18)，

**

```
WatcherManager.prototype.getDirectoryWatcher = function(directory, options) {
    ... 
    if(...) {
        this.directoryWatchers[key] = new DirectoryWatcher(directory, options);
        ...
    }
    ...
};
```

**（3）DirectoryWatcher**  
`DirectoryWatcher`也是watchpack创建的对象，定义在 [watchpack/lib/DirectoryWatcher.js](https://github.com/webpack/watchpack/blob/v1.6.0/lib/DirectoryWatcher.js#L46)中，

**

```
function DirectoryWatcher(directoryPath, options) {
    ...
    this.watcher = chokidar.watch(directoryPath, {
        ...
    });
    ...
}
```

它调用了[chokidar](https://github.com/paulmillr/chokidar/tree/2.0.4)（v2.0.4）模块得到了一个`watcher`。  
chokidar，封装了Node.js内置的**fs.watch**方法，位于[chokidar/lib/nodefs-handler.js 第37行](https://github.com/paulmillr/chokidar/blob/2.0.4/lib/nodefs-handler.js#L37)，

**

```
return fs.watch(path, options, handleEvent);
```

fs.watch的文档可以参考这里，[Class: fs.FSWatcher](https://nodejs.org/dist/latest-v8.x/docs/api/fs.html#fs_class_fs_fswatcher)。  
总之，watchpack调用了chokidar，chokidar调用了fs.watch完成了watch操作。

![](https://images.weserv.nl/?url=upload-images.jianshu.io/upload_images/1023733-ab4e0b773f57950a.png?imageMogr2/auto-orient/strip|imageView2/2/w/511/format/webp)

* * *

### 参考

[webpack-cli v3.1.2 lib/cli.js](https://github.com/webpack/webpack-cli/blob/v3.1.2/bin/cli.js)  
[webpack v4.20.2 bin/Watching.js](https://github.com/webpack/webpack/blob/v4.20.2/lib/Watching.js)  
[watchpack v1.6.0](https://github.com/webpack/watchpack/tree/v1.6.0)  
[chokidar v2.0.4](https://github.com/paulmillr/chokidar/tree/2.0.4)
