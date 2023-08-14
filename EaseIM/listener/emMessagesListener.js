import { EMClient } from '../index';
import { useMessageStore } from '@/stores/message';
import { useConversationStore } from '@/stores/conversation';
import { CHAT_TYPE, HANDLER_EVENT_NAME } from '../constant';
import { getEMKey } from '@/EaseIM/utils';
export const emMessagesListener = (callback, listenerEventName) => {
  console.log('消息监听已挂载');
  const messageStore = useMessageStore();
  const conversationStore = useConversationStore();
  //处理展示类型消息（txt、image、file...）
  const handleReciveDisPlayMessages = (message) => {
    console.log('>>>>开始处理收到的消息', message);
    //如果是在线推送消息则进行调起通知栏进行通知
    // if (message.type === 'cmd' && message.action === 'em_custom_notification') {
    //   const {
    //     ext: { em_notification },
    //   } = message;
    //   const params = {
    //     title: em_notification.title,
    //     content: em_notification.content,
    //     payload: {},
    //     icon: em_notification.icon_url,
    //     success: () => {
    //       console.log('>>>>推送接口调用成功');
    //     },
    //     fail: (error) => {
    //       console.log('>>>>推送接口调用失败', error);
    //     },
    //   };
    //   //调起推送通知栏
    //   uni.createPushMessage({ ...params });
    // } else {
    let key = getEMKey(
      EMClient.user,
      message.from,
      message.to,
      message.chatType
    );
    messageStore.updateMessageCollection(key, message);
    conversationStore.updateConversationLastMessage(key, message);
    // }
  };
  //处理回执类型消息
  const handleReciveAckMessages = (message) => {
    console.log('>>>>开始处理回执类型消息');
  };
  //处理撤回类型消息
  const handleReciveRecallMessage = (message) => {
    console.log('>>>>开始处理撤回类型消息');
  };
  const messagesListenFunc = {
    // 当前用户收到文本消息。
    onTextMessage: function (message) {
      handleReciveDisPlayMessages({ ...message });
    },
    // 当前用户收到图片消息。
    onImageMessage: function (message) {
      handleReciveDisPlayMessages({ ...message });
    },
    // 当前用户收到透传消息。
    onCmdMessage: function (message) {
      //cmd消息暂不处理
      //   handleReciveDisPlayMessages({ ...message });
    },
    // 当前用户收到语音消息。
    onAudioMessage: function (message) {
      handleReciveDisPlayMessages({ ...message });
    },
    // 当前用户收到位置消息。
    onLocationMessage: function (message) {
      handleReciveDisPlayMessages({ ...message });
    },
    // 当前用户收到文件消息。
    onFileMessage: function (message) {
      handleReciveDisPlayMessages({ ...message });
    },
    // 当前用户收到自定义消息。
    onCustomMessage: function (message) {
      handleReciveDisPlayMessages({ ...message });
    },
    // 当前用户收到视频消息。
    onVideoMessage: function (message) {
      handleReciveDisPlayMessages({ ...message });
    },
    // 当前用户收到的消息被消息发送方撤回。
    onRecallMessage: function (message) {
      handleReciveRecallMessage({ ...message });
    },
    // 当前用户发送的消息被接收方收到。
    onReceivedMessage: function (message) {
      handleReciveAckMessages({ ...message });
    },
    // 当前用户收到消息送达回执。
    onDeliveredMessage: function (message) {
      handleReciveAckMessages({ ...message });
    },
    // 当前用户收到消息已读回执。
    onReadMessage: function (message) {
      handleReciveAckMessages({ ...message });
    },
    // 当前用户收到会话已读回执。
    onChannelMessage: function (message) {
      handleReciveAckMessages({ ...message });
    },
  };
  EMClient.removeEventHandler(
    listenerEventName || HANDLER_EVENT_NAME.MESSAGES_EVENT
  );
  EMClient.addEventHandler(
    listenerEventName || HANDLER_EVENT_NAME.MESSAGES_EVENT,
    messagesListenFunc
  );
};
