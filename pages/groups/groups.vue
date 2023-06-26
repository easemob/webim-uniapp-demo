<template>
  <view>
    <view class="search" v-if="groupsState.search_btn">
      <view @click="openSearch">
        <icon type="search" size="13"></icon>
        <text>搜索</text>
      </view>
    </view>

    <view class="main_body">
      <view class="search_input" v-if="groupsState.search_friend">
        <view>
          <icon type="search" size="13"></icon>
          <input
            placeholder="搜索"
            placeholder-style="color:#CFCFCF;line-height:20px;font-size:12px;"
            auto-focus
            confirm-type="search"
            type="text"
            @confirm="onSearchGroups"
            @input="onInput"
            v-model="groupsState.serach_keyword"
          />
        </view>
        <text @tap="cancelSearchGroups">取消</text>
      </view>
      <view class="contain">
        <view class="build_group" @tap="build_group">
          <image src="/static/images/invite_theme2x.png"></image>
          <text style="">新建群聊</text>
          <image
            style="margin: 20px 15px"
            class="next2"
            src="/static/images/next2.png"
          ></image>
        </view>
        <!-- <view class="add_group">
		<image src="../../static/images/cell_groups.png"></image>
		<text>添加公开群</text>
	</view> -->
        <!-- <view class="line"></view> -->
        <!-- 群聊列表 -->
        <view
          v-for="(item, groupid) in groupsState.groupList"
          :key="groupid"
          class="groupList"
        >
          <view class="info">
            <image
              src="/static/images/groupTheme.png"
              :data-username="item.groupname"
            ></image>
          </view>
          <view
            class="nbr_body"
            :data-username="item.groupname"
            :data-roomid="item.groupid"
            @click="entryemChat(item)"
          >
            <text :data-username="item.groupname">{{ item.groupname }}</text>
          </view>
          <view
            class="edit"
            @tap="edit_group"
            :data-username="item.groupname"
            :data-roomid="item.groupid"
          >
            <image
              src="/static/images/edit.png"
              :data-username="item.groupname"
            ></image>
          </view>
        </view>
      </view>
    </view>

    <!-- <view class="mask" @tap="close_mask" v-if="groupsState.show_mask"></view> -->
  </view>
</template>

<script setup>
import { reactive, watchEffect } from 'vue';
import { CHAT_TYPE } from '@/EaseIM/constant';
/* stores */
import { useGroupStore } from '@/stores/group';
const groupsState = reactive({
  search_btn: true,
  search_friend: false,
  search_keyword: '',
  show_mask: false,
  groupList: [],
});
const groupStore = useGroupStore();
watchEffect(() => {
  groupsState.groupList = groupStore.joinedGroupList;
});
/* 搜索框群组逻辑 */
const openSearch = () => {
  groupsState.search_btn = false;
  groupsState.search_friend = true;
  groupsState.show_mask = true;
};
const onInput = (e) => {
  let inputValue = e.detail.value;
  if (inputValue) {
    groupsState.show_clear = true;
  } else {
    groupsState.show_clear = false;
    cancelSearchGroups();
  }
};
//执行搜索群组方法
const onSearchGroups = () => {
  const searchValue = groupsState.serach_keyword;
  const serchList = [];
  if (groupStore.joinedGroupList.length) {
    groupStore.joinedGroupList.forEach((item) => {
      if (
        item.groupname.indexOf(searchValue) !== -1 ||
        item.groupid.indexOf(searchValue) !== -1
      ) {
        serchList.push(item);
      }
    });
  }
  groupsState.groupList = serchList;
};
const cancelSearchGroups = () => {
  groupsState.search_btn = true;
  groupsState.search_friend = false;
  groupsState.show_mask = false;
  groupsState.groupList = groupStore.joinedGroupList;
};
const close_mask = () => {
  groupsState.search_btn = true;
  groupsState.search_friend = false;
  groupsState.show_mask = false;
};

/* 其他页面跳转 */
//进入到聊天页面
const entryemChat = (params) => {
  console.log('>>>>', params);
  const { groupid } = params;
  const chatType = CHAT_TYPE.GROUP_CHAT;
  uni.navigateTo({
    url: `../emChatContainer/index?targetId=${groupid}&chatType=${chatType}`,
  });
};
//创建群
const build_group = () => {
  uni.navigateTo({
    url: '../addGroups/addGroups',
  });
};
const edit_group = (event) => {
  const nameList = {
    myName: groupsState.myName,
    groupName: event.currentTarget.dataset.username,
    groupid: event.currentTarget.dataset.roomid,
  };
  uni.navigateTo({
    url: '../groupSetting/groupSetting?groupInfo=' + JSON.stringify(nameList),
  });
};
</script>
<style>
@import './groups.css';
</style>
