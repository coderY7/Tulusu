<template>
	<view class="content">
		<view class="content-title">
			{{i18n.Advertise}}
		</view>
		<view class="banner">
			<view class="banner-title">
				{{i18n.experienceCard}}
			</view>
			<view class="times">
				<span>20</span>{{'/'+i18n.Times}}
			</view>
			<view class="btn">
				{{i18n.ActivateOneTime}}
			</view>
		</view>
		<view class="card-box">
			<view class="card-left">
				{{i18n.TimeLeft}}
			</view>
			<view class="card-right">
				00:00:00
			</view>
		</view>
		<view class="card-box2">
			<view class="card2-top">
				<view class="left">
					<image class="img" src="@/static/img/Advertise/3.png" mode=""></image>
					<view class="title">
						{{i18n.ExperienceCard}}
					</view>
				</view>
				<view class="right">
					<image class="img" src="@/static/img/Advertise/1.png" mode=""></image>
				</view>
			</view>
			<view class="card2-bottom">
				<view class="li">
					<view class="li-content">
						0
					</view>
					<view class="li-title">
						{{i18n.Finish}}
					</view>
				</view>
				<view class="li">
					<view class="li-content">
						0
					</view>
					<view class="li-title">
						{{i18n.NowProfit}}
					</view>
				</view>
				<view class="li">
					<view class="li-content">
						0
					</view>
					<view class="li-title">
						{{i18n.AllProceeds}}
					</view>
				</view>
			</view>
		</view>
<!--		<view class="top-tabs">-->
<!--			<view :class="[index === currentTab ? 'isActiveTab' : 'tab', 'tab-item']" v-for="(item, index) in tabList"-->
<!--				:key="item.index" @click="changeTab(index)">-->
<!--				<view class="tab-name">{{ item.name }}</view>-->
<!--			</view>-->
<!--		</view>-->
		<view class="ci-box" v-if="currentTab === 0">
			<view class="ci-li" v-for="(item,index) in newsList" :key="item.id"
				@click="goNew(item,i18n.CommunityInformatio)">
				<view class="ci-banner">
					<image class="img" :src="item.banner" alt="" mode="aspectFit"/>
				</view>
				<view class="ci-content">
					<view class="li-title">{{item.title}}</view>
					<view class="li-content">{{item.content}}</view>
				</view>
			</view>
		</view>
		<view class="ci-box" v-if="currentTab === 1">
			<view class="ci-li" v-for="(item,index) in newsList" :key="item.id"
				@click="goNew(item,i18n.CommunityInformatio)">
				<view class="ci-banner">
					<image class="img" :src="item.banner" alt="" />
				</view>
				<view class="ci-content">
					<view class="li-title">{{item.title}}</view>
					<view class="li-content">{{item.content}}</view>
				</view>
			</view>
		</view>
		<Tabbar :language="language" :current="'2'"></Tabbar>
	</view>
</template>

<script>
	import Tabbar from '@/components/tabbar/tabbar.vue';
	import {
		top2news,
	} from '@/api/api.js';
	export default {
		components: {
			Tabbar,

		},
		computed: {
			i18n() {
				return this.$t('message')
			}
		},
		data() {
			return {
				currentTab: 0,
				language: 'en',
				newsList: [],
				tabList: [{
						name: "網站廣告",
					},
					{
						name: "視訊廣告",
					},
				],
			}
		},
		
		onShow() {
			uni.hideTabBar({
				animation: false
			})
			this.language = uni.getStorageSync('language');
			this.top2news();
		},
		onLoad() {

			this.language = uni.getStorageSync('language');
			if (this.language === 'en') {
				uni.setStorageSync('language', 'en');
				this._i18n.locale = 'en'
			}
      if (this.language === 'cht')  {
				uni.setStorageSync('language', 'cht');
				this._i18n.locale = 'cht'
			}
		},

		methods: {
			changeTab(index) {
				this.currentTab = index;
			},
			// 新闻2
			top2news() {
				const obj = {
					"size": 999
				};
				top2news(obj).then((res) => {
					if (res.code === 200) {
						this.newsList = JSON.parse(JSON.stringify(res.data))
					}
				})
			},
      goNew(item, val) {
        this.$u.route('pages/news/news', {
          'content': JSON.stringify(item),
          'title': val
        });
      },
		},
	}
</script>

<style scoped lang="scss">
	.content {
		.content-title {
			font-weight: 600;
			font-size: 32rpx;
			color: #000000;
			line-height: 45rpx;
			text-align: center;
			padding-top: 88rpx;
		}

		.banner {
			width: 690rpx;
			height: 370rpx;
			margin: 0 auto;
			background: url(@/static/img/Advertise/2.png) no-repeat;
			background-size: 100% 100%;
			margin-top: 35rpx;
			padding-left: 30rpx;
			padding-top: 40rpx;
			box-sizing: border-box;

			.banner-title {
				width: 228rpx;
				height: 104rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 500;
				font-size: 44rpx;
				color: #FFFFFF;
				margin-bottom: 36rpx;
			}

			.times {
				color: #fff;
				font-family: PingFangSC, PingFang SC;
				font-weight: 600;
				font-size: 28rpx;
				margin-bottom: 26rpx;

				span {
					font-family: DINAlternate, DINAlternate;
					font-weight: bold;
					font-size: 44rpx;
				}
			}

			.btn {
				width: 195rpx;
				height: 40rpx;
				background: #FFFFFF;
				border-radius: 20rpx;
				color: #1534A6;
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				font-size: 24rpx;
				line-height: 40rpx;
				text-align: center;
			}
		}

		.card-box {
			width: 690rpx;
			margin: 0 auto;
			margin-top: 40rpx;
			height: 140rpx;
			background: #336AE2;
			box-shadow: 0rpx 12rpx 24rpx 0rpx rgba(0, 0, 0, 0.02);
			border-radius: 40rpx 40rpx 0 0;
			display: flex;
			justify-content: space-between;
			padding: 30rpx;
			box-sizing: border-box;

			.card-left {
				ont-family: PingFangSC, PingFang SC;
				font-weight: 600;
				font-size: 28rpx;
				color: #FFFFFF;
			}

			.card-right {
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				font-size: 28rpx;
				color: rgba(255, 255, 255, .5);
			}
		}

		.card-box2 {
			width: 690rpx;
			margin: 0 auto;
			margin-top: -50rpx;
			height: 260rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 12rpx 24rpx 0rpx rgba(0, 0, 0, 0.02);
			border-radius: 40rpx;
			padding: 30rpx;
			box-sizing: border-box;

			.card2-top {
				width: 100%;
				display: flex;
				justify-content: space-between;
				height: 45rpx;

				.left {
					display: flex;
					align-items: center;

					.img {
						width: 48rpx;
						height: 48rpx;
						margin-right: 22rpx;
					}

					.title {
						font-family: PingFangSC, PingFang SC;
						font-weight: 600;
						font-size: 32rpx;
						color: #000000;
					}
				}

				.right {
					.img {
						width: 48rpx;
						height: 48rpx;
					}
				}
			}

			.card2-bottom {
				margin-top: 38rpx;
				display: flex;
				justify-content: space-around;

				.li {
					.li-content {
						text-align: center;
						font-family: DINAlternate, DINAlternate;
						font-weight: bold;
						font-size: 40rpx;
						color: #000000;
					}

					.li-title {
						margin-top: 14rpx;
						text-align: center;
						font-family: PingFangSC, PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						color: rgba(0, 0, 0, .5);
					}
				}
			}
		}

		.top-tabs {
			width: 100%;
			display: flex;
			margin-top: 40rpx;

			.tab-item {
				padding-bottom: 10rpx;
				flex: 1;
				transition: transform 0.4s ease, border-bottom 0.4s ease;
			}

			.tab {
				border-bottom: 1px solid #d8d8d8;

				.tab-name {
					text-align: center;
					font-size: 28rpx;
					color: #000000;
				}
			}

			.isActiveTab {
				border-bottom: 1px solid #336ae2;
				transform: translateX(0);

				.tab-name {
					text-align: center;
					font-size: 28rpx;
					color: #000000;
				}
			}
		}
	}

	.ci-box {
		width: 690rpx;
		margin: 0 auto;
		margin-top: 30rpx;
		padding-bottom: 100rpx;
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
          max-height: 110rpx;
					font-weight: 400;
					font-size: 28rpx;
					color: rgba(0, 0, 0, .5);
					line-height: 34rpx;
					text-align: left;
          text-overflow:ellipsis
				}
			}
		}
	}
</style>