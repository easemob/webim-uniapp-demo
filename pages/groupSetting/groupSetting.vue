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
            v-model.trim="groupSettingState.addFriendName"
            placeholder="请输入用户名"
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
          <button type="warn" @tap="leaveTheGroup">退出群组</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { reactive } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
/* stores */
import { useLoginStore } from '@/stores/login';
import { useGroupStore } from '@/stores/group';
import { useConversationStore } from '@/stores/conversation';
/* im apis */
import { emGroups } from '@/EaseIM/imApis';
import Image from '@/components/emChat/components/inputBar/suit/image';
const groupSettingState = reactive({
  groupid: '',
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
  addFriendName: '',
  isOwner: false,
});
const loginStore = useLoginStore();
onLoad((options) => {
  console.log('>>>>触发onLoad');
  const groupid = JSON.parse(options.groupInfo).groupid;
  groupSettingState.groupid = groupid;
  groupSettingState.currentName = loginStore.loginUserBaseInfos.loginUserId;
  getGroupName(groupid);
  getGroupMember();
  getGroupInfo();
});
const groupStore = useGroupStore();
const {
  getGroupInfosFromServer,
  getGroupMembersFromServer,
  inviteUsersToGroup,
  leaveGroupFromServer,
  destroyGroupFromServer,
} = emGroups();
const getGroupMember = async () => {
  if (groupSettingState.groupid) {
    try {
      const res = await getGroupMembersFromServer(groupSettingState.groupid);
      groupSettingState.groupMember = res;
    } catch (error) {
      console.log('>>>>>群组接口请求失败', error);
    }
  }
};
const getGroupInfo = async () => {
  try {
    const res = await getGroupInfosFromServer(groupSettingState.groupid);
    if (res.length) {
      const { affiliations_count, owner, description } = res[0];
      groupSettingState.curOwner = owner;
      groupSettingState.groupDec = description;
      groupSettingState.groupCount = affiliations_count;
      if (groupSettingState.currentName === owner) {
        groupSettingState.isOwner = true;
      }
    }
  } catch (error) {
    console.log('>>>>群组详情获取失败', error);
  }
};
//获取群id对应的群组名
const getGroupName = (groupid) => {
  if (groupStore.joinedGroupList.length) {
    groupStore.joinedGroupList.forEach((group) => {
      if (group.groupid == groupid) {
        groupSettingState.groupName = group.groupname;
      }
    });
  }
};
// 加好友入群
const addGroupMembers = async () => {
  try {
    await inviteUsersToGroup(groupSettingState.groupid, [
      groupSettingState.addFriendName,
    ]);
    uni.showToast({
      title: '邀请已发出',
      duration: 2000,
    });
  } catch (error) {
    console.log('>>>>>邀请失败', error);
    if (
      error.data.error_description &&
      error.data.error_description.includes("doesn't exist!")
    ) {
      uni.showToast({
        title: '该用户不存在',
        duration: 2000,
      });
    } else if (
      error.data.error_description &&
      error.data.error_description.includes('already in group')
    ) {
      uni.showToast({
        title: '该用户已在群组中',
        duration: 2000,
      });
    } else {
      uni.showToast({
        title: '邀请失败',
        duration: 2000,
      });
    }
  }
};
/* 退群解散群逻辑 */
//会话列表
const conversationStore = useConversationStore();
//主动退出群组
const leaveTheGroup = async () => {
  console.log('>>>>>触发了退出群组');
  if (!groupSettingState.groupid) return;
  try {
    await leaveGroupFromServer(groupSettingState.groupid);
    uni.showToast({
      title: '退出群组成功',
      duration: 2000,
    });
    await groupStore.removeGroup(groupSettingState.groupid);
    //删除该群相关会话
    await conversationStore.deleteConversation(groupSettingState.groupid);
    uni.reLaunch({
      url: '../home/index',
    });
  } catch (error) {
    console.log('>>>>>退出群组失败', error);
    uni.showToast({
      title: '退出群组失败',
      duration: 2000,
    });
  }
};
//解散群组
const dissolveGroup = async () => {
  if (groupSettingState.isOwner && groupSettingState.groupid) {
    try {
      await destroyGroupFromServer(groupSettingState.groupid);
      await groupStore.removeGroup(groupSettingState.groupid);
      //删除该群相关会话
      await conversationStore.deleteConversation(groupSettingState.groupid);
      uni.showToast({
        title: '解散群组成功',
        duration: 2000,
      });
      uni.reLaunch({
        url: '../groups/groups',
      });
    } catch (error) {
      uni.showToast({
        title: '群组解散失败',
        icon: 'none',
      });
    }
  }
};
</script>
<style>
@import './groupSetting.css';
</style>
