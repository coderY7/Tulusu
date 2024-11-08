<template>
	<view class="content" style="padding: 0;">
		<returnBack :title="title" :bgc="'transparent'"></returnBack>

    <view style="margin-top:130rpx;width:100vw;display: flex;justify-content: center">
      <view style="width: 100%;display: flex;align-items: center;justify-content: center">
        <view style="width:25%">
          <uni-data-select
              :clear=false
              v-model="value"
              :placeholder="i18n.Searchtype"
              :localdata="range"
          ></uni-data-select>
        </view>
        <view style="width: 60%;margin-left: 3px">
          <u-search placeholder="" :actionText="i18n.search" v-model="keyword" @custom="issearch()">
          </u-search>
        </view>
      </view>
    </view>

		<scroll-view v-if="list.length > 0 && !loading" class="content-box" scroll-y @scrolltolower="loadMore"
			:refresher-triggered="refresherTriggered">

			<view class="content-item" v-for="(item, index) in list" :key="index" @click="goQuestion(item)">
				<view class="content-left">
					<view class="img">
						<image style="width: 100%; height: 100%;" :src="item.business.logo" mode=""></image>
					</view>
					<view class="text">
						<view class="title">
							{{ item.business.title }}
						</view>
            <view style="font-weight: 400;font-size: 14px;margin-right: 5px;color: rgba(0, 0, 0, .5);">{{i18n.residuedegree}} :{{item.remainingTimes}}</view>

						<view class="reward">
							{{ i18n.AnswerReward + ' ' + item.reward }}
						</view>
					</view>
				</view>
				<view class="content-right">
					<image style="width: 100%; height: 100%;" src="@/static/img/index/daona.png" mode=""></image>
				</view>
			</view>
		</scroll-view>
		<view class="empt" v-if="list.length === 0  || loading">
			<image style="width: 430rpx;height: 322rpx;" src="@/static/img/index/empt.png" mode=""></image>
		</view>
		<view class="" v-if="loading">
			<u-loading-icon></u-loading-icon>
		</view>
    <u-toast ref="uToast"></u-toast>

		<!-- <view class="" v-if="refresherTriggered">
			<u-loading-icon></u-loading-icon>
		</view> -->
	</view>
</template>

<script>
	import {
		unacceptedTasks,
		userAcceptQuestionnaire,
		newQuestionnaire,
    userAcceptpage,
		questionnaireState,
	} from "@/api/api.js";
	export default {

		computed: {
			i18n() {
				return this.$t("message");
			},
		},

		data() {
			return {
        keyword:'',
        value: 0,
        range: [],
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
        page:1,
        pages:''
			};
		},
		onLoad(parms) {
			this.title = parms.title
			this.change = parms.change
		},
		onShow() {
      this.page=1
			uni.hideTabBar({
				animation: false,
			});
			this.language = uni.getStorageSync("language");
			this.getBarList();
      this.range=[
        { value: 0, text: this.i18n.type0 },
        { value: 1, text: this.i18n.type1 },
        { value: 2, text: this.i18n.type2 },
        { value: 3, text: this.i18n.type3 },
      ]
      // type0:'标题搜索',
      //     type1:'问卷ID',
      //     type2:'商户ID',
      //     type3:'商户名字',
		},
		methods: {
      issearch(){
        this.page=1
        this.unacceptedTasks()
      },
			getBarList() {
				this.unacceptedTasks(0);
			},
			goQuestion(item) {
				uni.showLoading({
					title: 'loading...',
				});
        userAcceptQuestionnaire({
          "questionnaireId": item.id
        }).then((ress) => {
          uni.hideLoading();
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
			//getdataList() {},
			loadMore() {
				if (this.page>this.pages) {
          this.$refs.uToast.show({
            message: this.i18n.intheend
          })
					return
				}
				uni.showLoading({
					title: 'loading...',
				});
				this.refresherTriggered = true
        this.page+=1
        let obj={}
        if(this.value==0){
          obj = {
            "keyword":this.keyword,
            "page":this.page,
            "size": 10,
            "businessId": '',
            "questionnaireId": '',
            "businessName":''
          }
        }
        if(this.value==1){
          obj = {
            "keyword":'',
            "page":this.page,
            "size": 10,
            "businessId": '',
            "questionnaireId": this.keyword,
            "businessName":''
          }
        }
        if(this.value==2){
          obj = {
            "keyword":'',
            "page":this.page,
            "size": 10,
            "businessId": this.keyword,
            "questionnaireId": '',
            "businessName":''
          }
        }
        if(this.value==3){
          obj = {
            "keyword":'',
            "page":this.page,
            "size": 10,
            "businessId": '',
            "questionnaireId": '',
            "businessName":this.keyword
          }
        }
        userAcceptpage(obj).then((res) => {
					uni.hideLoading();
					if (res.code === 200) {
						//let arr = res.data
            res.data.records.forEach((item)=>{
              this.list.push(item);
            })
						//this.list.push(res.data.records);
						this.refresherTriggered = false;
						this.loading = false;
					}
				});
			},
			unacceptedTasks() {
        let obj={}
        if(this.value==0){
          obj = {
            "keyword":this.keyword,
            "page":this.page,
            "size": 10,
            "businessId": '',
            "questionnaireId": '',
            "businessName":''
          }
        }
        if(this.value==1){
           obj = {
            "keyword":'',
            "page":this.page,
            "size": 10,
            "businessId": '',
            "questionnaireId": this.keyword,
             "businessName":''
          }
        }
        if(this.value==2){
          obj = {
            "keyword":'',
            "page":this.page,
            "size": 10,
            "businessId": this.keyword,
            "questionnaireId": '',
            "businessName":''
          }
        }
        if(this.value==3){
          obj = {
            "keyword":'',
            "page":this.page,
            "size": 10,
            "businessId": '',
            "questionnaireId": '',
            "businessName":this.keyword
          }
        }
				this.loading = true;


				this.parmsObj = JSON.parse(JSON.stringify(obj))
				if (this.change) {
          userAcceptpage(obj).then((res) => {
						if (res.code === 200) {
							// this.total = res.data.total;
							this.list = [];
							this.list = res.data.records;
              this.pages=res.data.pages
							this.loading = false;
						} else {
							this.loading = false;
						}
					});
				} else {
          userAcceptpage(obj).then((res) => {
						if (res.code === 200) {
							// this.total = res.data.total;
							this.list = [];
							this.list = res.data.records;
              this.pages=res.data.pages
							this.loading = false;
						} else {
							this.loading = false;
						}
					});
				}
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
			margin-top: 70rpx;
			overflow-y: auto;
			height: calc(100VH - 300rpx);

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
						border-radius: 50%;
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
						}
					}
				}

				.content-right {
					width: 99rpx;
					height: 111rpx;
					margin-top: 12rpx;
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
  /deep/ .uni-select__input-box{
    //width: 100%;
	overflow: hidden;
  }
  /deep/ .u-search__action--active{
	  width: 100rpx;
  }
  /deep/ .uni-select__selector{
	  width: 150%;
  }
</style>