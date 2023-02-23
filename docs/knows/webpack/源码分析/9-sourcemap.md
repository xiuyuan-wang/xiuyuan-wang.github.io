### 背景

> A source map is a file that maps from the transformed source to the original source,  
> enabling the browser to reconstruct the original source and present the reconstructed original in the debugger.

source map文件中保存了目标代码到源码之间映射关系，  
使用source map，浏览器就可以在调试代码时定位到源码位置了。

本文记录一下，在webpack中与source map相关的源码学习过程。

### 1. 输出source map

#### 1.1 webpack.config

webpack内置了source map生成功能，所以为了输出source map，  
我们需要修改webpack.config.js，增加一些新的配置。

**

```
...
module.exports = {
    devtool: 'source-map',    
    output: {
        devtoolModuleFilenameTemplate: '[resource-path]',
        ...,
    },
    ...
};
```

其中，`devtool: 'source-map'`，表示[以独立文件的方式](https://webpack.js.org/configuration/devtool/#devtool)建立source map。  
`devtoolModuleFilenameTemplate: '[resource-path]'`是一个[模板](https://webpack.js.org/configuration/output/#output-devtoolmodulefilenametemplate)，  
用来配置source map文件`sources`数组中出现的模块路径。

#### 1.2 修改源码

在第二篇我们的debug-webpack项目中，增加了source map配置之后，  
我们修改一下 src/index.js，把它变成两行，

**

```
class A {
    f() { }
}

const a = new A;
a.f();
```

#### 1.3 run build

**

```
$ npm run build
```

我们会看到，dist/ 文件夹下有了两个文件，

**

```
$ tree -L 2 -I node_modules

debug-webpack
├── dist
│   ├── index.js
│   └── index.js.map
├── index.html
├── package.json
├── src
│   └── index.js
└── webpack.config.js
```

其中 index.js中的内容如下，

**

```
!function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n){function t(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}(new(function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e)}return function(e,n,r){n&&t(e.prototype,n),r&&t(e,r)}(e,[{key:"f",value:function(){}}]),e}())).f()}]);
//# sourceMappingURL=index.js.map
```

我们看到，es6的`class`已经被编译成了`function`。

index.js.map中的内容如下，

**

```
{"version":3,"sources":["webpack/bootstrap","./src/index.js"],"names":["installedModules","__webpack_require__","moduleId","exports","module","i","l","modules","call","m","c","d","name","getter","o","Object","defineProperty","enumerable","get","r","Symbol","toStringTag","value","t","mode","__esModule","ns","create","key","bind","n","object","property","prototype","hasOwnProperty","p","s","f"],"mappings":"aACA,IAAAA,KAGA,SAAAC,EAAAC,GAGA,GAAAF,EAAAE,GACA,OAAAF,EAAAE,GAAAC,QAGA,IAAAC,EAAAJ,EAAAE,IACAG,EAAAH,EACAI,GAAA,EACAH,YAUA,OANAI,EAAAL,GAAAM,KAAAJ,EAAAD,QAAAC,IAAAD,QAAAF,GAGAG,EAAAE,GAAA,EAGAF,EAAAD,QAKAF,EAAAQ,EAAAF,EAGAN,EAAAS,EAAAV,EAGAC,EAAAU,EAAA,SAAAR,EAAAS,EAAAC,GACAZ,EAAAa,EAAAX,EAAAS,IACAG,OAAAC,eAAAb,EAAAS,GAA0CK,YAAA,EAAAC,IAAAL,KAK1CZ,EAAAkB,EAAA,SAAAhB,GACA,oBAAAiB,eAAAC,aACAN,OAAAC,eAAAb,EAAAiB,OAAAC,aAAwDC,MAAA,WAExDP,OAAAC,eAAAb,EAAA,cAAiDmB,OAAA,KAQjDrB,EAAAsB,EAAA,SAAAD,EAAAE,GAEA,GADA,EAAAA,IAAAF,EAAArB,EAAAqB,IACA,EAAAE,EAAA,OAAAF,EACA,KAAAE,GAAA,iBAAAF,QAAAG,WAAA,OAAAH,EACA,IAAAI,EAAAX,OAAAY,OAAA,MAGA,GAFA1B,EAAAkB,EAAAO,GACAX,OAAAC,eAAAU,EAAA,WAAyCT,YAAA,EAAAK,UACzC,EAAAE,GAAA,iBAAAF,EAAA,QAAAM,KAAAN,EAAArB,EAAAU,EAAAe,EAAAE,EAAA,SAAAA,GAAgH,OAAAN,EAAAM,IAAqBC,KAAA,KAAAD,IACrI,OAAAF,GAIAzB,EAAA6B,EAAA,SAAA1B,GACA,IAAAS,EAAAT,KAAAqB,WACA,WAA2B,OAAArB,EAAA,SAC3B,WAAiC,OAAAA,GAEjC,OADAH,EAAAU,EAAAE,EAAA,IAAAA,GACAA,GAIAZ,EAAAa,EAAA,SAAAiB,EAAAC,GAAsD,OAAAjB,OAAAkB,UAAAC,eAAA1B,KAAAuB,EAAAC,IAGtD/B,EAAAkC,EAAA,GAIAlC,IAAAmC,EAAA,0LC9EU,iOACRC","file":"index.js","sourcesContent":[" \t// The module cache\n \tvar installedModules = {};\n\n \t// The require function\n \tfunction __webpack_require__(moduleId) {\n\n \t\t// Check if module is in cache\n \t\tif(installedModules[moduleId]) {\n \t\t\treturn installedModules[moduleId].exports;\n \t\t}\n \t\t// Create a new module (and put it into the cache)\n \t\tvar module = installedModules[moduleId] = {\n \t\t\ti: moduleId,\n \t\t\tl: false,\n \t\t\texports: {}\n \t\t};\n\n \t\t// Execute the module function\n \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n\n \t\t// Flag the module as loaded\n \t\tmodule.l = true;\n\n \t\t// Return the exports of the module\n \t\treturn module.exports;\n \t}\n\n\n \t// expose the modules object (__webpack_modules__)\n \t__webpack_require__.m = modules;\n\n \t// expose the module cache\n \t__webpack_require__.c = installedModules;\n\n \t// define getter function for harmony exports\n \t__webpack_require__.d = function(exports, name, getter) {\n \t\tif(!__webpack_require__.o(exports, name)) {\n \t\t\tObject.defineProperty(exports, name, { enumerable: true, get: getter });\n \t\t}\n \t};\n\n \t// define __esModule on exports\n \t__webpack_require__.r = function(exports) {\n \t\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\n \t\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\n \t\t}\n \t\tObject.defineProperty(exports, '__esModule', { value: true });\n \t};\n\n \t// create a fake namespace object\n \t// mode & 1: value is a module id, require it\n \t// mode & 2: merge all properties of value into the ns\n \t// mode & 4: return value when already ns object\n \t// mode & 8|1: behave like require\n \t__webpack_require__.t = function(value, mode) {\n \t\tif(mode & 1) value = __webpack_require__(value);\n \t\tif(mode & 8) return value;\n \t\tif((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;\n \t\tvar ns = Object.create(null);\n \t\t__webpack_require__.r(ns);\n \t\tObject.defineProperty(ns, 'default', { enumerable: true, value: value });\n \t\tif(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));\n \t\treturn ns;\n \t};\n\n \t// getDefaultExport function for compatibility with non-harmony modules\n \t__webpack_require__.n = function(module) {\n \t\tvar getter = module && module.__esModule ?\n \t\t\tfunction getDefault() { return module['default']; } :\n \t\t\tfunction getModuleExports() { return module; };\n \t\t__webpack_require__.d(getter, 'a', getter);\n \t\treturn getter;\n \t};\n\n \t// Object.prototype.hasOwnProperty.call\n \t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\n\n \t// __webpack_public_path__\n \t__webpack_require__.p = "";\n\n\n \t// Load entry module and return exports\n \treturn __webpack_require__(__webpack_require__.s = 0);\n","class A {\n    f() { }\n}\n\nconst a = new A;\na.f();"],"sourceRoot":""}
```

#### 1.4 浏览器中试验一下

在工程根目录，启动一个静态资源服务器，

**

```
$ npx http-server

Starting up http-server, serving ./
Available on:
  http://127.0.0.1:8080
  http://xx.xx.xxx.xx:8080
Hit CTRL-C to stop the server
```

然后，浏览器中打开`http://127.0.0.1:8080`，  
我们通过source map定位到了源码位置。  


![](https://images.weserv.nl/?url=upload-images.jianshu.io/upload_images/1023733-83d3be4cb08f4b5d.png?imageMogr2/auto-orient/strip|imageView2/2/w/532/format/webp)

值得注意的是，浏览器DevTool中Network中并**没有**对source map文件的请求。  


![](https://images.weserv.nl/?url=upload-images.jianshu.io/upload_images/1023733-c87e7987b4f0e4b4.png?imageMogr2/auto-orient/strip|imageView2/2/w/618/format/webp)

我们将工程中 dist/index.js.map删掉，看一下效果，

  


![](https://images.weserv.nl/?url=upload-images.jianshu.io/upload_images/1023733-58a3e2418aa61d51.png?imageMogr2/auto-orient/strip|imageView2/2/w/532/format/webp)

  


这表明source map 确实起到了作用。

### 2. webpack生成source map逻辑

下面我们来看一下webpack是怎样生成source map文件的。

  


![](https://images.weserv.nl/?url=upload-images.jianshu.io/upload_images/1023733-1dca94ca37009a50.png?imageMogr2/auto-orient/strip|imageView2/2/w/544/format/webp)

#### 2.1 uglifyjs-wepack-plugin

![](https://images.weserv.nl/?url=upload-images.jianshu.io/upload_images/1023733-7d67b0ae69a3b5ba.png?imageMogr2/auto-orient/strip|imageView2/2/w/553/format/webp)

在第七篇中，我们介绍了webpack是怎样进行代码压缩的，  
uglifyjs-wepack-plugin实现了`compilation.hooks.optimizeChunkAssets`，  
然后在`runner`中调用了uglify-es进行压缩。

![](https://images.weserv.nl/?url=upload-images.jianshu.io/upload_images/1023733-07f0eb294de7390d.png?imageMogr2/auto-orient/strip|imageView2/2/w/682/format/webp)

非parallel模式在[Runner.js 第39行](https://github.com/webpack-contrib/uglifyjs-webpack-plugin/blob/v1.3.0/src/uglify/Runner.js#L39)

**

```
this.boundWorkers = (options, cb) => {
  try {
    cb(null, minify(options));
  } catch (error) {
    ...
  }
};
```

`minify`中调用uglify-es的`minify`方法，位于[minify.js 第156行](https://github.com/webpack-contrib/uglifyjs-webpack-plugin/blob/v1.3.0/src/uglify/minify.js#L156)，

**

```
const { error, map, code, warnings } = uglify.minify(
  { [file]: input },
  uglifyOptions,
);
```

uglify-es压缩后结果最后被callback到了`runner.runTasks`回调中，位于[index.js 第222行](https://github.com/webpack-contrib/uglifyjs-webpack-plugin/blob/v1.3.0/src/index.js#L222)，

**

```
runner.runTasks(tasks, (tasksError, results) => {
  ...
  results.forEach((data, index) => {
    ...
    const { error, map, code, warnings, extractedComments } = data;
    ...
    if (map) {
      outputSource = new SourceMapSource(
        code,
        file,
        JSON.parse(map), input, inputSourceMap,
      );
    } else {
      outputSource = new RawSource(code);
    }
    ...
    uglifiedAssets.add(compilation.assets[file] = outputSource);
    ...
  });
  ...
  callback();
});
```

然后`map`被传入到了`SourceMapSource`构造函数中，  
它是由webpack-sources模块导出的。

这里我们可以暂时不深究webpack-sources的细节，  
只需关注`outputSource`怎么被webpack使用即可，  
它被赋值到了`compilation.assets[file]`中。

**

```
compilation.assets[file] = outputSource
```

#### 2.2 SourceMapDevToolPlugin

![](https://images.weserv.nl/?url=upload-images.jianshu.io/upload_images/1023733-3ad5b29e53066681.png?imageMogr2/auto-orient/strip|imageView2/2/w/678/format/webp)

代码压缩完之后，`compilation.hooks.optimizeChunkAssets` hooks就执行完毕了，  
重新回到了webpack主流程，位于[Compilation.js 第1283行](https://github.com/webpack/webpack/blob/v4.20.2/lib/Compilation.js#L1283)，

**

```
this.hooks.optimizeChunkAssets.callAsync(this.chunks, err => {
  ...
  this.hooks.afterOptimizeChunkAssets.call(this.chunks);
  ...
});
```

紧接着会进行`afterOptimizeChunkAssets` hooks调用，  
经过debug，我们看到代码跳转到了[SourceMapDevToolPlugin.js 第110行](https://github.com/webpack/webpack/blob/v4.20.2/lib/SourceMapDevToolPlugin.js#L110)

**

```
compilation.hooks.afterOptimizeChunkAssets.tap(
  {
    name: "SourceMapDevToolPlugin",
    context: true
  },
  (context, chunks) => {
    ...
  }
)
```

先给source map加入`sources`，`sourceRoot`，`file`等属性，位于[SourceMapDevToolPlugin.js 第230-235行](https://github.com/webpack/webpack/blob/v4.20.2/lib/SourceMapDevToolPlugin.js#L230-L235)，

**

```
sourceMap.sources = moduleFilenames;
if (options.noSources) {
  sourceMap.sourcesContent = undefined;
}
sourceMap.sourceRoot = options.sourceRoot || "";
sourceMap.file = file;
```

然后在[第257行](https://github.com/webpack/webpack/blob/v4.20.2/lib/SourceMapDevToolPlugin.js#L257)，得到了source map的文件名，

**

```
let sourceMapFile = compilation.getPath(sourceMapFilename, {
```

[第274行](https://github.com/webpack/webpack/blob/v4.20.2/lib/SourceMapDevToolPlugin.js#L274)，在目标文件尾部加上source map文件的引用，

**

```
assets[file] = compilation.assets[file] = new ConcatSource(
  new RawSource(source),
  currentSourceMappingURLComment.replace(
    /[url]/g,
    sourceMapUrl
  )
);
```

在[第282行](https://github.com/webpack/webpack/blob/v4.20.2/lib/SourceMapDevToolPlugin.js#L282)，`compilation.assets`中增加了一个`sourceMapFile`，

**

```
assets[sourceMapFile] = compilation.assets[
  sourceMapFile
] = new RawSource(sourceMapString);
```

它的值不再是`SourceMapSource`了，而是`RawSource`，  
我们可以在调试控制台，打印一下`compilation.assets['index.js.map']._value`的值，

**

```
{"version":3,"sources":["webpack/bootstrap","./src/index.js"],"names":["installedModules","__webpack_require__","moduleId","exports","module","i","l","modules","call","m","c","d","name","getter","o","Object","defineProperty","enumerable","get","r","Symbol","toStringTag","value","t","mode","__esModule","ns","create","key","bind","n","object","property","prototype","hasOwnProperty","p","s","f"],"mappings":"aACA,IAAAA,KAGA,SAAAC,EAAAC,GAGA,GAAAF,EAAAE,GACA,OAAAF,EAAAE,GAAAC,QAGA,IAAAC,EAAAJ,EAAAE,IACAG,EAAAH,EACAI,GAAA,EACAH,YAUA,OANAI,EAAAL,GAAAM,KAAAJ,EAAAD,QAAAC,IAAAD,QAAAF,GAGAG,EAAAE,GAAA,EAGAF,EAAAD,QAKAF,EAAAQ,EAAAF,EAGAN,EAAAS,EAAAV,EAGAC,EAAAU,EAAA,SAAAR,EAAAS,EAAAC,GACAZ,EAAAa,EAAAX,EAAAS,IACAG,OAAAC,eAAAb,EAAAS,GAA0CK,YAAA,EAAAC,IAAAL,KAK1CZ,EAAAkB,EAAA,SAAAhB,GACA,oBAAAiB,eAAAC,aACAN,OAAAC,eAAAb,EAAAiB,OAAAC,aAAwDC,MAAA,WAExDP,OAAAC,eAAAb,EAAA,cAAiDmB,OAAA,KAQjDrB,EAAAsB,EAAA,SAAAD,EAAAE,GAEA,GADA,EAAAA,IAAAF,EAAArB,EAAAqB,IACA,EAAAE,EAAA,OAAAF,EACA,KAAAE,GAAA,iBAAAF,QAAAG,WAAA,OAAAH,EACA,IAAAI,EAAAX,OAAAY,OAAA,MAGA,GAFA1B,EAAAkB,EAAAO,GACAX,OAAAC,eAAAU,EAAA,WAAyCT,YAAA,EAAAK,UACzC,EAAAE,GAAA,iBAAAF,EAAA,QAAAM,KAAAN,EAAArB,EAAAU,EAAAe,EAAAE,EAAA,SAAAA,GAAgH,OAAAN,EAAAM,IAAqBC,KAAA,KAAAD,IACrI,OAAAF,GAIAzB,EAAA6B,EAAA,SAAA1B,GACA,IAAAS,EAAAT,KAAAqB,WACA,WAA2B,OAAArB,EAAA,SAC3B,WAAiC,OAAAA,GAEjC,OADAH,EAAAU,EAAAE,EAAA,IAAAA,GACAA,GAIAZ,EAAAa,EAAA,SAAAiB,EAAAC,GAAsD,OAAAjB,OAAAkB,UAAAC,eAAA1B,KAAAuB,EAAAC,IAGtD/B,EAAAkC,EAAA,GAIAlC,IAAAmC,EAAA,0LC9EU,iOACRC","file":"index.js","sourcesContent":[" \t// The module cache\n \tvar installedModules = {};\n\n \t// The require function\n \tfunction __webpack_require__(moduleId) {\n\n \t\t// Check if module is in cache\n \t\tif(installedModules[moduleId]) {\n \t\t\treturn installedModules[moduleId].exports;\n \t\t}\n \t\t// Create a new module (and put it into the cache)\n \t\tvar module = installedModules[moduleId] = {\n \t\t\ti: moduleId,\n \t\t\tl: false,\n \t\t\texports: {}\n \t\t};\n\n \t\t// Execute the module function\n \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n\n \t\t// Flag the module as loaded\n \t\tmodule.l = true;\n\n \t\t// Return the exports of the module\n \t\treturn module.exports;\n \t}\n\n\n \t// expose the modules object (__webpack_modules__)\n \t__webpack_require__.m = modules;\n\n \t// expose the module cache\n \t__webpack_require__.c = installedModules;\n\n \t// define getter function for harmony exports\n \t__webpack_require__.d = function(exports, name, getter) {\n \t\tif(!__webpack_require__.o(exports, name)) {\n \t\t\tObject.defineProperty(exports, name, { enumerable: true, get: getter });\n \t\t}\n \t};\n\n \t// define __esModule on exports\n \t__webpack_require__.r = function(exports) {\n \t\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\n \t\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\n \t\t}\n \t\tObject.defineProperty(exports, '__esModule', { value: true });\n \t};\n\n \t// create a fake namespace object\n \t// mode & 1: value is a module id, require it\n \t// mode & 2: merge all properties of value into the ns\n \t// mode & 4: return value when already ns object\n \t// mode & 8|1: behave like require\n \t__webpack_require__.t = function(value, mode) {\n \t\tif(mode & 1) value = __webpack_require__(value);\n \t\tif(mode & 8) return value;\n \t\tif((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;\n \t\tvar ns = Object.create(null);\n \t\t__webpack_require__.r(ns);\n \t\tObject.defineProperty(ns, 'default', { enumerable: true, value: value });\n \t\tif(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));\n \t\treturn ns;\n \t};\n\n \t// getDefaultExport function for compatibility with non-harmony modules\n \t__webpack_require__.n = function(module) {\n \t\tvar getter = module && module.__esModule ?\n \t\t\tfunction getDefault() { return module['default']; } :\n \t\t\tfunction getModuleExports() { return module; };\n \t\t__webpack_require__.d(getter, 'a', getter);\n \t\treturn getter;\n \t};\n\n \t// Object.prototype.hasOwnProperty.call\n \t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\n\n \t// __webpack_public_path__\n \t__webpack_require__.p = "";\n\n\n \t// Load entry module and return exports\n \treturn __webpack_require__(__webpack_require__.s = 0);\n","class A {\n    f() { }\n}\n\nconst a = new A;\na.f();"],"sourceRoot":""}
```

它就是最终写入index.js.map中的内容，我们可以与上文index.js.map中的内容对比来验证。

### 3. 写文件

![](https://images.weserv.nl/?url=upload-images.jianshu.io/upload_images/1023733-e22fb495e4e024bb.png?imageMogr2/auto-orient/strip|imageView2/2/w/570/format/webp)

source map内容生成完之后，`hooks.afterOptimizeChunkAssets`就会返回，  
接着会依次调用，`hooks.optimizeAssets`，`hooks.afterOptimizeAssets`，`hooks.afterSeal`，

**

```
this.hooks.optimizeChunkAssets.callAsync(this.chunks, err => {
  ...
  this.hooks.afterOptimizeChunkAssets.call(this.chunks);
  this.hooks.optimizeAssets.callAsync(this.assets, err => {
    ...
    this.hooks.afterOptimizeAssets.call(this.assets);
    ...
    return this.hooks.afterSeal.callAsync(callback);
  });
});
```

由于这些调用，都位于`compilation.seal`函数的调用栈中，  
因此，最终回到了[Compiler.js 第542行](https://github.com/webpack/webpack/blob/v4.20.2/lib/Compiler.js#L542)，

**

```
compilation.seal(err => {
  ...
});
```

它是由`compiler.compile`函数调用的，

**

```
compile(callback) {
  ...
  this.hooks.beforeCompile.callAsync(params, err => {
    ...
    this.hooks.make.callAsync(compilation, err => {
      ...
      compilation.seal(err => {
        ...
        this.hooks.afterCompile.callAsync(compilation, err => {
          ...
          return callback(null, compilation);
        });
      });
    });
  });
}
```

而`compiler.compile`由`compiler.run`调用，位于[Compiler.js 第268行](https://github.com/webpack/webpack/blob/v4.20.2/lib/Compiler.js#L268)，

**

```
this.compile(onCompiled);
```

![](https://images.weserv.nl/?url=upload-images.jianshu.io/upload_images/1023733-69e9f6511ade9613.png?imageMogr2/auto-orient/strip|imageView2/2/w/576/format/webp)

#### 3.2 emit

`onCompiled`函数位于[Compiler.js 第211行](https://github.com/webpack/webpack/blob/v4.20.2/lib/Compiler.js#L211)，它调用了`compiler.emitAssets`，

**

```
const onCompiled = (err, compilation) => {
  ...
  this.emitAssets(compilation, err => {
    ...
  });
};
```

`compiler.emitAssets`会读取`compilation.assets`中所有内容来生成文件，  
位于[Compiler.js 第300行](https://github.com/webpack/webpack/blob/v4.20.2/lib/Compiler.js#L300)，

**

```
emitAssets(compilation, callback) {
  let outputPath;

  const emitFiles = err => {
    if (err) return callback(err);

    asyncLib.forEach(
      compilation.assets,
      (source, file, callback) => {
        let targetFile = file;
        ...
        const writeOut = err => {
          ...
          const targetPath = this.outputFileSystem.join(
            outputPath,
            targetFile
          );
          ...
          let content = source.source();
          ...
          this.outputFileSystem.writeFile(targetPath, content, callback);
        };

        if (...) {
          ...
          this.outputFileSystem.mkdirp(
            ...,
            writeOut
          );
        } else {
          writeOut();
        }
      },
      err => {
        ...
      }
    );
  };
  ...
}
```

以上代码遍历了`compilation.assets`的所有属性`file`，得到了目标文件名，  
然后计算得到目标文件的绝对地址，最后把内容写进去。

这里，如果开启了source map的话，  
`file`会包含了编译后的代码文件，还有source map文件。

* * *

### 参考

[mdn: Use a source map](https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Use_a_source_map)  
[wikipedia: Source mapping](https://en.wikipedia.org/wiki/Minification_(programming)#Source_mapping)  
[Source Map Revision 3 Proposal](https://sourcemaps.info/spec.html)  
[webpack v4.20.2](https://github.com/webpack/webpack/tree/v4.20.2)  
[uglifyjs-webpack-plugin v1.3.0](https://github.com/webpack-contrib/uglifyjs-webpack-plugin/tree/v1.3.0)  
[uglify-es](https://github.com/mishoo/UglifyJS2)

