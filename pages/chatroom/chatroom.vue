<template>
<chat id="chat" :username="username" chatType="singleChat"></chat>
</template>

<script>
let disp = require("../../utils/broadcast");
import chat from "../../comps/chat/chat";

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
    uni.setNavigationBarTitle({
      title: username.your
    });
  },

  onUnload() {
    disp.fire("em.chatroom.leave");
  },

  onPullDownRefresh: function () {
    uni.showNavigationBarLoading();
    this.selectComponent('#chat').$vm.getMore()
    // 停止下拉动作
    uni.hideNavigationBarLoading();
    uni.stopPullDownRefresh();
  },
  methods: {}
};
</script>
<style>
@import "./chatroom.css";
</style>