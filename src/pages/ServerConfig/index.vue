<template>
  <view class="server-config-wrap">
    <view class="content">
      <view class="switch-wrap">
        <view class="label">{{ $t("isUseCustomServer") }}</view>
        <switch :checked="isUseCustomServer" @change="switchChange" />
      </view>
      <view v-if="isUseCustomServer">
        <view class="input-wrap">
          <view class="label">{{ $t("appkey") }}</view>
          <input v-model="appkey" :placeholder="$t('appkeyPlaceholder')" />
        </view>
        <view class="input-wrap">
          <view class="label">{{ $t("msyncUrl") }}</view>
          <input v-model="url" :placeholder="$t('msyncUrlPlaceholder')" />
        </view>
        <view class="input-wrap">
          <view class="label">{{ $t("resetUrl") }}</view>
          <input v-model="restUrl" :placeholder="$t('resetUrlPlaceholder')" />
        </view>
      </view>
      <button class="update-btn" @tap="setting">
        {{ $t("setting") }}
      </button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  SERVER_CONFIG_STORE,
  APPKEY,
  URL,
  API_URL,
  IS_USE_CUSTOM_SERVER
} from "@/const/index";
const url = ref(URL);
const restUrl = ref(API_URL);
const appkey = ref(APPKEY);
const isUseCustomServer = ref(IS_USE_CUSTOM_SERVER);

const setting = () => {
  try {
    const config = {
      url: isUseCustomServer.value === false ? "" : url.value,
      restUrl: isUseCustomServer.value === false ? "" : restUrl.value,
      appkey: isUseCustomServer.value === false ? "" : appkey.value,
      isUseCustomServer: isUseCustomServer.value
    };
    uni.setStorageSync(SERVER_CONFIG_STORE, config);
    // #ifdef APP-PLUS
    plus.runtime.restart();
    // #endif
    // #ifdef WEB
    window.location.reload();
    // #endif

    // #ifdef MP-WEIXIN
    uni.showToast({
      title: "设置成功, 请重新打开小程序",
      icon: "none"
    });
    // #endif
  } catch (error) {
    console.log(error);
  }
};

const switchChange = (e: any) => {
  isUseCustomServer.value = e.detail.value;
};
</script>

<style lang="scss" scoped>
@import url("./style.scss");
</style>
