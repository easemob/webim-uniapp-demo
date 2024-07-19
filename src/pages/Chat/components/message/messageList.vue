<template>
  <view class="msg-list-wrap">
    <view class="tip">
      本应用仅用于环信产品功能开发测试，请勿用于非法用途。任何涉及转账、汇款、裸聊、网恋、网购退款、投资理财等统统都是诈骗，请勿相信！
    </view>
    <scroll-view
      scroll-y
      :scroll-top="scrollHeight"
      class="message-scroll-list"
      :style="{ height: '100%' }"
      :scroll-into-view="`msg-${currentViewMsgId}`"
    >
      <view class="loadMore" v-if="msgs && !isLast" @tap="loadMore">{{
        $t("loadMore")
      }}</view>
      <view
        class="scroll-msg-item"
        v-for="(msg, idx) in msgs"
        :id="`msg-${msg.id}`"
        :key="msg.id"
      >
        <MessageTime
          :curr-time="msg.time"
          :prev-time="idx > 0 ? msgs[idx - 1].time : 0"
        />
        <NoticeMessageItem
          v-if="msg?.noticeInfo?.type === 'notice'"
          :msg="msg"
        />
        <MessageItem v-else :msg="msg" />
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import type { EasemobChat } from "easemob-websdk/Easemob-chat";
import MessageItem from "./messageItem.vue";
import MessageTime from "./messageTime.vue";
import NoticeMessageItem from "./noticeMessageItem.vue";
import { ref, onMounted, computed, nextTick } from "vue";
import { useMessageStore } from "@/store/message";
import type { MixedMessageBody } from "@/types/index";
interface Props {
  msgs: MixedMessageBody[];
  conversationId: string;
  conversationType: EasemobChat.ConversationItem["conversationType"];
}
const props = defineProps<Props>();

const scrollHeight = ref(0);

const isLoading = ref(false);

const currentViewMsgId = ref<string>("");

const messageStore = useMessageStore();

const { getHistoryMessages } = messageStore;

const isLast = computed(() => {
  return messageStore.conversationMessagesMap.get(props.conversationId)?.isLast;
});

const cursor = computed(() => {
  return messageStore.conversationMessagesMap.get(props.conversationId)?.cursor;
});

const loadMore = async () => {
  if (isLoading.value === true) {
    return;
  }
  isLoading.value = true;
  const viewedMsgId = props.msgs[0].id;
  try {
    await getHistoryMessages(
      {
        conversationId: props.conversationId,
        conversationType: props.conversationType
      } as EasemobChat.ConversationItem,
      cursor.value
    );
    nextTick(() => {
      currentViewMsgId.value = viewedMsgId;
      const timer = setTimeout(() => {
        isLoading.value = false;
        currentViewMsgId.value = "";
        clearTimeout(timer);
      }, 300);
    });
  } catch (error) {
    isLoading.value = false;
  }
};

const toBottomMsg = () => {
  nextTick(() => {
    const timer = setTimeout(() => {
      scrollHeight.value = props.msgs.length * 300;
      clearTimeout(timer);
    }, 100);
  });
};

onMounted(() => {
  toBottomMsg();
});

defineExpose({
  toBottomMsg
});
</script>

<style lang="scss" scoped>
.msg-list-wrap {
  height: 100%;
  overflow-y: scroll;
}

.message-scroll-list {
  height: 100%;
  overflow-y: scroll;
}

.scroll-msg-item {
  padding: 0 30rpx;
}

.loadMore {
  text-align: center;
  font-size: 28rpx;
  margin: 10rpx 0;
  color: #999;
}

.tip {
  position: fixed;
  top: 100px;
  left: 40px;
  right: 40px;
  color: #bbb;
  text-align: center;
}
</style>
