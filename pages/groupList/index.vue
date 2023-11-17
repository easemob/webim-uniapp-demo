<template>
  <view>
    <u-navbar
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :left-text="navbarLeftText"
      :autoBack="true"
    >
      <u-icon
        slot="right"
        size="24"
        name="/static/images/new_ui/contacts/add_contacts.png"
        @click="entryAddContactsPage"
      ></u-icon>
    </u-navbar>
    <!-- 搜索群组列表相关 -->
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
          @search="onSearchGroupList"
          @custom="cancelSearch"
        ></u-search>
      </view>
    </view>
    <template v-if="!isShowDefaultSearch">
      <u-list>
        <u-list-item
          v-for="(item, index) in searchGroupListResult"
          :key="item.groupId"
        >
          <u-cell :title="item.groupName">
            <u-avatar
              slot="icon"
              shape="square"
              size="35"
              src="/static/images/new_ui/defaultGroupAvatar.png"
              customStyle="margin: -3px 5px -3px 0"
            ></u-avatar>
          </u-cell>
        </u-list-item>
      </u-list>
    </template>
    <template v-else>
      <u-list @scrolltolower="scrolltolower">
        <u-list-item
          v-for="(item, index) in joinedGroupList"
          :key="item.groupId"
        >
          <u-cell :title="item.groupName">
            <u-avatar
              slot="icon"
              shape="square"
              size="35"
              src="/static/images/new_ui/defaultGroupAvatar.png"
              customStyle="margin: -3px 5px -3px 0"
            ></u-avatar>
          </u-cell>
        </u-list-item>
      </u-list>
    </template>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isShowDefaultSearch: true,
      searchInputKeywords: '',
      searchGroupListResult: [],
    };
  },
  computed: {
    navbarLeftText() {
      return this.joinedGroupTotal > 0
        ? `群聊（${this.joinedGroupTotal}）`
        : '群聊';
    },
    joinedGroupTotal() {
      return this.$store.getters.joinedGroupTotal;
    },
    joinedGroupList() {
      return this.$store.getters.joinedGroupList;
    },
    isLastPageStatus() {
      return this.$store.getters.isLastPageStatus;
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
      this.searchGroupListResult = [];
    },
    onSearchGroupList() {
      console.log('>>>>>>开始搜索');
      const searchKeywords = this.searchInputKeywords;
      const joinedGroupList = this.joinedGroupList;
      const searchResult = joinedGroupList.filter((groupItem) => {
        return (
          groupItem.groupName.includes(searchKeywords) ||
          groupItem.groupId.includes(searchKeywords)
        );
      });
      console.log('searchResult', searchResult);
      this.searchGroupListResult = [...searchResult];
    },
    //前往添加联系人页面
    entryAddContactsPage() {
      uni.navigateTo({
        url: '../addContacts/index',
      });
    },
    //触底函数
    //TODO 处理下拉新的一页群组
    async scrolltolower() {
      console.log('>>>>>>触底');
      if (this.isLastPageStatus) {
        // uni.showToast({
        //   title: '已经是最后一页了',
        //   icon: 'none',
        //   duration: 2000,
        // });
        return;
      }
      this.$store.dispatch('fetchJoinedGroupList');
    },
  },
};
</script>

<style scoped>
@import './index.css';
</style>
