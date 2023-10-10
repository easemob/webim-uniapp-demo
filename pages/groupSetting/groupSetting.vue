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
        <view style="padding: 10px">
          <text class="textd-10" style="margin: 5px 0 20px 5px">群组成员</text>
          <text style="float: right">{{ groupCount }}人</text>
        </view>
      </view>
      <view class="group-member-list">
        <view
          class="member-list"
          v-for="(item, index) in groupMember"
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
            v-model.trim="addFriendName"
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
          <button type="warn" @tap="leaveTheGroup">退出群组</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
/* im apis */
import { emGroups } from '@/EaseIM/emApis';
import { CHAT_TYPE } from '@/EaseIM/constant';
const {
  getGroupInfosFromServer,
  getGroupMembersFromServer,
  inviteUsersToGroup,
  leaveGroupFromServer,
  destroyGroupFromServer,
} = emGroups();
export default {
  data() {
    return {
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
    };
  },

  computed: {
    loginUserId() {
      return this.$store.state.LoginStore.loginUserBaseInfos.loginUserId;
    },
    joinedGroupList() {
      return this.$store.state.GroupStore.joinedGroupList;
    },
  },
  onLoad: function (options) {
    const groupid = JSON.parse(options.groupInfo).groupid;
    this.groupid = groupid;
    this.currentName = this.loginUserId;
    this.getGroupName(groupid);
    this.getGroupMember();
    this.getGroupInfo();
  },
  methods: {
    async getGroupMember() {
      if (this.groupid) {
        try {
          const res = await getGroupMembersFromServer(this.groupid);
          this.groupMember = res;
        } catch (error) {
          console.log('>>>>>群组接口请求失败', error);
        }
      }
    },
    async getGroupInfo() {
      try {
        const res = await getGroupInfosFromServer(this.groupid);
        if (res.length) {
          const { affiliations_count, owner, description } = res[0];
          this.curOwner = owner;
          this.groupDec = description;
          this.groupCount = affiliations_count;
          if (this.currentName === owner) {
            this.isOwner = true;
          }
        }
      } catch (error) {
        console.log('>>>>群组详情获取失败', error);
      }
    },
    //获取群id对应的群组名
    getGroupName(groupid) {
      if (this.joinedGroupList.length) {
        this.joinedGroupList.forEach((group) => {
          if (group.groupid == groupid) {
            this.groupName = group.groupname;
          }
        });
      }
    },
    addFriendNameFun: function (e) {
      var firendArr = [];
      firendArr.push(e.detail.value);
      this.setData({
        addFriendName: firendArr,
      });
    },
    // 加好友入群
    async addGroupMembers() {
      try {
        await inviteUsersToGroup(this.groupid, [this.addFriendName]);
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
    },
    /* 退群解散群逻辑 */
    //主动退出群组
    async leaveTheGroup() {
      console.log('>>>>>触发了退出群组');
      if (!this.groupid) return;
      try {
        await leaveGroupFromServer(this.groupid);
        uni.showToast({
          title: '退出群组成功',
          duration: 2000,
        });
        this.$store.commit('DELETE_JOINEND_GROUP', this.groupid);
        //删除该群相关会话
        await this.$store.dispatch('deleteConversation', {
          conversationId: this.groupid,
          conversationType: CHAT_TYPE.GROUP_CHAT,
        });
        uni.reLaunch({
          url: '../home/home?page=contacts',
        });
      } catch (error) {
        console.log('>>>>>退出群组失败', error);
        uni.showToast({
          title: '退出群组失败',
          duration: 2000,
        });
      }
    },
    //解散群组
    async dissolveGroup() {
      if (this.isOwner && this.groupid) {
        try {
          await destroyGroupFromServer(this.groupid);
          this.$store.commit('DELETE_JOINEND_GROUP', this.groupid);
          //删除该群相关会话
          await this.$store.dispatch('deleteConversation', {
            conversationId: this.groupid,
            conversationType: CHAT_TYPE.GROUP_CHAT,
          });
          uni.showToast({
            title: '解散群组成功',
            duration: 2000,
          });
          uni.reLaunch({
            url: '../home/home?page=contacts',
          });
        } catch (error) {
          console.log('>>>>>error: ', error);
          uni.showToast({
            title: '群组解散失败',
            icon: 'none',
          });
        }
      }
    },
  },
};
</script>
<style>
@import './groupSetting.css';
</style>
