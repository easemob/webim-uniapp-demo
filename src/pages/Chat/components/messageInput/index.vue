<template>
  <view class="message-input-wrap">
    <!-- #ifndef WEB -->
    <view class="icon-wrap" @tap="isSendAudio = !isSendAudio">
      <image class="icon" :src="isSendAudio ? Keyboard : AudioIcon"></image>
    </view>
    <view class="send-audio" v-if="isSendAudio">
      <AudioMessageSender />
    </view>
    <!-- #endif -->
    <view class="send-input" v-if="!isSendAudio">
      <input
        v-model="text"
        :adjust-position="true"
        :auto-blur="true"
        confirm-type="send"
        @confirm="handleSendMessage"
        :placeholder="$t('sendMessagePlaceholder')"
      />
    </view>
    <view class="icon-wrap">
      <image class="icon" @tap.stop="showToolbar" :src="PlusIcon"></image>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";
import { useConnStore } from "@/store/conn";
import { useConversationStore } from "@/store/conversation";
import { useMessageStore } from "@/store/message";
import { useAppUserStore } from "@/store/appUser";
import AudioMessageSender from "../messageInputToolBar/audioSender.vue";
import PlusIcon from "@/static/images/inputbar/tofeipeng/icons/plus_in_circle@2x.png";
import AudioIcon from "@/static/images/inputbar/audio_click_icon.png";
import Keyboard from "@/static/images/inputbar/keyboard.png";

const emits = defineEmits(["onMessageSend", "onShowToolbar"]);

const convStore = useConversationStore();

const { getSelfUserInfo } = useAppUserStore();

const { sendMessage } = useMessageStore();

const { getChatSDK } = useConnStore();

// 是否发送语音消息
const isSendAudio = ref(false);

const SDK = getChatSDK();

const text = ref("");

const showToolbar = () => {
  // 切换语音发送，否则发送语音计算位置有问题
  isSendAudio.value = false;
  emits("onShowToolbar");
};

const handleSendMessage = async () => {
  const msg = SDK.message.create({
    to: convStore.currConversation!.conversationId,
    chatType: convStore.currConversation!.conversationType,
    type: "txt",
    msg: text.value,
    ext: {
      ease_chat_uikit_user_info: {
        avatarURL: getSelfUserInfo().avatar,
        nickname: getSelfUserInfo().name
      }
    }
  });
  text.value = "";
  try {
    await sendMessage(msg);
    nextTick(() => {
      emits("onMessageSend");
    });
  } catch (error: any) {
    uni.showToast({
      title: `send failed: ${error.message}`,
      icon: "none"
    });
  }
};
</script>
<style lang="scss" scoped>
@import url("./style.scss");
</style>
