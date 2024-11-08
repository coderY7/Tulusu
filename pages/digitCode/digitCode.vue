<template>
	<view class="login"  :style="'padding-top:' + statusBarHeight +'rpx'">
		<returnBack></returnBack>
		<view class="logo">
			<image class="img" src="@/static/img/login/newlogo.png" alt="" />
		</view>
		<view class="logoText">
			{{i18n.DigitCode}}
		</view>
		<view class="logoTips">
			{{i18n.CheckEmail}}
		</view>
		<view class="user-box">
			<view class="dicode-box">
				<u-code-input borderColor="#EDEFF3" size="120rpx" space="40rpx" :maxlength="4"
					v-model="diCode"></u-code-input>
			</view>
			<view :class="diCode.length === 4?'login-btn':'dsabLogin-btn'" @click="gochange">
				{{i18n.Continue}}
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import returnBack from '@/components/returnBack/returnBack.vue'
	import {
		checkCode,
    checkregCode
	} from '@/api/api.js';
	export default {
		computed: {
			i18n() {
				return this.$t('message')
			}

		},
		components: {
			returnBack
		},
		data() {
			return {
				diCode: "",
				email:"",
				user: {
					userPassword: "",
					userNewPassword: "",
				},
				pswdShow: false,
				NpswdShow: false,
				pswtype: 'password',
				pswtypeN: 'password',
				statusBarHeight:137,
				pay:false,
        register:false
			}
		},
		created() {
			uni.getSystemInfo({
				success: (res) => {
					this.statusBarHeight = res.statusBarHeight * (750 / res.windowWidth) + this.statusBarHeight;
				}
			});
		},
		onLoad(parms) {
			this.email = parms.code
			if(parms.titleCode === '1') {
				this.pay = true
			}
      if(parms.type == 'register'){
        this.register=true
      }
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
			gochange() {
				if (this.diCode.length !== 4) {
					return
				}
				uni.showLoading({
					title: 'loading...',
				});
				const obj = {
					"code": this.diCode,
					"email": this.email,
				}
        if(this.register){
          checkregCode(obj).then((res) => {
            uni.hideLoading();
               if(res.code==200){
                 uni.setStorageSync("regcode",this.diCode);
                 uni.navigateBack({
                   delta: 1
                 });
               }else {
             this.$refs.uToast.show({
            message: res.message.message
          })
               }
          })
          return
        }
				checkCode(obj).then((res) => {
					uni.hideLoading();
					if (res.code === 200) {
						this.$refs.uToast.show({
							message: this.i18n.VerificationSuccessful
						})
						setTimeout(() => {
							if (this.pay) {
								this.$u.route('pages/changePsw/changePsw', {
								"code": this.diCode,
								"email": this.email,
								"titleCode":'1',
								});
							}else {
								this.$u.route('pages/changePsw/changePsw', {
								"code": this.diCode,
								"email": this.email,
								});
							}
						}, 1000);
					}else {
            this.$refs.uToast.show({
              message: res.message.message
            })
          }
				})

			},
		}
	}
</script>

<style scoped  lang="scss">
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
			margin-top: 18rpx;
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
		.dsabLogin-btn {
			margin-top: 110rpx;
			width: 100%;
			height: 104rpx;
			border-radius: 52rpx;
			text-align: center;
			line-height: 104rpx;
			font-size: 32rpx;
			color: #FFFFFF;
			font-weight: 600;
			background: #C5D9F7;
		}
	}

	/deep/.u-code-input__item {
		background-color: #EDEFF3;
		border-radius: 34rpx;
	}
</style>