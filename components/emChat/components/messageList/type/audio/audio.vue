<template>
  <view
    class="audio-player"
    @tap="playAudioMessage"
    :style="'opacity: ' + audioState.opcity"
  >
    <text class="time"
      >语音消息
      {{
        msg.length
          ? msg.length + '′′'
          : msg.body.length
          ? msg.body.length + '′′'
          : ''
      }}</text
    >
    <view class="controls play-btn">
      <image
        :src="
          isSelf(msg)
            ? '../../../../../static/images/voicemsgmy.png'
            : '../../../../../static/images/voicemsg.png'
        "
      ></image>
    </view>
  </view>
</template>

<script setup>
import { reactive, toRefs, computed, onBeforeUnmount } from 'vue';
/* stores */
import { useLoginStore } from '@/stores/login';
/* props */
const props = defineProps({
  msg: {
    type: Object,
    val: {},
  },
});
const { msg } = toRefs(props);
console.log('.>>>>>>>>传递过来的语音消息数据', msg.value);
const loginStore = useLoginStore();
//判消息来源是否为自己
const isSelf = computed(() => {
  return (item) => {
    return item.from === loginStore.loginUserBaseInfos.loginUserId;
  };
});
const audioState = reactive({
  opcity: 1,
  style: '',
});
let playAnimation = null;
const innerAudioContext = uni.createInnerAudioContext({
  obeyMuteSwitch: false,
});
innerAudioContext.onPlay(() => {
  console.log('>>>>>音频播放事件触发');
  playAnimation && clearInterval(playAnimation);
  playAnimation = setInterval(() => {
    let opcity = audioState.opcity;
    audioState.opcity = opcity == 1 ? 0.4 : 1;
  }, 500);
});
innerAudioContext.onEnded(() => {
  console.log('>>>音频播放结束');
  playAnimation && clearInterval(playAnimation);
  audioState.opcity = 1;
});
innerAudioContext.onError((res) => {
  console.log(res.errMsg);
  console.log(res.errCode);
  uni.showToast({ title: '播放失败', icon: 'none' });
});
const formatAudioToMp3 = () => {
  uni.downloadFile({
    url: msg.value?.url ? msg.value.url : msg.value?.body?.url,
    header: {
      'X-Requested-With': 'XMLHttpRequest',
      Accept: 'audio/mp3',
      Authorization: 'Bearer ' + msg.value.accessToken,
    },

    success(res) {
      const tempFilePath = res.tempFilePath;
      console.log('>>>>>>音频下载完成', tempFilePath);
      innerAudioContext.src = tempFilePath;
      if (innerAudioContext?.src) {
        innerAudioContext.play();
      }
    },

    fail(e) {
      console.log('downloadFile failed', e);
      uni.showToast({
        title: '下载失败',
        duration: 1000,
      });
    },
  });
};
const playAudioMessage = () => {
  formatAudioToMp3();
};

onBeforeUnmount(() => {
  //离开页面卸载音频播放实例
  innerAudioContext.destroy();
});
</script>
<style>
@import './audio.css';
</style>
