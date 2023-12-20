<template>
  <view>
    <u-navbar
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      left-text="隐私"
      :autoBack="true"
    >
    </u-navbar>
    <u-cell-group :border="false">
      <u-cell title="黑名单" isLink>
        <text slot="value">{{ blockUserList.length }}</text>
      </u-cell>
    </u-cell-group>
  </view>
</template>

<script>
export default {
  computed: {
    blockUserList() {
      return this.$store.state.ContactsStore.blockUserList;
    },
  },
};
</script>

<style scoped></style>
