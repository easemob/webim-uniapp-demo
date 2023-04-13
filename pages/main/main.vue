<template>
  <view>
    <view>
      <view class="search" v-if="contactsState.search_btn">
        <view @tap="openSearch">
          <icon type="search" size="12"></icon>
          <text>搜索</text>
        </view>
      </view>
    </view>

    <view class="main_body">
      <view>
        <!-- 左侧列表内容部分 -->
        <scroll-view
          :class="
            'content ' +
            (contactsState.gotop
              ? contactsState.isIPX
                ? 'goTopX'
                : 'goTop'
              : 'goback')
          "
          enable-back-to-top
          :scroll-into-view="contactsState.toView"
          scroll-y="true"
          scroll-with-animation="true"
          :style="
            'padding-bottom: ' + (contactsState.isIPX ? '270rpx' : '226rpx')
          "
        >
          <!-- search -->

          <view class="search_input" v-if="contactsState.search_friend">
            <view>
              <icon type="search" size="13"></icon>
              <input
                placeholder="搜索"
                placeholder-style="color:#CFCFCF;line-height:20px;font-size:12px;"
                auto-focus
                confirm-type="search"
                type="text"
                @confirm="onSearch"
                @input="onInput"
                v-model="contactsState.input_code"
              />
              <icon
                type="clear"
                size="13"
                @tap.stop="clearInput"
                v-if="contactsState.show_clear"
              ></icon>
            </view>
            <text @tap="cancel">取消</text>
          </view>
          <view class="contain">
            <view class="otherItem" @tap="add_new">
              <image
                src="/static/images/invite_theme2x.png"
                data-username="name"
              ></image>
              <text>添加好友</text>
            </view>
            <view class="otherItem" @tap="into_groups">
              <image src="/static/images/groupTheme.png"></image>
              <text>群组</text>
            </view>
          </view>

          <view
            v-for="(group, id) in contactsState.listMain"
            :key="id"
            :id="'inToView' + group.id"
            :data-id="group.id"
          >
            <view class="address_top">{{ group.region }}</view>
            <view
              v-for="(item, brandId) in group.brands"
              :key="brandId"
              :data-username="item.name"
              @tap.stop="delete_friend"
            >
              <swipe-delete>
                <view
                  class="tap_mask"
                  @tap.stop="into_room"
                  :data-username="item.name"
                >
                  <view
                    class="address_bottom"
                    :data-username="item.name"
                    @tap.stop="into_room"
                  >
                    <image
                      :src="showFriendAvatar(item.name)"
                      @tap.stop="into_room"
                      :data-username="item.name"
                    ></image>
                    <text @tap.stop="into_room" :data-username="item.name">{{
                      showFriendNickname(item.name)
                    }}</text>
                  </view>
                </view>
              </swipe-delete>
            </view>
          </view>
        </scroll-view>
        <!-- 右侧字母导航 -->
        <view class="orientation_region">
          <block v-for="(item, id) in contactsState.listMain" :key="id">
            <view
              :class="
                'orientation_city ' +
                (contactsState.isActive == item.id ? 'active' : '')
              "
              @tap="scrollToViewFn"
              :data-id="item.id"
              >{{ item.region }}</view
            >
          </block>
        </view>
      </view>
    </view>

    <view :class="contactsState.isIPX ? 'chatRoom_tab_X' : 'chatRoom_tab'">
      <view class="tableBar" @tap="tab_chat">
        <view
          v-if="
            contactsState.unReadSpotNum > 0 ||
            contactsState.unReadSpotNum == '99+'
          "
          :class="
            'em-unread-spot ' +
            (contactsState.unReadSpotNum == '99+'
              ? 'em-unread-spot-litleFont'
              : '')
          "
          >{{
            contactsState.unReadSpotNum == '99+'
              ? contactsState.unReadSpotNum
              : contactsState.unReadSpotNum + contactsState.unReadTotalNotNum
          }}</view
        >
        <image
          :class="
            contactsState.unReadSpotNum > 0 ||
            contactsState.unReadSpotNum == '99+'
              ? 'haveSpot'
              : ''
          "
          src="/static/images/session2x.png"
        ></image>
        <text>消息</text>
      </view>

      <view class="tableBar">
        <image src="/static/images/comtactshighlight2x.png"></image>
        <text class="activeText">联系人</text>
      </view>

      <!-- <view class="tableBar" @tap="tab_notification">
		<view v-if="unReadTotalNotNum > 0" class="em-unread-spot">{{ unReadTotalNotNum }}</view>
		<image :class="unReadTotalNotNum > 0 ? 'haveSpot': ''" src="/static/images/notice.png"></image>
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
import disp from '@/utils/broadcast';
import swipeDelete from '@/components/swipedelete/swipedelete';
import { onLoad, onShow, onUnload } from '@dcloudio/uni-app';
// let WebIM = require("../../utils/WebIM")["default"];
const WebIM = uni.WebIM;
// let disp = require('../../utils/broadcast');
let systemReady = false;
let canPullDownreffesh = true;

const contactsState = reactive({
  search_btn: true,
  search_friend: false,
  show_mask: false,
  myName: '',
  member: [],
  messageNum: '',
  //加好友申请数
  unReadSpotNum: 0,
  //未读消息数
  unReadNoticeNum: 0,
  //加群通知数
  unReadTotalNotNum: 0,
  //总通知数：加好友申请数 + 加群通知数
  isActive: null,
  listMain: [],
  listTitles: [],
  toView: 'inToView0',
  oHeight: [],
  scroolHeight: 0,
  show_clear: false,
  isHideLoadMore: true,
  isIPX: false,
  gotop: false,
  input_code: '',
  showFixedTitile: false,
  defaultAvatar: '/static/images/theme2x.png',
});
//好友头像展示
const showFriendAvatar = computed(() => {
  const friendUserInfoMap = getApp().globalData.friendUserInfoMap;
  return (hxId) => {
    if (friendUserInfoMap.has(hxId) && friendUserInfoMap.get(hxId)?.avatarurl) {
      return friendUserInfoMap.get(hxId).avatarurl;
    } else {
      return contactsState.defaultAvatar;
    }
  };
});
//好友昵称展示
const showFriendNickname = computed(() => {
  const friendUserInfoMap = getApp().globalData.friendUserInfoMap;
  return (hxId) => {
    if (friendUserInfoMap.has(hxId) && friendUserInfoMap.get(hxId)?.nickname) {
      return friendUserInfoMap.get(hxId).nickname;
    } else {
      return hxId;
    }
  };
});

const getRoster = async (fetchType) => {
  if (fetchType === 'local') {
    const localRosterList = uni.getStorageSync('member');
    contactsState.member = localRosterList;
    console.log('>>>>>>>localRosterList', localRosterList);
    getBrands(localRosterList);
  } else if (fetchType === 'server') {
    try {
      const { data } = await WebIM.conn.getContacts();
      console.log('>>>>>>main');
      if (data.length) {
        uni.setStorage({
          key: 'member',
          data: [...data],
        });
        contactsState.member = [...data];
        if (!systemReady) {
          disp.fire('em.main.ready');
          systemReady = true;
        }
        getBrands([...data]);
      }
    } catch (error) {
      console.log('>>>>>好友列表获取失败', error);
    }
  }
};
const moveFriend = (message) => {
  let rosters = {
    success: (roster) => {
      let member = [];
      for (let i = 0; i < roster.length; i++) {
        if (roster[i].subscription == 'both') {
          member.push(roster[i]);
        }
      }
      contactsState.member = member;
    },
  };
  if (message.type == 'unsubscribe' || message.type == 'unsubscribed') {
    WebIM.conn.deleteContact(message.from);
    WebIM.conn.getContacts(rosters);
  }
};
const handleFriendMsg = (message) => {
  uni.showModal({
    title: '添加好友请求',
    content: message.from + '请求加为好友',
    success: function (res) {
      if (res.confirm == true) {
        WebIM.conn.acceptContactInvite({
          to: message.from,
          message: '[resp:true]',
        });
      } else {
        WebIM.conn.declineContactInvite({
          to: message.from,
          message: 'rejectAddFriend',
        });
      }
    },
    fail: function (err) {},
  });
};
const delete_friend = (event) => {
  var delName = event.currentTarget.dataset.username;
  var myName = uni.getStorageSync('myUsername'); // 获取当前用户名
  uni.showModal({
    title: '确认删除好友' + delName,
    cancelText: '取消',
    confirmText: '删除',

    success(res) {
      if (res.confirm == true) {
        WebIM.conn.deleteContact(delName);
        uni.showToast({
          title: '删除成功',
        });
        // 删除好友后 执行删除本地有关存储并更新好友列表
        removeStoreages(delName);
      }
    },
  });
};
const removeStoreages = (targetId) => {
  if (!targetId) return;
  const myName = uni.getStorageSync('myUsername');
  uni.removeStorageSync(targetId + myName);
  uni.removeStorageSync('rendered_' + targetId + myName);
  //发布删除好友事件 订阅删除事件的接口会重新拉取好友列表
  disp.fire('em.contacts.remove');
  disp.fire('em.main.deleteFriend');
};
const openSearch = () => {
  contactsState.search_btn = false;
  contactsState.search_friend = true;
  contactsState.show_mask = true;
  contactsState.gotop = true;
};
const clearInput = () => {
  contactsState.input_code = '';
  contactsState.show_clear = false;
};
const onInput = (e) => {
  let inputValue = e.detail.value;
  if (inputValue) {
    contactsState.show_clear = true;
  } else {
    contactsState.show_clear = false;
  }
};
const cancel = () => {
  contactsState.search_btn = true;
  contactsState.search_friend = false;

  contactsState.gotop = false;

  getBrands(contactsState.member);
};

const onSearch = (val) => {
  let searchValue = val.detail.value;
  let member = contactsState.member;
  let serchList = [];
  member.forEach((item, index) => {
    if (String(item.name).indexOf(searchValue) != -1) {
      serchList.push(item);
    }
  });
  getBrands(serchList);
};
const add_new = () => {
  uni.navigateTo({
    url: '../add_new/add_new',
  });
};
const tab_chat = () => {
  uni.redirectTo({
    url: '../conversation/conversation',
  });
};
const close_mask = () => {
  contactsState.search_btn = true;
  contactsState.search_friend = false;
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
const into_inform = () => {
  uni.navigateTo({
    url: '../inform/inform?myName=' + contactsState.myName, //uni.getStorageSync("myUsername")
  });
};
const into_groups = () => {
  uni.navigateTo({
    url: '../groups/groups?myName=' + contactsState.myName,
  });
};
const into_room = (event) => {
  const nameList = {
    myName: contactsState.myName,
    your: event.target.dataset.username,
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
const into_info = (event) => {
  uni.navigateTo({
    url: '../friend_info/friend_info?yourname=' + event.target.dataset.username,
  });
};
//点击右侧字母导航定位触发
const scrollToViewFn = (e) => {
  let _id = e.target.dataset.id;
  for (let i = 0; i < contactsState.listMain.length; ++i) {
    if (contactsState.listMain[i].id === _id) {
      contactsState.isActive = _id;
      contactsState.toView = 'inToView' + _id;
      uni.pageScrollTo({
        selector: `#inToView${_id}`,
        duration: 300,
        success: () => {
          console.log('>>>>滚动成功');
        },
        fail: () => {
          console.log('>>>>失败成功');
        },
      });
      break;
    }
  }
};
// 处理数据格式 生成list 索引。
const getBrands = (member) => {
  const reg = /[a-z]/i;
  let contactsList = [];
  member.length &&
    member.forEach((userId) => {
      let contactsObj = {};
      contactsObj.name = userId;
      if (reg.test(userId.substring(0, 1))) {
        contactsObj.initial = userId.substring(0, 1).toUpperCase();
        contactsList.push({ ...contactsObj });
      } else {
        contactsObj.initial = '#';
        contactsList.push({ ...contactsObj });
      }
    });
  generateIndexedList(contactsList);
};
//成功index列表
const generateIndexedList = (contactsList) => {
  contactsList.sort(
    (a, b) => a.initial.charCodeAt(0) - b.initial.charCodeAt(0)
  );
  var someTtitle = null;
  var someArr = [];

  for (var i = 0; i < contactsList.length; i++) {
    var newBrands = {
      brandId: contactsList[i].name + contactsList[i].initial,
      name: contactsList[i].name,
    };

    if (contactsList[i].initial == '#') {
      if (!lastObj) {
        var lastObj = {
          id: i,
          region: '#',
          brands: [],
        };
      }

      lastObj.brands.push(newBrands);
    } else {
      if (contactsList[i].initial != someTtitle) {
        someTtitle = contactsList[i].initial;
        var newObj = {
          id: i,
          region: someTtitle,
          brands: [],
        };
        someArr.push(newObj);
      }

      newObj.brands.push(newBrands);
    }
  }

  someArr.sort((a, b) => a.region.charCodeAt(0) - b.region.charCodeAt(0));

  if (lastObj) {
    someArr.push(lastObj);
  }
  //赋值给列表值
  contactsState.listMain = someArr;
  //赋值给当前高亮的isActive
  contactsState.isActive = someArr.length > 0 ? someArr[0].id : '';
};
/*  disp event callback function */
const onMainPageSubscribe = () => {
  contactsState.messageNum = getApp().globalData.saveFriendList.length;
  contactsState.unReadTotalNotNum =
    getApp().globalData.saveFriendList.length +
    getApp().globalData.saveGroupInvitedList.length;
};
const onMainPageRemoveContacts = (message) => {
  getRoster('server');
};
const onMainPageUnreadspot = () => {
  contactsState.unReadSpotNum =
    getApp().globalData.unReadMessageNum > 99
      ? '99+'
      : getApp().globalData.unReadMessageNum;
};
const onMainPageJoingroup = () => {
  contactsState.unReadMessageNum =
    getApp().globalData.saveGroupInvitedList.length;
  contactsState.unReadTotalNotNum =
    getApp().globalData.saveFriendList.length +
    getApp().globalData.saveGroupInvitedList.length;
};
const onMainPagesubscribed = () => {
  const pageStack = getCurrentPages();
  getRoster('server');
};
const onMainPageUnsubscribed = (message) => {
  getRoster('server');
  uni.showToast({
    title: `与${message.from}好友关系解除`,
    icon: 'none',
  });
};
onLoad((option) => {
  const app = getApp().globalData;
  //监听加好友申请
  disp.on('em.subscribe', onMainPageSubscribe);
  //监听联系人移除事件（主要为好友以及群组）
  disp.on('em.contacts.remove', onMainPageRemoveContacts); //监听未读“聊天”
  //监听未读总数更新
  disp.on('em.unreadspot', onMainPageUnreadspot);
  //监听未读加群“通知”数
  disp.on('em.invite.joingroup', onMainPageJoingroup);
  //监听好友订阅成功
  disp.on('em.subscribed', onMainPagesubscribed);
  // 监听被解除好友
  disp.on('em.unsubscribed', onMainPageUnsubscribed);
  contactsState.myName = option.myName;
  getRoster('local');
});
onShow(() => {
  uni.hideHomeButton && uni.hideHomeButton();
  contactsState.messageNum = getApp().globalData.saveFriendList.length;
  contactsState.unReadSpotNum =
    getApp().globalData.unReadMessageNum > 99
      ? '99+'
      : getApp().globalData.unReadMessageNum;
  contactsState.unReadMessageNum =
    getApp().globalData.saveGroupInvitedList.length;
  contactsState.unReadTotalNotNum =
    getApp().globalData.saveFriendList.length +
    getApp().globalData.saveGroupInvitedList.length;
  if (getApp().globalData.isIPX) {
    contactsState.isIPX = true;
  }
});
onUnload(() => {
  disp.off('em.subscribe', onMainPageSubscribe);
  disp.off('em.contacts.remove', onMainPageRemoveContacts);
  disp.off('em.unreadspot', onMainPageUnreadspot);
  disp.off('em.invite.joingroup', onMainPageJoingroup);
  disp.off('em.subscribed', onMainPagesubscribed);
  disp.off('em.unsubscribed', onMainPageUnsubscribed);
});
</script>
<style>
@import './main.css';
</style>
