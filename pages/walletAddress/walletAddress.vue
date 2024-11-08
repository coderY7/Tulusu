<template>
	<view class="content" style="overflow-y: hidden;height:100VH;box-sizing: border-box;">
		<returnBack :titleColor="'#fff'" :bgc="'transparent'" :title="i18n.WalletAddress"></returnBack>
		<view class="about-title">
			<view class="left">
				<view class="ourH">
					{{changeMoney}}<span style="margin-left: 10rpx;">E</span>
				</view>
				<view class="redDL">
					<span style="margin-right: 10rpx;">$</span>{{ money  }}
				</view>
			</view>
			<view class="right">
				<image class="img" src="@/static/img/rw/1.png" mode=""></image>
			</view>
		</view>
		<view class="about-content">
			<view class="content-item" style="margin-top: 40rpx;">
				<view class="item-title">
					{{i18n.bdWalletAddress}}
				</view>
				<view class="input-boxs">
<!--					<CustomizeInput :label="i18n.WalletAddress" :placeholder="i18n.WalletAddress"-->
<!--						v-model="WalletAddress" >-->
<!--					</CustomizeInput>-->
         <view class="unit-boxs">
          <view class="comunit">{{qbUrl}}</view>
           <view @click="fuzhi()">{{i18n.djfuzhi}}</view>
         </view>

				</view>

			</view>
<!--			<view class="tips">-->
<!--				{{i18n.rwTips}}-->
<!--			</view>-->

      <view class="tips">
        {{i18n.newTips}}
      </view>

			<view class="login-btn" @click="gochange" loading>
				{{i18n.Sendbinding}}
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import returnBack from '@/components/returnBack/returnBack.vue';
	import CustomizeInput from '@/components/Input/Input.vue';
	import {
		pointCurrent,
		setWalletAddress,
    commonSetting
	} from '@/api/api.js';
	export default {
		computed: {
			i18n() {
				return this.$t('message')
			}

		},
		components: {
			CustomizeInput,
			returnBack,
		},
		data() {
			return {
        qbUrl:'',
        tzUrl:'',
				value: null,
				value1: null,
				statusBarHeight: 137,
				language: 'en',
				money: 0,
				changeMoney: 0,
				WalletAddress: '',
				loading:false,
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
		onLoad(parms) {

		},
		onShow() {
			uni.hideTabBar({
				animation: false
			})
			this.language = uni.getStorageSync('language');
			this.getWalletAddress();
			this.pointCurrent();
      this.seting()
		},
		methods: {
      seting(){
        commonSetting().then((res)=>{
          console.log('res',res.data.walletAddressEmail)
          this.qbUrl=res.data.walletAddressEmail
          this.tzUrl=res.data.walletAddressUrl

        })
      },
      fuzhi(){
        uni.setClipboardData({
          data: this.qbUrl,
          success:  ()=> {
            uni.hideToast()
            	this.$refs.uToast.show({
            		message: this.i18n.Copysuccess
            	})
          }
        });
      },
			gochange() {
				//this.loading = true;
				// if (this.WalletAddress === '') {
				// 	this.$refs.uToast.show({
				// 		message: this.i18n.WalletAddress
				// 	})
				// 	this.loading = false;
				// 	return
				// }
				// const obj = {
				// 	"walletAddress": this.WalletAddress,
        //
				// }
				// setWalletAddress(obj).then((res) => {
				// 	if (res.code === 200) {
				// 		uni.setStorageSync("walletAddress", this.WalletAddress);
				// 		this.$refs.uToast.show({
				// 			message: 'OK'
				// 		})
				// 		uni.switchTab({
				// 			url: '/pages/index/Account',
				// 		})
				// 		this.loading = false;
				// 	} else {
				// 		this.loading = false;
				// 	}
				// })

        // #ifdef H5
        window.location.href=this.tzUrl
        // #endif

        // #ifdef APP-PLUS
        plus.runtime.openURL(this.tzUrl)
        // #endif

			},
			pointCurrent() {
				pointCurrent().then((res) => {
					this.money = res.data ? res.data : "0.00";
					this.changeMoney = res.data ? res.data : "0.00";
				})
			},
			getWalletAddress() {
				this.WalletAddress = uni.getStorageSync('walletAddress');
			},
		}
	}
</script>

<style scoped  lang="scss">
	.content {
		height: 100VH;
		background: url(@/static/img/rw/2.png) no-repeat;
		background-size: 100% 563rpx;

		.about-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 230rpx;
			padding-left: 30rpx;

			.left {

				.ourH {
					font-family: PingFangSC, PingFang SC;
					font-weight: 600;
					font-size: 70rpx;
					color: #FFFFFF;
				}

				.redDL {
					font-family: PingFangSC, PingFang SC;
					font-weight: 600;
					font-size: 40rpx;
					color: #FFFFFF;
				}
			}

			.right {
				margin-right: 15rpx;

				.img {
					width: 202rpx;
					height: 202rpx;
				}
			}
		}

		.about-content {
			margin-top: 40rpx;
			width: 100%;
			background-color: #fff;
			padding: 30rpx;
			box-sizing: border-box;
			border-radius: 40rpx;
			height: 100VH;

			.content-item {
				.item-title {
					font-family: PingFangSC, PingFang SC;
					font-weight: 600;
					font-size: 32rpx;
					color: #000000;
				}

				.input-box {
					margin-top: 30rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.item-input {
						width: 310rpx;

						display: flex;
						text-align: center;
						background-color: #EDEFF3;
						border-radius: 34rpx;
						height: 120rpx;
						padding: 30rpx;
						box-sizing: border-box;

						.USDTinput {
							font-family: PingFangSC, PingFang SC;
							font-weight: 600;
							font-size: 32rpx;
							color: #000000;
							margin-top: 8rpx;
						}
					}

					.change {
						.img {
							width: 42rpx;
							height: 32rpx;
						}
					}
				}

				.input-boxs {
					margin-top: 30rpx;
				}
        .unit-boxs {
          width: 100%;
          display: flex;
          justify-content: space-between;
          white-space: nowrap; // 防止换行
          overflow: hidden; // 隐藏超出部分
          text-overflow: ellipsis; // 显示省略号
          .comunit {
            overflow: hidden; // 确保也隐藏超出部分
            text-overflow: ellipsis; // 显示省略号
            white-space: nowrap; // 防止换行
            max-width: 70%; // 设置最大宽度，根据需求调整
          }
        }
			}

			.tips {
				margin-top: 20rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				font-size: 24rpx;
				color: rgba(0, 0, 0, .5);
				line-height: 33rpx;
			}
		}

		.login-btn {
			margin-top: 110rpx;
			width: 100%;
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
	}
</style>