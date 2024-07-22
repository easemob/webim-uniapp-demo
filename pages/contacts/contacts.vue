<template>
  <view class="contacts_container">
    <!-- navbar -->
    <!-- #ifdef H5 || APP-PLUS -->
    <u-navbar title="联系人" :placeholder="true">
      <u-avatar size="32" slot="left" shape="square" :src="loginUserAvatar">
      </u-avatar>
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
    <!-- #endif -->
    <!-- #ifndef H5 || APP-PLUS-->
    <u-navbar title="联系人" :placeholder="true">
      <view class="u-nav-slot" slot="left">
        <u-avatar size="32" shape="square" :src="loginUserAvatar"> </u-avatar>
        <u-line
          direction="column"
          :hairline="false"
          length="16"
          margin="0 8px"
        ></u-line>
        <u-icon
          size="24"
          name="/static/images/new_ui/contacts/add_contacts.png"
          @click="entryAddContactsPage"
        ></u-icon>
      </view>

      <view slot="center">
        <image
          class="contacts_navbar_center"
          src="/static/images/new_ui/contacts_log.png"
        />
      </view>
    </u-navbar>

    <!-- #endif -->
    <!-- search -->
    <!-- 搜索好友列表相关 -->
    <view>
      <view class="search_container" v-if="isShowDefaultSearch">
        <view class="search_icon_box" @click="openSearch">
          <u-icon
            size="22"
            name="/static/images/new_ui/search_icon.png"
          ></u-icon>
          <text class="search_text">搜索</text>
        </view>
      </view>
      <!-- 好友搜索结果展示 -->
      <view class="searching_container" v-if="!isShowDefaultSearch">
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
          @input="onSearchContacts"
          @custom="cancelSearch"
        ></u-search>
      </view>
    </view>
    <!-- 搜索结果list -->
    <template v-if="!isShowDefaultSearch">
      <u-index-list
        class="index_list_container"
        :index-list="indexList"
        @select="onSelectIndex"
        activeColor="#009EFF"
        customNavHeight="90"
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
              :key="cell.initial + cell.userId"
              :border="false"
            >
              <!-- 头像 -->
              <u-avatar
                slot="icon"
                shape="square"
                size="40"
                :src="showFriendAvatar(cell.userId)"
                customStyle="margin: -3px 5px -3px 0"
              ></u-avatar>
              <!-- name -->
              <view class="conversation_item_title" slot="title">
                <u--text
                  class="conversation_item_title_text"
                  :lines="1"
                  :text="showFriendNickname(cell)"
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
        customNavHeight="90"
      >
        <!-- Contacts -->
        <view slot="header" class="contacts_header_container">
          <u-cell-group :border="false">
            <u-cell
              :clickable="true"
              :isLink="true"
              @click="entryNewInvitePage"
            >
              <text slot="title" class="header_title">新邀请</text>
              <u-badge
                slot="value"
                type="primary"
                max="99"
                :value="newInviteMsgNum"
              ></u-badge>
            </u-cell>
            <u-cell
              :clickable="true"
              :isLink="true"
              @click="entryGroupListPage"
            >
              <text slot="title" class="header_title">群聊</text>
              <text slot="value">{{ joinedGroupTotal }}</text>
            </u-cell>
            <u-cell
              :clickable="true"
              :isLink="true"
              @click="entryBlockMembersPage"
            >
              <text slot="title" class="header_title">黑名单</text>
              <text slot="value">{{ blockUserList.length }}</text>
            </u-cell>
          </u-cell-group>
        </view>
        <template>
          <u-index-item
            v-for="(item, index) in sortedContactsList"
            :key="index"
          >
            <u-index-anchor
              :text="indexList[index]"
              bgColor="#FFF"
              color="#75828A"
              height="32px"
            ></u-index-anchor>
            <u-cell
              class="contacts_item_cell"
              v-for="(cell, index1) in item"
              :key="cell.userId"
              :border="false"
              @click="entryContactsDetailPage(cell.userId)"
            >
              <!-- 头像 -->
              <u-avatar
                slot="icon"
                shape="square"
                size="40"
                :src="showFriendAvatar(cell.userId)"
                customStyle="margin: -3px 5px -3px 0"
              ></u-avatar>
              <!-- name -->
              <view class="conversation_item_title" slot="title">
                <u--text
                  class="conversation_item_title_text"
                  :lines="1"
                  :text="showFriendNickname(cell)"
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
const indexList = () => {
  const indexList = [];
  const charCodeOfA = 'A'.charCodeAt(0);
  for (let i = 0; i < 26; i++) {
    indexList.push(String.fromCharCode(charCodeOfA + i));
  }
  indexList.push('#');
  return indexList;
};
export default {
  data() {
    return {
      isShowDefaultSearch: true,
      searchInputKeywords: '',
      searchFriendResultList: [],
      defaultAvatar: '/static/images/new_ui/defaultAvatar.png',
      indexList: [],
      //   indexList: indexList(),
      sortedContactsList: [],
    };
  },
  mounted() {
    uni.hideHomeButton && uni.hideHomeButton();
    this.getBrandsList(this.friendList);
  },
  computed: {
    loginUserProfiles() {
      return this.$store.state.LoginStore.loginUserProfiles;
    },
    loginUserAvatar() {
      if (this.loginUserProfiles.avatarurl) {
        return this.loginUserProfiles?.avatarurl;
      } else {
        return this.defaultAvatar;
      }
    },
    //好友列表
    friendList() {
      return this.$store.state.ContactsStore.friendList;
    },
    friendUserInfoCollection() {
      return this.$store.getters.friendUserInfoCollection;
    },
    blockUserList() {
      return this.$store.state.ContactsStore.blockUserList;
    },
    newInviteMsgNum() {
      return (
        this.$store.getters.getReceiveInviteList?.length &&
        this.$store.getters.getReceiveInviteList.filter(
          (inform) => !inform.isHandled
        ).length
      );
    },
    //群组总数
    joinedGroupTotal() {
      return this.$store.getters.joinedGroupTotal;
    },
    //好友头像展示
    showFriendAvatar() {
      return (hxId) => {
        if (
          this.friendUserInfoCollection[hxId] &&
          this.friendUserInfoCollection[hxId]?.avatarurl
        ) {
          return this.friendUserInfoCollection[hxId].avatarurl;
        } else {
          return this.defaultAvatar;
        }
      };
    },
    //好友昵称展示
    showFriendNickname() {
      return (userItem) => {
        const { userId, remark } = userItem;
        if (remark) {
          return remark;
        }
        if (
          this.friendUserInfoCollection[userId] &&
          this.friendUserInfoCollection[userId]?.nickname
        ) {
          return this.friendUserInfoCollection[userId].nickname;
        } else {
          return userId;
        }
      };
    },
  },
  watch: {
    friendList() {
      this.getBrandsList(this.friendList);
    },
  },
  methods: {
    //开启搜索模式
    openSearch() {
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
      member.forEach((friendItem) => {
        if (String(friendItem.userId).indexOf(searchValue) > -1) {
          serchList.push(friendItem);
        } else if (
          this.friendUserInfoCollection[friendItem.userId] &&
          this.friendUserInfoCollection[friendItem.userId]?.nickname
        ) {
          if (
            this.friendUserInfoCollection[friendItem.userId].nickname.indexOf(
              searchValue
            ) > -1
          ) {
            serchList.push(friendItem);
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
        friendsList.forEach((friendItem) => {
          const { userId, remark } = friendItem;
          const params = {};
          params.userId = userId;
          params.remark = remark;
          console.log('friendItem', friendItem);
          if (reg.test(userId.substring(0, 1))) {
            const initial = userId.substring(0, 1).toUpperCase();
            if (!contactsObj[initial]) {
              contactsObj[initial] = [];
            }
            params.initial = initial;
            contactsObj[initial].push(params);
            indexList.push(initial);
          } else {
            const initial = '#';
            params.initial = initial;
            if (!contactsObj[initial]) {
              contactsObj[initial] = [];
            }
            contactsObj[initial].push({ ...params });
            indexList.push('#');
          }
        });

      // 对索引列表进行排序，并创建一个新的有序对象
      const sortedIndexList = [...new Set(indexList)].sort((a, b) => {
        if (a === '#') return -1;
        if (b === '#') return 1;
        return a.localeCompare(b);
      });

      // 根据排序后的索引列表创建一个新的有序对象
      let sortedContactsObj = {};
      sortedIndexList.forEach((initial) => {
        sortedContactsObj[initial] = contactsObj[initial];
      });

      if (type === 'search') {
        this.searchFriendResultList = Object.values(sortedContactsObj);
      } else {
        this.sortedContactsList = Object.values(sortedContactsObj);
      }

      this.indexList = sortedIndexList;
    },

    onSelectIndex(value) {
      console.log('>>>>>>>', value);
    },
    //前往添加联系人页面
    entryAddContactsPage() {
      uni.navigateTo({
        url: '../addContacts/index',
      });
    },
    //前往新邀请页面
    entryNewInvitePage() {
      uni.navigateTo({
        url: '../newInvite/index',
      });
    },
    //前往群组列表页面
    entryGroupListPage() {
      uni.navigateTo({
        url: '../groupList/index',
      });
    },
    //前往黑名单列表页面
    entryBlockMembersPage() {
      uni.navigateTo({
        url: '../blockMembers/index',
      });
    },
    //前往联系人详情页面
    entryContactsDetailPage(userId) {
      uni.navigateTo({
        url: `../contactsDetail/index?userId=${userId}`,
      });
    },
  },
};
</script>
<style>
@import './contacts.css';
</style>
