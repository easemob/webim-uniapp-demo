import useManageChannel from './callKitManage/useManageChannel';
import { CALLSTATUS, ANSWER_TYPE, CALL_ACTIONS_TYPE } from './contants';
import useCallKitEvent from './callKitManage/useCallKitEvent';
/* 频道信令发送 */
import useSendSignalMsgs from './callKitManage/useSendSignalMsgs';
let CallKitEMClient = null;
let CallKitCreateMsgFun = null;
const { callKitStatus, updateChannelInfos, updateLocalStatus } =
  useManageChannel();
const {
  EVENT_NAME,
  EVENT_LEVEL,
  CALLKIT_EVENT_TYPE,
  CALLKIT_EVENT_CODE,
  PUB_CHANNEL_EVENT,
} = useCallKitEvent();
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
      onCmdMessage: (msg) => {
        console.log('>>>>>收到命令信令消息', msg);
        if (msg && msg?.action === CALL_ACTIONS_TYPE.RTC_CALL)
          handleCallKitCommand(msg);
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
        //更新当前频道信息
        updateChannelInfos(msgBody);
        //更新呼叫状态为alerting
        updateLocalStatus(CALLSTATUS.alerting);
        //通知呼叫方可以调起通话窗口
        console.log('>>>>>>向对方发送弹窗消息');
        sendAlertMsg(msgBody);
      }
    };
    //处理接收到通话交互过程的CMD命令消息
    const handleCallKitCommand = (msgBody) => {
      //多端状态下信令消息发送者为自己则忽略
      if (msgBody.from === CallKitEMClient.user) return;
      console.log('>>>>开始处理command命令消息', msgBody);
      const cmdMsgBody = Object.assign({}, msgBody.ext) || {};
      const { calleeDevId, callerDevId } = cmdMsgBody;
      const clientResource = CallKitEMClient.context.jid.clientResource;
      const { action } = cmdMsgBody;
      const { localClientStatus, channelInfos } = callKitStatus;
      //当前有效会议ID
      const currentCallKitCallId = callKitStatus.channelInfos.callId;
      //返回给对方的confirmRing状态
      let status = true;
      const params = {
        targetId: msgBody.from,
        sendBody: cmdMsgBody,
        status,
      };
      //对方发布事件所需参数
      const eventParams = {
        type: {},
        ext: {},
        callType: 0,
        eventHxId: '',
      };
      switch (action) {
        case CALL_ACTIONS_TYPE.ALERT: //回复confirmring
          updateLocalStatus(CALLSTATUS.alerting);
          console.log(
            '%c>>>>>收到alert信令',
            'color:blue',
            currentCallKitCallId,
            status
          );
          // console.log('>>>>>收到alert信令', currentCallKitCallId)
          if (cmdMsgBody.callId !== currentCallKitCallId) {
            status = false;
            console.warn('callId 于当前呼叫端callId 不一致');
            return;
          }
          if (
            localClientStatus > CALLSTATUS.receivedConfirmRing &&
            channelInfos.callType !== 2
          ) {
            status = false;
          }
          if (callerDevId !== clientResource) {
            console.warn('callerDevId 设备不相同');
            status = false;
          }
          //如果status为true表明为有效的邀请，再更改为inviting,false表示无效邀请则更改为空闲状态。
          if (status) {
            SignalMsgs.sendConfirmRing(params);
            updateLocalStatus(CALLSTATUS.inviting);
          } else {
            SignalMsgs.sendConfirmRing(params);
            updateLocalStatus(CALLSTATUS.idle);
          }

          break;
        case CALL_ACTIONS_TYPE.CONFIRM_RING:
          {
            //调起confirm待接听界面
            if (calleeDevId !== clientResource) return; //【多端情况】被叫方设备id 如果不为当前用户登陆设备ID，则不处理。
            if (
              !cmdMsgBody.status &&
              callKitStatus.localClientStatus < CALLSTATUS.receivedConfirmRing
            ) {
              updateLocalStatus(CALLSTATUS.idle); //重置为闲置状态
              //todo 设置为初始化状态
            } //邀请失效，不弹出接听确认框
            //有效邀请则设置状态为收到confirmRing
            console.log('%chandle confimring', 'color:blue;');
            updateLocalStatus(CALLSTATUS.receivedConfirmRing);
          }
          break;
        case CALL_ACTIONS_TYPE.ANSWER:
          {
            console.log('>>>>>cmdMsgBody', cmdMsgBody);
            if (callerDevId !== clientResource) return; //【多端情况】被叫方设备id 如果不为当前用户登陆设备ID，则不处理。
            updateLocalStatus(CALLSTATUS.receivedAnswerCall);
            callKitTimer.value && clearTimeout(callKitTimer.value);
            const params = {
              targetId: msgBody.from,
              sendBody: cmdMsgBody,
            };
            if (
              !callKitStatus.channelInfos.calleeDevId &&
              callKitStatus.channelInfos.callType !== 2
            ) {
              //如果calleeDevId不存在，并且非多人音视频模式，主动更新频道信息
              if (cmdMsgBody.videoToVoice) {
                callKitStatus.channelInfos.callType = 0;
              }
              updateChannelInfos(msgBody);
            } else if (
              callKitStatus.channelInfos.calleeDevId !==
                cmdMsgBody.calleeDevId &&
              callKitStatus.channelInfos.callType !== 2
            ) {
              console.log(
                'callKitStatus.channelInfos.calleeDevId',
                callKitStatus.channelInfos.calleeDevId
              );
              //如果存在频道信息，但是与待呼叫确认的calleeDevId不一致直接发送拒绝应答。
              params.sendBody.result = ANSWER_TYPE.REFUSE;
            }
            SignalMsgs.sendConfirmCallee(params);
            updateLocalStatus(CALLSTATUS.confirmCallee);
            if (cmdMsgBody.result !== ANSWER_TYPE.ACCPET) {
              console.log(
                'callKitStatus.channelInfos.callType ',
                callKitStatus.channelInfos.callType
              );
              if (callKitStatus.channelInfos.callType !== 2) {
                //无论对方是忙碌还是拒接都讲通话状态更改为闲置。
                if (cmdMsgBody.result === ANSWER_TYPE.BUSY) {
                  eventParams.type =
                    CALLKIT_EVENT_TYPE[CALLKIT_EVENT_CODE.CALLEE_BUSY];
                  eventParams.ext = { message: '对方正忙' };
                }
                if (cmdMsgBody.result === ANSWER_TYPE.REFUSE) {
                  eventParams.type =
                    CALLKIT_EVENT_TYPE[CALLKIT_EVENT_CODE.CALLEE_REFUSE];
                  eventParams.ext = { message: '对方拒绝接听' };
                }
                eventParams.callType = callKitStatus.channelInfos.callType;
                eventParams.eventHxId = msgBody.from || '';
                PUB_CHANNEL_EVENT(EVENT_NAME, { ...eventParams });
                //修改当前状态为空闲
                console.log('>>>>>修改当前状态为空闲');
                return updateLocalStatus(CALLSTATUS.idle);
              }
            }
          }
          break;
        case CALL_ACTIONS_TYPE.CONFIRM_CALLEE:
          {
            if (cmdMsgBody.calleeDevId !== clientResource) {
              if (msgBody.to === CallKitEMClient.user) {
                updateLocalStatus(CALLSTATUS.idle); //更改状态为闲置
                console.log('%c 已在其他设备处理', 'color:red;');
                eventParams.type =
                  CALLKIT_EVENT_TYPE[CALLKIT_EVENT_CODE.OTHER_HANDLE];
                eventParams.ext = { message: '已在其他设备处理' };
                eventParams.callType = callKitStatus.channelInfos.callType;
                eventParams.eventHxId = msgBody.from || '';
                PUB_CHANNEL_EVENT(EVENT_NAME, { ...eventParams });
                return;
              }
              return;
            }
            // 防止通话中收到 busy refuse时挂断
            if (
              cmdMsgBody.result !== ANSWER_TYPE.ACCPET &&
              callKitStatus.localClientStatus !== CALLSTATUS.confirmCallee
            ) {
              return updateLocalStatus(CALLSTATUS.idle); //更改状态为闲置
            }
            //变更状态为confirmCallee
            updateLocalStatus(CALLSTATUS.confirmCallee);
          }
          break;
        case CALL_ACTIONS_TYPE.CANCEL: {
          if (msgBody.from === CallKitEMClient.user) return; //【多端情况】被叫方设备id 如果不为当前用户登陆设备ID，则不处理。
          if (msgBody.from === callKitStatus.channelInfos.callerIMName)
            return updateLocalStatus(CALLSTATUS.idle);
          eventParams.type =
            CALLKIT_EVENT_TYPE[CALLKIT_EVENT_CODE.CALLER_CANCEL];
          eventParams.ext = { message: '对方取消呼叫' };
          eventParams.callType = callKitStatus.channelInfos.callType;
          eventParams.eventHxId = msgBody.from || '';
          PUB_CHANNEL_EVENT(EVENT_NAME, { ...eventParams });
          break;
        }
        case CALL_ACTIONS_TYPE.VIDEO_TO_VOICE: {
          console.log('视频转语音通知');
          if (cmdMsgBody.callId !== callKitStatus.channelInfos.callType) return;
          callKitStatus.channelInfos.callType = CALL_TYPES.SINGLE_VOICE;
          break;
        }

        default:
          console.log('>>>其他未知状态');
          break;
      }
    };
  };
  return {
    CallKitEMClient,
    CallKitCreateMsgFun,
    setCallKitClient,
  };
};
