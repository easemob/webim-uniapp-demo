<template>
  <view>
    <view class="audio_start_box" @click="startRecordAudio">
      <image src="/static/images/new_ui/inputbar/audio_click_start_icon.png">
      </image>
      <text>点击录音</text>
    </view>
    <u-popup :show="isStartRecording" @close="isStartRecording = false">
      <view class="audio_record_box">
        <image
          class="audio_icon"
          src="/static/images/new_ui/inputbar/audio_delete_icon.png"
        ></image>
        <view class="record_statistics_box">
          <view class="record_length_text">1s</view>
          <text>正在录音</text>
        </view>

        <image
          class="audio_icon"
          src="/static/images/new_ui/inputbar/audio_send_icon.png"
        ></image>
      </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isStartRecording: false,
    };
  },
  methods: {
    startRecordAudio() {
      console.log('>>>>>开始采集');
      this.isStartRecording = true;
    },
  },
};
</script>

<style scoped>
.audio_record_box {
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background: #fff;
}
.audio_start_box {
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.audio_start_box image {
  width: 48px;
  height: 48px;
}
.audio_start_box text {
  /* 点击录音 */

  width: 56px;
  height: 18px;

  /* 简体中文/标签/中 */
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  /* identical to box height, or 129% */
  text-align: center;

  /* Neutral/5 */
  color: #75828a;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;
}
.audio_icon {
  width: 36px;
  height: 36px;
}
.record_statistics_box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  height: 82px;
}
.record_length_text {
  width: 80px;
  height: 48px;
  line-height: 48px;
  text-align: center;
  background: #009eff;
  border-radius: 45px;
  border: 10px solid #e5f5ff;
  color: #e5f5ff;
}
.record_statistics_box text {
  /* 正在录音 */

  width: 56px;
  height: 18px;

  /* 简体中文/标签/中 */
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  /* identical to box height, or 129% */
  text-align: center;

  /* Neutral/5 */
  color: #75828a;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;
}
</style>
