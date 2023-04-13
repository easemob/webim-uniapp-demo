<template>
  <view>
    <!-- <view class="search" wx:if="{{ search_btn }}">
	<view bindtap="openSearch">
		<icon type="search" size="13"></icon>
		<text>搜索</text>
	</view>
</view> -->
    <view class="search_input" v-if="groupsState.search_friend">
      <view>
        <icon type="search" size="13"></icon>
        <input
          placeholder="搜索"
          placeholder-style="color:#CFCFCF;line-height:20px;font-size:12px;"
          auto-focus
        />
      </view>
      <text @tap="cancel">取消</text>
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
          @tap="into_group_chat"
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

    <view class="mask" @tap="close_mask" v-if="groupsState.show_mask"></view>
  </view>
</template>

<script setup>
import { reactive } from 'vue';
import disp from '@/utils/broadcast';
import { onLoad, onShow, onUnload } from '@dcloudio/uni-app';
const WebIM = uni.WebIM;
const groupsState = reactive({
  search_btn: true,
  search_friend: false,
  show_mask: false,
  groupList: [],
  // 群聊列表
  myName: '',
});
onLoad((option) => {
  disp.on('em.invite.joingroup', onGroupsPageJoinGroup);
  disp.on('em.invite.deleteGroup', onGroupsPageDeleteGroup);
  groupsState.myName = option.myName;
});
onShow(() => {
  listGroups();
});
// 列出所有群组 (调用 listGroups 函数获取当前登录用户加入的群组列表)
const listGroups = () => {
  WebIM.conn.getGroup({
    limit: 100,
    success: function (res) {
      uni.setStorage({
        key: 'listGroup',
        data: res.data,
      });
      groupsState.groupList = res.data;
      getApp().globalData.groupList = res.data || [];
    },
    error: function () {},
  });
};
const openSearch = () => {
  groupsState.search_btn = false;
  groupsState.search_friend = true;
  groupsState.show_mask = true;
};
const cancel = () => {
  groupsState.search_btn = true;
  groupsState.search_friend = false;
  groupsState.show_mask = false;
};
const close_mask = () => {
  groupsState.search_btn = true;
  groupsState.search_friend = false;
  groupsState.show_mask = false;
};
const into_group_chat = (event) => {
  const nameList = {
    myName: groupsState.myName,
    your: event.currentTarget.dataset.username,
    groupId: event.currentTarget.dataset.roomid,
  };
  uni.username = nameList;
  uni.navigateTo({
    url:
      '../groupChatEntry/groupChatEntry?username=' + JSON.stringify(nameList),
  });
};
const build_group = () => {
  const nameList = {
    myName: groupsState.myName,
  };
  uni.navigateTo({
    url: '../add_groups/add_groups?owner=' + JSON.stringify(nameList),
  });
};
const edit_group = (event) => {
  const nameList = {
    myName: groupsState.myName,
    groupName: event.currentTarget.dataset.username,
    roomId: event.currentTarget.dataset.roomid,
  };
  uni.navigateTo({
    url: '../groupSetting/groupSetting?groupInfo=' + JSON.stringify(nameList),
  });
};
/*  disp event callback function */
const onGroupsPageJoinGroup = () => {
  listGroups();
};
const onGroupsPageDeleteGroup = () => {
  listGroups();
};
onUnload(() => {
  disp.off('em.invite.joingroup', onGroupsPageJoinGroup);
  disp.off('em.invite.deleteGroup', onGroupsPageDeleteGroup);
});
</script>
<style>
@import './groups.css';
</style>
