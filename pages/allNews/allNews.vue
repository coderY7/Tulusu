<template>
	<view class="content" style="padding: 0;">
		<returnBack :title="title" :bgc="'transparent'"></returnBack>
		<scroll-view v-if="list.length > 0 && !loading" class="content-box" scroll-y @scrolltolower="loadMore"
			:refresher-triggered="refresherTriggered">

			<view class="ci-box" v-if="list">
				<view class="ci-li" v-for="(item,index) in list" :key="item.id"
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
		</scroll-view>
		<view class="empt" v-if="list.length === 0  || loading">
			<image style="width: 430rpx;height: 322rpx;" src="@/static/img/index/empt.png" mode=""></image>
		</view>
		<view class="" v-if="loading">
			<u-loading-icon></u-loading-icon>
		</view>
		<!-- <view class="" v-if="refresherTriggered">
			<u-loading-icon></u-loading-icon>
		</view> -->
	</view>
</template>

<script>
	import {
		top2news,
		userAcceptQuestionnaire,
		newQuestionnaire,
	} from "@/api/api.js";
	export default {

		computed: {
			i18n() {
				return this.$t("message");
			},
		},

		data() {
			return {
				loading: false,
				refresherTriggered: false,
				language: "cht",
				list: [],
				// 或者如下，也可以配置keyName参数修改对象键名
				// list: [{name: '未付款'}, {name: '待评价'}, {name: '已付款'}],
				current: 0,
				currentTab: 0,
				size: 10,
				parmsObj: {},
				title: '',
			};
		},
		onLoad(parms) {
			this.title = parms.title
		},
		onShow() {
			uni.hideTabBar({
				animation: false,
			});
			this.language = uni.getStorageSync("language");
			this.getBarList();
		},
		methods: {
			goNew(item, val) {
				this.$u.route('pages/news/news', {
					'content': JSON.stringify(item),
					'title': val
				});
			},
			getBarList() {
				this.top2news();
			},
			
			loadMore() {
				// if (Number(this.total) === this.list.length || this.loading) {
				// 	return
				// }
				uni.showLoading({
					title: 'loading...',
				});
				this.refresherTriggered = true
				this.parmsObj.size += 10;
				top2news(this.parmsObj).then((res) => {
					uni.hideLoading();
					if (res.code === 200) {
						this.list = res.data;
						this.refresherTriggered = false;
						this.loading = false;
					}
				});
			},
			top2news() {
				this.loading = true;
				var obj = {
					size: this.size,
				};

				this.parmsObj = JSON.parse(JSON.stringify(obj))

				top2news(obj).then((res) => {
					if (res.code === 200) {
						// this.total = res.data.total;
						this.list = [];
						this.list = res.data;
						this.loading = false;
					} else {
						this.loading = false;
					}
				});

			},
		},
	};
</script>

<style scoped lang="scss">
	.content {
		.content-title {
			width: 100%;
			margin-top: 88rpx;
			text-align: center;
			font-weight: 600;
			font-size: 32rpx;
			color: #000000;
		}

		.top-bar {
			width: 690rpx;
			margin: 0 auto;

			.bar {
				margin-top: 34rpx;
				height: 110rpx;
				border-radius: 65rpx;

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

		.content-box {
			margin-top: 150rpx;
			overflow-y: auto;
			height: calc(100VH - 300rpx);

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

		.empt {
			margin-top: 350rpx;
			text-align: center;
		}
	}

	/deep/ .u-subsection__bar {
		border-radius: 65rpx !important;
		background-color: #336ae2 !important;
	}
</style>