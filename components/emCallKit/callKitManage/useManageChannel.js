/* 用来管理频道内所有的状态或参数 */
import { ref, reactive, watch } from 'vue';
import { CALLSTATUS, CALL_TYPES, CALL_TYPE } from '../contants';
import useCallKitEvent from './useCallKitEvent.js';
import {
  CALLKIT_EVENT_CODE,
  CALLKIT_EVENT_TYPE,
} from '../contants/callKitEvent';
const { EVENT_NAME, PUB_CHANNEL_EVENT } = useCallKitEvent();
//弹出组件类型
const callComponents = ref('');
//频道基础信息
const callKitStatus = reactive({
  localClientStatus: CALLSTATUS.idle, //callkit状态
  channelInfos: {
    channelName: '', //频道名
    agoraChannelToken: '', //频道token
    agoraUserId: '', //频道用户id,
    callType: CALL_TYPES.SINGLE_VOICE, //0 语音 1 视频 2 多人音视频
    callId: null, //会议ID
    channelUsers: {}, //频道内用户
    callerDevId: '', //主叫方设备ID
    calleeDevId: '', //被叫方设备ID
    callerIMName: '', //主叫方环信ID
    calleeIMName: '', //被叫方环信ID
    groupId: '', //群组ID
  },
  //被邀请对象 单人为string 多人为array
  inviteTarget: null,
});
//CallKit timer
const callKitTimer = ref(null);
const useManageChannle = () => {
  /* localClientStatus 监听处理 */
  watch(
    () => callKitStatus.localClientStatus,
    (newClientStatus, oldClientStatus) => {
      console.log(
        '%c 监听到本地客户端状态的改变',
        'color:red',
        newClientStatus,
        oldClientStatus
      );
      // if (callKitStatus.localClientStatus === newClientStatus) return
      handleClientStatusForAction(newClientStatus);
    }
  );
  /* CallKit status 管理 */
  //初始化频道信息
  const initChannelInfos = () => {
    callComponents.value = '';
    callKitStatus.localClientStatus = CALLSTATUS.idle;
    callKitStatus.channelInfos = {
      channelName: '', //频道名
      agoraChannelToken: '', //频道token
      agoraUid: '', //频道用户id
      callType: CALL_TYPES.SINGLE_VOICE, //0 语音 1 视频 2 多人音视频
      callId: null, //会议ID
      channelUsers: {}, //频道内用户
      callerDevId: '', //主叫方设备ID
      calleeDevId: '', //被叫方设备ID
      confrontId: '', //要处理的目标ID
      callerIMName: '', //主叫方环信ID
      calleeIMName: '', //被叫方环信ID
      groupId: '', //群组ID
    };
    callKitStatus.inviteTarget = null;
    callKitTimer.value && clearTimeout(callKitTimer.value);
  };
  //处理不同clientstatus执行不同的操作
  const handleClientStatusForAction = (clientStatus) => {
    switch (clientStatus) {
      case CALLSTATUS.idle:
        console.log('%c >>>监听新状态为空闲处理，执行初始化', 'color:red');
        initChannelInfos();
        break;
      case CALLSTATUS.inviting:
        if (callKitStatus.channelInfos.callType <= 1) {
          console.log('>>>>>>>展示单人音视频组件');
          callComponents.value = 'singleCall';
        }
        if (callKitStatus.channelInfos.callType === 2) {
          console.log('》》》》》展示多人音视频组件');
          callComponents.value = 'multiCall';
        }
        console.log('>>>>>可以展开邀请窗口');
        break;
      case CALLSTATUS.receivedConfirmRing:
        console.log('>>>>新状态为弹出框，执行弹出待确认框');
        const eventParams = {
          type: CALLKIT_EVENT_TYPE[CALLKIT_EVENT_CODE.ALERT_SCREEN],
          ext: { message: '可以弹出通话接听UI组件' },
          callType: callKitStatus.channelInfos.callType,
          eventHxId: '',
        };
        PUB_CHANNEL_EVENT(EVENT_NAME, { ...eventParams });
        break;
      case CALLSTATUS.answerCall:
        console.log('>>>>>可以弹出通话接听UI组件');
        if (callKitStatus.channelInfos.callType <= 1) {
          console.log('>>>>>>>展示单人音视频组件');
          callComponents.value = 'singleCall';
        }
        if (callKitStatus.channelInfos.callType === 2) {
          console.log('》》》》》展示多人音视频组件');
          callComponents.value = 'multiCall';
        }
        break;
      case CALLSTATUS.confirmCallee:
        {
          console.log('%c >>>>>可以加入房间了', 'color:green;');
          console.log(
            '++++++将入的频道类型是',
            callKitStatus.channelInfos.callType
          );
          console.log('++++++频道名是', callKitStatus.channelInfos.channelName);
        }
        break;
      default:
        break;
    }
  };
  //更新localStatus
  const updateLocalStatus = (typeCode) => {
    console.log('>>>>>开始变更本地状态为 typeCode', typeCode);
    callKitStatus.localClientStatus = typeCode;
  };
  //更新频道信息
  const updateChannelInfos = (msgBody) => {
    console.log('触发更新频道信息', msgBody);
    const { from, to, ext } = msgBody || {};
    const params = {
      channelName: ext.channelName || callKitStatus.channelInfos.channelName,
      callId: ext.callId || callKitStatus.channelInfos.callId,
      callType: CALL_TYPE[ext.type] || callKitStatus.channelInfos.callType,
      callerDevId: ext.callerDevId || 0,
      calleeDevId: ext.calleeDevId,
      callerIMName: from,
      calleeIMName: to,
      groupId: ext?.ext?.groupId ? ext.ext.groupId : '',
    };
    console.log('%c将要更新的信息内容为', 'color:red', params);
    Object.assign(callKitStatus.channelInfos, params);
  };
  /* CallKit Timer */
  //用作邀请信息发送之后发起计时30s。
  const startCallKitTimer = () => {
    if (callKitTimer.value) {
      clearTimeout(callKitTimer.value);
      callKitTimer.value = null;
    }
    //对外发布应答事件
    callKitTimer.value = setTimeout(() => {
      const targetId = callKitStatus.inviteTarget;
      //发送cannel信令
      SignalMsgs.sendCannelMsg({
        targetId,
        callId: callKitStatus.channelInfos.callId,
      });
      const eventParams = {
        type: CALLKIT_EVENT_TYPE[CALLKIT_EVENT_CODE.TIMEOUT],
        ext: { message: '通话超时未接听' },
        callType: callKitStatus.channelInfos.callType,
        eventHxId: targetId,
      };
      PUB_CHANNEL_EVENT(EVENT_NAME, { ...eventParams });
      updateLocalStatus(CALLSTATUS.idle); //更改状态为闲置
    }, 30000);
  };
  return {
    callKitStatus,
    updateLocalStatus,
    updateChannelInfos,
  };
};

export default useManageChannle;
