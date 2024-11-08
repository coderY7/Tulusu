<template>
	<view class="content">
		<!-- <button @tap="change1">切换成繁体中文</button>
		<button @tap="change2">切换成英文</button>
		<button@tap="showToast">切换语言后消息提示框</button> -->
		<view class="head">
			<view class="head-title">
				
			</view>
			<view class="user-box">
				<view class="name">{{i18n.TotalRewards}}</view>
				<view class="money"><span>$</span>{{rewardCount}}</view>
			</view>
			<view class="bgier">
				<view class="li" @click="iscountAll">
					<image class="img" src="@/static/img/index/yx.png" mode=""></image>
					<view class="title">{{i18n.AllQuestions}}</view>
					<view class="yx">{{sumQ}}</view>
				</view>
				<view class="li">
					<image class="img" src="@/static/img/index/yx.png" mode=""></image>
					<view class="title">{{i18n.Finish}}</view>
					<view class="yx">{{passRate}}</view>
				</view>
			</view>
		</view>
		<view class="online-box" @click="lookAt(i18n.remainingTasks)">
			<view class="online-box-left">
				<view class="online-title">{{i18n.TodaysRemainingTa}}</view>
				<view class="online">
					<view class="online-unmber">{{i18n.ToComplete}}</view>
				</view>
			</view>
			<view class="online-box-right">
				<view class="online-right-nbr">{{countUnaccepted}}</view>
				<view class="online-right-img">
					<image class="img" src="@/static/img/index/hb.png" alt="" />
				</view>
			</view>
		</view>


    <view class="ywlist">
      <u-swiper
          :list="ywlist"
          @change="ywchange"
          @click="ywclick"
      ></u-swiper>
    </view>


<!--		<view class="yw-box">-->
<!--			<view class="yw-title">{{i18n.SurveyAnswersEarnUnexpectedRewards}}</view>-->
<!--			<view class="yw-learnmore">{{i18n.LearnMore}}</view>-->
<!--		</view>-->

		<view class="new-record">
			<view class="record-title">
				<view class="record-title-text">{{i18n.LatestQuestionnaire}}</view>
				<view class="record-title-more" @click="lookAt(i18n.LatestQuestionnaire)">
					<image class="img" src="@/static/img/index/sgd.png" alt="" />
				</view>
			</view>
			<view class="record-list" v-for="item in unacceptedTasksList" :key="item.id">
				<view class="record-list-left">
					<image class="img" src="@/static/img/index/record-list-left.png" alt="" />
				</view>
				<view class="record-list-right">
					<view class="record-list-type">
						<view class="record-list-type-img">
							<image class="img" :src="item.business.banner" alt="" />
						</view>
						<view class="record-list-type-text">{{item.business.title}}</view>
					</view>
					<view class="record-list-content">{{item.intro}}</view>
					<view class="record-list-click">
						<view class="record-list-learnmore" @click="goQuestions(item)">{{i18n.Getquestionnaire}}</view>
						<view class="record-list-heart">
              <view style="font-weight: 400;font-size: 12px;">{{i18n.residuedegree}} :{{item.remainingTimes}}</view>

<!--							<image class="img" src="@/static/img/index/heart.png" alt="" /> <span-->
<!--								class="record-list-heart-text">{{item.likeCount}}</span>-->
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="completed-record">
			<view class="record-title">
				<view class="record-title-text">{{i18n.Finish}}</view>
				<view class="record-title-more" @click="goRecod">
					<image class="img" src="@/static/img/index/sgd.png" alt="" />
				</view>
			</view>
			<view class="record-list" v-for="item in completedTasksList" :key="item.id">
				<view class="record-list-left">
					<image class="img" src="@/static/img/index/record-list-left1.png" alt="" />
				</view>
				<view class="record-list-right">
					<view class="record-list-type">
						<view class="record-list-type-img">
							<image class="img" :src="item.business.banner" alt="" />
						</view>
						<view class="record-list-type-text">{{item.business.title}}</view>
					</view>
					<view class="record-list-content">{{item.intro}}</view>
					<view class="record-list-click">
						<view class="record-list-learnmore">{{i18n.LearnMore}}</view>
						<view class="record-list-heart">
<!--							<image class="img" src="@/static/img/index/heart1.png" alt="" /> <span-->
<!--								class="record-list-heart-text">{{item.likeCount}}</span>-->
						</view>
					</view>
				</view>
			</view>
		</view>
		<Tabbar :language="language" :current="'1'"></Tabbar>
	</view>
</template>

<script>
	import Tabbar from '@/components/tabbar/tabbar.vue';
	import {
		unacceptedTasks,
		completedTasks,
		taskCountQuestionnaire,
		userAcceptQuestionnaire,
		questionnaireState,
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
				sumQ:0,
				title: 'Hello',
				language: 'en',
				userInfo: {
					name: "大山猛",
					money: 8000,
				},
        countAll:'',
				countPass: '0', //今日结算任务数量
				countUnaccepted: '0', //今日剩余任务数量		
				passRate: '0%', //今日任务通过率	
				rewardCount: '0', //奖励总计
				completedTasksList: [],
				unacceptedTasksList: [],
				recordList: [],
                ywlist: [],
			}
		},
		created() {
			
		},
		onShow() {
			uni.hideTabBar({
				animation: false
			})
			this.language = uni.getStorageSync('language');
			this.getdataList();
			this.ywlist=uni.getStorageSync('banners');
			console.log(this.ywlist)
		},
		onLoad() {},
		methods: {
      iscountAll(){
        this.$u.route('pages/allInvestigation/allInvestigation',{'title':this.i18n.AllQuestions});
      },
			lookAt(val){
				this.$u.route('pages/allInvestigation/allInvestigation',{'title':val});
			},
			goRecod(){
				uni.setStorageSync("goRecod", 2);
				uni.switchTab({
					url: '/pages/index/Record',
				})
			},
			goQuestions(item) {
				uni.showLoading({
					title: 'loading...',
				});
				questionnaireState({
					"id": item.id
				}).then((res) => {
					if (res.code === 404) {
						userAcceptQuestionnaire({
							"questionnaireId": item.id
						}).then((ress) => {
							uni.hideLoading();
							if (ress.code === 200) {
                item.id=ress.data.id
								this.$u.route('pages/questions/questions', item);
							}
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
						})
					} else {
						uni.hideLoading();
						this.$refs.uToast.show({
							message: this.i18n.Youhaveacceptedthistask
						})
					}
			
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
				this.completedTasks();
				this.unacceptedTasks();
				this.taskCountQuestionnaire();
			},
			// 全部问卷
			taskCountQuestionnaire() {
				taskCountQuestionnaire().then((res) => {
					if (res.code === 200) {
            this.countAll=res.data.countAll
						this.countPass = res.data.countPass //今日结算任务数量
						this.countUnaccepted = res.data.countUnaccepted //今日剩余任务数量		
						this.passRate = res.data.passRate //今日任务通过率	
						this.rewardCount = res.data.rewardCount ? res.data.rewardCount : '0.00' //奖励总计
						console.log(this.countPass,this.countUnaccepted)
						//this.sumQ = Number(this.countPass) + Number(this.countUnaccepted)
            this.sumQ =res.data.countAll

					}
				})
			},
			// 已完成问卷
			completedTasks() {
				const obj = {
					"size": 2
				}
				completedTasks(obj).then((res) => {
					if (res.code === 200) {
						this.completedTasksList = res.data
					}
				})
			},
			// 未完成问卷
			unacceptedTasks() {
				const obj = {
					"size": 2
				}
				unacceptedTasks(obj).then((res) => {
					if (res.code === 200) {
						this.unacceptedTasksList = res.data
						
					}
				})
			},
		}
	}
</script>

<style scoped  lang="scss">
	.content {
		.head {
			width: 100%;
			background: url(@/static/img/index/bgc2.png);
			background-size: 100% 100%;
			height: 880rpx;
			box-sizing: border-box;
			color: #fff;

			.head-title {
				display: flex;
				justify-content: space-between;
				padding: 0 40rpx;
				box-sizing: border-box;
				height: 270rpx;
			}

			.user-box {
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
				display: flex;
				justify-content: space-around;
				width: 412rpx;
				margin: 0 auto;
				margin-top: 90rpx;

				.li {
					text-align: center;
					flex: 1;

					.img {
						width: 110rpx;
						height: 110rpx;

						.img {
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

					.yx {
						font-weight: bold;
						font-size: 40rpx;
						color: #FFFFFF;
						margin-top: -130rpx;
					}
				}
			}
		}

		.online-box {
			width: 92%;
			height: 148rpx;
			margin: 0 auto;
			margin-top: -74rpx;
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

					.online-unmber {
						font-weight: 400;
						font-size: 24rpx;
						color: rgba(0, 0, 0, .5);
						text-align: left;
					}
				}
			}

			.online-box-right {
				/* width: 158rpx; */
				/* height: 149rpx; */
				display: flex;
				align-items: center;

				.online-right-nbr {
					font-weight: bold;
					font-size: 44rpx;
					color: #336AE2;
					margin-right: 10rpx;
				}

				.online-right-img {
					width: 50rpx;
					height: 50rpx;

					.img {
						width: 100%;
						height: 100%;
					}
				}

			}
		}
    .ywlist{
      width: 690rpx;
      height: 272rpx;
      margin: 0 auto;
      margin-top: 30rpx;
      box-sizing: border-box;
    }

		.yw-box {
			width: 690rpx;
			height: 272rpx;
			margin: 0 auto;
			margin-top: 30rpx;
			padding: 37rpx 30rpx;
			padding-right: 324rpx;
			box-sizing: border-box;
			background: url(@/static/img/index/bgc3.png);
			background-size: 100% 100%;

			.yw-title {
				width: 336rpx;
				height: 90rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 600;
				font-size: 32rpx;
				color: #000000;
				line-height: 45rpx;
			}

			.yw-learnmore {
				width: 180rpx;
				margin-top: 36rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 50rpx;
				background: #336AE2;
				border-radius: 26rpx;
				font-weight: 400;
				font-size: 28rpx;
				color: #FFFFFF;
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

		.completed-record {
			width: 92%;
			margin: 0 auto;
			margin-top: 80rpx;
			margin-bottom: 200rpx;
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
				background: #E2E2E2;
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
						}
					}

					.record-list-content {
						max-width: 100%;
						margin-top: 20rpx;
						font-weight: 600;
						font-size: 32rpx;
						color: rgba(0, 0, 0, .7);
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
							color: rgba(0, 0, 0, .3);
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
								line-height: 32rpx;
							}
						}
					}
				}
			}
		}

	}
</style>