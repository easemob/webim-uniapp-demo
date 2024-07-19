<template>
  <view class="user-wrap">
    <view class="user-info-wrap">
      <view class="avatar-wrap">
        <Avatar
          class="user-avatar"
          :src="userInfo.avatar"
          :placeholder="defaultAvatar"
        />
        <view @tap="changeAvatar" class="change-avatar">
          {{ $t("edit") }}
        </view>
      </view>
      <view class="info-wrap">
        <view class="name" @tap="copy">{{ userInfo.name }}（{{ userId }}）</view>
        <view class="sign"> {{ userInfo.sign }}</view>
      </view>
    </view>
    <view class="divider"></view>

    <view class="menu-wrap">
      <view class="menu-item" @tap="toContactNotices">
        {{ $t("contactNotice") }}
        {{
          contactStore.contactsNoticeInfo.unReadCount
            ? `(${contactStore.contactsNoticeInfo.unReadCount})`
            : ""
        }}
        <view class="item-info">></view>
      </view>
      <view class="menu-item" @tap="toGroupNotices">
        {{ $t("groupNotice") }}
        {{
          groupStore.groupNoticeInfo.unReadCount
            ? `(${groupStore.groupNoticeInfo.unReadCount})`
            : ""
        }}
        <view class="item-info">></view>
      </view>
      <view class="menu-item" @tap="toSetting">
        {{ $t("personalSetting") }}
        <view class="item-info">></view>
      </view>
      <view class="menu-item">
        {{ $t("feedback") }}
        <view class="item-info">yunxing@easemob.com</view>
      </view>
      <view class="menu-item">
        <view>{{ $t("about") }}</view>
        <view class="item-info">Easemob UniApp SDK v4.8.1</view>
      </view>
      <view class="menu-item menu-item-logout" @tap="logout">
        {{ $t("logout") }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import Avatar from "@/components/avatar/index.vue";
import defaultAvatar from "@/static/images/defaultAvatar.png";
import { useChatStore } from "@/store/chat";
import { useConnStore } from "@/store/conn";
import { CHAT_STORE } from "@/const/index";
import { useContactStore } from "@/store/contact";
import { useAppUserStore } from "@/store/appUser";
import { useGroupStore } from "@/store/group";
import { computed, watch, ref } from "vue";
import conn from "@/initIM";
import { getInsideUploadUrl } from "@/const/index";

const contactStore = useContactStore();

const { close } = useChatStore();

const groupStore = useGroupStore();

const { getChatConn } = useConnStore();

const appUserStore = useAppUserStore();

const { getUserInfoFromStore, updateUserInfo } = appUserStore;

const userId = getChatConn().user;

const userInfo = computed(() => getUserInfoFromStore(userId));

const changeAvatar = () => {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      const info = appUserStore.appUserInfo.get(userId);
      appUserStore.appUserInfo.set(userId, {
        ...info,
        avatarurl: res.tempFilePaths[0]
      });
      uni.uploadFile({
        url: getInsideUploadUrl(userId),
        filePath: res.tempFilePaths[0],
        fileType: "image",
        name: "file",
        header: {
          Authorization: "Bearer " + conn.token
        },
        success: (res) => {
          const dt = JSON.parse(res.data);
          updateUserInfo({
            //@ts-ignore
            avatarurl: dt.avatarUrl
          });
        }
      });
    }
  });
};

const copy = () => {
  uni.setClipboardData({
    data: userId
  });
};

const toContactNotices = () => {
  contactStore.clearContactNoticeUnReadCount();
  uni.navigateTo({
    url: `../../pages/ContactNotices/index`
  });
};

const toGroupNotices = () => {
  groupStore.clearGroupNoticeUnReadCount();
  uni.navigateTo({
    url: `../../pages/GroupNotices/index`
  });
};

const toSetting = () => {
  uni.navigateTo({
    url: `../../pages/Setting/index`
  });
};

const logout = () => {
  close();
  uni.removeStorageSync(CHAT_STORE);
  uni.reLaunch({
    url: "/pages/Login/index"
  });
};
</script>
<style lang="scss" scoped>
@import url("./style.scss");
</style>
