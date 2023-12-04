<template>
  <view class="message_container">
    <u-list
      @scrolltoupper="scrolltoupper"
      upperThreshold="50"
      lowerThreshold="0"
      :scrollIntoView="scrollIntoViewId"
    >
      <u-loadmore :status="status" />
      <u-list-item
        v-for="(msgBody, index) in messageList"
        :id="'msg' + msgBody.id"
        :key="msgBody.id"
      >
        <view
          :class="[
            'message_list_item',
            !isSelf(msgBody) || 'message_list_item_mine',
          ]"
        >
          <!--user avatar -->
          <view class="message_list_item_avatar">
            <u-avatar
              src="/static/images/new_ui/defaultAvatar.png"
              :size="28"
            />
          </view>

          <view class="message_list_item_content">
            <text class="message_list_item_content_nickname">{{
              msgBody.from
            }}</text>
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
          </view>
          <!-- <text class="message_list_item_content_time">{{
            messageTime(msgBody.time)
          }}</text> -->
        </view>
      </u-list-item>
    </u-list>
  </view>
</template>

<script>
import { MESSAGE_TYPE } from '@/EaseIM/constant';
import TextMsgItem from './messagesItem/textMsgItem';
import ImageMsgItem from './messagesItem/imageMsgItem';
import AudioMsgItem from './messagesItem/audioMsgItem';
import FileMsgItem from './messagesItem/fileMsgItem';
export default {
  inject: ['targetId', 'chatType'],
  components: {
    TextMsgItem,
    ImageMsgItem,
    AudioMsgItem,
    FileMsgItem,
  },
  data() {
    return {
      MESSAGE_TYPE,
      scrollIntoViewId: '',
      status: 'loadmore',
      playAudioMid: '',
    };
  },
  mounted() {
    this.$nextTick(() => {
      //   this.scrollIntoViewId = 'item' + 50;
      //   console.log('this.scrollIntoViewId', this.scrollIntoViewId);
      if (this.messageList?.length) {
        const lastMessage = this.messageList[this.messageList.length - 1];
        this.scrollIntoViewId = 'msg' + lastMessage.id;
        console.log('>>>>>>set this.scrollIntoViewId', this.scrollIntoViewId);
      }
    });
    if (!this.messageList?.length) {
      this.getMoreHistoryMessages();
    }
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
    messageList() {
      return this.$store.state.MessageStore.messageCollection[this.ItargetId];
    },
    messageTime() {
      return (time) => {
        return this.$u.timeFrom(time);
      };
    },
    /* inject */
    ItargetId() {
      return this.targetId();
    },
    IchatType() {
      return this.chatType();
    },
  },
  methods: {
    scrolltoupper() {
      console.log('>>>>>>>触顶');
      this.status = 'loading';
      setTimeout(() => {
        this.status = 'nomore';
      }, 5000);
      //   if (this.page >= 3) this.status = 'nomore';
      //   else this.status = 'loading';
    },
    async getMoreHistoryMessages() {
      const params = {
        targetId: this.ItargetId,
        chatType: this.IchatType,
      };
      try {
        const res = await this.$store.dispatch(
          'fetchHistroyMessageListFromServer',
          params
        );
        console.log('>>>>>>res', res);
        if (res.isLast) {
          uni.showToast({ title: '暂无更多历史记录', icon: 'none' });
        }
      } catch (error) {
        console.log('>>>>>getHistroyMessageListFromServer error', error);
        uni.showToast({ title: '历史消息获取失败...', icon: 'none' });
      }
    },
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
