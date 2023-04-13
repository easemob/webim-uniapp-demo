<template>
  <view>
    <lsj-upload
      ref="lsjUpload"
      childId="upload1"
      :width="attachState.width"
      :height="attachState.height"
      :option="options"
      :size="attachState.size"
      :formats="attachState.formats"
      :debug="attachState.debug"
      :instantly="attachState.instantly"
      @change="checkedFile"
      @uploadEnd="onUploadEnd"
    >
      <view :style="{ width: attachState.width, height: attachState.height }">
        <slot></slot>
      </view>
    </lsj-upload>
  </view>
</template>

<script setup>
import { reactive, toRefs } from 'vue';
import msgType from '@/components/chat/msgtype';
import msgStorage from '@/components/chat/msgstorage';
import disp from '@/utils/broadcast';
const WebIM = uni.WebIM;
const str = WebIM.config.appkey.split('#');
const token = WebIM.conn.context.accessToken;
/* props */
const props = defineProps({
  chatParams: {
    type: Object,
    default: () => ({}),
  },
  chatType: {
    type: String,
    default: msgType.chatType.SINGLE_CHAT,
  },
});
const { chatParams, chatType } = toRefs(props);
/* emits */
const $emits = defineEmits(['closeAllModal']);
const options = reactive({
  url: `https://a1.easemob.com/${str[0]}/${str[1]}/chatfiles `,
  name: 'file',
  header: {
    Authorization: `Bearer${token}`,
  },
});
const attachState = reactive({
  instantly: true,
  // 必传宽高且宽高应与slot宽高保持一致
  width: '108rpx',
  height: '155rpx',
  // 限制允许选择的格式，空串=不限制，默认为空
  formats: '',
  // 文件上传大小限制
  size: 10,
  // 是否打印日志
  debug: true,
});

const getSendToParam = () => {
  return isGroupChat() ? chatParams.value.groupId : chatParams.value.your;
};
const isGroupChat = () => {
  return chatType.value == msgType.chatType.CHAT_ROOM;
};

const saveSendMsg = (evt) => {
  msgStorage.saveMsg(evt.msg, evt.type);
};
//onProgress
const checkedFile = (evt) => {
  uni.showLoading({ title: '文件上传中，请稍后' });
};
//onUploadEnd
const onUploadEnd = (res) => {
  console.log(res);
  let id = WebIM.conn.getUniqueId();
  let msg = new WebIM.message(msgType.FILE, id);
  let dataObj = JSON.parse(res.responseText); // 接收上传文件对象
  msg.set({
    apiUrl: WebIM.config.apiURL,
    accessToken: token,
    body: {
      type: msgType.FILE,
      url: dataObj.uri + '/' + dataObj.entities[0].uuid,
      filename: res.name,
      accessToken: token,
      file_length: res.size,
    },
    from: WebIM.conn.user,
    to: getSendToParam(),
    chatType: isGroupChat()
      ? msgType.chatType.GROUP_CHAT
      : msgType.chatType.SINGLE_CHAT,
    success: function (argument) {
      disp.fire('em.chat.sendSuccess', id);
    },
  });

  WebIM.conn.send(msg.body);
  let obj = {
    msg: msg,
    type: msgType.FILE,
  };
  saveSendMsg(obj);
  uni.hideLoading();
  $emits('closeAllModal');
};
</script>
