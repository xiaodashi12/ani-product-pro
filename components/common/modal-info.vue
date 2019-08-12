<template>
	<view>
		<view class="cu-modal" :class="diffArea ? 'show' : '' ">
			<view class="cu-dialog">
				<view class="bg-img"  :style="{backgroundImage:'url('+anmUrl+')'}" style="height:160px;margin:20upx 30upx;">
					<view class="cu-bar justify-end text-white">
					</view>
				</view>
				<view>
					<view class="cu-list menu-avatar">	
						<view class='textalign'>
							<text>主人信息</text>
						</view>
						<view class="cu-item ">
							<view class="cu-avatar xl round margin-left" :style="{backgroundImage:'url('+anmUrl+')'}"></view>
							<view class="content">
								<view class="flex"> 
									<view class="text-cut">
										<input value="" placeholder="昵称" />
									</view>
								</view>
								<view class="flex"> 
									<view class="text-cut">
										<input value="" placeholder="所在地"/>
									</view>
								</view>
							</view>
							<view class="action">
								<view class="solid-bottom">
									<view class='cu-taged radius' v-if="idx== '0' ">待领养</view>
									<view class='cu-taged radius' v-else-if="idx== '1' ">待找回</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class='textNeed' v-if="idx== '0' ">
					<template>
						<view class="uni-app-content">
							<scroll-view class="rules-scroll" scroll-y="true">
								<view class="rules-view-new" style="color:#007AFF">领养要求：</view>
								<view class="rules-view-new">根据《中华人民共和国合同法》等有关法律、法规规定,领养动物办理和使用达成如下协议，共同信守。</view>
								<view class="rules-view-new">1：你是个好人：</view>
								<view class="rules-view-new">
										1：你是个好人：
								</view>
								<view class="rules-view-new">
										1：你是个好人：
								</view>
								<view class="rules-view-new">
										1：你是个好人：
									</text>
								</view>
								<view class="rules-view-new">
										1：你是个好人：
								</view>
							</scroll-view>
						</view>
					</template>
					
				</view>
				<view v-if="diffArea && idx== '1'">
					<view class="cu-form-group">
						<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" placeholder="多行文本输入框"></textarea>
					</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub  solid-left" @tap="hideModal"  v-if="idx== '0' ">我知道了</view>
					<view class="action margin-0 flex-sub  solid-left" @tap="hideModal"  v-else-if="idx== '1' ">我有线索</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default{
		props:{
			anmUrl:{
				type:String,
				default:''
			},
			diffArea:{
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
	.cu-list.menu-avatar>.cu-item .action{
		width:auto;
		margin: -130upx 30upx 0 0;
	}
	.textalign{
		text-align: left;
		margin-left:30upx;
	}
	.cu-taged {
		font-size: 24upx;
		vertical-align: middle;
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		font-family: Helvetica Neue, Helvetica, sans-serif;
		white-space: nowrap;
	}
	.solid-bottom{
		width: 80upx;
		height:80upx;
		border-radius:50% ;
		background-color: rgba(165, 214, 63, 1);
		display: flex;
		align-items: center;
		justify-content: center;
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
