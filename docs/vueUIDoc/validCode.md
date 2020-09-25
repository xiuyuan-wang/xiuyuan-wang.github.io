# 短信验证码、自定验证码

- 预览图
  > <valid-Code ref="code" ></valid-Code>

## 使用教程

#### 1.插件代码拷贝
- 下载后把components目录下validCode.vue文件拷贝到自己项目目录下

#### 2.插件全局配置
- 在项目里main.js中配置如下代码
```js
  import validCode from './components/validCode.vue'
  Vue.component('validCode',validCode)
```

#### 3.插件使用
- vue页面使用

```html
<template>
	<div class="content">
		<div>验证码：</div>
		<valid-code ref="code" :maxlength="4" :isPwd="false" @finish="getCode" ></valid-code>
		<div>密码:</div>
		<valid-code ref="pwd" :maxlength="6" :isPwd="true" @finish="getPwd"></valivalid-codedcode>
		<button type="primary" @tap="clearCode">清空验证码</button>
		<button type="primary" @tap="clearPwd">清空密码</button>
	</div>
</template>

<script>
	export default {
		data() {
			return {};
		},
		onLoad() {},
		methods: {
			//获取code码
			getCode(val) {
				console.log(val);
			},
			//获取密码
			getPwd(val) {
				console.log(val);
			},
			// 清空验证码
			clearCode(){
				 this.$refs.code.clear();
			},
			// 清空密码
			clearPwd(){
				 this.$refs.pwd.clear();
			}
		}
	};
</script>

<style>
	.content {
		height: 400upx;
	}
	button{
		margin-top: 30upx;
	}
</style>
```

## 源码

- icon 代码

<<< @/docs/.vuepress/components/validCode.vue
