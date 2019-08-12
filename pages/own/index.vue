<template>
	<view>
		<view class="cu-content">
			<view class="cu-avatar xl round margin-left" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg);"></view>
			
		</view>
		<view class='cu-text'>
			<text>
				小伙子
			</text>
		</view>
		<view>
			 <button type="primary" @tap="getLogin">登录</button>
		</view>
		<view class="nav-list">
			<view class="cu-list menu" >
				<block v-for="(item, index) in menuList" :key="index">
					<view class="cu-item click-bg arrow"  @tap="clickItem(item)">
						<view class="content u-f-a">
							<image :src="item.iconUrl" class="png ownPng" mode="aspectFit"></image>
							<text class="text-grey">{{item.title}}</text>
						</view>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import Api from '@/common/api/index.js';
	export default{
		data(){
			return{
				menuList:[
					{
						title:'我的宠物',
						url:'/pages/etc/my-car/my-car',
						iconUrl:'/static/own/ownpet.png',
					},
					{
						title:'我领养的动物',
						url:'/pages/etc/my-pay-account/my-pay-account',
						iconUrl:'/static/own/getpet.png',
					},
					{
						title:'我丢失的动物',
						url:'/pages/personal/my-order/my-order',
						iconUrl:'/static/own/losepet.png',
					},
					{
						title:'我要曝光',
						url:'',
						iconUrl:'/static/own/baog.png',
					},
					{
						title:'投诉和建议',
						url:'/pages/personal/my-order/my-order',
						iconUrl:'/static/own/tousu.png',
					},
					{
						title:'我的消息',
						url:'',
						iconUrl:'/static/own/message.png',
					}
				],
			}
			
		},
		methods:{
			getLogin(){
				let params={
					phoneNum:'18855440080',
					nickName:'你好',
					encryptedData:'',
					code:'',
					iv:'',
					country:'中国',
					province:'浙江',
					city:'杭州'
				};
				let data = {
					'data': params
				};
				this.$request.post(Api.getSsoLogin.url, data).then((res) => {
					// 这里正常数据返回
					console.log(JSON.stringify(res))
					
				}, (msg)=>{
					console.log('获取用户基本信息'+JSON.stringify(msg))
					this.topLoading = false;
					this.isLoading = false;
				}).catch((err) => {
					this.topLoading = false;
					this.isLoading = false;
				})
			}
		}
	}
</script>

<style>
	.cu-content{
		display: flex;
		align-items: center;
		justify-content: center;
		height:260upx;
	}
	.cu-text{
		text-align: center;
		margin:20upx 0 40upx;
	}
</style>
