<template>
  <view class="message_gray_item">
    <!-- 撤回类型通知消息 -->
    <template
      v-if="msgBody.type !== MESSAGE_TYPE.GRAY_INFORM && msgType !== ''"
    >
      <text class="message_time">{{ messageTime(msgBody.time) }}</text>
      <view
        v-if="msgType === MESSAGE_STATUS.RECALL"
        class="recall_msg_item_container"
      >
        <view v-if="isSelf">
          <text>你撤回了一条消息</text>
          <text
            class="re_edit_text"
            v-if="msgBody.type === MESSAGE_TYPE.TEXT"
            @click="callReEditTextMessage"
            >重新编辑</text
          >
        </view>
        <view v-else>
          <text>“{{ msgBody.from }}”</text>
          <text>撤回了一条消息</text>
        </view>
      </view>
    </template>
    <!-- 单聊好友关系变更类型的通知消息 -->
    <template
      v-if="
        msgBody.chatType === CHAT_TYPE.SINGLE_CHAT &&
        GRAY_INFORM_MAP_SINGLE_TEXT[msgBody.grayInformType]
      "
    >
      <text class="message_time">{{ messageTime(msgBody.time) }}</text>
      <view class="common_msg_item_container">
        <text>{{ replaceStr }}</text>
      </view>
    </template>
    <!-- 群组事件系统通知 -->
    <template
      v-if="
        msgBody.chatType === CHAT_TYPE.GROUP_CHAT &&
        GRAY_INFORM_MAP_GROUP_TEXT[msgBody.grayInformType]
      "
    >
      <text class="message_time">{{ messageTime(msgBody.time) }}</text>
      <view class="common_msg_item_container">
        <text>{{ replaceStr }}</text>
      </view>
    </template>
  </view>
</template>

<script>
import {
  CHAT_TYPE,
  MESSAGE_STATUS,
  MESSAGE_TYPE,
  GRAY_INFORM_TYPE_SINGLE,
  GRAY_INFORM_MAP_SINGLE_TEXT,
  GRAY_INFORM_TEMPLATE_NAME,
  GRAY_INFORM_TYPE_GROUP,
  GRAY_INFORM_MAP_GROUP_TEXT,
} from '@/EaseIM/constant';
export default {
  props: {
    msgBody: {
      type: Object,
      default: () => ({}),
      required: true,
    },
  },
  data() {
    return {
      CHAT_TYPE,
      MESSAGE_STATUS,
      MESSAGE_TYPE,
      GRAY_INFORM_TYPE_SINGLE,
      GRAY_INFORM_MAP_SINGLE_TEXT,
      GRAY_INFORM_TEMPLATE_NAME,
      GRAY_INFORM_TYPE_GROUP,
      GRAY_INFORM_MAP_GROUP_TEXT,
    };
  },
  computed: {
    isSelf() {
      const { from } = this.msgBody;
      return (
        from === this.$store.state.LoginStore.loginUserBaseInfos.loginUserId
      );
    },
    messageTime() {
      return (time) => {
        return this.$u.timeFrom(time);
      };
    },
    messageCollectionStatus() {
      return this.$store.getters.messageStatusCollection;
    },
    friendUserInfoCollection() {
      return this.$store.getters.friendUserInfoCollection;
    },
    groupMembersProfileData() {
      return this.$store.getters.groupMembersProfile;
    },
    // 灰色通知消息类型
    msgType() {
      const msgBody = this.msgBody;
      let msgStatus = '';
      if (msgBody.id) {
        if (
          this.messageCollectionStatus &&
          this.messageCollectionStatus[msgBody.id] === MESSAGE_STATUS.DELETE
        ) {
          msgStatus = MESSAGE_STATUS.DELETE;
        } else if (
          this.messageCollectionStatus &&
          this.messageCollectionStatus[msgBody.id] === MESSAGE_STATUS.RECALL
        ) {
          msgStatus = MESSAGE_STATUS.RECALL;
        }
      }
      return msgStatus;
    },
    //将灰色系统通知包含昵称模版的进一步替换替换字符串[XXX]为用户昵称或ID
    replaceStr() {
      const { chatType, grayInformType, from, to } = this.msgBody;
      if (chatType === CHAT_TYPE.SINGLE_CHAT) {
        let str = GRAY_INFORM_MAP_SINGLE_TEXT[grayInformType];
        if (str) {
          return (str = str.replace(
            GRAY_INFORM_TEMPLATE_NAME.USER,
            this.getFriendNickname(from)
          ));
        }
        return str;
      }
      if (chatType === CHAT_TYPE.GROUP_CHAT) {
        const groupId = to;
        let str = GRAY_INFORM_MAP_GROUP_TEXT[grayInformType];
        if (str) {
          if (str.includes(GRAY_INFORM_TEMPLATE_NAME.GROUP_USER_FROM)) {
            return (str = str.replace(
              GRAY_INFORM_TEMPLATE_NAME.GROUP_USER_FROM,
              this.getMemberGroupNickname(from, groupId)
            ));
          } else {
            return str;
          }
        }
        return str;
      }
    },
  },
  methods: {
    callReEditTextMessage() {
      const { msg } = this.msgBody;
      if (msg) {
        this.$emit('reEditTextMessage', msg);
      }
    },
    getFriendNickname(userId) {
      if (
        this.friendUserInfoCollection[userId] &&
        this.friendUserInfoCollection[userId]?.nickname
      ) {
        return `“${this.friendUserInfoCollection[userId].nickname}”`;
      } else {
        return `“${userId}”`;
      }
    },
    //获取用户对应群组昵称
    getMemberGroupNickname(userId, groupId) {
      const groupMemberData = this.groupMembersProfileData[groupId];
      console.log(groupMemberData);
      let nickname = '';
      if (groupMemberData) {
        nickname =
          groupMemberData[userId]?.nickName ||
          groupMemberData[userId]?.nickname ||
          userId;
        return `“${nickname}”`;
      } else {
        return `“${userId}”`;
      }
    },
  },
};
</script>

<style scoped>
.message_gray_item {
  width: 100%;
}
.recall_msg_item_container,
.common_msg_item_container {
  width: 100%;
  height: 16px;
  text-align: center;
  /* 简体中文/标签/小 */
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  /* identical to box height, or 133% */

  /* Neutral/5 */
  color: #75828a;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;
}
.re_edit_text {
  color: #3e91fa;
  font-size: 13px;
}
.message_time {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 16px;
  /* Alphabet/Body/Small */
  font-family: 'SF Pro';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  /* identical to box height, or 133% */
  /* Neutral/7 */
  color: #acb4b9;
  margin: 10px 0 5px 0;
}
</style>
