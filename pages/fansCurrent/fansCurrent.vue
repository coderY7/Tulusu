<template>
  <view class="fans-content">
    <view class="navbar-box">
      <returnBack :title="i18n.fanscurrent"></returnBack>
    </view>
    <view style="margin-top: 50px;">
      <u-tabs class="tabs" :scrollable="scrollable"  :list="tablist" @click="tabclick"></u-tabs>
    </view>
    <view class="fans-nave">
      <view class="fans-all" @scroll="scroll">
        <view class="list-item" v-for="(item, index) in list" :key="index">
          <view class="box-left">
            <view class="header">
              <img :src="item.avatar ? item.avatar : avatar" alt="">
            </view>
            <view class="name">{{ item.nick }}</view>
          </view>
          <view class="box-right" v-if="item.point">{{item.point}} E</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import returnBack from '@/components/returnBack/returnBack.vue'

import {
  fansCurrentapi,
  fansCurrent1api,
  fansCurrent2api,
} from '@/api/api.js';
export default {
  computed: {
    i18n() {
      return this.$t('message')
    }

  },
  components: {
    returnBack
  },
  data() {
    return {
      scrollable:false,
      currentindex:0,
      tablist:[
        {
          name: this.$t('message.Firstlevellist'),
        }, {
          name: this.$t('message.Secondarylist'),
        },
      ],
      avatar: require("@/static/img/index/userhead.png"),
      list: [],
      form: {
        page: 1,
        size: 10
      },
      isMore: true,
      amount:''
    }
  },
  methods: {
    tabclick(item){
      this.list=[]
      this.form.page=1
      this.currentindex=item.index
      if(this.currentindex){
        this.getFans2Current()
      }else {
        this.getFans1Current()
      }
    },
    getFans1Current() {
      fansCurrent1api(this.form).then(res => {
        this.list = this.list.concat(res.data.records)
        if (this.list.length == res.data.total) {
          this.isMore = false
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 加载更多
    scroll(e) {
      // 加载更多
      if (e.target.scrollTop == e.target.scrollHeight - e.target.clientHeight) {
        if (!this.isMore) {
          // Toast("There is no more data available")
          return
        }
        this.form.page++
        if(this.currentindex){
          this.getFans2Current()
        }else {
          this.getFans1Current()
        }
      }
    },
    getFans2Current() {
      fansCurrent2api(this.form).then(res => {
        this.list = this.list.concat(res.data.records)
        if (this.list.length == res.data.total) {
          this.isMore = false
        }
      }).catch(err => {
        console.log(err)
      })
    },

  },
  onShow() {
    this.getFans1Current()
  }
}
</script>
<style lang="scss" scoped>
.van-empty__image img {
  object-fit: initial;
}

.list-item {
  margin: 0 10px;
  margin-top: 5px;
  padding: 10px;
  background-color: #fff;
  display: flex;
  border-bottom: .01rem solid #eee;
  justify-content: space-between;
  border-radius: 5px;
  .box-left{
    display: flex;
    .header {
      width:30px;
      height: 30px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 5px;
      display: flex;
    }

    .name {
      line-height:30px;
      font-size: 16px;
      color: #333;
      font-weight: 600;
    }
  }
  .box-right{
    line-height: 30px;
    font-size: 16px;
    color: #333;
    font-weight: 600;
    color: red;
  }


}

.fans-content {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #F2F3F8;

  .fans-nave {
    flex: 1;
    position: relative;
    margin-top: .2rem;
    .fans-all {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow-y: scroll;
    }
  }

  .navbar-box {
    background-color: #fff;
    padding-bottom: .3rem;
  }
}
</style>