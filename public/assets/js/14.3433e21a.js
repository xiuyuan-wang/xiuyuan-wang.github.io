(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{474:function(t,n,e){"use strict";e.r(n);var i=e(2),a=Object(i.a)({},(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("p",[t._v("IE6兼容性问题及解决办法汇总\n")]),t._v(" "),e("p",[t._v("1、IE6怪异解析之padding与border算入宽高 \n原因：未加文档声明造成非盒模型解析 \n解决方法：加入文档声明<!doctype html>")]),t._v(" "),e("p",[t._v("2、IE6在块元素、左右浮动、设定marin时造成margin双倍（双边距） \n解决方法：display:inline")]),t._v(" "),e("p",[t._v("3、以下三种其实是同一种bug，其实也不算是个bug，举个例子：父标签高度20，子标签11，垂直居中，20-11=9，9要分给文字的上面与下面，怎么分？IE6就会与其它的不同，所以，尽量避免。 \n1）字体大小为奇数之边框高度少1px \n解决方法：字体大小设置为偶数或line-height为偶数 \n2）line-height，文本垂直居中差1px \n解决方法：padding-top代替line-height居中，或line-height加1或减1 \n3）与父标签的宽度的奇偶不同的居中造成1px的偏离 \n解决方法：如果父标签是奇数宽度，则子标签也用奇数宽度;如果是父标签偶数宽度，则子标签也用偶数宽度")]),t._v(" "),e("p",[t._v("4、内部盒模型超出父级时，父级被撑大 \n解决方法：父标签使用overflow:hidden")]),t._v(" "),e("p",[t._v("5、line-height默认行高bug \n解决方法：line-height设值")]),t._v(" "),e("p",[t._v("6、行标签之间会有一小段空白 \n解决方法：float或结构并排(可读性差，不建议)")]),t._v(" "),e("p",[t._v("7、标签高度无法小于19px \n解决方法：overflow: hidden;")]),t._v(" "),e("p",[t._v("8、左浮元素margin-bottom失效 \n解决方法：显示设置高度 or 父标签设置_padding-bottom代替子标签的margin-bottom or 再放个标签让父标签浮动，子标签 \nmargin- bottom，即(margin-bottom与float不同时作用于一个标签)")]),t._v(" "),e("p",[t._v("9、img于块元素中，底边多出空白 \n解决方法：父级设置overflow: hidden; 或 img { display: block; } 或 _margin: -5px;")]),t._v(" "),e("p",[t._v("10、li之间会有间距")]),t._v(" "),e("p",[t._v("解决方法：float: left;")]),t._v(" "),e("p",[t._v("11、块元素中有文字及右浮动的行元素，行元素换行 \n解决方法：将行元素置于块元素内的文字前")]),t._v(" "),e("p",[t._v("12、position下的left，bottom错位 \n解决方法：为父级(relative层)设置宽高或添加*zoom:1")]),t._v(" "),e("p",[t._v("13、子级中有设置position，则父级overflow失效 \n解决方法：为父级设置position:relative")]),t._v(" "),e("p",[t._v("解决IE6兼容性问题的方法：")]),t._v(" "),e("p",[t._v("1、终极方法：条件注释 \n"),t._v(" "),t._v(" \n缺点是在IE浏览器下可能会增加额外的HTTP请求数。")]),t._v(" "),e("p",[t._v("2、CSS选择器区分 \nIE6不支持子选择器；先针对IE6使用常规申明CSS选择器，然后再用子选择器针对IE7+及其他浏览器")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",[e("code",[t._v('<span style="font-family:Microsoft YaHei;font-size:14px;">   \n/* IE6 专用 */   \n.content {color:red;}   \n/* 其他浏览器 */   \ndiv>p .content {color:blue;}  \n</span>  \n')])])]),e("p",[t._v("3、PNG半透明图片的问题 \n虽然可以通过JS等方式解决，但依然存在载入速度等问题，所以，这个在设计上能避免还是尽量避免为好。以达到网站最大优化。 \n4、IE6下的圆角 \nIE6不支持CSS3的圆角属性，性价比最高的解决方法就是用图片圆角来替代，或者放弃IE6的圆角。")]),t._v(" "),e("p",[t._v("5、IE6背景闪烁 \n如果你给链接、按钮用CSS sprites作为背景，你可能会发现在IE6下会有背景图闪烁的现象。造成这个的原因是由于IE6没有将背景图缓存，每次触发hover的时候都会重新加载，可以用JavaScript设置IE6缓存这些图片：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",[e("code",[t._v('<span style="font-family:Microsoft YaHei;font-size:14px;">   \ndocument.execCommand("BackgroundImageCache",false,true);   \n</span>  \n')])])]),e("p",[t._v("6、最小高度 \nIE6 不支持min-height属性，但它却认为height就是最小高度。解决方法：使用ie6不支持但其余浏览器支持的属性!important。")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",[e("code",[t._v('<span style="font-family:Microsoft YaHei;font-size:14px;">   \n#container {min-height:200px; height:auto !important; height:200px;}   \n</span>  \n')])])]),e("p",[t._v("7、最大高度")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",[e("code",[t._v('<span style="font-family:Microsoft YaHei;font-size:14px;">   \n//直接使用ID来改变元素的最大高度   \nvar container = document.getElementById(\'container\');   \ncontainer.style.height = (container.scrollHeight > 199) ? "200px" : "auto";   \n//写成函数来运行   \nfunction setMaxHeight(elementId, height){   \nvar container = document.getElementById(elementId);   \ncontainer.style.height = (container.scrollHeight > (height - 1)) ? height + "px" : "auto";   \n}   \n//函数示例   \nsetMaxHeight(\'container1\', 200);   \nsetMaxHeight(\'container2\', 500);   \n</span>  \n')])])]),e("p",[t._v("8、100% 高度 \n在IE6下，如果要给元素定义100%高度，必须要明确定义它的父级元素的高度，如果你需要给元素定义满屏的高度，就得先给html和body定义height:100%;。")]),t._v(" "),e("p",[t._v("9、最小宽度 \n同max-height和max-width一样，IE6也不支持min-width。")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",[e("code",[t._v('<span style="font-family:Microsoft YaHei;font-size:14px;">   \n//直接使用ID来改变元素的最小宽度   \nvar container = document.getElementById(\'container\');   \ncontainer.style.width = (container.clientWidth < width) ? "500px" : "auto";   \n//写成函数来运行   \nfunction setMinWidth(elementId, width){   \nvar container = document.getElementById(elementId);   \ncontainer.style.width = (container.clientWidth < width) ? width + "px" : "auto";   \n}   \n//函数示例   \nsetMinWidth(\'container1\', 200);   \nsetMinWidth(\'container2\', 500);   \n</span>  \n')])])]),e("p",[t._v("10、最大宽度")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",[e("code",[t._v('<span style="font-family:Microsoft YaHei;font-size:14px;">   \n//直接使用ID来改变元素的最大宽度   \nvar container = document.getElementById(elementId);   \ncontainer.style.width = (container.clientWidth > (width - 1)) ? width + "px" : "auto";   \n//写成函数来运行   \nfunction setMaxWidth(elementId, width){   \nvar container = document.getElementById(elementId);   \ncontainer.style.width = (container.clientWidth > (width - 1)) ? width + "px" : "auto";   \n}   \n//函数示例   \nsetMaxWidth(\'container1\', 200);   \nsetMaxWidth(\'container2\', 500);   \n</span> \n \n')])])]),e("p",[t._v("11、双边距Bug \n当元素浮动时，IE6会错误的把浮动方向的margin值双倍计算。个人觉得较好解决方法是避免float和margin同时使用。")]),t._v(" "),e("p",[t._v("12、清除浮动 \n如果你想用div(或其他容器)包裹一个浮动的元素，你会发现必须给div(容器)定义明确的height、width、overflow之中一个属性（除了auto值）才能将浮动元素严实地包裹。")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",[e("code",[t._v('<span style="font-family:Microsoft YaHei;font-size:14px;">   \n#container {border:1px solid #333; overflow:auto; height:100%;}   \n#floated1 {float:left; height:300px; width:200px; background:#00F;}   \n#floated2 {float:right; height:400px; width:200px; background:#F0F;}   \n更多：http://www.twinsenliang.net/skill/20090413.html   \n</span>  \n')])])]),e("p",[t._v("13、浮动层错位 \n当内容超出外包容器定义的宽度时，在IE6中容器会忽视定义的width值，宽度会错误地随内容宽度增长而增长。 \n浮动层错位问题在IE6下没有真正让人满意的解决方法，虽然可以使用overflow:hidden;或overflow:scroll;来修正， 但hidden容易导致其他一些问题，scroll会破坏设计；JavaScript也没法很好地解决这个问题。所以建议是一定要在布局上避免这个问题发 生，使用一个固定的布局或者控制好内容的宽度（给内层加width）。")]),t._v(" "),e("p",[t._v("14、躲猫猫bug \n在IE6和IE7下，躲猫猫bug是一个非常恼人的问题。一个撑破了容器的浮动元素，如果在他之后有不浮动的内容，并且有一些定义了:hover的链接，当鼠标移到那些链接上时，在IE6下就会触发躲猫猫。 \n解决方法很简单： \n1.在（那个未浮动的）内容之后添加一个"),e("span",{staticStyle:{clear:"both"}}),t._v(" \n2.触发包含了这些链接的容器的hasLayout，一个简单的方法就是给其定义height:1%;")]),t._v(" "),e("p",[t._v("15、绝对定位元素的1像素间距bug \nIE6下的这个错误是由于进位处理误差造成（IE7已修复），当绝对定位元素的父元素高或宽为奇数时，bottom和right会产生错误。唯一的解决办法就是给父元素定义明确的高宽值，但对于液态布局没有完美的解决方法。")]),t._v(" "),e("p",[t._v("16、3像素间距bug \n在IE6中，当文本(或无浮动元素)跟在一个浮动的元素之后，文本和这个浮动元素之间会多出3像素的间隔。 \n给浮动层添加 display:inline 和 -3px 负值margin \n给中间的内容层定义 margin-right 以纠正-3px")]),t._v(" "),e("p",[t._v("17、IE下z-index的bug \n在IE浏览器中，定位元素的z-index层级是相对于各自的父级容器，所以会导致z-index出现错误的表现。解决方法是给其父级元素定义z-index，有些情况下还需要定义position:relative。")]),t._v(" "),e("p",[t._v("18、Overflow Bug \n在IE6/7中，overflow无法正确的隐藏有相对定位position:relative;的子元素。解决方法就是给外包容器.wrap加上position:relative;。")]),t._v(" "),e("p",[t._v("19、横向列表宽度bug \n如果你使用float:left;把")]),e("li",[t._v("横向摆列，并且")]),e("li",[t._v("内包含的"),e("a",[t._v("（或其他）触发了 hasLayout，在IE6下就会有错误的表现。解决方法很简单，只需要给"),e("a",[t._v("定义同样的float:left;即可。"),e("p"),t._v(" "),e("p",[t._v("20、列表阶梯bug \n列表阶梯bug通常会在给")]),e("li",[t._v("的子元素"),e("a",[t._v("使用float:left;时触发，我们本意是要做一个横向的列表(通常 是导航栏)，但IE却可能呈现出垂直的或者阶梯状。解决办法就是给"),e("li",[t._v("定义float:left;而非子元素"),e("a",[t._v("，或者 给"),e("li",[t._v("定义display:inline;也可以解决。"),e("p"),t._v(" "),e("p",[t._v("21、垂直列表间隙bug \n当我们使用")])]),e("li",[t._v(" 包含一个块级子元素时，IE6(IE7也有可能)会错误地给每条列表元素（")]),e("li",[t._v("）之间添加空隙。 \n解决方法：把"),e("a",[t._v("flaot并且清除float来解决这个问题；另外一个办法就是触发"),e("a",[t._v("的hasLayout（如定 义高宽、使用zoom:1;）；也可以给"),e("li",[t._v(" 定义display:inline;来解决此问题；另外还有一个极有趣的方法，给包含的文本末尾添加一个空格。"),e("p"),t._v(" "),e("p",[t._v("22、IE6中的:hover \n在IE6中，除了(需要有href属性)才能触发:hover行为，这妨碍了我们实现许多鼠标触碰效果，但还是有一些法子是可以解决它的。最好是不要用:hover来实现重要的功能，仅仅只用它来强化效果。")]),t._v(" "),e("p",[t._v("23、IE6调整窗口大小的 Bug \n当把body居中放置，改变IE浏览器大小的时候，任何在body里面的相对定位元素都会固定不动了。解决办法：给body定义position:relative;就行了。")]),t._v(" "),e("p",[t._v("24、文本重复Bug \n在IE6中，一些隐藏的元素（如注释、display:none;的元素）被包含在一个浮动元素里，就有可能引发文本重复bug。解决办法：给浮动元素添加display:inline;。")]),t._v(" "),e("p",[t._v("再补充：")]),t._v(" "),e("p",[t._v("10要点解决IE6兼容性问题")]),t._v(" "),e("p",[t._v("1、使用声明")]),t._v(" "),e("p",[t._v("你必须经常在html网页头部放置一个声明，推荐使用严格的标准。例如")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",[e("code",[t._v('<!DOCTYPEHTMLPUBLIC“-//W3C//DTDHTML4.01//EN”   "http://www.w3.org/TR/html4/strict.dtd”> or,forXHTML:  <!DOCTYPEhtmlPUBLIC“-//W3C//DTDXHTML1.0Strict//EN”   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd”> \n')])])]),e("p",[t._v("最后你需要是IE6进入兼容模式，这已经足够兼容了。")]),t._v(" "),e("p",[t._v("2、使用position:relative")]),t._v(" "),e("p",[t._v("IE6兼容性问题解决方案二：使用position:relative。设置一个标签position:relative可以解决很多问题，特别是曾经有过看不见的经历或者奇怪布局的框架。明显的，你需要小心，绝对位置放置的子元素是否都参照找到新位置。")]),t._v(" "),e("p",[t._v("3、为浮动元素使用display:inline")]),t._v(" "),e("p",[t._v("浮动元素会有一个著名的IE6双边距marginbug。假如你设置了左边距5px但实际上得到了10px左边距。display:inline可以解决这个问题，尽管它不是必需的，但是css仍然有效。")]),t._v(" "),e("p",[t._v("4、设置元素启动hasLayout")]),t._v(" "),e("p",[t._v("大部分IE6（IE7）的渲染问题都可以通过起来元素的hasLayout属性来兼容。这是IE内置的设定，确定一个内容块相对其它内容块是有界限和位置的。当你需要设置一个行内元素例如一个连接变成块状元素或者是透明效果，设置hasLayout也是必须的。")]),t._v(" "),e("p",[t._v("5、修复重复字符的bug")]),t._v(" "),e("p",[t._v("复杂的布局会触发一个bug：浮动对象的最后字符会出现在已经清除浮动的元素后面。这里有几种解决的办法，部分是理想的，并且一些测试和出错是必须的。\na、确保浮动元素都使用：display:inline；\nb、最后一个浮动元素使用margin-right:-3px;\nc、在浮动对象最后一个元素后使用一个条件注释。例如<!—>这里输入注释…<![endif]\nd、在容器内的最后使用一个div空标签（它也必须设置90%宽度甚至更小）")]),t._v(" "),e("p",[t._v("6、使用a标签完成可点击和hover原理")]),t._v(" "),e("p",[t._v("IE6只支持a标签的css定义hover效果\n你可以使用它去控制JavaScript启动的widgets，使得他们仍然保持键盘操作。这里有个二择一的问题，但是a标签是所有解决方案中最可靠的。")]),t._v(" "),e("p",[t._v("7、使用!important，或是高级选择符替代IE特定代码")]),t._v(" "),e("p",[t._v("IE6兼容性问题解决方案七;：使用!important。在外置的css文件里，放弃凭借传统的hacks和条件判断，使用有效的css代码去针对IE6仍然是有可能的。例如：最小高度可以使用一下定义。（在IE6中无法识别！important优先级别标签，所以一般用法为：{margin-top:20px !important; margin-top:0px;}）")]),t._v(" "),e("p",[t._v("#element{  min-height:20em;  height:auto!important;  height:20em;  }")]),t._v(" "),e("p",[t._v("9、早点和经常测试")]),t._v(" "),e("p",[t._v("在你的网站和应用程序完成之前，不要放弃IE6的测试。问题将会更加严重并且需要很长时间去修复。如果你的网站可以运行于firefox和IE6，它将差不多肯定可以在其它浏览器下运行。")]),t._v(" "),e("p",[t._v("10、重构你的代码")]),t._v(" "),e("p",[t._v("IE6兼容性问题解决方案十：重构代码。经常的，修复会比重新考虑布局问题更加花费时间。Html细微的修改和更加简单的css经常是最有效的。这意味着你要放弃完美的合法的代码，但是将会更少的问题出现，并且你知道怎样处理将要出现的情况。")]),t._v(" "),e("p",[t._v("#element[id]{  height:auto;  }")]),t._v(" "),e("p",[t._v("注意事项")]),t._v(" "),e("p",[e("em",[t._v("margin-top:10px; 属性前加“")]),t._v("”,这个只有IE6/IE7才能识别。")]),t._v(" "),e("p",[t._v("例如:")]),t._v(" "),e("p",[t._v("div{    margin-top:10px; *margin-top:0px;}")]),t._v(" "),e("p",[t._v("“*”或“+”或“_” + 属性，这个只有IE6和IE7才支持此种标签。")]),t._v(" "),e("p",[t._v("*margin-top:10px \\9; 属性值的后面加“\\9”,这个只有IE才能识别。以上两种方法结合起来可以区分IE6、IE7、IE8+、非IE内核浏览器。")])])])])])])])])])])])])])}),[],!1,null,null,null);n.default=a.exports}}]);