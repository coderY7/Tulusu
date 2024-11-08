<template>
	<view class="container">
		<!-- 顶部导航 -->
		<returnBack :title="i18n.Selectaddress" :bgc="'#f7f7f7'"></returnBack>

		<view style="width: 100%;height: 120rpx;">

		</view>

		<!-- 地址列表 -->
		<scroll-view class="address-list" scroll-y="true" @scrolltolower="loadMoreAddresses" v-if="addresses.length>0">
			<view :style="crutIndex === index ? 'border: 1px solid #336ae2;':''" class="address-item"
				v-for="(address, index) in addresses" :key="index" @click="selectAddress(index)">
				<view class="address-info">
					<view class="address-name">{{ address.name }}</view>
					<view class="address-details">{{ address.address }}</view>
				</view>
				<view class="address-actions">
					<button class="edit-button" @click.stop="editAddress(address)">{{i18n.edit}}</button>
					<button class="delete-button" @click.stop="deleteAddress(address)">{{i18n.delete}}</button>
				</view>
			</view>
		</scroll-view>
		<u-modal v-if="show" width="400rpx" @confirm="confirm" @cancel="cancel" showCancelButton :show="show"
			:content='i18n.deleteaddress' :confirmText='i18n.Confirm' :cancelText='i18n.Cancel'></u-modal>
		<view class="empt" v-if="addresses.length === 0 ">
			<image style="width: 430rpx;height: 322rpx;" src="@/static/img/index/empt.png" mode=""></image>
		</view>
		<!-- 新增地址按钮 -->
		<view class="add-address-section">
			<button :style="crutIndex !== null?'':'width:600rpx'" class="add-address-button" @click="addAddress">{{ i18n.AddAddress }}</button>
			<button v-if="crutIndex !== null" class="add-address-buttons" @click="goGoodsInfo">{{ i18n.Selectaddress }}</button>
		</view>

	</view>
</template>

<script>
	import {
		userAddress,
		userDelAddress,
	} from '@/api/api.js';
	export default {
		computed: {
			i18n() {
				return this.$t('message')
			}

		},
		data() {
			return {
				show: false,
				addresses: [
					// { name: '张三', details: '北京市海淀区中关村' },
					// { name: '李四', details: '上海市浦东新区陆家嘴' },
					// 初始化更多地址
				],
				crutIndex: null,
				id: '',
			};
		},
		
		onShow() {
			this.getAddress();
		},
		methods: {
			cancel() {
				this.show = false;
			},
			confirm() {
				this.show = false;
				uni.showLoading({
					title: 'loading...',
				});
				const obj = {
					"id": this.id,
				}
				
				userDelAddress(obj).then((res) => {
					uni.hideLoading();
					if (res.code === 200) {
						this.getAddress();
            if(uni.getStorageSync("addresses")){
              if(this.id==JSON.parse(uni.getStorageSync("addresses")).id){
                uni.removeStorageSync('addresses');
              }
            }
					}
				})
			},
			getAddress() {
				uni.showLoading({
					title: 'loading...',
				});
				const obj = {
					"keyword": "",
					"page": 1,
					"size": 25,
				}
				userAddress(obj).then((res) => {
					uni.hideLoading();
					this.addresses = res.data.records
				})
			},
			selectAddress(index) {
				this.crutIndex = index;
				// 这里可以添加选择地址后的逻辑
			},
			editAddress(item) {
				this.$u.route('pages/editaddress/editaddress', {
					"item": JSON.stringify(item),
				});
				// 这里可以添加编辑地址的逻辑
			},
			deleteAddress(item) {
				this.show = true;
				this.id = item.id;
			},
			addAddress() {
				this.$u.route('pages/editaddress/editaddress');
				// 这里可以添加新增地址的逻辑
			},
			goGoodsInfo() {
				uni.setStorageSync("addresses", JSON.stringify(this.addresses[this.crutIndex]));
				uni.navigateBack();
				// this.$u.route('pages/goodsInfo/goodsInfo',{'item':JSON.stringify(this.addresses[this.crutIndex])});
			},
		
		},
	};
</script>

<style scoped>
	.container {
		display: flex;
		flex-direction: column;
		height: 100vh;
		background-color: #f5f5f5;
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

	.address-list {
		flex: 1;
		padding: 20rpx;
		overflow-y: auto;
		box-sizing: border-box;
	}

	.address-item {
		background-color: #fff;
		padding: 20rpx;
		margin-bottom: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 10rpx;
	}
	.address-item:nth-child(0) {
		margin-top: 40rpx;
	}
	.address-info {
		max-width: 64%;
	}

	.address-name {
		font-size: 36rpx;
		color: #333;
	}

	.empt {
		margin-top: 78rpx;
		text-align: center;
		flex: 1;
		padding: 20rpx;
		overflow-y: auto;
		box-sizing: border-box;
	}

	.address-details {
		font-size: 28rpx;
		color: #666;
		margin-top: 10rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		/* 不允许换行，超出部分显示省略号 */
	}

	.address-actions {
		display: flex;
		align-items: center;
	}

	.edit-button,
	.delete-button {
		margin-left: 20rpx;
		padding: 10rpx 20rpx;
		font-size: 28rpx;
		border: none;
		border-radius: 5rpx;
		color: #fff;
	}

	.edit-button {
		background-color: #336ae2;
		/* 深蓝色 */
	}

	.delete-button {
		background-color: #ff4c00;
	}

	.add-address-section {
		padding: 40rpx;
		text-align: center;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
	}

	.add-address-button {
		padding: 20rpx 40rpx;
		width: 300rpx;
		background-color: #336ae2;
		/* 深蓝色 */
		color: #fff;
		border: none;
		border-radius: 10rpx;
		font-size: 32rpx;
	}
	.add-address-buttons{
		padding: 20rpx 40rpx;
		width: 300rpx;
		background-color: #ff4c00;
		/* 深蓝色 */
		color: #fff;
		border: none;
		border-radius: 10rpx;
		font-size: 32rpx;
	}
</style>