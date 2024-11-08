<template>
	<view class="content" style="padding: 0;">
		<returnBack :title="i18n.Pointsrecord" :bgc="'transparent'"></returnBack>
		<scroll-view v-if="list.length > 0 && !loading" class="content-box" scroll-y @scrolltolower="loadMore"
			:refresher-triggered="refresherTriggered">

			<view  v-for="(item, index) in list" :key="index">
        <view class="content-item" v-if="item.recordType==2" @click="itemtype(item)">
          <view class="content-left">
            <view class="img">
              <image style="width: 100%; height: 100%;" src="@/static/img/index/hb.png" mode=""></image>
            </view>
            <view class="text">
              <view class="title">
                {{item.intro}}
              </view>
              <view class="reward">
                {{item.created}}
              </view>
            </view>
          </view>
          <view class="content-right">
            <view class="right-unit">{{item.recordType === 1 ? '+':'-'}}	{{item.point}} E</view>


            <!--					<image style="width: 100%; height: 100%;" src="@/static/img/index/daona.png" mode=""></image>-->
          </view>
        </view>
        <view class="content-item" v-if="item.recordType==3">
          <view class="content-left">
            <view class="img">
              <image style="width: 100%; height: 100%;" src="@/static/img/index/hb.png" mode=""></image>
            </view>
            <view class="text">
              <view class="title">
                {{item.intro}}
              </view>
              <view class="reward">
                {{item.created}}
              </view>
            </view>
          </view>
          <view class="content-right">
            <view class="right-unit">{{item.recordType === 1 ? '+':'-'}}	{{item.point}} E</view>
            <view class="right-unit-state" v-if="item.usdtState==0">{{i18n.usdtState0}}</view>
            <view class="right-unit-state" style="color: #336ae2" v-if="item.usdtState==1">{{i18n.usdtState1}}</view>
            <view class="right-unit-state" style="color: red" v-if="item.usdtState==2">{{i18n.usdtState2}}</view>
            <!--					<image style="width: 100%; height: 100%;" src="@/static/img/index/daona.png" mode=""></image>-->
          </view>
        </view>
        <view class="content-item" v-if="item.recordType==4" >
          <view class="content-left">
            <view class="img">
              <image style="width: 100%; height: 100%;" src="@/static/img/index/hb.png" mode=""></image>
            </view>
            <view class="text">
              <view class="title">
                {{item.intro}}
              </view>
              <view class="reward">
                {{item.created}}
              </view>
            </view>
          </view>
          <view class="content-right">
            <view class="right-unit">{{item.recordType == 4 ? '+':'-'}}	{{item.point}} E</view>


            <!--					<image style="width: 100%; height: 100%;" src="@/static/img/index/daona.png" mode=""></image>-->
          </view>
        </view>
        <view class="content-item" v-if="item.recordType==5" >
          <view class="content-left">
            <view class="img">
              <image style="width: 100%; height: 100%;" src="@/static/img/index/hb.png" mode=""></image>
            </view>
            <view class="text">
              <view class="title">
                {{item.intro}}
              </view>
              <view class="reward">
                {{item.created}}
              </view>
            </view>
          </view>
          <view class="content-right">
            <view class="right-unit">{{item.recordType == 5 ? '-':'-'}}	{{item.point}} E</view>


            <!--					<image style="width: 100%; height: 100%;" src="@/static/img/index/daona.png" mode=""></image>-->
          </view>
        </view>
        <view class="content-item" v-if="item.recordType==6" >
          <view class="content-left">
            <view class="img">
              <image style="width: 100%; height: 100%;" src="@/static/img/index/hb.png" mode=""></image>
            </view>
            <view class="text">
              <view class="title">
                {{item.intro}}
              </view>
              <view class="reward" >
                Email:{{item.userEmail}}
              </view>
              <view class="reward">
                {{item.created}}
              </view>
            </view>
          </view>
          <view class="content-right">
            <view class="right-unit">{{item.recordType == 6 ? '+':'-'}}	{{item.point}} E</view>


            <!--					<image style="width: 100%; height: 100%;" src="@/static/img/index/daona.png" mode=""></image>-->
          </view>
        </view>


        <view class="content-item" v-if="item.recordType!=2 &&item.recordType!=3&&item.recordType!=4&&item.recordType!=5&&item.recordType!=6">
          <view class="content-left">
            <view class="img">
              <image style="width: 100%; height: 100%;" src="@/static/img/index/hb.png" mode=""></image>
            </view>
            <view class="text">
              <view class="title">
                {{item.intro}}
              </view>
              <view class="reward">
                {{item.created}}
              </view>
            </view>
          </view>
          <view class="content-right">
            <view class="right-unit">{{item.recordType === 1 ? '+':'-'}}	{{item.point}} E</view>
            <!--					<image style="width: 100%; height: 100%;" src="@/static/img/index/daona.png" mode=""></image>-->
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
		recordpoint,
	} from "@/api/api.js";
  import dayjs from 'dayjs'
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
				page:1,
				total:0,
				parmsObj: {},
				title: '',
			};
		},
		onLoad(parms) {
			this.title = parms.title
			this.change = parms.change
		},
		onShow() {
			uni.hideTabBar({
				animation: false,
			});
			this.language = uni.getStorageSync("language");
			this.getBarList();
		},
		methods: {
      itemtype(data){
        uni.setStorageSync("itemdata",data);
        uni.navigateTo({
          url: `/pages/wiview/wiview`
        })
      },
			getBarList() {
				this.recordpoint();
				// this.unacceptedTasks();tabList
			},

			getdataList() {},
			loadMore() {
				if (Number(this.total) === this.list.length || this.loading) {
					return
				}
				uni.showLoading({
					title: 'loading...',
				});
				this.refresherTriggered = true
				this.parmsObj.page += 1;
				recordpoint(this.parmsObj).then((res) => {
					uni.hideLoading();
					if (res.code === 200) {
						let arr = res.data.records
						this.list = [...this.list, ...arr];
						console.log(this.list)
						this.refresherTriggered = false;
						this.loading = false;
					}
				});
			},
			recordpoint() {
				this.loading = true;
				var obj = {
					size: this.size,
					page: this.page,
				};
				this.parmsObj = JSON.parse(JSON.stringify(obj))
				recordpoint(obj).then((res) => {
					if (res.code === 200) {
						// this.total = res.data.total;
						this.list = [];
						this.list = res.data.records;
            this.list.forEach((item)=>{
              item.created=dayjs.unix(item.created/1000).format('YYYY-MM-DD HH:mm:ss')
            })
						this.total = res.data.total
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
			height: calc(100VH - 200rpx);

			.content-item {
				padding: 30rpx;
				width: 92%;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				height: 190rpx;
				margin: 0 auto;
				background-color: #fff;
				box-shadow: 0rpx 12rpx 24rpx 0rpx rgba(0, 0, 0, 0.02);
				border-radius: 40rpx;
				margin-top: 32rpx;

				.content-left {
					display: flex;
					align-items: center;

					.img {
            width: 110rpx;
						height: 110rpx;
						margin-right: 30rpx;
            margin-bottom: 20rpx;
						//border-radius: 50%;
						overflow: hidden;
					}

					.text {
						.title {
							font-family: PingFangSC, PingFang SC;
							font-weight: 600;
							font-size: 32rpx;
							color: rgba(0, 0, 0, 1);
							margin-top: -10rpx;
							margin-bottom: 8rpx;
						}

						.reward {
							font-family: PingFangSC, PingFang SC;
							font-weight: 400;
							font-size: 28rpx;
							color: rgba(0, 0, 0, .5);
              max-width: 300rpx;
              overflow-x: auto;
              user-select: text;
						}
					}
				}

				.content-right {
					display: flex;
           flex-direction: column;
          justify-content: center;
          align-items: center;
          .right-unit{
            font-family: PingFangSC, PingFang SC;
            font-weight: 600;
            font-size: 32rpx;
          }
          .right-unit-state{
            font-family: PingFangSC, PingFang SC;
            font-weight: 500;
            font-size: 28rpx;
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
  /deep/ .reward::-webkit-scrollbar {
    /* 隐藏滚动条，但依旧具备可以滚动的功能 */
    /* 隐藏下划线的样式 */
    border-bottom: none;
    display: none; /* 隐藏滚动条 */
  }
</style>