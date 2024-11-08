<template>
	<!-- 底部导航 -->
<!--	<view class="tabbar" :style="{'padding-bottom': paddingBottomHeight + 'rpx'}">-->
<!--		<view class="tabbar-item" v-for="(item, index) in list" :key="index" @click="tabbarChange(item.path)">-->
<!--			<image class="item-img" :src="item.iconPath" v-if="current == index"></image>-->
<!--			<image class="item-img1" :src="item.icon" v-else></image>-->
<!--			<p :class=" current == index?'tabbarActive':''" v-if="language === 'cht'">{{item.cht}}</p>-->
<!--			<p :class=" current == index?'tabbarActive':''" v-else>{{item.en}}</p>-->
<!--		</view>-->
<!--	</view>-->






    <!-- 底部导航栏 -->
    <view class="navbar" :style="{'margin-bottom': paddingBottomHeight + 'rpx'}">
      <view
          v-for="(item, index) in list"
          :key="index"
          class="nav-item"
          @click="selectTab(item,index)"
      >
        			<image mode="widthFix" class="nav-icon" :src="item.iconPath" v-if="current == index"></image>
        			<image mode="widthFix" class="nav-icon" :src="item.icon" v-else></image>
        <text :class=" current == index?'tabbarActive':''" v-if="language === 'cht'">{{item.cht}}</text>
        <text class="nav-text">{{ item.cht }}</text>
      </view>
    </view>




</template>

<script>
	export default {
		props: {
			current: String,
			language:{
				type: String,
				default:'cth',
			}
		},
		data() {
			return {
				paddingBottomHeight: 0, //苹果X以上手机底部适配高度
				list: [{
						cht: '首页', //首页
						en: 'Home',
						icon: '/static/img/tabbar/index.png', //未选中图标
						iconPath: '/static/img/tabbar/indexSelected.png', //选中图片
						path: "/pages/index/index", //页面路径
					},
					{
						cht: '问卷', //问卷
						en: 'Investigation',
						icon: '/static/img/tabbar/Investigation.png',
						iconPath: '/static/img/tabbar/InvestigationSelected.png',
						path: "/pages/index/Investigation",
					},
					{
						cht: '廣告', //廣告
						en: 'Advertise',
						icon: '/static/img/tabbar/Advertise.png',
						iconPath: '/static/img/tabbar/AdvertiseSelected.png',
						path: '/pages/index/Advertise',
					},
					{
						cht: '問卷記錄', //問卷記錄
						en: 'Record',
						icon: '/static/img/tabbar/Record.png',
						iconPath: '/static/img/tabbar/RecordSelected.png',
						path: "/pages/index/Record",
					},
					{
						cht: '我的', //問卷記錄
						en: 'Account',
						icon: '/static/img/tabbar/Account.png',
						iconPath: '/static/img/tabbar/AccountSelected.png',
						path: "/pages/index/Account",
					},
				],
        selectedTab: 0, // 默认选中第一
			};
		},
		created() {
			let that = this;
			uni.getSystemInfo({
				success: function(res) {
					let model = ['X', 'XR', 'XS', '11', '12', '13', '14', '15'];
					model.forEach(item => {
						//适配iphoneX以上的底部，给tabbar一定高度的padding-bottom
						if (res.model.indexOf(item) != -1 && res.model.indexOf('iPhone') != -1) {
							that.paddingBottomHeight = 40;
						}
					})
				}
			});
		},
		watch: {

		},
		methods: {
			tabbarChange(path) {
				uni.switchTab({
					url: path
				})
			},
      selectTab(item,index) {
        uni.switchTab({
          url: item.path
        })
        this.selectedTab=index
        console.log('---',index)
      }
		}

	};
</script>

<style scoped  lang="scss">
	.tabbarActive {
		color: #336AE2 !important;
	}

	.tabbar {
		box-sizing: border-box;
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100vw;
		height: 106rpx;
		background-color: #FFFFFF;
		padding: 0 20rpx;
		z-index: 99;
	}

	.tabbar-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100rpx;
		p {
			font-weight: 400;
			font-size: 22rpx;
			color: #000000;
			line-height: 28rpx;
			text-align: center;
			font-style: normal;
		}
	}

	/* 选中后 */
	.item-img {
		width: 52rpx;
		height: 52rpx;
	}

	/* 选中前 */
	.item-img1 {
		width: 52rpx;
		height: 52rpx;
	}
</style>
<style>
/* 整体布局 */
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
}

/* 内容显示区域 */
.content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #333;
}

/* 底部导航栏 */
.navbar {
  position: fixed;
  bottom: 0rpx;
  left: 0rpx;
  z-index: 999;
  width: 90vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #13131A;
  padding: 10px;
  border-radius: 30px;
  margin: 10px;
}

/* 导航按钮样式 */
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: #444451;
  border-radius: 50%;
  color: #fff;
  font-size: 12px;
  text-align: center;
}

/* 选中项样式 */
.nav-item.active {
  background-color: #4078FF; /* 选中状态的背景颜色 */
}

/* 图标样式 */
.nav-icon {
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
}

/* 文字样式 */
.nav-text {
  font-size: 10px;
  color: #FFFFFF;
}
</style>