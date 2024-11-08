<template>
	<view class="content" style="overflow-y: hidden;height:100VH;box-sizing: border-box;">

		<returnBack :title="i18n.ChangeAvatar"  :bgc="'transparent'">
		</returnBack>

		<view class="avatar-box">
			<view class="avatar-item" v-for="(item,index) in avatar" :key="item.id" @click="isActiveHead = item.value">
				<image class="avatar" :src="item.url" mode=""></image>
				<image class="active" v-show="isActiveHead === item.value" src="@/static/img/changeHead/isActv.png" mode=""></image>
			</view>
		</view>
		<view class="login-btn" @click="submit" loading>
			{{i18n.Continue}}
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import returnBack from '@/components/returnBack/returnBack.vue';
	import {
		setUserInfo,
	} from '@/api/api.js';
	import {
		forEach
	} from 'neo-async';
	export default {
		components: {
			returnBack,
		},
		computed: {
			i18n() {
				return this.$t('message')
			}

		},
		data() {
			return {
				language: 'en',
				isActiveHead:'man',
				avatar: [
					{id:0,url:require("@/static/img/changeHead/man2.png"),value:'man2',},
					{id:1,url:require("@/static/img/changeHead/wm2.png"),value:'wm2',},
					{id:2,url:require("@/static/img/changeHead/man3.png"),value:'man3',},
					{id:3,url:require("@/static/img/changeHead/wm3.png"),value:'wm3',},
					{id:4,url:require("@/static/img/changeHead/wm1.png"),value:'wm1',},
					{id:5,url:require("@/static/img/changeHead/man.png"),value:'man',}
				],
			}
		},
		created() {
			uni.getSystemInfo({
				success: (res) => {
					this.statusBarHeight = res.statusBarHeight * (750 / res.windowWidth) + this
						.statusBarHeight;
				}
			});
		},
		onLoad() {},
		onShow() {
			uni.hideTabBar({
				animation: false
			})
			if(uni.getStorageSync('Avatar')) {
				this.isActiveHead = uni.getStorageSync('Avatar');
			}
			console.log(this.isActiveHead)
			this.language = uni.getStorageSync('language');
		},
		methods: {
			submit() {
				this.loading = true;
				const obj = {
					 "avatar": this.isActiveHead,
				}
				setUserInfo(obj).then((res)=>{
					if (res.code === 200) {
						this.$refs.uToast.show({
							message: 'OK'
						})
					}
				})
			}
		},
	}
</script>

<style scoped  lang="scss">
	.content {

	}
	.avatar-box{
		margin: 0 auto;
		margin-top: 180rpx;
		display: flex;
		flex-wrap: wrap;
		box-sizing: border-box;
		padding: 30rpx 40rpx;
		background-color: #fff !important;
		width: 92%;
		box-shadow: 0rpx 12rpx 24rpx 0rpx rgba(0,0,0,0.02);
		border-radius: 30rpx;
		.avatar-item {
			margin-right: 30rpx;
			margin-bottom: 50rpx;
			.avatar {
				width: 130rpx;
				height: 130rpx;
			}
			.active {
				width: 40rpx;
				height: 40rpx;
				margin-left: -40rpx;
			}
		}
		.avatar-item:nth-child(4) {
			margin-right: 0;
		}
		.avatar-item:nth-child(5) {
			margin-bottom: 0rpx;
		}
		.avatar-item:nth-child(6) {
			margin-bottom: 0rpx;
		}
	}
	
	.login-btn {
		margin: 0 auto;
		margin-top: 110rpx;
		width: 92%;
		height: 104rpx;
		background: #336AE2;
		box-shadow: 0rpx 16rpx 24rpx 0rpx rgba(51, 106, 226, 0.32);
		border-radius: 52rpx;
		text-align: center;
		line-height: 104rpx;
		font-size: 32rpx;
		color: #FFFFFF;
		font-weight: 600;
	}
</style>