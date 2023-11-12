<template>
  <!-- <view :class="isIPX ? 'chatRoom_tab_X' : 'chatRoom_tab'">
    <view class="tableBar" @click="changeTab('conversation')">
      <view
        v-if="allConversationUnReadNum > 0"
        :class="
          'em-unread-spot ' +
          (allConversationUnReadNum > 99 ? 'em-unread-spot-litleFont' : '')
        "
        >{{ allConversationUnReadNum }}</view
      >
      <image
        :class="allConversationUnReadNum > 0 ? 'haveSpot' : ''"
        :src="
          tabbarType === 'conversation'
            ? highlightConversationImg
            : conversationImg
        "
      ></image>
      <text :class="tabbarType === 'conversation' && 'activeText'">会话</text>
    </view>

    <view class="tableBar" @click="changeTab('contacts')">
      <image
        :src="tabbarType === 'contacts' ? highlightContactsImg : contactsImg"
      ></image>
      <text :class="tabbarType === 'contacts' && 'activeText'">联系人</text>
    </view>

    <view class="tableBar" @click="changeTab('mine')">
      <image
        :src="tabbarType === 'mine' ? highlightSettingImg : settingImg"
      ></image>
      <text :class="tabbarType === 'mine' && 'activeText'">我的</text>
    </view>
  </view> -->
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
    <u-tabbar-item name="contacts" text="联系人">
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
    //会话未读数
    allConversationUnReadNum() {
      return (
        this.unReadNoticeNum +
        this.$store.getters.calcAllUnReadNumFromConversation
      );
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
