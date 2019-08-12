<template>
	<view>
		<view class="cu-modal" :class="diffUserArea ? 'show' : '' ">
			<view class="cu-dialog">
				<view v-if="idx== '0'">
					<view class="sub-title">
						我要领养
					</view>
					<view>
						<form>
							<view class="cu-form-group margin-top">
								<view class="title">微信号:</view>
								<input placeholder="两字短标题" name="input"></input>
							</view>
							<view class="cu-form-group">
								<view class="title">是否养过宠物:</view>
								<input placeholder="三字标题" name="input"></input>
							</view>
							<view class="cu-form-group">
								<view class="title">养宠年限:</view>
								<input placeholder="统一标题的宽度" name="input"></input>
							</view>
							<view class="cu-form-group">
								<view class="title">所在位置:</view>
								<input placeholder="统一标题的宽度" name="input"></input>
							</view>
							<view class="cu-form-group">
								<view class="title">我有话说:</view>
							</view>
							<view class="cu-form-group" v-if="idx== '0' && diffUserArea">
								<textarea @input="textareaAInput" placeholder="多行文本输入框"></textarea>
							</view>
						</form>
					</view>
				</view>
				
				<view v-else-if="idx== '1'">
					<view class="sub-title">
						我有线索
					</view>
					<view class="cu-form-group" v-if="idx== '1' && diffUserArea">
						<textarea @input="textareaAInput" placeholder="多行文本输入框"></textarea>
					</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub  solid-left" @tap="hideModal">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default{
		props:{
			diffUserArea:{
				type:Boolean,
				default:false
			},
			idx:{
				type:String,
				default:'0'
			}
		},
		data(){
			return{
				
			}
		},
		methods:{
			hideModal(){
				this.$emit("hideModal")
			}
		}
	}
</script>

<style scoped>
	.sub-title{
		padding:20upx;
	}
	.cu-form-group .title{
		flex:1;
	}
	.cu-list.menu-avatar>.cu-item .content{
		left:220upx;
	}
	.rules-scroll{
		box-sizing: border-box;
		height: 268upx;
		border: 1upx solid #E3E3E3;
		line-height: 50upx;
		padding:20upx 30upx;
	}
	.rules-view{
		margin-bottom: 20upx;
		font-size: 26upx;
		color: #666666;
	}
	.rules-view-new{
		font-size: 26upx;
		color: #666666;
	}
	.rule-cb{
		font-size: 26upx;
		padding:20upx 30upx;
		color: #999999;
	}
</style>
