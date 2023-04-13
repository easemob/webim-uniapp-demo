<template>
  <view class="main">
    <view class="main">
      <chatSuitAudio
        ref="chatSuitAudioComp"
        :chatParams="chatParams"
        :chatType="chatType"
        @newAudioMsg="saveSendMsg"
      ></chatSuitAudio>

      <chatMsglist
        ref="chatMsglistComp"
        :chatParams="chatParams"
        @msglistTap="normalScroll"
        id="chat-msglist"
      ></chatMsglist>
    </view>
    <chatInputbar
      ref="chatInputbarComp"
      :chatParams="chatParams"
      :chatType="chatType"
      @newTextMsg="saveSendMsg"
      @newImageMsg="saveSendMsg"
      @newLocationMsg="saveSendMsg"
      @newVideoMsg="saveSendMsg"
      @tapSendAudio="toggleRecordModal"
      @inputFocused="shortScroll"
      @inputBlured="normalScroll"
    ></chatInputbar>
  </view>
</template>

<script setup>
import { reactive, ref, computed, onMounted, toRefs } from 'vue';
import msgStorage from './msgstorage';
// let msgStorage = require('./msgstorage');
import msgType from './msgtype';
// let msgType = require('./msgtype');
import chatMsglist from './msglist/msglist';
import chatInputbar from './inputbar/inputbar';
import chatSuitAudio from './inputbar/suit/audio/audio';
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
console.log('chatType', chatType);
console.log('props', props.chatParams);
const chatState = reactive({
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
  confrMember: [],
});
const computedUserName = computed(() => {
  return chatState.username;
});
// onMounted(() => {
//   chatState.username = uni.username;
// });
const chatSuitAudioComp = ref(null);
const toggleRecordModal = () => {
  chatSuitAudioComp.value.toggleRecordModal();
};

const chatMsglistComp = ref(null);
const normalScroll = () => {
  chatMsglistComp.value.normalScroll();
  chatInputbarComp.value.cancelEmoji();
  chatInputbarComp.value.closeFunModal();
};
const getMore = () => {
  chatMsglistComp.value.getHistoryMsg();
};
const shortScroll = () => {
  chatMsgchatMsglistComplist.value.shortScroll();
};
const chatInputbarComp = ref(null);
const saveSendMsg = (evt) => {
  msgStorage.saveMsg(evt.msg, evt.type);
  chatInputbarComp.value.cancelEmoji();
  chatInputbarComp.value.closeFunModal();
};

defineExpose({
  getMore,
});
// export default {
//   data() {
//     return {
//
//     };
//   },

//   components: {
//     chatMsglist,
//     // chatInputbar,
//     // chatSuitAudio,
//   },
//   props: {
//
//   },
//   computed: {
//
//   },

//   mounted() {
//
//
//   },

//   moved() {},

//   destroyed() {},

//   methods: {

//
//     clickMsg(msg) {
//       this.$emit('onClickInviteMsg', msg);
//       console.log('点击消息上一级', msg);
//     },

//     onMakeVideoCall() {
//       this.setData({
//         showEmediaInvite: true,
//         inputbarVisible: 'none',
//         action: 'create',
//         //showEmedia: true
//       });
//       console.log(this.showEmediaInvite);
//     },
//     onStartConfr(data) {
//       console.log('发起邀请的回调', data);
//       this.setData({
//         showEmediaInvite: false,
//         showmultiEmedia: true,
//         multiEmediaVisible: 'block',
//         inputbarVisible: 'none',
//         confrMember: data.confrMember,
//         emediaAction: {
//           action: 'create',
//         },
//       });

//       this.$emit('onMakeVideoCall', {
//         confrMember: data.confrMember,
//         groupId: this.username.groupId,
//       });
//     },
//     onCreateConfrSuccess(data) {
//       console.log('创建会成功议回调', data);
//       this.setData({
//         confrId: data.confrId,
//       });
//       getApp().globalData.confrId = data.confrId;
//       this.sendInviteMsg(this.confrMember, data.confrId, data);
//     },
//     onGoBack() {
//       this.setData({
//         showEmediaInvite: false,
//         showmultiEmedia: true,
//         multiEmediaVisible: 'block',
//         inputbarVisible: 'none',
//         confrMember: [],
//       });
//     },

//     onInviteMember(e) {
//       let username = this.username;
//       if (!this.username.groupId) {
//         username.groupId = e.detail;
//       }

//       this.setData({
//         action: 'invite',
//         showEmediaInvite: true,
//         inputbarVisible: 'none',
//         //showmultiEmedia: false
//         multiEmediaVisible: 'none',
//         // username
//       });
//     },
//     onMakeAudioCall() {
//       this.setData({
//         showEmediaInvite: true,
//         showmultiEmedia: false,
//         inputbarVisible: 'none',
//       });
//     },
//     onClickInviteMsg(data) {
//       console.log('收到邀请消息');
//       console.log(data);
//       let confrId = data.conferenceId;
//       let msg_extension =
//         typeof data.msg_extension == 'string'
//           ? JSON.parse(data.msg_extension)
//           : data.msg_extension;
//       let password = data.password || '';
//       this.setData({
//         emediaAction: {
//           action: 'join',
//           confrId: confrId,
//           password: password,
//           roomName: data.roomName || '',
//         },
//         showEmediaInvite: false,
//         showmultiEmedia: true,
//         inputbarVisible: 'none',
//         groupId: msg_extension.group_id,
//       });
//     },
//     onHangup() {
//       this.setData({
//         showEmediaInvite: false,
//         showmultiEmedia: false,
//         inputbarVisible: 'block',
//       });
//       getApp().globalData.confrId = '';
//     },
//     sendInviteMsg(members, confrId, data) {
//       console.log('%c members', 'background: green');
//       console.log(members);
//       console.log('进入发邀请的函数', members);
//       console.log('this.username.groupId----', this.username.groupId);

//       console.log('confrId', confrId);
//       console.log('data', data);
//       members &&
//         members.forEach((value) => {
//           let id = uni.WebIM.conn.getUniqueId();
//           let msg = new uni.WebIM.message('txt', id);

//           msg.set({
//             msg: wx.WebIM.conn.context.userId + ' invite you to video call',
//             from: wx.WebIM.conn.context.userId,
//             to: value,
//             roomType: false,
//             chatType: 'singleChat',
//             ext: {
//               msg_extension: JSON.stringify({
//                 inviter: wx.WebIM.conn.context.userId,
//                 group_id: this.username.groupId,
//               }),
//               // roomName: data&&data.roomName || '',
//               password: '123456',
//               conferenceId: getApp().globalData.confrId,
//             },
//             success(id, serverMsgId) {
//               console.log('发送邀请消息成功 to: ' + value);
//               //disp.fire('em.chat.sendSuccess', id, me.data.userMessage);
//             },
//             fail(id, serverMsgId) {
//               console.log('发送邀请消息失败了');
//             },
//           });

//           // if(this.chatType == msgType.chatType.CHAT_ROOM){
//           // 	msg.setGroup("groupchat");
//           // }
//           console.log('发送邀请', msg.body);
//           uni.WebIM.conn.send(msg.body);
//         });
//     },
//   },
// };
</script>
<style>
@import './chat.css';
</style>
