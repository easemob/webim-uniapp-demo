<template>
  <view
    scroll-y="true"
    :class="
      msglistState.view + ' wrap ' + (msglistState.isIPX ? 'scroll_view_X' : '')
    "
    upper-threshold="-50"
    :scroll-into-view="msglistState.toView"
  >
    <view>
      <!-- 弹出举报入口 -->
      <uni-popup ref="alertReport">
        <button @click="showSelectReportType">举报</button>
        <button @click="cannelReport">取消</button>
      </uni-popup>
      <!-- 展示举报选项 -->
      <uni-popup ref="selectReportType">
        <button
          v-for="(item, index) in msglistState.typeList"
          :key="index"
          @click="pickReportType(item)"
        >
          {{ item.text }}
        </button>
        <button type="warn" @click="hideSelectReportType">取消</button>
      </uni-popup>
      <!-- 填写举报原因 -->
      <uni-popup ref="inputReportReason" type="dialog">
        <uni-popup-dialog
          mode="input"
          title="举报原因"
          placeholder="请输入举报原因"
          @confirm="reportMsg"
          @cancel="msglistState.reason = ''"
        >
          <uni-easyinput
            type="textarea"
            v-model="msglistState.reason"
            placeholder="请填写举报内容"
            :maxlength="300"
          ></uni-easyinput>
        </uni-popup-dialog>
      </uni-popup>
    </view>
    <view class="tips"
      >本应用仅用于环信产品功能开发测试，请勿用于非法用途。任何涉及转账、汇款、裸聊、网恋、网购退款、投资理财等统统都是诈骗，请勿相信！</view
    >
    <view
      @longtap="actionAleartReportMsg(msgBody)"
      class="message"
      v-for="(msgBody, index) in messageList"
      :key="msgBody.id + index + ''"
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
    </view>
  </view>
</template>

<script setup>
import {
  ref,
  reactive,
  computed,
  watch,
  onMounted,
  inject,
  nextTick,
} from 'vue';
import { onPullDownRefresh, onNavigationBarButtonTap } from '@dcloudio/uni-app';
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
const msglistState = reactive({
  isIPX: false,
  toView: 0,
  //漫游当前游标
  view: 'wrap',
  title: '消息举报',
  list: [
    {
      text: '举报',
    },
  ],
  rptMsgId: '', // 举报消息id
  rptType: '', // 举报类型
  reason: '',
  typeList: [
    {
      text: '涉政',
    },
    {
      text: '涉黄',
    },
    {
      text: '广告',
    },
    {
      text: '辱骂',
    },
    {
      text: '暴恐',
    },
    {
      text: '违禁',
    },
  ],
  defaultAvatar: '/static/images/theme2x.png',
  defaultGroupAvatar: '/static/images/groupTheme.png',
});
const injectTargetId = inject('targetId');
const injectChatType = inject('chatType');
/* 消息相关逻辑处理 */
const { reportMessages, fetchHistoryMessagesFromServer } = emMessages();
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
onMounted(() => {
  nextTick(() => {
    uni.pageScrollTo({
      scrollTop: 100000,
      duration: 50,
    });
  });
});
//监听消息内容改变，滚动列表
watch(
  messageList,
  () => {
    nextTick(() => {
      uni.pageScrollTo({
        scrollTop: 100000,
        duration: 100,
      });
    });
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

/* 举报消息 */
//弹出举报
const alertReport = ref(null);
const actionAleartReportMsg = (item) => {
  if (item.style !== 'self') {
    alertReport.value.open('bottom');
    msglistState.showRpt = true;
    msglistState.rptMsgId = item.id;
  }
};
//取消举报
const cannelReport = () => {
  alertReport.value.close();
};

//选择举报类型
const selectReportType = ref(null);
//展示举报类型面板
const showSelectReportType = () => {
  alertReport.value.close();
  selectReportType.value.open('bottom');
};
const pickReportType = (item) => {
  msglistState.rptType = item.text;
  hideSelectReportType();
  actionAleartReportReason(item);
};
const hideSelectReportType = () => {
  selectReportType.value.close();
};
//填写举报原因
const inputReportReason = ref(null);
const actionAleartReportReason = (item) => {
  inputReportReason.value.open();
};

const reportMsg = async () => {
  if (msglistState.reason === '') {
    uni.showToast({ title: '请填写举报原因', icon: 'none' });
    return;
  }
  const reportParams = {
    reportType: msglistState.rptType,
    reportReason: msglistState.reason,
    messageId: msglistState.rptMsgId,
  };
  try {
    await reportMessages({ ...reportParams });
    uni.showToast({ title: '举报成功', icon: 'none' });
  } catch (error) {
    console.log('>>>>举报失败', error);
    uni.showToast({ title: '举报失败', icon: 'none' });
  } finally {
    msglistState.reason = '';
    msglistState.rptType = '';
    msglistState.rptMsgId = '';
  }
};
onPullDownRefresh(() => {
  getMoreHistoryMessages();
  console.log('>>>>>开始了下拉页面');
});
</script>

<style scoped>
@import './index.css';
</style>
