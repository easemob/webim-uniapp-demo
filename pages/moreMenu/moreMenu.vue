<template>
  <view>
    <view class="setting_list">
      <view class="setting_listContent">
        <text>配置推送免打扰</text>
        <switch
          :checked="switchStatus ? true : false"
          color="#0873DE"
          @change="onSwitchChange"
        ></switch>
      </view>
    </view>

    <view class="setting_list">
      <view class="setting_listContent" @click="onToHistory">
        <text>查看历史记录</text>
      </view>
    </view>
  </view>
</template>

<script>
let WebIM = require("../../utils/WebIM")["default"];
let msgType = require("../../components/chat/msgtype");
import { pushStorageSave } from '../../components/chat/pushStorage'

export default {
  data() {
    return {
      currentUser: "",
      switchStatus: false,
      type:''
    };
  },

  components: {},
  props: {
    chatType: {
      type: String,
      default: msgType.chatType.SINGLE_CHAT,
    },
  },
  onLoad(options) {
    this.setData({
      currentUser: options.username,
      type: options.type
    });
  },
   mounted() {
    let currentLoginUser = WebIM.conn.context.userId
    let newObj = uni.getStorageSync("pushStorageData") || {};
    let newAry = newObj[currentLoginUser] || [];
    // 当前会话是否被禁言
    const option = {
				conversationId: this.currentUser,
				type: this.type
			}
			WebIM.conn.getSilentModeForConversation(option).then(res => {
        if (res.data.type === "NONE") {
          this.switchStatus = true
          newAry = newAry.concat(this.currentUser);
        }
      })
      newObj[currentLoginUser] = newAry;
      uni.setStorage({
        key: 'pushStorageData',
        data: newObj,
        success: function (params) {
            console.log('>>>>>>', uni.getStorageSync("pushStorageData"));
        }
    });
  },
  methods: {
    onSwitchChange(event) {
      if (event.target.value) {
        this.onSetSilent();
      } else {
        this.onClearSilent();
      }
    },
    onToHistory () {
      uni.navigateTo({
          url: `/pages/searchMsg/searchMsg?username=${this.currentUser}&type=${this.type}`
      })
    },
    // 开启推送免打扰
    onSetSilent() {
      const option = {
        conversationId: this.currentUser,
        type: this.type,
        options: {
          paramType: 0,
          remindType: "NONE",
        },
      };
      WebIM.conn.setSilentModeForConversation(option).then((res) => {
        if (res.data.type === "NONE") {
          pushStorageSave({ userId: this.currentUser, type: "add" });
        }
      });
    },
    // 清除推送免打扰
    onClearSilent() {
      const option = {
        conversationId: this.currentUser,
        type: this.type,
      };
      WebIM.conn.clearRemindTypeForConversation(option).then((res) => {
        pushStorageSave({ userId: this.currentUser, type: "remove" });
      });
    },
  },
};
</script>
<style>
@import "../setting_general/setting_general.css";
</style>
