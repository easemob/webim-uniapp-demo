<template>
<view>
<!-- <view class="search" wx:if="{{ search_btn }}">
	<view bindtap="openSearch">
		<icon type="search" size="13"></icon>
		<text>搜索</text>
	</view>
</view> -->
<view class="search_input" v-if="search_friend">
	<view>
		<icon type="search" size="13"></icon>
		<input placeholder="搜索" placeholder-style="color:#CFCFCF;line-height:20px;font-size:12px;" auto-focus>
	</view>
	<text @tap="cancel">取消</text>
</view>
<view class="contain">
	<view class="build_group" @tap="build_group">
		<image src="/static/images/invite_theme2x.png"></image>
		<text style="">新建群聊</text>
    <image style="margin:20px 15px" class="next2" src="/static/images/next2.png"></image>
	</view>
	<!-- <view class="add_group">
		<image src="../../static/images/cell_groups.png"></image>
		<text>添加公开群</text>
	</view> -->
	<!-- <view class="line"></view> -->
	<!-- 群聊列表 -->
	<view v-for="(item, groupid) in groupList" :key="groupid" class="groupList">
		<view class="info">
			<image src="/static/images/groupTheme.png" :data-username="item.groupname"></image>
		</view>
		<view class="nbr_body" :data-username="item.groupname" :data-roomid="item.groupid" @tap="into_room">
			<text :data-username="item.groupname">{{ item.groupname }}</text>
		</view>
		<view class="edit" @tap="edit_group" :data-username="item.groupname" :data-roomid="item.groupid">
			<image src="/static/images/edit.png" :data-username="item.groupname"></image>
		</view>
	</view>
</view>

<view class="mask" @tap="close_mask" v-if="show_mask"></view>
</view>
</template>

<script>
var WebIM = require("../../utils/WebIM")["default"];
let disp = require("../../utils/broadcast");
export default {
  data() {
    return {
      search_btn: true,
      search_friend: false,
      show_mask: false,
      groupList: [],
      // 群聊列表
      myName: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (option) {
    disp.on("em.invite.joingroup", this.onGroupsPageJoinGroup);
    disp.on("em.invite.deleteGroup", this.onGroupsPageDeleteGroup);
    this.setData({
      myName: option.myName
    });
  },
  onShow: function () {
    this.listGroups();
  },
  onUnload(){
    disp.off("em.invite.joingroup",this.onGroupsPageJoinGroup)
    disp.off("em.invite.deleteGroup",this.onGroupsPageDeleteGroup)
  },
  methods: {
    // 列出所有群组 (调用 listRooms 函数获取当前登录用户加入的群组列表)
    listGroups() {
      var me = this;
      WebIM.conn.getGroup({
        limit: 100,
        success: function (res) {
          uni.setStorage({
            key: "listGroup",
            data: res.data,
          });
          me.setData({
            groupList: res.data
          });
          getApp().globalData.groupList = res.data || [];
        },
        error: function () {}
      });
    },

    openSearch: function () {
      this.setData({
        search_btn: false,
        search_friend: true,
        show_mask: true
      });
    },
    cancel: function () {
      this.setData({
        search_btn: true,
        search_friend: false,
        show_mask: false
      });
    },
    close_mask: function () {
      this.setData({
        search_btn: true,
        search_friend: false,
        show_mask: false
      });
    },
    into_room: function (event) {
      var nameList = {
        myName: this.myName,
        your: event.currentTarget.dataset.username,
        groupId: event.currentTarget.dataset.roomid
      };
	  uni.username = nameList
      uni.navigateTo({
        url: "../groupChatRoom/groupChatRoom?username=" + JSON.stringify(nameList)
      });
    },
    build_group: function () {
      var me = this;
      var nameList = {
        myName: me.myName
      };
      uni.navigateTo({
        url: "../add_groups/add_groups?owner=" + JSON.stringify(nameList)
      });
    },
    edit_group: function (event) {
      var nameList = {
        myName: this.myName,
        groupName: event.currentTarget.dataset.username,
        roomId: event.currentTarget.dataset.roomid
      };
      uni.navigateTo({
        url: "../groupSetting/groupSetting?groupInfo=" + JSON.stringify(nameList)
      });
    },
     /*  disp event callback function */
    onGroupsPageJoinGroup() {
        const pageStack = getCurrentPages(); // 判断是否当前路由是本页
        if (pageStack[pageStack.length - 1].route === this.__route__) {
            this.listGroups();
        }
    },
    onGroupsPageDeleteGroup() {
        const pageStack = getCurrentPages(); // 判断是否当前路由是本页
        if (pageStack[pageStack.length - 1].route === this.__route__) {
            this.listGroups();
        }
    }
  }
};
</script>
<style>
@import "./groups.css";
</style>