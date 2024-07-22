<template>
  <view
    :class="[
      'audio_msg_container',
      isSelf ? 'audio_msg_container_mine' : 'audio_msg_container_other',
    ]"
    @click="playAudioMessage"
  >
    <view
      :class="[
        'audio_msg_play_icon',
        isSelf ? 'audio_msg_play_icon_mine' : 'audio_msg_play_icon_other',
        playAudioMid == msgBody.id
          ? isSelf
            ? 'start_mine_play_audio'
            : 'start_other_play_audio'
          : '',
      ]"
    >
    </view>
    <view class="audio_msg_length">{{ audioLength }}''</view>
  </view>
</template>

<script>
import { EMClient } from '@/EaseIM';
const loginAccessToken = EMClient.token;

export default {
  props: {
    msgBody: {
      type: Object,
      default: () => ({}),
    },
    playAudioMid: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      innerAudioContext: null,
      isPlaying: false,
    };
  },
  computed: {
    isSelf() {
      const { from } = this.msgBody;
      return (
        from === this.$store.state.LoginStore.loginUserBaseInfos.loginUserId
      );
    },
    audioLength() {
      const { length, body } = this.msgBody;
      return length || body?.length;
    },
  },
  mounted() {
    this.innerAudioContext = uni.createInnerAudioContext({
      obeyMuteSwitch: false,
    });
    this.innerAudioContext.onPlay(() => {
      console.log('>>>>>播放中');
    });
    this.innerAudioContext.onEnded(() => {
      this.$emit('onClickPlayAudio', '');
    });
    this.innerAudioContext.onError((res) => {
      console.log(res.errMsg);
      uni.showToast({ title: '播放失败', icon: 'none' });
    });
  },
  methods: {
    //转换为mp3格式
    formatAudioToMp3() {
      const { url, body } = this.msgBody;
      uni.downloadFile({
        url: url || body?.url,
        header: {
          'X-Requested-With': 'XMLHttpRequest',
          Accept: 'audio/mp3',
          Authorization: 'Bearer ' + loginAccessToken,
        },

        success: (res) => {
          console.log('>>>>>成功拿到播放地址', res);
          const tempFilePath = res.tempFilePath;
          this.innerAudioContext.src = tempFilePath;
          console.log(this.innerAudioContext.src);
          this.innerAudioContext.play();
        },

        fail: (e) => {
          console.log('downloadFile failed', e);
          uni.showToast({
            title: '语音转mp3失败',
            duration: 2000,
          });
        },
      });
    },
    playAudioMessage() {
      const { id } = this.msgBody;
      this.formatAudioToMp3();
      console.log('>>>>>通知进行播放');
      this.$emit('onClickPlayAudio', id);
    },
  },
  beforeDestroy() {
    this.innerAudioContext && this.innerAudioContext.destroy();
  },
};
</script>

<style scoped>
@import './index.css';
</style>
