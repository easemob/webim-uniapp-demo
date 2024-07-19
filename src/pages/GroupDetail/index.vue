<template>
  <view class="group-detail-wrap" v-if="groupDetail?.id">
    <view class="group-base-wrap">
      <Avatar class="group-avatar" src="" :placeholder="defaultGroupAvatar" />
      <view>
        <view class="groupname">{{ groupDetail?.name }}</view>
        <view class="group-id"
          >GroupId: {{ groupDetail?.id }}（{{
            groupDetail?.public ? $t("publicGroup") : $t("privateGroup")
          }}）</view
        >
      </view>
    </view>
    <view class="group-member-wrap">
      <view class="group-owner-wrap">
        <view class="label">
          {{ $t("owner") }}
        </view>
        <view>{{ getUserInfoFromStore(groupDetail?.owner).name }}</view>
      </view>
      <view class="member-count-wrap">
        <view class="label">
          {{ $t("groupMember") }}
        </view>
        <view class="member-count">{{ groupDetail?.affiliations_count }}</view>
      </view>

      <view class="member-items-wrap">
        <view
          class="member-item"
          v-for="item in defaultGroupMembers"
          :key="item.joined_time"
        >
          <Avatar
            :src="getUserInfoFromStore(item.owner || item.member).avatar"
            :placeholder="defaultAvatar"
          />
          <view v-if="item.owner" class="user-name ellipsis"
            >{{ getUserInfoFromStore(item.owner).name }}
          </view>
          <view v-if="item.member" class="user-name ellipsis"
            >{{ getUserInfoFromStore(item.member).name }}
          </view>
        </view>
        <view v-if="isGroupOwner" class="opt-item" @tap="toInviteList">
          <Avatar src="" :placeholder="addAvatar" />
        </view>
        <view v-if="isGroupOwner" class="opt-item" @tap="toRemoveList">
          <Avatar src="" :placeholder="delAvatar" />
        </view>
      </view>
      <view
        class="view-all-member"
        @tap="toAllGroupMembers"
        v-if="groupDetail?.affiliations_count > DEFAULT_GROUP_MEMBER_COUNT"
        >{{ $t("viewAllGroupMembers") }} ></view
      >
    </view>
    <view class="group-desc-wrap">
      <view class="label">{{ $t("groupDesc") }}</view>
      <view class="desc">{{ groupDetail?.description }}</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import Avatar from "@/components/avatar/index.vue";
import { useGroupStore } from "@/store/group";
import { useConnStore } from "@/store/conn";
import { useAppUserStore } from "@/store/appUser";
import defaultGroupAvatar from "@/static/images/defaultGroupAvatar.png";
import defaultAvatar from "@/static/images/defaultAvatar.png";
import addAvatar from "@/static/images/add_contacts.png";
import delAvatar from "@/static/images/del_contacts.png";
import { ref, computed } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { DEFAULT_GROUP_MEMBER_COUNT } from "@/const/index";

const groupId = ref("");
const groupStore = useGroupStore();
const connStore = useConnStore();
const appUserStore = useAppUserStore();

const { getUserInfoFromStore } = appUserStore;

const { getGroupInfo } = groupStore;

const groupDetail = computed(() => {
  return groupStore.groupDetailMap.get(groupId.value);
});

const toInviteList = () => {
  uni.navigateTo({
    url: `/pages/InviteList/index?id=${groupId.value}&type=invite`
  });
};

const toRemoveList = () => {
  uni.navigateTo({
    url: `/pages/InviteList/index?id=${groupId.value}&type=remove`
  });
};

const toAllGroupMembers = () => {
  uni.navigateTo({
    url: `/pages/GroupMemberList/index?id=${groupId.value}`
  });
};

const defaultGroupMembers = computed(() => {
  return (
    groupDetail.value?.affiliations.slice(0, DEFAULT_GROUP_MEMBER_COUNT) || []
  );
});

const isGroupOwner = computed(() => {
  return groupDetail.value?.owner === connStore.getChatConn().user;
});

onLoad(async (option) => {
  try {
    uni.showLoading();
    groupId.value = option?.id;
    if (groupId.value) {
      await getGroupInfo(groupId.value);
    }
    uni.hideLoading();
  } catch (error) {
    console.error(error);
    uni.hideLoading();
  }
});
</script>

<style lang="scss" scoped>
@import url("./style.scss");
</style>
