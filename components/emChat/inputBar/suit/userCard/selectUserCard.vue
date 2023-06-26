<template>
  <uni-popup ref="selectUserCard" type="dialog">
    <uni-popup-dialog
      title="选择好友名片"
      placeholder="请输入内容"
      @confirm="confirmPicked"
      @close="cannelPick"
    >
      <scroll-view scroll-y="true" class="scroll-Y" @touchmove.stop>
        <uni-data-checkbox
          v-model="selectUserCardState.value"
          :localdata="selectUserCardState.friendList"
          :wrap="true"
        ></uni-data-checkbox>
      </scroll-view>
    </uni-popup-dialog>
  </uni-popup>
</template>

<script setup>
import { ref, reactive, watch, computed } from 'vue';
/* pinia */
import { useContactsStore } from '@/stores/contacts';
const $emits = defineEmits(['sendUserCardMessage', 'changeShowModal']);
const selectUserCardState = reactive({
  friendList: [],
  value: '',
});
const showSelectUserModal = ref(false);
watch(showSelectUserModal, (newVal) => {
  if (newVal) {
    initFriendList();
  }
  handleModal();
});
const selectUserCard = ref(null);
const handleModal = () => {
  if (showSelectUserModal.value) {
    selectUserCard.value.open();
  } else {
    selectUserCard.value.close();
  }
};
const contactsStore = useContactsStore();
const membersList = computed(() => {
  return contactsStore.friendList;
});
const friendInfosMap = computed(() => {
  return contactsStore.friendUserInfoMap;
});
const initFriendList = () => {
  const friendInfos = Object.fromEntries(friendInfosMap.value);
  let friendList = [];
  if (membersList.value.length) {
    for (const userId of membersList.value) {
      const member = {
        text: '',
        value: '',
      };
      member.value = userId;
      if (userId in friendInfos && friendInfos[userId].nickname) {
        member.text = friendInfos[userId].nickname;
      } else {
        member.text = userId;
      }
      console.log('member', member);
      friendList.push(member);
    }
  }
  selectUserCardState.friendList = friendList;
  console.log('friendList', friendList);
};
const confirmPicked = () => {
  console.log('>>>>>触发确认', selectUserCardState.value);
  if (!selectUserCardState.value) {
    uni.showToast({ title: '没有选择好友名片~', icon: 'none' });
  }
  showSelectUserModal.value = false;
  const callback = () => {
    selectUserCardState.value = '';
  };
  $emits('sendUserCardMessage', selectUserCardState.value, callback);
};
const cannelPick = () => {
  showSelectUserModal.value = false;
};
defineExpose({
  showSelectUserModal,
});
</script>
<style lang="scss" scoped>
:deep(.checklist-box) {
  width: 100%;
}
.scroll-Y {
  height: 300rpx;
}
</style>
