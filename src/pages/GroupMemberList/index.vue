<template>
  <view class="group-members-wrap">
    <view class="content">
      <label
        class="uni-list-cell uni-list-cell-pd"
        v-for="item in memberList"
        :key="item.owner || item.member"
      >
        <view class="user-item-wrap">
          <Avatar
            :src="getUserInfoFromStore(item.owner || item.member).avatar"
            :placeholder="defaultAvatar"
          />
          <view class="user-name">{{
            getUserInfoFromStore(item.owner || item.member).name
          }}</view>
        </view>
      </label>
    </view>
    <view class="loadMore" v-if="hasMore" @tap="loadMore">{{
      $t("loadMore")
    }}</view>
  </view>
</template>

<script lang="ts" setup>
import Avatar from "@/components/avatar/index.vue";
import { useGroupStore } from "@/store/group";
import { useAppUserStore } from "@/store/appUser";
import defaultAvatar from "@/static/images/defaultAvatar.png";
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { onLoad } from "@dcloudio/uni-app";
import type { EasemobChat } from "easemob-websdk/Easemob-chat";
import { GET_GROUP_MEMBERS_PAGESIZE } from "@/const/index";

const groupStore = useGroupStore();
const groupId = ref("");
const memberList = ref<EasemobChat.GroupMember[]>([]);
const appUserStore = useAppUserStore();
let pageNum = 1;
const { getUserInfoFromStore, getUsersInfo, appUserInfo } = appUserStore;
const { getGroupMembers } = groupStore;
const hasMore = ref(true);

const listGroupMembers = async () => {
  const res = await getGroupMembers(groupId.value, pageNum);
  const dt = res.data || [];
  memberList.value.push(...dt);
  // 如果返回的数据小于每页的数量，说明没有更多数据了
  if (dt.length < GET_GROUP_MEMBERS_PAGESIZE) {
    hasMore.value = false;
  }
};

// 加载更多
const loadMore = () => {
  pageNum++;
  listGroupMembers();
};

onMounted(() => {
  listGroupMembers();
});

onLoad(async (option) => {
  groupId.value = option?.id;
});
</script>

<style lang="scss" scoped>
@import url("./style.scss");
</style>
