学习源码的一个好办法就是，跟进源码的逻辑中，看看流程是怎么样流转的，  
这需要我们有直接**debug**代码的能力，  
有时候还需要我们在某些关键位置**写入log**。

下面我们从`npm run build` 命令行工具开始，想办法debug进webpack中，  
然后在关键位置写入log。

### 1. npm scripts

上一篇中，我们在命令行中调用`npm run build`，  
源码就被自动的编译打包，然后结果输出到了 ./dist/index.js 文件中了。

**

```
$ npm run build

> debug-webpack@1.0.0 build ~/Test/debug-webpack
> webpack

Hash: 2e91628041d9a877f709
Version: webpack 4.20.2
Time: 639ms
Built at: 2018-10-09 09:25:24
   Asset       Size  Chunks             Chunk Names
index.js  937 bytes       0  [emitted]  index
Entrypoint index = index.js
[0] ./src/index.js 8 bytes {0} [built]
```

可是，这到底发生了什么呢？

#### 1.1 npm run build

![](https://images.weserv.nl/?url=upload-images.jianshu.io/upload_images/1023733-6d56b31405723766.png?imageMogr2/auto-orient/strip|imageView2/2/w/227/format/webp)

上一篇中我们在npm scripts配置了`npm run build`命令，

**

```
{
    ...,
    "scripts:": {
        ...,
        "build": "webpack"
    }
    ...,
}
```

通过查看[npm-run-script](https://docs.npmjs.com/cli/run-script#description)文档，我们知道，  
`npm run`会自动添加`node_module/.bin` 到当前命令所用的`PATH`变量中，  
因此，`npm run build` 实际会调用 `node_modules/.bin/webpack`。

**

```
$ node_modules/.bin/webpack
Hash: 2070b107dceedfc63c72
Version: webpack 4.20.2
Time: 334ms
Built at: 2018-10-09 10:13:05
   Asset       Size  Chunks             Chunk Names
index.js  930 bytes       0  [emitted]  index
Entrypoint index = index.js
[0] ./src/index.js 10 bytes {0} [built]
```

与执行npm run build 效果一样。

#### 1.2 显示原身

![](https://images.weserv.nl/?url=upload-images.jianshu.io/upload_images/1023733-b2cbff1bbb855047.png?imageMogr2/auto-orient/strip|imageView2/2/w/511/format/webp)

我在Finder中打开这个文件看了下，发现它是一个软链接（[symbolic link](https://en.wikipedia.org/wiki/Symbolic_link)），  
于是，我们还要看看它的**原身**在哪里。

**

```
$ l ~/.nvm/versions/node/v8.12.0/bin/webpack
lrwxr-xr-x  1 用户名  staff    41B 10 24 09:50 node_modules/.bin/webpack -> ../_webpack@4.20.2@webpack/bin/webpack.js
```

我们看到它的原身在这里，

**

```
../_webpack@4.20.2@webpack/bin/webpack.js
```

完整路径如下，

**

```
~/Test/debug-webpack/node_modules/_webpack@4.20.2@webpack/bin/webpack.js
```

这就是我们在node_modules中安装的webpack模块的文件地址。

我们来看看代码，  
<https://github.com/webpack/webpack/blob/v4.20.2/bin/webpack.js>

**

```
#!/usr/bin/env node

process.exitCode = 0;

/**
 * @param {string} command process to run
 * @param {string[]} args commandline arguments
 * @returns {Promise<void>} promise
 */
const runCommand = 
...
```

以上链接是webpack github仓库的地址，我已经找到了tag为4.20.2的版本位置，  
它展示了4.20.2版本的webpack，./bin/webpack.js的源代码。  
后文中我们可以使用这样的方式展示源代码了。

#### 1.3 Shebang

我们注意到了，./bin/webpack.js 文件头有一行这样的代码，

**

```
#!/usr/bin/env node
```

它被称为 [Shebang](https://en.wikipedia.org/wiki/Shebang_(Unix))。

在类Unix系统中，包含Shebang的文本，如果作为可执行文件调用，  
`#!`后面指定的解释器将会被调用，用来执行后面的代码。

Shebang 语法如下，

**

```
#!interpreter [optional-arg]
```

**注：**  
`/usr/bin/env` 不是一个路径，而是一个命令，  
后面跟`node` 参数，就会找到node并调用它，  
我们来试试，

**

```
$ /usr/bin/env node --version
v8.12.0
```

### 2. 写入日志

上文中，我们了解到，  
`npm run build`最终导致node解释执行了 ./bin/webpack.js 文件。  
由于Node.js是解释型语言，所以，我们可以直接修改源码，来查看更改效果。

一般而言，最常见的**写日志**的方法是直接使用`console.log` ，  
但是我们发现，控制台还输出了其他的文本，  
我们很难找到自己输出的信息。

为了展示方便，我决定使用 [debug](https://github.com/visionmedia/debug) 模块来输出信息，  
它是一个日志库，可以用颜色来区分不同的日志，  
看看github仓库中的官方截图，

![](https://images.weserv.nl/?url=upload-images.jianshu.io/upload_images/1023733-89bf5007bce04afd.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

#### 2.1 安装debug为devDependencies

./bin/webpack.js 位于 ~/Test/debug-webpack/node_modules/_webpack@4.20.2@webpack 文件夹中，  
我们进入这个文件夹，然后安装debug，

**

```
$ cd ~/Test/debug-webpack/node_modules/_webpack@4.20.2@webpack
$ npm i -D debug
```

#### 2.2 使用debug

在 ./bin/webpack.js 文件头部调用debug，这里我们创建了一个`log`变量。

**

```
#!/usr/bin/env node
const log = require('debug')('debug-webpack webpack webpack.js');

...
```

记得要放到 `#!/usr/bin/env node` 后面，  
其中第二个参数`debug-webpack webpack webpack.js` 称为[namespace](https://github.com/visionmedia/debug#namespace-colors) ，可用于区分日志的**颜色**，  
这里我们为整个文件使用了相同的namespace。

#### 2.3 bin/webpack.js 代码逻辑

![](https:https://upload-images.jianshu.io/upload_images/1023733-15a6ad920309c488.png?imageMogr2/auto-orient/strip|imageView2/2/w/512/format/webp)

通过阅读 ./bin/webpack.js 源码，我们发现，  
它首先会对已安装的CLI进行检查，然后会载入安装的CLI工具。  
webpack要求我们必须安装[webpack-cli](https://github.com/webpack/webpack-cli) 或 [webpack-command](https://github.com/webpack-contrib/webpack-command) 之一，否则就会报错。

**

```
if (installedClis.length === 0) {
    // 报错
}
```

源码位置如下：<https://github.com/webpack/webpack/blob/v4.20.2/bin/webpack.js#L84>

如果我们已经安装了某一个CLI的话，就会加载这个CLI，源码[第149-159行](https://github.com/webpack/webpack/blob/v4.20.2/bin/webpack.js#L149-L159)，

**

```
else if (installedClis.length === 1) {
    const path = require("path");
    const pkgPath = require.resolve(`${installedClis[0].package}/package.json`);
    // eslint-disable-next-line node/no-missing-require
    const pkg = require(pkgPath);
    // eslint-disable-next-line node/no-missing-require
    require(path.resolve(
        path.dirname(pkgPath),
        pkg.bin[installedClis[0].binName]
    ));
}
```

注意以上代码第`7`行，webpack动态 `require`了一个地址，  
这时候我们的`log` 工具就有用武之地了。

**

```
const cliPath = path.resolve(path.dirname(pkgPath), pkg.bin[installedClis[0].binName]);
log('cliPath: %s', cliPath);
require(cliPath);
```

#### 2.3 查看日志

直接按原样调用`npm run build`是看不到刚才写入的日志信息的，  
我们还需要传入**前置参数**，

**

```
$ DEBUG=debug-webpack* npm run build
```

> The environment for any simple command or function may be augmented temporarily by prefixing it with parameter assignments, as described > in Shell Parameters. These assignment statements affect only the environment seen by that command.  
> —— [Bash Reference Manual - 3.7.4 Environment](https://www.gnu.org/software/bash/manual/bashref.html#Environment)

其中名为`DEBUG`的前置参数，是 [debug](https://github.com/visionmedia/debug) 模块所需要的，  
`debug-webpack*` 表示我们要输出所有以`debug-webpack` 开头**namespace**中的日志。  
我们示例中，**namespace**是`debug-webpack webpack webpack.js`。

运行结果如下，

**

```
debug-webpack webpack webpack.js cliPath: ~/Test/debug-webpack/node_modules/_webpack-cli@3.1.2@webpack-cli/bin/cli.js +0ms
```

![](https://images.weserv.nl/?url=upload-images.jianshu.io/upload_images/1023733-f3890c0e105f45d7.png?imageMogr2/auto-orient/strip|imageView2/2/w/491/format/webp)

### 3. webpack-cli/bin/cli.js

![](https://images.weserv.nl/?url=upload-images.jianshu.io/upload_images/1023733-83e5cafcf955311f.png?imageMogr2/auto-orient/strip|imageView2/2/w/511/format/webp)

上文中我们得到了webpack `require`的CLI地址，

**

```
~/Test/debug-webpack/node_modules/_webpack-cli@3.1.2@webpack-cli/bin/cli.js
```

源码位于，<https://github.com/webpack/webpack-cli/blob/v3.1.2/bin/cli.js>  
webpack-cli版本为 **v3.1.2**。

分析源码我们发现，代码中第436行`require`了`webpack`模块，  
<https://github.com/webpack/webpack-cli/blob/v3.1.2/bin/cli.js#L436>

**

```
const webpack = require("webpack");
```

随后在第441行，调用`webpack`，返回了一个`compiler`，  
<https://github.com/webpack/webpack-cli/blob/v3.1.2/bin/cli.js#L441>

**

```
compiler = webpack(options);
```

最后，在第533行，调用了`compiler.run`，  
<https://github.com/webpack/webpack-cli/blob/v3.1.2/bin/cli.js#L533>

**

```
} else compiler.run(compilerCallback);
```

![](https://images.weserv.nl/?url=upload-images.jianshu.io/upload_images/1023733-b76c151bf9a7f764.png?imageMogr2/auto-orient/strip|imageView2/2/w/511/format/webp)

### 4. 开始debug

知道了webpack-cli的代码逻辑之后，我们就可以创建一个debug.js脚本来模拟webpack-cli调用了，  
在我们上一篇[debug-webpack](https://www.jianshu.com/p/2fa6562210ef)示例项目中，添加一个./debug.js 文件，

**

```
const webpack = require('webpack');
const options = require('./webpack.config');

const compiler = webpack(options);

compiler.run((...args) => {
    console.log(...args);
});
```

保持这个文件打开状态，在以上代码第`6`行位置打个断点，  
然后在vscode中按 `F5`（或者点击左侧调试面板，再点击调试）。

![](https://images.weserv.nl/?url=upload-images.jianshu.io/upload_images/1023733-5fe7c6e75340c49a.png?imageMogr2/auto-orient/strip|imageView2/2/w/473/format/webp)

  


代码就停在我们的断点位置上了。

然后我们可以点击左数第3个按钮，进行单步调试，就可以进入`compiler.run`方法中了。  


![](https://images.weserv.nl/?url=upload-images.jianshu.io/upload_images/1023733-fd6862a470ebc1ee.png?imageMogr2/auto-orient/strip|imageView2/2/w/257/format/webp)

* * *

### 参考

[github: debug](https://github.com/visionmedia/debug)  
[github: webpack v4.20.2 ./bin/webpack.js](https://github.com/webpack/webpack/blob/v4.20.2/bin/webpack.js)  
[github: webpack-cli v3.1.2 ./bin/cli.js](https://github.com/webpack/webpack-cli/blob/v3.1.2/bin/cli.js)  
[Debugging in Visual Studio Code](https://code.visualstudio.com/docs/editor/debugging)
