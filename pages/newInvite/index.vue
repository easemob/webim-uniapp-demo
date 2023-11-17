<template>
  <view>
    <u-navbar
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      left-text="新邀请"
      :autoBack="true"
    >
    </u-navbar>
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
          @search="onSearchNewInviteMsg"
          @custom="cancelSearch"
        ></u-search>
      </view>
    </view>
    <!-- 搜索结果cell -->
    <template v-if="!isShowDefaultSearch">
      <u-cell-group :border="false">
        <u-cell
          v-for="(receiceItem, index) in searchNewInviteResultList"
          :key="index"
          :border="false"
        >
          <template v-if="receiceItem.chatType === CHAT_TYPE.SINGLE_CHAT">
            <u-avatar
              slot="icon"
              shape="square"
              size="40"
              :src="'/static/images/new_ui/defaultAvatar.png'"
              customStyle="margin: -3px 5px -3px 0"
            ></u-avatar>
            <view class="add_contacts_item_title" slot="title">
              <u--text
                class="conversation_item_title_text"
                :lines="1"
                text="联系人"
                iconStyle="margin-left: 2px;"
              >
              </u--text>
            </view>
            <u--text
              slot="label"
              size="14"
              color="#75828a"
              :lines="1"
              :text="receiceItem.from + '：' + receiceItem.status"
            ></u--text>
            <view slot="value">
              <u-button
                v-if="!receiceItem.isHandled"
                size="mini"
                type="primary"
                text="添加"
              ></u-button>
              <u-button
                v-if="receiceItem.added"
                size="mini"
                disabled
                text="已添加"
                plain
              ></u-button>
            </view>
          </template>
          <template v-if="receiceItem.chatType === CHAT_TYPE.GROUP_CHAT">
            <u-avatar
              slot="icon"
              shape="square"
              size="40"
              :src="'/static/images/new_ui/defaultGroupAvatar.png'"
              customStyle="margin: -3px 5px -3px 0"
            ></u-avatar>
            <view class="add_contacts_item_title" slot="title">
              <u--text
                class="conversation_item_title_text"
                :lines="1"
                text="群组"
                iconStyle="margin-left: 2px;"
              >
              </u--text>
            </view>
            <u--text
              slot="label"
              size="14"
              color="#75828a"
              :lines="1"
              :text="`${receiceItem.from}：邀请你加入群组【${receiceItem.name}】`"
            ></u--text>
            <view slot="value">
              <u-button
                v-if="!receiceItem.isHandled"
                size="mini"
                type="primary"
                text="加入"
              ></u-button>
              <u-button
                v-if="receiceItem.added"
                size="mini"
                disabled
                text="已加入"
                plain
              ></u-button>
            </view>
          </template>
        </u-cell>
      </u-cell-group>
    </template>
    <template v-else>
      <u-cell-group :border="false">
        <u-cell
          v-for="(receiceItem, index) in receiveInviteList"
          :key="index"
          :border="false"
        >
          <template v-if="receiceItem.chatType === CHAT_TYPE.SINGLE_CHAT">
            <u-avatar
              slot="icon"
              shape="square"
              size="40"
              :src="'/static/images/new_ui/defaultAvatar.png'"
              customStyle="margin: -3px 5px -3px 0"
            ></u-avatar>
            <view class="add_contacts_item_title" slot="title">
              <u--text
                class="conversation_item_title_text"
                :lines="1"
                text="联系人"
                iconStyle="margin-left: 2px;"
              >
              </u--text>
            </view>
            <u--text
              slot="label"
              size="14"
              color="#75828a"
              :lines="1"
              :text="receiceItem.from + '：' + receiceItem.status"
            ></u--text>
            <view slot="value">
              <u-button
                v-if="!receiceItem.isHandled"
                size="mini"
                type="primary"
                text="添加"
              ></u-button>
              <u-button
                v-if="receiceItem.added"
                size="mini"
                disabled
                text="已添加"
                plain
              ></u-button>
            </view>
          </template>
          <template v-if="receiceItem.chatType === CHAT_TYPE.GROUP_CHAT">
            <u-avatar
              slot="icon"
              shape="square"
              size="40"
              :src="'/static/images/new_ui/defaultGroupAvatar.png'"
              customStyle="margin: -3px 5px -3px 0"
            ></u-avatar>
            <view class="add_contacts_item_title" slot="title">
              <u--text
                class="conversation_item_title_text"
                :lines="1"
                text="群组"
                iconStyle="margin-left: 2px;"
              >
              </u--text>
            </view>
            <u--text
              slot="label"
              size="14"
              color="#75828a"
              :lines="1"
              :text="`${receiceItem.from}：邀请你加入群组【${receiceItem.name}】`"
            ></u--text>
            <view slot="value">
              <u-button
                v-if="!receiceItem.isHandled"
                size="mini"
                type="primary"
                text="加入"
              ></u-button>
              <u-button
                v-if="receiceItem.added"
                size="mini"
                disabled
                text="已加入"
                plain
              ></u-button>
            </view>
          </template>
        </u-cell>
      </u-cell-group>
    </template>
  </view>
</template>

<script>
import { CHAT_TYPE } from '@/EaseIM/constant';
export default {
  data() {
    return {
      CHAT_TYPE,
      isShowDefaultSearch: true,
      searchInputKeywords: '',
      searchNewInviteResultList: [],
    };
  },
  computed: {
    receiveInviteList() {
      return this.$store.getters.getReceiveInviteList;
    },
  },
  methods: {
    //开启搜索模式
    openSearch() {
      console.log('>>>>>>');
      this.isShowDefaultSearch = false;
    },
    onSearchNewInviteMsg() {
      const searchValue = this.searchInputKeywords;
      const receiveInviteList = this.receiveInviteList;
      let serchList = [];
      console.log('searchValue', searchValue);
      receiveInviteList.length &&
        receiveInviteList.forEach((receiveInviteListItem) => {
          if (receiveInviteListItem?.from?.indexOf(searchValue) > -1) {
            serchList.push(receiveInviteListItem);
          } else if (receiveInviteListItem?.name?.indexOf(searchValue) > -1) {
            serchList.push(receiveInviteListItem);
          } else if (receiveInviteListItem?.status?.indexOf(searchValue) > -1) {
            serchList.push(receiveInviteListItem);
          }
        });
      this.searchNewInviteResultList = serchList;
      console.log('>>>>执行搜索', serchList);
    },
    cancelSearch() {
      this.searchInputKeywords = '';
      this.searchNewInviteResultList = [];
      this.isShowDefaultSearch = true;
    },
  },
};
</script>

<style scoped>
@import './index.css';
</style>
