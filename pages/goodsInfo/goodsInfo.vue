<template>
	<view class="container">
		<returnBack :title="i18n.GoodsDetails" :bgc="'#fff'"></returnBack>
		<!-- 商品标题 -->
		<view class="title-section">
			<text class="product-title">{{ product.title }}</text>
		</view>

		<!-- 商品图片 -->
		<view class="image-section">
        <image mode="aspectFit" class="product-image" :src="product.banner" ></image>
		</view>

		<!-- 商品信息 -->
		<view class="info-section">
			<text class="product-price">E {{ product.price }}</text>
		</view>
		
		<!-- 地址选择 -->
		<view class="address-section">
			<button class="address-button" @click="selectAddress">{{ i18n.Selectaddress }}</button>
			<view class="address-text" v-if="address.name">
				<view class="addressinfo">
					{{i18n.Receiver+": " + address.name}}
				</view>
				<view class="addressinfo">
					{{i18n.PhoneNumber+": " + address.phone}}
				</view>
				<view class="addressinfo">
					{{i18n.Address+": " + address.address}}
				</view>
			</view>
		</view>
		
		<!-- 数量编辑 -->
		<view class="quantity-section">
			<view class="product-description">{{ product.intro }}</view>
			<view class="quantity-editor" v-if="address.name">
				<text class="section-title">{{ i18n.num }}</text>
				<button class="quantity-button" @click="decreaseQuantity">-</button>
				<input type="number" class="quantity-input" v-model="quantity" @input="updateQuantity" />
				<button class="quantity-button" @click="increaseQuantity">+</button>
			</view>
      <view class="service-box" v-if="quantity">
        {{i18n.serviceCharge}} : {{serviceChargevalue}} E
      </view>
		</view>

		

		<!-- 底部操作栏 -->
		<view class="footer">
			<!-- <button class="footer-button">加入购物车</button> -->
			<button class="footer-button" @click="showbuy">{{ i18n.Buy }}</button>
		</view>
<!--		<u-modal width="600rpx" @confirm="confirm" @cancel="cancel" showCancelButton :show="show"-->
<!--			:content='`${i18n.Recognizedexpense}  ${serviceChargevalue} ${i18n.ExchangeGoods}`' :confirmText='i18n.Confirm' :cancelText='i18n.Cancel'></u-modal>-->
			<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		orderExchange,
		pointCurrent,
    commonSetting
	} from '@/api/api.js';
  import header from "../../uni_modules/uview-ui/components/u-calendar/header.vue";
	export default {
		computed: {
			i18n() {
				return this.$t('message')
			}

		},
		data() {
			return {
				show:false,
				product: {
					title: '',
					price: '',
					description: '',
					image: '', // 商品图片链接
				},
				quantity: 1,
				address:{},
				amount:'',
        serviceCharge:'0.02',//手续费比例
        serviceChargevalue:'',//手续费
        totalMoney:'0',//总金额
			};
		},
		onShow() {
			this.product = JSON.parse(uni.getStorageSync('goods'));
      setTimeout(()=>{
        if(uni.getStorageSync('addresses')){
          this.address= JSON.parse(uni.getStorageSync('addresses'));
        }else {
          this.address={};
        }
      },100)
			this.commonSetting()
		},
		onLoad() {
		},
    watch: {
      quantity() {
        this.serviceChargevalue = (this.product.price * this.quantity * this.serviceCharge).toFixed(2)
        this.totalMoney = Number((this.product.price * this.quantity).toFixed(2)) + Number(this.serviceChargevalue)
      }
    },
		methods: {
      commonSetting() {
        commonSetting().then((res) => {
          this.usdtRate = Number(res.data.usdtRate);
          this.serviceChargevalue= (this.product.price * this.serviceCharge).toFixed(2)
          this.totalMoney = Number((this.product.price * this.quantity).toFixed(2)) + Number(this.serviceChargevalue)
        })
      },
      xzquantity(){
        console.log('33333333333',this.quantity)
      },
			bny() {
				const obj = {
					"address": this.address.address,
					"created": Date.now().toString(),
					"data": "",
					"expressName": "",
					"expressNo": "",
					"goodsCount": this.quantity,
					"goodsId": this.product.id,
					"id": 0,
					"name":uni.getStorageSync('Nick'),
					"orderState": "",
					"phone": this.address.phone,
					"price": this.product.price,
					"userId": uni.getStorageSync('UserID')
				}
				
				orderExchange(obj).then((res)=>{
          uni.hideLoading();
					if(res.code == 200) {
						this.$refs.uToast.show({
							message: this.i18n.purchasesucceeds
              ,
						})
					}else {
						this.$refs.uToast.show({
							message: this.i18n.RedemptionFailed
						})
					}
				})
			},
			confirm() {
				this.show = false;
				uni.showLoading({
					title: 'loading...',
				});

				pointCurrent().then((res)=>{
					if(res.code === 200) {
						this.amount = res.data
						if (Number(this.amount) < (this.product.price * this.quantity)) {
							this.$refs.uToast.show({
								message: this.i18n.Notenoughpoints
							})
              uni.hideLoading();
              return
						}
            if(!this.address.phone){
              uni.hideLoading();
              this.$refs.uToast.show({
                message: this.i18n.Selectaddress
              })
              return;
            }
							this.bny();
					}else {
						uni.hideLoading();
            this.$refs.uToast.show({
              message: res.message.message
            })
					}
					
				})
			},
      showbuy(){
        this.show = true
        uni.showModal({
          title: this.i18n.hint,
          content: `${this.i18n.Recognizedexpense} ${this.totalMoney} E`,
          confirmText:this.i18n.Confirm,
          cancelText:this.i18n.Cancel,
          success:  (res)=> {
            if (res.confirm) {
              console.log('用户点击确定');
              this.confirm()
            } else if (res.cancel) {
              console.log('用户点击取消');
              this.cancel()
            }
          }
        });
      },
			cancel() {
				this.show = false;
			},
			decreaseQuantity() {
				if (this.quantity > 1) {
					this.quantity--;
				}
			},
			increaseQuantity() {
				this.quantity++;
			},
			updateQuantity(event) {
        console.log(event)
				const value = parseInt(event.target.value);
				if (!isNaN(value) && value > 0) {
					this.quantity = value;
				} else {
					this.quantity = 1;
				}
			},
			selectAddress() {
				this.$u.route('pages/selectAddress/selectAddress', {
					"item": 1,
				});
			},
		},
	};
</script>

<style scoped>
	.container {
		padding-bottom: 120rpx;
		background-color: #f5f5f5;
	}

	.title-section {
		margin-top: 80rpx;
		padding: 30rpx;
		background-color: #fff;
		text-align: center;
	}

	.product-title {
		font-size: 40rpx;
		font-weight: bold;
		color: #333;
	}

	.image-section {
    padding: 40rpx;
		width: 690rpx;
		height: 300rpx;
		background-color: #fff;
		text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
	}

	.product-image {
    width: 100%;
    height: 100%;
    object-fit: contain; /* 确保图片在容器内完整显示 */
	}

	.info-section {
		padding: 40rpx;
		background-color: #fff;
	}

	.product-price {
		font-size: 40rpx;
		color: #336ae2;
		margin-top: 20rpx;
		font-weight: bold;
	}

	.product-description {
		width: 690rpx;
		font-size: 32rpx;
		color: #666;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		box-sizing: border-box;
		word-wrap: break-word;
		white-space: normal;
	}

	.quantity-section {
		padding: 40rpx;
		background-color: #fff;
		margin-top: 20rpx;
	}

	.quantity-editor {
		display: flex;
		align-items: center;
	}

	.quantity-button {
		width: 90rpx;
		height: 80rpx;
		background-color: #336ae2;
		/* 深蓝色 */
		color: #fff;
		border: none;
		font-size: 48rpx;
		line-height: 72rpx;
		text-align: center;
		border-radius: 10rpx;
	}

	.quantity-input {
		width: 120rpx;
		text-align: center;
		font-size: 36rpx;
		margin: 0 20rpx;
		padding: 10rpx;
		border: 1px solid #ccc;
		border-radius: 10rpx;
	}
  .service-box{
    margin-top: 20rpx;
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 16px;
    color: #000000;
  }

	.address-section {
		padding: 40rpx;
		background-color: #fff;
		margin-top: 20rpx;
		text-align: center;
	}

	.address-button {
		padding: 20rpx 40rpx;
		background-color: #336ae2;
		/* 深蓝色 */
		color: #fff;
		border: none;
		border-radius: 10rpx;
		font-size: 32rpx;
	}

	.footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		display: flex;
		justify-content: space-around;
		background-color: #fff;
		/* 深蓝色 */
		padding: 20rpx 0;
	}

	.footer-button {
		background-color: #ff4c00;
		color: #fff;
		width: 90%;
		padding: 12rpx 40rpx;
		border: none;
		border-radius: 10rpx;
		font-size: 32rpx;
	}
	.address-text {
		margin-top: 40rpx;
		text-align: left;
		.addressinfo{
			margin-top: 10rpx;
		}
	}
</style>