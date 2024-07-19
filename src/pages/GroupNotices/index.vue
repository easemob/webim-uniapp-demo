<template>
  <view class="notices-wrap">
    <view
      class="notice-empty"
      v-if="groupStore.groupNoticeInfo.list.length === 0"
    >
      {{ $t("emptyNoticeTip") }}
    </view>
    <view
      class="item-info-wrap"
      v-for="notice in groupStore.groupNoticeInfo.list"
      :key="notice.time"
    >
      <view class="notice-info-wrap">
        <view class="item-id ellipsis">{{
          getUserInfoFromStore(notice.from).name
        }}</view>
        <view class="notice-info">
          <view v-if="notice.operation === 'inviteToJoin'" class="notice-msg">
            <view class="item-opt">
              <view>{{ `${$t("inviteToGroup")}, groupId: ${notice.id}` }}</view>
            </view>
          </view>
          <view v-else class="notice-msg">
            <view class="item-opt">
              <view>{{ `${notice.operation}, groupId: ${notice.id}` }}</view>
            </view>
          </view>
          <view class="notice-time">
            {{ getTimeStringAutoShort(notice.time) }}</view
          >
        </view>
      </view>
      <view
        class="notice-btn-wrap"
        v-if="
          notice.operation === 'inviteToJoin' && notice.showOperation === true
        "
      >
        <view
          class="notice-btn"
          @tap="
            () => {
              notice.showOperation = false;
              acceptInvite(notice.id);
            }
          "
          >{{ $t("acceptFriend") }}</view
        >
        <view
          class="notice-btn"
          @tap="
            () => {
              notice.showOperation = false;
              rejectInvite(notice.id);
            }
          "
          >{{ $t("refuseFriend") }}</view
        >
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useGroupStore } from "@/store/group";
import { getTimeStringAutoShort } from "@/utils/index";
import { useAppUserStore } from "@/store/appUser";
import { onUnmounted } from "vue";
const groupStore = useGroupStore();
const appUserStore = useAppUserStore();

const { getUserInfoFromStore } = appUserStore;

const acceptInvite = (groupId: string) => {
  groupStore.acceptGroupInvite(groupId);
};

const rejectInvite = (groupId: string) => {
  groupStore.rejectGroupInvite(groupId);
};

onUnmounted(() => {
  groupStore.clearGroupNoticeUnReadCount();
});
</script>
<style lang="scss" scoped>
@import url("./style.scss");
</style>
