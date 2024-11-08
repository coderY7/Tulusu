<template>
<!--  :style="{'padding-bottom': paddingBottomHeight + 'rpx'}"-->
  <view class="navbar" >
    <view
        v-for="(item, index) in list"
        :key="index"
        class="nav-item"
        :class="{ 'active': current == index }"
        @click="selectTab(item, index)"
    >
      <view class="icon-container">
        <image
            class="nav-icon"
            :src="current == index ? item.iconPath : item.icon"
            mode="aspectFit"
        />
      </view>
      <text v-if="current == index" class="nav-text">{{ language === 'cht' ? item.cht : item.en }}</text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    current: {
      type: [String, Number],
      default: 0
    },
    language: {
      type: String,
      default: 'cht'
    }
  },
  data() {
    return {
      paddingBottomHeight: 0,
      list: [
        {
          cht: '首页',
          en: 'Home',
          icon: '/static/img/tabbar/index.png',
          iconPath: '/static/img/tabbar/indexSelected.png',
          path: "/pages/index/index",
        },
        {
          cht: '问卷',
          en: 'Investigation',
          icon: '/static/img/tabbar/Investigation.png',
          iconPath: '/static/img/tabbar/InvestigationSelected.png',
          path: "/pages/index/Investigation",
        },
        {
          cht: '廣告',
          en: 'Advertise',
          icon: '/static/img/tabbar/Advertise.png',
          iconPath: '/static/img/tabbar/AdvertiseSelected.png',
          path: '/pages/index/Advertise',
        },
        {
          cht: '問卷記錄',
          en: 'Record',
          icon: '/static/img/tabbar/Record.png',
          iconPath: '/static/img/tabbar/RecordSelected.png',
          path: "/pages/index/Record",
        },
        {
          cht: '我的',
          en: 'Account',
          icon: '/static/img/tabbar/Account.png',
          iconPath: '/static/img/tabbar/AccountSelected.png',
          path: "/pages/index/Account",
        },
      ],
    };
  },
  created() {
    let that = this;
    uni.getSystemInfo({
      success: function(res) {
        let model = ['X', 'XR', 'XS', '11', '12', '13', '14', '15'];
        model.forEach(item => {
          if (res.model.indexOf(item) != -1 && res.model.indexOf('iPhone') != -1) {
            that.paddingBottomHeight = 40;
          }
        })
      }
    });
  },
  methods: {
    selectTab(item, index) {
      uni.switchTab({
        url: item.path
      })
      this.$emit('update:current', index);
    }
  }
};
</script>

<style scoped>
.navbar {
  position: fixed;
  bottom: 20rpx;
  left: 20rpx;
  right: 20rpx;
  z-index: 999;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #13131A;
  padding: 10rpx 20rpx;
  border-radius: 100rpx;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 10rpx;
  border-radius: 100rpx;
  transition: all 0.3s;
}

.nav-item.active {
  //background-color: #4078FF;
}

.icon-container {
  width: 80rpx;
  height: 80rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #444451;
}

.active .icon-container {
  background-color: #4078FF;
}

.nav-icon {
  width: 40rpx;
  height: 40rpx;
}

.nav-text {
  margin-left: 10rpx;
  font-size: 28rpx;
  color: #FFFFFF;
}
</style>