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
          tabType === 'conversation'
            ? highlightConversationImg
            : conversationImg
        "
      ></image>
      <text :class="tabType === 'conversation' && 'activeText'">会话</text>
    </view>

    <view class="tableBar" @click="changeTab('contacts')">
      <image
        :src="tabType === 'contacts' ? highlightContactsImg : contactsImg"
      ></image>
      <text :class="tabType === 'contacts' && 'activeText'">联系人</text>
    </view>

    <view class="tableBar" @click="changeTab('me')">
      <image :src="tabType === 'me' ? highlightSettingImg : settingImg"></image>
      <text :class="tabType === 'me' && 'activeText'">我的</text>
    </view>
  </view>
</template>

<script setup>
import { ref, toRefs, computed } from 'vue';
/* stores */
import { useConversationStore } from '@/stores/conversation';
import { useInformStore } from '@/stores/inform';
/* images */
const conversationImg = '/static/images/session2x.png';
const highlightConversationImg = '/static/images/sessionhighlight2x.png';
const contactsImg = '/static/images/comtacts2x.png';
const highlightContactsImg = '/static/images/comtactshighlight2x.png';
const settingImg = '/static/images/setting2x.png';
const highlightSettingImg = '/static/images/settinghighlight2x.png';
/* props */
const props = defineProps({
  tabType: {
    type: String,
    default: 'conversation',
    required: true,
  },
});
/* emits */
const emits = defineEmits(['switchHomeComponent']);
const { tabType } = toRefs(props);
const isIPX = ref(false);

//未处理系统通知总数
const informStore = useInformStore();
const unReadNoticeNum = computed(() => {
  return informStore.getAllInformsList.filter((inform) => !inform.isHandled)
    .length;
});
//会话未读总数
const conversationStore = useConversationStore();
const allConversationUnReadNum = computed(() => {
  return (
    unReadNoticeNum.value + conversationStore.calcAllUnReadNumFromConversation
  );
});
const changeTab = (type) => {
  emits('switchHomeComponent', type);
};
</script>

<style scoped>
@import './index.css';
</style>
