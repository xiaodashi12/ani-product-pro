
<template>
	<view>
		<view class="page-body">
			<view class="page-section page-section-gap">
				<map style="width: 100%; height:100%;position: absolute;" :latitude="latitude" :longitude="longitude" scale="16" :markers=markers
						show-location="true" @markertap=markertap>
				</map>
			</view>
		</view>
	</view>
</template>

<script>
	import amap from '@/common/api/amap-wx.js'
export default{
		data(){
			return{
				amapPlugin:null,
				key:'fe280a21f9f696c9c5fa1eec9eab94b9',
				markers: [{}, {}, {}],
				poisdatas: [{}, {}, {}],
				title: 'map',
				latitude:'',
				longitude: ''
			}
		},
		 onLoad() {
			 uni.getLocation({
				type: 'wgs84',
				success:(res)=> {
					this.longitude=res.longitude;
					this.latitude=res.latitude;
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);
				}
			});
			var that = this;
			var amapFile = require('@/common/api/amap-wx.js');
			var amapPlugin = new amapFile.AMapWX({
				key: "fe280a21f9f696c9c5fa1eec9eab94b9"
			});
        amapPlugin.getPoiAround({
			success: function(data) {
				//成功回调
				that.markers = data.markers;
				that.poisdatas=data.poisData;
				console.log("data数据"+ JSON.stringify(data));
				var markers_new = [];
				that.markers.forEach((item, index)=>{
					
					markers_new.push({
						id: item.id,              //marker 序号
						width: item.width,        //marker 宽度
						height: item.height,      //marker 高度
						iconPath: item.iconPath,  //marker 图标路径
						latitude: item.latitude,  //marker  纬度
						longitude: item.longitude, //marker 经度
			        	//自定义标记点上方的气泡窗口
						callout:{
							padding:2,        //callout 文本边缘留白
							fontSize:15,      //callout  文字大小
							bgColor:'blue',   //callout 背景颜色
							color:'#6B8E23',  //callout 文字颜色
							borderRadius:5,   //边框圆角
							display:'BYCLICK',//callout 'BYCLICK':点击显示; 'ALWAYS':常显
							content:that.poisdatas[index].name //地理位置名称
						}
					})
				})
				that.markers = markers_new;
				
			},
			fail: function(info) {
			//失败回调
				console.log("info", info)
			}
        })
     },
     methods: {
       //得到点击的marker的id，遍历markers数组，判断有没有相等的id
       //如果有的就能从this.poisdatas[i].address得到坐标位置（没有就提醒下）
        markertap: function(e) {
			for (var i = 0; i < this.markers.length; i++) {
				if (JSON.stringify(e).substring(18, 20) == this.markers[i].id) {
					console.log("markers" + this.poisdatas[i].name+"   "+this.poisdatas[i].address);
					uni.showToast({
						title: this.poisdatas[i].name,
						mask: false,
						duration: 1500
					});
				}
			}
 
        }
    }
}
</script>

<style>
</style>
