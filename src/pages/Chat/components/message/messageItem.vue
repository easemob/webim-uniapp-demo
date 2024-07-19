<template>
  <view
    class="msg-item-wrap"
    :style="{ flexDirection: isSelf ? 'row-reverse' : 'row' }"
  >
    <view class="avatar-wrap">
      <Avatar
        :src="
          getUserInfoFromStore(msg.from || '').avatar ||
          extUserInfo.avatarURL ||
          ''
        "
        :placeholder="defaultAvatar"
      />
    </view>
    <view class="msg-content" :style="{ textAlign: isSelf ? 'right' : 'left' }">
      <view v-if="!isSelf">
        {{
          getUserInfoFromStore(msg.from || "").nickname || extUserInfo.nickname
        }}
      </view>
      <view
        class="mask"
        @longpress.stop="() => {}"
        @tap="isShowOperation = !isShowOperation"
        v-if="isShowOperation"
      ></view>

      <view :class="bubbleClass" @longpress="showMsgOperation">
        <MessageOperation
          v-if="isShowOperation && isSelf"
          @onFinished="isShowOperation = false"
          :msg="msg"
          :isSelf="isSelf"
        />
        <view v-if="msg.type === 'txt'">
          <TextMessage :msg="msg" />
        </view>
        <view v-else-if="msg.type === 'img'">
          <ImageMessage :msg="msg" />
        </view>
        <view v-else-if="msg.type === 'video'">
          <VideoMessage :msg="msg" />
        </view>
        <view v-else-if="msg.type === 'audio'">
          <AudioMessage :msg="msg" />
        </view>
        <view v-else-if="msg.type === 'custom'">
          <view>[Custom]</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import Avatar from "@/components/avatar/index.vue";
import TextMessage from "./messageTxt.vue";
import ImageMessage from "./messageImage.vue";
import VideoMessage from "./messageVideo.vue";
import AudioMessage from "./messageAudio.vue";
import MessageOperation from "./messageOperation.vue";
import defaultAvatar from "@/static/images/defaultAvatar.png";
import { useConnStore } from "@/store/conn";
import { useAppUserStore } from "@/store/appUser";
import type { MixedMessageBody } from "@/types/index";
import { ref, computed } from "vue";

const isShowOperation = ref(false);

interface Props {
  msg: MixedMessageBody;
}
const props = defineProps<Props>();

const appUserStore = useAppUserStore();

const { getUserInfoFromStore } = appUserStore;

const isSelf =
  useConnStore().getChatConn().user === props.msg.from || props.msg.from === "";

const showMsgOperation = () => {
  isShowOperation.value = true;
};

const extUserInfo = props.msg.ext?.ease_chat_uikit_user_info || {};

const bubbleClass = computed(() => {
  if (props.msg.type !== "img" && props.msg.type !== "video") {
    return "msg-bubble msg-bubble-bg";
  }
  return "msg-bubble";
});
</script>

<style lang="scss" scoped>
.msg-item-wrap {
  display: flex;
  width: 100%;
  display: flex;
  margin-bottom: 30rpx;
  align-items: center;
  color: #333;

  .msg-bubble-bg {
    background: #f5f5f5;
  }

  .msg-bubble {
    font-size: 28rpx;
    display: inline-block;
    word-break: break-all;
    border-radius: 20rpx;
    padding: 14rpx;
    max-width: calc(100vw - 200rpx);
    min-width: 30rpx;
  }

  .msg-content {
    width: 100%;
    position: relative;
    margin: 0 20rpx 20rpx;
  }

  .avatar-wrap {
    align-self: self-end;
  }

  .mask {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 98;
    top: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
