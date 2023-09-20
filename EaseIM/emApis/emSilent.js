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
  const setSilentModeForConversation = (params) => {
    return new Promise((resolve, reject) => {
      const { conversationId, type, options } = params;
      EMClient.setSilentModeForConversation({ conversationId, type, options })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  };
  const clearRemindTypeForConversation = (conversationId, type) => {
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
    setSilentModeForConversation,
    clearRemindTypeForConversation,
  };
};

export default emSilent;
