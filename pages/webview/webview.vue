<template>
  <view>
    <web-view :src="url" v-if="url"></web-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      url: ''
    };
  },
  onLoad(options) {
    if (options.url) {
      this.url = decodeURIComponent(options.url);
    }
  }
};
</script>

<style scoped>
/* 样式 */
</style>