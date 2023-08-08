<template></template>

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
/* emit */
const $emits = defineEmits(['closeAllModal']);
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
const closeModal = () => {
  console.log('>>>>>1111111111');
  $emits('closeAllModal');
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
