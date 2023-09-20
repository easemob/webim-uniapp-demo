import { EaseSDK, EMClient } from '../index';
import { CHAT_TYPE } from '../constant';
const emConversation = () => {
  //从服务端获取会话列表
  const fetchConversationFromServer = () => {
    return new Promise((resolve, reject) => {
      //支持分页这里写死只取二十条
      EMClient.getConversationlist({ pageNum: 1, pageSize: 20 })
        .then((res) => {
          console.log('>>>>会话列表数据获取成功');
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  //从服务端删除会话
  const removeConversationFromServer = (
    channel,
    chatType = CHAT_TYPE.SINGLE_CHAT,
    deleteRoam = false
  ) => {
    if (!channel) return;
    return new Promise((resolve, reject) => {
      EMClient.deleteConversation({ channel, chatType, deleteRoam })
        .then((res) => {
          console.log('>>>>会话删除成功');
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  //发送会话已读回执
  const sendChannelAck = (targetId, chatType = CHAT_TYPE.SINGLE_CHAT) => {
    if (!targetId) return;
    let option = {
      chatType: chatType, // 会话类型，设置为单聊。
      type: 'channel', // 消息类型。
      to: targetId, // 接收消息对象的用户 ID。
    };
    const msg = EaseSDK.message.create(option);
    EMClient.send(msg);
  };
  return {
    fetchConversationFromServer,
    removeConversationFromServer,
    sendChannelAck,
  };
};

export default emConversation;
