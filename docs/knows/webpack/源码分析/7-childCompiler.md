前几篇文章中，我们介绍了webpack v4.20.2相关的内容，  
但是很多老项目，还在使用webpack 3，  
也要一些常用的代码库在webpack 4中是不兼容的。

例如，**extract-text-webpack-plugin**，目前仍不兼容webpack 4，  
可以参考github中这个issue，[Webpack 4 compatibility](https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/701)。

而且，我在学习webpack源码的过程中，  
extract-text-webpack-plugin这个插件，确实给我造成了不小的**困扰**，  
它用到了childCompiler这个概念，很值得一看。

本文我们自成体系，来看看webpack 3项目，以及extract-text-webpack-plugin的实现逻辑。  
一图胜千言，

![](https://images.weserv.nl/?url=upload-images.jianshu.io/upload_images/1023733-5ea9bd96ee2b6daf.png?imageMogr2/auto-orient/strip|imageView2/2/w/511/format/webp)

### 1. webpack 3示例应用

#### 1.1 初始化

**

```
$ mkdir ~/Test/debug-webpack3
$ cd ~/Test/debug-webpack3
$ npm init -f
```

#### 1.2 安装依赖

**

```
$ npm i -D \
webpack@3.11.0 \
babel-loader@7.1.3 \
babel-core@6.26.0 \
babel-preset-env@1.6.1 \
extract-text-webpack-plugin@3.0.2 \
css-loader@0.28.10 \
less-loader@4.0.6 \
less@2.7.3
```

#### 1.3 配置webpack

新建webpack.config.js，

**

```
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        index: path.resolve(__dirname, 'src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: '[name].js',
    },
    module: {
        rules: [
            { test: /.js$/, use: { loader: 'babel-loader', query: { presets: ['babel-preset-env'] } } },
            {
                test: /.less$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        { loader: 'css-loader' },
                        { loader: 'less-loader' },
                    ],
                }),
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
        }),
    ]
};
```

以上代码中，我们使用了extract-text-webpack-plugin，  
（1）对于 .less 文件，使用`ExtractTextPlugin.extract`配置loader  
（2）在`plugins`中，增加了一个`ExtractTextPlugin`的实例

**注：**  
虽然我们已经为`ExtractTextPlugin`实例配置了`filename`，  
但是extract-text-webpack-plugin仍然需要webpack.config.js导出`output.filename`，  
所以，我们在第`10`行`output`属性中增加了`filename`字段。

#### 1.4 添加npm scripts

打开package.json，为`scripts`属性添加一个`build`字段，值为`"webpack"`

**

```
{
  ...
  "scripts": {
    ...
    "build": "webpack"
  },
  ...
}
```

#### 1.5 新建源码文件

**（1）src/index.js**

**

```
import './index.less';

alert();
```

**（2）src/index.less**

**

```
body {
    background: gray;
}
```

#### 1.6 编译打包

**

```
$ npm run build

> debug-webpack3@1.0.0 build ~/Test/debug-webpack3
> webpack

Hash: 1b8999f3bb679ecffd56
Version: webpack 3.11.0
Time: 673ms
    Asset      Size  Chunks             Chunk Names
 index.js   2.64 kB       0  [emitted]  index
index.css  29 bytes       0  [emitted]  index
   [0] ./src/index.js 49 bytes {0} [built]
   [1] ./src/index.less 41 bytes {0} [built]
    + 1 hidden module
Child extract-text-webpack-plugin node_modules/_extract-text-webpack-plugin@3.0.2@extract-text-webpack-plugin/dist node_modules/_css-loader@0.28.10@css-loader/index.js!node_modules/_less-loader@4.0.6@less-loader/dist/cjs.js!src/index.less:
       [0] ./node_modules/_css-loader@0.28.10@css-loader!./node_modules/_less-loader@4.0.6@less-loader/dist/cjs.js!./src/index.less 211 bytes {0} [built]
        + 1 hidden module
```

#### 1.7 查看编译结果

**（1）dist/index.js**

**

```
/******/ (function(modules) { // webpackBootstrap
/******/    // The module cache
/******/    var installedModules = {};
/******/
/******/    // The require function
/******/    function __webpack_require__(moduleId) {
/******/
/******/        // Check if module is in cache
/******/        if(installedModules[moduleId]) {
/******/            return installedModules[moduleId].exports;
/******/        }
/******/        // Create a new module (and put it into the cache)
/******/        var module = installedModules[moduleId] = {
/******/            i: moduleId,
/******/            l: false,
/******/            exports: {}
/******/        };
/******/
/******/        // Execute the module function
/******/        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/        // Flag the module as loaded
/******/        module.l = true;
/******/
/******/        // Return the exports of the module
/******/        return module.exports;
/******/    }
/******/
/******/
/******/    // expose the modules object (__webpack_modules__)
/******/    __webpack_require__.m = modules;
/******/
/******/    // expose the module cache
/******/    __webpack_require__.c = installedModules;
/******/
/******/    // define getter function for harmony exports
/******/    __webpack_require__.d = function(exports, name, getter) {
/******/        if(!__webpack_require__.o(exports, name)) {
/******/            Object.defineProperty(exports, name, {
/******/                configurable: false,
/******/                enumerable: true,
/******/                get: getter
/******/            });
/******/        }
/******/    };
/******/
/******/    // getDefaultExport function for compatibility with non-harmony modules
/******/    __webpack_require__.n = function(module) {
/******/        var getter = module && module.__esModule ?
/******/            function getDefault() { return module['default']; } :
/******/            function getModuleExports() { return module; };
/******/        __webpack_require__.d(getter, 'a', getter);
/******/        return getter;
/******/    };
/******/
/******/    // Object.prototype.hasOwnProperty.call
/******/    __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/    // __webpack_public_path__
/******/    __webpack_require__.p = "";
/******/
/******/    // Load entry module and return exports
/******/    return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

alert();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
```

**（2）dist/index.css**

**

```
body {
  background: gray;
}
```

### 2. 调试webpack3

#### 2.1 新建debug.js

**

```
const webpack = require('webpack');
const options = require('./config/webpack.config');

const compiler = webpack(options);

compiler.run((...args) => {
    console.log(...args);
});
```

#### 2.2 使用vscode进行调试

在以上代码第`6`行中，打个断点，保持光标位于该文件中，按`F5`。  
然后程序停在了断点处，

![](https://images.weserv.nl/?url=upload-images.jianshu.io/upload_images/1023733-43c9ada51194dc31.png?imageMogr2/auto-orient/strip|imageView2/2/w/473/format/webp)

#### 2.3 轻车熟路

前几篇中，我们已经对webpack v4.20.2有了一定的了解，  
现在虽然是webpack3（v.3.11.0），我们还是能够驾轻就熟。

`compiler.run`，会跳入[Compiler.js 第226行](https://github.com/webpack/webpack/blob/v3.11.0/lib/Compiler.js#L226)的`run`方法中，

**

```
run(callback) {
    ...
    this.applyPluginsAsync("before-run", this, err => {
        ...
        this.applyPluginsAsync("run", this, err => {
            ...
            this.readRecords(err => {
                ...
                this.compile(onCompiled);
            });
        });
    });
}
```

与之前的v4.20.2对比一下， [webpack 4.20.2 Compiler.js 第198行](https://github.com/webpack/webpack/blob/v4.20.2/lib/Compiler.js#L198)，

**

```
run(callback) {
    ...
    this.hooks.beforeRun.callAsync(this, err => {
        ...
        this.hooks.run.callAsync(this, err => {
            ...
            this.readRecords(err => {
                ...
                this.compile(onCompiled);
            });
        });
    });
}
```

我们发现，webpack3中的`this.applyPluginsAsync("before-run", this, err => {`，  
刚好对应与webpack4中的`this.hooks.beforeRun.callAsync(this, err => {` 。  
其余几个hooks调用也类似。

下文中，我们仍然称插件中实现的切面为hooks。  
所以，我们还是可以按以前的分析，知道`compiler.run`调用了`this.compile`，  
于是我们在`compile`方法中打一个断点。

**

```
compile(callback) {
    // 断点
    
    ...
    this.applyPluginsAsync("before-compile", params, err => {
        ...
        this.applyPluginsParallel("make", compilation, err => {
            ...
            compilation.seal(err => {
                ...
                this.applyPluginsAsync("after-compile", compilation, err => {
                    ...
                });
            });
        });
    });
}
```

注意断点的位置，是在`compile`方法的入口处，  
还没调用`compiler.hooks.make`，也没调用`compilation.seal`。

![](https://images.weserv.nl/?url=upload-images.jianshu.io/upload_images/1023733-67fdb662a4596e9a.png?imageMogr2/auto-orient/strip|imageView2/2/w/683/format/webp)

然后，**见证奇迹的时候到了**。。  
我们按下`F5`，让程序继续运行，  
结果程序运行了一会之后，**又跑到了现在这个断点**。

这真是太奇怪了。  
值得一提的是，`run`方法中的`this.compile`处如果打一个断点，  
我们会发现`this.compile`却没有被第二次调用。

### 2.4 调用堆栈

还好vscode的调试工具提供了查看**调用堆栈**的功能，

![](https://images.weserv.nl/?url=upload-images.jianshu.io/upload_images/1023733-253ca07fe544f765.png?imageMogr2/auto-orient/strip|imageView2/2/w/656/format/webp)

我们可以点击某个栈帧，来查看程序的执行过程。  
点击第二行`runAsChild`，我们发现`this.compile`是由`runAsChild`调用的，  
`runAsChild`是`Compiler`类的实例方法，位于 [Compiler.js 第286行](https://github.com/webpack/webpack/blob/v3.11.0/lib/Compiler.js#L286)。

**

```
runAsChild(callback) {
    this.compile((err, compilation) => {
        ...
    });
}
```

![](https://images.weserv.nl/?url=upload-images.jianshu.io/upload_images/1023733-a0d123da71cefa33.png?imageMogr2/auto-orient/strip|imageView2/2/w/557/format/webp)

那么`runAsChild`是哪里调用的呢？  
我们点击第三行`pitch`，结果`runAsChild`是由extract-text-webpack-plugin（v3.0.2）调用的，  
代码位置在，[extract-text-webpack-plugin loader.js 第81行](https://github.com/webpack-contrib/extract-text-webpack-plugin/blob/v3.0.2/src/loader.js#L81)，

**

```
childCompiler.runAsChild((err, entries, compilation) => {
    ...
}
```

这下就很清楚了，  
extract-text-webpack-plugin创建了一个`childCompiler`，  
然后调用了这个`childCompiler`的`runAsChild`方法，结果导致`this.compiler`再次被调用了。

extract-text-webpack-plugin这样做，会对我们调试`compiler.hooks.make`和`compilation.seal`产生困扰，  
因为`this.compile`会触发两次，  
结果`compiler.hooks.make`和`compilation.seal`也会触发两次。

**注：**  
每次加载一个 .less 文件，都会新建一个`childCompiler`，  
因此，如果工程中用到了很多 .less 文件，  
`this.compile`方法会甚至会触发**成百上千次**。

至于为什么会这样，我们继续往下看。

### 3. extract-text-webpack-plugin

#### 3.1 LOADER_EXECUTION

![](https://images.weserv.nl/?url=upload-images.jianshu.io/upload_images/1023733-3f26152eb890ebe5.png?imageMogr2/auto-orient/strip|imageView2/2/w/557/format/webp)

我们继续跟踪调用堆栈，点到第四行`LOADER_EXECUTION`，  
这个名字我们似曾相识，是的，我们在[第四篇runLoaders](https://www.jianshu.com/p/3ae8522fb098)一节介绍过它，  
它位于 [loader-runner LoaderRunner.js 第118行](https://github.com/webpack/loader-runner/blob/v2.3.1/lib/LoaderRunner.js#L118)。

**

```
var result = (function LOADER_EXECUTION() {
    return fn.apply(context, args);
}());
```

`LOADER_EXECUTION`做的事情是，使用已载入的loader，来加载相匹配的资源。  
此时，已载入的loader是extract-text-webpack-plugin extract方法返回的loader，  
匹配的资源是待载入的less文件。

我们来验证下这个结论，在`LOADER_EXECUTION` 函数中打个断点，  
然后重新启动调试。

程序第一次来到这里的时候，是为了加载src/index.js，  
体现在`context.resource`字段，

**

```
~/Test/debug-webpack3/src/index.js
```

然后我们按`F5`，等待程序第二次来到这里，  
此时，`context.resource`变成了，

**

```
~/Test/debug-webpack3/src/index.less
```

表示当前正在加载 src/index.less。

#### 3.2 childCompiler

现在我们用单步调试，进入到`fn.apply(context, args)`这个调用里面。  
结果程序跳转到了 [extract-text-webpack-plugin loader.js pitch](https://github.com/webpack-contrib/extract-text-webpack-plugin/blob/v3.0.2/src/loader.js#L15)函数中。

**

```
export function pitch(request) {
    ...
    if (...) {
        ...
    } else if (...) {
        ...
    } else if (...) {
        ...
        const childCompiler = this._compilation.createChildCompiler(`extract-text-webpack-plugin ${NS} ${request}`, outputOptions);
        ...
        childCompiler.runAsChild((err, entries, compilation) => {
            ...
        });
    }
}
```

看到了吧，每一次加载 .less文件，都会执行`LOADER_EXECUTION` ，  
每次执行`LOADER_EXECUTION` 都会调用`pitch`函数，  
`pitch`函数中每次都会创建一个新的`childCompiler`，然后调用`childCompiler.runAsChild`。

#### 3.3 this._compilation

如果我们想知道`this._compilation.createChildCompiler` 做了什么事情，  
就必须知道`this._compilation`是怎么来的，  
因此，也就必须搞清楚`this`是什么。

`this`实际上就是`pitch`的上下文，我们需要看`pitch`是如何被调用的，  
翻看上文的调用链路，我们知道了，  
`pitch`是通过`fn.apply(context, args)`调用的，其中`fn`的值就是`pitch`。

因此，`pitch`中的`this`指向了`fn.apply(context, args)`中的`context`。  
通过查看调用堆栈，我们最终定位到，  
这个`context`是在 [webpack NormalModule.js doBuild](https://github.com/webpack/webpack/blob/v3.11.0/lib/NormalModule.js#L180)中调用`createLoaderContext`创建的，

**

```
doBuild(options, compilation, resolver, fs, callback) {
    ...
    const loaderContext = this.createLoaderContext(resolver, options, compilation, fs);

    runLoaders({
        ...
        context: loaderContext,
        ...
    }, (err, result) => {
        ...
    });
}
```

`createLoaderContext`是`NormalModule`的实例方法，  
它的定义在，[NormalModule.js 第112行](https://github.com/webpack/webpack/blob/v3.11.0/lib/NormalModule.js#L112)，

**

```
createLoaderContext(resolver, options, compilation, fs) {
    const loaderContext = {
        ...
        _compilation: compilation,
        ...
    };
    ...
    return loaderContext;
}
```

因此，这个`_compilation`，就是`doBuild`参数中的`compiation`。  
而这个`compiler`就是在[Compiler.js中第497行](https://github.com/webpack/webpack/blob/v3.11.0/lib/Compiler.js#L497)，触发`compiler.hooks.make`之前新建的那个`compilation`。

**

```
const compilation = this.newCompilation(params);
this.applyPluginsParallel("make", compilation, err => {
   ...
});
```

#### 3.4 this._compilation.createChildCompiler

我们就可以去[Compilation.js 第1416行](https://github.com/webpack/webpack/blob/v3.11.0/lib/Compilation.js#L1416)中查看`createChildCompiler`方法了，

**

```
createChildCompiler(name, outputOptions, plugins) {
    ...
    return this.compiler.createChildCompiler(this, name, idx, outputOptions, plugins);
}
```

它调用了`compiler.createChildCompiler`，在[Compiler.js 第413行](https://github.com/webpack/webpack/blob/v3.11.0/lib/Compiler.js#L413)，

**

```
createChildCompiler(compilation, compilerName, compilerIndex, outputOptions, plugins) {
    const childCompiler = new Compiler();
    ...
    for(const name in this._plugins) {
        if(["make", "compile", "emit", "after-emit", "invalid", "done", "this-compilation"].indexOf(name) < 0)
            childCompiler._plugins[name] = this._plugins[name].slice();
    }
    ...
    compilation.applyPlugins("child-compiler", childCompiler, compilerName, compilerIndex);

    return childCompiler;
}
```

它会新建一个`Compiler`实例，然后把原来父`compiler`上的`_plugins`都**浅拷贝**过去。  
因此，以前挂载在`compiler`上的hooks同样也会挂载到`childCompiler`上，  
只是，当hooks被调用时，才会触发回调。

其中`"make", "compile", "emit", "after-emit", "invalid", "done", "this-compilation"`，  
这些`_plugin`不拷贝。

假如我们写了一个这样的webpack3插件，  
（只需将webpack4中插件的写法从hooks改成plugin即可)

**

```
class Plugin {
    apply(compiler) {
        compiler.plugin('compilation', compilation => {
            compilation.plugin('seal', () => {
                ...
            });
        });
    }
}
```

则当`childCompiler`调用`compiler.hooks.compilation`时，  
以上为父`compiler`注册的事件也会在`childCompiler`上触发，  
唯一不同是参数`compilation`不同。

所以接下来，`compilation.plugin('seal', () => {` ，  
就为这个新`compilation`实现了一个新的`hooks.seal`。

#### 3.5 hooks的多次触发

我们来看下实际使用这个插件时的日志信息。

**（1）新建plugin.js**

**

```
const log = require('debug')('debug-webpack plugin.js');

class Plugin {
    apply(compiler) {
        compiler.plugin('compilation', compilation => {
            log('in: compilation');
            compilation.plugin('seal', () => {
                log('in: seal, compilation.entries: %s', compilation.entries.map(({ resource }) => resource).join());
            });
        });
    }
}

module.exports = Plugin;
```

**（2）在webpack.config.js中使用它**

**

```
...
const Plugin = require('./plugin');

module.exports = {
    ...
    plugins: [
        ...
        new Plugin,
    ]
};
```

**（3）运行一下**

**

```
$ DEBUG=debug-wepack* npm run build

> debug-webpack3@1.0.0 build ~/Test/debug-webpack3
> webpack

  debug-webpack plugin.js in: compilation +0ms
  debug-webpack plugin.js in: seal, compilation.entries: ~/Test/debug-webpack3/src/index.js +600ms
  debug-webpack plugin.js in: compilation +7ms
  debug-webpack plugin.js in: seal, compilation.entries: ~/Test/debug-webpack3/src/index.less +28ms
Hash: 1b8999f3bb679ecffd56
Version: webpack 3.11.0
Time: 657ms
    Asset      Size  Chunks             Chunk Names
 index.js   2.64 kB       0  [emitted]  index
index.css  29 bytes       0  [emitted]  index
   [0] ./src/index.js 49 bytes {0} [built]
   [1] ./src/index.less 41 bytes {0} [built]
    + 1 hidden module
Child extract-text-webpack-plugin node_modules/_extract-text-webpack-plugin@3.0.2@extract-text-webpack-plugin/dist node_modules/_css-loader@0.28.10@css-loader/index.js!node_modules/_less-loader@4.0.6@less-loader/dist/cjs.js!src/index.less:
       [0] ./node_modules/_css-loader@0.28.10@css-loader!./node_modules/_less-loader@4.0.6@less-loader/dist/cjs.js!./src/index.less 211 bytes {0} [built]
        + 1 hidden module
```

我们看到`compilation.hooks.seal`总共触发了两次，  
第一次的entry是~/Test/debug-webpack3/src/index.js，  
第二次为~/Test/debug-webpack3/src/index.less。

![](https://images.weserv.nl/?url=upload-images.jianshu.io/upload_images/1023733-99af71bf782fdd19.png?imageMogr2/auto-orient/strip|imageView2/2/w/511/format/webp)

第二次 .less 文件触发`compilation.hooks.seal`的流程如下，  
webpack在加载 .less 文件时，使用了extract-text-webpack-plugin，  
每次加载一个 .less 文件，都会创建一个新的 `childCompiler`。

这个`childCompiler`会把父`compiler`中所有的hooks都拷贝过去，  
然后就调用了`childCompiler.runAsChild`，它会调用`this.compile`，此时`this`是`childCompiler`，  
然后`this.compile`中，会触发`compiler.hooks.compilation`这个hooks（[见Compiler.js 第465行](https://github.com/webpack/webpack/blob/v3.11.0/lib/Compiler.js#L465)）。

这个hooks是从父`compiler`那里拷贝过来的，  
因此就会触发我们的插件注册的那个回调，只是传入一个新创建的`compilation`实例作为参数。

**

```
compiler.plugin('compilation', compilation => {
    ...
});
```

接着为这个新`compilation`实例，在这个回调中注册了`compilation.hooks.seal`事件。  
然后webpack在对 .less 文件 seal的时候，触发`hooks.seal`事件时，就引发了这个回调。

* * *

### 参考

[extract-text-webpack-plugin: Webpack 4 compatibility](https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/701)  
[webpack v3.11.0](https://github.com/webpack/webpack/tree/v3.11.0)  
[webpack v4.20.2](https://github.com/webpack/webpack/tree/v4.20.2)  
[loader-runner v2.3.1](https://github.com/webpack/loader-runner/tree/v2.3.1)
