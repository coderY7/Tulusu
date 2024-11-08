<template>
	<view class="content" style="overflow-y: hidden;height:100VH;box-sizing: border-box;">

		<returnBack :titleColor="'#fff'" :title="businessData.title" :bgc="'transparent'">
		</returnBack>
		<view class="content-title">
			<view class="content-title-head">
				<view class="content-title-head-box">
					<image class="img" :src="businessData.logo" mode=""></image>
				</view>
				<view class="text">
					{{businessData.title}}
				</view>
			</view>
		</view>
		<view class="question-boxs" v-if="show">
			<view v-for="item in questionData" :key="item.id">
				<question :questionData.sync="item"></question>
			</view>

      <view class="login-btn" @click="submit" v-if="questionData.length > 0 && acceptshow" >
        {{i18n.Continue}}
      </view>
      <view v-else class="login-btn-err">{{i18n.errorContinue}}</view>

		</view>

		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import returnBack from '@/components/returnBack/returnBack.vue';
	import question from '@/components/question/question.vue';
	import {
		questionnaireId,
		userAnswer,
    userQuestionnaire,
    userAcceptQuestionnaire
	} from '@/api/api.js';
	export default {
		components: {
			returnBack,
			question,
		},
		computed: {
			i18n() {
				return this.$t('message')
			}

		},
		data() {
			return {
        acceptshow:true,
				language: 'en',
				questionData: [],
				businessData: {},
				show: false,
				aireId: '',
        userAnswerid:'',
				loading: false,
				statusBarHeight: 90,
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
      //console.log('parms',parms)
      if(parms.acceptshow){
        this.acceptshow=false
        this.wenjuanid(parms.id)
      }else {
        this.questionnaireId(parms.id)

      }

			this.aireId = parms.id;
		},
		onShow() {
			uni.hideTabBar({
				animation: false
			})
			this.language = uni.getStorageSync('language');
		},
		methods: {
      wenjuanid(val){
        const obj = {
          id: val
        }
        questionnaireId(obj).then((res) => {
          this.questionData = JSON.parse(JSON.stringify(res.data.questions))
          this.businessData = JSON.parse(JSON.stringify(res.data.business))
          this.show = true;
        })
      },
			questionnaireId(val) {
				const obj = {
					id: val
				}
        userQuestionnaire(obj).then((res) => {
					this.questionData = JSON.parse(JSON.stringify(res.data.questions))
					this.businessData = JSON.parse(JSON.stringify(res.data.business))
					this.show = true;
          this.userAnswerid=res.data.userAnswer.id
					// this.businessData.forEach((i)=>{
					// 	// if(i.questionType){
					// 		i.userAnswer = Number(new Date());
					// 	// }
					// })
				})
			},
			submit() {
				this.loading = true;
				let obj = {
					answers: [],
					//questionnaireId: this.aireId
          questionnaireUserId: this.userAnswerid,
				}
				var goon = true;
				console.log(this.questionData)

				this.questionData.forEach((item) => {
					const obj1 = {
						"answer": item.userAnswer,
						"questionId": item.id,
					}
					if (item.mustAnswer && !item.userAnswer && item.questionType !== 7) {
						goon = false
					}
					//return
					obj.answers.push(obj1)
					console.log(!item.userAnswer)
				})
				if (goon) {
					userAnswer(obj).then((res) => {
						console.log(res)
						if (res.code === 200) {
							this.loading = false;
							this.$refs.uToast.show({
								message: 'OK'
							})
							uni.reLaunch({
								url: "/pages/index/Record",
							});
						} else {
							this.loading = false;
						}
					})
				} else {
					this.$refs.uToast.show({
						message: this.i18n.Qtips
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		background-color: #fff !important;

		.content-title {
			padding: 0 30rpx;
			box-sizing: border-box;
			width: 100%;
			background: url(@/static/img/question/bgc.png);
			background-size: 100% 100%;
			height: 470rpx;

			.content-title-head {
				margin-left: 10rpx;
				padding-top: 224rpx;
				display: flex;
				align-items: center;
				height: 110rpx;
				box-sizing: border-box;

				.content-title-head-box {
					width: 110rpx;
					height: 110rpx;
					border-radius: 50%;
					overflow: hidden;

					.img {
						width: 100%;
						height: 100%;
					}
				}


				.text {
					margin-left: 20rpx;
					font-weight: 600;
					font-size: 64rpx;
					color: #FFFFFF;

				}
			}
		}

		.question-boxs {
			width: 100%;
			padding: 0 30rpx;
			box-sizing: border-box;
			margin-top: -50rpx;
			background-color: #fff;
			border-radius: 40rpx 40rpx 0rpx 0rpx;
			height: calc(100VH - 524rpx);
			overflow: hidden;
			overflow-y: auto;
			padding-bottom: 80rpx;
		}

		.login-btn {
			margin: 0 auto;
			margin-top: 110rpx;
			width: 92%;
			height: 104rpx;
			background: #336AE2;
			box-shadow: 0rpx 16rpx 24rpx 0rpx rgba(51, 106, 226, 0.32);
			border-radius: 52rpx;
			text-align: center;
			line-height: 104rpx;
			font-size: 32rpx;
			color: #FFFFFF;
			font-weight: 600;
		}
    .login-btn-err {
      margin: 0 auto;
      margin-top: 110rpx;
      width: 92%;
      height: 104rpx;
      background: #9e9e9e;
      box-shadow: 0rpx 16rpx 24rpx 0rpx rgba(51, 106, 226, 0.32);
      border-radius: 52rpx;
      text-align: center;
      line-height: 104rpx;
      font-size: 32rpx;
      color: #FFFFFF;
      font-weight: 600;
    }

	}
</style>
