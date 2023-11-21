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
      clientResource: '',
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
      this.emClientInfos.clientResource = emClient.clientResource;
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
      this.callKitTimer && clearTimeout(this.callKitTimer);
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
      const { sendCannelMsg } = useSendSignalMsgs();
      if (this.callKitTimer) {
        clearTimeout(this.callKitTimer);
        this.callKitTimer = null;
      }
      //对外发布应答事件
      this.callKitTimer = setTimeout(() => {
        const targetId = this.callKitStatus.inviteTarget;
        //发送cannel信令
        sendCannelMsg({
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
        this.updateLocalStatus(CALLSTATUS.idle); //更改状态为闲置
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
      console.log('>>>>>>>>>', targetId, callType, groupId);
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
        from: this.emClientInfos.loginUserId,
        to: callType === CALL_TYPES.MULTI_VIDEO ? '' : targetId,
        ext: {
          channelName: channelInfors.channelName,
          callId: channelInfors.callId,
          type: callType,
          callerDevId: this.emClientInfos.clientResource,
        },
      };
      //如果存在群组ID则增加ext字段进入到groupId
      if (callType === CALL_TYPES.MULTI_VIDEO && groupId)
        params.ext.ext = { groupId };
      console.log('邀请发送 callType为', callType);
      this.updateChannelInfos(params);
      //单人邀请开启超时挂断，多人则忽略
      if (callType !== CALL_TYPES.MULTI_VIDEO) {
        this.startCallKitTimer();
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
    //发送挂断信令
    handleCancelCall() {
      const { sendCannelMsg } = useSendSignalMsgs();
      const targetId = this.callKitStatus.inviteTarget;
      if (!targetId) return console.log('>>>挂断目标ID为空', targetId);
      //多人遍历发送取消
      if (this.callKitStatus.channelInfos.callType === CALL_TYPES.MULTI_VIDEO) {
        targetId.length &&
          targetId.forEach((userHxId) => {
            sendCannelMsg({
              targetId: userHxId,
              callId: this.callKitStatus.channelInfos.callId,
            });
          });
        //对外频道接听事件发布事件
        const eventParams = {
          type: CALLKIT_EVENT_TYPE[CALLKIT_EVENT_CODE.CANCEL],
          ext: { message: '多人音视频通话已取消' },
          callType: CALL_TYPES.MULTI_VIDEO,
          eventHxId: this.callKitStatus.channelInfos.groupId,
        };
        PUB_CHANNEL_EVENT(EVENT_NAME, { ...eventParams });
        this.updateLocalStatus(CALLSTATUS.idle);
      } else {
        sendCannelMsg({
          targetId,
          callId: this.callKitStatus.channelInfos.callId,
        });
        //对外频道接听事件发布事件
        const eventParams = {
          type: CALLKIT_EVENT_TYPE[CALLKIT_EVENT_CODE.CANCEL],
          ext: { message: '通话已取消' },
          callType: this.callKitStatus.channelInfos.callType,
          eventHxId: targetId,
        };
        PUB_CHANNEL_EVENT(EVENT_NAME, { ...eventParams });
        this.updateLocalStatus(CALLSTATUS.idle);
      }
    },
    //请求频道Token
    /**
     * @function requestRtcChannelToken
     * 该方法主要作用为请求Agora Rtc频道对应的token，其积极可抽象理解为拿到某频道对应的门钥匙。
     * !但此方法所请求的接口为环信内部Demo演示接口，仅供环信内部自己使用如自己项目使用。请找后端协助部署一个类似的接口服务。
     */
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

    /**
     * @function requestInChannelMapHxId
     * 该方法作用为拿到频道内uid与环信id的映射关系，例如在频道内展示uid与之对应的环信ID，因此需要该接口取到uid的映射关系，非必须接口，
     * 但此Demo多人音视频通话中有用到。
     * !同样此方法如果项目中需要类似的需求，也请后端协助搭建类型功能接口，供项目中使用。
     */
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
