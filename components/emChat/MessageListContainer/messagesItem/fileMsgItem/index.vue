<template>
  <view
    :class="[
      'file_msg_container',
      isSelf ? 'file_msg_container_mine' : 'file_msg_container_other',
    ]"
    @tap="previewFile"
  >
    <view class="file_msg_content">
      <text class="name">
        {{ msgBody.filename }}
      </text>
      <text class="size">{{ formatMoney(msgBody.file_length) }}</text>
    </view>
    <image
      class="file_msg_icon"
      src="/static/images/new_ui/message/file_msg_icon.png"
    />
  </view>
</template>

<script>
const ATTACH_KEY = 'filePathCache';
export default {
  props: {
    msgBody: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {};
  },
  computed: {
    isSelf() {
      const { from } = this.msgBody;
      return (
        from === this.$store.state.LoginStore.loginUserBaseInfos.loginUserId
      );
    },
    formatMoney() {
      return (value) => {
        return `${(value / 1024 / 1024).toFixed(2)}M`;
      };
    },
  },
  methods: {
    storageFilePath({ id, path }) {
      uni.getStorage({
        key: ATTACH_KEY,
        success: (res) => {
          let dt = res.data || {};
          uni.setStorage({
            key: ATTACH_KEY,
            data: {
              ...dt,
              [id]: path,
            },
          });
        },
        fail: (e) => {
          uni.setStorage({
            key: ATTACH_KEY,
            data: {
              [id]: path,
            },
          });
        },
      });
    },
    downloadFile() {
      let _this = this;
      // 下载完存储filePath，下次预览直接访问
      uni.downloadFile({
        url: `${this.msgBody?.url}`,
        success: function (res) {
          let filePath = res.tempFilePath;
          uni.saveFile({
            tempFilePath: filePath,
            success: function (res) {
              let savedFilePath = res.savedFilePath;
              _this.storageFilePath({
                id: _this.msg.id,
                path: savedFilePath,
              });
              _this.openFile(savedFilePath);
            },
            fail: function (e) {
              uni.hideLoading();
              uni.showToast({
                icon: 'none',
                title: '保存失败',
              });
            },
          });
        },
        fail: () => {
          uni.hideLoading();
          uni.showToast({
            icon: 'none',
            title: '失败请重新下载',
          });
        },
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
            title: '暂不支持此类型',
            duration: 2000,
          });
          uni.hideLoading();
        },
      });
    },
    previewFile() {
      let sysInfo = uni.getSystemInfoSync();
      if (sysInfo.uniPlatform === 'web') {
        uni.showToast({
          title: 'H5暂不支持预览文件消息',
          duration: 2000,
          icon: 'none',
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
        },
      });
    },
  },
};
</script>

<style>
.file_msg_container {
  width: 245px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  box-sizing: border-box;
}
.file_msg_container_mine {
  flex-direction: row-reverse;
  color: #f9fafa;
  background-color: #009eff;
  border-radius: 16px 12px 4px 16px;
}
.file_msg_container_other {
  color: #171a1c;
  background-color: #e5f5ff;
  border-radius: 12px 16px 16px 4px;
}
.file_msg_icon {
  width: 44px;
  height: 44px;
}
.file_msg_content {
  display: flex;
  flex-direction: column;
  height: 42px;
  align-items: flex-start;
}
.file_msg_content .name {
  /* Credo dalle tre alle */

  height: 24px;

  /* 简体中文/次级标题/中 */
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
}
.file_msg_content .size {
  /* Alphabet/Body/Medium */
  font-family: 'SF Pro';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  /* identical to box height, or 129% */
  letter-spacing: 0.001em;

  /* Neutral/95 */
}
</style>
