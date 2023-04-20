<template>
  <view>
    <view>
      <view class="search" v-if="conversationState.search_btn">
        <view @tap="openSearch">
          <icon type="search" size="12"></icon>
          <text>搜索</text>
        </view>
      </view>
    </view>
    <view class="search_input" v-if="conversationState.search_chats">
      <view>
        <icon type="search" size="12"></icon>
        <input
          placeholder="搜索"
          placeholder-style="color:#9B9B9B;line-height:21px;font-size:15px;"
          auto-focus
          confirm-type="search"
          type="text"
          @confirm="onSearch"
          @input="onInput"
          v-model="conversationState.input_code"
        />
        <icon
          type="clear"
          size="12"
          @tap.stop="clearInput"
          v-if="conversationState.show_clear"
        ></icon>
      </view>
      <text @tap="cancel">取消</text>
    </view>
    <!-- <view class="chat_list_wraper" > -->
    <scroll-view
      scroll-y="true"
      :class="
        'chat_list_wraper ' +
        (conversationState.gotop
          ? conversationState.isIPX
            ? 'goTopX'
            : 'goTop'
          : 'goback')
      "
      :style="
        'padding-bottom: ' + (conversationState.isIPX ? '270rpx' : '226rpx')
      "
    >
      <view
        v-for="(item, index) in conversationState.conversationList"
        :key="index"
        class="chat_list"
        :data-item="item"
        @tap.stop="del_chat"
      >
        <swipe-delete>
          <!-- 通知模块 -->
          <view
            class="tap_mask"
            @tap.stop="into_inform"
            :data-item="item"
            v-if="item.chatType == 'INFORM'"
          >
            <view class="list_box">
              <view class="list_left">
                <view class="list_pic">
                  <view
                    v-if="conversationState.unReadTotalNotNum > 0"
                    class="em-unread-spot2"
                    >{{ conversationState.unReadTotalNotNum }}</view
                  >
                  <image
                    :class="
                      conversationState.unReadTotalNotNum > 0 ? 'haveSpot' : ''
                    "
                    src="../../static/images/inform.png"
                  ></image>
                </view>
                <view class="list_text">
                  <text class="list_user"> 系统通知 </text>
                  <text class="list_word" v-if="item.chatType == 'INFORM'"
                    >申请通知来自：{{ item.info.from }}</text
                  >
                </view>
              </view>
              <view class="list_right">
                <text :data-username="item.username">{{
                  handleTime(item)
                }}</text>
              </view>
            </view>
          </view>

          <view
            class="tap_mask"
            @tap.stop="into_chatRoom"
            :data-item="JSON.stringify(item)"
            v-else
          >
            <!-- 消息列表 -->
            <view class="list_box">
              <view class="list_left" :data-username="item.username">
                <view class="list_pic">
                  <view
                    class="em-msgNum"
                    v-if="
                      item.unReadCount > 0 &&
                      !conversationState.pushConfigData.includes(
                        item.chatType === 'chat' ? item.username : item.info.to
                      )
                    "
                  >
                    {{ item.unReadCount > 99 ? '99+' : item.unReadCount }}</view
                  >

                  <image :src="showConversationAvatar(item)"></image>
                </view>
                <view class="list_text">
                  <text class="list_user">{{
                    showConversationName(item)
                  }}</text>
                  <text
                    class="list_word"
                    v-if="item.msg.type == msgtype.TEXT"
                    >{{ item.msg.data[0].data }}</text
                  >
                  <text class="list_word" v-if="item.msg.type == msgtype.IMAGE"
                    >[图片]</text
                  >
                  <text class="list_word" v-if="item.msg.type == msgtype.AUDIO"
                    >[语音]</text
                  >
                  <text class="list_word" v-if="item.msg.type == msgtype.FILE"
                    >[附件]</text
                  >
                  <text class="list_word" v-if="item.msg.type == msgtype.VIDEO"
                    >[视频]</text
                  >
                  <text
                    class="list_word"
                    v-if="item.msg.type == msgtype.CUSTOM"
                  >
                    <text v-if="item.customEvent === 'userCard'"
                      >[个人名片]</text
                    >
                  </text>
                </view>
              </view>
              <view class="list_right">
                <text :data-username="item.username">{{
                  handleTime(item)
                }}</text>
              </view>
            </view>
          </view>
        </swipe-delete>
      </view>
      <!-- </view> -->
    </scroll-view>
    <view
      v-if="
        conversationState.conversationList &&
        conversationState.conversationList.length == 0
      "
      class="chat_noChat"
    >
      <image class="ctbg" src="/static/images/ctbg.png"></image>
      暂无聊天消息
    </view>
    <!-- bug: margin-bottom 不生效 需要加一个空标签-->
    <view style="height: 1px"></view>

    <view
      class="mask"
      @tap="close_mask"
      v-if="conversationState.show_mask"
    ></view>

    <view :class="conversationState.isIPX ? 'chatRoom_tab_X' : 'chatRoom_tab'">
      <view class="tableBar">
        <view
          v-if="
            conversationState.unReadSpotNum > 0 ||
            conversationState.unReadSpotNum == '99+'
          "
          :class="
            'em-unread-spot ' +
            (conversationState.unReadSpotNum == '99+'
              ? 'em-unread-spot-litleFont'
              : '')
          "
          >{{
            conversationState.unReadSpotNum == '99+'
              ? conversationState.unReadSpotNum
              : conversationState.unReadSpotNum +
                conversationState.unReadTotalNotNum
          }}</view
        >
        <image
          :class="
            conversationState.unReadSpotNum > 0 ||
            conversationState.unReadSpotNum == '99+'
              ? 'haveSpot'
              : ''
          "
          src="/static/images/sessionhighlight2x.png"
        ></image>
        <text class="activeText">消息</text>
      </view>

      <view class="tableBar" @tap="tab_contacts">
        <image src="/static/images/comtacts2x.png"></image>
        <text>联系人</text>
      </view>

      <!-- <view class="tableBar" @tap="tab_notification">
        <view v-if="unReadTotalNotNum > 0" class="em-unread-spot">{{
          unReadTotalNotNum
        }}</view>
        <image
          :class="unReadTotalNotNum > 0 ? 'haveSpot' : ''"
          src="/static/images/notice.png"
        ></image>
        <text>通知</text>
      </view> -->

      <view class="tableBar" @tap="tab_setting">
        <image src="/static/images/setting2x.png"></image>
        <text>我的</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { onLoad, onShow, onUnload } from '@dcloudio/uni-app';
import swipeDelete from '@/components/swipedelete/swipedelete';
import msgtype from '@/components/chat/msgtype';
import dateFormater from '@/utils/dateFormater';
import disp from '@/utils/broadcast';
const WebIM = uni.WebIM;
let isfirstTime = true;
const conversationState = reactive({
  //       msgtype,
  search_btn: true,
  search_chats: false,
  show_mask: false,
  yourname: '',
  unReadSpotNum: 0,
  unReadNoticeNum: 0,
  messageNum: 0,
  unReadTotalNotNum: 0,
  conversationList: [],
  show_clear: false,
  member: '',
  isIPX: false,
  gotop: false,
  input_code: '',
  groupName: {},
  winSize: {},
  popButton: ['删除该聊天'],
  showPop: false,
  currentVal: '',
  pushConfigData: [],
  defaultAvatar: '/static/images/theme2x.png',
  defaultGroupAvatar: '/static/images/groupTheme.png',
});
onLoad(() => {
  disp.on('em.subscribe', onChatPageSubscribe);
  //监听解散群
  disp.on('em.invite.deleteGroup', onChatPageDeleteGroup);
  //监听未读消息数
  disp.on('em.unreadspot', onChatPageUnreadspot);
  //监听未读加群“通知”
  disp.on('em.invite.joingroup', onChatPageJoingroup);
  //监听好友删除
  disp.on('em.contacts.remove', onChatPageRemoveContacts);
  //监听好友关系解除
  disp.on('em.unsubscribed', onChatPageUnsubscribed);
  if (!uni.getStorageSync('listGroup')) {
    listGroups();
  }
  if (!uni.getStorageSync('member')) {
    getRoster();
  }

  readJoinedGroupName();
});
onShow(() => {
  uni.hideHomeButton && uni.hideHomeButton();
  setTimeout(() => {
    getLocalConversationlist();
  }, 100);
  conversationState.unReadMessageNum =
    getApp().globalData.unReadMessageNum > 99
      ? '99+'
      : getApp().globalData.unReadMessageNum;
  conversationState.messageNum = getApp().globalData.saveFriendList.length;
  conversationState.unReadNoticeNum =
    getApp().globalData.saveGroupInvitedList.length;
  conversationState.unReadTotalNotNum =
    getApp().globalData.saveFriendList.length +
    getApp().globalData.saveGroupInvitedList.length;
  if (getApp().globalData.isIPX) {
    conversationState.isIPX = true;
  }
});
const showConversationAvatar = computed(() => {
  const friendUserInfoMap = getApp().globalData.friendUserInfoMap;
  return (item) => {
    if (item.chatType === 'singleChat' || item.chatType === 'chat') {
      if (
        friendUserInfoMap.has(item.username) &&
        friendUserInfoMap.get(item.username)?.avatarurl
      ) {
        return friendUserInfoMap.get(item.username).avatarurl;
      } else {
        return conversationState.defaultAvatar;
      }
    } else if (
      item.chatType.toLowerCase() === 'groupchat' ||
      item.chatType === 'chatRoom'
    ) {
      return conversationState.defaultGroupAvatar;
    }
  };
});
const showConversationName = computed(() => {
  const friendUserInfoMap = getApp().globalData.friendUserInfoMap;
  return (item) => {
    if (item.chatType === 'singleChat' || item.chatType === 'chat') {
      if (
        friendUserInfoMap.has(item.username) &&
        friendUserInfoMap.get(item.username)?.nickname
      ) {
        return friendUserInfoMap.get(item.username).nickname;
      } else {
        return item.username;
      }
    } else if (
      item.chatType === msgtype.chatType.GROUP_CHAT ||
      item.chatType === msgtype.chatType.CHAT_ROOM
    ) {
      return item.groupName;
    }
  };
});
const handleTime = computed(() => {
  return (item) => {
    return dateFormater('MM/DD/HH:mm', item.time);
  };
});

const listGroups = () => {
  return uni.WebIM.conn.getGroup({
    limit: 50,
    success: function (res) {
      uni.setStorage({
        key: 'listGroup',
        data: res.data,
      });
      readJoinedGroupName();
      getLocalConversationlist();
    },
    error: function (err) {
      console.log(err);
    },
  });
};

const getRoster = async () => {
  const { data } = await WebIM.conn.getContacts();
  if (data.length) {
    uni.setStorage({
      key: 'member',
      data: [...data],
    });
    conversationState.member = [...data];
    //if(!systemReady){
    disp.fire('em.main.ready');
    //systemReady = true;
    //}
    getLocalConversationlist();
    conversationState.unReadSpotNum =
      getApp().globalData.unReadMessageNum > 99
        ? '99+'
        : getApp().globalData.unReadMessageNum;
  }
  console.log('>>>>好友列表获取成功', data);
};

const readJoinedGroupName = () => {
  const joinedGroupList = uni.getStorageSync('listGroup');
  const groupList = joinedGroupList?.data || joinedGroupList || [];
  let groupName = {};
  groupList.forEach((item) => {
    groupName[item.groupid] = item.groupname;
  });
  conversationState.groupName = groupName;
};
// 包含陌生人版本
const getLocalConversationlist = () => {
  const myName = uni.getStorageSync('myUsername');
  uni.getStorageInfo({
    success: (res) => {
      let storageKeys = res.keys;
      let newChatMsgKeys = [];
      let historyChatMsgKeys = [];
      let len = myName.length;
      storageKeys.forEach((item) => {
        if (item.slice(-len) == myName && item.indexOf('rendered_') == -1) {
          newChatMsgKeys.push(item);
        } else if (
          item.slice(-len) == myName &&
          item.indexOf('rendered_') > -1
        ) {
          historyChatMsgKeys.push(item);
        } else if (item === 'INFORM') {
          newChatMsgKeys.push(item);
        }
      });
      packageConversation(newChatMsgKeys, historyChatMsgKeys);
    },
  });
};
//组件会话列表方法
const packageConversation = (newChatMsgKeys, historyChatMsgKeys) => {
  const myName = uni.getStorageSync('myUsername');
  let conversationList = [];
  let lastChatMsg; //最后一条消息
  for (let i = historyChatMsgKeys.length; i > 0, i--; ) {
    let index = newChatMsgKeys.indexOf(historyChatMsgKeys[i].slice(9));
    if (index > -1) {
      let newChatMsgs = uni.getStorageSync(newChatMsgKeys[index]) || [];
      if (newChatMsgs.length) {
        lastChatMsg = newChatMsgs[newChatMsgs.length - 1];
        lastChatMsg.unReadCount = newChatMsgs.length;
        newChatMsgKeys.splice(index, 1);
      } else {
        let historyChatMsgs = uni.getStorageSync(historyChatMsgKeys[i]);
        if (historyChatMsgs.length) {
          lastChatMsg = historyChatMsgs[historyChatMsgs.length - 1];
        }
      }
    } else {
      let historyChatMsgs = uni.getStorageSync(historyChatMsgKeys[i]);
      if (historyChatMsgs.length) {
        lastChatMsg = historyChatMsgs[historyChatMsgs.length - 1];
      }
    }
    if (
      lastChatMsg.chatType == msgtype.chatType.GROUP_CHAT ||
      lastChatMsg.chatType == msgtype.chatType.CHAT_ROOM
    ) {
      lastChatMsg.groupName = conversationState.groupName[lastChatMsg.info.to];
    }
    lastChatMsg &&
      lastChatMsg.username != myName &&
      conversationList.push(lastChatMsg);
  }
  for (let i = newChatMsgKeys.length; i > 0, i--; ) {
    let newChatMsgs = uni.getStorageSync(newChatMsgKeys[i]) || [];
    if (newChatMsgs.length) {
      lastChatMsg = newChatMsgs[newChatMsgs.length - 1];
      lastChatMsg.unReadCount = newChatMsgs.length;
      if (
        lastChatMsg.chatType == msgtype.chatType.GROUP_CHAT ||
        lastChatMsg.chatType == msgtype.chatType.CHAT_ROOM
      ) {
        lastChatMsg.groupName =
          conversationState.groupName[lastChatMsg.info.to];
      }
      lastChatMsg.username != myName && conversationList.push(lastChatMsg);
    }
  }
  conversationList.sort((a, b) => {
    return b.time - a.time;
  });
  conversationState.conversationList = conversationList;
};
const openSearch = () => {
  conversationState.search_btn = false;
  conversationState.search_chats = true;
  conversationState.gotop = true;
};
const onSearch = (val) => {
  let searchValue = val.detail.value;
  var myName = uni.getStorageSync('myUsername');
  let serchList = [];
  let conversationList = [];
  uni.getStorageInfo({
    success: function (res) {
      let storageKeys = res.keys;
      let chatKeys = [];
      let len = myName.length;
      storageKeys.forEach((item) => {
        if (item.slice(-len) == myName) {
          chatKeys.push(item);
        }
      });
      chatKeys.forEach((item, index) => {
        if (item.indexOf(searchValue) != -1) {
          serchList.push(item);
        }
      });
      let lastChatMsg = '';
      serchList.forEach((item, index) => {
        let chatMsgs = uni.getStorageSync(item) || [];
        if (chatMsgs.length) {
          lastChatMsg = chatMsgs[chatMsgs.length - 1];
          conversationList.push(lastChatMsg);
        }
      });
      conversationState.conversationList = conversationList;
    },
  });
};
const cancel = () => {
  getLocalConversationlist();
  conversationState.search_btn = true;
  conversationState.search_chats = false;
  conversationState.unReadSpotNum =
    getApp().globalData.unReadMessageNum > 99
      ? '99+'
      : getApp().globalData.unReadMessageNum;
  conversationState.gotop = false;
};
const clearInput = () => {
  conversationState.input_code = '';
  conversationState.show_clear = false;
};
const onInput = (e) => {
  let inputValue = e.detail.value;
  if (inputValue) {
    conversationState.show_clear = true;
  } else {
    conversationState.show_clear = false;
  }
};
const tab_contacts = () => {
  uni.redirectTo({
    url: '../main/main?myName=' + uni.getStorageSync('myUsername'),
  });
};
const close_mask = () => {
  conversationState.search_btn = true;
  conversationState.search_chats = false;
  conversationState.show_mask = false;
};
const tab_setting = () => {
  uni.redirectTo({
    url: '../setting/setting',
  });
};
const tab_notification = () => {
  uni.redirectTo({
    url: '../notification/notification',
  });
};
const into_chatRoom = (event) => {
  let detail = JSON.parse(event.currentTarget.dataset.item);
  if (
    detail.chatType == msgtype.chatType.GROUP_CHAT ||
    detail.chatType == msgtype.chatType.CHAT_ROOM ||
    detail.groupName
  ) {
    into_groupChatRoom(detail);
  } else {
    into_singleChatRoom(detail);
  }
};
// 单聊
const into_singleChatRoom = (detail) => {
  var myName = uni.getStorageSync('myUsername');
  var nameList = {
    myName: myName,
    your: detail.username,
  };
  const friendUserInfoMap = getApp().globalData.friendUserInfoMap;
  if (
    friendUserInfoMap.has(nameList.your) &&
    friendUserInfoMap.get(nameList.your)?.nickname
  ) {
    nameList.yourNickName = friendUserInfoMap.get(nameList.your).nickname;
  }
  uni.navigateTo({
    url:
      '../singleChatEntry/singleChatEntry?username=' + JSON.stringify(nameList),
  });
};
// 群聊 和 聊天室 （两个概念）
const into_groupChatRoom = (detail) => {
  var myName = uni.getStorageSync('myUsername');
  var nameList = {
    myName: myName,
    your: detail.groupName,
    groupId: detail.info.to,
  };
  uni.navigateTo({
    url:
      '../groupChatEntry/groupChatEntry?username=' + JSON.stringify(nameList),
  });
};
const into_inform = () => {
  uni.redirectTo({
    url: '../notification/notification',
  });
};

const removeAndRefresh = (event) => {
  let removeId = event.currentTarget.dataset.item.info.from;
  let ary = getApp().globalData.saveFriendList;
  let idx;
  if (ary.length > 0) {
    ary.forEach((v, k) => {
      if (v.from == removeId) {
        idx = k;
      }
    });
    getApp().globalData.saveFriendList.splice(idx, 1);
  }
  uni.removeStorageSync('INFORM');
};

const del_chat = (event) => {
  let detail = event.currentTarget.dataset.item;
  let nameList = {};
  // 删除当前选中群组聊天列表
  if (detail.chatType == 'groupchat' || detail.chatType == 'chatRoom') {
    nameList = {
      your: detail.info.to,
    };
    //删除当前选中通知列表
  } else if (detail.chatType === 'INFORM') {
    nameList = {
      your: 'INFORM',
    };
  }
  //删除当前选中好友聊天列表
  else {
    nameList = {
      your: detail.username,
    };
  }
  var myName = uni.getStorageSync('myUsername');
  var currentPage = getCurrentPages();

  uni.showModal({
    title: '确认删除？',
    confirmText: '删除',
    success: function (res) {
      if (res.confirm) {
        uni.removeStorageSync(nameList.your + myName);
        uni.removeStorageSync('rendered_' + nameList.your + myName);
        nameList.your === 'INFORM' && removeAndRefresh(event);
        // if (Object.keys(currentPage[0]).length>0) {
        //   currentPage[0].onShow();
        // }
        disp.fire('em.chat.session.remove');
        getLocalConversationlist();
      }
    },
    fail: function (err) {
      console.log('删除列表', err);
    },
  });
};
const removeLocalStorage = (yourname) => {
  var myName = uni.getStorageSync('myUsername');
  uni.removeStorageSync(yourname + myName);
  uni.removeStorageSync('rendered_' + yourname + myName);
};

/* 获取窗口尺寸 */
const getWindowSize = () => {
  uni.getSystemInfo({
    success: (res) => {
      conversationState.winSize = {
        witdh: res.windowWidth,
        height: res.windowHeight,
      };
    },
  });
};
const hidePop = () => {
  conversationState.showPop = false;
};
const pickerMenuChange = () => {
  del_chat(conversationState.currentVal);
};

/*  disp event callback function */
const onChatPageSubscribe = () => {
  getLocalConversationlist();
  conversationState.messageNum = getApp().globalData.saveFriendList.length;
  conversationState.unReadTotalNotNum =
    getApp().globalData.saveFriendList.length +
    getApp().globalData.saveGroupInvitedList.length;
};
const onChatPageDeleteGroup = (infos) => {
  listGroups();
  getRoster();
  getLocalConversationlist();
  conversationState.messageNum = getApp().globalData.saveFriendList.length;
  //如果会话存在则执行删除会话
  removeLocalStorage(infos.gid);
};
const onChatPageUnreadspot = (message) => {
  getLocalConversationlist();
  let currentLoginUser = WebIM.conn.context.userId;
  let id =
    message && message.chatType === 'groupchat' ? message?.to : message?.from;
  let pushObj = uni.getStorageSync('pushStorageData');
  let pushAry = pushObj[currentLoginUser] || [];
  conversationState.pushConfigData = pushAry;

  // if (message && pushValue.includes(id)) return
  conversationState.unReadSpotNum =
    getApp().globalData.unReadMessageNum > 99
      ? '99+'
      : getApp().globalData.unReadMessageNum;
};
const onChatPageJoingroup = () => {
  conversationState.unReadMessageNum =
    getApp().globalData.saveGroupInvitedList.length;
  conversationState.unReadTotalNotNum =
    getApp().globalData.saveFriendList.length +
    getApp().globalData.saveGroupInvitedList.length;
  getLocalConversationlist();
};
const onChatPageRemoveContacts = () => {
  getLocalConversationlist();
  getRoster();
};
const onChatPageUnsubscribed = (message) => {
  uni.showToast({
    title: `与${message.from}好友关系解除`,
    icon: 'none',
  });
};
onUnload(() => {
  //页面卸载同步取消onload中的订阅，防止重复订阅事件。
  disp.off('em.subscribe', conversationState.onChatPageSubscribe);
  disp.off('em.invite.deleteGroup', conversationState.onChatPageDeleteGroup);
  disp.off('em.unreadspot', conversationState.onChatPageUnreadspot);
  disp.off('em.invite.joingroup', conversationState.onChatPageJoingroup);
  disp.off('em.contacts.remove', conversationState.onChatPageRemoveContacts);
  disp.off('em.unsubscribed', conversationState.onChatPageUnsubscribed);
});
</script>
<style>
@import './conversation.css';
</style>
