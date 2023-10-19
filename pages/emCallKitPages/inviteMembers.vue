<template>
  <view class="invite_members_container">
    <uni-data-checkbox
      class="members_checkbox"
      mode="list"
      :localdata="memberList"
      multiple
      v-model="checkedMember"
      >{{
    }}</uni-data-checkbox>
    <button
      class="invite_btn"
      type="primary"
      @click="sendMultiInviteChannelMsg"
    >
      发起邀请
    </button>
  </view>
</template>

<script setup>
import { ref, toRefs, computed, onMounted } from 'vue';
import { CHAT_TYPE } from '@/EaseIM/constant';
import { CALLSTATUS, CALL_TYPES } from '@/components/emCallKit/contants';
import useAgoraChannelStore from '@/components/emCallKit/stores/channelManger';
import { onLoad } from '@dcloudio/uni-app';
import { emInsertInformMessage } from '@/EaseIM/utils';
/* props */
const props = defineProps({
  groupId: {
    type: String,
    default: '',
  },
});
const { groupId } = toRefs(props);
const agoraChannelStore = useAgoraChannelStore();
const emClientInfos = computed(() => {
  return agoraChannelStore.emClientInfos;
});
const channelInfos = computed(
  () => agoraChannelStore.callKitStatus.channelInfos
);
onLoad((option) => {
  packageMembers(option?.groupId);
});
let memberList = ref([]);
const packageMembers = async (groupId) => {
  const resGroupMembers = await agoraChannelStore.getTheGroupMembers(
    groupId || channelInfos.value.groupId
  );
  resGroupMembers.length > 0 &&
    resGroupMembers.map((memberData) => {
      memberList.value.push({
        text: memberData.member || memberData.owner,
        value: memberData.member || memberData.owner,
        disable:
          memberData.member === emClientInfos.value.loginUserId ||
          memberData.owner === emClientInfos.value.loginUserId,
      });
    });
};
let checkedMember = ref([]);
const { insertInformMessage } = emInsertInformMessage();
const sendMultiInviteChannelMsg = async () => {
  if (!checkedMember.value.length) return;
  const localClientStatus = agoraChannelStore.callKitStatus.localClientStatus;

  //多人会议邀请分两种模式，一种为会中邀请一种为首次发起邀请。
  try {
    if (localClientStatus !== CALLSTATUS.idle) {
      await agoraChannelStore.inMultiChanelSendInviteMsg(
        checkedMember.value,
        CALL_TYPES.MULTI_VIDEO
      );
    } else {
      insertInformMessage({
        to: groupId.value,
        chatType: CHAT_TYPE.GROUP_CHAT,
        msg: `您已发起多人通话`,
      });
      await agoraChannelStore.sendInviteMessage(
        checkedMember.value,
        CALL_TYPES.MULTI_VIDEO,
        groupId.value
      );
    }
    uni.showToast({ icon: 'none', title: '邀请已发出正在等待对方加入！' });
    uni.redirectTo({
      url: '/pages/emCallKitPages/multiCall',
    });
  } catch (error) {
    console.log('error', error);
    uni.showToast({ icon: 'none', title: '会议邀请发送失败，请稍后重试！' });
  } finally {
    checkedMember.value = [];
  }
};
</script>

<style>
.invite_members_container {
  padding: 50rpx;
}
.invite_btn {
  margin-top: 100rpx;
}
</style>
