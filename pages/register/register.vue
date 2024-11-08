<template>
	<view class="login">
		<returnBack></returnBack>
		<view class="logo" :style="'padding-top:' + statusBarHeight +'rpx'">
			<image class="img" src="@/static/img/login/newlogo.png" alt="" />

		</view>
		<view class="logoText">
			<P>{{i18n.WelcomeToRegister}}</P>
			<P :class="language === 'en'?'en':''">{{i18n.LetMeGo}}</P>
		</view>
		<view class="user-box">
			<CustomizeInput :label="i18n.NickName" :placeholder="i18n.NickName" v-model="user.userName" >
			</CustomizeInput>
			<CustomizeInput  :email="true" :regemail="regemail" @isregemail="isregemail" @isregemailcode="isregemailcode" :regemailtext="i18n.regemailtext" @emailError="emailError"  style="margin-top: 40rpx;" :label="i18n.Email" :placeholder="i18n.PleaseEnterContent"
				v-model="user.email" >
			</CustomizeInput>
      <CustomizeInput   style="margin-top: 40rpx;" :label="i18n.Emailcode" :placeholder="i18n.Emailcode"
                       v-model="user.code" >
      </CustomizeInput>
			<CustomizeInput style="margin-top: 40rpx;" :label="i18n.Password" :placeholder="i18n.InputPassword"
				v-model="user.userPassword" :password="true" >
			</CustomizeInput>
			<CustomizeInput style="margin-top: 40rpx;" :label="i18n.ReInputPassword" :placeholder="i18n.ReInputPassword"
				v-model="user.userCPassword" :password="true" >
			</CustomizeInput>
			<CustomizeInput style="margin-top: 40rpx;" :label="i18n.PaymentPassword" :placeholder="i18n.PaymentPassword"
				v-model="user.paymentPassword" :password="true" >
			</CustomizeInput>
			<CustomizeInput style="margin-top: 40rpx;" :label="i18n.ConfirmPaymentPassword"
				:placeholder="i18n.ConfirmPaymentPassword" v-model="user.cPaymentPassword" :password="true" >
			</CustomizeInput>
      <CustomizeInput  style="margin-top: 40rpx;" :label="i18n.invitationNo" :placeholder="i18n.invitationNo" v-model="user.invitationNo" >
      </CustomizeInput>
			<view class="agree">
				<checkbox-group @change="radioChange">
					<label>
						<checkbox activeBackgroundColor="#EDEFF3" activeBorderColor="#EDEFF3" backgroundColor="#EDEFF3"
							borderColor="#EDEFF3" value="1" />
            <text class="Agree1">{{i18n.Agree1}}</text>
            <text class="Agree2" @click="viewurl()">{{i18n.Agree2}}</text>
            <text class="Agree3">{{i18n.Agree3}}</text>
            <text class="Agree4" @click="pryview()">{{i18n.Agree4}}</text>
					</label>
				</checkbox-group>
			</view>
			<view class="login-btn" @click="register">
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
			<span style="padding-right: 10rpx;">{{i18n.HaveAccount}} </span> <span @click="goLogin"
				class="signup-text">{{i18n.LogIn}}</span>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import CustomizeInput from '@/components/Input/Input.vue';
	import {
		register,
		login,
    checkregCode
  } from '@/api/api.js';
  import {sendCode, sendregCode} from "../../api/api";
	export default {
		computed: {
			i18n() {
				return this.$t('message')
			}
		},
		components: {
			CustomizeInput,
		},
		data() {
			return {
				Error: false,
				isAgree: false,
        regemail:true,
				user: {
					userName: "",
					email: "",
					userPassword: "",
					userCPassword: "",
					paymentPassword: "",
					cPaymentPassword: "",
          code:'',
          invitationNo:'',//邀请人
				},
				language: 'en',
				loginList: [{
					img: require('@/static/img/login/gm.png'),
					id: 1
				}, {
					img: require('@/static/img/login/ap.png'),
					id: 2
				}, {
					img: require('@/static/img/login/fb.png'),
					id: 3
				}, ],
				statusBarHeight:137,
			}
		},
    onLoad(option) {
      if(option.inviterNo){
        this.user.invitationNo=option.inviterNo
        uni.setStorageSync('invitationNo', this.user.invitationNo);
      }
    },
		onShow() {
			this.language = uni.getStorageSync('language');
      this.user.invitationNo=uni.getStorageSync('invitationNo');
		},
		created() {
			uni.getSystemInfo({
				success: (res) => {
					this.statusBarHeight = res.statusBarHeight * (750 / res.windowWidth) + this.statusBarHeight;
					//console.log(this.statusBarHeight)
				}
			});
		},
		methods: {
      isregemail(e){
        if(this.Error){
          return
        }
        let data={
          "email": e,
       }
        sendregCode(data).then((res)=>{
          if(res.code==200){
            this.regemail=false
          }else {
            this.$refs.uToast.show({
              message: res.message.message
            })
          }
        })

      },
      isregemailcode(){
        if(this.Error){
          return
        }
        this.regemail=true
      },
			emailError(val) {
				this.Error = val;
				//console.log(this.Error)
			},
			goChangePsw() {
				uni.navigateTo({
					url: '/pages/changePsw/changePsw',
				})
			},
			radioChange(value) {
				if (value.detail.value.length === 1) {
					this.isAgree = true;
				} else {
					this.isAgree = false;
				}
			},
			goLogin() {
				uni.navigateTo({
					url: '/pages/login/login',
				})
			},
			register() {
				if (this.user.userName === '') {
					this.$refs.uToast.show({
						message: this.i18n.NickName
					})
					return
				}
				if (this.user.email === '') {
					this.$refs.uToast.show({
						message: this.i18n.Email
					})
					return
				}
				if (this.Error) {
					this.$refs.uToast.show({
						message: this.i18n.emailError
					})
					return
				}
				if (this.user.userPassword === '') {
					this.$refs.uToast.show({
						message: this.i18n.Password
					})
					return
				}
				if (this.user.userCPassword === '') {
					this.$refs.uToast.show({
						message: this.i18n.Password
					})
					return
				}
				if (this.user.paymentPassword === '') {
					this.$refs.uToast.show({
						message: this.i18n.PaymentPassword
					})
					return
				}
				if (this.user.cPaymentPassword === '') {
					this.$refs.uToast.show({
						message: this.i18n.PaymentPassword
					})
					return
				}
				if (this.user.userPassword !== this.user.userCPassword) {
					this.$refs.uToast.show({
						message: this.i18n.WrongPassword
					})
					return
				}
				if (this.user.cPaymentPassword !== this.user.paymentPassword) {
					this.$refs.uToast.show({
						message: this.i18n.WrongPayPassword
					})
					return
				}
				if (!this.isAgree) {
					this.$refs.uToast.show({
						message: this.i18n.Agree5
					})
					return
				}
				uni.showLoading({
					title: 'loading...',
				});
				const obj = {
					"nick": this.user.userName,
					"email": this.user.email,
					"password": this.user.userPassword,
					"payPassword": this.user.paymentPassword,
          "code":this.user.code,
          "invitationNo":this.user.invitationNo
				}
				register(obj).then((res) => {
					if (res.code === 200) {
						this.$refs.uToast.show({
							message: this.i18n.RegistrationSuccessful
						})
						const user = {
							"email": this.user.email,
							"password": this.user.userPassword,
						}
						login(user).then((res) => {
							if (res.code === 200) {
								uni.setStorageSync("Email", this.user.userName);
								uni.setStorageSync("Token", res.data.token);
								uni.setStorageSync("Avatar", res.data.avatar);
								uni.setStorageSync("UserID", res.data.id);
								uni.setStorageSync("walletAddress", res.data.walletAddress);
								uni.setStorageSync("Nick", res.data.nick);
								setTimeout(() => {
									uni.reLaunch({
										url: "/pages/index/index",
									});
									uni.hideLoading();
								}, 1200);
							}
						})
					}else{
						uni.hideLoading();
            this.$refs.uToast.show({
              message: res.message.message
            })
					}
				})
			},
      viewurl(){
        let baseUrl=uni.$u.http.config.baseURL1
        const Cnurl = '/upload/ServiceCn.html';
        const Enurl = '/upload/ServiceEn.html';
        let url = Cnurl
        if (this.language === 'en') {
          url = Enurl
        }
          url = baseUrl + url
        // 在H5平台直接使用window.location.href跳转
          // #ifdef H5
          window.location.href = url;
          // #endif

          // 在APP平台中使用WebView
          // #ifdef APP-PLUS
          uni.navigateTo({
            url: '/pages/webview/webview?url=' + encodeURIComponent(url)
          });
          // #endif

      },
      pryview(){
        let url=uni.$u.http.config.baseURL1 + '/upload/Privacy.html'
        // 在H5平台直接使用window.location.href跳转
        // #ifdef H5
        window.location.href = url;
        // #endif

        // 在APP平台中使用WebView
        // #ifdef APP-PLUS
        uni.navigateTo({
          url: '/pages/webview/webview?url=' + encodeURIComponent(url)
        });
        // #endif
      }
		}
	}
</script>

<style scoped  lang="scss">
	.login {
		height: 100VH;
		padding: 0 30rpx;

		.logo {
			margin: 0 auto;
			width: 100rpx;
			height: 92rpx;
			margin-top: 47rpx;

			.img {
				width: 100%;
				height: 100%;
			}
		}

		.logoText {
			width: 600rpx;
			margin: 0 auto;
			font-weight: 600;
			font-size: 44rpx;
			color: #000000;
			text-align: center;
			font-style: normal;
			margin-top: 32rpx;

			.en {
				font-weight: 600;
				font-size: 32rpx;
				color: rgba(0, 0, 0, 0.5);
				line-height: 45rpx;
				text-align: center;
				font-style: normal;
				margin-top: 10rpx;
			}
		}

		.user-box {
			width: 100%;
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

			.agree {
				margin-top: 50rpx;
				font-weight: 400;
				font-size: 28rpx;
				color: #000000;

				.Agree2 {
					color: #336AE2;
				}

				.Agree4 {
					color: #336AE2;
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
			padding-bottom: 40rpx;

			.signup-text {
				color: #336AE2;
			}
		}
	}
</style>