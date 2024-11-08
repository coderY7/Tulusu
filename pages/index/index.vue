<template>
	<view class="content">
		<!-- <button @tap="change1">切换成繁体中文</button>
		<button @tap="change2">切换成英文</button>
		<button@tap="showToast">切换语言后消息提示框</button> -->
		<view class="head">
			<view class="head-title">
				<view class="title-left">
        </view>
				<!-- <view class="title-right" @click="changeLanguage"></view> -->
			</view>
			<view class="user-box">
				<view class="name">{{userInfo.name}}</view>
				<view class="money"><span>$</span>{{userInfo.money}}</view>
				<view class="btn" @click="goRewardsWithdrawal">{{i18n.Accounts}}</view>
			</view>
			<view class="bgier">
				<view class="li" v-for="item in imgList" :key="item.img">
					<image class="img" :src="item.img" mode="" @click="goSwitch(item.id)"></image>
					<view class="title">{{item.title}}</view>
				</view>
			</view>
		</view>
		<view class="online-box">
			<view class="online-box-left">
				<view class="online-title">{{i18n.OnlineUsers}}</view>
				<view class="online">
					<view class="online-img">
						<image class="img" src="@/static/img/index/userhead.png" alt="" />
					</view>
					<view class="online-unmber">{{online}}</view>
				</view>
			</view>
			<view class="online-box-right">
				<view class="online-right-img">
					<image class="img" src="@/static/img/index/wt.png" alt="" />
				</view>
			</view>
		</view>
		<view class="new-record">
			<view class="record-title">
				<view class="record-title-text">{{i18n.LatestQuestionnaire}}</view>
				<view class="record-title-more" @click="lookAt(i18n.LatestQuestionnaire)">
					<image class="img" src="@/static/img/index/sgd.png" alt="" />
				</view>
			</view>
			<view class="record-list" v-for="item in recordList" :key="item.msg">
				<view class="record-list-left">
					<image class="img" src="@/static/img/index/record-list-left.png" alt="" />
				</view>
				<view class="record-list-right">
					<view class="record-list-type">
						<view class="record-list-type-img">
							<image v-if="recordList.length" class="img" :src="item.business.logo" alt="" />
						</view>
						<view class="record-list-type-text">{{item.business.title}}</view>
					</view>
					<view class="record-list-content">{{item.intro}}</view>
					<view class="record-list-click">
						<view class="record-list-learnmore" @click="goQuestions(item)">{{i18n.Getquestionnaire}}</view>
						<view class="record-list-heart">
              <view style="font-weight: 400;font-size: 12px;">{{i18n.residuedegree}} :{{item.remainingTimes}}</view>
<!--							<image v-if="item.hasLike" class="img" src="@/static/img/index/heart.png" alt="" />-->
<!--							<image @click="hasLikeIt(item)" v-else class="img" src="@/static/img/index/heart1.png"-->
<!--								alt="" />-->
<!--							<span class="record-list-heart-text">{{item.likeCount}}</span>-->
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="user-top3">
			<view class="record-title">
				<view class="record-title-text">
					<view class="title">{{i18n.RewardRanking}}</view>
					<view class="title-text">{{i18n.topThree}}</view>
				</view>
				<view class="record-title-more">
					<!-- <image class="img" src="@/static/img/index/sgd.png" alt="" /> -->
				</view>
			</view>
			<view class="top3-box" v-if="top3Data.length > 0">
				<view class="user-item" v-for="item in top3Data" :key="item.userId">
					<view class="user-head">
						<!-- <image class="img" src="@/static/img/changeHead/man.png" mode=""></image> -->
						<image v-if="item.user.avatar" class="img"
							:src="require(`@/static/img/changeHead/${item.user.avatar}.png`)" mode=""></image>
						<image v-else class="img" :src="require('@/static/img/changeHead/man.png')" mode=""></image>
						<view class="usermsg">
							<view class="nick">
								{{item.user.nick}}
							</view>
							<view class="time">
								{{i18n.Today}}
							</view>
						</view>
					</view>
					<view class="user-monye">
						<view class="moneyNum">
							{{item.point}}
						</view>
						<view class="icon">
							<image class="img" src="@/static/img/index/hb.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<view class="top3-box-empt" v-else>
				<image class="img" src="@/static/img/index/empt.png" mode=""></image>
			</view>
		</view>
		<view class="cooperative-merchant">
			<view class="cm-title">
				{{i18n.CooperativeMerchant}}
			</view>
			<view class="cm-box" v-if="cmbox1">
				<u-scroll-list class="scroll-list" :indicator='false'>
					<view class="list" v-for="(item, index) in businessList" :key="item.id">
						<image class="img" :src="item.banner"></image>
						<view class="list-text">{{item.title}}</view>
					</view>
				</u-scroll-list>
			</view>
			<view class="cm-box" v-if="cmbox2">
				<u-scroll-list class="scroll-list" :indicator='false'>
					<view class="list" v-for="(item, index) in businessList1" :key="item.id"
						@click="openWebView(item.webSite)">
						<image class="img" :src="item.banner"></image>
						<view class="list-text">{{item.title}}</view>
					</view>
				</u-scroll-list>
				<u-scroll-list class="scroll-list" :indicator='false'>
					<view class="list" v-for="(item, index) in businessList2" :key="item.id"
						@click="openWebView(item.webSite)">
						<image class="img" :src="item.banner"></image>
						<view class="list-text">{{item.title}}</view>
					</view>
				</u-scroll-list>
			</view>
		</view>
<!--		<view class="community-informatio">-->
<!--			<view class="ci-title">-->
<!--				<view class="ci-title-text">{{i18n.CommunityInformatio}}</view>-->
<!--				<view class="ci-title-more" @click="goAllnews(i18n.CommunityInformatio)">-->
<!--					<image class="img" src="@/static/img/index/sgd.png" alt="" />-->
<!--				</view>-->
<!--			</view>-->
<!--			<view class="ci-box" v-if="newsList">-->
<!--				<view class="ci-li" v-for="(item,index) in newsList" :key="item.id"-->
<!--					@click="goNew(item,i18n.CommunityInformatio)">-->
<!--					<view class="ci-banner">-->
<!--						<image class="img" :src="item.banner" alt="" />-->
<!--					</view>-->
<!--					<view class="ci-content">-->
<!--						<view class="li-title">{{item.title}}</view>-->
<!--						<view class="li-content">{{item.content}}</view>-->
<!--					</view>-->
<!--				</view>-->
<!--			</view>-->
<!--		</view>-->
		<u-toast ref="uToast"></u-toast>
		<Tabbar :language="language" :current="'0'"></Tabbar>
	</view>
</template>

<script>
	import Tabbar from '@/components/tabbar/tabbar.vue';
	import {
		newQuestionnaire,
		top3User,
		top2news,
		businessAll,
		userCount,
		getUserInfo,
		pointCurrent,
		onlineUser,
		userAcceptQuestionnaire,
		commonSetting,
		likeQuestionnaire,
		getLikeQuestionnaire,
		questionnaireState
	} from '@/api/api.js';
	import {
		forEach
	} from 'neo-async';
	export default {
		components: {
			Tabbar
		},
		computed: {
			i18n() {
				return this.$t('message')
			}
		},
		data() {
			return {
				cmbox1: false,
				cmbox2: false,
				title: 'Hello',
				language: 'en',
				userInfo: {
					name: "",
					money: 0,
				},
				online: 0,
				top3Data: [],
				businessList: [],
				businessList1: [],
				businessList2: [],
				imgList: [{
					img: require('@/static/img/index/AllQuestions.png'),
					title: '',
					id: 1,
				}, {
					img: require('@/static/img/index/Finish.png'),
					title: '',
					id: 2,
				}, {
					img: require('@/static/img/index/Exchange.png'),
					title: '',
					id: 3,
				}, {
					img: require('@/static/img/index/Service.png'),
					title: '',
					id: 4,
				}],
				recordList: [],
				newsList: [],
				kefu: '',
			}
		},
		onShow() {
			uni.hideTabBar({
				animation: false
			})
			this.getdataList();
		},
		created() {},
		onLoad() {
			this.language = uni.getStorageSync('language');
			if (this.language === 'en') {
				uni.setStorageSync('language', 'en');
				this._i18n.locale = 'en'
			}
      if (this.language === 'cht') {
				uni.setStorageSync('language', 'cht');
				this._i18n.locale = 'cht'
			}
		},
		methods: {
			hasLikeIt(item) {
				getLikeQuestionnaire({
					"id": item.id
				}).then((res) => {
					if (res.code === 200) {
						item.hasLike = true;
						item.likeCount = Number(item.likeCount) + 1
					}
				})
			},
			goAllnews(val) {
				this.$u.route('pages/allNews/allNews', {
					'title': val
				});
			},
			goNew(item, val) {
				this.$u.route('pages/news/news', {
					'content': JSON.stringify(item),
					'title': val
				});
			},
			openWebView(val) {
				const url = val;
				// 在H5平台直接使用window.location.href跳转
				if (process.env.UNI_PLATFORM === 'h5') {
					window.location.href = url;
				} else {
					// 在App平台中使用WebView
					// uni.navigateTo({
					// 	url: '/pages/webview/webview?url=' + encodeURIComponent(url)
					// });
          plus.runtime.openURL(url)
				}
			},
			lookAt(val) {
				this.$u.route('pages/allInvestigation/allInvestigation', {
					'title': val,
					'change': true
				});
			},
			goSwitch(id) {
				if (id === 1) {
          this.$u.route('pages/allInvestigation/allInvestigation',{'title':this.i18n.AllQuestions});
				}
				if (id === 2) {
					uni.switchTab({
						url: '/pages/index/Record',
					})
				}
				if (id === 3) {
					uni.navigateTo({
						url: '/pages/Exchange/Exchange',
					})
				}
				if (id === 4) {
					// this.openWebView(this.kefu)
					this.openEmailApp();
				}
			},
			 openEmailApp() {
			      const email = this.kefu; // 收件人
			      const subject = 'help'; // 邮件主题
			      const body = 'help'; // 邮件正文
			
			      const mailtoLink =`${email}&body=${encodeURIComponent(body)}`;
			      // 在h5平台上，使用window.location.href
				  console.log(mailtoLink)
			      if (process.env.VUE_APP_PLATFORM === 'h5') {
			        window.location.href = mailtoLink;
			      } else {

              // #ifdef APP-PLUS
              plus.runtime.openURL(mailtoLink)
              // #endif

			        // 在其他平台上，使用uni.navigateTo
			        // uni.navigateTo({
			        //   url: mailtoLink
			        // });
			      }
			    },
			goQuestions(item) {
				uni.showLoading({
					title: 'loading...',
				});

        userAcceptQuestionnaire({
          "questionnaireId": item.id
        }).then((ress) => {
          uni.hideLoading();
          //console.log('111',item,ress)
          if(ress.code == 100){
            this.$refs.uToast.show({
              message: this.i18n.notask
            })
          }
          if(ress.code == 103){
            		this.$refs.uToast.show({
            			message: this.i18n.Youhaveacceptedthistask
            		})
            item.acceptshow=false
            //item.id=ress.data.id
            this.$u.route('pages/questions/questions', item);
          }
          if (ress.code === 200) {
            item.id=ress.data.id
            this.$u.route('pages/questions/questions', item);
          }
        })
				// questionnaireState({
				// 	"id": item.id
				// }).then((res) => {
				// 	if (res.code === 404) {
				//
				// 	} else {
				// 		uni.hideLoading();
				// 		this.$refs.uToast.show({
				// 			message: this.i18n.Youhaveacceptedthistask
				// 		})
				// 	}
        //
				// })

			},
			goRewardsWithdrawal() {
				uni.switchTab({
					url: '/pages/index/Account',
				})
			},
			showToast() {
				uni.showToast({
					title: this.i18n.toast,
					icon: 'none',
					position: 'center'
				})
			},
			userCount() {
				userCount().then((res) => {})
			},
			getdataList() {
				this.imgList[0].title = this.i18n.AllQuestions
				this.imgList[1].title = this.i18n.Finish
				this.imgList[2].title = this.i18n.Exchange
				this.imgList[3].title = this.i18n.Service
				this.newQuestionnaire();
				this.top3User();
				this.top2news();
				this.businessAll();
				this.userCount();
				this.getUserInfo();
				this.pointCurrent();
				this.onlineUser();
				this.commonSetting();
			},
			commonSetting() {
				commonSetting().then((res) => {
					this.kefu = res.data.kefu;
					uni.setStorageSync('banners', res.data.banners);
				})
			},
			onlineUser() {
				onlineUser().then((res) => {
					if (res.code === 200) {
						this.online = res.data
					}
				})
			},
			getUserInfo() {
				const obj = {
					"id": uni.getStorageSync('UserID')
				}
				getUserInfo(obj).then((res) => {
					this.userInfo.name = res.data.nick;
				})
			},
			pointCurrent() {
				pointCurrent().then((res) => {
					this.userInfo.money = res.data ? res.data : "0.00";
				})
			},
			// 问卷前三
			newQuestionnaire() {
				const obj = {
					"size": 3
				};
				newQuestionnaire(obj).then((res) => {
					if (res.code === 200) {
						this.recordList = res.data;
					}
				})
			},
			// 用户前三
			top3User() {
				const obj = {
					"size": 3
				};
				top3User(obj).then((res) => {
					if (res.code === 200) {
						this.top3Data = res.data;
					}
				})
			},
			// 新闻2
			top2news() {
				const obj = {
					"size": 2
				};
				top2news(obj).then((res) => {
					if (res.code === 200) {
						this.newsList = JSON.parse(JSON.stringify(res.data))
					}
				})
			},
			//切换语言
			changeLanguage() {
				if (this.language === 'en') {
					uni.setStorageSync('language', 'cht');
					this._i18n.locale = 'cht';
					this.language = 'cht';
					this.getdataList();
				} else {
					uni.setStorageSync('language', 'en');
					this._i18n.locale = 'en';
					this.language = 'en';
					this.getdataList();
				}
			},

			//所有商家
			businessAll() {
				businessAll().then((res) => {
					if (res.code === 200) {
						if (res.data.length < 8) {
							this.businessList = JSON.parse(JSON.stringify(res.data));
							this.cmbox1 = true;
						} else {
							const umb1 = Math.ceil(res.data.length / 2);
							this.businessList1 = res.data.slice(0, umb1);
							this.businessList2 = res.data.slice(umb1, res.data.length);
							this.cmbox2 = true;
						}
					}
				})

			},
		}
	}
</script>

<style scoped lang="scss">
	.content {
		.head {
			width: 100%;
			background: url(@/static/img/index/bgc.png);
			background-size: 100% 100%;
			height: 860rpx;
			padding-top: 108rpx;
			box-sizing: border-box;
			color: #fff;

			.head-title {
				display: flex;
				justify-content: space-between;
        align-items: center;
				padding: 0 40rpx;
				box-sizing: border-box;

				.title-left {
					//width: 250rpx;
					//height: 107rpx;
					//background: url(@/static/img/index/newssp.png);
					//background-size: 100% 100%;
				}

				.title-right {
					width: 76rpx;
					height: 76rpx;
					//background: url(@/static/img/index/bz7.png);
					background-size: 100% 100%;
				}
			}

			.user-box {
				margin-top: 100rpx;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;

				.name {
					font-weight: 500;
					font-size: 32rpx;
					margin-bottom: 12rpx;
				}

				.money {
					font-weight: 600;
					font-size: 80rpx;
					color: #FFFFFF;

					span {
						margin-right: 4rpx;
					}
				}

				.btn {
					margin: 0 auto;
					margin-top: 32rpx;
					width: 220rpx;
					height: 80rpx;
					background: url(@/static/img/index/jx.png);
					background-size: 100% 100%;
					text-align: center;
					line-height: 80rpx;
				}
			}

			.bgier {
				margin-top: 150rpx;
				display: flex;
				justify-content: space-around;

				.li {
					text-align: center;
					flex: 1;

					.img {
						width: 110rpx;
						height: 110rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.title {
						display: flex;
						justify-content: center;
						font-weight: 400;
						font-size: 28rpx;
						color: #FFFFFF;
					}
				}
			}
		}

		.online-box {
			width: 92%;
			height: 180rpx;
			margin: 0 auto;
			margin-top: 40rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 12rpx 24rpx 0rpx rgba(0, 0, 0, 0.02);
			border-radius: 40rpx;
			padding: 0 32rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.online-box-left {
				.online-title {
					font-weight: 600;
					font-size: 32rpx;
					color: #000000;
					text-align: left;
					font-style: normal;
					margin-bottom: 20rpx;
				}

				.online {
					display: flex;
					align-items: center;
					margin-left: -8rpx;

					.online-img {
						width: 40rpx;
						height: 40rpx;

						.img {
							width: 100%;
							height: 100%;
						}
					}

					.online-unmber {
						font-weight: bold;
						font-size: 44rpx;
						color: #336AE2;
						text-align: left;
					}
				}
			}

			.online-box-right {
				width: 158rpx;
				height: 149rpx;

				.img {
					width: 158rpx;
					height: 149rpx;
				}
			}
		}

		.new-record {
			width: 92%;
			margin: 0 auto;
			margin-top: 40rpx;

			.record-title {
				display: flex;
				justify-content: space-between;

				.record-title-text {
					font-weight: 600;
					font-size: 32rpx;
					color: #000000;
					display: flex;
					align-items: center;

				}

				.record-title-more {
					width: 40rpx;
					height: 40rpx;

					.img {
						width: 100%;
						height: 100%;
					}
				}
			}

			.record-list {
				width: 100%;
				padding: 30rpx;
				box-sizing: border-box;
				background: #FFFFFF;
				box-shadow: 0rpx 12rpx 24rpx 0rpx rgba(0, 0, 0, 0.02);
				border-radius: 40rpx;
				margin-top: 30rpx;
				display: flex;

				.record-list-left {
					width: 56rpx;
					height: 75rpx;
					margin-right: 30rpx;

					.img {
						width: 100%;
						height: 100%;
					}
				}

				.record-list-right {
					width: calc(100% - 86rpx);

					.record-list-type {
						display: flex;
						align-items: center;

						.record-list-type-img {
							margin-right: 6rpx;

							.img {
								width: 42rpx;
								height: 42rpx;
							}
						}

						.record-list-type-text {
							font-weight: 400;
							font-size: 28rpx;
							color: #000000;
							padding-bottom: 10rpx;
						}
					}

					.record-list-content {
						max-width: 100%;
						margin-top: 20rpx;
						font-weight: 600;
						font-size: 32rpx;
						color: #000000;
						text-align: left;
						word-wrap: break-word;
						word-break: normal;
					}

					.record-list-click {
						margin-top: 20rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;

						.record-list-learnmore {
							font-weight: 400;
							font-size: 28rpx;
							color: #377BE7;
						}

						.record-list-heart {
							display: flex;
							align-items: center;
							padding-top: 8rpx;

							.img {
								width: 40rpx;
								height: 40rpx;
							}

							.record-list-heart-text {
								margin-left: 4rpx;
								font-weight: bold;
								font-size: 28rpx;
								color: rgba(0, 0, 0, .5);
								//line-height: 32rpx;
							}
						}
					}
				}
			}
		}

		.user-top3 {
			width: 92%;
			margin: 0 auto;
			margin-top: 40rpx;

			.record-title {
				display: flex;
				justify-content: space-between;

				.record-title-text {
					font-weight: 600;
					font-size: 32rpx;
					color: #000000;
					display: flex;
					align-items: center;

					.title-text {
						font-family: PingFangSC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: rgba(0, 0, 0, .5);
						margin-top: 14rpx;
					}
				}

				.record-title-more {
					width: 40rpx;
					height: 40rpx;

					.img {
						width: 100%;
						height: 100%;
					}
				}
			}

			.top3-box {
				margin-top: 30rpx;
				width: 100%;
				padding: 35rpx 30rpx;
				box-sizing: border-box;
				background: #FFFFFF;
				box-shadow: 0rpx 12rpx 24rpx 0rpx rgba(0, 0, 0, 0.02);
				border-radius: 40rpx;

				.user-item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1px solid rgba(0, 0, 0, .1);
					margin-bottom: 34rpx;
					padding-bottom: 34rpx;

					.user-head {
						display: flex;
						align-items: center;

						.img {
							width: 118rpx;
							height: 118rpx;
						}
					}

					.usermsg {
						margin-left: 30rpx;

						.nick {
							font-family: PingFangSC, PingFang SC;
							font-weight: 600;
							font-size: 28rpx;
							color: #000000;
							margin-bottom: 10rpx;
						}

						.time {
							font-family: PingFangSC, PingFang SC;
							font-weight: 400;
							font-size: 24rpx;
							color: rgba(0, 0, 0, .5);
						}
					}

					.user-monye {
						display: flex;

						.moneyNum {
							font-weight: bold;
							font-size: 40rpx;
							color: #336AE2;
						}

						.icon {
							.img {
								font-family: DINAlternate, DINAlternate;
								width: 50rpx;
								height: 50rpx;
								margin-left: 10rpx;
							}
						}
					}
				}

				.user-item:last-child {
					border: none;
					margin-bottom: 0;
					padding-bottom: 0;
				}
			}

			.top3-box-empt {
				margin-top: 30rpx;
				width: 100%;
				height: 300rpx;
				line-height: 300rpx;
				text-align: center;
				padding: 35rpx 30rpx;
				box-sizing: border-box;
				background: #FFFFFF;
				box-shadow: 0rpx 12rpx 24rpx 0rpx rgba(0, 0, 0, 0.02);
				border-radius: 40rpx;

				.img {
					width: 180rpx;
					height: 180rpx;
				}
			}
		}

		.cooperative-merchant {
			margin: 0 auto;
			margin-top: 40rpx;
      margin-bottom: 120rpx;
			width: 100%;

			.cm-title {
				margin-left: 30rpx;
				font-weight: 600;
				font-size: 32rpx;
				color: #000000;
			}

			.cm-box {
				margin-left: 30rpx;

				.scroll-list {
					margin-top: 30rpx;
					margin-bottom: 20rpx;

					.list {
						width: 130rpx;
						margin-right: 50rpx;

						.img {
							width: 100rpx;
							height: 100rpx;
              object-fit: cover;
							box-shadow: 0rpx 12rpx 24rpx 0rpx rgba(0, 0, 0, 0.02);
							border-radius: 30rpx;
						}

						.list-text {
							font-size: 22rpx;
							color: rgba(0, 0, 0, .5);
							text-align: center;
						}
					}
				}

			}
		}

		.community-informatio {
			margin-top: 50rpx;
			margin-bottom: 200rpx;

			.ci-title {
				display: flex;
				justify-content: space-between;
				padding: 0 30rpx;
				box-sizing: border-box;

				.ci-title-text {
					font-weight: 600;
					font-size: 32rpx;
					color: #000000;
					display: flex;
					align-items: center;
				}

				.ci-title-more {
					width: 40rpx;
					height: 40rpx;

					.img {
						width: 100%;
						height: 100%;
					}
				}
			}



			.ci-box {
				width: 690rpx;
				margin: 0 auto;
				margin-top: 30rpx;

				.ci-li {
					background-color: #fff;
					border-radius: 40rpx;
					overflow: hidden;
					margin-bottom: 30rpx;

					.ci-banner {
						width: 690rpx;
						height: 300rpx;

						.img {
							width: 100%;
							height: 100%;
						}
					}

					.ci-content {
						padding: 20rpx 30rpx;

						.li-title {
							font-weight: 600;
							font-size: 32rpx;
							color: #000000;
							text-align: left;
							font-style: normal;
							margin-bottom: 20rpx;
						}

						.li-content {
							font-weight: 400;
							font-size: 28rpx;
							color: rgba(0, 0, 0, .5);
							line-height: 34rpx;
							text-align: left;
						}
					}
				}
			}
		}
	}
	/deep/ .uni-scroll-view::-webkit-scrollbar {
	/* 隐藏滚动条，但依旧具备可以滚动的功能 */
	/* 隐藏下划线的样式 */
	  border-bottom: none;
		 display: none; /* 隐藏滚动条 */
	}
</style>