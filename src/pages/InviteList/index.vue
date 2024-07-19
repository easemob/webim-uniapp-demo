<template>
  <view class="invite-group-wrap">
    <view class="content">
      <checkbox-group class="uni-list" @change="checkboxChange">
        <label
          class="uni-list-cell uni-list-cell-pd"
          v-for="item in list"
          :key="item.userId"
        >
          <view>
            <checkbox
              :checked="isDisabled(item.userId)"
              :value="item.userId"
              :disabled="isDisabled(item.userId)"
            ></checkbox>
          </view>
          <view class="user-item-wrap">
            <Avatar
              :src="getUserInfoFromStore(item.userId).avatar"
              :placeholder="defaultAvatar"
            />
            <view class="user-name">{{
              getUserInfoFromStore(item.userId).name
            }}</view>
          </view>
        </label>
      </checkbox-group>
      <button
        v-if="inviteType === 'invite'"
        class="opt-btn"
        @tap="inviteUser"
        type="primary"
        :disabled="checkedUserIdList.length === 0"
      >
        {{ $t("inviteUser") }}
      </button>

      <button
        class="opt-btn"
        v-if="inviteType === 'remove'"
        type="warn"
        @tap="removeUser"
        :disabled="checkedUserIdList.length === 0"
      >
        {{ $t("removeUser") }}
      </button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import Avatar from "@/components/avatar/index.vue";
import { useContactStore } from "@/store/contact";
import { useGroupStore } from "@/store/group";
import { useAppUserStore } from "@/store/appUser";
import defaultAvatar from "@/static/images/defaultAvatar.png";
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { onLoad } from "@dcloudio/uni-app";

const contactStore = useContactStore();
const groupStore = useGroupStore();
const { t } = useI18n();
const { inviteJoinGroup, removeUserFromGroup } = groupStore;

const groupId = ref("");

const inviteType = ref<"remove" | "invite">("invite");

const checkedUserIdList = ref<string[]>([]);

const appUserStore = useAppUserStore();

const { getUserInfoFromStore } = appUserStore;

const groupMemberList = computed(() => {
  return groupStore.groupDetailMap
    .get(groupId.value)
    ?.affiliations.map((item) => {
      return {
        //@ts-ignore
        userId: item?.owner || item?.member
      };
    });
});

const checkboxChange = (e: any) => {
  checkedUserIdList.value = e.detail.value;
};

const list = computed(() => {
  if (inviteType.value === "remove") {
    return groupMemberList.value?.filter((member) => {
      return (
        // 群主不可移出
        member.userId !== groupStore.groupDetailMap.get(groupId.value)?.owner
      );
    });
  } else {
    return contactStore.contacts;
  }
});

const isDisabled = (userId: string) => {
  if (inviteType.value === "remove") {
    return false;
  } else {
    return !!groupMemberList.value?.find((member) => member.userId === userId);
  }
};

const inviteUser = async () => {
  try {
    await inviteJoinGroup(groupId.value, checkedUserIdList.value);
    uni.showToast({
      title: t("requestSended"),
      icon: "success",
      duration: 2000
    });
    const timer = setTimeout(() => {
      uni.navigateBack();
      clearTimeout(timer);
    }, 1000);
  } catch (error) {
    console.error(error);
  }
};

const removeUser = async () => {
  try {
    await removeUserFromGroup(groupId.value, checkedUserIdList.value);
    uni.showToast({
      title: t("requestSended"),
      icon: "success",
      duration: 2000
    });
    const timer = setTimeout(() => {
      uni.navigateBack();
      clearTimeout(timer);
    }, 1000);
  } catch (error) {
    console.error(error);
  }
};

onLoad(async (option) => {
  groupId.value = option?.id;
  inviteType.value = option?.type;
});
</script>

<style lang="scss" scoped>
@import url("./style.scss");
</style>
