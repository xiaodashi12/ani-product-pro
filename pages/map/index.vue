<template>
	<view>
		<!-- #ifdef APP-PLUS || H5 -->
		<web-view src="/hybrid/html/test.html" @message="getMessage"></web-view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<web-view src="http://192.168.1.100:8080/hybrid/html/TestSVG.html" @message="getMessage"></web-view>
		<!-- #endif -->
		<!--<map :style="{width:systeminfo.screenWidth+'px',height:systeminfo.screenHeight+'px'}" :latitude="latitude" :longitude="longitude" scale="16"></map>-->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'map',
				latitude: 39.909,
				longitude: 116.39742,
				systeminfo: {}
			}
		},
		onLoad() {
			this.getSysteminfo();
			console.log("screenWidth=" + this.systeminfo.screenWidth);
			console.log("screenHeight=" + this.systeminfo.screenHeight);
			this.getLocation();

		},
		methods: {
			getSysteminfo: function() {
				uni.getSystemInfo({
					success: (res) => {
						this.systeminfo = res;
					}
				})
			},
			getLocation:function(){
				uni.getLocation({
					success: (res) => {
						console.log(res);
						this.latitude=res.latitude;
						this.longitude=res.longitude;
						console.log('当前位置的经度：' + this.latitude);
						console.log('当前位置的纬度：' + this.longitude);
					}
				})
			}
		}
	}
</script>

<style>

</style>
