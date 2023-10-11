<template>
  <view>
    <em-chat />
  </view>
</template>

<script>
import EmChat from '@/components/emChat';
import { CHAT_TYPE } from '@/EaseIM/constant';
export default {
  data() {
    return {
      targetId: '',
      chatType: '',
    };
  },
  components: {
    EmChat,
  },
  onLoad(option) {
    console.log(option);
    this.targetId = option.targetId;
    this.chatType = option.chatType;
  },
  mounted() {
    uni.setNavigationBarTitle({
      title: this.getTheIdName(this.targetId, this.chatType),
    });
  },
  provide() {
    return {
      targetId: () => this.targetId,
      chatType: () => this.chatType,
    };
  },
  computed: {
    joinedGroupList() {
      return this.$store.state.GroupStore.joinedGroupList;
    },
    friendUserInfoMap() {
      return this.$store.state.ContactsStore.friendUserInfoMap;
    },
  },
  methods: {
    getGroupName(groupid) {
      let groupName = '';
      if (this.joinedGroupList.length) {
        this.joinedGroupList.forEach((item) => {
          if (item.groupid === groupid) {
            console.log(item.groupname);
            return (groupName = item.groupname);
          }
        });
        console.log('groupName', groupName);
        return groupName;
      } else {
        return groupid;
      }
    },
    getTheIdName(targetId, chatType) {
      if (chatType === CHAT_TYPE.SINGLE_CHAT) {
        const friendInfo = this.friendUserInfoMap.get(targetId);
        return friendInfo?.nickname || targetId;
      }
      if (chatType === CHAT_TYPE.GROUP_CHAT) {
        return this.getGroupName(targetId);
      }
      switch (chatType) {
        case CHAT_TYPE.SINGLE_CHAT:
          const friendInfo = this.friendUserInfoMap.get(targetId);
          friendInfo?.nickname || targetId;
          break;
        case CHAT_TYPE.GROUP_CHAT:
          console.log('>>>>>>> Group');
          this.getGroupName(targetId);
          break;
        default:
          return null;
      }
    },
  },
};
</script>

<style scoped>
@import './index.css';
</style>
