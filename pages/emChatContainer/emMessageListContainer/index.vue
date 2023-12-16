<template>
  <view>
    <text v-show="isNeedShowMessageTime" class="message_time">{{
      messageTime(msgBody.time)
    }}</text>
    <view
      :class="[
        'message_list_item',
        !isSelf(msgBody) || 'message_list_item_mine',
        msgBody.id == quoteMsgId && 'quote_msg_avtive',
      ]"
    >
      <!--user avatar -->
      <view class="message_list_item_avatar">
        <u-avatar :src="messageItemAvatar" shape="square" :size="28" />
      </view>
      <view class="message_list_item_content" @longpress="callMessagePopup">
        <text
          :class="[
            'message_list_item_content_nickname',
            isSelf(msgBody) && 'message_list_item_content_nickname_mine',
          ]"
          >{{ messageItemNickName }}</text
        >

        <!-- 文本消息 -->
        <template v-if="msgBody.type === MESSAGE_TYPE.TEXT">
          <text-msg-item :msgBody="msgBody" />
        </template>
        <!-- 图片消息 -->
        <template v-if="msgBody.type === MESSAGE_TYPE.IMAGE">
          <image-msg-item :msgBody="msgBody" />
        </template>
        <!-- 语音消息 -->
        <template v-if="msgBody.type === MESSAGE_TYPE.AUDIO">
          <audio-msg-item
            :msgBody="msgBody"
            :playAudioMid="playAudioMid"
            @onClickPlayAudio="onClickPlayAudio"
          />
        </template>
        <!-- 附件消息 -->
        <template v-if="msgBody.type === MESSAGE_TYPE.FILE">
          <file-msg-item :msgBody="msgBody" />
        </template>
        <!-- 个人名片 -->
        <template
          v-if="
            msgBody.type === MESSAGE_TYPE.CUSTOM &&
            msgBody.customEvent === CUSTOM_EVENT_NAME.USER_CARD
          "
        >
          <user-card-msg-item :msgBody="msgBody" />
        </template>
        <msg-quote-container
          v-if="msgBody.ext.msgQuote"
          :msgQuoteContent="msgBody.ext.msgQuote"
          @click.native="callScrollToQuoteMsg(msgBody.ext.msgQuote)"
        />
      </view>
    </view>
  </view>
</template>

<script>
import { MESSAGE_TYPE, CUSTOM_EVENT_NAME, CHAT_TYPE } from '@/EaseIM/constant';
import TextMsgItem from './messagesItem/textMsgItem';
import ImageMsgItem from './messagesItem/imageMsgItem';
import AudioMsgItem from './messagesItem/audioMsgItem';
import FileMsgItem from './messagesItem/fileMsgItem';
import UserCardMsgItem from './messagesItem/userCardItem';
import MsgQuoteContainer from './msgQuoteContainer';
import { EMClient } from '@/EaseIM';
export default {
  components: {
    TextMsgItem,
    ImageMsgItem,
    AudioMsgItem,
    FileMsgItem,
    UserCardMsgItem,
    MsgQuoteContainer,
  },
  props: {
    msgBody: {
      type: Object,
      default: () => ({}),
      required: true,
    },
    isNeedShowMessageTime: {
      type: Boolean,
      default: false,
    },
    quoteMsgId: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      MESSAGE_TYPE,
      CUSTOM_EVENT_NAME,
      playAudioMid: '',
      defaultAvatar: '/static/images/new_ui/defaultAvatar.png',
    };
  },
  computed: {
    isSelf() {
      return (item) => {
        return (
          item.from ===
          this.$store.state.LoginStore.loginUserBaseInfos.loginUserId
        );
      };
    },
    loginUserProfiles() {
      return this.$store.state.LoginStore.loginUserProfiles;
    },
    messageTime() {
      return (time) => {
        return this.$u.timeFrom(time);
      };
    },
    friendUserInfoMap() {
      return this.$store.state.ContactsStore.friendUserInfoMap;
    },
    groupMembersProfileData() {
      return this.$store.getters.groupMembersProfile;
    },
    messageItemAvatar() {
      if (this.isSelf(this.msgBody)) {
        return this.loginUserProfiles?.avatarurl || this.defaultAvatar;
      }
      if (this.msgBody.chatType === CHAT_TYPE.SINGLE_CHAT) {
        const userId = this.msgBody.from;
        if (
          this.friendUserInfoMap.has(userId) &&
          this.friendUserInfoMap.get(userId)?.avatarurl
        ) {
          return (
            this.friendUserInfoMap.get(userId).avatarurl || this.defaultAvatar
          );
        } else {
          return this.defaultAvatar;
        }
      }
      if (this.msgBody.chatType === CHAT_TYPE.GROUP_CHAT) {
        const groupId = this.msgBody.to;
        const userId = this.msgBody.from;
        const groupMemberData = this.groupMembersProfileData[groupId];
        if (groupMemberData) {
          return groupMemberData[userId]?.avatarurl || this.defaultAvatar;
        } else {
          return this.defaultAvatar;
        }
      }
    },
    messageItemNickName() {
      if (this.isSelf(this.msgBody)) {
        return this.loginUserProfiles?.nickname || EMClient.user;
      }
      if (this.msgBody.chatType === CHAT_TYPE.SINGLE_CHAT) {
        const userId = this.msgBody.from;
        if (
          this.friendUserInfoMap.has(userId) &&
          this.friendUserInfoMap.get(userId)?.nickname
        ) {
          return this.friendUserInfoMap.get(userId).nickname;
        } else {
          return userId;
        }
      }
      if (this.msgBody.chatType === CHAT_TYPE.GROUP_CHAT) {
        const groupId = this.msgBody.to;
        const userId = this.msgBody.from;
        const groupMemberData = this.groupMembersProfileData[groupId];
        if (groupMemberData) {
          return (
            groupMemberData[userId]?.nickName ||
            groupMemberData[userId]?.nickname ||
            userId
          );
        } else {
          return userId;
        }
      }
    },
  },
  methods: {
    onClickPlayAudio(mid) {
      this.playAudioMid = mid;
      console.log('mid', mid);
      console.log('++++++++');
    },
    //TODO 待好友详情页完成，点击userCard消息跳转至用户详情
    //TODO 点击头像也需要跳转至好友详情页
    callMessagePopup() {
      this.$emit('alertMessagePopup', this.msgBody);
    },
    callScrollToQuoteMsg(msgQuote) {
      this.$emit('scrollToQuoteMessge', msgQuote);
    },
  },
};
</script>

<style scoped>
@import './index.css';
</style>
