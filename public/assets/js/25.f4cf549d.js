(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{479:function(a,n,e){"use strict";e.r(n);var t=e(2),s=Object(t.a)({},(function(){var a=this,n=a.$createElement,e=a._self._c||n;return e("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[e("p",[a._v("ES6 系列之 let 和 const\n")]),a._v(" "),e("h5",{attrs:{id:"块级作用域的出现"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#块级作用域的出现"}},[a._v("#")]),a._v(" 块级作用域的出现")]),a._v(" "),e("p",[a._v("通过 var 声明的变量存在变量提升的特性：")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",[e("code",[a._v("if (condition) {\n    var value = 1;\n}\nconsole.log(value);\n")])])]),e("p",[a._v("初学者可能会觉得只有 condition 为 true 的时候，才会创建 value，如果 condition 为 false，结果应该是报错，然而因为变量提升的原因，代码相当于：")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",[e("code",[a._v("var value;\nif (condition) {\n    value = 1;\n}\nconsole.log(value);\n")])])]),e("p",[a._v("如果 condition 为 false，结果会是 undefined。")]),a._v(" "),e("p",[a._v("除此之外，在 for 循环中：")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",[e("code",[a._v("for (var i = 0; i < 10; i++) {\n    ...\n}\nconsole.log(i); // 10\n")])])]),e("p",[a._v("即便循环已经结束了，我们依然可以访问 i 的值。")]),a._v(" "),e("p",[a._v("为了加强对变量生命周期的控制，ECMAScript 6 引入了块级作用域。")]),a._v(" "),e("p",[a._v("块级作用域存在于：")]),a._v(" "),e("p",[a._v("函数内部\n块中(字符 { 和 } 之间的区域)")]),a._v(" "),e("h5",{attrs:{id:"let-和-const"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#let-和-const"}},[a._v("#")]),a._v(" let 和 const")]),a._v(" "),e("p",[a._v("块级声明用于声明在指定块的作用域之外无法访问的变量。")]),a._v(" "),e("p",[a._v("let 和 const 都是块级声明的一种。")]),a._v(" "),e("p",[a._v("我们来回顾下 let 和 const 的特点：")]),a._v(" "),e("h6",{attrs:{id:"_1-不会被提升"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-不会被提升"}},[a._v("#")]),a._v(" 1.不会被提升")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",[e("code",[a._v("if (false) {\n    let value = 1;\n}\nconsole.log(value); // Uncaught ReferenceError: value is not defined\n")])])]),e("h6",{attrs:{id:"_2-重复声明报错"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-重复声明报错"}},[a._v("#")]),a._v(" 2.重复声明报错")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",[e("code",[a._v("var value = 1;\nlet value = 2; // Uncaught SyntaxError: Identifier 'value' has already been declared\n")])])]),e("h6",{attrs:{id:"_3-不绑定全局作用域"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-不绑定全局作用域"}},[a._v("#")]),a._v(" 3.不绑定全局作用域")]),a._v(" "),e("p",[a._v("当在全局作用域中使用 var 声明的时候，会创建一个新的全局变量作为全局对象的属性。")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",[e("code",[a._v("var value = 1;\nconsole.log(window.value); // 1\n")])])]),e("p",[a._v("然而 let 和 const 不会：")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",[e("code",[a._v("let value = 1;\nconsole.log(window.value); // undefined\n")])])]),e("p",[a._v("再来说下 let 和 const 的区别：")]),a._v(" "),e("p",[a._v("const 用于声明常量，其值一旦被设定不能再被修改，否则会报错。")]),a._v(" "),e("p",[a._v("值得一提的是：const 声明不允许修改绑定，但允许修改值。这意味着当用 const 声明对象时：")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",[e("code",[a._v("const data = {\n    value: 1\n}\n\n// 没有问题\ndata.value = 2;\ndata.num = 3;\n\n// 报错\ndata = {}; // Uncaught TypeError: Assignment to constant variable.\n")])])]),e("h5",{attrs:{id:"临时死区"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#临时死区"}},[a._v("#")]),a._v(" 临时死区")]),a._v(" "),e("p",[a._v("临时死区(Temporal Dead Zone)，简写为 TDZ。")]),a._v(" "),e("p",[a._v("let 和 const 声明的变量不会被提升到作用域顶部，如果在声明之前访问这些变量，会导致报错：")]),a._v(" "),e("p",[a._v("console.log(typeof value); // Uncaught ReferenceError: value is not defined\nlet value = 1;\n这是因为 JavaScript 引擎在扫描代码发现变量声明时，要么将它们提升到作用域顶部(遇到 var 声明)，要么将声明放在 TDZ 中(遇到 let 和 const 声明)。访问 TDZ 中的变量会触发运行时错误。只有执行过变量声明语句后，变量才会从 TDZ 中移出，然后方可访问。")]),a._v(" "),e("p",[a._v("看似很好理解，不保证你不犯错：")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",[e("code",[a._v("var value = \"global\";\n\n// 例子1\n(function() {\n    console.log(value);\n\n    let value = 'local';\n}());\n\n// 例子2\n{\n    console.log(value);\n\n    const value = 'local';\n};\n")])])]),e("p",[a._v('两个例子中，结果并不会打印 "global"，而是报错 Uncaught ReferenceError: value is not defined，就是因为 TDZ 的缘故。')]),a._v(" "),e("p",[a._v("如果let声明的变量没有变量提升，应该打印’global’；而它却报错，说明它是提升了的，只是规定了不能在其声明之前使用而已。我们称这特性叫“暂时性死区（temporal dead zone）”。且这一特性，仅对遵循‘块级作用域’的命令有效（let、const）。")]),a._v(" "),e("p",[a._v("循环中的块级作用域")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",[e("code",[a._v("var funcs = [];\nfor (var i = 0; i < 3; i++) {\n    funcs[i] = function () {\n        console.log(i);\n    };\n}\nfuncs[0](); // 3\n")])])]),e("p",[a._v("一个老生常谈的面试题，解决方案如下：")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",[e("code",[a._v("var funcs = [];\nfor (var i = 0; i < 3; i++) {\n    funcs[i] = (function(i){\n        return function() {\n            console.log(i);\n        }\n    }(i))\n}\nfuncs[0](); // 0\n")])])]),e("p",[a._v("ES6 的 let 为这个问题提供了新的解决方法：")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",[e("code",[a._v("var funcs = [];\nfor (let i = 0; i < 3; i++) {\n    funcs[i] = function () {\n        console.log(i);\n    };\n}\nfuncs[0](); // 0\n")])])]),e("p",[a._v("问题在于，上面讲了 let 不提升，不能重复声明，不能绑定全局作用域等等特性，可是为什么在这里就能正确打印出 i 值呢？")]),a._v(" "),e("p",[a._v("如果是不重复声明，在循环第二次的时候，又用 let 声明了 i，应该报错呀，就算因为某种原因，重复声明不报错，一遍一遍迭代，i 的值最终还是应该是 3 呀，还有人说 for 循环的\n设置循环变量的那部分是一个单独的作用域，就比如：")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",[e("code",[a._v("  for (let i = 0; i < 3; i++) {\n    let i = 'abc';\n    console.log(i);\n  }\n  // abc\n  // abc\n  // abc\n")])])]),e("p",[a._v("这个例子是对的，如果我们把 let 改成 var 呢？")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",[e("code",[a._v("  for (var i = 0; i < 3; i++) {\n    var i = 'abc';\n    console.log(i);\n  }\n  // abc\n")])])]),e("p",[a._v("为什么结果就不一样了呢，如果有单独的作用域，结果应该是相同的呀……")]),a._v(" "),e("p",[a._v("总结：\nhttps://www.cnblogs.com/moumoon/p/10985250.html")])])}),[],!1,null,null,null);n.default=s.exports}}]);