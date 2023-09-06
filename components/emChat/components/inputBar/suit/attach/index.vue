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
import { reactive, inject } from 'vue';
/* inject */
const injectTargetId = inject('targetId');
const injectChatType = inject('chatType');
/* EaseIM */
import { EMClient } from '@/EaseIM';
import { MESSAGE_TYPE } from '@/EaseIM/constant';
import { emMessages } from '@/EaseIM/imApis';

/* emits */
const $emits = defineEmits(['closeAllModal']);
const apiUrl = EMClient.apiUrl;
const orgName = EMClient.orgName;
const appName = EMClient.appName;
const token = EMClient.token;
const uploadTargetUrl = `${apiUrl}/${orgName}/${appName}/chatfiles`;
const options = reactive({
  url: uploadTargetUrl,
  name: 'file',
  header: {
    Authorization: `Bearer ${token}`,
  },
});
const attachState = reactive({
  instantly: true,
  // 必传宽高且宽高应与slot宽高保持一致
  width: '40px',
  height: '35px',
  // 限制允许选择的格式，空串=不限制，默认为空
  formats: '',
  // 文件上传大小限制
  size: 10,
  // 是否打印日志
  debug: true,
});

//onProgress
const checkedFile = (evt) => {
  uni.showLoading({ title: '文件上传中，请稍后' });
};
//发送附件消息
const { sendDisplayMessages } = emMessages();
const sendFileMessage = async (payload) => {
  console.log('>>>>>sendFileMessage payload', payload);
  const { dataObj, filename, file_length } = payload;
  let params = {
    // 消息类型。
    type: MESSAGE_TYPE.FILE,
    // 单聊、群聊和聊天室分别为 `singleChat`、`groupChat` 和 `chatRoom`。
    chatType: injectChatType.value,
    // 消息接收方：单聊为对方用户 ID，群聊和聊天室分别为群组 ID 和聊天室 ID。
    to: injectTargetId.value,
    body: {
      // 文件 URL。
      url: dataObj.uri + '/' + dataObj.entities[0].uuid,
      // 文件类型。
      type: 'filetype',
      // 文件名称。
      filename: filename,
      // 文件大小。
      file_length: file_length,
    },
  };
  // 发送消息。
  console.log('>>>>>要发送的消息params', params);
  try {
    await sendDisplayMessages(params);
    console.log('>>>>>文件发送成功');
    uni.hideLoading();
    $emits('closeAllModal');
  } catch (error) {
    console.log('>>>>>文件消息发送失败', error);
    uni.showToast({
      title: '消息发送失败',
      icon: 'none',
    });
  }
};
//onUploadEnd
const onUploadEnd = (res) => {
  console.log(res);
  const dataObj = JSON.parse(res.responseText); // 接收上传文件对象
  const payload = {
    dataObj,
    filename: res.name,
    file_length: res.size,
  };
  sendFileMessage(payload);
  uni.hideLoading();
  $emits('closeAllModal');
};
</script>
