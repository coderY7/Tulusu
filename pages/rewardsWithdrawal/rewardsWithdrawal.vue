<template>
	<view class="content" style="overflow-y: hidden;height:100VH;box-sizing: border-box;">
		<returnBack :titleColor="'#fff'" :bgc="'transparent'" :title="i18n.RewardsWithdrawal"></returnBack>
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
			<view class="content-item">
				<view class="item-title">
					{{i18n.Redemption}}
				</view>
				<view class="input-box">
					<view class="item-input">
						<view class="USDTinput">
							E
						</view>
						<u--input type="number" :placeholder="i18n.PleaseEnterYourNumber" border="surround"
							v-model="value" @change="change"></u--input>
					</view>
					<view class="change">
						<image class="img" src="@/static/img/rw/3.png" mode=""></image>
					</view>
					<view class="item-input">
						<view class="USDTinput">
							USDT
						</view>
						<u-input disabledColor="#EDEFF3" type="number" :disabled=true border="surround" v-model="value1"
							@change="change1"></u-input>
					</view>
				</view>

			</view>
			<view class="content-item" style="margin-top: 40rpx;">
				<view class="item-title">
					{{i18n.PaymentPassword}}
				</view>
				<view class="input-boxs">
					<CustomizeInput :label="i18n.PaymentPassword" :placeholder="i18n.PaymentPassword"
						v-model="paymentPassword" :password="true">
					</CustomizeInput>
				</view>

			</view>
			<view class="service-box" v-if="value">
				{{i18n.serviceCharge}} : {{serviceChargevalue}} E
			</view>
			<view class="tips">
				{{i18n.dtqrwTips}} {{serviceCharge*100}}% {{i18n.dthrwTips}}
			</view>
			<view class="tips">
				{{i18n.Miniamount}}: {{minimumWithdrawalUsdt}}, {{i18n.duihuatips}}
			</view>
			<view class="login-btn" @click="gochange">
				{{i18n.Continue}}
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
		pointUsdt,
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
				value: null,
				value1: null,
				statusBarHeight: 137,
				language: 'en',
				money: 0,
				changeMoney: 0,
				paymentPassword: '',
				usdtRate: 1,
				serviceCharge: 0, //手续费比例
				serviceChargevalue: '', //手续费
				totalMoney: 0,
				minimumWithdrawalUsdt: '', //最低提币额
        lastSubmissionDate: null, // 用于存储上次提交的日期
			}
		},
		created() {
			uni.getSystemInfo({
				success: (res) => {
					this.statusBarHeight = res.statusBarHeight * (750 / res.windowWidth) + this
						.statusBarHeight;
				}
			});
      // 获取上次提交的日期
      this.lastSubmissionDate = uni.getStorageSync('lastSubmissionDate');
		},
		onLoad(parms) {

		},
		onShow() {
			uni.hideTabBar({
				animation: false
			})
			this.language = uni.getStorageSync('language');
			this.pointCurrent();
			this.commonSetting();

		},
		methods: {
			gochange() {
				if (uni.getStorageSync('walletAddress') == '') {
					this.$refs.uToast.show({
						message: this.i18n.YouUSDTwithdraw

					})
					return;
				}
				this.totalMoney = Number(this.value) + Number(this.serviceChargevalue)
				if (this.value === '') {
					this.$refs.uToast.show({
						message: 'E or USDT'
					})
					return
				}
				if (Number(this.value1) < Number(this.minimumWithdrawalUsdt)) {
					this.$refs.uToast.show({
						message: `${this.i18n.Miniamount}:${this.minimumWithdrawalUsdt}`
					})
					return
				}
				if (this.paymentPassword === '') {
					this.$refs.uToast.show({
						message: this.i18n.PaymentPassword
					})
					return
				}
        if (!this.canSubmit()) {
          this.$refs.uToast.show({ message: 'You can only withdraw money once a day' });
          return;
        }
				const obj = {
					"payPassword": this.paymentPassword,
					"point": this.value,
					"usdt": this.value1,
				}
				uni.showModal({
					title: this.i18n.hint,
					content: `${this.i18n.Recognizedexpense} ${this.totalMoney} E`,
					confirmText: this.i18n.Confirm,
					cancelText: this.i18n.Cancel,
					success: (res) => {
						if (res.confirm) {
							pointUsdt(obj).then((res) => {
								if (res.code === 200) {
                  // 提交成功后，记录提交日期
                  this.recordSubmission();
									this.$refs.uToast.show({
										message: 'OK'
									})
									uni.switchTab({
										url: '/pages/index/Account',
									})
								} else {
									if (res.code === 422) {
										this.$refs.uToast.show({
											message: this.i18n.pawError
										})
									} else {
										this.$refs.uToast.show({
											message: res.message.message
										})
									}

								}
							})
						} else if (res.cancel) {}
					}
				});

			},
			change() {
				//console.log('---------', this.value)
				//this,value必须大于30
				//     if(this.value<30){
				//      this.value=0
				//       this.value1 =0;
				//       return
				//     }
				this.value1 = (this.value * this.usdtRate).toFixed(2);
				//计算扣除手续费
				this.serviceChargevalue = Number(this.value) * Number(this.serviceCharge)
				//保留2位小数
				this.serviceChargevalue = this.serviceChargevalue.toFixed(2)
			},
			change1() {
				//this.value = this.value1 / this.usdtRate;
			},
			pointCurrent() {
				pointCurrent().then((res) => {
					this.money = res.data ? res.data : "0.00";
					this.changeMoney = res.data ? res.data : "0.00";
				})
			},
			commonSetting() {
				commonSetting().then((res) => {
					this.usdtRate = Number(res.data.usdtRate);
					this.serviceCharge = Number(res.data.pointCommission)
					this.minimumWithdrawalUsdt = Number(res.data.minimumWithdrawalUsdt)
				})
			},
      canSubmit() {
        if (!this.lastSubmissionDate) return true; // 如果没有提交过，允许提交
        const today = new Date().toISOString().slice(0, 10);
        return this.lastSubmissionDate !== today; // 判断是否为同一天
      },
      recordSubmission() {
        const today = new Date().toISOString().slice(0, 10);
        uni.setStorageSync('lastSubmissionDate', today); // 保存当前日期
        this.lastSubmissionDate = today; // 更新状态
      },
		}
	}
</script>

<style scoped lang="scss">
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
							margin-top: 12rpx;
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
			}

			.service-box {
				margin-top: 20rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 600;
				font-size: 16px;
				color: #000000;
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
			position: fixed;
			display: flex;
			justify-content: center;
			bottom: 20px;
			width: 90vw;
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