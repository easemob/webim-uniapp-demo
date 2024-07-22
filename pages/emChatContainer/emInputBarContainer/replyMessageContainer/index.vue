<template>
  <view class="reply_msg_container" @click="extractMessageBodyValue">
    <view class="reply_msg_content_box">
      <view class="reply_msg_content_box_left">
        <view class="reply_msg_target">
          <!-- <u-icon
            name="/static/images/new_ui/message/replyMessage/replying_icon.png"
            size="16"
          ></u-icon> -->
          正在回复：
          <text class="reply_msg_target_name u-line-1">{{
            previewMsgFromNickname
          }}</text>
        </view>
        <view class="reply_msg_content u-line-1"
          >{{ previewText }}
          <!-- 音频length含展示length -->
          <text
            class="reply_msg_audio_length"
            v-if="this.checkedPopupMsgBody.length"
          >
            {{ this.checkedPopupMsgBody.length }}″</text
          >
        </view>
      </view>
      <view
        v-if="this.checkedPopupMsgBody.type !== MESSAGE_TYPE.TEXT"
        class="reply_msg_content_box_rigth"
      >
        <u-icon :name="previewFileIcon" size="36"></u-icon>
      </view>
    </view>
    <u-icon
      @click="closeReplyMsgContainer"
      name="/static/images/new_ui/message/replyMessage/close_icon.png"
      size="20"
    ></u-icon>
  </view>
</template>

<script>
import {
  MESSAGE_TYPE,
  CUSTOM_EVENT_NAME,
  SESSION_MESSAGE_TYPE,
} from '@/EaseIM/constant';
import { CHAT_TYPE } from '../../../../EaseIM/constant';

export default {
  props: {
    checkedPopupMsgBody: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      MESSAGE_TYPE,
      CUSTOM_EVENT_NAME,
      SESSION_MESSAGE_TYPE,
      rootImageUrl: '/static/images/new_ui/message/replyMessage/',
    };
  },
  computed: {
    isSelf() {
      const checkedPopupMsgBody = this.checkedPopupMsgBody;
      return (
        checkedPopupMsgBody.from ===
        this.$store.state.LoginStore.loginUserBaseInfos.loginUserId
      );
    },
    friendUserInfoCollection() {
      return this.$store.getters.friendUserInfoCollection;
    },
    groupMembersProfileData() {
      return this.$store.getters.groupMembersProfile;
    },
    previewText() {
      if (this.checkedPopupMsgBody?.type === MESSAGE_TYPE.TEXT) {
        return this.checkedPopupMsgBody?.msg || '';
      } else if (this.checkedPopupMsgBody?.type === MESSAGE_TYPE.FILE) {
        return '[文件] ' + this.checkedPopupMsgBody?.filename || '[文件]';
      } else if (
        this.checkedPopupMsgBody?.type === MESSAGE_TYPE.CUSTOM &&
        this.checkedPopupMsgBody.customEvent === CUSTOM_EVENT_NAME.USER_CARD
      ) {
        return '[个人名片]';
      } else {
        return SESSION_MESSAGE_TYPE[this.checkedPopupMsgBody?.type] || '';
      }
    },
    previewFileIcon() {
      if (this.checkedPopupMsgBody?.type === MESSAGE_TYPE.IMAGE) {
        //图片如果包含缩略图字段则优先展示缩略图作为icon预览
        if (this.checkedPopupMsgBody?.thumb) {
          return this.checkedPopupMsgBody.thumb;
        }
        return this.rootImageUrl + 'reply_msg_img.png';
      }
      if (this.checkedPopupMsgBody?.type === MESSAGE_TYPE.AUDIO) {
        return this.rootImageUrl + 'reply_msg_audio.png';
      }
      if (this.checkedPopupMsgBody?.type === MESSAGE_TYPE.VIDEO) {
        return this.rootImageUrl + 'reply_msg_video.png';
      }
    },
    previewMsgFromNickname() {
      if (this.isSelf) {
        return '我';
      }
      if (this.checkedPopupMsgBody?.chatType === CHAT_TYPE.SINGLE_CHAT) {
        const userId = this.checkedPopupMsgBody.from;
        if (
          this.friendUserInfoCollection[userId] &&
          this.friendUserInfoCollection[userId]?.nickname
        ) {
          return this.friendUserInfoCollection[userId].nickname;
        } else {
          return userId;
        }
      }
      if (this.checkedPopupMsgBody?.chatType === CHAT_TYPE.GROUP_CHAT) {
        const groupId = this.checkedPopupMsgBody.to;
        const userId = this.checkedPopupMsgBody.from;
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
    //关闭消息引用框
    closeReplyMsgContainer() {
      this.$emit('onShowReplyMessageContainer');
    },
    //提取原始消息内容至待发送的引用参数内
    extractMessageBodyValue() {
      const { type, msg: msgContent, id: mid, from } = this.checkedPopupMsgBody;
      //引用消息必传参数
      let msgQuote = {
        msgID: '', //引用消息id
        msgPreview: '', //引用消息预览
        msgSender: '', //引用消息发送人
        msgType: '', //引用消息类型
      };
      msgQuote.msgID = mid;
      msgQuote.msgType = type;
      msgQuote.msgSender = this.previewMsgFromNickname;
      if (type === MESSAGE_TYPE.TEXT) {
        msgQuote.msgPreview = msgContent;
      } else if (
        type === MESSAGE_TYPE.CUSTOM &&
        this.checkedPopupMsgBody.customEvent === CUSTOM_EVENT_NAME.USER_CARD
      ) {
        msgQuote.msgPreview = '[个人名片]';
      } else {
        msgQuote.msgPreview = SESSION_MESSAGE_TYPE[type];
      }
      console.log('msgQuote', msgQuote);
      return msgQuote;
    },
  },
};
</script>

<style scoped>
.reply_msg_container {
  width: 100%;
  min-height: 52px;
  box-sizing: border-box;
  background: #f1f2f3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
}
.reply_msg_content_box {
  width: 100%;
  display: flex;
  flex-direction: row;
}
.reply_msg_content_box_left {
  flex: 1;
}

.reply_msg_target {
  display: flex;
  flex-direction: row;
  align-items: center;
  /* Nickname */
  height: 16px;

  /* 简体中文/标签/小 */
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  /* identical to box height, or 133% */

  /* Neutral Special/5 */
  color: #5270ad;

  /* Inside auto layout */
  flex: none;
  order: 3;
  flex-grow: 0;
}
.reply_msg_target_name {
  font-weight: bold;
}
.reply_msg_content {
  /* 感恩陪伴 */
  height: 16px;

  /* 简体中文/文本/小 */
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
  order: 0;
  flex-grow: 0;
}
.reply_msg_audio_length {
  margin-left: 4px;
}
</style>
