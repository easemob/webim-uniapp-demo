<template>
<chat 
	id="groupchat" 
	ref="chat" 
	:username="username" 
	:groupId="groupId" 
	chatType="chatRoom" 
	@onMakeVideoCall="makeVideoCall" 
	@onClickInviteMsg="onClickMsg">
</chat>
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

   props: {
    groupId:{
      type:String,
      default:''
    }
  },

  // options = 系统传入的 url 参数
  onLoad(options) {
    let username = JSON.parse(options.username);
    this.setData({
      username: username
    });
	uni.username = username;
    uni.setNavigationBarTitle({
      title: username.your
    });
  },

  onUnload() {
    disp.fire("em.chatroom.leave");
  },

  onPullDownRefresh: function () {
    uni.showNavigationBarLoading();
    // this.selectComponent('#groupchat').$vm.getMore(); 
    // 停止下拉动作
    this.$refs.chat.getMore();
    uni.hideNavigationBarLoading();
    uni.stopPullDownRefresh();
  },
  methods: {
	makeVideoCall(data){
		 if(false){
			uni.showToast({
				title: '请输入会议Id',
				duration: 2000
			});
			return
		}
		uni.navigateTo({
		  url: "../emedia/index?srcData="+JSON.stringify(data)
		});
		// let subNVue = uni.getSubNVueById('drawer')
		// subNVue.show('fade-out', 200)
		// uni.$emit('page-popup', {
		// 	state: 201,
		// 	room:{
		// 		id: 'LBJ13H05522QATH0DW164400C69796', //this.confrId,
		// 		pwd:this.pwd||''
		// 	},
		// 	desp: "开始初始化nvue",
		// })
	},

  onNavigationBarButtonTap(e) {
      uni.navigateTo({
          url: `/pages/moreMenu/moreMenu?username=${this.username.groupId}&type=groupChat`
      })
  },
	onClickMsg(msg){
	}
  }
};
</script>
<style>
@import "./groupChatRoom.css";
</style>