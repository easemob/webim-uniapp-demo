<template>
<chat id="chat" :username="username" ref="chat" chatType="singleChat" @onClickInviteMsg="onClickMsg"></chat>
</template>

<script>
let disp = require("../../utils/broadcast");
import chat from "../../components/chat/chat.vue";

export default {
  data() {
    return {
      username: {
        your: ""
      }
    };
  },

  components: {
    chat
  },
  props: {},
  // options = 系统传入的 url 参数
  onLoad(options) {
    let username = JSON.parse(options.username);
    this.setData({
      username: username
    });
	// 生成的支付宝小程序在onLoad里获取不到，这里放到全局变量下
	uni.username = username;
    uni.setNavigationBarTitle({
      title: username?.yourNickName || username?.your
    });
  },

  onUnload(options) {
    disp.fire("em.chatroom.leave");
  },

  onPullDownRefresh: function () {
    uni.showNavigationBarLoading();
    this.$refs.chat.getMore();
    // 停止下拉动作
    uni.hideNavigationBarLoading();
    uni.stopPullDownRefresh();
  },
  methods: {
	  onClickMsg(msg){
		msg.action = 'join'
		uni.navigateTo({
			url: "../emedia/index?srcData="+JSON.stringify(msg)
		});
	  },
    onNavigationBarButtonTap(e) {
      uni.navigateTo({
          url: `/pages/moreMenu/moreMenu?username=${this.username.your}&type=singleChat`
      })
  },
  }
};
</script>
<style>
@import "./chatroom.css";
</style>