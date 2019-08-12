<template>
	<view>
		<view class="cu-list menu-avatar">		
			<view class="cu-item ">
				<view class="cu-avatar radius lg" :style="{backgroundImage:'url('+anmInfo.anmUrl+')'}"></view>
				<view class="content">
					<view class="flex"> <view class="text-cut">地点：{{anmInfo.address}}</view></view>
					<view class="flex"> <view class="text-cut">时间：{{anmInfo.nowDate}}</view></view>
					<view class="flex" v-if="idx=='2'"> <view class="text-cut">分类：{{anmInfo.nowDate}}</view></view>
					<view class="flex" v-if="idx=='2'"> <view class="text-cut">曝光次数：{{anmInfo.anmkind}}</view></view>
					<view class="flex" v-if="idx!='2'"> <view class="text-cut">品种：{{anmInfo.anmkind}}</view></view>
					<view class="flex"> <view class="text-cut">备注：{{anmInfo.others}}</view></view>
					<view class="flex" v-if="idx!='2'"> <view class="text-cut"></view></view>
				</view>
				<!-- <view class="action">
					<view class="text-grey text-xs">22:20</view>
					<view class="cu-tag round bg-red sm">5</view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			anmInfo:{
				type: Object,
				required: true,
			},
			idx:{
				type: String,
				required: '0',
			}
		},
		data(){
			return{
				
			}
		}
	}
</script>

<style scoped>
	.cu-list.menu-avatar>.cu-item {
		height:240upx !important;
		padding: 0;
	}
	.cu-avatar.lg{
		width: 140rpx;
		height: 140rpx;
	}
	.cu-list.menu-avatar {
		margin:20upx 10upx;
		border-radius: 20upx;
	}
	.cu-list.menu-avatar>.cu-item .content {
		left:200upx;
		width:70%;
	}
</style>
