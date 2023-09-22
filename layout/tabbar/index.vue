<template>
  <view :class="isIPX ? 'chatRoom_tab_X' : 'chatRoom_tab'">
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
  </view>
</template>

<script>
const conversationImg = '/static/images/session2x.png';
const highlightConversationImg = '/static/images/sessionhighlight2x.png';
const contactsImg = '/static/images/comtacts2x.png';
const highlightContactsImg = '/static/images/comtactshighlight2x.png';
const settingImg = '/static/images/setting2x.png';
const highlightSettingImg = '/static/images/settinghighlight2x.png';
export default {
  data() {
    return {
      isIPX: false,
      conversationImg,
      highlightConversationImg,
      contactsImg,
      highlightContactsImg,
      settingImg,
      highlightSettingImg,
    };
  },
  props: {
    tabbarType: {
      type: String,
      default: 'conversation',
      required: true,
    },
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
      this.$emit('switchHomeComponent', type);
    },
  },
};
</script>

<style scoped>
@import './index.css';
</style>
