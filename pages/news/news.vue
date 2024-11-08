<template>
	<view>
		<returnBack :title="title" :bgc="'transparent'"></returnBack>
		<view class="news-banner">
			<image class="img" :src="content.banner" mode="aspectFit"></image>
		</view>
		<view class="title">
			{{content.title}}
		</view>
		<view class="contents">
			{{content.content}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				size: 10,
				title: '',
				content: {},
			}
		},
		onShow() {
			uni.hideTabBar({
				animation: false,
			});
		},
		onLoad(parms) {
			this.content = JSON.parse(parms.content);
			this.title = parms.title
			console.log(this.content)
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.news-banner{
		margin: 0 auto;
		margin-top:140rpx ;
		width: 690rpx;
		height: 400rpx;
		border-radius: 16rpx 16rpx 0 0;
		overflow: hidden;
		.img {
			width: 100%;
			height: 100%;
		}
	}
	.title{
		width: 690rpx;
		margin: 0 auto;
		margin-top: 30rpx;
		text-align: center;
		font-size: 38rpx;
		font-weight: bold;
	}
	.contents {
		width: 690rpx;
		margin: 0 auto;
		margin-top: 30rpx;
		font-size: 28rpx;
		line-height: 40rpx;
	}
</style>