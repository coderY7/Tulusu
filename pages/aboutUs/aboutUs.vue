<template>
	<view class="content" style="overflow-y: hidden;height:100VH;box-sizing: border-box;">
		<returnBack :titleColor="'#fff'" :bgc="'transparent'" :title="i18n.CompanyIntroduction"></returnBack>
		<view class="about-title">
			<view class="left">
				<view class="ourH">
					{{i18n.OurHistory}}
				</view>
<!--				<view class="redDL">-->
<!--					{{i18n.ReadThePassage}}-->
<!--				</view>-->
			</view>
			<view class="right">
				<image class="img" src="@/static/img/aboutUs/2.png" mode=""></image>
			</view>
		</view>
		<view class="about-content" v-if="list.length>0">
			<view class="content-item" v-for="(item, index) in list" :key="index">
				<view class="content-title">
					<image class="img" src="@/static/img/aboutUs/3.png" mode=""></image>
					<span>{{ item.title }}</span>
				</view>
				<view class="content-passage">
					{{ item.content }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import returnBack from '@/components/returnBack/returnBack.vue'
	import {
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
				statusBarHeight: 137,
				language: 'en',
				list: [],
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
					if (res.code === 200) {
						const convertObjectToArray = (obj) => {
							return Object.keys(obj).map(key => ({
								title: key,
								content: obj[key]
							}));
						};

						this.list = convertObjectToArray(res.data.companyIntro);
						console.log(this.list)
					}
				})
			},

		}
	}
</script>

<style scoped  lang="scss">
	.content {
		height: 100VH;
		padding: 0 30rpx;
		background: url(@/static/img/aboutUs/1.png);
		background-size: 100% 100%;

		.about-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 230rpx;

			.left {

				.ourH {
					font-weight: 600;
					font-size: 44rpx;
					color: #FFFFFF;
				}

				.redDL {
					margin-top: 8rpx;
					font-family: PingFangSC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: rgba(255, 255, 255, .5);
				}
			}

			.right {
				margin-right: 37rpx;

				.img {
					width: 280rpx;
					height: 240rpx;
				}
			}
		}

		.about-content {
			margin-top: -10rpx;
			width: 100%;
			background-color: #fff;
			padding: 30rpx;
			box-sizing: border-box;
			border-radius: 40rpx;
      height: 60vh;
      overflow: scroll;
			.content-item {
				margin-bottom: 40rpx;
				width: 100%;
				.content-title{
					display: flex;
					align-items: center;
					margin-bottom: 20rpx;
					.img{
						width: 40rpx;
						height: 28rpx;
					}
					span {
						margin-left: 18rpx;
						font-weight: 600;
						font-size: 32rpx;
						color: #000000;
					}
				}
				.content-passage{
					font-family: PingFangSC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: rgba(0, 0, 0, .5);
				}
			}
		}
	}
	/deep/ .about-content::-webkit-scrollbar {
		/* 隐藏滚动条，但依旧具备可以滚动的功能 */
		/* 隐藏下划线的样式 */
		  border-bottom: none;
			 display: none; /* 隐藏滚动条 */
		}
</style>