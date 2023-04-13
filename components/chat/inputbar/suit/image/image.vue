<template>
  <view></view>
</template>
<script setup>
import { reactive, toRefs } from 'vue';
import msgType from '@/components/chat/msgtype';
import msgStorage from '@/components/chat/msgstorage';
import disp from '@/utils/broadcast';
const WebIM = uni.WebIM;

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

const isGroupChat = () => {
  return chatType.value == msgType.chatType.CHAT_ROOM;
};
const getSendToParam = () => {
  return isGroupChat() ? chatParams.value.groupId : chatParams.value.your;
};
const openCamera = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['camera'],

    success(res) {
      upLoadImage(res);
    },
  });
};
//执行发送图片消息
const sendImage = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album'],
    success(res) {
      console.log('选择的图片', res);
      upLoadImage(res);
    },
  });
};
//上传到环信服务器并执行发送
const upLoadImage = (res) => {
  var tempFilePaths = res.tempFilePaths;
  var token = WebIM.conn.context.accessToken;
  //拿到图片基本信息
  uni.getImageInfo({
    src: res.tempFilePaths[0],
    success(res) {
      //设定容许上传的图片类型
      const allowType = {
        jpg: true,
        jpeg: true,
        gif: true,
        png: true,
        bmp: true,
      };
      const str = WebIM.config.appkey.split('#');
      const width = res.width;
      const height = res.height;
      var index = res.path.lastIndexOf('.');
      console.log('index>>', index);
      var filetype = (~index && res.path.slice(index + 1)) || '';
      if (!res.type) {
        uni.showToast({
          title: 'H5端，uni-app暂未支持',
          icon: 'none',
        });
      }
      if (filetype.toLowerCase() in allowType || res.type in allowType) {
        uni.uploadFile({
          url: 'https://a1.easemob.com/' + str[0] + '/' + str[1] + '/chatfiles',
          filePath: tempFilePaths[0],
          fileType: 'image',
          name: 'file',
          header: {
            // "Content-Type": "multipart/form-data",
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Bearer ' + token,
          },
          success: (res) => {
            console.log('上传图片成功', res);
            if (res.statusCode == 400) {
              // 图片上传阿里云检验不合法
              // var errData = JSON.parse(res.data);
              // if (errData.error === 'content improper') {
              uni.showToast({
                title: '图片检测不合法',
                duration: 1000,
              });
              return false;
              // }
            }
            var data = res.data;
            var dataObj = JSON.parse(data);
            var id = WebIM.conn.getUniqueId(); // 生成本地消息 id

            var msg = new WebIM.message(msgType.IMAGE, id);
            var file = {
              type: msgType.IMAGE,
              size: {
                width: width,
                height: height,
              },
              url: dataObj.uri + '/' + dataObj.entities[0].uuid,
              filetype: filetype,
              filename: tempFilePaths[0],
            };
            msg.set({
              apiUrl: WebIM.config.apiURL,
              body: file,
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
              type: msgType.IMAGE,
            };
            saveSendMsg(obj);
          },
          fail: (err) => {
            console.log('上传失败', err);
          },
          complete: (err) => {
            console.log('上传完成', err);
          },
        });
      }
    },
  });
};
const saveSendMsg = (evt) => {
  console.log('saveSendMsg', evt);
  msgStorage.saveMsg(evt.msg, evt.type);
};
defineExpose({
  openCamera,
  sendImage,
});
// export default {
//   data() {
//     return {};
//   },

//   components: {},
//   props: {

//   },
//   methods: {

//   },
// };
</script>
