<template>
  <!-- 创建群组 -->
  <view class="createGroup">
    <!-- 群组名称 -->
    <view class="create_input">
      <view>
        <input
          v-model.trim="addGroupsState.groupName"
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
          v-model="addGroupsState.groupDec"
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
import { reactive, watchEffect } from 'vue';
import { onLoad, onShow, onUnload } from '@dcloudio/uni-app';
/* stores */
import { useLoginStore } from '@/stores/login';
import { useContactsStore } from '@/stores/contacts';
import { useGroupStore } from '@/stores/group';
/* im api */
import { emGroups } from '@/EaseIM/imApis';
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
const contactsStore = useContactsStore();
watchEffect(() => {
  addGroupsState.friendList = contactsStore.friendList;
});
const loginStore = useLoginStore();
onLoad(() => {
  addGroupsState.owner = loginStore.loginUserBaseInfos.loginUserId;
});

const inviteFriendFun = (e) => {
  addGroupsState.inviteFriend = e.detail.value;
};

// 创建群组

const { createNewGroup } = emGroups();
const createGroup = async () => {
  if (!addGroupsState.groupName.trim()) {
    uni.showModal({
      title: '请输入群名',
      confirmText: 'OK',
      showCancel: false,
    });
    return;
  }
  try {
    const params = {
      groupname: addGroupsState.groupName,
      desc: addGroupsState.groupDec,
      members: addGroupsState.inviteFriend,
      public: addGroupsState.allowJoin,
    };
    const res = await createNewGroup(params);
    await uni.showToast({
      title: '新建群组成功！',
      duration: 2000,
    });
    addNewGroupToLocalList(res.groupid);
    uni.redirectTo({
      url: '../groups/groups',
    }),
      console.log('>>>>群组创建成功');
  } catch (error) {
    console.log('error', error);
    uni.showToast({
      title: '群组创建失败，请稍后重试！',
      icon: 'none',
    });
  }
};
//群组列表新增一条数据
const groupStore = useGroupStore();
const addNewGroupToLocalList = (groupid) => {
  const newGroup = {
    groupname: addGroupsState.groupName,
    groupid: groupid,
    disabled: false,
  };
  groupStore.addNewGroup(newGroup);
};
</script>
<style>
@import './addGroups.css';
</style>
