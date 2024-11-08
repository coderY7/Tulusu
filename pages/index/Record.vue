<template>
  <view class="content" style="padding: 0;">
    <view class="content-title">{{ i18n.Record }}</view>

    <view class="top-bar">
      <u-subsection keyName="name" style="font-weight: 600;" activeColor="#FFFFFF" inactiveColor="rgba(0,0,0,.5)"
                    fontSize="28rpx" bgColor="#E7E7E7" class="bar" :list="barList" :current="current"
                    @change="sectionChange"></u-subsection>
    </view>
    <view class="top-tabs">
      <view :class="[index === currentTab ? 'isActiveTab' : 'tab', 'tab-item']" v-for="(item, index) in tabList"
            :key="item.index" @click="changeTab(index)">
        <view class="tab-name">{{ item.name }}</view>
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
    <!-- <view class="" v-if="refresherTriggered">
      <u-loading-icon></u-loading-icon>
    </view> -->
    <Tabbar :language="language" :current="'3'"></Tabbar>
  </view>
</template>

<script>
import Tabbar from "@/components/tabbar/tabbar.vue";
import {
  userTasks,
  completedTasks,
  userQuestionnaire,
  userAcceptQuestionnaire,
} from "@/api/api.js";
import dayjs from "dayjs";
export default {
  components: {
    Tabbar,
  },
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
      barList: [{
        name: "",
      },
        {
          name: "",
        },
        {
          name: "",
        },
      ],
      tabList: [{
        name: "关注",
      },
        {
          name: "推荐",
        },
        {
          name: "电影",
        },
        {
          name: "科技",
        },
      ],
      list: [],
      // 或者如下，也可以配置keyName参数修改对象键名
      // list: [{name: '未付款'}, {name: '待评价'}, {name: '已付款'}],
      current: 0,
      currentTab: 0,
      page: 1,
      size: 10,
      parmsObj: {},
    };
  },
  onLoad() {
    if (uni.getStorageSync('goRecod')) {
      this.changeTab(uni.getStorageSync('goRecod'))
      uni.removeStorageSync('goRecod');
    }
  },
  onShow() {
    uni.hideTabBar({
      animation: false,
    });
    this.language = uni.getStorageSync("language");
    this.getBarList();
  },
  methods: {
    goQuestion(item) {
      if (this.currentTab === 0) {
        item=item.userAnswer
        this.$u.route('pages/questions/questions', item);
      } else {
        return
      }

    },
    changeTab(index) {
      this.currentTab = index;
      this.userTasks();
    },
    sectionChange(index) {
      this.current = index;
      this.userTasks();
    },
    getBarList() {
      this.barList[0].name = this.i18n.Today;
      this.barList[1].name = this.i18n.Week;
      this.barList[2].name = this.i18n.Moon;
      this.tabList[0].name = this.i18n.Undone;
      this.tabList[1].name = this.i18n.Verify;
      this.tabList[2].name = this.i18n.Pass;
      this.tabList[3].name = this.i18n.Fail;
      this.userTasks();
      // this.unacceptedTasks();tabList
    },
    getdataList() {
    },
    loadMore() {
      if (Number(this.total) === this.list.length || this.loading) {
        return
      }
      this.refresherTriggered = true
      this.parmsObj.page += 1;
      userTasks(this.parmsObj).then((res) => {
        if (res.code === 200) {
          let arr = res.data.records
          this.list = [...this.list, ...arr];
          this.refresherTriggered = false;
          this.loading = false;
        }
      });
    },
    userTasks() {
      this.loading = true
      var obj = {
        endTime: 0,
        page: this.page,
        size: this.size,
        startTime: 0,
        state: "",
      };
      if (this.currentTab === 0) {
        obj.state = '1'; // 待完成
      }
      if (this.currentTab === 1) {
        obj.state = '2'; // 待检查
      }
      if (this.currentTab === 2) {
        obj.state = '3'; // 已通过
      }
      if (this.currentTab === 3) {
        obj.state = '4'; // 失败
      }
      if (this.current === 0) {
        // let currentDateS = new Date();
        // currentDateS.setHours(0, 0, 0, 0);
        // let startOfDayTimestamp = currentDateS.getTime();
        // let currentDateE = new Date();
        // currentDateE.setHours(23, 59, 59, 999);
        // let endOfDayTimestamp = currentDateE.getTime();
        // obj.startTime = startOfDayTimestamp;
        // obj.endTime = endOfDayTimestamp;



        let currentDateS = dayjs().startOf('day');
        let currentDateE = dayjs().endOf('day');

        obj.startTime = currentDateS.valueOf(); // 获取毫秒时间戳
        obj.endTime = currentDateE.valueOf();   // 获取毫秒时间戳
	

      }
      if (this.current === 1) {
        // const now = new Date();
        // const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() +
        //     1); // 本周一
        // const endOfWeek = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() +
        //     6); // 星期天
        // endOfWeek.setHours(23, 59, 59, 999); // 设置为当天的23:59:59.999
        //
        // const startTimestamp = startOfWeek.getTime();
        // const endTimestamp = endOfWeek.getTime();
        // const weekDates =this.getWeekStartAndEndDates();
        //
        // obj.startTime = weekDates.startTimestamp;
        // obj.endTime = weekDates.endTimestamp;

// 设置本周的开始时间为周一
        const today = dayjs();
        const startOfWeek = today.day() === 0 ? today.subtract(6, 'day').startOf('day') : today.startOf('week').add(1, 'day');
// 设置本周的结束时间为周日
        const endOfWeek = startOfWeek.add(6, 'day').endOf('day');

        obj.startTime = startOfWeek.valueOf(); // 获取周一的时间戳
        obj.endTime = endOfWeek.valueOf();     // 获取周日的时间戳




      }
      if (this.current === 2) {
        // let currentDateS = new Date();
        // currentDateS.setDate(1); // 将日期设置为本月的第一天
        // currentDateS.setHours(0, 0, 0, 0);
        // let startOfMonthTimestamp = currentDateS.getTime();
        // let currentDateE = new Date();
        // currentDateE.setMonth(currentDateE.getMonth() + 1, 1); // 设置日期为下个月的第一天
        // currentDateE.setHours(0, 0, 0, 0);
        // currentDateE.setDate(currentDateE.getDate() - 1);
        // currentDateE.setHours(23, 59, 59, 999);
        // let endOfMonthTimestamp = currentDateE.getTime();
        // obj.startTime = startOfMonthTimestamp;
        // obj.endTime = endOfMonthTimestamp;


        let startOfMonth = dayjs().startOf('month'); // 本月的第一天
        let endOfMonth = dayjs().endOf('month');     // 本月的最后一天

        obj.startTime = startOfMonth.valueOf(); // 获取毫秒时间戳
        obj.endTime = endOfMonth.valueOf();     // 获取毫秒时间戳

      }
      this.parmsObj = JSON.parse(JSON.stringify(obj))
      userTasks(obj).then((res) => {
        if (res.code === 200) {
          this.total = res.data.total;
          this.list = [];
          this.list = res.data.records
          this.loading = false;
        } else {
          this.loading = false;
        }
      });
    },
    getWeekStartAndEndDates() {
      const now = new Date();

      // 获取当前日期是周几（0 = 周日, 1 = 周一, ..., 6 = 周六）
      let dayOfWeek = now.getDay();


      // 计算本周一的日期
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
      startOfWeek.setHours(0, 0, 0, 0); // 设置为午夜

      // 计算本周日的日期
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999); // 设置为周日的结束时间

      return {
        startTimestamp: startOfWeek.getTime(),
        endTimestamp: endOfWeek.getTime()
      };
    }
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
    overflow-y: auto;
    height: calc(100VH - 500rpx);

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
    margin-top: 78rpx;
    text-align: center;
  }
}

/deep/ .u-subsection__bar {
  border-radius: 65rpx !important;
  background-color: #336ae2 !important;
}
</style>
