<template>
  <view class="group-wrap">
    <view class="wrap">
      <view class="title-card">
        <image src="/static/images/groupTheme.png"></image>
        <view>
          <p>{{ groupName }}</p>
          <p style="color: #a3a3a3">{{ groupDec }}</p>
        </view>
      </view>
      <view class="group-member">
        <view style="padding:10px">
          <text class="textd-10" style="margin: 5px 0 20px 5px">群组成员</text>
          <text style="float:right">{{ groupCount }}人</text>
        </view>

        <view v-for="(item, index) in groupMember" :key="index" style="display: inline-block">
          <view class="member-list">
            <image src="/static/images/theme2x.png"></image>
            <text>{{ item.member || item.owner }}</text>
          </view>
        </view>
      </view>
      <view class="invite-member">
        <!-- <text class="pd-10 invite-title">邀请群成员</text> -->
        <view class="invite-wrap">
          <input placeholder="请输入用户名" @input="addFriendNameFun"
            placeholder-style="color:#CFCFCF;line-height:40px;font-size:14px;" auto-focus />
          <button style="background: #0091ff; width: 100px" type="primary" @tap="addGroupMembers">
            发送邀请
          </button>
        </view>
      </view>
      <view class="group-name">
        <text class="pd-10">群名称</text>
        <text class="item-name">{{ groupName }}</text>
      </view>
      <view class="group-name">
        <text class="pd-10">群简介</text>
        <view class="item-name">{{ groupDec }}</view>
      </view>
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
import Image from "../../components/chat/inputbar/suit/image/image.vue";
var WebIM = require("../../utils/WebIM")["default"];
let disp = require("../../utils/broadcast");
//event function name
let onGroupSettingPageLeaveGroup;
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
      groupCount: "",
      //群人数
      addFriendName: [],
      isOwner: false,
    };
  },

  components: {},
  onLoad: function (options) {
    this.setData({
      roomId: JSON.parse(options.groupInfo).roomId,
      groupName: JSON.parse(options.groupInfo).groupName,
      currentName: JSON.parse(options.groupInfo).myName,
    });
    disp.on("em.group.leaveGroup", this.onGroupSettingPageLeaveGroup); // console.log(this.data.roomId, this.data.groupName, this.data.currentName);
    // 获取群成员
    this.getGroupMember(); // 获取群信息
    this.getGroupInfo();
  },
  onUnload(){
    disp.off("em.group.leaveGroup",this.onGroupSettingPageLeaveGroup);
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
        success: function (resp) {
          if (resp && resp.data) {
            me.setData({
              groupMember: resp.data,
              groupCount: resp.count,
            });
          }
        },
        error: function (err) { },
      };
      WebIM.conn.listGroupMember(options);
    },
    getGroupInfo: function () {
      var me = this;
      // 获取群信息
      var options = {
        groupId: this.roomId,
        success: function (resp) {
          if (resp && resp.data) {
            me.setData({
              curOwner: resp.data[0].owner,
              groupDec: resp.data[0].description,
            });

            if (me.currentName == resp.data[0].owner) {
              me.setData({
                isOwner: true,
              });
            }
          }
        },
        error: function () { },
      };
      WebIM.conn.getGroupInfo(options);
    },
    addFriendNameFun: function (e) {
      var firendArr = [];
      firendArr.push(e.detail.value);
      this.setData({
        addFriendName: firendArr,
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
              duration: 2000,
            });
          } else {
            uni.showToast({
              title: "邀请已发出",
              duration: 2000,
            });
          }
          me.getGroupMember();
        },
        error: function (err) {
          uni.showToast({
            title: err.data.error_description,
            icon: "none",
          });
        },
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
              setTimeout(
                () =>
                  uni.navigateBack({
                    url: "../groups/groups?myName=" + me.currentName,
                  }),
                2000
              );
            },
          });
        me.removeLocalStorage(me.roomId)
        },
        error: function (err) {
          uni.showToast({
            title: err.data.error_description,
            icon: "none",
          });
        },
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
              console.log('>>>>>解散群组且跳转至会话列表');
              //发布解散群组事件
              me.removeLocalStorage(me.roomId)
              setTimeout(
                () =>
                  uni.redirectTo({
                    url: "../conversation/conversation",
                  }),
                1000
              );
            },
          });
        },
        error: function (err) {
          uni.showToast({
            title: err.data.error_description,
            icon: "none",
          });
        },
      });
    },
    removeLocalStorage: function (gid) {
     if(!gid) return;
      console.log('>>>>>>>>执行删除本地会话')
      var myName = uni.getStorageSync("myUsername");
      uni.removeStorageSync(gid + myName);
      uni.removeStorageSync("rendered_" + gid + myName);
    },
     /*  disp event callback function */
     onGroupSettingPageLeaveGroup() {
        const pageStack = getCurrentPages(); // 判断是否当前路由是本页
        if (pageStack[pageStack.length - 1].route === this.__route__) {
        this.getGroupMember();
        this.getGroupInfo();
        }
    }
  },
};
</script>
<style>
@import "./groupSetting.css";
</style>