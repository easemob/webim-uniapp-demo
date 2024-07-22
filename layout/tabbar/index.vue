<template>
  <u-tabbar
    :value="tabbarType"
    @change="changeTab"
    activeColor="#469CF8"
    :fixed="true"
    :placeholder="true"
    :safeAreaInsetBottom="true"
  >
    <u-tabbar-item
      name="conversation"
      text="会话"
      :badge="allConversationUnReadNum"
      badgeStyle="margin-right: 10rpx"
    >
      <image
        class="tabbar_icon_image"
        slot="active-icon"
        src="/static/images/new_ui/layout/conversation_active.png"
      ></image>
      <image
        class="tabbar_icon_image"
        slot="inactive-icon"
        src="/static/images/new_ui/layout/conversation.png"
      ></image>
    </u-tabbar-item>
    <u-tabbar-item
      name="contacts"
      text="联系人"
      :badge="newInviteMsgNum"
      badgeStyle="margin-right: 10rpx"
    >
      <image
        class="tabbar_icon_image"
        slot="active-icon"
        src="/static/images/new_ui/layout/contacts_avtive.png"
      ></image>
      <image
        class="tabbar_icon_image"
        slot="inactive-icon"
        src="/static/images/new_ui/layout/contacts.png"
      ></image>
    </u-tabbar-item>
    <u-tabbar-item text="我的" name="mine">
      <image
        class="tabbar_icon_image"
        slot="active-icon"
        src="/static/images/new_ui/layout/mine_active.png"
      ></image>
      <image
        class="tabbar_icon_image"
        slot="inactive-icon"
        src="/static/images/new_ui/layout/mine.png"
      ></image>
    </u-tabbar-item>
  </u-tabbar>
</template>

<script>
export default {
  data() {
    return {
      tabbarType: 'conversation',
    };
  },
  computed: {
    unReadNoticeNum() {
      return this.$store.getters.getAllInformsList.filter(
        (inform) => !inform.isHandled
      ).length;
    },
    newInviteMsgNum() {
      return (
        this.$store.getters.getReceiveInviteList?.length &&
        this.$store.getters.getReceiveInviteList.filter(
          (inform) => !inform.isHandled
        ).length
      );
    },
    //会话未读数
    allConversationUnReadNum() {
      if (this.$store.getters.calcAllUnReadNumFromConversation >= 99) {
        return 99;
      } else {
        return this.$store.getters.calcAllUnReadNumFromConversation;
      }
    },
  },
  methods: {
    changeTab(type) {
      this.tabbarType = type;
      this.$emit('switchHomeComponent', type);
    },
  },
};
</script>

<style scoped>
@import './index.css';
</style>
