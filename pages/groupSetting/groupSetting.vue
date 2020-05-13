<template>
<view class="group-wrap">
    <view class="wrap">
    <view class="group-name">
        <text class="pd-10">群组名称</text>
        <text class="item-name">{{ groupName }}</text>
    </view>
    <view class="group-name">
        <text class="pd-10">群描述</text>
        <view class="item-name">{{ groupDec }}</view>
    </view>
    <view class="group-member">
        <text class="pd-10">群组成员</text>
        <view v-for="(item, index) in groupMember" :key="index">
            <view class="member-list">{{ item.member || item.owner }}</view>
        </view>
    </view>
    <view class="invite-member">
        <text class="pd-10 invite-title">邀请群成员</text>
        <view class="invite-wrap">
            <input placeholder="用户名" @input="addFriendNameFun" placeholder-style="color:#CFCFCF;line-height:40px;font-size:14px;" auto-focus></input>
            <button type="primary" @tap="addGroupMembers">邀请</button>
        </view>
    </view>
    <!-- <view class="black-list border-bottom">
        <text class="pd-5">群组黑名单</text>
    </view> -->
    <view class="bottom-wrap">
    <view class="disband-group" v-if="isOwner">
        <button type="warn" @tap="dissolveGroup">解散群组</button>
    </view>
    <view class="exit-group" v-if="!isOwner">
        <button type="warn" @tap="leaveGroup">退出群组</button>
    </view>
    </view>
    </view>
</view>
</template>

<script>
var WebIM = require("../../utils/WebIM")["default"];
let disp = require("../../utils/broadcast");

export default {
  data() {
    return {
      roomId: "",
      // 群id
      groupName: "",
      // 群名称
      currentName: "",
      // 当前用户
      groupMember: [],
      // 群成员
      curOwner: "",
      // 当前群管理员
      groupDec: "",
      // 群描述
      addFriendName: [],
      isOwner: false
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    let me = this;
    this.setData({
      roomId: JSON.parse(options.groupInfo).roomId,
      groupName: JSON.parse(options.groupInfo).groupName,
      currentName: JSON.parse(options.groupInfo).myName
    });
    disp.on("em.group.leaveGroup", function () {
      var pageStack = getCurrentPages(); // 判断是否当前路由是本页

      if (pageStack[pageStack.length - 1].route === me.route) {
        me.getGroupMember();
        this.getGroupInfo();
      }
    }); // console.log(this.data.roomId, this.data.groupName, this.data.currentName);
    // 获取群成员

    this.getGroupMember(); // 获取群信息

    this.getGroupInfo();
  },
  methods: {
    getGroupMember: function () {
      var me = this; // 获取群成员

      var pageNum = 1,
          pageSize = 1000;
      var options = {
        pageNum: pageNum,
        pageSize: pageSize,
        groupId: this.roomId,
       success: function(resp){
				if(resp && resp.data){
					me.setData({
						groupMember: resp.data
					});
				}
			},
			error: function(err){}
      };
      WebIM.conn.listGroupMember(options);
    },
   getGroupInfo: function(){
		var me = this;
		// 获取群信息
		var options = {
			groupId: this.roomId,
			success: function(resp){
				if(resp && resp.data){
					me.setData({
						curOwner: resp.data[0].owner,
						groupDec: resp.data[0].description
					});

					if(me.currentName == resp.data[0].owner){
						me.setData({
							isOwner: true
						});
					}
				}
			},
			error: function(){}
		};
		WebIM.conn.getGroupInfo(options);
	},
    addFriendNameFun: function (e) {
      var firendArr = [];
      firendArr.push(e.detail.value);
      this.setData({
        addFriendName: firendArr
      });
    },
    // 加好友入群
    addGroupMembers: function () {
      var me = this;
      var option = {
        users: this.addFriendName,
			  groupId: this.roomId,
        success: function () {
          if (me.isExistGroup(me.addFriendName, me.groupMember)) {
            uni.showToast({
              title: "已在群中",
              duration: 2000
            });
          } else {
            uni.showToast({
              title: "邀请已发出",
              duration: 2000
            });
          }
          me.getGroupMember();
        },
        error: function (err) {
          uni.showToast({
            title: err.data.error_description,
            icon:'none'
          });
        }
      };
      WebIM.conn.inviteToGroup(option);
    },
    isExistGroup: function (name, list) {
      for (let index = 0; index < list.length; index++) {
        if (name == list[index].member || name == list[index].owner) {
          return true;
        }
      }

      return false;
    },
    leaveGroup: function () {
      var me = this;
      WebIM.conn.quitGroup({
        groupId: this.roomId,
        success: function () {
          uni.showToast({
            title: "已退群",
            duration: 2000,
            success: function (res) {
              // redirectTo = 此操作不可返回
              setTimeout(() => wx.navigateBack({
                url: "../groups/groups?myName=" + me.currentName
              }), 2000);
            }
          });
          disp.fire("em.invite.deleteGroup"); //退群
        },
        error: function (err) {
          uni.showToast({
            title: err.data.error_description,
            icon:'none'
          });
        }
      });
    },
    dissolveGroup: function () {
      var me = this; // 解散一个群组

      WebIM.conn.dissolveGroup({
        groupId: this.roomId,
        success: function () {
          uni.showToast({
            title: "已解散",
            duration: 2000,
            success: function (res) {
              // redirectTo = 此操作不可返回
              setTimeout(() => wx.navigateBack({
                url: "../groups/groups?myName=" + me.currentName
              }), 2000);
            }
          });
        },
        error: function (err) {
          uni.showToast({
            title: err.data.error_description,
            icon:'none'
          });
        }
      });
    }
  }
};
</script>
<style>
@import "./groupSetting.css";
</style>