<template>
  <view>
    <view class="tips"
      >本应用仅用于环信产品功能开发测试，请勿用于非法用途。任何涉及转账、汇款、裸聊、网恋、网购退款、投资理财等统统都是诈骗，请勿相信！</view
    >
    <scroll-view
      id="commentContainer"
      class="message_list_container"
      scroll-y="true"
      refresher-enabled="true"
      :refresher-triggered="isRefresher"
      :refresher-threshold="100"
      :scroll-top="commentScrollTop"
      refresher-background="#fafafa"
      @refresherpulling="onPulling"
      @refresherrefresh="onRefresh"
      @refresherrestore="onRestore"
      @refresherabort="onAbort"
      :style="{
        height: `${msgWindowHeight - inputBarHeight - keyboardHeight}px`,
      }"
      :scroll-with-animation="true"
      @click="closeModal"
    >
      <view id="commentContent">
        <view
          @longpress="aleartReportMsg(msgBody)"
          class="message"
          v-for="(msgBody, index) in messageList"
          :key="msgBody.id + index + ''"
          :id="msgBody.id"
        >
          <!-- 灰色通知类消息 -->
          <template v-if="msgBody.type === 'inform'">
            <view class="gray_inform">
              <text class="gray_inform_text">{{ msgBody.msg }}</text>
            </view>
          </template>
          <!-- 普通消息体 -->
          <template v-else>
            <view class="main" :class="isSelf(msgBody) ? 'self' : ''">
              <view class="user">
                <!-- yourname：就是消息的 from -->
                <text v-if="!isSelf(msgBody)" class="user-text">{{
                  showMessageListNickname(msgBody.from) +
                  ' ' +
                  handleTime(msgBody)
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
                        msglistState.defaultAvatar
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
          </template>
        </view>
      </view>
    </scroll-view>
  </view>
  <ReportMessage ref="reportMsgComp" />
</template>

<script setup>
import {
  ref,
  reactive,
  computed,
  watch,
  inject,
  nextTick,
  getCurrentInstance,
} from 'vue';
import { onLoad, onUnload, onShow } from '@dcloudio/uni-app';
/* EaseIM */
import parseEmoji from '@/EaseIM/utils/paseEmoji';
import { CHAT_TYPE, MESSAGE_TYPE } from '@/EaseIM/constant';
/* stores */
import { useLoginStore } from '@/stores/login';
import { useMessageStore } from '@/stores/message';
import { useContactsStore } from '@/stores/contacts';
/* utils */
import dateFormater from '@/utils/dateFormater';
/* im apis */
import { emMessages } from '@/EaseIM/imApis';
/* components */
import FileMsg from './type/file';
import AudioMsg from './type/audio/audio';
import ReportMessage from './type/reportMessage';
//视图高
let msgWindowHeight = ref(0);
//输入框高度
const inputBarHeight = 140;
//存储键盘高度
let keyboardHeight = ref(0);
const listenerKeyboardHeight = (e) => {
  if (e.height > 0) {
    keyboardHeight.value = e.height;
    scrollToBottom();
  } else {
    keyboardHeight.value = 0;
    scrollToBottom();
  }
};
onLoad(async () => {
  const { windowHeight } = await uni.getSystemInfo();
  msgWindowHeight.value = windowHeight;
  //监听键盘抬起事件
  uni.onKeyboardHeightChange &&
    uni.onKeyboardHeightChange(listenerKeyboardHeight);
});
onUnload(() => {
  uni.offKeyboardHeightChange &&
    uni.offKeyboardHeightChange(listenerKeyboardHeight);
});
const commentScrollTop = ref(0);
//滚动到底部
const instance = getCurrentInstance();
const scrollToBottom = () => {
  console.log('>>>>>>开始滚动');
  nextTick(() => {
    let query = uni.createSelectorQuery().in(instance);
    query.select('#commentContainer').boundingClientRect();
    query.select('#commentContent').boundingClientRect();
    query.exec((res) => {
      //如果子元素高度大于父元素高度(显示高度)
      console.log(
        'res[1].height',
        res[1].height,
        'res[0].height',
        res[0].height
      );
      if (res[1].height > res[0].height) {
        //计算出二者差值就是需要滚动的距离
        commentScrollTop.value = res[1].height - res[0].height;
      } else if (res[1].height == res[0].height) {
        commentScrollTop.value = res[1].height + 500;
      } else if (res[1].height < res[0].height) {
        commentScrollTop.value = res[1].height + 500;
      }
    });
  });
};
/*
 * 如果你也遇到了scroll-view 下拉不能重置状态推荐看下这个文章
 * https://ask.dcloud.net.cn/article/id-37181
 */
/* 下拉刷新逻辑 */
let isRefresher = ref(false);
let _freshing = ref(false); //刷新中状态
const onPulling = (e) => {
  console.log('onpulling', e);
};
const onRefresh = () => {
  if (_freshing.value) return;
  _freshing.value = true;
  if (!isRefresher.value) isRefresher.value = true;
  setTimeout(() => {
    getMoreHistoryMessages();
    isRefresher.value = false;
    _freshing.value = false;
  }, 3000);
};
const onRestore = () => {
  console.log('onRestore');
};
const onAbort = () => {
  console.log('onAbort');
  isRefresher.value = false;
  _freshing.value = false;
};

/* emit */
const $emits = defineEmits(['closeAllModal']);
const msglistState = reactive({
  isIPX: false,
  toView: 0,
  //漫游当前游标
  view: 'wrap',

  defaultAvatar: '/static/images/theme2x.png',
  defaultGroupAvatar: '/static/images/groupTheme.png',
});
const injectTargetId = inject('targetId');
const injectChatType = inject('chatType');
/* 消息相关逻辑处理 */
const { fetchHistoryMessagesFromServer } = emMessages();
//该用户当前的聊天记录
const messageStore = useMessageStore();
const messageList = computed(() => {
  return (
    messageStore.messageCollection[injectTargetId.value] ||
    getMoreHistoryMessages() ||
    []
  );
});
//获取更多历史消息
const getMoreHistoryMessages = async () => {
  const sourceMessage =
    messageStore.messageCollection[injectTargetId.value] || [];
  const cursorMsgId = (sourceMessage.length && sourceMessage[0]?.id) || -1;
  const params = {
    targetId: injectTargetId.value,
    chatType: injectChatType.value,
    cursor: cursorMsgId,
  };
  try {
    let res = await fetchHistoryMessagesFromServer(params);
    if (res.messages.length) {
      messageStore.fetchHistoryPushToMsgCollection(
        injectTargetId.value,
        res.messages.reverse()
      );
    } else {
      uni.showToast({ title: '暂无更多历史记录', icon: 'none' });
    }
    uni.stopPullDownRefresh();
  } catch (error) {
    uni.stopPullDownRefresh();
    uni.showToast('历史消息获取失败...');
    console.log('>>>>>返回失败', error);
  }
};
onShow(() => {
  scrollToBottom();
});
//监听消息内容改变，滚动列表
watch(
  messageList,
  () => {
    scrollToBottom();
  },
  {
    deep: true,
  }
);
//消息列表头像展示
const loginStore = useLoginStore();
const contactsStore = useContactsStore();
//登录用户属性
const myUserInfos = computed(() => {
  return loginStore.loginUserProfiles;
});
//好友属性
const friendUserInfoMap = computed(() => {
  return contactsStore.friendUserInfoMap;
});
//判消息来源是否为自己
const isSelf = computed(() => {
  return (item) => {
    return item.from === loginStore.loginUserBaseInfos.loginUserId;
  };
});

const showMessageListAvatar = computed(() => {
  const friendMap = friendUserInfoMap.value;
  return (item) => {
    if (item.from !== loginStore.loginUserBaseInfos.loginUserId) {
      return friendMap.get(item.from)?.avatarurl || msglistState.defaultAvatar;
    } else {
      return myUserInfos.value?.avatarurl || msglistState.defaultAvatar;
    }
  };
});
//消息列表昵称显示
const showMessageListNickname = computed(() => {
  const friendMap = friendUserInfoMap.value;
  return (hxId) => {
    return friendMap.get(hxId)?.nickname || hxId;
  };
});
//处理时间显示
const handleTime = computed(() => {
  return (item) => {
    return dateFormater('MM/DD/HH:mm', item.time);
  };
});
//解析表情图片
const parseMsgEmoji = computed(() => {
  return (content) => {
    return parseEmoji(content);
  };
});

//预览图片方法
const previewImage = (url) => {
  uni.previewImage({
    urls: [url], // 需要预览的图片 http 链接列表
  });
};
//点击查看个人名片
const entryProfilePage = (userInfo) => {
  if (userInfo) {
    uni.navigateTo({
      url: `../profile/profile?otherProfile=${JSON.stringify(userInfo)}`,
    });
  }
};
const reportMsgComp = ref(null);
const aleartReportMsg = (msgBody) => {
  reportMsgComp.value.actionAleartReportMsg({ ...msgBody });
};
const closeModal = () => {
  $emits('closeAllModal');
};
</script>

<style>
@import './index.css';
</style>
