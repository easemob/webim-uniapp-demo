<template>
  <view>
    <!-- #ifdef H5 || APP-PLUS -->

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
        @click="entryGroupCreatePage"
      ></u-icon>
    </u-navbar>
    <!-- #endif -->
    <!-- #ifndef H5 || APP-PLUS-->
    <u-navbar
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
    >
      <view class="u-nav-slot" slot="left">
        <u-icon
          name="arrow-left"
          :label="navbarLeftText"
          size="16"
          @click="onArrowLeftBackClick"
        ></u-icon>

        <u-line
          direction="column"
          :hairline="false"
          length="12"
          margin="0 5px"
        ></u-line>
        <u-icon
          slot="right"
          size="20"
          name="/static/images/new_ui/contacts/add_contacts.png"
          @click="entryGroupCreatePage"
        ></u-icon>
      </view>
    </u-navbar>

    <!-- #endif -->
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
          <u-cell :title="item.groupName" @click="entryGroupDetail(item)">
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
          <u-cell :title="item.groupName" @click="entryGroupDetail(item)">
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
      searchInputKeywords: "",
      searchGroupListResult: [],
    };
  },
  computed: {
    navbarLeftText() {
      return this.joinedGroupTotal > 0
        ? `群聊（${this.joinedGroupTotal}）`
        : "群聊";
    },
    groupPageParams() {
      return this.$store.getters.groupPageParams;
    },
    joinedGroupTotal() {
      return this.$store.getters.joinedGroupTotal;
    },
    joinedGroupList() {
      return this.$store.getters.joinedGroupList;
    },
  },
  methods: {
    onArrowLeftBackClick() {
      uni.navigateBack();
    },
    //开启搜索模式
    openSearch() {
      console.log(">>>>>>");
      this.isShowDefaultSearch = false;
    },
    cancelSearch() {
      this.isShowDefaultSearch = true;
      this.searchInputKeywords = "";
      this.searchGroupListResult = [];
    },
    onSearchGroupList() {
      console.log(">>>>>>开始搜索");
      const searchKeywords = this.searchInputKeywords;
      const joinedGroupList = this.joinedGroupList;
      const searchResult = joinedGroupList.filter((groupItem) => {
        return (
          groupItem.groupName.includes(searchKeywords) ||
          groupItem.groupId.includes(searchKeywords)
        );
      });
      console.log("searchResult", searchResult);
      this.searchGroupListResult = [...searchResult];
    },
    //前往添加联系人页面
    entryGroupCreatePage() {
      uni.navigateTo({
        url: "../groupCreate/index",
      });
    },
    //前往群组详情页面
    entryGroupDetail(groupItem) {
      const groupId = groupItem?.groupId;
      if (groupId) {
        uni.navigateTo({
          url: "../groupDetail/index?groupId=" + groupId,
        });
      }
    },
    //触底函数
    //TODO 处理下拉新的一页群组
    async scrolltolower() {
      console.log(">>>>>>触底", this.groupPageParams);
      const { pageSize, pageNum } = this.groupPageParams;
      //当前已加入的群组数小于默认单页数量，不需要加载更多。
      if (this.joinedGroupList.length < pageSize) return;
      console.log(">>>>>执行分页");
      this.$store.commit("UPDATE_PAGE_PARAMS", { pageNum: pageNum + 1 });
      try {
        const res = await this.$store.dispatch("fetchJoinedGroupList", {
          pageNum: this.groupPageParams.pageNum,
          pageSize: pageSize,
        });
      } catch (error) {
        uni.showToast({
          icon: "none",
          title: "群组列表获取失败请稍后重试！",
        });
      }
    },
  },
};
</script>

<style scoped>
@import "./index.css";
</style>
