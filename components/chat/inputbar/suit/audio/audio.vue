<template>
  <view
    v-if="audioState.recordStatus != RecordStatus.HIDE"
    class="modal modal-record"
    @tap="toggleRecordModal"
  >
    <view class="modal-body" @tap.stop>
      <view class="sound-waves">
        <view
          v-for="(item, index) in audioState.radomHeight"
          :key="index"
          :style="'height:' + item + 'rpx;margin-top:-' + item / 2 + 'rpx'"
        ></view>
        <view style="clear: both; width: 0; height: 0"></view>
      </view>
      <text class="desc">{{ RecordDesc[audioState.recordStatus] }}</text>
      <view
        class="dot"
        @touchstart="handleRecording"
        @touchmove="handleRecordingMove"
        @touchend="handleRecordingCancel"
      >
        <image class="icon-mic" src="/static/images/send.png"></image>
      </view>
    </view>
  </view>
</template>

<script setup>
import { reactive, toRefs, onUnmounted } from 'vue';
import msgType from '../../../msgtype';
import msgStorage from '../../../msgstorage';
import { RecordStatus, RecordDesc } from './record_status';
import disp from '@/utils/broadcast';
const WebIM = uni.WebIM;
// let WebIM = require("../../../../../utils/WebIM")["default"];
// let msgType = require('../../../msgtype');
// let RECORD_CONST = require('./record_status');
// let RecordStatus = RECORD_CONST.RecordStatus;
// let RecordDesc = RECORD_CONST.RecordDesc;
// let disp = require('../../../../../utils/broadcast');
// let msgStorage = require('../../../msgstorage');
let RunAnimation = false;
let recordTimeInterval = null;
let waveTimer = null;
const InitHeight = [
  50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
  50, 50, 50,
];
/* props */
const props = defineProps({
  chatParams: {
    type: Object,
    default: () => ({}),
    required: true,
  },
  chatType: {
    type: String,
    default: msgType.chatType.SINGLE_CHAT,
    required: true,
  },
});
const { chatParams, chatType } = toRefs(props);
const audioState = reactive({
  changedTouches: null,
  recordStatus: RecordStatus.HIDE,
  radomHeight: InitHeight,
  recorderManager: null,
  recordClicked: false,
  isLongPress: false,
  recordTime: 0,
  rec: null, // h5 audio record
});

const sysInfo = uni.getSystemInfoSync();
if (sysInfo.uniPlatform !== 'web') {
  audioState.recorderManager = uni.getRecorderManager();
}
const toggleRecordModal = () => {
  if (audioState.recordStatus === RecordStatus.HIDE) {
    audioState.recordStatus = RecordStatus.SHOW;
  } else {
    audioState.recordStatus = RecordStatus.HIDE;
  }
  audioState.radomHeight = InitHeight;
};

const handleRecordingMove = (e) => {
  const touches = e.touches[0];
  const changedTouches = audioState.changedTouches;

  if (!changedTouches) {
    return;
  }

  if (audioState.recordStatus == RecordStatus.SWIPE) {
    if (changedTouches.pageY - touches.pageY < 20) {
      audioState.recordStatus = RecordStatus.HOLD;
    }
  }

  if (audioState.recordStatus == RecordStatus.HOLD) {
    if (changedTouches.pageY - touches.pageY > 20) {
      audioState.recordStatus = RecordStatus.SWIPE;
    }
  }
};
// 初始化开始录音状态
const initStartRecord = (e) => {
  clearInterval(recordTimeInterval);
  audioState.recordTime = 0;
  audioState.changedTouches = e.touches[0];
  audioState.recordStatus = RecordStatus.HOLD;
  RunAnimation = true;
  startWave();
};
// 记录录音时长
const saveRecordTime = () => {
  recordTimeInterval = setInterval(() => {
    audioState.recordTime++;
    if (audioState.recordTime === 100) {
      handleRecordingCancel();
      RunAnimation = false;
    }
  }, 1000);
};
const startRecord = (e) => {
  initStartRecord(e);
  let recorderManager = audioState.recorderManager || uni.getRecorderManager();
  recorderManager.onStart(() => {
    saveRecordTime();
  });
  recorderManager.start({
    format: 'mp3',
  });
};
const executeRecord = (e) => {
  if (uni.getSetting) {
    uni.getSetting({
      success: (res) => {
        clearInterval(recordTimeInterval);
        audioState.recordTime = 0;
        let recordAuth = res.authSetting['scope.record'];
        if (recordAuth == false) {
          // 已申请过授权，但是用户拒绝
          uni.openSetting({
            success: function (res) {
              let recordAuth = res.authSetting['scope.record'];
              if (recordAuth == true) {
                uni.showToast({
                  title: '授权成功',
                  icon: 'success',
                });
              } else {
                uni.showToast({
                  title: '请授权录音',
                  icon: 'none',
                });
              }

              audioState.isLongPress = false;
            },
          });
        } else if (recordAuth == true) {
          // 用户已经同意授权
          startRecord(e);
        } else {
          // 第一次进来，未发起授权
          uni.authorize({
            scope: 'scope.record',
            success: () => {
              // 授权成功
              uni.showToast({
                title: '授权成功',
                icon: 'success',
              });
            },
          });
        }
      },
      fail: function () {
        uni.showToast({
          title: '鉴权失败，请重试',
          icon: 'none',
        });
      },
    });
    return;
  } else {
    startRecord(e);
    return;
  }
};
const handleRecording = async (e) => {
  const sysInfo = uni.getSystemInfoSync();
  console.log('getSystemInfoSync', sysInfo);
  if (sysInfo.app === 'alipay') {
    // https://forum.alipay.com/mini-app/post/7301031?ant_source=opendoc_recommend
    uni.showModal({
      content: '支付宝小程序不支持语音消息，请查看支付宝相关api了解详情',
    });
    return;
  }
  audioState.recordClicked = true;
  // h5不支持uni.getRecorderManager, 需要单独处理
  if (sysInfo.uniPlatform === 'web') {
    // console.log('>>>>>>进入了web层面注册页面');
    // #ifdef H5
    await import('@/recorderCore/src/recorder-core');
    await import('@/recorderCore/src/engine/mp3');
    await import('@/recorderCore/src/engine/mp3-engine');
    if (audioState.recordClicked == true) {
      clearInterval(recordTimeInterval);
      initStartRecord(e);
      audioState.rec = new window.Recorder({
        type: 'mp3',
      });
      audioState.rec.open(
        () => {
          saveRecordTime();
          audioState.rec.start();
        },
        (msg, isUserNotAllow) => {
          if (isUserNotAllow) {
            uni.showToast({
              title: '鉴权失败，请重试',
              icon: 'none',
            });
          } else {
            uni.showToast({
              title: `开启失败，请重试`,
              icon: 'none',
            });
          }
        }
      );
    }
    // #endif
  } else {
    setTimeout(() => {
      if (audioState.recordClicked == true) {
        executeRecord(e);
      }
    }, 350);
  }
};
// 取消录音
const handleRecordingCancel = () => {
  RunAnimation = false;
  let recorderManager = audioState.recorderManager; // 向上滑动状态停止：取消录音发放
  if (audioState.recordStatus == RecordStatus.SWIPE) {
    audioState.recordStatus = RecordStatus.RELEASE;
  } else {
    audioState.recordStatus = RecordStatus.HIDE;
    audioState.recordClicked = false;
  }
  if (uni.getSystemInfoSync().uniPlatform === 'web') {
    audioState.rec.stop(
      function (blob) {
        clearInterval(recordTimeInterval);
        let duration = audioState.recordTime * 1000;
        if (audioState.recordStatus == RecordStatus.RELEASE) {
          console.log('user canceled');
          audioState.recordStatus = RecordStatus.HIDE;
          return;
        }
        if (duration <= 1000) {
          uni.showToast({
            title: '录音时间太短',
            icon: 'none',
          });
        } else {
          let blobURL = window.URL.createObjectURL(blob);
          uploadRecord(blobURL, duration);
        }
        audioState.recordStatus = RecordStatus.HIDE;
        audioState.recordTime = 0;
      },
      function (s) {
        console.log('结束出错：' + s, 1);
      },
      true
    );
  } else {
    recorderManager.onStop((res) => {
      clearInterval(recordTimeInterval);
      let duration = audioState.recordTime * 1000;
      if (audioState.recordStatus == RecordStatus.RELEASE) {
        console.log('user canceled');
        audioState.recordStatus = RecordStatus.HIDE;
        return;
      }

      if (duration <= 1000) {
        uni.showToast({
          title: '录音时间太短',
          icon: 'none',
        });
      } else {
        // 上传
        uploadRecord(res.tempFilePath, duration);
      }
      clearInterval(recordTimeInterval);
      audioState.recordStatus = RecordStatus.HIDE;
      audioState.recordTime = 0;
    }); // 停止录音

    recorderManager.stop();
  }
};
const isGroupChat = () => {
  return chatType.value == msgType.chatType.CHAT_ROOM;
};
const getSendToParam = () => {
  return isGroupChat() ? chatParams.value.groupId : chatParams.value.your;
};
const uploadRecord = (tempFilePath, dur) => {
  var str = WebIM.config.appkey.split('#');
  var token = WebIM.conn.context.accessToken;
  uni.uploadFile({
    url: 'https://a1.easemob.com/' + str[0] + '/' + str[1] + '/chatfiles',
    filePath: tempFilePath,
    fileType: 'audio',
    name: 'file',
    header: {
      Authorization: 'Bearer ' + token,
    },

    success(res) {
      var id = WebIM.conn.getUniqueId();
      var msg = new WebIM.message(msgType.AUDIO, id);
      var dataObj = JSON.parse(res.data); // 接收消息对象

      msg.set({
        apiUrl: WebIM.config.apiURL,
        accessToken: token,
        body: {
          type: msgType.AUDIO,
          url: dataObj.uri + '/' + dataObj.entities[0].uuid,
          filetype: '',
          filename: `${new Date().getTime()}.mp3`,
          accessToken: token,
          length: Math.ceil(dur / 1000),
        },
        from: WebIM.conn.user,
        to: getSendToParam(),
        roomType: false,
        chatType: isGroupChat() ? chatType.GROUP_CHAT : chatType.SINGLE_CHAT,
        success: function (argument) {
          disp.fire('em.chat.sendSuccess', id);
        },
      });
      msg.body.length = Math.ceil(dur / 1000); //console.log('发送的语音消息', msg.body)
      WebIM.conn.send(msg.body);
      let obj = {
        msg: msg,
        type: msgType.AUDIO,
      };
      saveSendMsg(obj);
    },
  });
};
const saveSendMsg = (evt) => {
  msgStorage.saveMsg(evt.msg, evt.type);
};
// 波纹动画
const startWave = () => {
  var _radomHeight = [...audioState.radomHeight];
  for (var i = 0; i < audioState.radomHeight.length; i++) {
    //+1是为了避免为0
    _radomHeight[i] = 100 * Math.random().toFixed(2) + 10;
  }
  audioState.radomHeight = _radomHeight;
  if (RunAnimation) {
    waveTimer = setTimeout(function () {
      startWave();
    }, 500);
  } else {
    clearInterval(waveTimer);
    return;
  }
};
onUnmounted(() => {
  clearInterval(recordTimeInterval);
  clearTimeout(waveTimer);
  audioState.recordTime = 0;
});

defineExpose({
  toggleRecordModal,
});
</script>
<style>
@import './audio.css';
</style>
