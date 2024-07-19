<template>
  <view class="conversation-item-wrap" @tap="toChatPage">
    <view class="avatar-wrap">
      <Avatar
        :src="conversationInfo.avatar"
        :placeholder="getAvatarPlaceholder()"
      />
      <view v-if="conversation.unReadCount > 0" class="unread-count">
        {{ conversation.unReadCount > 99 ? "99+" : conversation.unReadCount }}
      </view>
    </view>
    <view class="content-wrap">
      <view class="user-info-wrap">
        <view class="user-nick-name ellipsis">{{ conversationInfo.name }}</view>
        <view class="msg-wrap">
          <view class="last-msg ellipsis">{{
            formatLastMessage(conversation)
          }}</view>
        </view>
      </view>
      <view class="time">{{
        getConversationTime(conversation.lastMessage)
      }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { EasemobChat } from "easemob-websdk/Easemob-chat";
import Avatar from "@/components/avatar/index.vue";
import defaultAvatar from "@/static/images/defaultAvatar.png";
import defaultGroupAvatar from "@/static/images/defaultGroupAvatar.png";
import { useI18n } from "vue-i18n";
import { useConversationStore } from "@/store/conversation";
import { useGroupStore } from "@/store/group";
import { useAppUserStore } from "@/store/appUser";
import { computed } from "vue";

const { t } = useI18n();

interface Props {
  conversation: EasemobChat.ConversationItem;
}
const props = defineProps<Props>();

const appUserStore = useAppUserStore();

const groupStore = useGroupStore();

const conversationInfo = computed(() => {
  const convId = props.conversation.conversationId;
  if (props.conversation.conversationType === "groupChat") {
    const groupInfo = groupStore.getGroupInfoFromStore(convId);
    return {
      name: groupInfo?.groupName,
      avatar: ""
    };
  } else {
    return appUserStore.getUserInfoFromStore(convId);
  }
});

const { getConversationTime } = useConversationStore();

const getAvatarPlaceholder = () => {
  return props.conversation.conversationType === "groupChat"
    ? defaultGroupAvatar
    : defaultAvatar;
};

const toChatPage = () => {
  uni.navigateTo({
    url: `../../pages/Chat/index?type=${props.conversation.conversationType}&id=${props.conversation.conversationId}`
  });
};

const formatLastMessage = (conversation: EasemobChat.ConversationItem) => {
  let lastMsg = "";
  switch (conversation.lastMessage?.type) {
    case "txt":
      if (conversation.lastMessage?.msg == "the combine message") {
        lastMsg = `/${t("chatHistory")}/`;
      } else {
        lastMsg = conversation.lastMessage?.msg;
      }
      break;
    case "img":
      lastMsg = `/${t("image")}/`;
      break;
    case "audio":
      lastMsg = `/${t("audio")}/`;
      break;
    case "file":
      lastMsg = `/${t("file")}/`;
      break;
    case "video":
      lastMsg = `/${t("video")}/`;
      break;
    case "custom":
      if (conversation.lastMessage.customEvent == "userCard") {
        lastMsg = `/${t("contact")}/`;
      } else {
        lastMsg = `/${t("custom")}/`;
      }
      break;
    case "combine":
      lastMsg = `/${t("chatHistory")}/`;
      break;
    default:
      console.warn("unexpected message type:", conversation.lastMessage?.type);
      break;
  }
  return lastMsg;
};
</script>
<style lang="scss">
@import url("./style.scss");
</style>
