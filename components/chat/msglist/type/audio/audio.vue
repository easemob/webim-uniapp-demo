<template>
  <view
    class="audio-player"
    @tap="audioPlay"
    :style="'opacity: ' + audioState.opcity"
  >
    <text class="time">语音消息 {{ audioState.time }}</text>
    <view class="controls play-btn">
      <image
        :src="
          audioState.style == 'self'
            ? '../../../../../static/images/voicemsgmy.png'
            : '../../../../../static/images/voicemsg.png'
        "
      ></image>
    </view>
  </view>
</template>

<script setup>
import { reactive, toRefs, onMounted, onUnmounted } from 'vue';
import audioCtxFc from './audioCtxFactory';
import playStatus from './playStatus';
/* props */
const props = defineProps({
  msg: {
    type: Object,
    val: {},
  },
});
const { msg } = toRefs(props);
const audioState = reactive({
  time: "0'",
  opcity: 1,
  __comps__: {
    audioCtx: null,
  },
  style: '',
  curStatus: '',
});
let obeyMuteSwitch = false;
let autoplay = true;

audioState.time = msg.value.msg.length + "''";
audioState.style = msg.value.style;

onMounted(() => {
  let curl = '';
  let audioCtx = (audioState.__comps__.audioCtx = audioCtxFc.getCtx(
    msg.value.mid
  ));
  audioCtx.autoplay = false;
  audioCtx.loop = false; //
  addEvent();
});
const audioPlay = () => {
  if (uni.getSystemInfo().app === 'alipay') {
    // https://forum.alipay.com/mini-app/post/7301031?ant_source=opendoc_recommend
    uni.showToast({
      duration: 2000,
      title: '支付宝小程序不支持音频消息',
    });
    return;
  }
  uni.inter && clearInterval(uni.inter);
  let audioCtx = audioState.__comps__.audioCtx;
  var curl = '';
  uni.downloadFile({
    url: msg.value.msg.data,
    header: {
      'X-Requested-With': 'XMLHttpRequest',
      Accept: 'audio/mp3',
      Authorization: 'Bearer ' + msg.value.msg.token,
    },

    success(res) {
      curl = res.tempFilePath;
      console.log('音频本地', audioCtx); //renderableMsg.msg.url = res.tempFilePath;

      audioCtx.src = curl;
      audioCtx.play();
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

const audioPause = (auCtx) => {
  //let audioCtx = this.data.__comps__.audioCtx;
  let audioCtx = (audioState.__comps__.audioCtx =
    audioCtxFc.getCtx(msg.value.mid) || auCtx);
  audioCtx && audioCtx.pause();
};

const addEvent = () => {
  let audioCtx = audioState.__comps__.audioCtx;
  audioCtx.onPlay(onPlaying);
  audioCtx.onPause(onPause);
  audioCtx.onWaiting(onPause);
  audioCtx.onStop(onDone);
  audioCtx.onEnded(onDone);
  audioCtx.onError(onDone);
  audioCtx.onWaiting(onWait); //audioCtx.onTimeUpdate(this.onTimeUpdate);
};

const delEvent = () => {
  let audioCtx = audioState.__comps__.audioCtx;
  audioCtx.offPlay(onPlaying);
  audioCtx.offPause(onPause);
  audioCtx.offWaiting(onPause);
  audioCtx.offStop(onDone);
  audioCtx.offEnded(onDone);
  audioCtx.offError(onDone);
  audioCtx.offWaiting(onWait); // 多次播放会丢失这个回调，所以不用卸载
  // audioCtx.offTimeUpdate(this.onTimeUpdate);
};
const onPlaying = () => {
  //console.log("onPlaying", JSON.stringify(this.data));
  audioState.curStatus = playStatus.PLAYING;
  uni.inter && clearInterval(uni.inter);
  uni.inter = setInterval(() => {
    let opcity = audioState.opcity;
    audioState.opcity = opcity == 1 ? 0.4 : 1;
  }, 500);
};

const onPause = () => {
  // console.log("onPause", JSON.stringify(this.data));
  // 第二次播放会立即抛出一个异常的 onPause
  if (parseInt(audioState.time, 10) < 1) {
    return;
  }

  audioState.curStatus = playStatus.PAUSE;
  audioState.opcity = 1;
};

const onDone = () => {
  // console.log("onDone", JSON.stringify(this.data));
  audioState.curStatus = playStatus.STOP;
  audioState.opcity = 1;
  clearInterval(uni.inter);
}; // 多次播放会丢失这个回调

const onTimeUpdate = () => {
  audioState.time = (audioCtx.currentTime >> 0) + "'";
};

const onWait = () => {
  uni.showToast({
    title: '下载中...',
    duration: 1000,
  });
};
onUnmounted(() => {
  let audioCtx = (audioState.__comps__.audioCtx = audioCtxFc.getCtx(
    msg.value.mid
  ));
  audioPause(audioCtx);
  delEvent(); //audioCtx.destroy();
});
</script>
<style>
@import './audio.css';
</style>
