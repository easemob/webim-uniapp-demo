<template>
  <view class="group-list-wrap">
    <GroupInfoPanel v-if="groupStore.viewedGroupInfo.groupId" />
    <ContactSearch
      v-if="isShowSearchPanel"
      :searchType="'group'"
      @onCancel="onSearchCancel"
    />
    <view v-else>
      <view @tap="searchGroup" class="group-search menu-item">
        <Avatar class="icon" :src="AddIcon"></Avatar>
        <view> {{ $t("addGroup") }}</view>
      </view>
      <view @tap="toCreateGroup" class="menu-item">
        <Avatar class="icon" :src="CreateGroupIcon"></Avatar>
        <view> {{ $t("createGroup") }}</view>
      </view>
      <view class="menu-item">
        {{ $t("groupList") }}
      </view>
      <view class="items-wrap">
        <view
          class="item-wrap"
          v-for="group in groupStore.joinedGroupList"
          :key="group.groupId"
          @tap="viewGroupInfo(group)"
        >
          <Avatar
            class="user-avatar"
            src=""
            :placeholder="defaultGroupAvatar"
          />
          <view class="item-name ellipsis">{{ group.groupName }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import Avatar from "@/components/avatar/index.vue";
import type { EasemobChat } from "easemob-websdk";
import defaultGroupAvatar from "@/static/images/defaultGroupAvatar.png";
import GroupInfoPanel from "./components/groupInfoPanel/index.vue";
import CreateGroupIcon from "@/static/images/createGroup.png";
import ContactSearch from "@/pages/ContactList/components/contactSearch/index.vue";
import AddIcon from "@/static/images/add.png";
import { useGroupStore } from "@/store/group";
import { ref } from "vue";

const isShowSearchPanel = ref(false);

const groupStore = useGroupStore();

const { setViewedGroupInfo } = groupStore;

const searchGroup = () => {
  isShowSearchPanel.value = true;
};

const onSearchCancel = () => {
  isShowSearchPanel.value = false;
};

const toCreateGroup = () => {
  uni.navigateTo({
    url: `../../pages/CreateGroup/index`
  });
};

const viewGroupInfo = (group: EasemobChat.GroupInfo) => {
  setViewedGroupInfo(group);
};
</script>
<style lang="scss" scoped>
@import url("./style.scss");
</style>
