import { defineStore } from 'pinia';
import {
  CALLSTATUS,
  CALL_TYPES,
  CALL_TYPE,
  CALL_INVITE_TEXT,
} from '../contants';
import {
  CALLKIT_EVENT_CODE,
  CALLKIT_EVENT_TYPE,
} from '../contants/callKitEvent';
import { useInitCallKit } from '../index';
import useCallKitEvent from '../callKitManage/useCallKitEvent';
import useSendSignalMsgs from '../callKitManage/useSendSignalMsgs';
import createUid from '../utils/createUid';
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
    /* 多人会议使用 获取群组内的成员 */
    getTheGroupMembers(groupId) {
      const { CallKitEMClient } = useInitCallKit();
      if (!groupId) return;
      return new Promise((resolve, reject) => {
        let pageNum = 1,
          pageSize = 100;
        let option = {
          pageNum: pageNum,
          pageSize: pageSize,
          groupId: groupId,
        };
        CallKitEMClient.listGroupMembers(option)
          .then((res) => resolve(res?.data))
          .catch((err) => reject(err));
      });
    },
    //发起音视频邀请
    async sendInviteMessage(targetId, callType, groupId) {
      const { sendInviteMsg } = useSendSignalMsgs();
      //非空闲状态直接拒绝发送邀请信息[除了多人，因为涉及到多人通话中需要邀请他人入会]
      if (
        callType !== 2 &&
        this.callKitStatus.localClientStatus !== CALLSTATUS.idle
      )
        return;
      const channelInfors = {
        channelName: `${callType}_${createUid()}`, //频道名
        callId: createUid(),
        inviteMsgContent: CALL_INVITE_TEXT[callType],
        groupId: groupId, //只有为群聊多人邀请时这个参数才有用
      };
      this.callKitStatus.inviteTarget = targetId;
      try {
        //如果为数组就遍历发送
        if (Array.isArray(targetId)) {
          targetId.forEach((userId) => {
            sendInviteMsg(userId, callType, channelInfors);
          });
          console.log('>>>>>群组多人邀请开始遍历发消息');
        } else {
          //非数组就单条发送
          await sendInviteMsg(targetId, callType, channelInfors);
        }
        console.log('channelInforschannelInfors', channelInfors);
        this.updateLocalStatus(CALLSTATUS.inviting);
      } catch (error) {
        console.log('%c邀请信息发送失败', 'color:red', error);
      }
      //更改部分ChannelInfos
      const params = {
        from: IMClient.user,
        to: callType === CALL_TYPES.MULTI_VIDEO ? '' : targetId,
        ext: {
          channelName: channelInfors.channelName,
          callId: channelInfors.callId,
          type: callType,
          callerDevId: IMClient.context.jid.clientResource,
        },
      };
      //如果存在群组ID则增加ext字段进入到groupId
      if (callType === CALL_TYPES.MULTI_VIDEO && groupId)
        params.ext.ext = { groupId };
      console.log('邀请发送 callType为', callType);
      this.updateChannelInfos(params);
      //单人邀请开启超时挂断，多人则忽略
      if (callType !== CALL_TYPES.MULTI_VIDEO) {
        startCallKitTimer();
      }
    },
    //【多人】在会议中邀请邀请--会议中邀请不生成新的频道信息
    async inMultiChanelSendInviteMsg(targetId, callType) {
      const { sendInviteMsg } = useSendSignalMsgs();
      if (!targetId) throw 'targetId must pass！';
      if (callType === undefined || callType === null || callType < 0)
        throw 'callType must pass！';
      if (
        (Array.isArray(targetId) && targetId.length < 1) ||
        targetId.length > 15
      )
        throw 'targetId length  > 15 or length < 1';

      const channelInfors = {
        channelName: this.callKitStatus.channelInfos.channelName, //频道名
        callId: this.callKitStatus.channelInfos.callId,
        inviteMsgContent: CALL_INVITE_TEXT[callType],
        groupId: this.callKitStatus.channelInfos.groupId, //只有为群聊多人邀请时这个参数才有用
      };
      this.callKitStatus.inviteTarget = targetId;
      try {
        //如果为数组就遍历发送
        if (Array.isArray(targetId)) {
          targetId.forEach((userId) => {
            sendInviteMsg(userId, callType, channelInfors);
          });
          console.log('>>>>>群组多人邀请开始遍历发消息');
        }
      } catch (error) {
        console.log('%c邀请信息发送失败', 'color:red', error);
      }
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
    //请求频道内uid映射的环信id
    requestInChannelMapHxId() {
      const { channelName } = this.callKitStatus.channelInfos;
      const { apiUrl, appKey, loginUserId, accessToken } = this.emClientInfos;
      const requestUrl = `${apiUrl}/channel/mapper?userAccount=${loginUserId}&channelName=${channelName}&appkey=${encodeURIComponent(
        appKey
      )}`;
      console.log('>>>>requestUrl', `Bearer ${accessToken}`);
      return new Promise((resolve, reject) => {
        uni.request({
          url: requestUrl,
          header: {
            Authorization: `Bearer ${accessToken}`, //自定义请求头信息
          },
          success: (result) => {
            console.log('result', result?.data);
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
