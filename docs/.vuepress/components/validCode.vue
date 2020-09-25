
<!-- 
自定义验证码输入、密码输入使用
 
使用方法：
maxlength：输入最大长度
isPwd：是否是密码模式
@finish：回调函数
 <validcode :maxlength="4" :isPwd="false" @finish="finish"></validcode>
 -->
<template>
	<div class="code-area">
		<div class="flex-box">
			<input
			    :value="val"
				type="number"
				focus="true"
				:maxlength="maxlength"
				class="hide-input"
				@blur="inputBlur"
				@input="getVal"
			/>
			<div v-bind:class="['item', { active: codeIndex == 1 }]">
				<div class="line"></div>
				<div v-if="isPwd && codeArr.length >= 1">
					<div class="dot">.</div>
				</div>
				<div v-else>	{{ codeArr[0] ? codeArr[0] : ''}}</div>
			</div>
			<div v-bind:class="['item', { active: codeIndex == 2 }]">
				<div class="line"></div>
				<div v-if="isPwd && codeArr.length >= 2">
					<div class="dot">.</div>
				</div>
				<div v-else>	{{ codeArr[1] ? codeArr[1] : ''}}</div>
			</div>
			<div v-bind:class="['item', { active: codeIndex == 3 }]">
				<div class="line"></div>
				<div v-if="isPwd && codeArr.length >= 3">
					<div class="dot">.</div>
				</div>
				<div v-else>	{{ codeArr[2] ? codeArr[2] : ''}}</div>
			</div>
			<div v-bind:class="['item', { active: codeIndex == 4 }]">
				<div class="line"></div>
				<div v-if="isPwd && codeArr.length >= 4">
					<div class="dot">.</div>
				</div>
				<div v-else>	{{ codeArr[3] ? codeArr[3] : ''}}</div>
			</div>
			<div v-if="maxlength === 6">				
				<div v-bind:class="['item', { active: codeIndex == 5 }]">
					<div class="line"></div>
					<div v-if="isPwd && codeArr.length >= 5">
						<div class="dot">.</div>
					</div>
					<div v-else>	{{ codeArr[4] ? codeArr[4] : ''}}</div>
				</div>
				<div v-bind:class="['item', { active: codeIndex == 6 }]">
					<div class="line"></div>
					<div v-if="isPwd && codeArr.length >= 6">
						<div class="dot">.</div>
					</div>
					<div v-else>	{{ codeArr[5] ? codeArr[5] : ''}}</div>
				</div>
			</div>
			
			
		</div>
	</div>
</template>

<script>
export default {
	props: {
		//最大长度 值为4或者6
		maxlength: {
			type: Number,
			default: 4
		},
		//是否是密码
		isPwd: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			codeIndex: 1, //下标
			codeArr: [],
			val:'',//输入框的值
		};
	},
	methods: {
		//兼容 方式输入框移动失去聚焦
		inputBlur(){  // 输入框blur事件
		window.scroll(0,0);
		},
		//取值
		getVal(e) {
			let value = '';
			if(e.data == null && this.val.length > 0){
				value  = this.val.substring(0,this.val.length-1)
			}else {
			    value  =!(/^[0-9]+.?[0-9]*$/.test(e.data)) ? this.val :  (this.val + e.data);
				if(e.data == null || e.data == undefined){
					value  =!(/^[0-9]+.?[0-9]*$/.test(e.detail)) ? this.val :  (this.val + e.detail);
				}
			}
			this.val=value;
			let arr = value.split('');
			this.codeIndex = arr.length + 1;
			this.codeArr = arr;
			if (this.codeIndex > Number(this.maxlength)) {
				//输入完成
				this.$emit('finish',this.codeArr.join(''));
			}
		},
		//清除验证码或者密码
		clear(){
			this.codeIndex=1;
			this.codeArr=[];
			this.val="";
		}
	}
};
</script>

<style lang="scss" scoped>
.code-area {
	text-align: center;
	.flex-box {
		display: flex;
		flex-wrap: wrap;
		position: relative;
		justify-content: center;
	}
	.item {
		position: relative;
		flex: 1;
		height: 50px;
		margin-right: 21px;
		font-size: 15px;
		font-weight: bold;
		color: #333333;
		line-height: 50px;
		box-sizing: border-box;
		border-bottom: 1px solid #cccccc;
	}
	.item:last-child {
		margin-right: 0;
	}
	.active {
		border-color: #ff4b4b;
	}
	.active .line {
		display: div;
	}
	.line {
		display: none;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 1px;
		height: 20px;
		background: #ff4b4b;
		animation: twinkling 1s infinite ease;
	}
	.hide-input {
		position: absolute;
		top: 0;
		left: -100%;
		width: 200%;
		height: 100%;
		text-align: left;
		z-index: 9;
		opacity: 0;
	}
	@keyframes twinkling {
		0% {
			opacity: 0.2;
		}
		50% {
			opacity: 0.5;
		}
		100% {
			opacity: 0.2;
		}
	}
	
	.dot{
		font-size: 40px;
		line-height: 20px;
	}
}
</style>