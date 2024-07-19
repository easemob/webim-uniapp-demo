<template>
  <view class="msg-notice">
    <view class="notice">
      <view class="notice-content">
        <view class="notice-text">
          <view v-if="noticeType === 'recall'">
            {{
              `"${
                appUserStore.getUserInfoFromStore(msg?.noticeInfo?.ext?.from)
                  .name
              }" ${$t("recallNotice")}`
            }}
          </view>
          <view v-else-if="noticeType === 'group'">
            {{
              `"${
                appUserStore.getUserInfoFromStore(msg?.noticeInfo?.ext?.from)
                  .name
              }" ${noticeExt.operation} ${$t("group")}`
            }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import type { MixedMessageBody } from "@/types/index";
import { useAppUserStore } from "@/store/appUser";
interface Props {
  msg: MixedMessageBody;
}
const appUserStore = useAppUserStore();
const props = defineProps<Props>();
const { msg } = props;
const noticeExt = msg.noticeInfo?.ext || {};
const noticeType = msg.noticeInfo?.noticeType;
</script>

<style lang="scss" scoped>
.msg-notice {
  margin: 20rpx 0;
}
.notice-text {
  text-align: center;
  font-size: 24rpx;
  color: #999;
}
</style>
