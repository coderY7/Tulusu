<template>
	<view class="login" :style="'padding-top:' + statusBarHeight +'rpx'">
		<returnBack></returnBack>
		<view class="logo">
			<image class="img"src="@/static/img/login/newlogo.png" alt="" />
		</view>
		<view class="logoText">
			{{pay?i18n.SendEmailP:i18n.SendEmail}}
		</view>
		<view class="logoTips">
			{{i18n.EnterEmail}}
		</view>
		<view class="user-box">
			<CustomizeInput :email="true" @emailError="emailError" :disabled="disabled"  :label="i18n.Email" :placeholder="i18n.PleaseEnterContent" v-model="email">
			</CustomizeInput>
		</view>
		<view :class="email?'login-btn':'dsabLogin-btn'" @click="goChangePS">
			{{i18n.Continue}}
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import returnBack from '@/components/returnBack/returnBack.vue';
	import CustomizeInput from '@/components/Input/Input.vue';
	import {
		sendCode
	} from '@/api/api.js';
	export default {
		computed: {
			i18n() {
				return this.$t('message')
			}

		},
		components: {
			returnBack,
			CustomizeInput,
		},
		data() {
			return {
				email: "",
				statusBarHeight:137,
				Error: false,
				pay:false,
				disabled:false,
			}
		},
		created() {
			uni.getSystemInfo({
				success: (res) => {
					this.statusBarHeight = res.statusBarHeight * (750 / res.windowWidth) + this.statusBarHeight;
				}
			});
			if(uni.getStorageSync('Email')){
				this.email = uni.getStorageSync('Email'); 
				this.disabled = true;
			}
		},
		onLoad(val) {
			if(val.titleCode === '1') {
				this.pay = true
			}
		},
		methods: {
			emailError(val) {
				this.Error = val;
			},
			goChangePS() {
				if (!this.email) {
					return
				}

				if (this.disabled && this.email !== uni.getStorageSync('Email') ) {
					this.$refs.uToast.show({
						message: this.i18n.changingEmail
					})
					return
				}
				const obj = {
					"email": this.email,
				}
				uni.showLoading({
					title: 'loading...',
				});
				if (this.Error) {
					uni.hideLoading();
					this.$refs.uToast.show({
						message: this.i18n.emailError
					})
				}else {
				sendCode(obj).then((res) => {
					uni.hideLoading();
					if (res.code === 200) {
						this.$refs.uToast.show({
							message: this.i18n.SendSuccess
						})
						setTimeout(() => {
							if (this.pay) {
								this.$u.route('pages/digitCode/digitCode', {
								"code": this.email,
								"titleCode":'1',
								});
							}else {
								this.$u.route('pages/digitCode/digitCode', {
								"code": this.email,
								});
							}
						}, 1000);
            return
					}
          if(res.code === 103){
            this.$refs.uToast.show({
              message: this.i18n.LocalUsernotfound
            })
          }
          else{
            this.$refs.uToast.show({
              message: this.i18n.qiuqouError
            })
          }
				})
				}
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

			.em {
				width: 100%;
				height: 120rpx;
				line-height: 240rpx;
				font-weight: 400;
				font-size: 32rpx;
				color: #000000;
				line-height: 45rpx;
				background-color: #EDEFF3;
				border-radius: 34rpx;
				padding-left: 10rpx;
				box-sizing: border-box;

				.em-text {
					padding-left: 20rpx;
					padding-top: 12rpx;
					box-sizing: border-box;
					font-weight: 400;
					font-size: 24rpx;
					color: rgba(0, 0, 0, .5);
					line-height: 33rpx;
				}

				.em-input {
					height: 45rpx;
					font-weight: 400;
					font-size: 32rpx;
					color: #000000;
					line-height: 45rpx;
					text-align: left;
				}

				.em-inputh {
					height: 90rpx;
					line-height: 90rpx;
				}
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