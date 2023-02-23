(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{328:function(s,n,t){"use strict";t.r(n);var a=t(14),e=Object(a.a)({},(function(){var s=this,n=s._self._c;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("p",[s._v("它们都是css预处理器。css预处理器的概念：CSS预处理器用一种专门的编程语言，进行Web页面样式设计，然后再编译成正常的CSS文件，以供项目使用。")]),s._v(" "),n("h5",{attrs:{id:"一-sass-scss、less、stylus是什么"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#一-sass-scss、less、stylus是什么"}},[s._v("#")]),s._v(" 一. Sass/Scss、Less、stylus是什么?")]),s._v(" "),n("p",[s._v("它们都是css预处理器。css预处理器的概念：CSS预处理器用一种专门的编程语言，进行Web页面样式设计，然后再编译成正常的CSS文件，以供项目使用。")]),s._v(" "),n("h5",{attrs:{id:"基本介绍"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#基本介绍"}},[s._v("#")]),s._v(" 基本介绍:")]),s._v(" "),n("h6",{attrs:{id:"sass-scss"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#sass-scss"}},[s._v("#")]),s._v(" sass/scss")]),s._v(" "),n("p",[s._v("SASS 2007年诞生，最早也是最成熟的CSS预处理器，拥有ruby社区的支持和compass这一最强大的css框架\nSass的缩排语法，对于写惯css前端的web开发者来说很不直观，sass 不兼容 css 代码\nSass3 就变成了Scss(sassy css) 与原来的语法兼容，只是用{}取代了原来的缩进\nsass 的运行 依赖于 ruby 环境（compass 将 sass 编译为 css）\n现在可用 node-sass 来编译 sass/scss 文件")]),s._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",[n("code",[s._v("  node-sass 是一套在 node.js 用 LibSass 編 sass/scss 的工具\n  原始的sass 是用 ruby 编写的，所以需要 ruby 环境，libSass 是原始sass引擎的一个 c/c++ 接口，使用它编译sass不依赖于ruby，可以使用其他语言使用libSass\n  node-sass\n  ruby-sass与libsass的区别\n  安装node-sass时，会去GitHub 下载一个 .node的文件而这个文件托管在墙外的服务器上，所以失败了 node-sass安装失败解决方案\n")])])]),n("p",[s._v("以 .sass 或 .scss 为文件后缀名称（现在一般都是用 scss）")]),s._v(" "),n("h6",{attrs:{id:"less"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#less"}},[s._v("#")]),s._v(" less")]),s._v(" "),n("p",[s._v("less 2009年出现，受sass的影响较大，但又使用CSS的语法，让大部分开发者和设计师更容易上手，在ruby社区之外支持者远超过SASS，其缺点是比起SASS来，可编程功能不够，不过优点是简单和兼容CSS，反过来也影响了sass演变到了scss的时代，著名的Twitter Bootstrap就是采用LESS做底层语言的。\nless 可以使用 less.js 在浏览器运行时中解析 less 代码\n也可以在 node环境中 安装 less，提前编译 less 文件 npm install -g less &lessc styles.less styles.css (可以加参数控制编译后的css排版及压缩)\n以 .less 为文件后缀名称")]),s._v(" "),n("h6",{attrs:{id:"stylus"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#stylus"}},[s._v("#")]),s._v(" stylus")]),s._v(" "),n("p",[s._v("Stylus，2010年产生，来自Node.js社区，主要用来给Node项目进行CSS预处理支持，由 TJ 大神开发安装及编译 npm install stylus -g & stylus src/ (可以加参数控制编译后的css排版及压缩)以 .styl 为文件后缀\n使用现状：现在一般都是配合webpack使用这几种预处理语言，需要先安装 编译器、对应 loader，然后再 module.rules 配置其具体规则")]),s._v(" "),n("h6",{attrs:{id:"基本语法"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#基本语法"}},[s._v("#")]),s._v(" 基本语法")]),s._v(" "),n("p",[s._v("less 基本语法属于 css 风格，而 sass，stylus 利用缩进，空格，换行来减少需要输入的 字符\n目前 scss, stylus 也可以支持 css 风格，用大括号 来书写")]),s._v(" "),n("p",[s._v("1、变量符 @ $ 无变量符号直接变量名")]),s._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",[n("code",[s._v("less \n@size: 10px;\n.box {\n    width: @size;\n}\n\nscss\n$red: #c00;\nstrong {\n    color: $red;\n}\n\nstylus\nred = #c00\nstrong\n    color: red\n\ncss 的变量规范\n/* global scope */\n:root {\n    --red: #c00;\n}\nstrong {\n    color: var(--red);\n}\n\n* 变量作用域：less 惰性加载，sass，stylus 就近加载\n")])])]),n("p",[s._v("2、嵌套语法一致，用 & 引用父集 -- 嵌套不建议超过 4 层")]),s._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",[n("code",[s._v("* less 不支持跳出嵌套\n* sass `@at-root`\n```\n@at-root 支持参数，跳出不同的嵌套 \nwithout： all，表示所有\nwithout: rule，表示常规css，rule是默认值\nwithout: media，表示media\nwithout: support，@support现在使用还不广泛\n\n// child1 将跳出 parent 的嵌套\n.parent1{\n    color:#f00;\n    @at-root .child1 {\n        width:200px;\n    }\n    }\n}\n```\n")])])]),n("p",[s._v("3、插值")]),s._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",[n("code",[s._v("less\n@prefix: ui;\n.@{prefix}-button {\ncolor: #333;\n}\n\nsass\n$prefix: ui\n.#{$prefix}-button {\n    color: #333;\n}\n\nstylus\nprefix = ui\n.{prefix}-button\n    color #333\n")])])]),n("p",[s._v("4、混入（mixin）：预处理器最精髓的功能，样式层面上的抽象（相当于copy代码片段）\nless 直接引入\nscss 要先声明 @mixin,使用时 @include")]),s._v(" "),n("p",[s._v("5、继承\n6、函数\n7、逻辑控制：sass, stylus 支持 if else for each while, less 使用 mixin when 处理\n具体语法看官方文档")]),s._v(" "),n("h6",{attrs:{id:"总结"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[s._v("#")]),s._v(" 总结：")]),s._v(" "),n("p",[s._v("sass 大而全，出现时间最久，但依赖于 ruby (compass)\nless 可以平滑的从 css 过度而来，可以在运行时解析，逻辑功能有些缺失\nstylus 起源 nodejs 社区，语法灵活， 有一个官方开发的样式库 nib，同样提供了不少好用的 mixin")]),s._v(" "),n("h5",{attrs:{id:"postcss-是什么样的一种存在"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#postcss-是什么样的一种存在"}},[s._v("#")]),s._v(" Postcss 是什么样的一种存在？")]),s._v(" "),n("p",[s._v("PostCSS 既不是预处理器也不是后处理器，而是一个平台，其本身并不处理任何具体任务，只有当我们为其附加各种插件之后，他才具有实用性\nPostCSS 就像是一个使能器（enabler），他可以不用完全替代现有的预处理器或后处理器，而只是作为他们的补充工具。PostCSS的工作机制主要包含解析代码、执行插件、渲染结果三部分：\nPostCSS 会将css代码解析成包含一系列节点的抽象语法树（AST, Abtract Syntax Tree）。\nPostCSS常用插件 （用这些插件集合其实已经可以代替 三大 css 预处理器）")]),s._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",[n("code",[s._v("cssnext, 未来语法，颜色函数...\npostcss-import, 导入文件\nautoprefixer, 自动前缀\nprecss, 集成sass预处理器，功能强大包括 autoprefixer mixins\npostcss-mixins, 混合宏，是用类似sass的混合宏，不可与 precss 混用\npostcss-conditions 逻辑判断\n...\n")])])]),n("p",[s._v("目前 Postcss 在一般项目中的用途")]),s._v(" "),n("p",[s._v("使用其 autoprefixer 插件，为css 属性增加前缀\n创建 postcss.config.js")]),s._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",[n("code",[s._v("// webpack.config.js\n{\n    test: /\\.less$/,\n    loader: ExtractTextWebpackPlugin.extract([\n        {loader: 'css-loader', options: { minimize: true }},\n        'postcss-loader', // 要在预处理器处理完之后，在使用 postcss-loader \n        'less-loader',\n    ]),\n}\n\n// postcss.config.js\nmodule.exports = {\n    plugins: [\n        require('autoprefixer')({\n            'browsers': ['> 1%', 'last 2 versions']\n        })\n    ]\n}")])])])])}),[],!1,null,null,null);n.default=e.exports}}]);