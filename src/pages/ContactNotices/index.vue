<template>
  <view class="notices-wrap">
    <view
      class="notice-empty"
      v-if="contactStore.contactsNoticeInfo.list.length === 0"
    >
      {{ $t("emptyNoticeTip") }}
    </view>
    <view
      class="item-info-wrap"
      v-for="notice in contactStore.contactsNoticeInfo.list"
      :key="notice.time"
    >
      <view class="notice-info-wrap">
        <view class="item-id ellipsis">{{
          getUserInfoFromStore(notice.from).name
        }}</view>
        <view class="notice-info">
          <view class="notice-msg">
            <view v-if="notice.ext === 'invited'" class="item-opt">
              <view>{{ $t("applyAddFriend") }}</view>
            </view>
            <view v-else-if="notice.ext === 'agreed'" class="item-opt">
              <view>{{ $t("agreedFriend") }}</view>
            </view>
            <view v-else-if="notice.ext === 'refused'" class="item-opt">
              <view>{{ $t("refusedFriend") }}</view>
            </view>
            <view v-else-if="notice.ext === 'added'" class="item-opt">
              <view>{{ $t("addedFriend") }}</view>
            </view>
            <view v-else-if="notice.ext === 'deleted'" class="item-opt">
              <view>{{ $t("deletedFriend") }}</view>
            </view>
          </view>
          <view class="notice-time">
            {{ getTimeStringAutoShort(notice.time) }}</view
          >
        </view>
      </view>
      <view
        class="notice-btn-wrap"
        v-if="notice.type === 'subscribe' && notice.showOperation"
      >
        <view
          class="notice-btn"
          @tap="
            () => {
              notice.showOperation = false;
              acceptContactInvite(notice.from);
            }
          "
          >{{ $t("acceptFriend") }}</view
        >
        <view
          class="notice-btn"
          @tap="
            () => {
              notice.showOperation = false;
              declineContactInvite(notice.from);
            }
          "
          >{{ $t("refuseFriend") }}</view
        >
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useContactStore } from "@/store/contact";
import { getTimeStringAutoShort } from "@/utils/index";
import { useAppUserStore } from "@/store/appUser";
import { onUnmounted } from "vue";
const contactStore = useContactStore();
const appUserStore = useAppUserStore();
const { acceptContactInvite, declineContactInvite } = contactStore;
const { getUserInfoFromStore } = appUserStore;

onUnmounted(() => {
  contactStore.clearContactNoticeUnReadCount();
});
</script>
<style lang="scss" scoped>
@import url("./style.scss");
</style>
