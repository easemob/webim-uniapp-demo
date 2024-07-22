<template>
  <view>
    <button @click="chooseLocationData">发送位置</button>
  </view>
</template>

<script>
import { MESSAGE_TYPE } from '@/EaseIM/constant';
import { emMessages } from '@/EaseIM/emApis';
const { sendDisplayMessages } = emMessages();
export default {
  data() {
    return {
      location: {},
    };
  },
  computed: {
    chattingId() {
      return this.$store.getters.chattingId;
    },
    chattingChatType() {
      return this.$store.getters.chattingChatType;
    },
  },
  mounted() {
    this.getLocation();
  },
  methods: {
    //uniapp选择位置
    getLocation() {
      uni.getLocation({
        // type: 'wgs84',
        type: 'gcj02',
        success: (res) => {
          this.location = { ...res };
          console.log('当前位置：' + JSON.stringify(res));
        },
        fail: (err) => {
          console.error(err);
          // 这里可以处理权限被拒绝的情况
          if (err.errMsg === 'getLocation:fail auth deny') {
            // 引导用户打开权限设置
            uni.showModal({
              title: '提示',
              content: '需要获取您的位置信息，请到设置中打开相关权限',
              success: function (res) {
                if (res.confirm) {
                  // 打开设置页面
                  uni.openSetting({
                    success: function (res) {
                      console.log(res.authSetting);
                      // res.authSetting = { "scope.userLocation": true } 表示已获得权限
                    },
                  });
                }
              },
            });
          }
        },
      });
    },
    chooseLocationData() {
      uni.chooseLocation({
        latitude: this.location.latitude,
        longitude: this.location.longitude,
        success: (res) => {
          console.log('位置名称：' + res.name);
          console.log('详细地址：' + res.address);
          console.log('纬度：' + res.latitude);
          console.log('经度：' + res.longitude);
          this.location = Object.assign(this.location, { ...res });
          this.sendLocationMessage();
        },
        fail: (err) => {
          console.error(err);
        },
      });
    },
    async sendLocationMessage() {
      console.log('>>>>>>发送位置消息被调用', this.location);
      const params = {
        type: MESSAGE_TYPE.LOCATION,
        // 消息接收方：单聊为对方用户 ID，群聊和聊天室分别为群组 ID 和聊天室 ID。
        to: this.chattingId,
        // 会话类型：单聊、群聊和聊天室分别为 `singleChat`、`groupChat` 和 `chatRoom`。
        chatType: this.chattingChatType,
        addr: this.location.address || '未知地址',
        buildingName: this.location.name || '未知建筑名称',
        lat: this.location.latitude,
        lng: this.location.longitude,
      };
      try {
        const res = await sendDisplayMessages({ ...params });
        console.log('>>>>位置消息发送成功', res);
      } catch (error) {
        console.log('>>>>>位置消息发送失败', error);
        if (error.type === 508) {
          uni.showToast({
            title: '发送内容不合规',
            icon: 'none',
          });
        } else {
          uni.showToast({
            title: `消息发送失败${error.type}`,
            icon: 'none',
          });
        }
      } finally {
        this.$emit('onCloseAllShowContainer', true);
      }
    },
    clearLocation() {
      this.location = {};
    },
  },
  onUnload() {
    this.clearLocation(); // 页面��载时清除位置数据以释放资源
  },
};
</script>

<style lang="scss" scoped></style>
