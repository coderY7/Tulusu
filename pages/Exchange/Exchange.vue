<template>
	<view class="content" style="padding-bottom: 0;">
		<returnBack :title="i18n.Exchange" :bgc="'#f7f7f7'"></returnBack>
		<scroll-view class="box" scroll-y @scrolltolower="loadMore">
			<view class="item-box">
				<view class="item u-border-bottom" v-for="item in goodsList" :key="item.id" @click="ExchangeItem(item)">
					<view class="img-box">
						<image class="img" :src="item.banner" mode="aspectFit"></image>
					</view>
					<view class="text">
						<view class="title">
							{{ item.title }}
						</view>
						<view class="priceAndHeart">
							<view class="price">
								<image class="img" src="@/static/img/index/hb.png" mode=""></image>
								<span>{{ item.price }}</span>
							</view>
							<view class="heart">
<!--								<span>{{ item.likeCount }}</span>-->
<!--								<image @click.stop ="likeGoods(item)" v-if="!item.hasLike" class="img" src="@/static/img/index/heart1.png"-->
<!--									mode=""></image>-->
<!--								<image v-else class="img" src="@/static/img/index/heart.png"-->
<!--									mode="">-->
<!--								</image>-->
							</view>
						</view>
					</view>
				</view>
				<view class="loading-box" v-if="loading">
					<view class="text">{{stute}}</view><u-loading-icon></u-loading-icon>
				</view>
			</view>
		</scroll-view>
		<u-modal width="400rpx" @confirm="confirm" @cancel="cancel" showCancelButton :show="show"
			:content='i18n.ExchangeGoods' :confirmText='i18n.Confirm' :cancelText='i18n.Cancel'></u-modal>
	</view>
</template>

<script>
	import returnBack from '@/components/returnBack/returnBack.vue'
	import {
		goodsPage,
		orderExchange,
		likeGoods,
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
				type: "",
				page: 1,
				size: 10,
				goodsList: [],
				totle: 0,
				statusBarHeight: 132,
				parmsOBJ: {},
				loading: false,
				stute: "",
				show: false,
				goodsItem: {},
			}
		},
		onLoad(parms) {
			this.goodsPage(parms)
		},
		mounted() {
			uni.getSystemInfo({
				success: (res) => {
					this.statusBarHeight = res.statusBarHeight * (750 / res.windowWidth) + this
						.statusBarHeight;
					if (this.statusBarHeight === 48) {
						this.statusBarHeight = 136
					}

				}
			});
		},

		methods: {
			likeGoods(item) {
				likeGoods({"id": item.id}).then((res) => {
					if (res.code === 200) {
						item.hasLike = true;
						item.likeCount = Number(item.likeCount) + 1
					}
				})
			},
			ExchangeItem(item) {
				uni.setStorageSync("goods", JSON.stringify(item));
				this.$u.route('pages/goodsInfo/goodsInfo');
			},
			confirm() {
			},
			cancel() {
				this.show = false;
			},
			loadMore() {
				if (this.goodsList.length >= Number(this.totle) || this.loading) return;
				this.loading = true;
				this.stute = this.i18n.LoadingText;
				this.parmsOBJ.page = ++this.page;
				goodsPage(this.parmsOBJ).then((res) => {
					if (res.code === 200) {
						this.$nextTick(() => {
							this.goodsList = [...this.goodsList, ...res.data.records];
						})
						if (this.goodsList.length < Number(this.totle)) {
							this.stute = this.i18n.LoadMoreText
						} else {
							this.stute = this.i18n.NoMoreText
						}
						this.loading = false
					} else {
						this.loading = false
					}
				})
			},
			goodsPage(parms) {
				const obj = {
					"keyword": "",
					"page": this.page,
					"size": this.size,
					"title": "",
					"type": ""
				}
				if (parms.code === '0') {
					obj.type = ''
				}
				if (parms.code === '1') {
					obj.type = '1'
				}
				if (parms.code === '2') {
					obj.type = '2'
				}
				this.parmsOBJ = JSON.parse(JSON.stringify(obj))
				this.loading = true;
				goodsPage(obj).then((res) => {
					if (res.code === 200) {
						this.loading = false
						this.goodsList = res.data.records
						this.totle = res.data.total
						if (this.goodsList.length < Number(this.totle)) {
							this.stute = this.i18n.LoadMoreText
						} else {
							this.stute = this.i18n.NoMoreText
						}

					} else {
						this.loading = false
					}
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.content {
		padding: 0 30rpx;
		box-sizing: border-box;
		height: 100vh;

		.box {
			height: calc(100VH - 10rpx);
		}

		.item-box {
			margin-top: 142rpx;
			width: 690rpx;
			display: flex;
			flex-wrap: wrap;

			.item {
				width: 330rpx;
				height: 460rpx;
				margin-bottom: 30rpx;
				border-radius: 40rpx;
				overflow: hidden;

				.img-box {

					width: 330rpx;
					height: 300rpx;
					background-color: #FFF;

					.img {
						width: 100%;
						height: 100%;
					}
				}

				.text {
					padding: 30rpx;
					background-color: #fff;
					box-sizing: border-box;
					height: 160rpx;

					.title {
						font-weight: 600;
						font-size: 28rpx;
						color: #000000;
						margin-bottom: 20rpx;
						white-space:nowrap;
					}

					.priceAndHeart {
						display: flex;
						justify-content: space-between;

						.price {
							display: flex;
							align-items: center;
							font-weight: bold;
							font-size: 32rpx;
							color: #000000;

							.img {
								margin-right: 10rpx;
								width: 40rpx;
								height: 40rpx;
							}
						}

						.heart {
							display: flex;
							align-items: center;
							font-weight: bold;
							font-size: 32rpx;
							color: rgba(0, 0, 0, .5);

							.img {
								margin-left: 4rpx;
								width: 40rpx;
								height: 40rpx;
							}
						}
					}
				}
			}
		}

		.item-box> :nth-child(odd) {
			margin-right: 30rpx;
			box-sizing: border-box;
		}

		.loading-box {
			margin-top: 100rpx;
			width: 100%;
			text-align: center;

			.text {
				margin: 20rpx;
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