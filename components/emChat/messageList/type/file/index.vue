<template>
  <view class="attach-msg" @tap="previewFile">
    <image class="fileIcon" src="/static/images/msgFile.png" />
    <text class="time"
      >{{ msg.msg.filename }}{{ formatMoney(msg.msg.size) }}</text
    >
  </view>
</template>

<script>
const ATTACH_KEY = "filePathCache";
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
    storageFilePath({ id, path }) {
      uni.getStorage({
        key: ATTACH_KEY,
        success: (res) => {
          let dt = res.data || {};
          uni.setStorage({
            key: ATTACH_KEY,
            data: {
              ...dt,
              [id]: path
            }
          });
        },
        fail: (e) => {
          uni.setStorage({
            key: ATTACH_KEY,
            data: {
              [id]: path
            }
          });
        }
      });
    },
    downloadFile() {
      let _this = this;
      // 下载完存储filePath，下次预览直接访问
      uni.downloadFile({
        url: `${this.msg.msg?.url}`,
        success: function (res) {
          let filePath = res.tempFilePath;
          uni.saveFile({
            tempFilePath: filePath,
            success: function (res) {
              let savedFilePath = res.savedFilePath;
              _this.storageFilePath({
                id: _this.msg.id,
                path: savedFilePath
              });
              _this.openFile(savedFilePath);
            },
            fail: function (e) {
              uni.hideLoading();
              uni.showToast({
                icon: "none",
                title: "保存失败"
              });
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
    },
    openFile(filePath) {
      uni.openDocument({
        filePath,
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
      uni.getStorage({
        key: ATTACH_KEY,
        success: (res) => {
          let dt = res.data || {};
          let path = dt[this.msg.id];
          if (path) {
            this.openFile(path);
          } else {
            this.downloadFile();
          }
        },
        fail: (e) => {
          this.downloadFile();
        }
      });
    }
  }
};
</script>

<style>
@import "./index.css";
</style>
