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

<script setup>
import { ref, computed } from 'vue';
import { onShow } from '@dcloudio/uni-app';
/* stores */
import { useLoginStore } from '@/stores/login';
import { useInformStore } from '@/stores/inform';
import { useGroupStore } from '@/stores/group';
/* im apis */
import { emGroups } from '@/EaseIM/imApis';

let groupList = ref([]);
const informStore = useInformStore();
const groupsInformNoticList = computed(() => {
  return informStore.informData.groupsInform;
});
onShow(() => {
  uni.hideHomeButton && uni.hideHomeButton();
});

const loginStore = useLoginStore();
const groupStore = useGroupStore();
const { fetchJoinedGroupListFromServer, acceptGroupInvite, rejectGroupInvite } =
  emGroups();
const agreeJoinTheGroup = async (sourceItem) => {
  try {
    await acceptGroupInvite(
      loginStore.loginUserBaseInfos.loginUserId,
      sourceItem.id
    );
    sourceItem.isHandled = true;
    sourceItem.handleText = '已同意入群';
    //同意入群后再调用加入的群组列表
    const joinedGroupList = await fetchJoinedGroupListFromServer();
    joinedGroupList.length &&
      (await groupStore.setJoinedGroupList(joinedGroupList));
  } catch (error) {
    console.log('>>>>>>同意入群失败', error.data.error_description);
    if (error?.data?.error_description.includes('not exist!')) {
      sourceItem.isHandled = true;
      sourceItem.handleText = '该群已解散';
    } else {
      uni.showToast({ title: '操作失败', icon: 'none' });
    }
  }
};
const rejectJoinTheGroup = async (sourceItem) => {
  await rejectGroupInvite(
    loginStore.loginUserBaseInfos.loginUserId,
    sourceItem.id
  );
  sourceItem.isHandled = true;
  sourceItem.handleText = '拒绝加入此群';
};
</script>
<style>
@import './groupDetail.css';
</style>
