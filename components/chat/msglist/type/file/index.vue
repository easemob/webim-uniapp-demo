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
    return {
      filePath: null
    };
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
    downloadFile() {
      let _this = this;
      // 下载完存储filePath，下次预览直接访问
      uni.downloadFile({
        url: `${this.msg.msg?.url}`,
        success: function (res) {
          let sysInfo = uni.getSystemInfoSync();
          var filePath = res.tempFilePath;
          let platform = sysInfo.platform;
          if (platform === "ios") {
            filePath = escape(filePath);
          }
          _this.setData({
            filePath: filePath
          });
          _this.openFile(filePath);
        },
        fail: () => {
          uni.hideLoading();
          uni.showToast({
            icon: "none",
            title: "失败请重新下载"
          });
        }
      });
    },
    openFile(filePath) {
      uni.openDocument({
        filePath,
        success: function (res) {
          uni.hideLoading();
        },
        fail(e) {
          console.log(e, "eeeee");
          uni.showToast({
            title: "暂不支持此类型",
            duration: 2000
          });
          uni.hideLoading();
        }
      });
    },
    previewFile() {
      let sysInfo = uni.getSystemInfoSync();
      if (sysInfo.uniPlatform === "web") {
        uni.showToast({
          title: "H5暂不支持预览文件消息",
          duration: 2000,
          icon: "none"
        });
        return;
      }
      uni.showLoading();
      if (this.filePath) {
        this.openFile(this.filePath);
      } else {
        this.downloadFile();
      }
    }
  }
};
</script>

<style>
@import "./index.css";
</style>
