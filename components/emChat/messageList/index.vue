<template>
  <view
    scroll-y="true"
    :class="view + ' wrap ' + (isIPX ? 'scroll_view_X' : '')"
    upper-threshold="-50"
    :scroll-into-view="toView"
  >
    <view class="tips"
      >本应用仅用于环信产品功能开发测试，请勿用于非法用途。任何涉及转账、汇款、裸聊、网恋、网购退款、投资理财等统统都是诈骗，请勿相信！</view
    >
    <!-- 消息列表 -->
    <view
      @longtap="actionAleartReportMsg(msgBody)"
      class="message"
      v-for="(msgBody, index) in messageList"
      :key="msgBody.id + index"
      :id="msgBody.id"
    >
      <!-- 消息体 -->
      <view class="main" :class="isSelf(msgBody) ? 'self' : ''">
        <view class="user">
          <!-- yourname：就是消息的 from -->
          <text v-if="!isSelf(msgBody)" class="user-text">{{
            showMessageListNickname(msgBody.from) + ' ' + handleTime(msgBody)
          }}</text>
        </view>
        <image class="avatar" :src="showMessageListAvatar(msgBody)" />
        <view class="msg">
          <image
            v-if="isSelf(msgBody)"
            src="/static/images/poprightarrow2x.png"
            class="msg_poprightarrow"
          />
          <image
            v-if="!isSelf(msgBody)"
            src="/static/images/popleftarrow2x.png"
            class="msg_popleftarrow"
          />
          <!-- 文本类型消息 -->
          <view v-if="msgBody.type === MESSAGE_TYPE.TEXT">
            <view
              class="template"
              v-for="(d_item, d_index) in parseMsgEmoji(msgBody.msg)"
              :key="d_index"
            >
              <text
                :data-msg="msgBody"
                v-if="d_item.type == MESSAGE_TYPE.TEXT"
                class="msg-text"
                style="float: left"
                selectable="true"
                >{{ d_item.data }}</text
              >

              <image
                v-if="d_item.type == MESSAGE_TYPE.EMOJI"
                class="avatar"
                :src="'/static/images/faces/' + d_item.data"
                style="
                  width: 25px;
                  height: 25px;
                  margin: 0 0 2px 0;
                  float: left;
                "
              />
            </view>
          </view>
          <!-- 文件类型消息 -->
          <file-msg
            v-if="msgBody.type === MESSAGE_TYPE.FILE"
            :msg="msgBody"
          ></file-msg>
          <!-- 语音片段类型消息 -->
          <audio-msg
            v-if="msgBody.type === MESSAGE_TYPE.AUDIO"
            :msg="msgBody"
          ></audio-msg>
          <!-- 图片以及视频类型消息 -->
          <view
            v-if="
              msgBody.type == MESSAGE_TYPE.IMAGE ||
              msgBody.type == MESSAGE_TYPE.VIDEO
            "
          >
            <image
              v-if="msgBody.type == MESSAGE_TYPE.IMAGE"
              class="avatar"
              :src="msgBody.url"
              style="width: 90px; height: 120px; margin: 2px auto"
              mode="aspectFit"
              @tap="previewImage(msgBody.url)"
            />
            <video
              v-if="msgBody.type == MESSAGE_TYPE.VIDEO"
              :src="msgBody.url"
              controls
              style="width: 300rpx"
            />
          </view>
          <!-- 自定义类型消息 -->
          <view
            v-if="
              msgBody.type == MESSAGE_TYPE.CUSTOM &&
              msgBody.customEvent === 'userCard'
            "
            @click="entryProfilePage(msgBody.customExts)"
          >
            <view class="usercard_mian">
              <image
                :src="
                  msgBody.customExts.avatarurl ||
                  msgBody.customExts.avatar ||
                  defaultAvatar
                "
              />
              <text class="name">{{
                msgBody.customExts.nickname || msgBody.customExts.uid
              }}</text>
            </view>
            <!-- <u-divider :use-slot="false" /> -->
            <text>[个人名片]</text>
          </view>
        </view>
      </view>
    </view>
    <report-message ref="reportComp" />
  </view>
</template>

<script>
import { CHAT_TYPE, MESSAGE_TYPE } from '@/EaseIM/constant';
/* im apis */
import parseEmoji from '@/EaseIM/utils/paseEmoji';
import { emMessages } from '@/EaseIM/emApis';
const { reportMessages, fetchHistoryMessagesFromServer } = emMessages();
let LIST_STATUS = {
  SHORT: 'scroll_view_change',
  NORMAL: 'scroll_view',
};
/* components */
import AudioMsg from './type/audio/audio';
import FileMsg from './type/file';
import ReportMessage from './components/reportMessage';
export default {
  inject: ['targetId', 'chatType'],
  data() {
    return {
      MESSAGE_TYPE,
      view: LIST_STATUS.NORMAL,
      toView: '',
      chatMsg: [],
      __visibility__: false,
      isIPX: false,
      defaultAvatar: '/static/images/theme2x.png',
      defaultGroupAvatar: '/static/images/groupTheme.png',
    };
  },
  components: {
    AudioMsg,
    FileMsg,
    ReportMessage,
  },
  mounted() {
    if (!this.messageList || !this.messageList?.length) {
      console.log('获取漫游列表');
      this.getMoreHistoryMessages();
    }
    this.onPullDownRefresh = uni.$on('onPullDownRefresh', () => {
      this.getMoreHistoryMessages();
    });
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
    /* inject */
    ItargetId() {
      return this.targetId();
    },
    IchatType() {
      return this.chatType();
    },
    //消息列表头像展示
    showMessageListAvatar() {
      const friendUserInfoMap = getApp().globalData.friendUserInfoMap;
      const myUserInfos = getApp().globalData.userInfoFromServer;
      return (item) => {
        if (!item.style) {
          if (
            friendUserInfoMap.has(item.username) &&
            friendUserInfoMap.get(item.username)?.avatarurl
          ) {
            return friendUserInfoMap.get(item.username).avatarurl;
          } else {
            return this.defaultAvatar;
          }
        } else {
          if (myUserInfos?.avatarurl) {
            return myUserInfos.avatarurl;
          } else {
            return this.defaultAvatar;
          }
        }
      };
    },
    //消息列表昵称显示
    showMessageListNickname() {
      const friendUserInfoMap = getApp().globalData.friendUserInfoMap;
      return (hxId) => {
        if (
          friendUserInfoMap.has(hxId) &&
          friendUserInfoMap.get(hxId)?.nickname
        ) {
          return friendUserInfoMap.get(hxId).nickname;
        } else {
          return hxId;
        }
      };
    },
    //处理时间显示
    handleTime() {
      return (item) => {
        return this.$u.timeFormat(item.time, 'mm/dd/hh:MM');
      };
    },
    parseMsgEmoji() {
      return (content) => {
        return parseEmoji(content);
      };
    },
  },
  watch: {
    messageList() {
      this.scrollToBottom();
    },
  },
  methods: {
    //获取更多历史消息
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
        uni.stopPullDownRefresh();
      } catch (error) {
        console.log('>>>>>getHistroyMessageListFromServer error', error);
        uni.stopPullDownRefresh();
        uni.showToast({ title: '历史消息获取失败...', icon: 'none' });
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        console.log('>>>>>执行滚动');
        uni.pageScrollTo({
          scrollTop: 10000000,
          duration: 300,
          fail: (e) => {
            console.log('滚失败了', e);
          },
        });
      });
    },
    //预览图片
    previewImage(url) {
      uni.previewImage({
        urls: [url], // 需要预览的图片 http 链接列表
      });
    },
    //执行举报
    actionAleartReportMsg(msgBody) {
      console.log('>>>>>>弹出举报', msgBody);
      this.$refs.reportComp.openReportEntry(msgBody);
    },
    //点击查看个人名片
    entryProfilePage(userInfo) {
      if (userInfo) {
        uni.navigateTo({
          url: `../profile/profile?otherProfile=${JSON.stringify(userInfo)}`,
        });
      }
    },
  },
  beforeDestroy() {
    uni.$off('onPullDownRefresh');
  },
};
</script>
<style>
@import './index.css';
</style>
