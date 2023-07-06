import useManageChannel from './callKitManage/useManageChannel';
import { CALLSTATUS, ANSWER_TYPE, CALL_ACTIONS_TYPE } from './contants';
/* 频道信令发送 */
import useSendSignalMsgs from './callKitManage/useSendSignalMsgs';
let CallKitEMClient = null;
let CallKitCreateMsgFun = null;
const { callKitStatus } = useManageChannel();
export const useInitCallKit = () => {
  //初始化EMClient之Callkit内
  const setCallKitClient = (EMClient, CreateMsgFun) => {
    CallKitEMClient = EMClient;
    CallKitCreateMsgFun = CreateMsgFun;
    console.log('setCallKitClient', CallKitEMClient, CallKitCreateMsgFun);
    mountSignallingListener();
  };
  //挂载Callkit信令相关监听
  const mountSignallingListener = () => {
    console.log('>>>>>>>callkit 监听已挂载');
    const { sendAnswerMsg, sendAlertMsg } = useSendSignalMsgs(
      CallKitEMClient,
      CallKitCreateMsgFun
    );
    CallKitEMClient.addEventHandler('callkitSignal', {
      onTextMessage: (message) => {
        const { ext } = message;
        if (ext && ext?.action === CALL_ACTIONS_TYPE.INVITE)
          handleCallKitInvite(message);
        console.log('>>>>>收到文本信令消息', message);
      },
    });
    //处理收到为文本的邀请信息
    const handleCallKitInvite = (msgBody) => {
      console.log('>>>>>开始处理被邀请消息');
      const { from, ext } = msgBody || {};
      //邀请消息发送者为自己则忽略
      if (from === CallKitEMClient.user) return;
      //非空闲回复busy
      console.log('>>>>>>>收到邀请信息');
      //非空闲回复busy
      if (callKitStatus.localClientStatus > CALLSTATUS.idle) {
        console.log('>>>>>回复忙碌');
        const payload = {
          targetId: from,
          sendBody: ext,
        };
        sendAnswerMsg(payload, ANSWER_TYPE.BUSY);
      } else {
        // //更新当前频道信息
        // updateChannelInfos(msgBody);
        // //更新呼叫状态为alerting
        // updateLocalStatus(CALLSTATUS.alerting);
        //通知呼叫方可以调起通话窗口
        console.log('>>>>>>向对方发送弹窗消息');
        sendAlertMsg(msgBody);
      }
    };
  };
  return {
    CallKitEMClient,
    CallKitCreateMsgFun,
    setCallKitClient,
  };
};
