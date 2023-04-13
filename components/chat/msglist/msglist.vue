<template>
  <view
    scroll-y="true"
    :class="
      msglistState.view + ' wrap ' + (msglistState.isIPX ? 'scroll_view_X' : '')
    "
    @tap="onTap"
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
      @longtap="actionAleartReportMsg(item)"
      class="message"
      v-for="item in msglistState.chatMsg"
      :key="item.mid"
      :id="item.mid"
    >
      <!-- <view class="time">
				<text class="time-text">{{ item.time }}</text>
      </view>-->
      <view class="main" :class="item.style">
        <view class="user">
          <!-- yourname：就是消息的 from -->
          <text v-if="!item.style" class="user-text">{{
            showMessageListNickname(item.yourname) + ' ' + handleTime(item)
          }}</text>
        </view>
        <image class="avatar" :src="showMessageListAvatar(item)" />
        <view class="msg">
          <image
            class="err"
            :class="item.style == 'self' && item.isFail ? 'show' : 'hide'"
            src="/static/images/msgerr.png"
          />

          <image
            v-if="item.style == 'self'"
            src="/static/images/poprightarrow2x.png"
            class="msg_poprightarrow"
          />
          <image
            v-if="item.style == ''"
            src="/static/images/popleftarrow2x.png"
            class="msg_popleftarrow"
          />
          <view
            v-if="
              item.msg.type == msgtype.IMAGE || item.msg.type == msgtype.VIDEO
            "
          >
            <image
              v-if="item.msg.type == msgtype.IMAGE"
              class="avatar"
              :src="item.msg.data"
              style="width: 90px; height: 120px; margin: 2px auto"
              mode="aspectFit"
              @tap="previewImage"
              :data-url="item.msg.data"
            />
            <video
              v-if="item.msg.type == msgtype.VIDEO"
              :src="item.msg.data"
              controls
              style="width: 300rpx"
            />
          </view>
          <audio-msg
            v-if="item.msg.type == msgtype.AUDIO"
            :msg="item"
          ></audio-msg>
          <file-msg v-if="item.msg.type == msgtype.FILE" :msg="item"></file-msg>
          <view
            v-else-if="
              item.msg.type == msgtype.TEXT || item.msg.type == msgtype.EMOJI
            "
          >
            <view
              class="template"
              v-for="(d_item, d_index) in item.msg.data"
              :key="d_index"
            >
              <text
                :data-msg="item"
                v-if="d_item.type == msgtype.TEXT"
                class="msg-text"
                style="float: left"
                selectable="true"
                >{{ d_item.data }}</text
              >

              <image
                v-if="d_item.type == msgtype.EMOJI"
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
          <!-- 个人名片 -->
          <view
            v-else-if="
              item.msg.type == msgtype.CUSTOM && item.customEvent === 'userCard'
            "
            @click="to_profile_page(item.msg.data)"
          >
            <view class="usercard_mian">
              <image
                :src="
                  item.msg.data.avatarurl ||
                  item.msg.data.avatar ||
                  defaultAvatar
                "
              />
              <text class="name">{{
                item.msg.data.nickname || item.msg.data.uid
              }}</text>
            </view>
            <!-- <u-divider :use-slot="false" /> -->
            <text>[个人名片]</text>
          </view>
        </view>
      </view>
    </view>
  </view>
  <!-- <view style="height: 1px;"></view> -->
</template>

<script setup>
import { reactive, ref, computed, onMounted, onUnmounted } from 'vue';
import msgStorage from '../msgstorage';
// let msgStorage = require("../msgstorage");
import disp from '@/utils/broadcast';
import dateFormater from '@/utils/dateFormater';
// let disp = require('../../../utils/broadcast');
import msgtype from '@/components/chat/msgtype';
import audioMsg from './type/audio/audio';
import fileMsg from './type/file';
let LIST_STATUS = {
  SHORT: 'scroll_view_change',
  NORMAL: 'scroll_view',
};
let page = 0;
let Index = 0;
let curMsgMid = '';
let isFail = false;

const WebIM = uni.WebIM;
/* props */
const props = defineProps({
  chatParams: {
    type: Object,
    default: () => ({}),
    required: true,
  },
});
const { chatParams } = props;
console.log('msglist', chatParams);
/* emits */
const $emit = defineEmits(['msglistTap']);
const msglistState = reactive({
  view: LIST_STATUS.NORMAL,
  toView: '',
  chatMsg: [],
  __visibility__: false,
  isIPX: false,
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
  usernameObj: null,
});
//做初始参数设置
msglistState.__visibility__ = true;
page = 0;
Index = 0;

onUnmounted(() => {
  msglistState.__visibility__ = false;
  msgStorage.off('newChatMsg', dispMsg);
});

onMounted(() => {
  if (getApp().globalData.isIPX) {
    msglistState.isIPX = true;
  }
  //根据原有uni demo 处理似乎支付宝小程序有参数传递问题，因此针对该平台单独取传递的参数
  if (uni.getSystemInfoSync().uniPlatform === 'mp-alipay') {
    msglistState.usernameObj = Object.assign({}, uni.username);
  } else {
    msglistState.usernameObj = Object.assign({}, chatParams);
  }
  const usernameObj = msglistState.usernameObj;
  console.log('usernameObj', usernameObj);
  let myUsername = uni.getStorageSync('myUsername');
  let sessionKey = usernameObj.groupId
    ? usernameObj.groupId + myUsername
    : usernameObj.your + myUsername;
  let chatMsg = uni.getStorageSync(sessionKey) || [];
  renderMsg(null, null, chatMsg, sessionKey);
  uni.setStorageSync(sessionKey, null);
  disp.on('em.error.sendMsgErr', function (err) {
    // curMsgMid = err.data.mid;
    isFail = true;
    // return;
    console.log('发送失败了');
    return;
    let msgList = me.chatMsg;
    msgList.map((item) => {
      if (
        item.mid.substring(item.mid.length - 10) ==
        curMsgMid.substring(curMsgMid.length - 10)
      ) {
        item.msg.data[0].isFail = true;
        item.isFail = true;
        me.setData({
          chatMsg: msgList,
        });
      }
    });

    // if (me.curChatMsg[0].mid == curMsgMid) {
    //   me.curChatMsg[0].msg.data[0].isShow = false;
    //   me.curChatMsg[0].isShow = false;
    // }

    uni.setStorageSync('rendered_' + sessionKey, msgList);
  });
  msgStorage.on('newChatMsg', dispMsg);
});
/* computed */
//消息列表头像展示
const showMessageListAvatar = computed(() => {
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
        return msglistState.defaultAvatar;
      }
    } else {
      if (myUserInfos?.avatarurl) {
        return myUserInfos.avatarurl;
      } else {
        return msglistState.defaultAvatar;
      }
    }
  };
});
//消息列表昵称显示
const showMessageListNickname = computed(() => {
  const friendUserInfoMap = getApp().globalData.friendUserInfoMap;
  return (hxId) => {
    if (friendUserInfoMap.has(hxId) && friendUserInfoMap.get(hxId)?.nickname) {
      return friendUserInfoMap.get(hxId).nickname;
    } else {
      return hxId;
    }
  };
});
//处理时间显示
const handleTime = computed(() => {
  return (item) => {
    return dateFormater('MM/DD/HH:mm', item.time);
  };
});

const normalScroll = () => {
  msglistState.view = LIST_STATUS.NORMAL;
};
//TODO 待优化
//此处用到了发布订阅默认去订阅，msgstorage 文件中 发布的newChatMsg 事件从而取到了存储后的消息list
let curChatMsgList = null;
const dispMsg = (renderableMsg, type, curChatMsg, sesskey) => {
  const usernameObj = msglistState.usernameObj;
  let myUsername = uni.getStorageSync('myUsername');
  let sessionKey = usernameObj.groupId
    ? usernameObj.groupId + myUsername
    : usernameObj.your + myUsername;
  curChatMsgList = curChatMsg;

  if (!msglistState.__visibility__) return; // 判断是否属于当前会话

  if (usernameObj.groupId) {
    // 群消息的 to 是 id，from 是 name
    if (
      renderableMsg.info.from == usernameObj.groupId ||
      renderableMsg.info.to == usernameObj.groupId
    ) {
      if (sesskey == sessionKey) {
        renderMsg(renderableMsg, type, curChatMsg, sessionKey, 'newMsg');
      }
    }
  } else if (
    renderableMsg.info.from == usernameObj.your ||
    renderableMsg.info.to == usernameObj.your
  ) {
    if (sesskey == sessionKey) {
      renderMsg(renderableMsg, type, curChatMsg, sessionKey, 'newMsg');
    }
  }
};
//消息渲染方法
const renderMsg = (renderableMsg, type, curChatMsg, sessionKey, isnew) => {
  console.log('curChatMsg, sessionKey, isnew', curChatMsg, sessionKey, isnew);
  let historyChatMsgs = uni.getStorageSync('rendered_' + sessionKey) || [];
  historyChatMsgs = historyChatMsgs.concat(curChatMsg);
  if (!historyChatMsgs.length) return;
  if (isnew == 'newMsg') {
    msglistState.chatMsg = msglistState.chatMsg.concat(curChatMsg);
    msglistState.toView = historyChatMsgs[historyChatMsgs.length - 1].mid;
  } else {
    msglistState.chatMsg = historyChatMsgs.slice(-10);
    msglistState.toView = historyChatMsgs[historyChatMsgs.length - 1].mid;
  }

  uni.setStorageSync('rendered_' + sessionKey, historyChatMsgs);
  let chatMsg = uni.getStorageSync(sessionKey) || [];
  chatMsg.map(function (item, index) {
    curChatMsg.map(function (item2, index2) {
      if (item2.mid == item.mid) {
        chatMsg.splice(index, 1);
      }
    });
  });
  uni.setStorageSync(sessionKey, chatMsg);
  Index = historyChatMsgs.slice(-10).length;
  // setTimeout 兼容支付宝小程序
  setTimeout(() => {
    uni.pageScrollTo({
      scrollTop: 5000,
      duration: 100,
      fail: (e) => {
        //console.log('滚失败了', e)
      },
    });
  }, 100);

  if (isFail) {
    renderFail(sessionKey);
  }
};
const renderFail = (sessionKey) => {
  let msgList = msglistState.chatMsg;
  msgList.map((item) => {
    if (
      item.mid.substring(item.mid.length - 10) ==
      curMsgMid.substring(curMsgMid.length - 10)
    ) {
      item.msg.data[0].isFail = true;
      item.isFail = true;
      msglistState.chatMsg = msgList;
    }
  });

  if (curChatMsgList[0].mid == curMsgMid) {
    curChatMsgList[0].msg.data[0].isShow = false;
    curChatMsgList[0].isShow = false;
  }

  uni.setStorageSync('rendered_' + sessionKey, msgList);
  isFail = false;
};
const onTap = () => {
  $emit('msglistTap', null, {
    bubbles: true,
  });
};

const shortScroll = () => {
  msglistState.view = LIST_STATUS.SHORT;
};

const previewImage = (event) => {
  var url = event.target.dataset.url;
  uni.previewImage({
    urls: [url], // 需要预览的图片 http 链接列表
  });
};
const getHistoryMsg = () => {
  let usernameObj = msglistState.usernameObj;
  let myUsername = uni.getStorageSync('myUsername');
  let sessionKey = usernameObj.groupId
    ? usernameObj.groupId + myUsername
    : usernameObj.your + myUsername;
  let historyChatMsgs = uni.getStorageSync('rendered_' + sessionKey) || [];
  if (Index < historyChatMsgs.length) {
    let timesMsgList = historyChatMsgs.slice(-Index - 10, -Index);
    msglistState.chatMsg = timesMsgList.concat(msglistState.chatMsg);
    msglistState.toView = timesMsgList[timesMsgList.length - 1].mid;
    Index += timesMsgList.length;
    if (timesMsgList.length == 10) {
      page++;
    }
    uni.stopPullDownRefresh();
  }
};
const to_profile_page = (userInfo) => {
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
    msglistState.rptMsgId = item.mid;
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
  console.log('>>>>>>输入举报内容', item);
  inputReportReason.value.open();
};
const reportMsg = () => {
  if (msglistState.reason === '') {
    uni.showToast({ title: '请填写举报原因', icon: 'none' });
    return;
  }
  WebIM.conn
    .reportMessage({
      reportType: msglistState.rptType, // 举报类型
      reportReason: msglistState.reason, // 举报原因。
      messageId: msglistState.rptMsgId, // 上报消息id
    })
    .then(() => {
      uni.showToast({ title: '举报成功', icon: 'none' });
    })
    .catch((e) => {
      console.log('>>>>举报失败', e);
      uni.showToast({ title: '举报失败', icon: 'none' });
    })
    .finally(() => {
      msglistState.reason = '';
      msglistState.rptType = '';
      msglistState.rptMsgId = '';
    });
};
defineExpose({
  normalScroll,
  getHistoryMsg,
  shortScroll,
});
</script>
<style>
@import './msglist.css';
</style>
