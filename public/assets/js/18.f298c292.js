(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{467:function(e,r,n){"use strict";n.r(r);var a=n(2),t=Object(a.a)({},(function(){var e=this,r=e.$createElement,n=e._self._c||r;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("p",[e._v("js判断当前浏览类型")]),e._v(" "),n("p",[e._v('var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串\nvar isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器\nvar isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器\nvar isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器\nvar isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器\nvar isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器\nvar isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器')]),e._v(" "),n("p",[e._v("判断是否为IE浏览器，包括IE11(edge不属于IE浏览器)")]),e._v(" "),n("p",[e._v('var isIE = "ActiveXObject" in window')]),e._v(" "),n("p",[e._v('判断ie6-ie9\nif(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE6.0")\n{\nalert("IE 6.0");\n}\nelse if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE7.0")\n{\nalert("IE 7.0");\n}\nelse if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE8.0")\n{\nalert("IE 8.0");\n}\nelse if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE9.0")\n{\nalert("IE 9.0");\n}')])])}),[],!1,null,null,null);r.default=t.exports}}]);