<template>
  <view class="user-wrap">
    <view class="user-header-wrap">
      <image
        @tap="resetViewedUserInfo"
        class="arrow-back"
        :src="arrowBack"
      ></image>
      <view class="title">{{ $t("contactDetail") }}</view>
    </view>

    <view class="user-info-wrap">
      <Avatar
        class="user-avatar"
        :src="userInfo.avatar"
        :placeholder="defaultAvatar"
      />
      <view>
        <view class="remark" @tap="copy">
          {{ userInfo.name }} （{{ contactStore.viewedUserInfo.userId }}）
        </view>
        <view class="user-sign">{{
          appUserStore.getUserInfoFromStore(contactStore.viewedUserInfo.userId)
            .sign
        }}</view>
      </view>
    </view>

    <view class="user-remark-wrap">
      <view
        >{{ $t("remark") }}:
        <span>{{ editRemark ? "" : contactStore.viewedUserInfo.remark }}</span>
      </view>
      <input
        class="remark-input"
        v-if="editRemark"
        @confirm="setRemark"
        :placeholder="$t('remarkPlaceholder')"
        v-model="remarkValue"
      />
      <view v-else @tap="editRemark = true">{{ $t("editRemark") }}</view>
    </view>

    <view class="user-block-wrap">
      <view>{{ $t("blockList") }}:</view>
      <switch :checked="isBlockUser" @change="switchChange" />
    </view>

    <view class="user-opt-wrap">
      <button class="opt-btn" type="primary" @tap="goChat">
        {{ $t("sendMessage") }}
      </button>
      <button class="opt-btn" type="warn" @tap="deleteContact">
        {{ $t("deleteFriend") }}
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
import Avatar from "@/components/avatar/index.vue";
import defaultAvatar from "@/static/images/defaultAvatar.png";
import arrowBack from "@/static/images/arrow-back.png";
import { useContactStore } from "@/store/contact";
import { useBlockStore } from "@/store/block";
import { useAppUserStore } from "@/store/appUser";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { computed } from "vue";

const contactStore = useContactStore();
const blockStore = useBlockStore();
const appUserStore = useAppUserStore();
const { t } = useI18n();
const { blockUser, unBlockUser } = blockStore;
const remarkValue = ref("");
const editRemark = ref(false);

const isBlockUser = computed(() => {
  return blockStore.blockList.includes(contactStore.viewedUserInfo.userId);
});

const resetViewedUserInfo = () => {
  contactStore.setViewedUserInfo({
    userId: "",
    remark: ""
  });
};

const setRemark = async () => {
  await contactStore.setContactRemark(
    contactStore.viewedUserInfo.userId,
    remarkValue.value
  );
  contactStore.setViewedUserInfo({
    userId: contactStore.viewedUserInfo.userId,
    remark: remarkValue.value
  });
  editRemark.value = false;
};

const switchChange = async (e: any) => {
  uni.showLoading();
  try {
    if (e.detail.value) {
      await blockUser(contactStore.viewedUserInfo.userId);
    } else {
      await unBlockUser(contactStore.viewedUserInfo.userId);
    }
    uni.hideLoading();
  } catch (error) {
    uni.hideLoading();
  }

  uni.hideLoading();
};

const goChat = () => {
  uni.navigateTo({
    url: `../../pages/Chat/index?type=singleChat&id=${contactStore.viewedUserInfo.userId}`
  });
  resetViewedUserInfo();
};

const userInfo = computed(() => {
  return appUserStore.getUserInfoFromStore(contactStore.viewedUserInfo.userId);
});

const copy = () => {
  uni.setClipboardData({
    data: contactStore.viewedUserInfo.userId
  });
};

const deleteContact = () => {
  contactStore.deleteContact(contactStore.viewedUserInfo.userId).then(() => {
    uni.showToast({
      title: t("deleteSuccess")
    });
    resetViewedUserInfo();
  });
};
</script>

<style lang="scss" scoped>
.user-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgb(248, 248, 248);
  z-index: 100;
}
.user-header-wrap {
  display: flex;
  align-items: center;
  background: #fff;
  padding: 10rpx 0;
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
.user-avatar {
  flex-shrink: 0;
  margin-right: 30rpx;
}
.user-info-wrap {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background: #fff;
  margin-top: 20rpx;
}

.user-remark-wrap {
  display: flex;
  margin-top: 20rpx;
  align-items: center;
  background: #fff;
  padding: 20rpx;
  justify-content: space-between;
}

.user-block-wrap {
  display: flex;
  margin-top: 20rpx;
  align-items: center;
  background: #fff;
  padding: 20rpx;
  justify-content: space-between;
}

.remark {
  font-size: 36rpx;
  word-break: break-all;
}

.user-sign {
  color: #999;
  font-size: 28rpx;
}

.user-opt-wrap {
  margin-top: 50rpx;
  font-size: 36rpx;
}
.opt-btn {
  width: 90%;
  margin-left: 5%;
  margin-top: 20rpx;
}
</style>
