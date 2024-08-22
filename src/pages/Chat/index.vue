<template>
  <view class="chat-wrap">
    <!-- 消息列表 -->
    <view class="msgs-wrap">
      <!-- 遮照层,点击关闭Toolbar -->
      <view v-if="isShowMask" class="mask" @tap="closeToolbar"></view>

      <MessageList
        v-if="msgs"
        ref="msgListRef"
        :msgs="msgs"
        :conversationId="conversationId"
        :conversationType="conversationType"
      />
    </view>
    <!-- 输入框 -->
    <view class="chat-input-wrap" @tap="closeToolbar">
      <MessageInput
        ref="msgInputRef"
        @onMessageSend="onMessageSend"
        @onShowToolbar="
          isShowToolbar = true;
          isShowEmojiPicker = false;
        "
        @onShowEmojiPicker="
          isShowEmojiPicker = true;
          isShowToolbar = false;
        "
      />
    </view>
    <!-- input toolbar -->
    <view v-if="isShowToolbar" class="chat-input-toolbar-wrap">
      <MessageInputToolbar />
    </view>
    <!-- emoji picker -->
    <EmojiPicker v-if="isShowEmojiPicker" @onEmojiPick="onEmojiPick" />
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useMessageStore } from "@/store/message";
import { useConversationStore } from "@/store/conversation";
import { useAppUserStore } from "@/store/appUser";
import { useGroupStore } from "@/store/group";
import MessageList from "./components/message/messageList.vue";
import MessageInput from "./components/messageInput/index.vue";
import MessageInputToolbar from "./components/messageInputToolBar/index.vue";
import EmojiPicker from "./components/messageInputToolBar/emojiPicker.vue";
import { onMounted, computed, onUnmounted, provide } from "vue";
import type { EasemobChat } from "easemob-websdk/Easemob-chat";
import { onLoad } from "@dcloudio/uni-app";
import type { InputToolbarEvent } from "@/types/index";

const msgListRef = ref(null);
const msgInputRef = ref(null);
const conversationId = ref("");
const isShowToolbar = ref(false);
const isShowEmojiPicker = ref(false);
const conversationType = ref<EasemobChat.ConversationItem["conversationType"]>(
  "" as EasemobChat.ConversationItem["conversationType"]
);
const messageStore = useMessageStore();
const appUserStore = useAppUserStore();
const groupStore = useGroupStore();
const { getHistoryMessages } = messageStore;
const { markConversationRead, setCurrentConversation } = useConversationStore();

const msgs = computed(() => {
  return messageStore.conversationMessagesMap.get(conversationId.value)
    ?.messages;
});

const isShowMask = computed(() => {
  return isShowToolbar.value || isShowEmojiPicker.value;
});

const onMessageSend = () => {
  //@ts-ignore
  msgListRef?.value?.toBottomMsg();
};

const closeToolbar = () => {
  if (isShowToolbar.value === true) {
    isShowToolbar.value = false;
  }
  if (isShowEmojiPicker.value === true) {
    isShowEmojiPicker.value = false;
  }
};

const onEmojiPick = (alt: string) => {
  //@ts-ignore
  msgInputRef?.value.insertEmoji(alt);
};

onMounted(() => {
  if (!conversationId.value && !conversationType.value) {
    return;
  }
  markConversationRead({
    conversationId: conversationId.value,
    conversationType: conversationType.value
  });
  const vl = msgs.value;
  if (!vl) {
    getHistoryMessages({
      conversationId: conversationId.value,
      conversationType: conversationType.value
    } as EasemobChat.ConversationItem);
  }
});

onUnmounted(() => {
  setCurrentConversation(null);
});

onLoad((option) => {
  conversationType.value = option?.type;
  conversationId.value = option?.id;
  if (option?.id) {
    setCurrentConversation({
      conversationId: conversationId.value,
      conversationType: conversationType.value
    });
    let title = "";
    if (conversationType.value === "singleChat") {
      title = appUserStore.getUserInfoFromStore(conversationId.value).name;
    } else {
      title =
        groupStore.getGroupInfoFromStore(conversationId.value)?.groupName || "";
    }
    uni.setNavigationBarTitle({
      title: title
    });
  }
});

provide<InputToolbarEvent>("InputToolbarEvent", {
  onMessageSend,
  closeToolbar
});
</script>
<style lang="scss" scoped>
@import url("./style.scss");
</style>
