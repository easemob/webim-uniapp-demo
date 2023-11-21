<template>
  <view class="attach-msg" @tap="previewFile">
    <image class="fileIcon" src="/static/images/msgFile.png" />
    <text class="time"
      >{{ msg.filename || msg.body.filename
      }}{{ formatMoney(msg.file_length || msg.body.file_length) }}</text
    >
  </view>
</template>

<script setup>
import { computed, toRefs } from 'vue';
const ATTACH_KEY = 'filePathCache';
/* props */
const props = defineProps({
  msg: {
    type: Object,
    default: () => ({}),
  },
});
const { msg } = toRefs(props);

const formatMoney = computed(() => {
  return (size) => {
    return (size / 1024 / 1024).toFixed(2) + 'MB';
  };
});
const storageFilePath = ({ id, path }) => {
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
};
const downloadFile = () => {
  // 下载完存储filePath，下次预览直接访问
  uni.downloadFile({
    url: `${msg.value?.url}`,
    success: function (res) {
      let filePath = res.tempFilePath;
      uni.saveFile({
        tempFilePath: filePath,
        success: function (res) {
          let savedFilePath = res.savedFilePath;
          storageFilePath({
            id: msg.value.id,
            path: savedFilePath,
          });
          openFile(savedFilePath);
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
};
const openFile = (filePath) => {
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
};
const previewFile = () => {
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
      let path = dt[msg.value.id];
      if (path) {
        openFile(path);
      } else {
        downloadFile();
      }
    },
    fail: (e) => {
      downloadFile();
    },
  });
};
</script>

<style>
@import './index.css';
</style>
