import { EMClient } from '../index';
const emSilent = () => {
  const getSilentModeForConversation = (conversationId, type) => {
    return new Promise((resolve, reject) => {
      EMClient.getSilentModeForConversation({
        conversationId,
        type,
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  };
  const getSilentModeForConversationList = (conversationList) => {
    return new Promise((resolve, reject) => {
      EMClient.getSilentModeForConversations({ conversationList })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  };
  const setSilentModeForConversation = (params) => {
    const { conversationId, type, options } = params;
    return new Promise((resolve, reject) => {
      EMClient.setSilentModeForConversation({ conversationId, type, options })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  };
  const clearRemindTypeForConversation = (params) => {
    const { conversationId, type } = params;
    return new Promise((resolve, reject) => {
      EMClient.clearRemindTypeForConversation({ conversationId, type })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  };
  return {
    getSilentModeForConversation,
    getSilentModeForConversationList,
    setSilentModeForConversation,
    clearRemindTypeForConversation,
  };
};

export default emSilent;
