<template>
  <view class="group-wrap">
    <view class="group-header-wrap">
      <image
        @tap="resetViewedGroupInfo"
        class="arrow-back"
        :src="arrowBack"
      ></image>
      <view class="title">{{ $t("groupDetail") }}</view>
    </view>

    <view class="group-info-wrap">
      <Avatar class="group-avatar" src="" :placeholder="defaultGroupAvatar" />
      <view>
        <view class="groupname">{{
          groupStore.viewedGroupInfo.groupName
        }}</view>
        <view class="group-id"
          >GroupId: {{ groupStore.viewedGroupInfo.groupId }}（{{
            groupStore.viewedGroupInfo.public
              ? $t("publicGroup")
              : $t("privateGroup")
          }}）</view
        >
      </view>
    </view>

    <view class="group-opt-wrap">
      <button class="opt-btn" type="primary" @tap="goChat">
        {{ $t("enterGroup") }}
      </button>
      <button class="opt-btn" @tap="goGroupDetail">
        {{ $t("groupDetail") }}
      </button>

      <button
        class="opt-btn"
        v-if="groupStore.viewedGroupInfo.role === 'owner'"
        type="warn"
        @tap="destroyGroup"
      >
        {{ $t("destroyGroup") }}
      </button>

      <button
        class="opt-btn"
        v-if="groupStore.viewedGroupInfo.role !== 'owner'"
        type="warn"
        @tap="leaveGroup"
      >
        {{ $t("leaveGroup") }}
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
import Avatar from "@/components/avatar/index.vue";
import defaultGroupAvatar from "@/static/images/defaultGroupAvatar.png";
import { useGroupStore } from "@/store/group";
import { useI18n } from "vue-i18n";
import type { EasemobChat } from "easemob-websdk";
import arrowBack from "@/static/images/arrow-back.png";
const groupStore = useGroupStore();
const { t } = useI18n();

const resetViewedGroupInfo = () => {
  groupStore.setViewedGroupInfo({
    groupName: "",
    groupId: ""
  } as EasemobChat.GroupInfo);
};

const goChat = () => {
  uni.navigateTo({
    url: `../../pages/Chat/index?type=groupChat&id=${groupStore.viewedGroupInfo.groupId}`
  });
  resetViewedGroupInfo();
};

const goGroupDetail = () => {
  uni.navigateTo({
    url: `../../pages/GroupDetail/index?id=${groupStore.viewedGroupInfo.groupId}`
  });
};

const destroyGroup = async () => {
  await groupStore.destroyGroup(groupStore.viewedGroupInfo.groupId);
  resetViewedGroupInfo();
  uni.showToast({
    title: t("destroyGroupSuccess")
  });
};

const leaveGroup = async () => {
  await groupStore.leaveGroup(groupStore.viewedGroupInfo.groupId);
  resetViewedGroupInfo();
  uni.showToast({
    title: t("leaveGroupSuccess")
  });
};
</script>

<style lang="scss" scoped>
.group-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgb(248, 248, 248);
  z-index: 100;
}
.group-header-wrap {
  display: flex;
  align-items: center;
  background: #fff;
  margin: 20rpx 0;
  padding: 10rpx;
}

.arrow-back {
  width: 40rpx;
  height: 40rpx;
  flex-shrink: 0;
  margin: 0 20rpx;
}

.title {
  width: 100%;
  text-align: center;
  padding-right: 80rpx;
  font-size: 28rpx;
}
.group-avatar {
  flex-shrink: 0;
  margin-right: 30rpx;
}
.group-info-wrap {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background: #fff;
  margin-top: 20rpx;
}

.group-groupname-wrap {
  display: flex;
  margin-top: 20rpx;
  align-items: center;
  background: #fff;
  padding: 20rpx;
  justify-content: space-between;
}

.group-block-wrap {
  display: flex;
  margin-top: 20rpx;
  align-items: center;
  background: #fff;
  padding: 20rpx;
  justify-content: space-between;
}

.groupname {
  font-size: 36rpx;
  word-break: break-all;
}

.group-id {
  color: #999;
  font-size: 28rpx;
}

.group-opt-wrap {
  margin-top: 50rpx;
  font-size: 36rpx;
}

.opt-btn {
  width: 90%;
  margin-left: 5%;
  margin-top: 20rpx;
}
</style>
