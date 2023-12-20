<template>
  <view>
    <u-navbar
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      left-text="消息通知"
      :autoBack="true"
    >
    </u-navbar>
    <u-cell-group :border="false">
      <u-cell title="消息免打扰" label="开启后，你将收不到任何消息推送与提示">
        <view slot="value">
          <u-switch
            v-model="isOpenNoDisturbingSetting"
            @input="changeAppSilentMode"
          ></u-switch>
        </view>
      </u-cell>
    </u-cell-group>
  </view>
</template>

<script>
import { emSilent } from '@/EaseIM/emApis';
const { getSilentModeForAll, setSilentModeForAll } = emSilent();
export default {
  data() {
    return {
      isOpenNoDisturbingSetting: false, //是否开启消息免打扰
    };
  },
  onLoad() {
    this.getNowAppSilentMode();
  },
  methods: {
    async getNowAppSilentMode() {
      try {
        const { data } = await getSilentModeForAll();
        if (Object.keys(data).length > 0) {
          data?.type === 'ALL'
            ? (this.isOpenNoDisturbingSetting = false)
            : (this.isOpenNoDisturbingSetting = true);
        } else {
          this.isOpenNoDisturbingSetting = false;
        }
      } catch (error) {
        console.log('error', error);
        uni.showToast({
          title: '应用推送状态获取失败',
          icon: 'none',
        });
      }
    },
    async changeAppSilentMode(value) {
      try {
        if (value) {
          await setSilentModeForAll({ remindType: 'NONE' });
          uni.showToast({
            icon: 'none',
            title: '已开启应用推送免打扰',
          });
        } else {
          await setSilentModeForAll({ remindType: 'ALL' });
          uni.showToast({
            icon: 'none',
            title: '已关闭应用推送免打扰',
          });
        }
      } catch (error) {
        console.log('error', error);
        uni.showToast({
          title: '应用推送状态修改失败',
          icon: 'none',
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
