<template>
  <view
    v-if="recordStatus != RecordStatus.HIDE"
    class="modal modal-record"
    @tap="toggleRecordModal"
  >
    <view class="modal-body" @tap.stop="toggleWithoutAction">
      <view class="sound-waves">
        <view
          v-for="(item, index) in radomHeight"
          :key="index"
          :style="'height:' + item + 'rpx;margin-top:-' + item / 2 + 'rpx'"
        ></view>
        <view style="clear: both; width: 0; height: 0"></view>
      </view>
      <text class="desc">{{ RecordDesc[recordStatus] }}</text>
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

<script>
/* EaseIM */
import { EMClient } from '@/EaseIM';
import { emMessages } from '@/EaseIM/emApis';
import { RecordStatus, RecordDesc } from './record_status';
let RunAnimation = false;
let recordTimeInterval = null;
let waveTimer = null;
const InitHeight = [
  50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
  50, 50, 50,
];
const { sendDisplayMessages } = emMessages();
export default {
  inject: ['targetId', 'chatType'],
  data() {
    return {
      RecordStatus,
      RecordDesc,
      changedTouches: null,
      recordStatus: RecordStatus.HIDE,
      radomHeight: InitHeight,
      recorderManager: null,
      recordClicked: false,
      isLongPress: false,
      recordTime: 0,
      rec: null, // h5 audio record
    };
  },

  computed: {
    /* inject */
    ItargetId() {
      return this.targetId();
    },
    IchatType() {
      return this.chatType();
    },
  },
  mounted() {
    const sysInfo = uni.getSystemInfoSync();
    if (sysInfo.uniPlatform !== 'web') {
      this.recorderManager = uni.getRecorderManager();
    }
  },
  destroyed() {
    clearInterval(recordTimeInterval);
    clearTimeout(waveTimer);
    this.recordTime = 0;
  },

  methods: {
    toggleWithoutAction(e) {
      // 阻止 tap 冒泡
    },
    toggleRecordModal() {
      if (this.recordStatus === RecordStatus.HIDE) {
        this.recordStatus = RecordStatus.SHOW;
      } else {
        this.recordStatus = RecordStatus.HIDE;
      }
      this.radomHeight = InitHeight;
    },

    handleRecordingMove(e) {
      const touches = e.touches[0];
      const changedTouches = this.changedTouches;

      if (!changedTouches) {
        return;
      }

      if (this.recordStatus == RecordStatus.SWIPE) {
        if (changedTouches.pageY - touches.pageY < 20) {
          this.recordStatus = RecordStatus.HOLD;
        }
      }

      if (this.recordStatus == RecordStatus.HOLD) {
        if (changedTouches.pageY - touches.pageY > 20) {
          this.recordStatus = RecordStatus.SWIPE;
        }
      }
    },
    // 初始化开始录音状态
    initStartRecord(e) {
      clearInterval(recordTimeInterval);
      this.recordTime = 0;
      this.changedTouches = e.touches[0];
      this.recordStatus = RecordStatus.HOLD;
      RunAnimation = true;
      this.startWave();
    },
    // 记录录音时长
    saveRecordTime() {
      recordTimeInterval = setInterval(() => {
        this.recordTime++;
        if (this.recordTime === 100) {
          this.handleRecordingCancel();
          RunAnimation = false;
        }
      }, 1000);
    },
    //开始采集录音
    startRecord(e) {
      this.initStartRecord(e);
      let recorderManager = this.recorderManager || uni.getRecorderManager();
      recorderManager.onStart(() => {
        this.saveRecordTime();
      });
      recorderManager.start({
        format: 'mp3',
      });
    },

    executeRecord(e) {
      if (uni.getSetting) {
        uni.getSetting({
          success: (res) => {
            clearInterval(recordTimeInterval);
            this.recordTime = 0;
            const recordAuth = res.authSetting['scope.record'];
            if (recordAuth == false) {
              // 已申请过授权，但是用户拒绝
              uni.openSetting({
                success: function (res) {
                  const recordAuth = res.authSetting['scope.record'];
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
                  this.isLongPress = false;
                },
              });
            } else if (recordAuth == true) {
              // 用户已经同意授权
              this.startRecord(e);
            } else {
              // 第一次进来，未发起授权
              uni.authorize({
                scope: 'scope.record',
                success: () => {
                  // 授权成功
                  uni.showToast({
                    title: '授权成功',
                    icon: 'icon',
                  });
                },
              });
            }
          },
          fail: () => {
            uni.showToast({
              title: '鉴权失败，请重试',
              icon: 'none',
            });
          },
        });
        return;
      } else {
        this.startRecord(e);
        return;
      }
    },

    handleRecording(e) {
      const sysInfo = uni.getSystemInfoSync();
      console.log('getSystemInfoSync', sysInfo);
      if (sysInfo.app === 'alipay') {
        // https://forum.alipay.com/mini-app/post/7301031?ant_source=opendoc_recommend
        uni.showModal({
          content: '支付宝小程序不支持语音消息，请查看支付宝相关api了解详情',
        });
        return;
      }
      this.recordClicked = true;
      // h5不支持uni.getRecorderManager, 需要单独处理
      if (sysInfo.uniPlatform === 'web') {
        import('../../../../../recorderCore/src/recorder-core').then(
          (Recorder) => {
            require('../../../../../recorderCore/src/engine/mp3');
            require('../../../../../recorderCore/src/engine/mp3-engine');
            if (this.recordClicked == true) {
              clearInterval(recordTimeInterval);
              this.initStartRecord(e);
              this.rec = new Recorder.default({
                type: 'mp3',
              });
              this.rec.open(
                () => {
                  this.saveRecordTime();
                  this.rec.start();
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
          }
        );
      } else {
        setTimeout(() => {
          if (this.recordClicked == true) {
            this.executeRecord(e);
          }
        }, 350);
      }
    },

    // 取消录音
    handleRecordingCancel() {
      RunAnimation = false;
      let recorderManager = this.recorderManager; // 向上滑动状态停止：取消录音发放
      if (this.recordStatus == RecordStatus.SWIPE) {
        this.recordStatus = RecordStatus.RELEASE;
      } else {
        this.recordStatus = RecordStatus.HIDE;
        this.recordClicked = false;
      }
      if (uni.getSystemInfoSync().uniPlatform === 'web') {
        this.rec.stop(
          function (blob) {
            clearInterval(recordTimeInterval);
            let duration = this.recordTime * 1000;
            if (this.recordStatus == RecordStatus.RELEASE) {
              console.log('user canceled');
              this.recordStatus = RecordStatus.HIDE;
              return;
            }
            if (duration <= 1000) {
              uni.showToast({
                title: '录音时间太短',
                icon: 'none',
              });
            } else {
              let blobURL = window.URL.createObjectURL(blob);
              this.uploadRecord(blobURL, duration);
            }
            this.recordStatus = RecordStatus.HIDE;
            this.recordTime = 0;
          },
          function (s) {
            console.log('结束出错：' + s, 1);
          },
          true
        );
      } else {
        recorderManager.onStop((res) => {
          clearInterval(recordTimeInterval);
          let duration = this.recordTime * 1000;
          if (this.recordStatus == RecordStatus.RELEASE) {
            console.log('user canceled');
            this.recordStatus = RecordStatus.HIDE;
            return;
          }

          if (duration <= 1000) {
            uni.showToast({
              title: '录音时间太短',
              icon: 'none',
            });
          } else {
            // 上传
            this.uploadRecord(res.tempFilePath, duration);
          }
          clearInterval(recordTimeInterval);
          this.recordStatus = RecordStatus.HIDE;
          this.recordTime = 0;
        }); // 停止录音

        recorderManager.stop();
      }
    },
    //上传录音附件资源至环信服务器
    async uploadRecordFile(tempFilePath, durations) {
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
          this.sendAudioMessage(res, durations);
        },
        fail: (e) => {
          console.log('>>>>>上传失败', e);
          uni.showToast({ title: '录音上传失败', icon: 'none' });
        },
      };
      uni.uploadFile(requestParams);
    },
    //发送语音消息
    async sendAudioMessage(res, durations) {
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
        to: this.ItargetId,
        // 会话类型：单聊、群聊和聊天室分别为 `singleChat`、`groupChat` 和 `chatRoom`。
        chatType: this.IchatType,
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
    },
    // 波纹动画
    startWave() {
      const _radomHeight = [...that.radomHeight];
      for (let i = 0; i < that.radomHeight.length; i++) {
        //+1是为了避免为0
        _radomHeight[i] = 100 * Math.random().toFixed(2) + 10;
      }
      this.radomHeight = _radomHeight;
      if (RunAnimation) {
        waveTimer = setTimeout(function () {
          that.startWave();
        }, 500);
      } else {
        clearInterval(waveTimer);
        return;
      }
    },
  },
};
</script>
<style>
@import './audio.css';
</style>
