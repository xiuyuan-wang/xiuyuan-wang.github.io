(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{254:function(t,i,e){},278:function(t,i,e){"use strict";e(254)},286:function(t,i,e){"use strict";e.r(i);var s={props:{maxlength:{type:Number,default:4},isPwd:{type:Boolean,default:!1}},data:()=>({codeIndex:1,codeArr:[],val:""}),methods:{inputBlur(){window.scroll(0,0)},getVal(t){let i="";null==t.data&&this.val.length>0?i=this.val.substring(0,this.val.length-1):(i=/^[0-9]+.?[0-9]*$/.test(t.data)?this.val+t.data:this.val,null!=t.data&&null!=t.data||(i=/^[0-9]+.?[0-9]*$/.test(t.detail)?this.val+t.detail:this.val)),this.val=i;let e=i.split("");this.codeIndex=e.length+1,this.codeArr=e,this.codeIndex>Number(this.maxlength)&&this.$emit("finish",this.codeArr.join(""))},clear(){this.codeIndex=1,this.codeArr=[],this.val=""}}},d=(e(278),e(14)),a=Object(d.a)(s,(function(){var t=this,i=t._self._c;return i("div",{staticClass:"code-area"},[i("div",{staticClass:"flex-box"},[i("input",{staticClass:"hide-input",attrs:{type:"number",focus:"true",maxlength:t.maxlength},domProps:{value:t.val},on:{blur:t.inputBlur,input:t.getVal}}),t._v(" "),i("div",{class:["item",{active:1==t.codeIndex}]},[i("div",{staticClass:"line"}),t._v(" "),t.isPwd&&t.codeArr.length>=1?i("div",[i("div",{staticClass:"dot"},[t._v(".")])]):i("div",[t._v("\t"+t._s(t.codeArr[0]?t.codeArr[0]:""))])]),t._v(" "),i("div",{class:["item",{active:2==t.codeIndex}]},[i("div",{staticClass:"line"}),t._v(" "),t.isPwd&&t.codeArr.length>=2?i("div",[i("div",{staticClass:"dot"},[t._v(".")])]):i("div",[t._v("\t"+t._s(t.codeArr[1]?t.codeArr[1]:""))])]),t._v(" "),i("div",{class:["item",{active:3==t.codeIndex}]},[i("div",{staticClass:"line"}),t._v(" "),t.isPwd&&t.codeArr.length>=3?i("div",[i("div",{staticClass:"dot"},[t._v(".")])]):i("div",[t._v("\t"+t._s(t.codeArr[2]?t.codeArr[2]:""))])]),t._v(" "),i("div",{class:["item",{active:4==t.codeIndex}]},[i("div",{staticClass:"line"}),t._v(" "),t.isPwd&&t.codeArr.length>=4?i("div",[i("div",{staticClass:"dot"},[t._v(".")])]):i("div",[t._v("\t"+t._s(t.codeArr[3]?t.codeArr[3]:""))])]),t._v(" "),6===t.maxlength?i("div",[i("div",{class:["item",{active:5==t.codeIndex}]},[i("div",{staticClass:"line"}),t._v(" "),t.isPwd&&t.codeArr.length>=5?i("div",[i("div",{staticClass:"dot"},[t._v(".")])]):i("div",[t._v("\t"+t._s(t.codeArr[4]?t.codeArr[4]:""))])]),t._v(" "),i("div",{class:["item",{active:6==t.codeIndex}]},[i("div",{staticClass:"line"}),t._v(" "),t.isPwd&&t.codeArr.length>=6?i("div",[i("div",{staticClass:"dot"},[t._v(".")])]):i("div",[t._v("\t"+t._s(t.codeArr[5]?t.codeArr[5]:""))])])]):t._e()])])}),[],!1,null,"7fdb8f90",null);i.default=a.exports}}]);