上一篇我们经历了一次**头脑爆炸**，一口气看完了从webpack-cli到babel-loader的全流程。  
这一篇可以放松一下了，  
来看看hooks中到底包含了什么秘密。

### 1. hooks回顾

我们知道在webpack Compiler.js中[第536行](https://github.com/webpack/webpack/blob/v4.20.2/lib/Compiler.js#L536)，  
`this.compile`中调用了`hooks.make`，

**

```
compile(callback) {
    const params = this.newCompilationParams();
    this.hooks.beforeCompile.callAsync(params, err => {
        if (err) return callback(err);

        this.hooks.compile.call(params);

        const compilation = this.newCompilation(params);

        this.hooks.make.callAsync(compilation, err => {
            if (err) return callback(err);

            compilation.finish();

            compilation.seal(err => {
                if (err) return callback(err);

                this.hooks.afterCompile.callAsync(compilation, err => {
                    if (err) return callback(err);

                    return callback(null, compilation);
                });
            });
        });
    });
}
```

结果 `this.hooks.make.callAsync(compilation, err => {`  
居然会跳转到，[SingleEntryPlugin.js](https://github.com/webpack/webpack/blob/v4.20.2/lib/SingleEntryPlugin.js) 文件中。

**

```
compiler.hooks.make.tapAsync(
    "SingleEntryPlugin",
    (compilation, callback) => {
        const { entry, name, context } = this;

        const dep = SingleEntryPlugin.createDependency(entry, name);
        compilation.addEntry(context, dep, name, callback);
    }
);
```

这其中发生了什么？  
为了理解这一点，我们还得从webpack plugin说起。

### 2. webpack插件的编写方式

我认为从**用例**中学习代码库，会把事情变简单，  
因为代码的设计目的，就是为它的**使用场景**服务的。

所以，一开始我们不宜直接研究hooks是如何实现的，  
而是看看hooks的设计者们，期望它被如何使用。

hooks最常见的使用场景，就是当我们在给webpack编写插件的时候，  
插件中会实现`compiler`和`compilation`对象的多个hooks，  
下面我们来创建一个webpack 插件。

#### 2.1 test-plugin.js

在我们的[debug-webpack](https://www.jianshu.com/p/2fa6562210ef)工程中，我们在根目录中新建一个test-plugin.js文件。

**

```
module.exports = class Plugin {
    apply(compiler) {
        compiler.hooks.make.tapAsync('TestPlugin', (compilation, callback) => {
            compilation.hooks.buildModule.tap('TestPlugin', module => {
                console.log('module.resource', module.resource);
                console.log('module.loaders', module.loaders);
                console.time('TestPlugin');
            });

            compilation.hooks.succeedModule.tap('TestPlugin', module => {
                console.timeEnd('TestPlugin');
            });

            callback();
        });
    }
};
```

它导出了一个类，这个类必须实现`apply`方法。

其中，apply方法的形参是`compiler`，  
就是webpack-cli中调用的`compiler.run`的那个`compiler`。  
至于更细节的问题，我们以后可以再慢慢看。

**（1）compiler.hooks.make.tapAsync**  
`compiler.hooks.make.tapAsync`实现了`compiler.hooks.make`，  
如果我们增加了这个实现，  
[webpack Compiler.js 第536行](https://github.com/webpack/webpack/blob/v4.20.2/lib/Compiler.js#L536) `build` 调用 `this.hooks.make.callAsync(compilation, err => {`  
会**额外触发**我们这里的实现。

因为它是异步的，所以我们最后要调用 `callback` 来完成调用。

**

```
compiler.hooks.make.tapAsync('TestPlugin', (compilation, callback) => {
    ...
    
    callback();
});
```

**（2）compilation.hooks.buildModule.tap**  
`compilation.hooks.buildModule.tap` 实现了`compilation.hooks.buildModule`，  
它会在[webpack Compilation.js 第617行](https://github.com/webpack/webpack/blob/v4.20.2/lib/Compilation.js#L617)，`buildModule`中，  
执行`this.hooks.buildModule.call(module);` 时被调用。

**

```
buildModule(module, optional, origin, dependencies, thisCallback) {
    ...

    this.hooks.buildModule.call(module);
    module.build(
    ...
}
```

因此，通过将`compiler.hooks`和`compilation.hooks`的**调用和实现分离**，  
相当于在webpack执行过程中，添加了多个切面（[面向切面编程AOP](https://en.wikipedia.org/wiki/Aspect-oriented_programming)）。  
在这些切面中，webpack插件可以做自己想做的**任何事情**。

以上test-plugin.js插件，我们只是统计了一下，  
从`compilation.buildModule`到`compilation.succeedModule` 所经历的时间。

**注：** `compilation.hooks.succeedModule`在[Compilation.js 第652行](https://github.com/webpack/webpack/blob/v4.20.2/lib/Compilation.js#L652)调用。

**

```
this.hooks.succeedModule.call(module);
```

#### 2.2 在webpack.config.js中使用插件

**

```
const path = require('path');
const TestPlugin = require('./test-plugin');

module.exports = {
    entry: {
        index: path.resolve(__dirname, 'src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
    },
    module: {
        rules: [
            { test: /.js$/, use: { loader: 'babel-loader', query: { presets: ['@babel/preset-env'] } } },
        ]
    },
    plugins:[
        new TestPlugin(),
    ],
};
```

我们在webpack.config.js中引入了test-plugin.js，  
然后在导出对象中增加了`plugins`属性。

这样我们的webpack插件就编写完了。

#### 2.3 查看插件的调用效果

直接调用`npm run build`，

**

```
$ npm run build
module.resource ~/Test/debug-webpack/src/index.js
module.loaders [ { options: { presets: [Array] },
    ident: 'ref--4',
    loader: '~/Test/debug-webpack/node_modules/_babel-loader@8.0.4@babel-loader/lib/index.js' } ]
TestPlugin: 213.301ms
```

我们统计出来，build ./src/index.js 源文件，  
从`compilation.hooks.buildModule`到`compilation.hooks.succeedModule`，  
总共花费了 `213.301ms`。

### 3. Tapable

上文中我们通过hooks的用例，了解了它的使用方式，  
它为Compiler和Compilation两个类实现了多个切面，  
下面我们来看一下原理。

我们打开Compiler类的源码，位于[Compiler.js 第40行](https://github.com/webpack/webpack/blob/v4.20.2/lib/Compiler.js#L40)，  
它是`Tapable`的子类，它是从tapable模块中导出的，  
[tapable](https://github.com/webpack/tapable/tree/v1.1.0)是一个独立的代码库（v1.1.0）。

直接阅读tapable源码会发现非常难懂，  
[HookCodeFactory.js](https://github.com/webpack/tapable/blob/v1.1.0/lib/HookCodeFactory.js#L19) 中使用了大量的**元编程**手段`new Function`。

**

```
fn = new Function(
    this.args(),
    '"use strict";\n' +
    this.header() +
    this.content({
        onError: err => `throw ${err};\n`,
        onResult: result => `return ${result};\n`,
        onDone: () => "",
        rethrowIfPossible: true
    })
);
```

我认为在这种情况下，要想更好的理解它，最好的办法是从**动机**入手，  
在tapable仓库[README.md](https://github.com/webpack/tapable/blob/v1.1.0/README.md#interception)中，  
我们看到，tapable实现了**interception**（拦截器）。

**

```
const { SyncHook } = require('tapable');

const hook = new SyncHook(['x', 'y']);

hook.intercept({
    register(...args) {
        console.log('2. in: register', args);
    },
    call(...args) {
        console.log('4. in: call', args);
    },
});

console.log('1. start: register');
hook.tap('some-message', (...args) => {
    console.log('5. in: tap', args);
});

console.log('3. start: call');
hook.call(1, 2, 3);
```

日志信息如下，

**

```
1. start: register
2. in: register [ { type: 'sync', fn: [Function], name: 'some-message' } ]
3. start: call
4. in: call [ 1, 2 ]
5. in: tap [ 1, 2 ]
```

**注：**  
hooks在构造时设置了两个参数（`x`和`y`），  
但是在调用时用了三个参数（`1`，`2`和`3`），结果第三个参数丢失了。

我们看到，每一个hooks在被调用的时候它都可以拦截到，被添加新的实现时也是如此。  
我们知道[ES6 proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)也可以用来实现拦截功能，  
但是IE却一直是[不支持](https://caniuse.com/#search=proxy)的。

因此，tapable中采用了**兼容性**的做法，对实现hooks的代码进行了动态修改，  
在其前后增加了拦截器，最后再通过`new Function`生成一个函数。

具体的源码解析，我们以后慢慢补充。

* * *

### 参考

[webpack: plugins](https://webpack.js.org/concepts/plugins/)  
[Aspect-oriented programming](https://en.wikipedia.org/wiki/Aspect-oriented_programming)  
[tapable v1.1.0](https://github.com/webpack/tapable/tree/v1.1.0)


 