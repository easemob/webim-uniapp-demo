/* 用来发送所有频道内信令使用 */
import { CALL_ACTIONS_TYPE, MSG_TYPE } from '../contants';
const action = 'rtcCall';
const useSendSignalMsgs = (EMClient, EMCreateMsg) => {
  console.log('useSendSignalMsgs', EMClient, EMCreateMsg);
  //发送通知弹出待接听窗口信令
  const sendAlertMsg = (payload) => {
    const { from, ext } = payload;
    const option = {
      type: 'cmd',
      chatType: 'singleChat',
      to: from,
      action: action,
      ext: {
        action: CALL_ACTIONS_TYPE.ALERT,
        calleeDevId: EMClient.context.jid.clientResource,
        callerDevId: ext.callerDevId,
        callId: ext.callId,
        ts: Date.now(),
        msgType: MSG_TYPE,
      },
    };
    console.log('>>>>>>>option', option);
    const msg = EMCreateMsg.create(option);
    // 调用 `send` 方法发送该透传消息。
    EMClient.send(msg)
      .then((res) => {
        // 消息成功发送回调。
        console.log('answer Success', res);
      })
      .catch((e) => {
        // 消息发送失败回调。
        console.log('anser Fail', e);
      });
  };
  //发送应答消息
  const sendAnswerMsg = (payload, answerType) => {
    const { targetId, sendBody } = payload;
    const option = {
      type: 'cmd',
      chatType: 'singleChat',
      // 设置消息接收方的用户 ID。
      to: targetId,
      // 设置自定义动作。对于透传消息，该字段必填。
      action: action,
      // 设置消息扩展信息。
      ext: {
        action: CALL_ACTIONS_TYPE.ANSWER,
        result: answerType,
        callerDevId: sendBody.callerDevId,
        calleeDevId: EMClient.context.jid.clientResource,
        callId: sendBody.callId,
        ts: Date.now(),
        msgType: MSG_TYPE,
      },
    };
    const msg = EMCreateMsg.create(option);
    // 调用 `send` 方法发送该透传消息。
    EMClient.send(msg)
      .then((res) => {
        // 消息成功发送回调。
        console.log('answer Success', res);
      })
      .catch((e) => {
        // 消息发送失败回调。
        console.log('anser Fail', e);
      });
  };
  return {
    sendAlertMsg,
    sendAnswerMsg,
  };
};

export default useSendSignalMsgs;
