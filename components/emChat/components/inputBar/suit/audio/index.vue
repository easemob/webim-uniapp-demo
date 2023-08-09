<template>
  <view
    class="record_container"
    v-if="audioState.recordStatus != RecordStatus.HIDE"
  >
    <view class="modal modal-record" @tap="toggleRecordModal">
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
    <view
      class="mask"
      v-if="audioState.recordStatus != RecordStatus.HIDE"
    ></view>
  </view>
</template>

<script setup>
import { reactive, onUnmounted, inject } from 'vue';
/* EaseIM */
import { EMClient } from '@/EaseIM';
import { emMessages } from '@/EaseIM/imApis';
/* inject */
const injectTargetId = inject('targetId');
const injectChatType = inject('chatType');
import { RecordStatus, RecordDesc } from './record_status';
let RunAnimation = false;
let recordTimeInterval = null;
let waveTimer = null;
const InitHeight = [
  50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
  50, 50, 50,
];

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
//发送录音消息
const { sendDisplayMessages } = emMessages();
const sendAudioMessage = async (res, durations) => {
  const dataObj = JSON.parse(res.data); // 接收消息对象
  const bodys = {
    url: dataObj.uri + '/' + dataObj.entities[0].uuid,
    filename: `${new Date().getTime()}.mp3`,
    filetype: 'mp3',
    length: Math.ceil(durations / 1000),
  };
  const params = {
    // 消息类型。
    type: 'audio',
    body: { ...bodys },
    filename: bodys.filename,
    // 消息接收方：单聊为对方用户 ID，群聊和聊天室分别为群组 ID 和聊天室 ID。
    to: injectTargetId.value,
    // 会话类型：单聊、群聊和聊天室分别为 `singleChat`、`groupChat` 和 `chatRoom`。
    chatType: injectChatType.value,
  };
  try {
    const res = await sendDisplayMessages({ ...params });
    console.log('>>>>>>已发送', res);
  } catch (error) {
    console.log('>>>>>语音消息发送失败', error);
    uni.showToast({
      title: '消息发送失败',
      icon: 'none',
    });
  }
};
//上传录音附件资源至环信服务器
const uploadRecord = async (tempFilePath, durations) => {
  if (!tempFilePath) return;
  const apiUrl = EMClient.apiUrl;
  const orgName = EMClient.orgName;
  const appName = EMClient.appName;
  const uploadTargetUrl = `${apiUrl}/${orgName}/${appName}/chatfiles`;
  const accessToken = EMClient.token;
  const requestParams = {
    url: uploadTargetUrl,
    filePath: tempFilePath,
    fileType: 'audio',
    name: 'file',
    header: {
      Authorization: 'Bearer ' + accessToken,
    },
    success: (res) => {
      console.log('>>>>>录音上传成功', res);
      uni.showToast({ title: '音源已上传...', icon: 'none' });
      sendAudioMessage(res, durations);
    },
    fail: (e) => {
      console.log('>>>>>上传失败', e);
      uni.showToast({ title: '录音上传失败', icon: 'none' });
    },
  };
  uni.uploadFile(requestParams);
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
@import './index.css';
</style>
