<template>
<chat id="chat" :username="username" ref="chat" chatType="singleChat" @onClickInviteMsg="onClickMsg"></chat>
</template>

<script>
let disp = require("../../utils/broadcast");
import chat from "../../comps/chat/chat.vue";

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
  beforeMount(data){
	  console.log('渲染前接受的参数', data)
  },
  onLoad(options) {
    let username = JSON.parse(options.username);
	console.log('888888 chat room username', username)
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
	  }
  }
};
</script>
<style>
@import "./chatroom.css";
</style>