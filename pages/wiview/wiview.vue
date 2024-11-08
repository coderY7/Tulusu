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
      <view class="right-unit-state" style="color: #000000" v-if="address.orderState==1">{{i18n.goodsState1}}</view>
      <view class="right-unit-state" style="color: #336ae2" v-if="address.orderState==2">{{i18n.goodsState2}}</view>
      <view class="right-unit-state" style="color: red" v-if="address.orderState==3">{{i18n.goodsState3}}</view>
    </view>



    <!-- 数量编辑 -->
    <view class="quantity-section">
      <view class="product-description">{{ product.intro }}</view>
      <view class="service-box" v-if="address.commission">
        {{i18n.serviceCharge}} : {{address.commission}} E
      </view>
    </view>

    <view class="address-section">
      <view class="address-text">
        <view class="addressinfo">
          {{i18n.Receiver+": " + address.name}}
        </view>
        <view class="addressinfo">
          {{i18n.PhoneNumber+": " + address.phone}}
        </view>
        <view class="addressinfo">
          {{i18n.Address+": " + address.address}}
        </view>
        <view class="addressinfo" v-if="address.expressName">
          {{i18n.expressName+": " + address.expressName}}
        </view>
        <view class="addressinfo" v-if="address.expressNo">
          {{i18n.expressNo+": " + address.expressNo}}
        </view>
      </view>
    </view>


  </view>
</template>


<script>
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
      itemdata:'',
      quantity: 1,
      address:{},
      amount:'',
      serviceCharge:'0.02',//手续费比例
      serviceChargevalue:'',//手续费
      totalMoney:'0',//总金额
    };
  },
  onShow() {
    this.olddata=uni.getStorageSync("itemdata");
    this.itemdata=JSON.parse(this.olddata.data)
    this.address.name=this.itemdata.name
    this.address.phone=this.itemdata.phone
    this.address.address=this.itemdata.address
    this.address.commission=this.itemdata.commission
    this.address.orderState=this.olddata.orderState
    this.address.expressName=this.olddata.expressName
    this.address.expressNo=this.olddata.expressNo
    this.product = JSON.parse(this.itemdata.data)
    console.log(this.itemdata)

  },
  onLoad() {
  },

};
</script>

<style scoped>
.container {
  background-color: #f5f5f5;
}

.title-section {
  margin-top: 80rpx;
  padding: 30rpx;
  background-color: #fff;
  text-align: center;
}

.product-title {
  font-size: 36rpx;
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
.right-unit-state{
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 40rpx;
}
</style>