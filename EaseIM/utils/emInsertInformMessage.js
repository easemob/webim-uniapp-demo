/* 该方法用来在本地插入会话以及聊天页面插入通知使用 */
import { useMessageStore } from '@/stores/message';
import { useConversationStore } from '@/stores/conversation';
import getEMKey from './getEMKey';
import { EMClient } from '@/EaseIM';
export const emInsertInformMessage = (isUpdateConversation = true) => {
  const messageStore = useMessageStore();
  const conversationStore = useConversationStore();
  const insertInformMessage = (message) => {
    console.log('>>>>>>>准备执行插入系统通知消息', message);
    /**
     * @param {String} from
     * @param {String} to
     * @param {String} chatType
     * @param {String} msg
     * @param {String} type 'inform'
     * @param {String} id
     */
    const informMessageBody = {
      from: message.from || EMClient.user,
      to: message.to,
      chatType: message.chatType,
      msg: message.msg,
      type: 'inform', //此类型为伪消息类型，为自己定义类型
      id: 'inform' + Date.now(), //伪消息id
      time: Date.now(),
    };
    const { from, to, chatType } = informMessageBody;
    const key = getEMKey(EMClient.user, from, to, chatType);
    console.log('>>>>>>key', key);
    //通知本地消息列表进行插入
    messageStore.insertLocalGrayInformMessage(key, informMessageBody);
    //是否需要同步更新会话列表
    if (isUpdateConversation) {
      conversationStore.updateConversationLastMessage(key, informMessageBody);
    }
  };
  return {
    insertInformMessage,
  };
};
