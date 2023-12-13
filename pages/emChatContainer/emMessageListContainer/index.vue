<template>
  <view
    :class="['message_list_item', !isSelf(msgBody) || 'message_list_item_mine']"
  >
    <!--user avatar -->
    <view class="message_list_item_avatar">
      <u-avatar src="/static/images/new_ui/defaultAvatar.png" :size="28" />
    </view>

    <view class="message_list_item_content">
      <text class="message_list_item_content_nickname">{{ msgBody.from }}</text>
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
    </view>
    <!-- <text class="message_list_item_content_time">{{
            messageTime(msgBody.time)
          }}</text> -->
  </view>
</template>

<script>
import { MESSAGE_TYPE, CUSTOM_EVENT_NAME } from '@/EaseIM/constant';
import TextMsgItem from './messagesItem/textMsgItem';
import ImageMsgItem from './messagesItem/imageMsgItem';
import AudioMsgItem from './messagesItem/audioMsgItem';
import FileMsgItem from './messagesItem/fileMsgItem';
import UserCardMsgItem from './messagesItem/userCardItem';
export default {
  inject: ['targetId', 'chatType'],
  props: {
    msgBody: {
      type: Object,
      default: () => ({}),
      required: true,
    },
  },
  components: {
    TextMsgItem,
    ImageMsgItem,
    AudioMsgItem,
    FileMsgItem,
    UserCardMsgItem,
  },
  data() {
    return {
      MESSAGE_TYPE,
      CUSTOM_EVENT_NAME,
      playAudioMid: '',
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
    messageTime() {
      return (time) => {
        return this.$u.timeFrom(time);
      };
    },
  },
  methods: {
    onClickPlayAudio(mid) {
      this.playAudioMid = mid;
      console.log('mid', mid);
      console.log('++++++++');
    },
  },
};
</script>

<style scoped>
@import './index.css';
</style>
