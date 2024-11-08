<template>
	<view class="content">

		<view class="head">
			<view class="head-title">

			</view>
			<view class="head-title-text">
				{{i18n.Account}}
			</view>
			<view class="user-box">
				<view class="user-box-left">
					<view class="user-head-box" @click="goChange" v-if="showHead">
						<image v-if="avatar" class="user-head-box-img" :src="require(`@/static/img/changeHead/${avatar}.png`)" mode=""></image>
						<image v-else="avatar" class="user-head-box-img" :src="require('@/static/img/changeHead/man.png')" mode=""></image>
					</view>
					<view class="user-head-text">
						<view class="user-nick">{{nickName}}</view>
						<view class="user-monye"><span>{{i18n.CurrentEarnings}}</span>{{CurrentEarnings}}</view>
					</view>
				</view>
				<view class="user-box-right" >
					<image @click="goSetting" style="margin-right: 0;" class="seting" src="@/static/img/my/seting.png" mode=""></image>
					<!-- <image class="berll" src="@/static/img/my/berll.png" mode=""></image> -->
				</view>
			</view>
			<view class="bgier">
				<view class="li">
					<view class="li-content">{{userInfo.pointCount}}</view>
					<view class="title">{{i18n.AccumulatedEarnings}}</view>
				</view>
				<view class="li">
					<view class="li-content">{{userInfo.taskSettle}}</view>
					<view class="title">{{i18n.Todaysearnings}}</view>
				</view>
				<view class="li">
					<view class="li-content">{{userInfo.taskWaitSettle}}</view>
					<view class="title">{{i18n.PendingSettlement}}</view>
				</view>
			</view>
		</view>
		<view class="online-box">
			<view class="li" @click="Finishrw">
				<image class="li-img" src="@/static/img/my/1 (5).png" mode=""></image>
				<view class="li-title">{{i18n.Finish}}</view>
			</view>
			<view class="li" >
				<image @click="goInvitation" class="li-img" src="@/static/img/my/yaoqing.png" mode=""></image>
				<view class="li-title">{{i18n.Invitation}}</view>
			</view>
			<view class="li">
				<image class="li-img" @click="goPointsrecord" src="@/static/img/my/1 (7).png" mode=""></image>
				<view class="li-title">{{i18n.Pointsrecord}}</view>
			</view>
		</view>
		<view class="scroll-list-box">
			<view class="scroll-title">
				<view class="scroll-title-text">{{i18n.GiftCardRedemption}}</view>
				<view class="scroll-title-more">
					<!-- <image class="img" src="@/static/img/index/sgd.png" alt="" /> -->
				</view>
			</view>
			<u-scroll-list class="scroll-list" :indicator='false'>
				<view class="list" v-for="(item, index) in list" :key="index" @click="goExchange(index)">
					<image class="img" :src="item.thumb"></image>
					<view class="list-text">{{item.title}}</view>
					<view class="scroll-learnMore">{{i18n.LearnMore}}</view>
				</view>
			</u-scroll-list>
		</view>
		<view class="about">
			<view class="about-title">{{i18n.AboutUs}}</view>
			<view class="about-box">
				<view class="li" @click="goAboutUS">
					<view class="li-left">
						<image class="img" src="@/static/img/my/1 (2).png" mode=""></image>
						<span>{{i18n.CompanyIntroduction}}</span>
					</view>
					<view class="li-right"><u-icon name="arrow-right"></u-icon></view>
				</view>
<!--				 <view class="li">-->
<!--					<view class="li-left">-->
<!--						<image class="img" src="@/static/img/my/1 (4).png" mode=""></image>-->
<!--						<span>{{i18n.DistributionArea}}</span>-->
<!--					</view>-->
<!--					<view class="li-right"><u-icon name="arrow-right"></u-icon></view>-->
<!--				</view>-->
				<view class="li" style="border: none;"  @click="goproblem">
					<view class="li-left">
						<image class="img" src="@/static/img/my/1 (3).png" mode=""></image>
						<span>{{i18n.FAQs}}</span>
					</view>
					<view class="li-right"><u-icon name="arrow-right"></u-icon></view>
				</view>
			</view>
		</view>
		<Tabbar :language="language" :current="'4'"></Tabbar>
	</view>
</template>

<script>
	import Tabbar from '@/components/tabbar/tabbar.vue';
	import {
		userCount,
		currentUserInfo,
		pointCurrent,
	} from '@/api/api.js';
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
				showHead:false,
				avatar:'',
				nickName: '',
				CurrentEarnings: '0.00',
				title: 'Hello',
				language: 'en',
				userInfo: {
					pointCount: '', //累计收益
					taskSettle: '', //问卷结算
					taskWaitSettle: '', //等待结算
				},
				list: [{
					thumb: require("@/static/img/my/1.png"),
					title: ""
				}, {
					thumb: require("@/static/img/my/2.png"),
					title: ""
				}, {
					thumb: require("@/static/img/my/3.png"),
					title: ""
				}, {
					thumb: require("@/static/img/my/4.png"),
					title: ""
				}]
			}
		},
		onShow() {
			uni.hideTabBar({
				animation: false
			})
			this.language = uni.getStorageSync('language');
			this.getdataList();
		},
		onLoad() {

		},
		methods: {
      goInvitation(){
        this.$u.route('pages/share/share');
      },

      Finishrw(){
        uni.setStorageSync('Finishrw',true)
        uni.switchTab({
          url: '/pages/index/Record'
        });
      },
			goPointsrecord(){
				this.$u.route('pages/pointsrecord/pointsrecord');
			},
			goChange(){
				this.$u.route('pages/changeAvatar/changeAvatar');
			},
			goExchange(val) {
				if (val === 3) {
					 this.$u.route('pages/rewardsWithdrawal/rewardsWithdrawal');
				}else{
					this.$u.route('pages/Exchange/Exchange', {
						"code": val,
					});
				}
			},
			goAboutUS() {
				this.$u.route('pages/aboutUs/aboutUs');
			},
      goproblem(){
        this.$u.route('pages/problem/problem');
      },
			currentUserInfo() {
				currentUserInfo().then((res) => {
					this.showHead = true;
					this.nickName = res.data.nick;
					this.avatar = res.data.avatar;
          uni.setStorageSync('inviterNo', res.data.inviterNo);
				})
			},
			pointCurrent() {
				pointCurrent().then((res) => {
					this.CurrentEarnings = res.data
				})
			},

			showToast() {
				uni.showToast({
					title: this.i18n.toast,
					icon: 'none',
					position: 'center'
				})
			},
			getdataList() {
				// this.list[0].title = this.i18n.Shop;
				// this.list[1].title = this.i18n.Clothing;
				// this.list[2].title = this.i18n.ShoppingCard;
				this.list[0].title = this.i18n.ALLPRODUCTS;
				this.list[1].title = this.i18n.Apparel;
				this.list[2].title = this.i18n.DigitalProducts;
				this.list[3].title = this.i18n.exchangeUSDT;
				this.userCount();
				this.currentUserInfo();
				this.pointCurrent();
			},
			userCount() {
				userCount().then((res) => {
					if (res.code === 200) {
						this.userInfo.pointCount = res.data.pointCount ? res.data.pointCount : '0.00';
						this.userInfo.taskSettle = res.data.taskSettle ? res.data.taskSettle : '0.00';
						this.userInfo.taskWaitSettle = res.data.taskWaitSettle ? res.data.taskWaitSettle : '0.00';
					}
				})
			},
			goSetting() {
				this.$u.route('pages/setting/setting');
			},
		}
	}
</script>

<style scoped  lang="scss">
	.content {
		.head {
			width: 100%;
			background: url(@/static/img/my/bgc.png);
			background-size: 100% 100%;
			height: 690rpx;
			box-sizing: border-box;
			color: #fff;
			padding: 0 30rpx;

			.head-title {
				width: 100%;
				height: 140rpx;
			}

			.head-title-text {
				width: 100%;
				text-align: center;
				font-weight: 600;
				font-size: 32rpx;
				color: #FFFFFF;
				margin-bottom: 30rpx;
			}

			.user-box {
				width: 100%;
				display: flex;
				justify-content: space-between;
				box-sizing: border-box;

				.user-box-left {
					display: flex;

					.user-head-box {
						width: 120rpx;
						height: 120rpx;
						margin-right: 20rpx;

						.user-head-box-img {
							width: 100%;
							height: 100%;
						}
					}

					.user-head-text {
						line-height: 60rpx;

						.user-nick {
							font-weight: 600;
							font-size: 32rpx;
							color: #FFFFFF;

							font-style: normal;
						}

						.user-monye {
							font-weight: bold;
							font-size: 40rpx;
							color: #FFFFFF;

							span {
								margin-right: 10rpx;
								font-weight: 400;
								font-size: 28rpx;
								color: rgba(255, 255, 255, .7);
							}
						}
					}
				}

				.user-box-right {
					display: flex;

					.seting {
						width: 74rpx;
						height: 74rpx;
						margin-right: 30rpx;
					}

					.berll {
						width: 74rpx;
						height: 74rpx;
					}
				}

			}

			.bgier {
				display: flex;
				justify-content: space-around;
				width: calc(100% - 160rpx);
				margin: 0 auto;
				margin-top: 90rpx;

				.li {
					text-align: center;
					flex: 1;

					.title {
						display: flex;
						justify-content: center;
						font-weight: 400;
						font-size: 28rpx;
						color: rgba(255, 255, 255, .7);
					}

					.li-content {
						font-size: 40rpx;
						font-weight: 700;
					}
				}
			}
		}

		.online-box {
			width: 690rpx;
			height: 230rpx;
			margin: 0 auto;
			margin-top: -115rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 12rpx 24rpx 0rpx rgba(0, 0, 0, 0.02);
			border-radius: 40rpx;
			padding: 0 80rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;

			.li {
        width: 200px;
				text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        white-space:nowrap;

				.li-img {
					width: 110rpx;
					height: 110rpx;
				}

				.li-title {
					font-weight: 400;
					font-size: 28rpx;
					color: #000000;
				}
			}

		}

		.scroll-list-box {
			width: calc(100% - 30rpx);
			margin-left: 30rpx;
			margin-top: 40rpx;

			.scroll-title {
				display: flex;
				justify-content: space-between;
				padding-right: 30rpx;
				box-sizing: border-box;
				margin-bottom: 30rpx;

				.scroll-title-text {
					font-weight: 600;
					font-size: 32rpx;
					color: #000000;
					display: flex;
					align-items: center;
				}

				.scroll-title-more {
					width: 40rpx;
					height: 40rpx;

					.img {
						width: 100%;
						height: 100%;
					}
				}
			}

			.scroll-list {
				width: 100%;

				.list {
					width: 300rpx;
					height: 400rpx;
					background-color: #fff;
					box-shadow: 0rpx 12rpx 24rpx 0rpx rgba(0, 0, 0, 0.02);
					border-radius: 30rpx;
					margin-right: 30rpx;
					padding: 30rpx;
					padding-top: 20rpx;
					box-sizing: border-box;

					.img {
						width: 238rpx;
						height: 248rpx;
					}

					.list-text {
						margin-top: 20rpx;
						font-weight: 600;
						font-size: 32rpx;
						color: #000000;
						white-space:nowrap;
					}

					.scroll-learnMore {
						margin-top: 4rpx;
						font-weight: 400;
						font-size: 24rpx;
						color: rgba(0, 0, 0, .5);
					}
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
		}

		.about {
			width: 690rpx;
			margin: 0 auto;
			margin-bottom: 200rpx;

			.about-title {
				margin-top: 40rpx;
				width: 100%;
				font-weight: 600;
				font-size: 32rpx;
				color: #000000;
			}

			.about-box {
				margin-top: 30rpx;
				background-color: #fff;
				padding: 0 30rpx;
				box-sizing: border-box;
				box-shadow: 0rpx 12rpx 24rpx 0rpx rgba(0, 0, 0, 0.02);
				border-radius: 40rpx;

				.li {
					height: 104rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1px solid rgba(0, 0, 0, .1);

					.li-left {
						display: flex;
						align-items: center;

						.img {
							margin-right: 20rpx;
							width: 44rpx;
							height: 44rpx;
						}

					}

					.li-right {}
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