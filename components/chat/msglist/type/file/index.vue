<template>
  <view class="attach-msg" @tap="previewFile">
    <image class="fileIcon" src="/static/images/msgFile.png" />
    <text class="time"
      >{{ msg.msg.filename }}{{ formatMoney(msg.msg.size) }}</text
    >
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

  created() {},

  moved() {},

  methods: {
    formatMoney(value) {
      return `（${(value / 1024 / 1024).toFixed(2)}M）`;
    },
    previewFile() {
      uni.showLoading();
      uni.downloadFile({
        url: `${this.msg.msg?.url}`,
        success: function (res) {
          var filePath = res.tempFilePath;
          let platform = uni.getSystemInfoSync().platform;
          if (platform == "ios") {
            filePath = escape(filePath);
          }
          uni.openDocument({
            filePath: filePath,
            success: function (res) {
              uni.hideLoading();
            },
            fail(e) {
              uni.showToast({
                title: "暂不支持此类型",
                duration: 2000
              });
              uni.hideLoading();
            }
          });
        },
        fail: () => {
          uni.hideLoading();
          uni.showToast({
            icon: "none",
            title: "失败请重新下载"
          });
        }
      });
    }
  }
};
</script>

<style>
@import "./index.css";
</style>
