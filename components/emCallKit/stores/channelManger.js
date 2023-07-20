import { defineStore } from 'pinia';
import { CALLSTATUS, CALL_TYPES, CALL_TYPE } from '../contants';
import {
  CALLKIT_EVENT_CODE,
  CALLKIT_EVENT_TYPE,
} from '../contants/callKitEvent';
import useCallKitEvent from '../callKitManage/useCallKitEvent';
const { EVENT_NAME, PUB_CHANNEL_EVENT } = useCallKitEvent();
const useAgoraChannelStore = defineStore('agoraChannelStore', {
  state: () => ({
    emClientInfos: {
      apiUrl: '',
      appKey: '',
      loginUserId: '',
      accessToken: '',
    },
    callKitStatus: {
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
    },
    callKitTimer: null,
  }),
  actions: {
    /* emClient */
    initEmClientInfos(emClient) {
      console.log('initEmClientInfos', emClient);
      if (!emClient) return;
      this.emClientInfos.apiUrl = emClient.apiUrl;
      this.emClientInfos.appKey = emClient.appKey;
      this.emClientInfos.loginUserId = emClient.user;
      this.emClientInfos.accessToken = emClient.token;
    },
    /* CallKit status 管理 */
    //初始化频道信息
    initChannelInfos() {
      this.callKitStatus.localClientStatus = CALLSTATUS.idle;
      this.callKitStatus.channelInfos = {
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
      this.callKitStatus.inviteTarget = null;
      this.callKitTimer && clearTimeout(callKitTimer.value);
    },
    //更新localStatus
    updateLocalStatus(typeCode) {
      console.log('>>>>>开始变更本地状态为 typeCode', typeCode);
      this.callKitStatus.localClientStatus = typeCode;
    },
    //更新频道信息
    updateChannelInfos(msgBody) {
      console.log('触发更新频道信息', msgBody);
      const { from, to, ext } = msgBody || {};
      const params = {
        channelName:
          ext.channelName || this.callKitStatus.channelInfos.channelName,
        callId: ext.callId || this.callKitStatus.channelInfos.callId,
        callType:
          CALL_TYPE[ext.type] || this.callKitStatus.channelInfos.callType,
        callerDevId: ext.callerDevId || 0,
        calleeDevId: ext.calleeDevId,
        callerIMName: from,
        calleeIMName: to,
        groupId: ext?.ext?.groupId ? ext.ext.groupId : '',
      };
      console.log('%c将要更新的信息内容为', 'color:red', params);
      Object.assign(this.callKitStatus.channelInfos, params);
    },
    /* CallKit Timer */
    //用作邀请信息发送之后发起计时30s。
    startCallKitTimer() {
      if (callKitTimer.value) {
        clearTimeout(callKitTimer.value);
        callKitTimer.value = null;
      }
      //对外发布应答事件
      callKitTimer.value = setTimeout(() => {
        const targetId = this.callKitStatus.inviteTarget;
        //发送cannel信令
        SignalMsgs.sendCannelMsg({
          targetId,
          callId: this.callKitStatus.channelInfos.callId,
        });
        const eventParams = {
          type: CALLKIT_EVENT_TYPE[CALLKIT_EVENT_CODE.TIMEOUT],
          ext: { message: '通话超时未接听' },
          callType: this.callKitStatus.channelInfos.callType,
          eventHxId: targetId,
        };
        PUB_CHANNEL_EVENT(EVENT_NAME, { ...eventParams });
        updateLocalStatus(CALLSTATUS.idle); //更改状态为闲置
      }, 30000);
    },
    //请求频道Token
    requestRtcChannelToken() {
      const { channelName } = this.callKitStatus.channelInfos;
      const { apiUrl, appKey, loginUserId, accessToken } = this.emClientInfos;
      const requestUrl = `${apiUrl}/token/rtcToken/v1?userAccount=${loginUserId}&channelName=${channelName}&appkey=${encodeURIComponent(
        appKey
      )}`;
      return new Promise((resolve, reject) => {
        uni.request({
          url: requestUrl,
          header: {
            Authorization: `Bearer ${accessToken}`, //自定义请求头信息
          },
          success: (result) => {
            console.log('>>>>>频道token已获取', result?.data);
            resolve(result?.data);
          },
          fail: (e) => {
            console.error('>>>>rtc token 获取失败', e);
            uni.showToast({ icon: 'none', title: 'rtc token 请求失败' });
            reject(e);
          },
        });
      });
    },
  },
});
export default useAgoraChannelStore;
