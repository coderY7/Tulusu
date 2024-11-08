<template>
	<view class="question-box">
		<view class="question-title">
			<view class="left">
				{{questionData.question}}
			</view>
			<view class="right" v-if="questionData.mustAnswer">
				*
			</view>
		</view>
		<view class="questionType questionType1" v-if="questionData.questionType === 1">
			<CustomizeInput style="height: 100rpx;" :label="i18n.PleaseEnterYourAn"
				:placeholder="i18n.PleaseEnterYourAn" v-model="questionData.userAnswer" >
			</CustomizeInput>
		</view>
		<view class="questionType questionType2" v-if="questionData.questionType === 2">
			<CustomizeInput style="height: 100rpx;" :number='true' :label="i18n.PleaseEnterYourNumber"
				:placeholder="i18n.PleaseEnterYourNumber" v-model="questionData.userAnswer" >
			</CustomizeInput>
		</view>
		<view class="questionType questionType3" v-if="questionData.questionType === 3">
			<u--textarea style="padding:0;" border="surround" v-model="questionData.userAnswer"
				:placeholder="i18n.PleaseEnterYourAn"></u--textarea>
		</view>
		<view class="questionType questionType4" v-if="questionData.questionType === 4">
			<u-radio-group v-model="questionData.userAnswer" placement="column">
				<u-radio labelColor="rgba(0,0,0,.7)" shape="square" :customStyle="{marginBottom: '22rpx'}"
					v-for="(item, index) in radiolist1" :key="index" :label="item" :name="item" @change="radioChange">
				</u-radio>
			</u-radio-group>
		</view>
		<view class="questionType questionType5" v-if="questionData.questionType === 5">
			<u-checkbox-group v-model="checkboxValue1" placement="column" @change="checkboxChange">
				<u-checkbox :customStyle="{marginBottom: '22rpx'}" v-for="(item, index) in checkboxList1" :key="index"
					:label="item" :name="item">
				</u-checkbox>
			</u-checkbox-group>
		</view>
		<view class="questionType questionType6" v-if="questionData.questionType === 6">
			<u-picker :show="picker" :columns="pickerList" @cancel="pickerC" @confirm="pickerF"></u-picker>
			<view class="btn" @click="picker = true">{{questionData.userAnswer?questionData.userAnswer:i18n.PleaseEnterYourAn}}</view>
		</view>
		<view class="questionType questionType7" v-if="questionData.questionType === 7">
			<span>{{i18n.No}}</span><u-switch style="margin: 0 20rpx;" v-model="switchValue" @change="switchChange"></u-switch><span>{{i18n.Yse}}</span>
		</view>
		<view class="questionType questionType8" v-if="questionData.questionType === 8">
			<u-datetime-picker :minDate="100000000000" @cancel="cancel" @confirm="confirm" :show="show"
				v-model="questionData.userAnswer" mode="datetime"></u-datetime-picker>
			<view class="btn" @click="show = true">{{showTime}}</view>
		</view>
		<view class="questionType questionType9" v-if="questionData.questionType === 9">
			<u-datetime-picker :minDate="100000000000" @cancel="cancelS" @confirm="confirmS" :show="showS"
				v-model="startT" mode="datetime"></u-datetime-picker>
			<u-datetime-picker :minDate="100000000000" @cancel="cancelE" @confirm="confirmE" :show="showE"
				v-model="endT" mode="datetime"></u-datetime-picker>
			<view class="btn-box">
				<view class="btn" @click="showS = true">{{showTimeS}}</view>
				<view class="hg">
					-
				</view>
				<view class="btn" @click="showE = true">{{showTimeE}}</view>
			</view>

		</view>
	</view>
</template>

<script>
	import CustomizeInput from '@/components/Input/Input.vue';
	import dayjs from 'dayjs';
	export default {
		props: {
			questionData: {
				default: {},
				type: Object,
			},
		},
		components: {
			CustomizeInput
		},
		computed: {
			i18n() {
				return this.$t('message')
			}
		},
		name: "question",
		data() {
			return {
				switchValue:false,
				pickerList: [],
				checkboxValue1: [],
				checkboxList1: [],
				radiolist1: [],
				language: 'en',
				show: false,
				showS: false,
				showE: false,
				picker: false,
				showTime: '',
				showTimeS: '',
				startT: '',
				endT: '',
				showTimeE: '',
			};
		},
		created() {
			this.language = uni.getStorageSync('language');
			// this.questionData.userAnswer = Number(new Date());
			if (this.questionData.questionType === 4) {
				this.radiolist1 = this.questionData.answer.split('||')

			}
			if (this.questionData.questionType === 5) {
				this.checkboxList1 = this.questionData.answer.split('||')

			}
			if (this.questionData.questionType === 6) {
				this.pickerList.push(this.questionData.answer.split('||'))
			}
			if (this.questionData.questionType === 8) {
				this.showTime = Number(new Date())
				this.questionData.userAnswer = Number(new Date())
				this.showTime = dayjs(this.showTime).format('YYYY-MM-DD HH:mm')

			}
			if (this.questionData.questionType === 9) {
				this.showTimeS = Number(new Date())
				this.showTimeE = Number(new Date())
				this.startT =  Number(new Date())
				this.endT =Number(new Date())
				this.showTimeS = dayjs(this.showTimeS).format('YYYY-MM-DD HH:mm')
				this.showTimeE = dayjs(this.showTimeE).format('YYYY-MM-DD HH:mm')
			}

		},
		onLoad() {

		},
		onShow() {

		},
		methods: {
			//开关 
			switchChange(val){
				console.log(val)
				if(val) {
					this.questionData.userAnswer = true
				}else {
					this.questionData.userAnswer = false
				}
			},
			//下拉确定
			pickerF(val) {
				console.log(val)
				this.questionData.userAnswer = val.value[0];
				this.picker = false;
			},
			//下拉取消
			pickerC() {
				this.questionData.userAnswer = "";
				this.picker = false;
			},
			//单选
			radioChange(val) {
				this.questionData.userAnswer = val;
			},
			//多选
			checkboxChange(val) {
				this.questionData.userAnswer = val.join('||');
			},
			//单时间完成
			confirm(val) {
				// console.log(dayjs(val.value).format('MM-DD-YYYY'))
				if (this._i18n.locale === "cht") {
					this.showTime = dayjs(val.value).format('YYYY-MM-DD HH:mm')
					console.log(this.showTime)
				} else {
					this.showTime = dayjs(val.value).format('MM-DD-YYYY HH:mm')
					console.log(this.showTime)
				}
				this.questionData.userAnswer = val.value
				this.show = false;
				// this.questionData.userAnswer = '';
			},
			//开始时间完成
			confirmS(val) {
				// console.log(dayjs(val.value).format('MM-DD-YYYY'))
				if (this._i18n.locale === "cht") {
					this.showTimeS = dayjs(val.value).format('YYYY-MM-DD HH:mm')
				} else {
					this.showTimeS = dayjs(val.value).format('MM-DD-YYYY HH:mm')
				}
				this.startT = val.value
				this.showS = false;
				// this.questionData.userAnswer = '';
				if (this.endT) {
					this.questionData.userAnswer = this.startT + '||' + this.endT
				}
				console.log(this.questionData.userAnswer)
			},
			//结束时间完成
			confirmE(val) {
				// console.log(dayjs(val.value).format('MM-DD-YYYY'))
				if (this._i18n.locale === "cht") {
					this.showTimeE = dayjs(val.value).format('YYYY-MM-DD HH:mm')
				} else {
					this.showTimeE = dayjs(val.value).format('MM-DD-YYYY HH:mm')
				}
				this.endT = val.value
				this.showE = false;
				// this.questionData.userAnswer = '';
				if (this.startT) {
					this.questionData.userAnswer = this.startT + '||' + this.endT
				}
				console.log(this.questionData.userAnswer)
			},
			//单时间取消
			cancel() {
				this.show = false;
				this.showTime = '';
				this.questionData.userAnswer = '';
			},
			//结束时间取消
			cancelE() {
				this.showE = false;
				this.showTimeE = '';
				this.endT = '';
			},
			//开始时间取消
			cancelS() {
				this.showS = false;
				this.showTimeS = '';
				this.startT = '';
			},
		}
	}
</script>

<style scoped  lang="scss">
	.question-box {
		width: 100%;
		padding-top: 40rpx;

		.question-title {
			font-weight: 600;
			font-size: 32rpx;
			color: #000000;
			margin-bottom: 30rpx;
			display: flex;
			.left {
				margin-right: 20rpx;
			}
			.right {
				color: red;
			}
		}

		.questionType {
			font-family: PingFangSC, PingFang SC;
			font-weight: 400;
			font-size: 28rpx;
			color: rgba(0, 0, 0, .7) !important;
			margin-top: 40rpx;
		}
		.questionType7{
			display: flex;
			align-items: center;
		}
		.questionType8 {
			width: 100%;

			.btn {
				width: 100%;
				height: 100rpx;
				border: none;
				background-color: #EDEFF3;
				color: #787D85;
				text-align: left;
				line-height: 100rpx;
				padding-left: 20rpx;
				box-sizing: border-box;
				border-radius: 34rpx;
				color: rgba(0, 0, 0, .3);
			}
		}

		.questionType6 {
			width: 100%;

			.btn {
				width: 100%;
				height: 100rpx;
				border: none;
				background-color: #EDEFF3;
				color: #787D85;
				text-align: left;
				line-height: 100rpx;
				padding-left: 20rpx;
				box-sizing: border-box;
				border-radius: 34rpx;
				color: rgba(0, 0, 0, .3);
			}
		}

		.questionType9 {
			width: 100%;

			.btn-box {
				width: 100%;
				height: 100rpx;
				border: none;
				background-color: #EDEFF3;
				color: #787D85;
				text-align: left;
				line-height: 100rpx;
				padding-left: 20rpx;
				box-sizing: border-box;
				border-radius: 34rpx;
				color: rgba(0, 0, 0, .3);
				display: flex;
				justify-content: space-between;
				padding: 0 50rpx;
			}

			.btn {
				min-width: 30%;
			}
		}
	}
</style>