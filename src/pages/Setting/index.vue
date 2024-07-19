<template>
  <view class="setting--wrap">
    <view class="content">
      <view class="input-wrap">
        <view class="label">{{ $t("nickname") }}</view>
        <input
          v-model="nickName"
          maxlength="15"
          :placeholder="$t('nickNamePlaceholder')"
        />
      </view>
      <view class="input-wrap">
        <view class="label">{{ $t("sign") }}</view>
        <input
          v-model="sign"
          maxlength="50"
          :placeholder="$t('signPlaceholder')"
        />
      </view>
      <button class="update-btn" @tap="update">
        {{ $t("updateUserInfo") }}
      </button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useConnStore } from "@/store/conn";
import { useAppUserStore } from "@/store/appUser";
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";

const appUserStore = useAppUserStore();
const connStore = useConnStore();
const { t } = useI18n();
const { getChatConn } = connStore;
const userInfo = computed(() => getUserInfoFromStore(userId));

const { getUserInfoFromStore, updateUserInfo } = appUserStore;

const userId = getChatConn().user;

const sign = ref(userInfo.value.sign);
const nickName = ref(userInfo.value.name);

const update = () => {
  updateUserInfo({
    sign: sign.value,
    nickname: nickName.value
  }).then(() => {
    uni.showToast({
      title: t("requestSended"),
      icon: "success",
      duration: 2000
    });
    const timer = setTimeout(() => {
      uni.navigateBack();
      clearTimeout(timer);
    }, 1000);
  });
};
</script>

<style lang="scss" scoped>
@import url("./style.scss");
</style>
