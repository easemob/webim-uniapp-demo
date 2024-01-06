import { watch, computed } from 'vue';
import useAgoraChannelStore from './stores/channelManger';
import { CALLSTATUS, ANSWER_TYPE, CALL_ACTIONS_TYPE } from './contants';
import useCallKitEvent from './callKitManage/useCallKitEvent';
/* 频道信令发送 */
import useSendSignalMsgs from './callKitManage/useSendSignalMsgs';
let CallKitEMClient = null;
let CallKitCreateMsgFun = null;
const {
  EVENT_NAME,
  EVENT_LEVEL,
  CALLKIT_EVENT_TYPE,
  CALLKIT_EVENT_CODE,
  PUB_CHANNEL_EVENT,
} = useCallKitEvent();
//监听本地状态改变做出不同的状态处理。
export const useInitCallKit = () => {
  const agoraChannelStore = useAgoraChannelStore();
  const { updateChannelInfos, updateLocalStatus } = agoraChannelStore;
  const callKitStatus = computed(() => agoraChannelStore.callKitStatus);
  const callKitTimer = computed(() => agoraChannelStore.callKitTimer);
  //监听频道状态变更做出对应操作。
  const onCallKitStatusChangeListener = () => {
    console.log('>>>>>频道状态监听已挂载');
    watch(
      () => callKitStatus.value.localClientStatus,
      (newClientStatus, oldClientStatus) => {
        handleClientStatusForAction(newClientStatus);
      }
    );
    //处理不同clientstatus执行不同的操作
    const handleClientStatusForAction = (clientStatus) => {
      switch (clientStatus) {
        case CALLSTATUS.idle:
          console.log('%c >>>监听新状态为空闲处理，执行初始化', 'color:red');
          //   initChannelInfos();
          agoraChannelStore.initChannelInfos();
          break;
        case CALLSTATUS.inviting:
          //   if (callKitStatus.value.channelInfos.callType <= 1) {
          //   }
          //   if (callKitStatus.value.channelInfos.callType === 2) {
          //   }
          //   console.log('>>>>>可以展开邀请窗口');
          break;
        case CALLSTATUS.receivedConfirmRing:
          const eventParams = {
            type: CALLKIT_EVENT_TYPE[CALLKIT_EVENT_CODE.ALERT_SCREEN],
            ext: { message: '可以弹出通话接听UI组件' },
            callType: callKitStatus.value.channelInfos.callType,
            eventHxId: '',
          };
          PUB_CHANNEL_EVENT(EVENT_NAME, { ...eventParams });
          break;
        case CALLSTATUS.answerCall:
          console.log('>>>>>可以弹出通话接听UI组件');
          //   if (callKitStatus.value.channelInfos.callType <= 1) {
          //     console.log('>>>>>>>展示单人音视频组件');
          //     //   callComponents.value = 'singleCall';
          //   }
          //   if (callKitStatus.value.channelInfos.callType === 2) {
          //     console.log('》》》》》展示多人音视频组件');
          //     //   callComponents.value = 'multiCall';
          //   }
          break;
        case CALLSTATUS.confirmCallee:
          {
            // console.log('%c >>>>>可以加入房间了', 'color:green;');
            // console.log(
            //   '++++++将入的频道类型是',
            //   callKitStatus.value.channelInfos.callType
            // );
            // console.log(
            //   '++++++频道名是',
            //   callKitStatus.value.channelInfos.channelName
            // );
          }
          break;
        default:
          break;
      }
    };
  };

  //初始化EMClient之Callkit内
  const setCallKitClient = (EMClient, CreateMsgFun) => {
    CallKitEMClient = EMClient;
    CallKitCreateMsgFun = CreateMsgFun;
    mountSignallingListener();
  };
  //挂载Callkit信令相关监听
  const mountSignallingListener = () => {
    console.log('>>>>>>>callkit 监听已挂载');
    const { sendAnswerMsg, sendAlertMsg, sendConfirmRing, sendConfirmCallee } =
      useSendSignalMsgs();
    onCallKitStatusChangeListener();
    CallKitEMClient.addEventHandler('callkitConnected', {
      onConnected: () => {
        //连接成功初始化emClient信息
        agoraChannelStore.initEmClientInfos(CallKitEMClient);
      },
    });
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
      if (callKitStatus.value.localClientStatus > CALLSTATUS.idle) {
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
        sendAlertMsg(msgBody);
      }
    };
    //处理接收到通话交互过程的CMD命令消息
    const handleCallKitCommand = (msgBody) => {
      //多端状态下信令消息发送者为自己则忽略
      if (msgBody.from === CallKitEMClient.user) return;
      const cmdMsgBody = Object.assign({}, msgBody.ext) || {};
      const { calleeDevId, callerDevId } = cmdMsgBody;
      const clientResource = CallKitEMClient.context.jid.clientResource;
      const { action } = cmdMsgBody;
      const { localClientStatus, channelInfos } = callKitStatus.value;
      //当前有效会议ID
      const currentCallKitCallId = callKitStatus.value.channelInfos.callId;
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
            sendConfirmRing(params);
            updateLocalStatus(CALLSTATUS.inviting);
          } else {
            sendConfirmRing(params);
            updateLocalStatus(CALLSTATUS.idle);
          }

          break;
        case CALL_ACTIONS_TYPE.CONFIRM_RING: //回复 receivedConfirmRing
          {
            //调起confirm待接听界面
            if (calleeDevId !== clientResource) return; //【多端情况】被叫方设备id 如果不为当前用户登陆设备ID，则不处理。
            if (
              !cmdMsgBody.status &&
              callKitStatus.value.localClientStatus <
                CALLSTATUS.receivedConfirmRing
            ) {
              updateLocalStatus(CALLSTATUS.idle); //重置为闲置状态
            } //邀请失效，不弹出接听确认框
            //有效邀请则设置状态为收到confirmRing
            updateLocalStatus(CALLSTATUS.receivedConfirmRing);
          }
          break;
        case CALL_ACTIONS_TYPE.ANSWER: //回复 confirmCallee
          {
            if (callerDevId !== clientResource) return; //【多端情况】呼叫方设备id 如果不为当前用户登陆设备ID，则不处理。
            updateLocalStatus(CALLSTATUS.receivedAnswerCall);
            callKitTimer.value && clearTimeout(callKitTimer.value);
            const params = {
              targetId: msgBody.from,
              sendBody: cmdMsgBody,
            };
            console.log('>>>>>>>>>收到answer信令', params);
            if (
              !callKitStatus.value.channelInfos.calleeDevId &&
              callKitStatus.value.channelInfos.callType !== 2
            ) {
              //如果calleeDevId不存在，并且非多人音视频模式，主动更新频道信息
              if (cmdMsgBody.videoToVoice) {
                callKitStatus.value.channelInfos.callType = 0;
              }
              updateChannelInfos(msgBody);
            } else if (
              callKitStatus.value.channelInfos.calleeDevId !==
                cmdMsgBody.calleeDevId &&
              callKitStatus.value.channelInfos.callType !== 2
            ) {
              //如果存在频道信息，但是与待呼叫确认的calleeDevId不一致直接发送拒绝应答。
              params.sendBody.result = ANSWER_TYPE.REFUSE;
            }
            sendConfirmCallee(params);
            updateLocalStatus(CALLSTATUS.confirmCallee);
            if (cmdMsgBody.result !== ANSWER_TYPE.ACCPET) {
              if (callKitStatus.value.channelInfos.callType !== 2) {
                //无论对方是忙碌还是拒接都讲通话状态更改为闲置。
                if (cmdMsgBody.result === ANSWER_TYPE.BUSY) {
                  uni.showToast({
                    title: '对方正忙',
                    icon: 'none',
                    duration: 2000,
                  });
                  eventParams.type =
                    CALLKIT_EVENT_TYPE[CALLKIT_EVENT_CODE.CALLEE_BUSY];
                  eventParams.ext = { message: '对方正忙' };
                }
                if (cmdMsgBody.result === ANSWER_TYPE.REFUSE) {
                  eventParams.type =
                    CALLKIT_EVENT_TYPE[CALLKIT_EVENT_CODE.CALLEE_REFUSE];
                  eventParams.ext = { message: '对方拒绝接听' };
                  uni.showToast({
                    title: '对方拒绝接听',
                    icon: 'none',
                    duration: 2000,
                  });
                }
                eventParams.callType =
                  callKitStatus.value.channelInfos.callType;
                eventParams.eventHxId = msgBody.from || '';
                PUB_CHANNEL_EVENT(EVENT_NAME, { ...eventParams });
                //修改当前状态为空闲
                console.log('>>>>>修改当前状态为空闲');
                return updateLocalStatus(CALLSTATUS.idle);
              }
            }
          }
          break;
        case CALL_ACTIONS_TYPE.CONFIRM_CALLEE: //被叫方认证
          {
            //如果calleeDevId不等于当前设备resource
            if (msgBody.to === CallKitEMClient.user) {
              if (cmdMsgBody.result && cmdMsgBody.result === ANSWER_TYPE.BUSY) {
                return;
              }
              if (cmdMsgBody.calleeDevId !== clientResource) {
                updateLocalStatus(CALLSTATUS.idle); //更改状态为闲置
                console.log('%c 已在其他设备处理', 'color:red;');
                eventParams.type =
                  CALLKIT_EVENT_TYPE[CALLKIT_EVENT_CODE.OTHER_HANDLE];
                eventParams.ext = { message: '已在其他设备处理' };
                eventParams.callType =
                  callKitStatus.value.channelInfos.callType;
                eventParams.eventHxId = msgBody.from || '';
                PUB_CHANNEL_EVENT(EVENT_NAME, { ...eventParams });
                uni.showToast({
                  title: '该通话已在其他设备处理',
                  icon: 'none',
                  duration: 2000,
                });
                return;
              }
            }

            // 防止通话中收到 busy refuse时挂断
            if (
              cmdMsgBody.result !== ANSWER_TYPE.ACCPET &&
              callKitStatus.value.localClientStatus !== CALLSTATUS.confirmCallee
            ) {
              return updateLocalStatus(CALLSTATUS.idle); //更改状态为闲置
            }
            //变更状态为confirmCallee
            updateLocalStatus(CALLSTATUS.confirmCallee);
          }
          break;
        case CALL_ACTIONS_TYPE.CANCEL: {
          if (msgBody.from === CallKitEMClient.user) return; //【多端情况】被叫方设备id 如果不为当前用户登陆设备ID，则不处理。
          if (msgBody.from === callKitStatus.value.channelInfos.callerIMName)
            return updateLocalStatus(CALLSTATUS.idle);
          eventParams.type =
            CALLKIT_EVENT_TYPE[CALLKIT_EVENT_CODE.CALLER_CANCEL];
          eventParams.ext = { message: '对方取消呼叫' };
          eventParams.callType = callKitStatus.value.channelInfos.callType;
          eventParams.eventHxId = msgBody.from || '';
          PUB_CHANNEL_EVENT(EVENT_NAME, { ...eventParams });
          break;
        }
        case CALL_ACTIONS_TYPE.VIDEO_TO_VOICE: {
          if (cmdMsgBody.callId !== callKitStatus.value.channelInfos.callType)
            return;
          callKitStatus.value.channelInfos.callType = CALL_TYPES.SINGLE_VOICE;
          break;
        }
        default:
          console.log('>>>其他未知状态');
          break;
      }
    };
  };
  //发送接听或者拒接信令
  const handleSendAnswerMsg = (sendType) => {
    const { sendAnswerMsg } = useSendSignalMsgs();
    const channelInfos = callKitStatus.value.channelInfos;
    const payload = {
      targetId: channelInfos.callerIMName,
      sendBody: {
        callerDevId: channelInfos.callerDevId,
        callId: channelInfos.callId,
      },
    };
    if (sendType === ANSWER_TYPE.ACCPET) {
      sendAnswerMsg(payload, ANSWER_TYPE.ACCPET);
      updateLocalStatus(CALLSTATUS.answerCall); //更改状态为已应答
      console.log('>>>>开始发送接听信令', payload);
      //对外频道接听事件发布事件
      const eventParams = {
        type: CALLKIT_EVENT_TYPE[CALLKIT_EVENT_CODE.CALLEE_ACCPET],
        ext: { message: '通话已接听' },
        callType: callKitStatus.value.channelInfos.callType,
        eventHxId: channelInfos.callerIMName,
      };
      //如果是多人就取对应群组ID
      if (callKitStatus.value.channelInfos.callType === 2) {
        eventParams.eventHxId = callKitStatus.value.channelInfos.groupId;
      }
      uni.showToast({
        title: '通话已接听',
        icon: 'none',
        duration: 2000,
      });
      PUB_CHANNEL_EVENT(EVENT_NAME, { ...eventParams });
    }
    if (sendType === ANSWER_TYPE.REFUSE) {
      sendAnswerMsg(payload, ANSWER_TYPE.REFUSE);
      updateLocalStatus(CALLSTATUS.idle); //更改状态为闲置
      console.log('>>>>开始发送挂断信令');
      //对外频道接听事件发布事件
      const eventParams = {
        type: CALLKIT_EVENT_TYPE[CALLKIT_EVENT_CODE.CALLEE_REFUSE],
        ext: { message: '已拒绝通话邀请' },
        callType: callKitStatus.value.channelInfos.callType,
        eventHxId: channelInfos.callerIMName,
      };
      uni.showToast({
        title: '已拒绝通话邀请',
        icon: 'none',
        duration: 2000,
      });
      //如果是多人就取对应群组ID
      if (callKitStatus.value.channelInfos.callType === 2) {
        eventParams.eventHxId = callKitStatus.value.channelInfos.groupId;
      }
      PUB_CHANNEL_EVENT(EVENT_NAME, { ...eventParams });
    }
  };
  return {
    CallKitEMClient,
    CallKitCreateMsgFun,
    setCallKitClient,
    handleSendAnswerMsg,
  };
};
