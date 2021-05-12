<template>
  <view class="main">
    <view class="main">
      <chatSuitAudio
        ref="chatSuitAudio"
        :username="username"
        :chatType="chatType"
        @newAudioMsg="saveSendMsg"
      ></chatSuitAudio>

      <chatMsglist
        ref="chatMsglist"
        :username="username"
        @msglistTap="normalScroll"
		@clickMsg="clickMsg"
        id="chat-msglist"
      ></chatMsglist>
    </view>
    <chatInputbar
      ref="chatInputbar"
      :username="username"
      :chatType="chatType"
      @newTextMsg="saveSendMsg"
      @newImageMsg="saveSendMsg"
      @newLocationMsg="saveSendMsg"
      @newVideoMsg="saveSendMsg"
      @tapSendAudio="toggleRecordModal"
      @inputFocused="shortScroll"
      @inputBlured="normalScroll"
	  @makeVideoCall="onMakeVideoCall"
	  @makeAudioCall="onMakeAudioCall"
	  v-show="!showEmediaInvite"
    ></chatInputbar>
	
	<chatEmediaInvite 
		:username="username" 
		:action="action"
		@onStartConfr="onStartConfr"
		@goBack="onGoBack"
		v-if="showEmediaInvite"/>
		
	<!-- <chatMultiEmedia
		style="{display: multiEmediaVisible}"
		:username="username" 
		:groupId="groupId"
		:action="emediaAction"
		@inviteMember="onInviteMember"
		@createConfrSuccess="onCreateConfrSuccess"
		@hangup="onHangup"
		v-if="showmultiEmedia"/> -->
  </view>
  
</template>

<script>
let msgStorage = require("./msgstorage");
let msgType = require("./msgtype");
import chatMsglist from "./msglist/msglist";
import chatInputbar from "./inputbar/inputbar";
import chatSuitAudio from "./inputbar/suit/audio/audio";
import chatEmediaInvite from "./emediaInvite/emediaInvite.vue"
import chatMultiEmedia from "./multiemedia/index.nvue"
export default {
  data() {
    return {
    __comps__: {
        msglist: null,
        inputbar: null,
        audio: null,
    },
	inputbarVisible: 'block',
	action: null,
	pubUrl: '',
	subUrl: '',
	showEmedia: false,
	showmultiEmedia: false,
	showEmediaInvite: false,
	emediaAction: null,
	multiEmediaVisible: 'block',
	confrId: '',
	groupId: '',
	confrMember: []
    };
  },

  components: {
    chatMsglist,
    chatInputbar,
    chatSuitAudio,
	chatEmediaInvite,
	chatMultiEmedia
  },
  props: {
    username: {
      type: Object,
      default: () => ({}),
    },
    chatType: {
      type: String,
      default: msgType.chatType.SINGLE_CHAT,
    },
  },
  computed: {
	computedUserName(){
	  return this.username
	}
  },

  mounted() {
	this.username = uni.username;
	uni.$on('createConfrSuccess', this.onCreateConfrSuccess)
  },

  moved() {},

  destroyed() {},

  methods: {
    toggleRecordModal() {
      this.$refs.chatSuitAudio.toggleRecordModal();
    },

    normalScroll() {
      this.$refs.chatMsglist.normalScroll();
	  this.$refs.chatInputbar.cancelEmoji();
	  this.$refs.chatInputbar.closeFunModal();
    },
	clickMsg(msg){
		this.$emit('onClickInviteMsg', msg)
		console.log('点击消息上一级', msg)
		
	},
    shortScroll() {
      this.$refs.chatMsglist.shortScroll();
    },

    saveSendMsg(evt) {
      msgStorage.saveMsg(evt.msg, evt.type);
	  this.$refs.chatInputbar.cancelEmoji();
	  this.$refs.chatInputbar.closeFunModal()
    },

    getMore() {
      this.$refs.chatMsglist.getHistoryMsg();
    },
	onMakeVideoCall(){
		this.setData({
			showEmediaInvite: true,
			inputbarVisible: 'none',
			action: 'create'
			//showEmedia: true
		})
		console.log(this.showEmediaInvite)
	},
	onStartConfr(data){
		console.log('发起邀请的回调', data)
		this.setData({
			showEmediaInvite: false,
			showmultiEmedia: true,
			multiEmediaVisible: 'block',
			inputbarVisible: 'none',
			confrMember: data.confrMember,
			emediaAction:{
				action: 'create'
			}
		})
		
		this.$emit('onMakeVideoCall', {
			confrMember: data.confrMember,
			groupId: this.username.groupId
		})
	},
	onCreateConfrSuccess(data){
		console.log('创建会成功议回调', data)
		this.setData({
			confrId: data.confrId
		})
		getApp().globalData.confrId = data.confrId
		this.sendInviteMsg(this.confrMember, data.confrId, data)
	},
	onGoBack(){
		this.setData({
			showEmediaInvite: false,
			showmultiEmedia: true,
			multiEmediaVisible: 'block',
			inputbarVisible: 'none',
			confrMember: []
		})
	},

	onInviteMember(e){
		let username = this.username;
		if(!this.username.groupId){
			username.groupId = e.detail
		}
		
		this.setData({
			action: 'invite',
			showEmediaInvite: true,
			inputbarVisible: 'none',
			//showmultiEmedia: false
			multiEmediaVisible: 'none',
			// username
		})
	},
	onMakeAudioCall(){
		this.setData({
			showEmediaInvite: true,
			showmultiEmedia: false,
			inputbarVisible: 'none'
		})
	},
	onClickInviteMsg(data){
		console.log('收到邀请消息')
		console.log(data)
		let confrId = data.conferenceId
		let msg_extension = typeof(data.msg_extension) == 'string'?JSON.parse(data.msg_extension):data.msg_extension
		let password = data.password || ''
		this.setData({
			emediaAction: {
				action: 'join',
				confrId: confrId,
				password: password,
				roomName: data.roomName || ''
			},
			showEmediaInvite: false,
			showmultiEmedia: true,
			inputbarVisible: 'none',
			groupId: msg_extension.group_id
		})
	},
	onHangup(){
		this.setData({
			showEmediaInvite: false,
			showmultiEmedia: false,
			inputbarVisible: 'block'
		})
		getApp().globalData.confrId = ''
	},
	sendInviteMsg(members, confrId, data){
		console.log("%c members","background: green")
		console.log(members)
		console.log('进入发邀请的函数', members)
		console.log('this.username.groupId----', this.username.groupId)
		
		console.log('confrId', confrId)
		console.log('data', data)
		members&&members.forEach((value) => {
			let id = uni.WebIM.conn.getUniqueId();
			let msg = new uni.WebIM.message('txt', id);

			msg.set({
				msg: wx.WebIM.conn.context.userId + ' invite you to video call',
				from: wx.WebIM.conn.context.userId,
				to: value,
				roomType: false,
				chatType: 'singleChat',
				ext: {
					msg_extension: JSON.stringify({
						inviter: wx.WebIM.conn.context.userId,
						group_id: this.username.groupId
					}),
					// roomName: data&&data.roomName || '',
					password: '123456',
					conferenceId: getApp().globalData.confrId
				},
				success(id, serverMsgId){
					console.log('发送邀请消息成功 to: '+value)
					//disp.fire('em.chat.sendSuccess', id, me.data.userMessage);
				},
				fail(id, serverMsgId){
					console.log('发送邀请消息失败了')
				}
			});
			
			// if(this.chatType == msgType.chatType.CHAT_ROOM){
			// 	msg.setGroup("groupchat");
			// }
			console.log('发送邀请', msg.body)
			uni.WebIM.conn.send(msg.body);

		})
	},
  },
};
</script>
<style>
@import "./chat.css";
</style>