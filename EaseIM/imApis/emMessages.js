import { EaseSDK, EMClient } from '../index';
import { useMessageStore } from '@/stores/message';
import { useConversationStore } from '@/stores/conversation';
import { getEMKey } from '@/EaseIM/utils';
const emMessages = () => {
  const messageStore = useMessageStore();
  const conversationStore = useConversationStore();

  const reportMessages = (params) => {
    const { reportType, reportReason, messageId } = params;
    return EMClient.reportMessage({
      reportType: reportType, // 举报类型
      reportReason: reportReason, // 举报原因。
      messageId: messageId, // 上报消息id
    });
  };
  const fetchHistoryMessagesFromServer = (params) => {
    const { targetId, cursor, chatType } = params;
    const options = {
      // 对方的用户 ID 或者群组 ID 或聊天室 ID。
      targetId: targetId,
      // 每页期望获取的消息条数。取值范围为 [1,50]，默认值为 20。
      pageSize: 20,
      // 查询的起始消息 ID。若该参数设置为 `-1`、`null` 或空字符串，从最新消息开始。
      cursor: cursor || -1,
      // 会话类型：（默认） `singleChat`：单聊；`groupChat`：群聊。
      chatType: chatType,
      // 消息搜索方向：（默认）`up`：按服务器收到消息的时间的逆序获取；`down`：按服务器收到消息的时间的正序获取。
      searchDirection: 'up',
    };
    return EMClient.getHistoryMessages(options);
  };
  const sendDisplayMessages = (messageBody) => {
    messageBody.from = EMClient.user;
    const key = getEMKey(
      EMClient.user,
      messageBody.from,
      messageBody.to,
      messageBody.chatType
    );
    return new Promise((resolve, reject) => {
      const msg = EaseSDK.message.create(messageBody);
      EMClient.send(msg)
        .then((res) => {
          const { message } = res;
          resolve(message);
          messageStore.updateMessageCollection(key, message);
          conversationStore.updateConversationLastMessage(key, message);
        })
        .catch((err) => {
          reject(err);
          console.log('>>>>>发送失败', err);
        });
    });
  };
  return {
    reportMessages,
    fetchHistoryMessagesFromServer,
    sendDisplayMessages,
  };
};
export default emMessages;
