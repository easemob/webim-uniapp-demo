<template>
  <view class="group-wrap">
    <view class="wrap">
      <view class="title-card">
        <image src="/static/images/groupTheme.png"></image>
        <view>
          <p>{{ groupSettingState.groupName }}</p>
          <p style="color: #a3a3a3">{{ groupSettingState.groupDec }}</p>
        </view>
      </view>
      <view class="group-member">
        <view style="padding: 10px">
          <text class="textd-10" style="margin: 5px 0 20px 5px">群组成员</text>
          <text style="float: right">{{ groupSettingState.groupCount }}人</text>
        </view>
      </view>
      <view class="group-member-list">
        <view
          class="member-list"
          v-for="(item, index) in groupSettingState.groupMember"
          :key="index"
        >
          <image
            style="display: inline-block"
            src="/static/images/theme2x.png"
          ></image>
          <text>{{ item.member || item.owner }}</text>
        </view>
      </view>
      <view class="invite-member">
        <!-- <text class="pd-10 invite-title">邀请群成员</text> -->
        <view class="invite-wrap">
          <input
            placeholder="请输入用户名"
            @input="addFriendNameFun"
            placeholder-style="color:#CFCFCF;line-height:40px;font-size:14px;"
            auto-focus
          />
          <button
            style="background: #0091ff; width: 100px"
            type="primary"
            @tap="addGroupMembers"
          >
            发送邀请
          </button>
        </view>
      </view>
      <view class="group-name">
        <text class="pd-10">群名称</text>
        <text class="item-name">{{ groupSettingState.groupName }}</text>
      </view>
      <view class="group-name">
        <text class="pd-10">群简介</text>
        <view class="item-name">{{ groupSettingState.groupDec }}</view>
      </view>
      <view class="bottom-wrap">
        <view class="disband-group" v-if="groupSettingState.isOwner">
          <button type="warn" @tap="dissolveGroup">解散群组</button>
        </view>
        <view class="exit-group" v-if="!groupSettingState.isOwner">
          <button type="warn" @tap="leaveGroup">退出群组</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { reactive } from 'vue';
import { onLoad, onShow, onUnload } from '@dcloudio/uni-app';
import disp from '@/utils/broadcast';
import Image from '../../components/chat/inputbar/suit/image/image.vue';
const WebIM = uni.WebIM;
const groupSettingState = reactive({
  roomId: '',
  // 群id
  groupName: '',
  // 群名称
  currentName: '',
  // 当前用户
  groupMember: [],
  // 群成员
  curOwner: '',
  // 当前群管理员
  groupDec: '',
  // 群描述
  groupCount: '',
  //群人数
  addFriendName: [],
  isOwner: false,
});
onLoad((options) => {
  console.log('JSON.parse(options.groupInfo)', JSON.parse(options.groupInfo));
  groupSettingState.roomId = JSON.parse(options.groupInfo).roomId;
  groupSettingState.groupName = JSON.parse(options.groupInfo).groupName;
  groupSettingState.currentName = JSON.parse(options.groupInfo).myName;
  disp.on('em.group.leaveGroup', onGroupSettingPageLeaveGroup);
  // 获取群成员
  getGroupMember();
  // 获取群信息
  getGroupInfo();
});
const getGroupMember = () => {
  let pageNum = 1,
    pageSize = 1000;
  const options = {
    pageNum: pageNum,
    pageSize: pageSize,
    groupId: groupSettingState.roomId,
    success: function (resp) {
      if (resp && resp.data) {
        groupSettingState.groupMember = resp.data;
        groupSettingState.groupCount = resp.count;
      }
    },
    error: function (err) {},
  };
  WebIM.conn.listGroupMember(options);
};
const getGroupInfo = () => {
  // 获取群信息
  const options = {
    groupId: groupSettingState.roomId,
    success: function (resp) {
      if (resp && resp.data) {
        groupSettingState.curOwner = resp.data[0].owner;
        groupSettingState.groupDec = resp.data[0].description;

        if (groupSettingState.currentName == resp.data[0].owner) {
          groupSettingState.isOwner = true;
        }
      }
    },
    error: function () {},
  };
  WebIM.conn.getGroupInfo(options);
};
const addFriendNameFun = (e) => {
  let firendArr = [];
  firendArr.push(e.detail.value);
  groupSettingState.addFriendName = firendArr;
};
// 加好友入群
const addGroupMembers = () => {
  var option = {
    users: groupSettingState.addFriendName,
    groupId: groupSettingState.roomId,
    success: function () {
      if (
        isExistGroup(
          groupSettingState.addFriendName,
          groupSettingState.groupMember
        )
      ) {
        uni.showToast({
          title: '已在群中',
          duration: 2000,
        });
      } else {
        uni.showToast({
          title: '邀请已发出',
          duration: 2000,
        });
      }
      getGroupMember();
    },
    error: function (err) {
      uni.showToast({
        title: err.data.error_description,
        icon: 'none',
      });
    },
  };
  WebIM.conn.inviteToGroup(option);
};
const isExistGroup = (name, list) => {
  for (let index = 0; index < list.length; index++) {
    if (name == list[index].member || name == list[index].owner) {
      return true;
    }
  }
  return false;
};
const leaveGroup = () => {
  WebIM.conn.quitGroup({
    groupId: groupSettingState.roomId,
    success: function () {
      uni.showToast({
        title: '已退群',
        duration: 2000,
        success: function (res) {
          // redirectTo = 此操作不可返回
          setTimeout(
            () =>
              uni.navigateBack({
                url: '../groups/groups?myName=' + groupSettingState.currentName,
              }),
            2000
          );
        },
      });
      removeLocalStorage(groupSettingState.roomId);
    },
    error: function (err) {
      uni.showToast({
        title: err.data.error_description,
        icon: 'none',
      });
    },
  });
};
const dissolveGroup = () => {
  WebIM.conn.dissolveGroup({
    groupId: groupSettingState.roomId,
    success: function () {
      uni.showToast({
        title: '已解散',
        duration: 2000,
        success: function (res) {
          // redirectTo = 此操作不可返回
          console.log('>>>>>解散群组且跳转至会话列表');
          //发布解散群组事件
          removeLocalStorage(groupSettingState.roomId);
          setTimeout(
            () =>
              uni.redirectTo({
                url: '../conversation/conversation',
              }),
            1000
          );
        },
      });
    },
    error: function (err) {
      uni.showToast({
        title: err.data.error_description,
        icon: 'none',
      });
    },
  });
};
const removeLocalStorage = (gid) => {
  if (!gid) return;
  var myName = uni.getStorageSync('myUsername');
  uni.removeStorageSync(gid + myName);
  uni.removeStorageSync('rendered_' + gid + myName);
};
/*  disp event callback function */
const onGroupSettingPageLeaveGroup = () => {
  getGroupMember();
  getGroupInfo();
};
onUnload(() => {
  disp.off('em.group.leaveGroup', onGroupSettingPageLeaveGroup);
});
</script>
<style>
@import './groupSetting.css';
</style>
