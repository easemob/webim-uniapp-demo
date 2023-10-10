<template>
  <!-- 创建群组 -->
  <view class="createGroup">
    <!-- 群组名称 -->
    <view class="create_input">
      <view>
        <input
          v-model.trim="groupName"
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
          v-model="groupDec"
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
            v-for="(userId, index) in friendList"
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

<script>
/* im api */
import { emGroups } from '@/EaseIM/emApis';
const { createNewGroup } = emGroups();
export default {
  data() {
    return {
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
    };
  },
  computed: {
    loginUserId() {
      return this.$store.state.LoginStore.loginUserBaseInfos.loginUserId;
    },
    //好友列表
    friendUserIdList() {
      return this.$store.state.ContactsStore.friendList;
    },
  },
  onLoad: function () {
    this.owner = this.loginUserId;
  },
  onShow: function () {
    this.friendList = this.friendUserIdList;
  },
  methods: {
    inviteFriendFun: function (e) {
      this.inviteFriend = e.detail.value;
    },
    // 创建群组
    async createGroup() {
      if (!this.groupName.trim()) {
        uni.showModal({
          title: '请输入群名',
          confirmText: 'OK',
          showCancel: false,
        });
        return;
      }
      try {
        const params = {
          groupname: this.groupName,
          desc: this.groupDec,
          members: this.inviteFriend,
          public: this.allowJoin,
        };
        const res = await createNewGroup(params);
        await uni.showToast({
          title: '新建群组成功！',
          duration: 2000,
        });
        this.addNewGroupToLocalList(res.groupid);
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
    },
    addNewGroupToLocalList(groupid) {
      const newGroup = {
        groupname: this.groupName,
        groupid: groupid,
        disabled: false,
      };
      this.$store.commit('ADD_NEW_JOINEND_GROUP', newGroup);
    },
  },
};
</script>
<style>
@import './addNewGroups.css';
</style>
