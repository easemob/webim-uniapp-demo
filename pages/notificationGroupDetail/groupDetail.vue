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
            @tap="rejectJoinTheGroup(item, index)"
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
        <view class="notInfoDetContent" @click="readedTheInform(index)">
          <view class="headContent">
            <image src="/static/images/theme2x.png"></image>
          </view>
          <view class="infoContent">
            <text class="itemName">{{ item.from }}</text>
            <text>其他群组系统通知</text>
          </view>
          <view v-if="!item.isHandled" class="notInfoDetContent_bage"> </view>
        </view>
      </template>
    </view>
  </view>
</template>

<script>
/* im apis */
import { emGroups } from '@/EaseIM/emApis';
import { INFORM_TYPE } from '@/EaseIM/constant';
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
      let informData = { ...sourceItem };
      try {
        await acceptGroupInvite(this.loginUserId, sourceItem.id);
        informData.isHandled = true;
        informData.handleText = '已同意入群';
        this.$store.commit('CHANGE_INFORM', {
          informType: INFORM_TYPE.GROUPS,
          informParams: informData,
          index,
        });
        //同意入群后再调用加入的群组列表
        this.$store.dispatch('fetchJoinedGroupList');
      } catch (error) {
        console.log('>>>>>>同意入群失败', error.data.error_description);
        if (error?.data?.error_description.includes('not exist!')) {
          informData.isHandled = true;
          informData.handleText = '该群已解散';
          this.$store.commit('CHANGE_INFORM', {
            informType: INFORM_TYPE.GROUPS,
            informParams: informData,
            index,
          });
        } else {
          uni.showToast({ title: '操作失败', icon: 'none' });
        }
      }
    },
    async rejectJoinTheGroup(sourceItem) {
      let informData = { ...sourceItem };
      try {
        await rejectGroupInvite(this.loginUserId, sourceItem.id);
        informData.isHandled = true;
        informData.handleText = '拒绝加入此群';
        this.$store.commit('CHANGE_INFORM', {
          informType: INFORM_TYPE.GROUPS,
          informParams: informData,
          index,
        });
      } catch (error) {
        uni.showToast({ title: '操作失败', icon: 'none' });
      }
    },
    readedTheInform(index) {
      this.$store.commit('READED_INFROM', {
        index,
      });
    },
  },
};
</script>
<style>
@import './groupDetail.css';
</style>
