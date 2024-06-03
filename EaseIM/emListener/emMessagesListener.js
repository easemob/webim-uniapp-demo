import { EMClient } from '../index';
import store from '@/store';
import {
  CHAT_TYPE,
  HANDLER_EVENT_NAME,
  MESSAGE_STATUS,
  MESSAGE_TYPE,
} from '../constant';
import { getEMKey } from '@/EaseIM/utils';
export const emMessagesListener = (callback, listenerEventName) => {
  console.log('消息监听已挂载');
  //处理展示类型消息（txt、image、file...）
  const handleReciveDisPlayMessages = (message) => {
    console.log('>>>>开始处理收到的消息', message);
    let key = getEMKey(
      EMClient.user,
      message.from,
      message.to,
      message.chatType
    );
    //向消息集合中添加新消息
    store.commit('UPDATE_MESSAGE_COLLECTION', {
      key,
      message,
    });
    store.commit('UPDATE_CONVERSATION_ITEM', {
      conversationId: key,
      lastMessage: message,
    });
    // messageStore.updateMessageCollection(key, message);
    // conversationStore.updateConversationLastMessage(key, message);
    // }
  };
  //处理回执类型消息
  const handleReciveAckMessages = (message) => {
    console.log('>>>>开始处理回执类型消息');
  };
  //处理撤回类型消息
  const handleReciveRecallMessage = (message) => {
    const { mid } = message;
    //收集消息状态--撤回
    store.commit('UPDATE_MESSAGE_COLLECTION_STATUS', {
      key: mid,
      status: MESSAGE_STATUS.RECALL,
    });
    console.log('>>>>开始处理撤回类型消息', message);
  };
  //处理command 命令消息
  const handleReciveCommandMessage = (message) => {
    console.log('>>>>开始处理命令消息', message);
    //action TypingBegin
    const { action, from } = message;
    switch (action) {
      //处理对方正在输入状态
      case 'TypingBegin':
        {
          const chattingId = store.getters.chattingId;
          const chattingTypingStatus = store.getters.chattingTypingStatus;
          if (from === chattingId && chattingTypingStatus === false) {
            store.commit('SET_CHATING_USER_INFO_TYPING_STATUS', true);
            setTimeout(() => {
              //5s重置输入中的状态
              store.commit('SET_CHATING_USER_INFO_TYPING_STATUS', false);
            }, 5000);
          }
        }
        break;

      default:
        break;
    }
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
      handleReciveCommandMessage({ ...message });
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
    //监听到有用户修改消息
    onModifiedMessage: function (message) {
      let key = getEMKey(
        EMClient.user,
        message.from,
        message.to,
        message.chatType
      );
      if (message.type === MESSAGE_TYPE.TEXT) {
        store.commit('MODIFY_MESSAGE_FROM_COLLECTION', {
          key,
          mid: message.id,
          msg: message.msg,
        });
      }
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
