<template>
	<view class="container">
		<!-- 顶部导航 -->
		<returnBack :title="i18n.editaddress" :bgc="'#fff'"></returnBack>
		<view style="width: 100%;height: 80rpx;">
		</view>
		<view class="form-section">
			<!-- 收货人姓名 -->
			<view class="form-item">
				<text class="form-label">{{i18n.Receiver}}</text>
				<input class="form-input" v-model="address.name" :placeholder="i18n.enterconsignee" />
			</view>

			<!-- 手机号码 -->
			<view class="form-item">
				<text class="form-label">{{i18n.PhoneNumber}}</text>
				<input class="form-input" type="number" v-model="address.phone" :placeholder="i18n.enterPhone" />
			</view>

			<!-- 详细地址 -->
			<view class="form-item">
				<text class="form-label">{{i18n.Address}}</text>
				<textarea class="form-textarea" v-model="address.details" :placeholder="i18n.enteraddress"></textarea>
			</view>

			<!-- 设置默认地址 -->
			<!-- <view class="form-item">
        <text class="form-label">设置默认地址</text>
        <switch v-model="address.isDefault" />
      </view> -->
		</view>

		<!-- 保存按钮 -->
		<view class="button-section">
			<button class="save-button" @click="saveAddress">{{i18n.save}}</button>
		</view>
	</view>
</template>

<script>
	import {
		userAddAddress,
		userAddress,
		userUpdateAddress,
	} from '@/api/api.js';
	export default {
		computed: {
			i18n() {
				return this.$t('message')
			}

		},
		data() {
			return {
				address: {
					name: '',
					phone: '',
					details: '',
				},
				item: {},
			};
		},
		onLoad(parms) {
			if (parms.item) {
				this.item = JSON.parse(parms.item)
				this.init();
			}
		},
		methods: {
			init() {
				this.address.name = this.item.name
				this.address.phone = this.item.phone
				this.address.details = this.item.address
			},
			saveAddress() {
				uni.showLoading({
					title: 'loading...',
				});
				var obj = {
					"address": this.address.details,
					"created": Date.now().toString(),
					"id": "",
					"name": this.address.name,
					"phone": this.address.phone,
					"status": "",
					"userId": uni.getStorageSync('UserID')
				}
				if (this.item.id) {
					obj.id = this.item.id
					obj.status = this.item.status
					userUpdateAddress(obj).then((res) => {
						uni.hideLoading();
						if (res.code === 200) {
							uni.navigateBack();
						}
					})
				} else {
					userAddAddress(obj).then((res) => {
						uni.hideLoading();
						if (res.code === 200) {
							uni.navigateBack();
						}
					})
				}
			},
		},
	};
</script>

<style scoped>
	.container {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	.navbar {
		background-color: #336ae2;
		/* 深蓝色 */
		padding: 40rpx;
		text-align: center;
	}

	.navbar-title {
		color: #fff;
		font-size: 48rpx;
	}

	.form-section {
		padding: 20rpx;
		padding-top: 50rpx;
		background-color: #fff;
		flex: 1;
	}

	.form-item {
		display: flex;
		align-items: center;
		padding: 20rpx 0;
		border-bottom: 1px solid #e0e0e0;
		margin-bottom: 50rpx;
	}

	.form-label {
		width: 150rpx;
		font-size: 32rpx;
		color: #333;
	}

	.form-input {
		flex: 1;
		font-size: 32rpx;
		color: #666;
		padding: 0 20rpx;
	}

	.form-textarea {
		flex: 1;
		font-size: 32rpx;
		color: #666;
		padding: 20rpx;
		border: 1px solid #e0e0e0;
		border-radius: 10rpx;
		height: 200rpx;
		margin-top: 20rpx;
	}

	.button-section {
		padding: 40rpx;
		text-align: center;
		background-color: #fff;
	}

	.save-button {
		padding: 20rpx 40rpx;
		background-color: #336ae2;
		/* 深蓝色 */
		color: #fff;
		border: none;
		border-radius: 10rpx;
		font-size: 32rpx;
	}
</style>