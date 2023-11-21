<template>
  <div>
    <em-chat />
  </div>
</template>

<script setup>
import {
  toRefs,
  reactive,
  provide,
  readonly,
  computed,
  onUnmounted,
} from 'vue';
import EmChat from '@/components/emChat/emChat';
import { onNavigationBarButtonTap } from '@dcloudio/uni-app';
import { useContactsStore } from '@/stores/contacts';
import { useGroupStore } from '@/stores/group';
import { useConversationStore } from '@/stores/conversation';
import { CHAT_TYPE } from '@/EaseIM/constant';
const props = defineProps({
  targetId: {
    type: String,
    value: '',
    required: true,
  },
  chatType: {
    type: String,
    value: '',
    required: true,
  },
});

const { targetId, chatType } = toRefs(reactive(props));
provide('targetId', readonly(targetId));
provide('chatType', readonly(chatType));

/* 处理NavigationBarTitle展示 */
//群组名称
const groupStore = useGroupStore();
const getGroupName = (groupid) => {
  const joinedGroupList = groupStore.joinedGroupList;
  let groupName = '';
  if (joinedGroupList.length) {
    joinedGroupList.forEach((item) => {
      if (item.groupid === groupid) {
        return (groupName = item.groupname);
      }
    });
    return groupName;
  } else {
    return groupid;
  }
};
const contactsStore = useContactsStore();
//好友属性
const friendUserInfoMap = computed(() => {
  return contactsStore.friendUserInfoMap;
});
//会话列表名称
const getTheIdName = (chatType, targetId) => {
  switch (chatType) {
    case CHAT_TYPE.SINGLE_CHAT:
      const friendInfo = friendUserInfoMap.value.get(targetId);
      return friendInfo?.nickname || targetId;
    case CHAT_TYPE.GROUP_CHAT:
      return getGroupName(targetId);
    default:
      return null;
  }
};
uni.setNavigationBarTitle({
  title: getTheIdName(chatType.value, targetId.value),
});

onNavigationBarButtonTap(() => {
  uni.navigateTo({
    url: `/pages/moreMenu/moreMenu?username=${targetId.value}&type=${chatType.value}`,
  });
});
//处理离开聊天组件清除当前会话中id信息
const conversationStore = useConversationStore();
onUnmounted(() => {
  conversationStore.setChattingUserId('');
});
</script>

<style scoped>
@import './index.css';
</style>
