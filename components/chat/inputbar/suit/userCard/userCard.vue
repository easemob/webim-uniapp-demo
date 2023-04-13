<template>
  <SelectUserCard
    :show-modal="showModal"
    @sendUserCardMessage="sendUserCardMessage"
    @changeShowModal="changeShowModal"
  />
</template>

<script setup>
import { ref, toRefs } from 'vue';
import SelectUserCard from './selectUserCard.vue';
import msgType from '@/components/chat/msgtype';
import msgStorage from '@/components/chat/msgstorage';
import disp from '@/utils/broadcast';
const showModal = ref(false);
/* props */
const props = defineProps({
  chatParams: {
    type: Object,
    default: () => ({}),
  },
  chatType: {
    type: String,
    default: msgType.chatType.SINGLE_CHAT,
  },
});
const { chatParams, chatType } = toRefs(props);
/* emits */
const $emit = defineEmits(['closeFunModal']);

const isGroupChat = () => {
  return chatType.value == msgType.chatType.CHAT_ROOM;
};
const getSendToParam = () => {
  console.log('chatParmas', chatParams);
  return isGroupChat() ? chatParams.value.groupId : chatParams.value.your;
};
const sendUserCardMessage = async (targetId, cb) => {
  const customEvent = 'userCard';
  const friendInfosMap = getApp().globalData.friendUserInfoMap;
  if (targetId) {
    console.log('>>>发送消息', targetId);
    const customExtParams = {
      uid: targetId,
    };
    if (friendInfosMap.has(targetId)) {
      friendInfosMap.get(targetId).nickname
        ? (customExtParams.nickname = friendInfosMap.get(targetId).nickname)
        : '';
      friendInfosMap.get(targetId).avatarurl
        ? (customExtParams.avatarurl = friendInfosMap.get(targetId).avatarurl)
        : '';
    }
    console.log('customExtParams', customExtParams);
    let option = {
      // 设置消息类型。
      type: msgType.CUSTOM,
      // 设置消息接收方。
      from: uni.WebIM.conn.user,
      to: getSendToParam(),
      // 设置消息事件。
      customEvent,
      // 设置消息内容。
      customExts: Object.assign({}, customExtParams),
      chatType: isGroupChat()
        ? msgType.chatType.GROUP_CHAT
        : msgType.chatType.SINGLE_CHAT,
    };
    // 创建自定义消息。
    let msg = uni.WebIM.message.create(option);
    try {
      const res = await uni.WebIM.conn.send(msg);
      console.log('>>>>消息发送成功', msg, res);
      //发送成功存储消息
      //msgBody 消息源数据，msgtype 类型
      //为兼容老的消息体处理，因此将msg嵌套一层放置在body当中。
      let msgBody = {
        body: Object.assign({}, msg),
      };
      msgStorage.saveMsg(msgBody, msgType.CUSTOM);
      $emit('closeFunModal');
    } catch (error) {
      console.log('>>>>发送自定义消息失败', error);
    } finally {
      showModal.value = false;
      cb();
    }
  }
};
const changeShowModal = () => (showModal.value = !showModal.value);
defineExpose({
  showModal,
});
</script>

<style lang="scss" scoped></style>
