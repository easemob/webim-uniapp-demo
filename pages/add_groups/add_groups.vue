<template>
  <!-- 创建群组 -->
  <view class="createGroup">
    <!-- 群组名称 -->
    <view class="create_input">
      <view>
        <input
          @input="getGroupName"
          placeholder="群名称"
          placeholder-style="line-height:20px;font-size:12px;"
          auto-focus
        />
      </view>
    </view>
    <!-- 群简介 -->
    <view class="create_textarea">
      <text>群简介</text>
      <view>
        <textarea
          @input="getGroupDec"
          placeholder="添加更多备注信息"
          auto-focus
          placeholder-style="line-height:20px;font-size:12px;"
        ></textarea>
      </view>
    </view>
    <!-- 获取需要邀请的好友列表 -->
    <view class="friend_list">
      <view style="padding: 10px 0; border-top: 10px solid #f2f2f2">
        <text class="invite_text">邀请好友</text>
        <checkbox-group class="checkbox-group" @change="inviteFriendFun">
          <label
            class="checkbox labelStyle"
            v-for="(userId, index) in addGroupsState.friendList"
            :key="index"
          >
            <checkbox :value="userId"></checkbox>
            <image
              src="/static/images/theme2x.png"
              style="height: 40px; width: 40px; margin: 0 5px"
            />
            <text>{{ userId }}</text>
          </label>
        </checkbox-group>
      </view>
    </view>
    <!--  -->
    <view class="create_btn">
      <button style="background: #0091ff" type="primary" @tap="createGroup">
        创建
      </button>
    </view>
  </view>
</template>

<script setup>
import { reactive } from 'vue';
import { onLoad, onShow, onUnload } from '@dcloudio/uni-app';
const WebIM = uni.WebIM;
const addGroupsState = reactive({
  friendList: [],
  // 好友列表
  groupName: '',
  // 群名称
  groupDec: '',
  // 群简介
  allowJoin: true,
  // 是否允许任何人加入
  allowApprove: false,
  // 加入需要审批
  noAllowJoin: false,
  // 不允许任何人加入
  allowInvite: false,
  // 允许群人员邀请
  inviteFriend: [],
  // 需要加好友ID
  owner: '', // = myName
});
onLoad((options) => {
  addGroupsState.owner = JSON.parse(options.owner).myName;
});
onShow(async () => {
  // 获取当前用户的好友信息
  //   WebIM.conn.getContacts({
  //     success: function (roster) {
  //       let member = [];
  //       for (let i = 0; i < roster.length; i++) {
  //         if (roster[i].subscription == 'both') {
  //           member.push(roster[i]);
  //         }
  //       }

  //     },
  //   });
  try {
    const { data } = await WebIM.conn.getContacts();
    if (data.length) {
      uni.setStorage({
        key: 'member',
        data: [...data],
      });
      addGroupsState.friendList = [...data];
    }
  } catch (error) {
    console.log('>>>>>好友列表获取失败', error);
  }
});
const getGroupName = (e) => {
  addGroupsState.groupName = e.detail.value;
};
const getGroupDec = (e) => {
  addGroupsState.groupDec = e.detail.value;
};
const allowJoinFun = (e) => {
  addGroupsState.allowJoin = Boolean(e.detail.value) || false;
};
const allowApproveFun = (e) => {
  addGroupsState.allowApprove = Boolean(e.detail.value) || false;
};
const noAllowJoinFun = (e) => {
  addGroupsState.noAllowJoin = Boolean(e.detail.value) || false;
};
const allowInviteFun = (e) => {
  addGroupsState.allowInvite = Boolean(e.detail.value) || false;
};
const inviteFriendFun = (e) => {
  addGroupsState.inviteFriend = e.detail.value;
};

// 创建群组
const createGroup = () => {
  let allGroups = getApp().globalData.groupList;
  if (!addGroupsState.groupName.trim()) {
    uni.showModal({
      title: '请输入群名',
      confirmText: 'OK',
      showCancel: false,
    });
    return;
  }
  if (
    allGroups.reduce(function (result, v, k) {
      return result || v.name == addGroupsState.groupName;
    }, false)
  ) {
    uni.showModal({
      title: '群名被占用',
      confirmText: 'OK',
      showCancel: false,
    });
    return;
  }

  let options = {
    data: {
      groupname: addGroupsState.groupName,
      desc: addGroupsState.groupDec,
      members: addGroupsState.inviteFriend,
      public: addGroupsState.allowJoin,
      // approval: this.data.allowApprove,
      // allowinvites: this.data.allowInvite,
      owner: addGroupsState.owner,
    },
    success: function (respData) {
      uni.showToast({
        title: '添加成功',
        duration: 2000,
        success: function (res) {
          setTimeout(
            () =>
              uni.redirectTo({
                url:
                  '../groups/groups?myName=' + uni.getStorageSync('myUsername'),
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
  };
  WebIM.conn.createGroupNew(options);
};
// export default {
//   data() {
//     return {

//     };
//   },

//   // components: {Images},
//   props: {},
//   onLoad: function (options) {

//   },
//   onShow: function () {

//   },
//   methods: {

//   }
// };
</script>
<style>
@import './add_groups.css';
</style>
