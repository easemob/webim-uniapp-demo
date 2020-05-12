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
		<input placeholder="搜索" placeholder-style="color:#CFCFCF;line-height:20px;font-size:12px;" auto-focus></input>
	</view>
	<text @tap="cancel">取消</text>
</view>
<view class="contain">
	<view class="build_group" @tap="build_group">
		<image src="/static/images/chat-list.png"></image>
		<text>新建群聊</text>
	</view>
	<!-- <view class="add_group">
		<image src="../../static/images/cell_groups.png"></image>
		<text>添加公开群</text>
	</view> -->
	<!-- <view class="line"></view> -->
	<!-- 群聊列表 -->
	<view v-for="(item, groupid) in groupList" :key="groupid" class="groupList">
		<view class="nbr_header"></view>
		<view class="info" @tap="into_info">
			<image src="/static/images/number.png" :data-username="item.groupname"></image>
		</view>
		<view class="nbr_body" :data-username="item.groupname" :data-roomid="item.groupid" @tap="into_room">
			<text :data-username="item.groupname">{{ item.groupname }}</text>
		</view>
		<view class="edit" @tap="edit_group" :data-username="item.groupname" :data-roomid="item.groupid">
			<image src="/static/images/cell_groups.png" :data-username="item.groupname"></image>
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
    let me = this;
    disp.on("em.invite.joingroup", function () {
      var pageStack = getCurrentPages(); // 判断是否当前路由是本页

      if (pageStack[pageStack.length - 1].route === me.route) {
        me.listGroups();
      }
    });
    disp.on("em.invite.deleteGroup", function () {
      var pageStack = getCurrentPages(); // 判断是否当前路由是本页

      if (pageStack[pageStack.length - 1].route === me.route) {
        me.listGroups();
      }
    });
    this.setData({
      myName: option.myName
    });
  },
  onShow: function () {
    this.listGroups();
  },
  methods: {
    // 列出所有群组 (调用 listRooms 函数获取当前登录用户加入的群组列表)
    listGroups() {
      var me = this;
      WebIM.conn.getGroup({
        limit: 100,
        success: function (res) {
          me.setData({
            groupList: res.data
          }); // 好像也没有别的官方通道共享数据啊

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
      wx.navigateTo({
        url: "../groupChatRoom/groupChatRoom?username=" + JSON.stringify(nameList)
      });
    },
    build_group: function () {
      var me = this;
      var nameList = {
        myName: me.myName
      };
      wx.navigateTo({
        url: "../add_groups/add_groups?owner=" + JSON.stringify(nameList)
      });
    },
    edit_group: function (event) {
      var nameList = {
        myName: this.myName,
        groupName: event.currentTarget.dataset.username,
        roomId: event.currentTarget.dataset.roomid
      };
      wx.navigateTo({
        url: "../groupSetting/groupSetting?groupInfo=" + JSON.stringify(nameList)
      });
    }
  }
};
</script>
<style>
@import "./groups.css";
</style>