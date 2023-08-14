<template>
  <view>
    <uv-popup ref="invitePopup" mode="bottom" round="10">
      <view class="invite_btn_box">
        <text class="invite_func_btn">视频通话</text>
        <text class="invite_func_btn">语音通话</text>
        <text
          class="invite_func_btn invite_func_btn_cannel"
          @click="closeInvitePopup"
          >取消</text
        >
      </view>
    </uv-popup>
  </view>
</template>

<script setup>
import { ref } from 'vue';
const invitePopup = ref(null);
const openInvitePopup = () => {
  invitePopup.value.open();
};
const closeInvitePopup = () => {
  invitePopup.value.close();
};

defineExpose({
  openInvitePopup,
});
</script>

<style>
.invite_btn_box {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  box-sizing: border-box;
}
.invite_func_btn {
  height: 55px;
  width: 100%;
  text-align: center;
}
.invite_func_btn_cannel {
  color: red;
}
</style>
