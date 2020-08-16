(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{475:function(e,n,t){"use strict";t.r(n);var a=t(2),r=Object(a.a)({},(function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("p",[e._v("ES6 系列之 defineProperty 与 proxy\n")]),e._v(" "),t("h5",{attrs:{id:"definepropety"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#definepropety"}},[e._v("#")]),e._v(" definePropety")]),e._v(" "),t("p",[e._v("ES5 提供了 Object.defineProperty 方法，该方法可以在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回这个对象。")]),e._v(" "),t("p",[e._v("语法\nObject.defineProperty(obj, prop, descriptor)")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("obj: 要在其上定义属性的对象。\n\nprop:  要定义或修改的属性的名称。\n\ndescriptor: 将被定义或修改的属性的描述符。\n")])])]),t("p",[e._v("举个例子：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v('var obj = {};\nObject.defineProperty(obj, "num", {\n    value : 1,\n    writable : true,\n    enumerable : true,\n    configurable : true\n});\n//  对象 obj 拥有属性 num，值为 1\n')])])]),t("p",[e._v("虽然我们可以直接添加属性和值，但是使用这种方式，我们能进行更多的配置。")]),e._v(" "),t("p",[e._v("函数的第三个参数 descriptor 所表示的属性描述符有两种形式：数据描述符和存取描述符。")]),e._v(" "),t("h6",{attrs:{id:"两者均具有以下两种键值："}},[t("a",{staticClass:"header-anchor",attrs:{href:"#两者均具有以下两种键值："}},[e._v("#")]),e._v(" 两者均具有以下两种键值：")]),e._v(" "),t("p",[e._v("configurable")]),e._v(" "),t("p",[e._v("当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，也能够被删除。默认为 false。\nenumerable")]),e._v(" "),t("p",[e._v("当且仅当该属性的 enumerable 为 true 时，该属性才能够出现在对象的枚举属性中。默认为 false。")]),e._v(" "),t("h6",{attrs:{id:"数据描述符同时具有以下可选键值："}},[t("a",{staticClass:"header-anchor",attrs:{href:"#数据描述符同时具有以下可选键值："}},[e._v("#")]),e._v(" 数据描述符同时具有以下可选键值：")]),e._v(" "),t("p",[e._v("value")]),e._v(" "),t("p",[e._v("该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 undefined。\nwritable")]),e._v(" "),t("p",[e._v("当且仅当该属性的 writable 为 true 时，该属性才能被赋值运算符改变。默认为 false。")]),e._v(" "),t("h6",{attrs:{id:"存取描述符同时具有以下可选键值："}},[t("a",{staticClass:"header-anchor",attrs:{href:"#存取描述符同时具有以下可选键值："}},[e._v("#")]),e._v(" 存取描述符同时具有以下可选键值：")]),e._v(" "),t("p",[e._v("get")]),e._v(" "),t("p",[e._v("一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。该方法返回值被用作属性值。默认为 undefined。\nset")]),e._v(" "),t("p",[e._v("一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。该方法将接受唯一参数，并将该参数的新值分配给该属性。默认为 undefined。\n值得注意的是：")]),e._v(" "),t("p",[e._v("属性描述符必须是数据描述符或者存取描述符两种形式之一，不能同时是两者 。这就意味着你可以：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v('Object.defineProperty({}, "num", {\n    value: 1,\n    writable: true,\n    enumerable: true,\n    configurable: true\n});\n')])])]),t("p",[e._v("也可以：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v('var value = 1;\nObject.defineProperty({}, "num", {\n    get : function(){\n      return value;\n    },\n    set : function(newValue){\n      value = newValue;\n    },\n    enumerable : true,\n    configurable : true\n});\n')])])]),t("p",[e._v("但是不可以：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v('// 报错\nObject.defineProperty({}, "num", {\n    value: 1,\n    get: function() {\n        return 1;\n    }\n});\n')])])]),t("p",[e._v("此外，所有的属性描述符都是非必须的，但是 descriptor 这个字段是必须的，如果不进行任何配置，你可以这样：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v('var obj = Object.defineProperty({}, "num", {});\nconsole.log(obj.num); // undefined\n')])])]),t("h5",{attrs:{id:"setters-和-getters"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#setters-和-getters"}},[e._v("#")]),e._v(" Setters 和 Getters")]),e._v(" "),t("p",[e._v("之所以讲到 defineProperty，是因为我们要使用存取描述符中的 get 和 set，这两个方法又被称为 getter 和 setter。由 getter 和 setter 定义的属性称做”存取器属性“。")]),e._v(" "),t("p",[e._v("当程序查询存取器属性的值时，JavaScript 调用 getter方法。这个方法的返回值就是属性存取表达式的值。当程序设置一个存取器属性的值时，JavaScript 调用 setter 方法，将赋值表达式右侧的值当做参数传入 setter。从某种意义上讲，这个方法负责“设置”属性值。可以忽略 setter 方法的返回值。")]),e._v(" "),t("p",[e._v("举个例子：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("var obj = {}, value = null;\nObject.defineProperty(obj, \"num\", {\n    get: function(){\n        console.log('执行了 get 操作')\n        return value;\n    },\n    set: function(newValue) {\n        console.log('执行了 set 操作')\n        value = newValue;\n    }\n})\n\nobj.num = 1 // 执行了 set 操作\n\nconsole.log(obj.num); // 执行了 get 操作 // 1\n")])])]),t("p",[e._v("这不就是我们要的监控数据改变的方法吗？我们再来封装一下：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("function Archiver() {\n    var value = null;\n    // archive n. 档案\n    var archive = [];\n\n    Object.defineProperty(this, 'num', {\n        get: function() {\n            console.log('执行了 get 操作')\n            return value;\n        },\n        set: function(value) {\n            console.log('执行了 set 操作')\n            value = value;\n            archive.push({ val: value });\n        }\n    });\n\n    this.getArchive = function() { return archive; };\n}\n\nvar arc = new Archiver();\narc.num; // 执行了 get 操作\narc.num = 11; // 执行了 set 操作\narc.num = 13; // 执行了 set 操作\nconsole.log(arc.getArchive()); // [{ val: 11 }, { val: 13 }]\n")])])]),t("p",[e._v("watch API")]),e._v(" "),t("p",[e._v("既然可以监控数据的改变，那我可以这样设想，即当数据改变的时候，自动进行渲染工作。举个例子：")]),e._v(" "),t("p",[e._v("HTML 中有个 span 标签和 button 标签")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v('<span id="container">1</span>\n<button id="button">点击加 1</button>\n')])])]),t("p",[e._v("当点击按钮的时候，span 标签里的值加 1。")]),e._v(" "),t("p",[e._v("传统的做法是：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v('document.getElementById(\'button\').addEventListener("click", function(){\n    var container = document.getElementById("container");\n    container.innerHTML = Number(container.innerHTML) + 1;\n});\n')])])]),t("p",[e._v("如果使用了 defineProperty：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("var obj = {\n    value: 1\n}\n\n// 储存 obj.value 的值\nvar value = 1;\n\nObject.defineProperty(obj, \"value\", {\n    get: function() {\n        return value;\n    },\n    set: function(newValue) {\n        value = newValue;\n        document.getElementById('container').innerHTML = newValue;\n    }\n});\n\ndocument.getElementById('button').addEventListener(\"click\", function() {\n    obj.value += 1;\n});\n")])])]),t("p",[e._v("代码看似增多了，但是当我们需要改变 span 标签里的值的时候，直接修改 obj.value 的值就可以了。")]),e._v(" "),t("p",[e._v("然而，现在的写法，我们还需要单独声明一个变量存储 obj.value 的值，因为如果你在 set 中直接 obj.value = newValue 就会陷入无限的循环中。此外，我们可能需要监控很多属性值的改变，要是一个一个写，也很累呐，所以我们简单写个 watch 函数。使用效果如下：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("var obj = {\n    value: 1\n}\n\nwatch(obj, \"value\", function(newvalue){\n    document.getElementById('container').innerHTML = newvalue;\n})\n\ndocument.getElementById('button').addEventListener(\"click\", function(){\n    obj.value += 1\n});\n")])])]),t("p",[e._v("我们来写下这个 watch 函数：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("(function(){\n    var root = this;\n    function watch(obj, name, func){\n        var value = obj[name];\n\n        Object.defineProperty(obj, name, {\n            get: function() {\n                return value;\n            },\n            set: function(newValue) {\n                value = newValue;\n                func(value)\n            }\n        });\n\n        if (value) obj[name] = value\n    }\n\n    this.watch = watch;\n})()\n")])])]),t("p",[e._v("现在我们已经可以监控对象属性值的改变，并且可以根据属性值的改变，添加回调函数，棒棒哒~")]),e._v(" "),t("h5",{attrs:{id:"proxy"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#proxy"}},[e._v("#")]),e._v(" proxy")]),e._v(" "),t("p",[e._v("使用 defineProperty 只能重定义属性的读取（get）和设置（set）行为，到了 ES6，提供了 Proxy，可以重定义更多的行为，比如 in、delete、函数调用等更多行为。")]),e._v(" "),t("p",[e._v("Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。我们来看看它的语法：")]),e._v(" "),t("p",[e._v("var proxy = new Proxy(target, handler);")]),e._v(" "),t("p",[e._v("proxy 对象的所有用法，都是上面这种形式，不同的只是handler参数的写法。其中，new Proxy()表示生成一个Proxy实例，target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("var proxy = new Proxy({}, {\n    get: function(obj, prop) {\n        console.log('设置 get 操作')\n        return obj[prop];\n    },\n    set: function(obj, prop, value) {\n        console.log('设置 set 操作')\n        obj[prop] = value;\n    }\n});\n\nproxy.time = 35; // 设置 set 操作\n\nconsole.log(proxy.time); // 设置 get 操作 // 35\n")])])]),t("p",[e._v("除了 get 和 set 之外，proxy 可以拦截多达 13 种操作，比如 has(target, propKey)，可以拦截 propKey in proxy 的操作，返回一个布尔值。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("// 使用 has 方法隐藏某些属性，不被 in 运算符发现\nvar handler = {\n  has (target, key) {\n    if (key[0] === '_') {\n      return false;\n    }\n    return key in target;\n  }\n};\nvar target = { _prop: 'foo', prop: 'foo' };\nvar proxy = new Proxy(target, handler);\nconsole.log('_prop' in proxy); // false\n")])])]),t("p",[e._v("又比如说 apply 方法拦截函数的调用、call 和 apply 操作。")]),e._v(" "),t("p",[e._v("apply 方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组，不过这里我们简单演示一下：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("var target = function () { return 'I am the target'; };\nvar handler = {\n  apply: function () {\n    return 'I am the proxy';\n  }\n};\n\nvar p = new Proxy(target, handler);\n\np();\n// \"I am the proxy\"\n")])])]),t("p",[e._v("又比如说 ownKeys 方法可以拦截对象自身属性的读取操作。具体来说，拦截以下操作：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("Object.getOwnPropertyNames()\nObject.getOwnPropertySymbols()\nObject.keys()\n")])])]),t("p",[e._v("下面的例子是拦截第一个字符为下划线的属性名，不让它被 for of 遍历到。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("let target = {\n  _bar: 'foo',\n  _prop: 'bar',\n  prop: 'baz'\n};\n\nlet handler = {\n  ownKeys (target) {\n    return Reflect.ownKeys(target).filter(key => key[0] !== '_');\n  }\n};\n\nlet proxy = new Proxy(target, handler);\nfor (let key of Object.keys(proxy)) {\n  console.log(target[key]);\n}\n// \"baz\"\n")])])]),t("p",[e._v("更多的拦截行为可以查看阮一峰老师的 《ECMAScript 6 入门》")]),e._v(" "),t("p",[e._v("值得注意的是，proxy 的最大问题在于浏览器支持度不够，而且很多效果无法使用 poilyfill 来弥补。")]),e._v(" "),t("h5",{attrs:{id:"watch-api-优化"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#watch-api-优化"}},[e._v("#")]),e._v(" watch API 优化")]),e._v(" "),t("p",[e._v("我们使用 proxy 再来写一下 watch 函数。使用效果如下：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("(function() {\n    var root = this;\n\n    function watch(target, func) {\n\n        var proxy = new Proxy(target, {\n            get: function(target, prop) {\n                return target[prop];\n            },\n            set: function(target, prop, value) {\n                target[prop] = value;\n                func(prop, value);\n            }\n        });\n\n        return proxy;\n    }\n\n    this.watch = watch;\n})()\n\nvar obj = {\n    value: 1\n}\n\nvar newObj = watch(obj, function(key, newvalue) {\n    if (key == 'value') document.getElementById('container').innerHTML = newvalue;\n})\n\ndocument.getElementById('button').addEventListener(\"click\", function() {\n    newObj.value += 1\n});\n")])])]),t("p",[e._v("我们也可以发现，使用 defineProperty 和 proxy 的区别，当使用 defineProperty，我们修改原来的 obj 对象就可以触发拦截，而使用 proxy，就必须修改代理对象，即 Proxy 的实例才可以触发拦截。")])])}),[],!1,null,null,null);n.default=r.exports}}]);