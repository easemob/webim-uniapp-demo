<template>
  <view>
    <lsj-upload
      ref="lsjUpload"
      childId="upload1"
      :option="option"
      :size="size"
      :formats="formats"
      :debug="debug"
      :instantly="instantly"
      :width="width"
      :height="height"
      @uploadEnd="onUploadEnd"
      @onProgress="onProgress"
    >
      <view>
        <slot></slot>
      </view>
    </lsj-upload>
  </view>
</template>

<script>
/* EaseIM */
import { EMClient } from "@/EaseIM";
import { MESSAGE_TYPE } from "@/EaseIM/constant";
import { emMessages } from "@/EaseIM/emApis";
const { sendDisplayMessages } = emMessages();
const apiUrl = EMClient.apiUrl;
const orgName = EMClient.orgName;
const appName = EMClient.appName;
const token = EMClient.token;
const uploadTargetUrl = `${apiUrl}/${orgName}/${appName}/chatfiles`;
export default {
  data() {
    return {
      option: {
        url: uploadTargetUrl,
        name: "file",
        header: {
          Authorization: `Bearer ${token}`,
        },
      },
      // 选择文件后是否立即自动上传，true=选择后立即上传
      instantly: true,
      // 必传宽高且宽高应与slot宽高保持一致
      //   width: '64px',
      //   height: '62px',
      width: "30px",
      height: "27px",
      // 限制允许选择的格式，空串=不限制，默认为空
      formats: "",
      // 文件上传大小限制
      size: 10,
      // 是否打印日志
      debug: true,
    };
  },
  computed: {
    chattingId() {
      return this.$store.getters.chattingId;
    },
    chattingChatType() {
      return this.$store.getters.chattingChatType;
    },
  },
  methods: {
    //发送附件消息
    async sendFileMessage(payload) {
      console.log(">>>>>sendFileMessage payload", payload);
      const { dataObj, filename, file_length } = payload;
      let params = {
        // 消息类型。
        type: MESSAGE_TYPE.FILE,
        // 单聊、群聊和聊天室分别为 `singleChat`、`groupChat` 和 `chatRoom`。
        chatType: this.chattingChatType,
        // 消息接收方：单聊为对方用户 ID，群聊和聊天室分别为群组 ID 和聊天室 ID。
        to: this.chattingId,
        body: {
          // 文件 URL。
          url: dataObj.uri + "/" + dataObj.entities[0].uuid,
          // 文件类型。
          type: "filetype",
          // 文件名称。
          filename: filename,
          // 文件大小。
          file_length: file_length,
        },
        ext: {},
      };
      // 发送消息。
      console.log(">>>>>要发送的消息params", params);
      try {
        await sendDisplayMessages(params);
        console.log(">>>>>文件发送成功");
      } catch (error) {
        console.log(">>>>>文件消息发送失败", error);
        if (error.type === 508) {
          uni.showToast({
            title: "发送内容不合规",
            icon: "none",
          });
        } else {
          uni.showToast({
            title: `消息发送失败${error.type}`,
            icon: "none",
          });
        }
      } finally {
        uni.hideLoading();
        this.$emit("onCloseAllShowContainer", true);
      }
    },
    onUploadEnd(res) {
      const dataObj = JSON.parse(res.responseText); // 接收上传文件对象
      const payload = {
        dataObj,
        filename: res.name,
        file_length: res.size,
      };
      this.sendFileMessage(payload);
      uni.hideLoading();
    },
    //onProgress
    onProgress(evt) {
      uni.showLoading({ title: "文件上传中，请稍后" });
    },
  },
};
</script>

<style></style>
