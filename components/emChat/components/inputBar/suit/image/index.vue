<template>
  <view></view>
</template>
<script setup>
import { inject, onMounted } from 'vue';
/* EaseIM */
import { EMClient } from '@/EaseIM';
import { MESSAGE_TYPE } from '@/EaseIM/constant';
import { emMessages } from '@/EaseIM/imApis';
/* inject */
const injectTargetId = inject('targetId');
const injectChatType = inject('chatType');
let platForm = '';
// console.log('platForm', platForm);
onMounted(async () => {
  const res = await uni.getSystemInfo();
  console.log('platForm', res);
  platForm = res?.uniPlatform;
});
/* emits */
const emits = defineEmits(['closeAllModal']);
//打开相机
const openCamera = () => {
  if (
    platForm === 'mp-weixin' ||
    platForm === 'mp-toutiao' ||
    platForm === 'mp-jd'
  ) {
    uni.chooseMedia({
      count: 9,
      mediaType: ['image'],
      sourceType: ['camera'],
      camera: 'back',
      success(res) {
        console.log('拍照选取的图片', res);
        upLoadImage(res);
      },
    });
  } else {
    uni.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],

      success(res) {
        upLoadImage(res);
      },
    });
  }
};
//打开相册
const openPhotoAlbum = () => {
  if (
    platForm === 'mp-weixin' ||
    platForm === 'mp-toutiao' ||
    platForm === 'mp-jd'
  ) {
    uni.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album'],
      success(res) {
        console.log('选择的图片', res);
        upLoadImage(res);
      },
    });
  } else {
    uni.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success(res) {
        console.log('选择的图片', res);
        upLoadImage(res);
      },
    });
  }
};
//执行发送附件
const { sendDisplayMessages } = emMessages();
const sendImagesMessage = async (
  res,
  { imageName, width, height, imageType }
) => {
  console.log('>>>>>开始执行发送图片消息', res);
  const dataObj = JSON.parse(res.data); // 接收消息对象
  var params = {
    type: MESSAGE_TYPE.IMAGE,
    width: width,
    height: height,
    url: dataObj.uri + '/' + dataObj.entities[0].uuid,
    // 消息接收方：单聊为对方用户 ID，群聊和聊天室分别为群组 ID 和聊天室 ID。
    to: injectTargetId.value,
    // 会话类型：单聊、群聊和聊天室分别为 `singleChat`、`groupChat` 和 `chatRoom`。
    chatType: injectChatType.value,
    ext: {
      imageName: imageName,
      imageType: imageType,
    },
  };
  try {
    const res = await sendDisplayMessages({ ...params });
  } catch (error) {
    console.log('>>>>>图片消息发送失败', error);
    uni.showToast({
      title: '消息发送失败',
      icon: 'none',
    });
  } finally {
    emits('closeAllModal');
  }
};
//上传图片到环信服务器
const apiUrl = EMClient.apiUrl;
const orgName = EMClient.orgName;
const appName = EMClient.appName;
const uploadTargetUrl = `${apiUrl}/${orgName}/${appName}/chatfiles`;
const token = EMClient.token;
const upLoadImage = async (res) => {
  const tempFile = res?.tempFiles[0];
  const tempFilePath =
    (res && res.tempFilePaths && res.tempFilePaths[0]) ||
    (res && res.tempFiles && res.tempFiles[0].tempFilePath);

  console.log('tempFilePath', tempFilePath);
  const imageName = tempFile?.name || 'image' + Date.now();
  const imageType = tempFile?.type?.split('/')[1] || '';
  const { width, height } = await uni.getImageInfo({
    src: tempFilePath,
  });
  uni.uploadFile({
    url: uploadTargetUrl,
    filePath: tempFilePath,
    fileType: 'image',
    name: 'file',
    header: {
      Authorization: 'Bearer ' + token,
    },
    success: (res) => {
      console.log('上传图片成功', res);
      if (res.statusCode === 400) {
        // 图片上传阿里云检验不合法
        var errData = JSON.parse(res.data);
        if (errData.error === 'content improper') {
          uni.showToast({ title: '图片不合法', icon: 'none' });
          return false;
        }
      }
      sendImagesMessage(res, { imageName, width, height, imageType });
      uni.showToast({ title: '图片已上传', icon: 'none' });
    },
    fail: (e) => {
      console.log('>>>>>上传失败', e);
      uni.showToast({ title: '图片上传失败', icon: 'none' });
    },
  });
};
defineExpose({
  openCamera,
  openPhotoAlbum,
});
</script>
