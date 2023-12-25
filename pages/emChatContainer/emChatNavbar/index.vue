<template>
  <u-navbar :placeholder="true">
    <u-icon
      slot="left"
      size="20"
      name="arrow-left"
      @click="onArrowLeftBackClick"
    ></u-icon>
    <u-avatar
      slot="left"
      size="32"
      shape="square"
      :src="navbarAvatar"
    ></u-avatar>
    <view slot="left" class="chat_name">
      <text v-show="!chattingTypingStatus" class="chat_name_text">
        {{ navigatorName }}
      </text>
      <text v-show="chattingTypingStatus" class="chat_name_text"
        >对方正在输入...</text
      >
      <text class="presence_status_text">在线</text>
    </view>

    <u-icon
      slot="right"
      @click="onRightIconClick"
      size="36"
      name="/static/images/new_ui/more_icon.png"
    ></u-icon>
  </u-navbar>
</template>

<script>
import { CHAT_TYPE } from '@/EaseIM/constant';
export default {
  props: {
    targetId: {
      type: String,
      default: '',
    },
    chatType: {
      type: String,
      default: CHAT_TYPE.SINGLE_CHAT,
    },
  },
  data() {
    return {
      defaultAvatar: '/static/images/new_ui/defaultAvatar.png',
      defaultGroupAvatar: '/static/images/new_ui/defaultGroupAvatar.png',
    };
  },
  computed: {
    chattingId() {
      return this.$store.getters.chattingId;
    },
    chattingChatType() {
      return this.$store.getters.chattingChatType;
    },
    chattingTypingStatus() {
      return this.$store.getters.chattingTypingStatus;
    },
    friendUserInfoCollection() {
      return this.$store.getters.friendUserInfoCollection;
    },
    joinedGroupList() {
      return this.$store.getters.joinedGroupList;
    },
    navbarAvatar() {
      if (this.chattingChatType === CHAT_TYPE.SINGLE_CHAT) {
        const userId = this.chattingId;
        if (
          this.friendUserInfoCollection[userId] &&
          this.friendUserInfoCollection[userId]?.avatarurl
        ) {
          return (
            this.friendUserInfoCollection[userId].avatarurl ||
            this.defaultAvatar
          );
        } else {
          return this.defaultAvatar;
        }
      }
      if (this.chattingChatType === CHAT_TYPE.GROUP_CHAT) {
        return this.defaultGroupAvatar;
      }
    },
    navigatorName() {
      if (this.chattingChatType === CHAT_TYPE.SINGLE_CHAT) {
        const userId = this.chattingId;
        if (
          this.friendUserInfoCollection[userId] &&
          this.friendUserInfoCollection[userId]?.nickname
        ) {
          return this.friendUserInfoCollection[userId].nickname;
        } else {
          return userId;
        }
      }
      if (this.chattingChatType === CHAT_TYPE.GROUP_CHAT) {
        const group = this.joinedGroupList.find(
          (group) => group.groupId == this.chattingId
        );
        if (group) {
          return group.groupName || group.groupId;
        } else {
          return this.chattingId;
        }
      }
    },
  },
  methods: {
    onArrowLeftBackClick() {
      uni.navigateBack();
    },
    onRightIconClick() {
      if (this.chatType === CHAT_TYPE.SINGLE_CHAT) {
        this.entryFriendDetail();
      }
      if (this.chatType === CHAT_TYPE.GROUP_CHAT) {
        this.entryGroupDetail();
      }
    },
    //前往好友详情页面
    entryFriendDetail() {
      const friendId = this.targetId;
      uni.navigateTo({
        url: `../contactsDetail/index?userId=${friendId}`,
      });
    },
    //前往群组详情页面
    entryGroupDetail() {
      const groupId = this.targetId;
      if (groupId) {
        uni.navigateTo({
          url: '../groupDetail/index?groupId=' + groupId,
        });
      }
    },
  },
};
</script>

<style scoped>
.chat_name {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* align-items: center; */
  width: 169px;
  height: 36px;
  margin-left: 10px;
}
.chat_name_text {
  /* Frame 28 */

  /* Auto layout */
  padding: 0px;
  width: 128px;
  height: 22px;

  /* 简体中文/次级标题/中 */
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  /* identical to box height, or 138% */

  /* Neutral/1 */
  color: #171a1c;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.presence_status_text {
  /* Subtitle */

  width: 22px;
  height: 14px;
  left: 40px;
  top: 22px;

  /* 简体中文/文本/超小 */
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;
  /* identical to box height, or 127% */

  /* Neutral/5 */
  color: #75828a;
}
</style>
