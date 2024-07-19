<template>
  <view class="tool-video-wrap tool-item" @tap="chooseVideo">
    <ItemContainer :title="title" :iconUrl="ImageIcon"> </ItemContainer>
  </view>
</template>

<script lang="ts" setup>
import ItemContainer from "./itemContainer.vue";
import ImageIcon from "@/static/images/inputbar/tofeipeng/icons/img@2x.png";
import { useConnStore } from "@/store/conn";
import { useConversationStore } from "@/store/conversation";
import { useAppUserStore } from "@/store/appUser";
import { useMessageStore } from "@/store/message";
import { API_URL } from "@/const/index";
import type { InputToolbarEvent } from "@/types/index";
import { inject } from "vue";
import { useI18n } from "vue-i18n";

interface Props {
  title?: string;
}
defineProps<Props>();
const { t } = useI18n();

const title = t("videoUpload");

const toolbarInject = inject<InputToolbarEvent>("InputToolbarEvent");

const { getChatConn, getChatSDK } = useConnStore();

const { sendMessage } = useMessageStore();

const conn = getChatConn();

const { getSelfUserInfo } = useAppUserStore();

const SDK = getChatSDK();

const convStore = useConversationStore();

const chooseVideo = () => {
  uni.chooseVideo({
    sourceType: ["camera", "album"],
    success: function (res) {
      console.log(res, "resresresres");
      sendVideoMessage(res);
    }
  });
};

const sendVideoMessage = (res: any) => {
  const tempFilePath = res?.tempFilePath;
  const uploadUrl = `${API_URL}/${conn.orgName}/${conn.appName}/chatfiles`;

  if (!tempFilePath) {
    return;
  }
  uni.showLoading();
  const token = conn.token;
  console.log(token, "  token");
  const requestParams = {
    url: uploadUrl,
    filePath: tempFilePath,
    fileType: "video",
    name: "file",
    header: {
      Authorization: "Bearer " + token
    },
    success: async (res: any) => {
      const data = JSON.parse(res.data);
      const videoMsg = SDK.message.create({
        type: "video",
        to: convStore.currConversation!.conversationId,
        chatType: convStore.currConversation!.conversationType,
        file_length: res.duration,
        //@ts-ignore
        body: {
          url: data.uri + "/" + data.entities[0].uuid
        },
        ext: {
          ease_chat_uikit_user_info: {
            avatarURL: getSelfUserInfo().avatar,
            nickname: getSelfUserInfo().name
          }
        }
      });
      try {
        await sendMessage(videoMsg);
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
