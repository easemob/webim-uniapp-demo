import { EMClient } from '../index';
const emSilent = () => {
  const getSilentModeForConversation = (conversationId, type) =>
    EMClient.getSilentModeForConversation({
      conversationId,
      type,
    });
  const setSilentModeForConversation = (params) => {
    const { conversationId, type, options } = params;
    return EMClient.setSilentModeForConversation({
      conversationId,
      type,
      options,
    });
  };
  const clearRemindTypeForConversation = (conversationId, type) =>
    EMClient.clearRemindTypeForConversation({ conversationId, type });
  return {
    getSilentModeForConversation,
    setSilentModeForConversation,
    clearRemindTypeForConversation,
  };
};

export default emSilent;
