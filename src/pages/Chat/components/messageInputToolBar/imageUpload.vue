<template>
  <view class="tool-image-wrap tool-item" @tap="chooseImage">
    <ItemContainer :title="title" :iconUrl="ImageIcon"> </ItemContainer>
  </view>
</template>

<script lang="ts" setup>
import ItemContainer from "./itemContainer.vue";
import ImageIcon from "@/static/images/inputbar/tofeipeng/icons/img@2x.png";
import { useConnStore } from "@/store/conn";
import { useConversationStore } from "@/store/conversation";
import { useMessageStore } from "@/store/message";
import { useAppUserStore } from "@/store/appUser";
import { API_URL } from "@/const/index";
import type { InputToolbarEvent } from "@/types/index";
import { inject } from "vue";
import { useI18n } from "vue-i18n";

interface Props {
  title?: string;
}
defineProps<Props>();
const { t } = useI18n();

const title = t("imageUpload");

const toolbarInject = inject<InputToolbarEvent>("InputToolbarEvent");

const { getChatConn, getChatSDK } = useConnStore();

const { sendMessage } = useMessageStore();

const { getSelfUserInfo } = useAppUserStore();

const convStore = useConversationStore();

const conn = getChatConn();

const SDK = getChatSDK();

const chooseImage = () => {
  uni.chooseImage({
    count: 1,
    sourceType: ["album"], // 从相册选择
    success: function (res) {
      sendImageMessage(res);
    }
  });
};

const sendImageMessage = (res: any) => {
  const tempFilePath =
    res?.tempFilePaths?.[0] || res?.tempFiles?.[0].tempFilePath;
  const uploadUrl = `${API_URL}/${conn.orgName}/${conn.appName}/chatfiles`;

  if (!tempFilePath) {
    return;
  }
  uni.showLoading();
  const token = conn.token;
  const requestParams = {
    url: uploadUrl,
    filePath: tempFilePath,
    fileType: "image",
    name: "file",
    header: {
      Authorization: "Bearer " + token
    },
    success: async (res: any) => {
      console.log("图片上传成功", res);
      const data = JSON.parse(res.data);
      const imgMsg = SDK.message.create({
        type: "img",
        to: convStore.currConversation!.conversationId,
        chatType: convStore.currConversation!.conversationType,
        url: data.uri + "/" + data.entities[0].uuid,
        ext: {
          ease_chat_uikit_user_info: {
            avatarURL: getSelfUserInfo().avatar,
            nickname: getSelfUserInfo().name
          }
        }
      });
      try {
        await sendMessage(imgMsg);
        toolbarInject?.onMessageSend();
        toolbarInject?.closeToolbar();
      } catch (error: any) {
        uni.showToast({
          title: `send failed: ${error.message}`,
          icon: "none"
        });
      }
      uni.hideLoading();
    },
    fail: (e: any) => {
      uni.hideLoading();
      uni.showToast({ title: t("uploadFailed"), icon: "none" });
    }
  };
  //@ts-ignore
  uni.uploadFile(requestParams);
};
</script>

<style lang="scss" scoped>
.tool-item {
  display: flex;
  justify-content: center;
}
</style>
