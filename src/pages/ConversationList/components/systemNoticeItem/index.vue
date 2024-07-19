<template>
  <view class="conversation-item-wrap" @tap="toNotice">
    <view class="avatar-wrap">
      <Avatar :src="noticeAvatar" />
      <view v-if="noticeItem.unReadCount > 0" class="unread-count">
        {{ noticeItem.unReadCount > 99 ? "99+" : noticeItem.unReadCount }}
      </view>
    </view>
    <view class="content-wrap">
      <view class="user-info-wrap">
        <view class="user-nick-name ellipsis">{{ $t("systemNotice") }}</view>
        <view class="msg-wrap">
          <view class="last-msg ellipsis">{{ $t("newNoticeTip") }}</view>
        </view>
      </view>
      <view class="time">{{ noticeItem.time }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import Avatar from "@/components/avatar/index.vue";
import noticeAvatar from "@/static/images/sys_notice.png";
import { useGroupStore } from "@/store/group";
import { useContactStore } from "@/store/contact";
import { computed } from "vue";
import { getTimeStringAutoShort } from "@/utils/index";

const groupStore = useGroupStore();

const contactStore = useContactStore();

const { contactsNoticeInfo } = contactStore;
const { groupNoticeInfo } = groupStore;

const noticeItem = computed(() => {
  const latestContactNoticeTime = contactsNoticeInfo.list[0]?.time || 0;
  const latestGroupNoticeTime = groupNoticeInfo.list[0]?.time || 0;
  const time = Math.max(latestContactNoticeTime, latestGroupNoticeTime);
  return {
    unReadCount: contactsNoticeInfo.unReadCount + groupNoticeInfo.unReadCount,
    time: getTimeStringAutoShort(time)
  };
});

const toNotice = () => {
  uni.switchTab({
    url: "../../pages/User/index"
  });
};
</script>
<style lang="scss">
@import url("./style.scss");
</style>
