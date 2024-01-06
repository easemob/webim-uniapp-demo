<template>
  <SelectUserCard
    ref="selectUserCardComp"
    @sendUserCardMessage="sendUserCardMessage"
  />
</template>

<script setup>
import { ref, computed, inject } from 'vue';
import SelectUserCard from './selectUserCard.vue';
/* EaseIM */
import { MESSAGE_TYPE } from '@/EaseIM/constant';
import { emMessages } from '@/EaseIM/imApis';
/* pinia */
import { useContactsStore } from '@/stores/contacts';
/* inject */
const injectTargetId = inject('targetId');
const injectChatType = inject('chatType');

/* emits */
const emits = defineEmits(['closeAllModal']);

const contactsStore = useContactsStore();
const friendInfosMap = computed(() => {
  return contactsStore.friendUserInfoMap;
});
//执行发送用户卡片信息
const { sendDisplayMessages } = emMessages();
const sendUserCardMessage = async (targetId, cb) => {
  const customEvent = 'userCard';
  if (!targetId) return;
  console.log('>>>发送消息', targetId);
  const friendInfo = friendInfosMap.value.get(targetId) ?? {};
  const { nickname = '', avatarurl = '' } = friendInfo;
  const customExtParams = {
    uid: targetId,
    nickname,
    avatarurl,
  };
  const params = {
    type: MESSAGE_TYPE.CUSTOM,
    // 消息接收方：单聊为对方用户 ID，群聊和聊天室分别为群组 ID 和聊天室 ID。
    to: injectTargetId.value,
    // 会话类型：单聊、群聊和聊天室分别为 `singleChat`、`groupChat` 和 `chatRoom`。
    chatType: injectChatType.value,
    customEvent,
    customExts: { ...customExtParams },
  };
  try {
    await sendDisplayMessages({ ...params });
    emits('closeAllModal');
  } catch (error) {
    uni.showToast({
      title: '消息发送失败',
      icon: 'none',
    });
  } finally {
    cb();
  }
};
const selectUserCardComp = ref(null);
const alertUserCardModal = () => {
  console.log('>>>>>调起弹出');
  selectUserCardComp.value.showSelectUserModal = true;
};
defineExpose({
  alertUserCardModal,
});
</script>

<style lang="scss" scoped></style>
