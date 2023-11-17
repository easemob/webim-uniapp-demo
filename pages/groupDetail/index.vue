<template>
  <view>
    <u-navbar
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :autoBack="true"
    >
      <u-icon
        slot="right"
        size="24"
        name="/static/images/new_ui/contacts/add_contacts.png"
        @click="entryAddContactsPage"
      ></u-icon>
    </u-navbar>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped></style>
