<template>
	<view>
		<view class="cu-content">
			<view class="cu-avatar xl round margin-left" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg);"></view>
			<button type="primary" open-type="getUserInfo" @tap="getUserInfo" withCredentials="true">微信登录</button>
			<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取电话号码</button>
		</view>
		<view class='cu-text'>
			<text>
				小伙子
			</text>
		</view>
		<view> 
			 <button type="primary" @tap="getSessionKey">登录</button>
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
				uniCode:'',
				globalData:{},
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
		onLoad: function() {
			uni.login({
				success: function(res) {
					// 获取code
					// console.log(JSON.stringify(res));
				}
			});
		},
		methods:{
			getLogin(){
				let params={
					phoneNum:'',
					nickName:this.globalData.userInfo.nickName,
					encryptedData:this.globalData.encryptedData,
					code:this.globalData.signature,
					iv:this.globalData.iv,
					country:this.globalData.userInfo.country,
					province:this.globalData.userInfo.province,
					city:this.globalData.userInfo.city,
					sessionKey:this.uniCode
				};
				let data = {
					'data': params
				};
				this.$request.post(Api.getSsoLogin.url, data).then((res) => {
					// 这里正常数据返回
					debugger
					console.log(JSON.stringify(res))
					
				}, (msg)=>{
					console.log('获取用户基本信息'+JSON.stringify(msg))
					this.topLoading = false;
					this.isLoading = false;
				}).catch((err) => {
					this.topLoading = false;
					this.isLoading = false;
				})
			},
			getPhoneNumber: function(e) {
				console.log(e);
				if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
			 
				} else {
			 
				}
			 
				// 				console.log(JSON.stringify(e.encryptedData));
				// 				console.log(JSON.stringify(e.iv));
			},
			getUserInfo: function(loginType, cb) {
				var that = this
				if (this.globalData.userInfo) {
					typeof cb == "function" && cb(this.globalData.userInfo, true);
				} else {
					//1.调用登录接口
					wx.login({
						success: (res)=> {
							this.uniCode=res.code;
							debugger
							 this.getDataInfo();
						}
					})
				}
			},
			getSessionKey(){
				this.getDataInfo()
				let params={
					code:this.uniCode
				};
				let data = {
					'data': params
				};
				debugger
				this.$request.post(Api.getSessionKey.url, data).then((res) => {
					// 这里正常数据返回
					debugger
					this.uniCode=res.data;
					this.getLogin()
				}, (msg)=>{
					console.log('获取用户基本信息'+JSON.stringify(msg))
					this.topLoading = false;
					this.isLoading = false;
				}).catch((err) => {
					this.topLoading = false;
					this.isLoading = false;
				})
			},
			getDataInfo(){
				wx.getUserInfo({
					success: (res)=> {
						debugger
						this.globalData = res;
						typeof cb == "function" && cb(this.globalData.userInfo, true);
					},
					fail: function() {
						//2.第一次登陆不强制授权，直接返回
						if (loginType == 0) {
							typeof cb == "function" && cb(that.globalData.userInfo, false);
						} else {
							//3.授权友好提示
							wx.showModal({
								title: '提示',
								content: "您还未授权登陆，部分功能将不能使用，是否重新授权？",
								showCancel: true,
								cancelText: "否",
								confirmText: "是",
								success: function(res) {
									//4.确认授权调用wx.openSetting
									if (res.confirm) {
										if (wx.openSetting) { //当前微信的版本 ，是否支持openSetting
											wx.openSetting({
												success: (res) => {
													if (res.authSetting["scope.userInfo"]) { //如果用户重新同意了授权登录
														wx.getUserInfo({
															success: function(res) {
																that.globalData.userInfo = res.userInfo;
																typeof cb == "function" && cb(that.globalData.userInfo, true);
															}
														})
													} else { //用户还是拒绝
														typeof cb == "function" && cb(that.globalData.userInfo, false);
													}
												},
												fail: function() { //调用失败，授权登录不成功
													typeof cb == "function" && cb(that.globalData.userInfo, false);
												}
											})
										} else {
											typeof cb == "function" && cb(that.globalData.userInfo, false);
										}
									} else {
										typeof cb == "function" && cb(that.globalData.userInfo, false);
									}
								}
							})
						}
					}
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
