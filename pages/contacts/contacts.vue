<template>
  <view>
    <view>
      <view class="search" v-if="search_btn">
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
            'content ' + (gotop ? (isIPX ? 'goTopX' : 'goTop') : 'goback')
          "
          enable-back-to-top
          :scroll-into-view="toView"
          scroll-y="true"
          scroll-with-animation="true"
          :style="'padding-bottom: ' + (isIPX ? '270rpx' : '226rpx')"
        >
          <view class="search_input" v-if="search_friend">
            <view>
              <icon type="search" size="13"></icon>
              <input
                placeholder="搜索"
                placeholder-style="color:#CFCFCF;line-height:20px;font-size:12px;"
                auto-focus
                confirm-type="search"
                type="text"
                @confirm="onSearchContacts"
                @input="onInput"
                v-model="serachKeyword"
              />
              <icon
                type="clear"
                size="13"
                @tap.stop="clearInput"
                v-if="show_clear"
              ></icon>
            </view>
            <text @tap="cancelSearchContacts">取消</text>
          </view>
          <view class="contain">
            <view class="otherItem" @click="entryTabNnotificationPage">
              <image
                src="../../static/images/inform.png"
                data-username="name"
              ></image>
              <text>系统通知</text>
            </view>
            <view class="otherItem" @click="entryAddNewFreiend">
              <image
                src="/static/images/invite_theme2x.png"
                data-username="name"
              ></image>
              <text>添加好友</text>
            </view>
            <view class="otherItem" @click="entryGroupsPage">
              <image src="/static/images/groupTheme.png"></image>
              <text>群组</text>
            </view>
          </view>

          <view
            v-for="(group, id) in listMain"
            :key="id"
            :id="'inToView' + group.id"
            :data-id="group.id"
          >
            <view class="address_top">{{ group.region }}</view>
            <view
              v-for="(item, brandId) in group.brands"
              :key="brandId"
              :data-username="item.name"
            >
              <swipe-delete @deleteChatItem="deleteFriend(item)">
                <view
                  class="tap_mask"
                  :data-username="item.name"
                  @click="entryemChat(item)"
                >
                  <view class="address_bottom" :data-username="item.name">
                    <image
                      :src="showFriendAvatar(item.name)"
                      :data-username="item.name"
                    ></image>
                    <text :data-username="item.name">{{
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
          <block v-for="(item, id) in listMain" :key="id">
            <view
              :class="
                'orientation_city ' + (isActive == item.id ? 'active' : '')
              "
              @tap="scrollToViewFn"
              :data-id="item.id"
              >{{ item.region }}</view
            >
          </block>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { CHAT_TYPE } from '@/EaseIM/constant';
let WebIM = require('../../utils/WebIM')['default'];
let disp = require('../../utils/broadcast');
import swipeDelete from '../../components/swipedelete/swipedelete';
export default {
  data() {
    return {
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
      serachKeyword: '',
      showFixedTitile: false,
      defaultAvatar: '/static/images/theme2x.png',
    };
  },
  components: {
    swipeDelete,
  },
  mounted() {
    uni.hideHomeButton && uni.hideHomeButton();
    this.getBrands(this.friendList);
  },
  computed: {
    //好友列表
    friendList() {
      return this.$store.state.ContactsStore.friendList;
    },
    friendUserInfoMap() {
      return this.$store.state.ContactsStore.friendUserInfoMap;
    },
    //好友头像展示
    showFriendAvatar() {
      return (hxId) => {
        if (
          this.friendUserInfoMap.has(hxId) &&
          this.friendUserInfoMap.get(hxId)?.avatarurl
        ) {
          return this.friendUserInfoMap.get(hxId).avatarurl;
        } else {
          return this.defaultAvatar;
        }
      };
    },
    //好友昵称展示
    showFriendNickname() {
      return (hxId) => {
        if (
          this.friendUserInfoMap.has(hxId) &&
          this.friendUserInfoMap.get(hxId)?.nickname
        ) {
          return this.friendUserInfoMap.get(hxId).nickname;
        } else {
          return hxId;
        }
      };
    },
  },
  methods: {
    //删除好友
    //二次确认&执行删除
    async deleteFriend(event) {
      console.log('>>>>执行删除好友', event);
      const { name: delFriendId } = event;
      const res = await uni.showModal({
        title: '确认删除？+ delFriendId',
        confirmText: '删除',
      });
      if (res.confirm) {
        removeContactFromServer(delFriendId);
        updateFriendList();
      }
    },
    openSearch: function () {
      this.search_btn = false;
      this.search_friend = true;
      this.show_mask = true;
      this.gotop = true;
    },
    clearInput: function () {
      this.serachKeyword = '';
      this.show_clear = false;
    },
    onInput(e) {
      let inputValue = this.serachKeyword;
      if (inputValue) {
        this.show_clear = true;
      } else {
        this.show_clear = false;
        this.cancelSearchContacts();
      }
    },
    cancelSearchContacts: function () {
      this.search_btn = true;
      this.search_friend = false;
      this.gotop = false;
      this.serachKeyword = '';
      this.getBrands(this.friendList);
    },
    onSearchContacts() {
      let searchValue = this.serachKeyword;
      let member = this.friendList;
      let serchList = [];
      member.forEach((friendId, index) => {
        if (String(friendId).indexOf(searchValue) > -1) {
          serchList.push(friendId);
        } else if (
          this.friendUserInfoMap.has(friendId) &&
          this.friendUserInfoMap.get(friendId)?.nickname
        ) {
          if (
            this.friendUserInfoMap.get(friendId).nickname.indexOf(searchValue) >
            -1
          ) {
            serchList.push(friendId);
          }
        }
      });
      this.getBrands(serchList);
    },
    //前往系统通知页面
    entryTabNnotificationPage: function () {
      uni.redirectTo({
        url: '../notification/notification',
      });
    },
    //前往群组页面
    entryGroupsPage: function () {
      uni.navigateTo({
        url: '../groups/groups?myName=' + this.myName,
      });
    },
    //前往单聊页面
    entryemChat: function (params) {
      const chatType = CHAT_TYPE.SINGLE_CHAT;
      uni.navigateTo({
        url: `../emChatContainer/index?targetId=${params.name}&chatType=${chatType}`,
      });
    },
    //前往添加好友页面
    entryAddNewFreiend: function (event) {
      uni.navigateTo({
        url:
          '../friend_info/friend_info?yourname=' +
          event.target.dataset.username,
      });
    },
    /* 形成indexlist好友列表 */
    //点击右侧字母导航定位触发
    scrollToViewFn(e) {
      let _id = e.target.dataset.id;
      for (let i = 0; i < this.listMain.length; ++i) {
        if (this.listMain[i].id === _id) {
          this.isActive = _id;
          this.toView = 'inToView' + _id;
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
    },
    // 处理数据格式 生成list 索引。
    getBrands(member) {
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
      this.generateIndexedList(contactsList);
    },
    generateIndexedList(contactsList) {
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
      this.listMain = someArr;
      //赋值给当前高亮的isActive
      this.isActive = someArr.length > 0 ? someArr[0].id : '';
    },
  },
};
</script>
<style>
@import './contacts.css';
</style>
