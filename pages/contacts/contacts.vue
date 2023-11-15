<template>
  <view>
    <!-- navbar -->
    <u-navbar title="联系人" :placeholder="true" leftIcon="arrow-left">
      <u-avatar
        size="32"
        slot="left"
        shape="square"
        src="/static/images/new_ui/defaultAvatar.png"
      ></u-avatar>
      <view slot="center">
        <image
          class="contacts_navbar_center"
          src="/static/images/new_ui/contacts_log.png"
        />
      </view>
      <u-icon
        slot="right"
        size="24"
        name="/static/images/new_ui/contacts/add_contacts.png"
        @click="entryAddContactsPage"
      ></u-icon>
    </u-navbar>
    <!-- search -->
    <!-- 搜索好友列表相关 -->
    <view>
      <view class="default_search_container" v-if="isShowDefaultSearch">
        <view class="search_container" @click="openSearch">
          <u-icon
            size="18"
            name="/static/images/new_ui/search_icon.png"
          ></u-icon>
          <text class="search_text">搜索</text>
        </view>
      </view>
      <!-- 好友搜索结果展示 -->
      <view v-if="!isShowDefaultSearch">
        <u-search
          v-model.trim="searchInputKeywords"
          shape="square"
          placeholder="搜索联系人"
          :actionText="'取消'"
          :actionStyle="{
            color: '#0873de',
          }"
          :clearabled="true"
          :focus="true"
          @search="onSearchContacts"
          @custom="cancelSearch"
        ></u-search>
      </view>
    </view>
    <!-- 搜索结果list -->
    <template v-if="!isShowDefaultSearch">
      <u-index-list
        :index-list="indexList"
        @select="onSelectIndex"
        activeColor="#009EFF"
      >
        <template v-for="(item, index) in searchFriendResultList">
          <u-index-item>
            <u-index-anchor
              :text="indexList[index]"
              bgColor="#FFF"
              color="#75828A"
              height="32px"
            ></u-index-anchor>
            <u-cell
              class="contacts_item_cell"
              v-for="(cell, index1) in item"
              :key="cell.initial + cell.name"
              :border="false"
            >
              <!-- 头像 -->
              <u-avatar
                slot="icon"
                shape="square"
                size="40"
                :src="showFriendAvatar(cell.name)"
                customStyle="margin: -3px 5px -3px 0"
              ></u-avatar>
              <!-- name -->
              <view class="conversation_item_title" slot="title">
                <u--text
                  class="conversation_item_title_text"
                  :lines="1"
                  :text="showFriendNickname(cell.name)"
                  iconStyle="margin-left: 2px;"
                >
                </u--text>
              </view>
            </u-cell>
          </u-index-item>
        </template>
      </u-index-list>
    </template>
    <!-- 默认好友列表list -->
    <template v-else>
      <u-index-list
        :index-list="indexList"
        @select="onSelectIndex"
        activeColor="#009EFF"
      >
        <!-- Contacts -->
        <view slot="header" class="contacts_header_container">
          <u-cell-group :border="false">
            <u-cell :clickable="true" :isLink="true">
              <text slot="title" class="header_title">系统通知</text>
              <u-badge
                slot="value"
                type="primary"
                max="99"
                :value="unReadNoticeNum"
              ></u-badge>
            </u-cell>
            <u-cell :clickable="true" :isLink="true">
              <text slot="title" class="header_title">群聊</text>
              <text slot="value">{{ groupList.length }}</text>
            </u-cell>
            <u-cell :clickable="true" :isLink="true">
              <text slot="title" class="header_title">黑名单</text>
              <text slot="value">{{ blockUserList.length }}</text>
            </u-cell>
          </u-cell-group>
        </view>
        <template v-for="(item, index) in sortedContactsList">
          <u-index-item>
            <u-index-anchor
              :text="indexList[index]"
              bgColor="#FFF"
              color="#75828A"
              height="32px"
            ></u-index-anchor>
            <u-cell
              class="contacts_item_cell"
              v-for="(cell, index1) in item"
              :key="cell.initial + cell.name"
              :border="false"
            >
              <!-- 头像 -->
              <u-avatar
                slot="icon"
                shape="square"
                size="40"
                :src="showFriendAvatar(cell.name)"
                customStyle="margin: -3px 5px -3px 0"
              ></u-avatar>
              <!-- name -->
              <view class="conversation_item_title" slot="title">
                <u--text
                  class="conversation_item_title_text"
                  :lines="1"
                  :text="showFriendNickname(cell.name)"
                  iconStyle="margin-left: 2px;"
                >
                </u--text>
              </view>
            </u-cell>
          </u-index-item>
        </template>
        <view slot="footer" class="u-safe-area-inset--bottom">
          <text class="list__footer"></text>
          <u-divider
            :text="`${friendList.length}个联系人`"
            :hairline="true"
          ></u-divider>
        </view>
      </u-index-list>
    </template>
  </view>
</template>

<script>
import { CHAT_TYPE } from '@/EaseIM/constant';
export default {
  data() {
    return {
      isShowDefaultSearch: true,
      searchInputKeywords: '',
      searchFriendResultList: [],
      defaultAvatar: '/static/images/theme2x.png',
      indexList: [],
      sortedContactsList: [],
    };
  },
  mounted() {
    uni.hideHomeButton && uni.hideHomeButton();
    this.getBrandsList(this.friendList);
  },
  computed: {
    //好友列表
    friendList() {
      return this.$store.state.ContactsStore.friendList;
    },
    friendUserInfoMap() {
      return this.$store.state.ContactsStore.friendUserInfoMap;
    },
    blockUserList() {
      return this.$store.state.ContactsStore.blockUserList;
    },
    unReadNoticeNum() {
      return this.$store.getters.getAllInformsList.filter(
        (inform) => !inform.isHandled
      ).length;
    },
    //群组列表
    groupList() {
      return this.$store.state.GroupStore.joinedGroupList;
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
    //开启搜索模式
    openSearch() {
      console.log('>>>>>>');
      this.isShowDefaultSearch = false;
    },
    cancelSearch() {
      this.isShowDefaultSearch = true;
      this.searchInputKeywords = '';
      this.searchFriendResultList = [];
      this.getBrandsList(this.friendList);
    },
    onSearchContacts() {
      let searchValue = this.searchInputKeywords;
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
      this.getBrandsList(serchList, 'search');
    },
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

    //前往系统通知页面
    entryTabNnotificationPage: function () {
      uni.navigateTo({
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
        url: '../addNewFriend/addNewFriend',
      });
    },
    //构建indexList
    //type为构建indexList init search
    getBrandsList(friendsList, type) {
      const reg = /[a-z]/i;
      let contactsObj = {};
      let indexList = [];

      friendsList.length &&
        friendsList.forEach((userId) => {
          const params = {};
          params.name = userId;
          if (reg.test(userId.substring(0, 1))) {
            const initial = userId.substring(0, 1).toUpperCase();
            if (!contactsObj[initial]) {
              contactsObj[initial] = [];
            }
            params.initial = initial;
            contactsObj[initial].push(params);
            indexList.push(userId.substring(0, 1).toUpperCase());
          } else {
            params.initial = '#';
            contactsObj[initial].push({ ...params });
            indexList.push('#');
          }
        });
      if (type === 'search') {
        this.searchFriendResultList = Object.values(contactsObj);
      } else {
        this.sortedContactsList = Object.values(contactsObj);
      }

      this.indexList = [...new Set(indexList)];
      console.log('contactsList', Object.values(contactsObj));
    },
    onSelectIndex(value) {
      console.log('>>>>>>>', value);
    },
    //前往添加联系人页面
    entryAddContactsPage() {
      console.log('?>?????');
      uni.navigateTo({
        url: '../addContacts/index',
      });
    },
  },
};
</script>
<style>
@import './contacts.css';
</style>
