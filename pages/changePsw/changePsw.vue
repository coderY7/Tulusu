<template>
	<view class="login" :style="'padding-top:' + statusBarHeight +'rpx'">
		<returnBack></returnBack>
		<view class="logo">
			<image class="img" src="@/static/img/login/newlogo.png" alt="" />
		</view>
		<view class="logoText">
			{{i18n.NewPassword}}
		</view>
		<view class="logoTips">
			{{i18n.ChangePasswordTips}}
		</view>

<!--    <view class="old-user-box" v-if="oldshow">-->
<!--      <view class="logoTips">{{i18n.oldPassword}}</view>-->
<!--      <CustomizeInput :label="pay ? i18n.oldPaymentPassword : i18n.oldPassword" :placeholder="pay ? i18n.oldPaymentPassword : i18n.oldInputPassword"-->
<!--                      v-model="user.olduserPassword" :password="true">-->
<!--      </CustomizeInput>-->
<!--    </view>-->


		<view class="user-box">
<!--      <view class="logoTips">{{i18n.NewPassword}}</view>-->
			<CustomizeInput :label="pay ? i18n.PaymentPassword : i18n.Password" :placeholder="pay ? i18n.PaymentPassword : i18n.InputPassword"
				v-model="user.userPassword" :password="true">
			</CustomizeInput>
			<CustomizeInput style="margin-top: 30rpx;" :label="pay ? i18n.ConfirmPaymentPassword : i18n.Password" :placeholder="pay ? i18n.ConfirmPaymentPassword : i18n.ReInputPassword"
				v-model="user.userNewPassword" :password="true">
			</CustomizeInput>
			<view class="login-btn" @click="goHome">
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
		resetPassword,
		restPayPasw,
	} from '@/api/api.js';
	export default {
		computed: {
			i18n() {
				return this.$t('message')
			}

		},
		components: {
			returnBack,
			CustomizeInput
		},
		data() {
			return {
        oldshow:true,
				diCode: "",
				user: {
					userPassword: "",
					userNewPassword: "",
					code: "",
					email: "",
          olduserPassword:''
				},
				pswdShow: false,
				NpswdShow: false,
				pswtype: 'password',
				pswtypeN: 'password',
				statusBarHeight: 137,
				pay: false,
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
			this.user.code = parms.code
			this.user.email = parms.email
			if (parms.titleCode === '1') {
				this.pay = true
			}
      this.oldshow=uni.getStorageSync('oldshow');
		},
		methods: {
			changepswdShow() {
				this.pswdShow = !this.pswdShow
				if (this.pswdShow) {
					this.pswtype = "text"
				} else {

					this.pswtype = "password"
				}
			},
			changeNpswdShow() {
				this.NpswdShow = !this.NpswdShow
				if (this.NpswdShow) {
					this.pswtypeN = "text"
				} else {

					this.pswtypeN = "password"
				}
			},
			goLogin() {
				uni.reLaunch({
					url: '/pages/index/index',
				})
			},
			goHome() {
        // if(this.oldshow){
        //   if (this.user.olduserPassword === '') {
        //     this.$refs.uToast.show({
        //       message: this.i18n.oldPassword
        //     })
        //     return
        //   }
        //   if (this.user.userPassword === '') {
        //     this.$refs.uToast.show({
        //       message: this.i18n.Password
        //     })
        //     return
        //   }
        //   if (this.user.userNewPassword === '') {
        //     this.$refs.uToast.show({
        //       message: this.i18n.Password
        //     })
        //     return
        //   }
        //   if (this.user.userPassword !== this.user.userNewPassword) {
        //     this.$refs.uToast.show({
        //       message: this.i18n.WrongPassword
        //     })
        //     return
        //   }
        //   if (this.user.olduserPassword == this.user.userNewPassword) {
        //     this.$refs.uToast.show({
        //       message: this.i18n.oldnewPassword
        //     })
        //     return
        //   }
        // }else {
          if (this.user.userPassword === '') {
            this.$refs.uToast.show({
              message: this.i18n.Password
            })
            return
          }
          if (this.user.userNewPassword === '') {
            this.$refs.uToast.show({
              message: this.i18n.Password
            })
            return
          }
          if (this.user.userPassword !== this.user.userNewPassword) {
            this.$refs.uToast.show({
              message: this.i18n.WrongPassword
            })
            return
          }
        //}


				uni.showLoading({
					title: 'loading...',
				});
				const obj = {
					"code": this.user.code,
					"email": this.user.email,
          "oldPassword":this.user.olduserPassword,
					"password": this.user.userPassword
				}
				uni.hideLoading();
				if(this.pay) {
					restPayPasw(obj).then((res) => {
					if (res.code === 200) {
						uni.reLaunch({
						  url: '/pages/index/Account'
						});
						this.$refs.uToast.show({
							message: 'OK',
						})
					}else {
            this.$refs.uToast.show({
              message: this.i18n.xinxiError
            })
          }
				})
				} else {
					resetPassword(obj).then((res) => {
						if (res.code === 200) {
							uni.reLaunch({
							  url: '/pages/login/login'
							});
							this.$refs.uToast.show({
								message: 'OK',
							})
						}else {
              this.$refs.uToast.show({
                message: this.i18n.xinxiError
              })
            }
					})
				}
				
			},
		}
	}
</script>

<style scoped lang="scss">
	.login {
		height: 100VH;
		padding: 0 30rpx;

		.logo {
			width: 100rpx;
			height: 92rpx;
			margin-top: 47rpx;

			.img {
				width: 100%;
				height: 100%;
			}
		}

		.logoText {
			margin-top: 34rpx;
			width: 324rpx;
			height: 62rpx;
			font-weight: 600;
			font-size: 44rpx;
			color: #000000;
			text-align: left;
		}

		.logoTips {
			margin: 18rpx 0;
			font-weight: 400;
			font-size: 28rpx;
			color: rgba(0, 0, 0, .5);
		}

		.user-box {
			width: 100%;
			margin: 0 auto;
			margin-top: 70rpx;

			.dicode-box {
				width: 100%;
				padding-left: 40rpx;
				box-sizing: border-box;
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

	/deep/.u-code-input__item {
		background-color: #EDEFF3;
		border-radius: 34rpx;
	}
</style>