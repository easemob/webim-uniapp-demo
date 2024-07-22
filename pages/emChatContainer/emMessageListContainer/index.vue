<template>
  <view>
    <text v-if="isNeedShowMessageTime" class="message_time">{{
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
        <u-avatar
          :src="messageItemAvatar"
          shape="square"
          :size="28"
          @click="entryContactsDetailPage"
        />
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
          <user-card-msg-item
            @click.native="entryContactsDetailPage(CUSTOM_EVENT_NAME.USER_CARD)"
            :msgBody="msgBody"
          />
        </template>
        <!-- 位置消息 -->
        <template v-if="msgBody.type === MESSAGE_TYPE.LOCATION">
          <!-- 如已经配置mainifest.json 中有关Maps的key等信息配置可以解开location msg 组件注释 -->
          <text>位置消息</text>
          <!-- <location-msg-item :msgBody="msgBody" /> -->
        </template>
        <msg-quote-container
          v-if="msgBody.ext && msgBody.ext.msgQuote"
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
import LocationMsgItem from './messagesItem/locationMsgItem';
import MsgQuoteContainer from './msgQuoteContainer';
import { EMClient } from '@/EaseIM';
export default {
  components: {
    TextMsgItem,
    ImageMsgItem,
    AudioMsgItem,
    FileMsgItem,
    UserCardMsgItem,
    LocationMsgItem,
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

    friendUserInfoCollection() {
      return this.$store.getters.friendUserInfoCollection;
    },
    groupMembersProfileData() {
      return this.$store.getters.groupMembersProfile;
    },
    friendList() {
      return this.$store.state.ContactsStore.friendList;
    },
    messageItemAvatar() {
      if (this.isSelf(this.msgBody)) {
        return this.loginUserProfiles?.avatarurl || this.defaultAvatar;
      }
      if (this.msgBody.chatType === CHAT_TYPE.SINGLE_CHAT) {
        const userId = this.msgBody.from;
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
      // if (this.isSelf(this.msgBody)) {
      //     return this.loginUserProfiles?.nickname || EMClient.user;
      // }
      if (this.msgBody.chatType === CHAT_TYPE.SINGLE_CHAT) {
        if (this.isSelf(this.msgBody)) {
          return this.loginUserProfiles?.nickname || EMClient.user;
        } else {
          const userId = this.msgBody.from;
          // 首先在this.friendList中查找userId对应的remark
          const friendRemark = this.friendList.find(
            (friend) => friend.userId === userId && friend.remark
          );
          if (friendRemark) {
            return friendRemark.remark; // 如果找到了remark，返回remark
          }
          // 如果没有remark，再在this.friendUserInfoCollection中查找用户昵称
          else if (
            this.friendUserInfoCollection[userId] &&
            this.friendUserInfoCollection[userId]?.nickname
          ) {
            return this.friendUserInfoCollection[userId].nickname; // 返回昵称
          }
          // 如果既没有remark也没有昵称，返回userId
          else {
            return userId;
          }
        }
      }
      if (this.msgBody.chatType === CHAT_TYPE.GROUP_CHAT) {
        const groupId = this.msgBody.to;

        const userId = this.msgBody.from;
        const groupMemberData = this.groupMembersProfileData[groupId];
        console.log('groupMemberData', groupMemberData);
        if (groupMemberData) {
          return (
            groupMemberData[userId]?.nickName ||
            groupMemberData[userId]?.nickname ||
            userId
          );
        } else {
          return this.$store.dispatch('fetchGroupMembersProfile', {
            groupId: groupId,
            memberList: [userId],
          });
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
    callMessagePopup() {
      this.$emit('alertMessagePopup', this.msgBody);
    },
    callScrollToQuoteMsg(msgQuote) {
      this.$emit('scrollToQuoteMessge', msgQuote);
    },
    //前往联系人详情页面
    entryContactsDetailPage(type) {
      if (type === CUSTOM_EVENT_NAME.USER_CARD) {
        const {
          customExts: { uid: userId },
        } = this.msgBody;
        uni.navigateTo({
          url: `../contactsDetail/index?userId=${userId}`,
        });
      } else {
        if (this.msgBody.from === EMClient.user) return;
        const userId = this.msgBody.from;
        uni.navigateTo({
          url: `../contactsDetail/index?userId=${userId}`,
        });
      }
    },
  },
};
</script>

<style scoped>
@import './index.css';
</style>
