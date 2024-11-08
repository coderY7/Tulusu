<template>
	<view class="login">
		<view style="height: 146rpx;"></view>

    <view style="width: 96%;
    display: flex;
    flex-direction: row-reverse;
    margin-right: 20px;">
      <view @click="changeLanguage" style="display:flex;flex-direction:row-reverse;width: 40px;height: 40px;filter:brightness(0.5)">
        <image style="width: 100%;height: 100%" src="@/static/img/index/bz7.png"></image>
      </view>
    </view>

		<view class="logo">
<!--			<image class="img" src="@/static/img/login/login.png" alt="" />-->
      <image class="img" src="@/static/img/login/newlogo.png" alt="" />

		</view>
		<view class="logoText">
<!--			<image class="img" src="@/static/img/login/SurveySphere.png" alt="" />-->
      <image class="img" src="@/static/img/login/knowworld.png" alt="" />

		</view>
		<view class="user-box">
			<CustomizeInput :email="true" @emailError="emailError" :label="i18n.Email"
				:placeholder="i18n.PleaseEnterContent" v-model="user.userName" >
			</CustomizeInput>
			<CustomizeInput style="margin-top: 40rpx;" :label="i18n.Password" :placeholder="i18n.PleaseEnterContent"
				v-model="user.userPassword" :password="true" >
			</CustomizeInput>
			<view class="goPage">
				<span @click="goChangePsw">
					{{i18n.ForgetThePassword}}
				</span>
			</view>
			<view class="login-btn" @click="goLogin">
				{{i18n.LogIn}}
			</view>
<!--			<view class="or">-->
<!--				{{i18n.ORSignInWith}}-->
<!--			</view>-->
<!--			<view class="otherLogin">-->
<!--				<view v-for="item in loginList" :key="item.id">-->
<!--					<image class="img" :src="item.img" alt="" />-->
<!--				</view>-->
<!--			</view>-->
		</view>
		<view class="signup">
			<span>{{i18n.NoAccount}}</span> <span class="signup-text" @click="goRegister">{{i18n.SignUp}}</span>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import CustomizeInput from '@/components/Input/Input.vue';
	import {
		login
	} from '@/api/api.js';
	import {
		type
	} from 'os';
	export default {
		computed: {
			i18n() {
				return this.$t('message')
			}
		},
		components: {
			CustomizeInput,
		},
		created() {
			if(uni.getStorageSync("Token")){
			    uni.$u.route({
			        url: 'pages/index/index',
			        type:'reLaunch'
			    })
			}
		},
		data() {
			return {
				Error: false,
        language:'en',
				user: {
					userName: "",
					userPassword: "",
				},
				pswdShow: false,
				pswtype: 'password',
				loginList: [{
					img: require('@/static/img/login/gm.png'),
					id: 1
				}, {
					img: require('@/static/img/login/ap.png'),
					id: 2
				}, {
					img: require('@/static/img/login/fb.png'),
					id: 3
				}, ]
			}
		},
		methods: {
      //切换语言
      changeLanguage() {
        if (this.language === 'en') {
          uni.setStorageSync('language', 'cht');
          this._i18n.locale = 'cht';
          this.language = 'cht';
        } else {
          uni.setStorageSync('language', 'en');
          this._i18n.locale = 'en';
          this.language = 'en';
        }
      },
			goChangePsw() {
        uni.setStorageSync('oldshow',false);
				uni.navigateTo({
					url: '/pages/emailVerification/emailVerification',
				})
			},

			emailError(val) {
				this.Error = val;
			},
			goRegister() {
				uni.navigateTo({
					url: '/pages/register/register',
				})
			},
			goLogin() {
				const user = {
					"email": this.user.userName,
					"password": this.user.userPassword,
				}
				uni.showLoading({
					title: 'loading...',
				});
				if (!this.user.userName){
					this.$refs.uToast.show({
						message: this.i18n.PleaseInputTheEmailAddress
					})
					uni.hideLoading();
					return
				}
				if (!this.user.userPassword){
					this.$refs.uToast.show({
						message: this.i18n.PleaseEnterPassword
					})
					uni.hideLoading();
					return
				}
				if (this.Error) {
					this.$refs.uToast.show({
						message: this.i18n.emailError
					})
          uni.hideLoading();
          return
				} else {
					login(user).then((res) => {
						uni.hideLoading();
						if (res.code === 200) {
              uni.setStorageSync('oldshow',true);
							this.$refs.uToast.show({
								message: this.i18n.LogInSuccess
							})
							uni.setStorageSync("Email", this.user.userName);
							uni.setStorageSync("Token", res.data.token);
							uni.setStorageSync("Avatar", res.data.avatar);
							uni.setStorageSync("UserID", res.data.id);
							uni.setStorageSync("Nick", res.data.nick);
							uni.setStorageSync("walletAddress", res.data.walletAddress);
							setTimeout(() => {
								uni.reLaunch({
									url: "/pages/index/index",
								});
							}, 1200);
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
    background-image: url('@/static/img/index/bgc.png'); /* 背景图的路径 */
    background-size: cover; /* 让背景图覆盖整个元素 */
    background-position: center; /* 将背景图居中 */
    background-repeat: no-repeat; /* 不重复背景图 */

		.logo {
			margin: 0 auto;
			width: 150rpx;
			height: 140rpx;

			.img {
				width: 100%;
				height: 100%;
			}
		}

		.logoText {
			margin: 0 auto;
			margin-top: 30rpx;
			width: 324rpx;
			height: 48rpx;

			.img {
				width: 100%;
				height: 100%;
			}
		}

		.user-box {
			width: 92%;
			margin: 0 auto;
			margin-top: 100rpx;

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
			}

			.psw {
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
				margin-top: 30rpx;

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
			}
		}

		.goPage {
			margin-top: 20rpx;
			font-weight: 400;
			font-size: 28rpx;
			color: #336AE2;
			text-align: right;
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

		.or {
			margin-top: 40rpx;
			font-weight: 400;
			font-size: 28rpx;
			color: #787D85;
			text-align: center;
		}

		.otherLogin {
			width: 60%;
			margin: 0 auto;
			margin-top: 30rpx;
			height: 110rpx;
			display: flex;
			justify-content: space-between;

			.img {
				width: 110rpx;
				height: 110rpx;
			}
		}

		.signup {
			margin-top: 40rpx;
			width: 100%;
			text-align: center;
			font-weight: 400;
			font-size: 28rpx;

			.signup-text {
				color: #336AE2;
			}
		}
	}

</style>