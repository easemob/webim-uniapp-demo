<template>
  <view class="inform">
    <text class="defaultText" v-if="!contactsInformNoticList.length"
      >暂时没有新的通知</text
    >

    <view
      v-for="(item, index) in contactsInformNoticList"
      :key="index"
      class="itemBar"
    >
      <!-- 需要按钮处理类型通知 -->
      <template v-if="item.showBtn">
        <view class="notInfoDetContent">
          <view class="headContent">
            <image src="/static/images/theme2x.png"></image>
          </view>
          <view class="infoContent">
            <text class="itemName">{{ item.from }}</text>
            <text v-show="item.type === 'subscribe'">申请添加您为好友</text>
          </view>
        </view>
        <view class="buttonContent">
          <view
            v-if="!item.handleText"
            :data-from="item.from"
            class="rejectBtn"
            @tap="rejectApply(item)"
            >拒绝</view
          >
          <view v-if="!item.handleText" class="centerLine"></view>
          <view
            v-if="!item.handleText"
            :data-from="item.from"
            class="agreeBtn"
            @tap="agreeApply(item)"
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
            <text>其他系统通知</text>
          </view>
        </view>
      </template>
    </view>
  </view>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { onLoad, onShow, onUnload } from '@dcloudio/uni-app';
/* stores */
import { useInformStore } from '@/stores/inform';
import { useContactsStore } from '@/stores/contacts';
/* im apis */
import { emContacts, emUserInfos } from '@/EaseIM/imApis';
const friendDetailState = reactive({
  friendList: [],
  myName: '',
});
const informStore = useInformStore();
const contactsInformNoticList = computed(() => {
  return informStore.informData.contactsInform;
});

onShow(() => {
  uni.hideHomeButton && uni.hideHomeButton();
});
const contactsStore = useContactsStore();
const {
  fetchContactsListFromServer,
  acceptContactInvite,
  declineContactInvite,
} = emContacts();
const { fetchOtherInfoFromServer } = emUserInfos();
const agreeApply = async (sourceItem) => {
  // 同意（无回调）
  //此处直接取的stores中的对象引用，因此直接进行了修改，同时引用对象中的内容也同步进行了变化。
  acceptContactInvite(sourceItem.from);
  sourceItem.type = 'subscribed';
  sourceItem.handleText = '已同意';
  sourceItem.isHandled = true;
  uni.showToast({
    title: '已同意对方的好友申请',
    icon: 'none',
  });
  //调用好友接口并更新好友列表以及用户属性等数据。
  const friendList = await fetchContactsListFromServer();
  await contactsStore.setFriendList(friendList);
  if (friendList.length) {
    //获取好友用户属性
    const friendProfiles = await fetchOtherInfoFromServer(friendList);
    contactsStore.setFriendUserInfotoMap(friendProfiles);
  }
};

const rejectApply = (sourceItem) => {
  declineContactInvite(sourceItem.from);
  sourceItem.type = 'unsubscribed';
  sourceItem.handleText = '已拒绝';
  sourceItem.isHandled = true;
  uni.showToast({
    title: '已拒绝对方的好友申请',
    icon: 'none',
  });
};
</script>
<style>
@import './friendDetail.css';
</style>
