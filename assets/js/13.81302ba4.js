(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{320:function(t,i,n){"use strict";n.r(i);var e=n(14),a=Object(e.a)({},(function(){var t=this,i=t._self._c;return i("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[i("p",[t._v("image的加载事件(onload)和加载状态(complete)\n")]),t._v(" "),i("p",[i("img",{attrs:{src:"1.png",alt:"github"}})]),t._v(" "),i("p",[t._v("之前做过这样一个需求，要让商家页的商家图片按照图片外面box的大小等比例缩放。之前的想法是在页面中先输出图片的src，然后在页面底部初始化js，然后在js中写相应的可以使图片按照box的大小等比例缩放的函数。要实现图片的等比例缩放要做到以下几点，")]),t._v(" "),i("p",[t._v("第一，得到图片的width和height\n第二，比较图片的width和height与box的width的height的大小，共有四种情况，")]),t._v(" "),i("div",{staticClass:"language- extra-class"},[i("pre",[i("code",[t._v("# 如果图片的width和height均小于box的width和height，那么直接让图片上下左右居中即可，\n# 如果图片的width大于box的width，height小于box的height,让图片按照宽度等比例缩放，然后垂直居中，\n# 如果图片的height大于box的height,width小于box的width,让图片按照高度等比例缩放，然后左右居中，\n# 如果图片的width和height均大于box的width和height,那么分别计算图片的widht和height和box的width和height的比，用较小的值作为缩放的比例，然后上下左右居中即可。\n")])])]),i("p",[t._v("第三，将得到的图片放入对应的img节点中即可")]),t._v(" "),i("p",[t._v("第二步和第三步都比较好实现，几个if..else循环即可搞定，但是对于第一步如何获得图片的width和height是个需要解决的关键性问题，之前的想法是在页面中直接输入图片的src，然后再将图片进行等比例缩小，但是这样存在了一个问题，就是无论如何，图片都会先展示出来原来的大小，然后再等比例缩小，这样在体验上非常不好，所以首先考虑到可以先让图片visiblility:hidden,然后在js计算完图片的大小的时候再让图片visibility:visible，这样虽然可以实现效果但是存在一定的限制，因为在页面的代码全部加载完毕后，图片不一定加载完毕，如果是一张较小的图片，那么这种方法可以很幸运的获得原始图片的高度和宽度，但是如果图片非常大，在图片还没有加载完毕，代码即运行结束，这样获得的图片的大小即不是真实的值，所以现在存在的一个问题就是如何在图片完全加载完毕之后再获得图片的真实的高度和宽度。我们这时自然而然的想到了img对象的onload方法，img.onload是当一张图片被加载完成后所触发的事件。下面看一个例子，")]),t._v(" "),i("div",{staticClass:"language- extra-class"},[i("pre",[i("code",[t._v('<input type="button" name="" value="载入图片" onclick="addImg(\'tt.jpg\')" />\n<script type="text/javascript">\n    function addImg(isrc)\n    {\n        var Img = new Image();\n        Img.src = isrc;\n        Img.onload = function ()\n        {\n              document.body.appendChild(Img);\n        }\n    }\n<\/script>\n')])])]),i("p",[t._v("当页面打开后，点击按钮后，会显示tt.jpg，但是如果重复点击会怎样呢？在IE中，除了第一次加载 图片时候显示正常，之后再点击就没有反应了，刷新也一样。FF中，每点击一次加载一张该图片。而这是什么原因呢？是因为在IE中只执行了一次onload或者是缓存的问题吗？先改写一下代码，")]),t._v(" "),i("div",{staticClass:"language- extra-class"},[i("pre",[i("code",[t._v('<input type="button" name="" value="载入图片" onclick="addImg(\'tt.jpg\')" />\n<script type="text/javascript">\n    function addImg(isrc)\n    {\n        var Img = new Image();\n        Img.onload = function ()\n        {\n              document.body.appendChild(Img);\n        }\n        Img.src = isrc;\n    }\n<\/script>\n')])])]),i("p",[t._v("现在再点击图片，就正常了，从此可见不是因为IE没有触发onload事件，而是因为IE中加载缓冲区的速度太快，以至于没有运行到img.onload的时候，图片已经被加载完毕了。因此，可以先告诉浏览器如何处理这张图片，然后再制定这张图片的来源。一般情况下，可以用complete来判断图片是否加载完毕。对于 complete 属性来讲，IE是根据图片是否显示过来判断，就是说当加载的图片显示出来后，complete 属性的值才为true ，否则一直是false ，和以前是否加载过该张图片没有关系，即和缓存没有关系！可以写如下的函数来做到各个浏览器中预加载图片的兼容性。")]),t._v(" "),i("div",{staticClass:"language- extra-class"},[i("pre",[i("code",[t._v("var imgLoad = function (url) {\n    var img = new Image();\n    img.src = url;\n    if (img.complete) {\n        callback(img.width, img.height);\n    } else {\n        img.onload = function () {\n            callback(img.width, img.height);\n            img.onload = null;\n        };\n    };\n};")])])])])}),[],!1,null,null,null);i.default=a.exports}}]);