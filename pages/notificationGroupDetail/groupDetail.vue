<template>
  <view class="inform">
    <text class="defaultText" v-if="!groupsInformNoticList.length"
      >暂时没有新的通知</text
    >

    <view
      v-for="(item, index) in groupsInformNoticList"
      :key="index"
      class="itemBar"
    >
      <template v-if="item.showBtn">
        <view class="notInfoDetContent">
          <view class="headContent">
            <image src="/static/images/theme2x.png"></image>
          </view>
          <view class="infoContent">
            <text class="itemName">{{ item.from }}</text>
            <text>邀请您加入{{ item.name }}群</text>
          </view>
        </view>
        <view class="buttonContent">
          <view
            v-if="!item.handleText"
            :data-from="item.id"
            class="rejectBtn"
            @tap="rejectJoinTheGroup(item)"
            >拒绝</view
          >
          <view v-if="!item.handleText" class="centerLine"></view>
          <view
            v-if="!item.handleText"
            :data-from="item.id"
            class="agreeBtn"
            @tap="agreeJoinTheGroup(item)"
            >同意</view
          >
          <view v-if="item.handleText" class="actionDone">{{
            item.handleText
          }}</view>
        </view>
      </template>
      <template v-else>
        <view class="notInfoDetContent">
          <view class="headContent">
            <image src="/static/images/theme2x.png"></image>
          </view>
          <view class="infoContent">
            <text class="itemName">{{ item.from }}</text>
            <text>其他群组系统通知</text>
          </view>
        </view>
      </template>
    </view>
  </view>
</template>

<script>
/* im apis */
import { emGroups } from '@/EaseIM/emApis';
const { acceptGroupInvite, rejectGroupInvite } = emGroups();
export default {
  data() {
    return {
      groupList: [],
    };
  },
  computed: {
    groupsInformNoticList() {
      return this.$store.state.InformStore.informData.groupsInform;
    },
    loginUserId() {
      return this.$store.state.LoginStore.loginUserBaseInfos.loginUserId;
    },
  },
  onShow() {
    uni.hideHomeButton && uni.hideHomeButton();
  },
  methods: {
    async agreeJoinTheGroup(sourceItem) {
      try {
        await acceptGroupInvite(this.loginUserId, sourceItem.id);
        sourceItem.isHandled = true;
        sourceItem.handleText = '已同意入群';
        //同意入群后再调用加入的群组列表
        this.$store.dispatch('fetchJoinedGroupList');
      } catch (error) {
        console.log('>>>>>>同意入群失败', error.data.error_description);
        if (error?.data?.error_description.includes('not exist!')) {
          sourceItem.isHandled = true;
          sourceItem.handleText = '该群已解散';
        } else {
          uni.showToast({ title: '操作失败', icon: 'none' });
        }
      }
    },
    async rejectJoinTheGroup(sourceItem) {
      try {
        await rejectGroupInvite(this.loginUserId, sourceItem.id);
        sourceItem.isHandled = true;
        sourceItem.handleText = '拒绝加入此群';
      } catch (error) {
        uni.showToast({ title: '操作失败', icon: 'none' });
      }
    },
  },
};
</script>
<style>
@import './groupDetail.css';
</style>
