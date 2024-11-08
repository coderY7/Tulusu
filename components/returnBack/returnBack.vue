<template>
	<view class="custom-header" :style="'background-color:'+ bgc+';padding-top:'+statusBarHeight + 'rpx'">
		<view class="left" @click="goBack">
			<uni-icons :color='titleColor' type="back" size="24"></uni-icons>

		</view>
		<view class="center">
			<text class="title" :style="'color:'+ titleColor">{{ title }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			titleColor: {
				default: '#000000',
				type: String,
			},
			bgc: {
				default: '#fff',
				type: String,
			},
		},

		data() {
			return {
				statusBarHeight: 0,
			};
		},
		mounted() {
			uni.getSystemInfo({
				success: (res) => {
					this.statusBarHeight = res.statusBarHeight * (750 / res.windowWidth) + this.statusBarHeight;
				}
			});
		},
		methods: {
			goBack() {
				uni.navigateBack();
			}
		}
	};
</script>

<style scoped  lang="scss">
	.custom-header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rpx 32rpx;
		box-sizing: border-box;
	}

	.left {
		display: flex;
		align-items: center;
		width: 88rpx;
	}

	.icon {
		font-family: 'uniicons';
		font-size: 48rpx;
		color: #333333;
	}

	.center {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.title {
		font-weight: 600;
		font-size: 32rpx;
		font-family: PingFangSC, PingFang SC;
		color: #333333;
	}
</style>