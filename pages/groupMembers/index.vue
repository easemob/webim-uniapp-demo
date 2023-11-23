<template>
  <view>
    <u-navbar
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :left-text="navbarLeftText"
      :autoBack="true"
    >
      <u-icon
        slot="right"
        size="24"
        name="/static/images/new_ui/contacts/add_contacts.png"
        @click="entryAddContactsPage"
      ></u-icon>
      <u-icon
        slot="right"
        size="24"
        name="/static/images/new_ui/contacts/del_contacts.png"
        @click="entryAddContactsPage"
      ></u-icon>
    </u-navbar>
    <view> </view>
  </view>
</template>

<script>
import { emGroups } from '@/EaseIM/emApis';
import { GROUP_MEMEBERS_SHOW_TYPE } from '@/constant';
const { listGroupMembersFromServer } = emGroups();
export default {
  data() {
    return {
      GROUP_MEMEBERS_SHOW_TYPE,
      pageNum: 1,
      pageSize: 10,
      groupId: '',
      groupMembersShowType: GROUP_MEMEBERS_SHOW_TYPE.READ_ONLY,
    };
  },
  onLoad(options) {
    this.groupId = options.groupId;
    this.groupMembersShowType = options.groupMembersShowType;
    console.log('>>>>groupMembersProfileList', this.groupMembersProfileList);
    if (!this.groupMembersProfileList) {
      this.fetchInGroupMembers();
    }
  },
  computed: {
    navbarLeftText() {
      if (this.groupMembersShowType === GROUP_MEMEBERS_SHOW_TYPE.READ_ONLY) {
        return `群成员`;
      } else if (
        this.groupMembersShowType === GROUP_MEMEBERS_SHOW_TYPE.TRANSFER_OWNER
      ) {
        return '选择新群主 ';
      } else {
        return '群成员';
      }
    },
    groupMembersCount() {},
    groupMembersProfileList() {
      return this.$store.getters.groupMembersProfile[this.groupId];
    },
  },
  methods: {
    async fetchInGroupMembers() {
      if (!this.groupId) return;
      const params = {
        groupId: this.groupId,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      console.log('>>>>>开始调用params', params);

      const result = await listGroupMembersFromServer({ ...params });

      const memberList = result.map((item) => item.member || item.owner);
      this.$store.dispatch('fetchGroupMembersProfile', {
        groupId: this.groupId,
        memberList,
      });
      if (result.length < this.pageSize) return;
      this.pageNum += 1;
      this.fetchInGroupMembers();

      try {
        // this.$store.dispatch('fetchGroupMembersProfile', params);
      } catch (error) {}
    },
  },
};
</script>

<style scoped></style>
