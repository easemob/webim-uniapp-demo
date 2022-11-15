<template>
  <view class="attach-msg">
    <text class="time">文件消息</text>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},
  props: {
    msg: {
      type: Object,
      default: () => ({})
    }
  },

  created() {
    console.log(this.msg, 'file msg')
  },

  moved() {},

  methods: {}
};
</script>

<style>
@import "./index.css";
</style>
