import { EaseSDK, EMClient } from '../index';
const emSendReadAck = () => {
  // 处理未读消息回执
  const sendReadAckMsg = (receivemsg) => {
    const { chatType, from, id } = receivemsg;
    let option = {
      type: 'read', // 消息是否已读。
      chatType: chatType, // 会话类型，这里为单聊。
      to: from, // 消息接收方的用户 ID。
      id: id, // 需要发送已读回执的消息 ID。
    };
    let msg = EaseSDK.message.create(option);
    EMClient.send(msg);
  };
  return {
    sendReadAckMsg,
  };
};

export default emSendReadAck;
