<template>
  <view>
    <template v-if="isActiveComps === 'conversation'">
      <Conversation />
    </template>
    <template v-if="isActiveComps === 'contacts'">
      <Contacts />
    </template>
    <template v-if="isActiveComps === 'mine'">
      <Mine />
    </template>
    <Tabbar
      :tabbar-type="isActiveComps"
      @switchHomeComponent="switchHomeComponent"
    />
  </view>
</template>

<script>
import Tabbar from '@/layout/tabbar';
import Conversation from '@/pages/conversation/conversation.vue';
import Contacts from '@/pages/contacts/contacts.vue';
import Mine from '@/pages/mine/mine.vue';
const TITLE_MAP_TEXT = {
  conversation: '会话列表',
  contacts: '联系人',
  me: '我的',
};
export default {
  components: {
    Tabbar,
    Conversation,
    Contacts,
    Mine,
  },
  data() {
    return {
      isActiveComps: 'conversation',
    };
  },
  onLoad(options) {
    uni.setNavigationBarTitle &&
      uni.setNavigationBarTitle({
        title: TITLE_MAP_TEXT[this.isActiveComps],
      });
    if (options.page) {
      console.log('>>>>>>>', options);
      this.switchHomeComponent(options.page);
    }
  },
  methods: {
    switchHomeComponent(type) {
      this.isActiveComps = type;
    },
  },
};
</script>

<style scoped>
@import './home.css';
</style>
