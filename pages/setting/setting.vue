<template>
	<view class="content" :style="'padding-top:' + statusBarHeight +'rpx'">
		<returnBack :title="i18n.Settings"></returnBack>
		<view class="setting-box">
			<view class="setting-li" v-for="(item,index) in settingList" :key="index" @click="goPage(index)">
				<view class="setting-li-left">
					<image class="img" :src="item.url" mode=""></image>
					<view class="name">
						{{item.name}}
					</view>
				</view>

				<view class="setting-li-right">
					<u-icon color='rgba(0,0,0,.3)' name="arrow-right" size="22"></u-icon>
				</view>
			</view>
		</view>
		<u-modal width="400rpx" @confirm="confirm" @cancel="cancel" showCancelButton :show="show" :content='i18n.logOutTips' :confirmText='i18n.Confirm'
			:cancelText='i18n.Cancel'></u-modal>
	</view>
</template>

<script>
	import returnBack from '@/components/returnBack/returnBack.vue'
	import {
		checkCode,
		logout,
		commonSetting,
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
				show: false,
				statusBarHeight: 137,
				settingList: [{
					name: '',
					url: require('@/static/img/setting/1 (7).png')
				}, {
					name: '',
					url: require('@/static/img/setting/1 (5).png')
				}, {
					name: '',
					url: require('@/static/img/setting/1 (1).png')
				}, 
				{
					name: '',
					url: require('@/static/img/setting/1 (2).png')
				},
				// {
				// 	name: '',
				// 	url: require('@/static/img/setting/1 (3).png')
				// },
				// {
				// 	name: '',
				// 	url: require('@/static/img/setting/1 (4).png')
				// },
          {
            name: '',
            url: require('@/static/img/setting/share.png')
          },
				{
					name: '',
					url: require('@/static/img/setting/fensi.png')
				},
          {
            name: '',
            url: require('@/static/img/setting/1 (6).png')
          },
				 ],
				language: 'en',
				cookieAgreement:'',
				userAgreement:'',
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
			this.settingList[0].name = this.i18n.WalletAddress;
			this.settingList[1].name = this.i18n.Password;
			this.settingList[2].name = this.i18n.PaymentPassword;
			this.settingList[3].name = this.i18n.UserAgreement;
			this.settingList[4].name = this.i18n.share;
			// this.settingList[5].name = this.i18n.FAQss;
      this.settingList[5].name = this.i18n.fanscurrent;

			this.settingList[6].name = this.i18n.LogOut;


		},
		onShow() {
			uni.hideTabBar({
				animation: false
			})
			this.language = uni.getStorageSync('language');
			this.commonSetting();
		},
		methods: {
			commonSetting() {
				commonSetting().then((res) => {
					console.log(res)
          if(this.language=='cht'){
            this.userAgreement = res.data.userAgreementCn;
          }else {
            this.userAgreement = res.data.userAgreementEn;
          }
					this.cookieAgreement = res.data.cookieAgreement;
				})
			},
			goPage(val) {
				console.log(val)
				if (val === 0) {
					this.$u.route('pages/walletAddress/walletAddress');
				}
				if (val === 1) {
					this.$u.route('pages/emailVerification/emailVerification');
				}
				if (val === 2) {
					this.$u.route('pages/emailVerification/emailVerification',{'titleCode':'1'});
				}
				if (val === 3) {
					this.openWebView(this.userAgreement)
				}
				if (val === 4) {
          this.$u.route('pages/share/share',);
				}
				if (val === 6) {
					this.show = true;
				}
        if (val === 5) {
          this.$u.route('pages/fansCurrent/fansCurrent',);
        }
			},
			confirm() {
				logout().then(res=>{
					this.show = false;
					uni.$u.toast(this.i18n.LogOut)
					uni.clearStorageSync();
          uni.setStorageSync('language', 'en');
					setTimeout(() => {
						uni.reLaunch({
							url: "/pages/login/login",
						});
					}, 1200);
				})
			},
			openWebView(val) {
				const url = val;
				// 在H5平台直接使用window.location.href跳转
				if (process.env.UNI_PLATFORM === 'h5') {
					window.location.href = url;
				} else {
					// 在App平台中使用WebView
					uni.navigateTo({
						url: '/pages/webview/webview?url=' + encodeURIComponent(url)
					});
				}
			},
			cancel(){
				this.show = false;
			},
		}
	}
</script>

<style scoped  lang="scss">
	.content {
		height: 100VH;
		padding: 0 30rpx;

		.setting-box {
			margin-top: 30rpx;

			.setting-li {
				width: 100%;
				height: 105rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 12rpx 24rpx 0rpx rgba(0, 0, 0, 0.02);
				border-radius: 30rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 20rpx;
				padding: 0 30rpx;
				box-sizing: border-box;

				.setting-li-left {
					display: flex;

					.name {
						margin-left: 30rpx;
						font-family: PingFangSC, PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						color: #000000;
						display: flex;
						align-items: center;
					}

					.img {
						width: 49rpx;
						height: 49rpx;
					}
				}
			}
		}

	}
</style>