<template>
  <view class="contact-list-wrap">
    <UserInfoPanel v-if="contactStore.viewedUserInfo.userId" />
    <ContactSearch
      v-if="isShowSearchPanel"
      :searchType="'contact'"
      @onCancel="onSearchCancel"
    />
    <view v-else>
      <view @tap="searchContact" class="contact-search menu-item">
        <Avatar class="icon" :src="AddIcon"></Avatar>
        <view> {{ $t("addContact") }}</view>
      </view>
      <view @tap="toGroupList" class="menu-item">
        <Avatar class="icon" :src="GroupIcon"></Avatar>
        <view> {{ $t("myGroup") }}</view>
      </view>
      <view class="menu-item">{{ $t("blockList") }}</view>
      <view
        class="item-wrap"
        v-for="blockUserId in blockStore.blockList"
        :key="blockUserId"
      >
        <Avatar
          class="user-avatar"
          :src="getUserInfoFromStore(blockUserId).avatar"
          :placeholder="defaultAvatar"
        />
        <view class="item-name ellipsis">{{
          getUserInfoFromStore(blockUserId).name
        }}</view>
      </view>
      <view class="menu-item">{{ $t("contact") }}</view>
      <view class="items-wrap">
        <view
          class="item-wrap"
          v-for="contact in contactStore.contacts"
          :key="contact.userId"
          @tap="viewUserInfo(contact)"
        >
          <Avatar
            class="user-avatar"
            :src="getUserInfoFromStore(contact.userId).avatar"
            :placeholder="defaultAvatar"
          />
          <view class="item-name ellipsis">{{
            getUserInfoFromStore(contact.userId).name
          }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import Avatar from "@/components/avatar/index.vue";
import ContactSearch from "./components/contactSearch/index.vue";
import type { EasemobChat } from "easemob-websdk";
import defaultAvatar from "@/static/images/defaultAvatar.png";
import GroupIcon from "@/static/images/groupIcon.png";
import AddIcon from "@/static/images/add.png";
import UserInfoPanel from "./components/userInfoPanel/index.vue";
import { useBlockStore } from "@/store/block";
import { useContactStore } from "@/store/contact";
import { useAppUserStore } from "@/store/appUser";
import { ref } from "vue";
const isShowSearchPanel = ref(false);

const blockStore = useBlockStore();
const contactStore = useContactStore();
const appUserStore = useAppUserStore();

const { getUserInfoFromStore } = appUserStore;

const { setViewedUserInfo } = contactStore;

const searchContact = () => {
  isShowSearchPanel.value = true;
};

const onSearchCancel = () => {
  isShowSearchPanel.value = false;
};

const toGroupList = () => {
  uni.navigateTo({
    url: `../../pages/GroupList/index`
  });
};

const viewUserInfo = (contact: EasemobChat.ContactItem) => {
  setViewedUserInfo(contact);
};
</script>
<style lang="scss" scoped>
@import url("./style.scss");
</style>
