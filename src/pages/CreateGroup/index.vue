<template>
  <view class="create-group-wrap">
    <view class="content">
      <view class="input-wrap">
        <view class="label">{{ $t("groupName") }}</view>
        <input v-model="groupName" :placeholder="$t('groupNamePlaceholder')" />
      </view>
      <view class="input-wrap">
        <view class="label">{{ $t("groupDesc") }}</view>
        <input v-model="groupDesc" :placeholder="$t('groupDescPlaceholder')" />
      </view>
      <view class="label">{{ $t("publicGroup") }}</view>
      <switch class="switch" :checked="isPublicGroup" @change="switchChange" />
      <view class="label">{{ $t("groupMember") }}</view>
      <checkbox-group class="uni-list" @change="checkboxChange">
        <label
          class="uni-list-cell uni-list-cell-pd"
          v-for="item in contactStore.contacts"
          :key="item.userId"
        >
          <view>
            <checkbox :value="item.userId"></checkbox>
          </view>
          <view class="user-item-wrap">
            <Avatar
              :src="getUserInfoFromStore(item.userId).avatar"
              :placeholder="defaultAvatar"
            />
            <view class="user-name ellipsis">{{
              getUserInfoFromStore(item.userId).name
            }}</view>
          </view>
        </label>
      </checkbox-group>
      <button
        class="create-btn"
        @tap="newGroup"
        :disabled="checkedUserIdList.length === 0"
      >
        {{ $t("createGroup") }}
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
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const contactStore = useContactStore();

const appUserStore = useAppUserStore();

const { getUserInfoFromStore } = appUserStore;

const { createGroup } = useGroupStore();

const checkedUserIdList = ref<string[]>([]);

const groupName = ref("");

const groupDesc = ref("");

const isPublicGroup = ref(true);

const checkboxChange = (e: any) => {
  checkedUserIdList.value = e.detail.value;
};

const switchChange = (e: any) => {
  isPublicGroup.value = e.detail.value;
};

const newGroup = () => {
  if (groupName.value === "") {
    groupName.value = contactStore.contacts
      .filter((item) => {
        return checkedUserIdList.value.includes(item.userId);
      })
      .map((item) => {
        return getUserInfoFromStore(item.userId).name;
      })
      .join(",");
  }

  if (groupDesc.value === "") {
    groupDesc.value = `group desc`;
  }

  createGroup({
    data: {
      groupname: groupName.value,
      members: checkedUserIdList.value,
      desc: groupDesc.value,
      public: isPublicGroup.value,
      allowinvites: true,
      inviteNeedConfirm: false,
      approval: false, // 无需审批即可加入群组
      maxusers: 500
    }
  })
    .then(() => {
      uni.showToast({
        icon: "none",
        title: t("createGroupSuccess"),
        duration: 2000
      });
      const timer = setTimeout(() => {
        uni.navigateBack();
        clearTimeout(timer);
      }, 1000);
    })
    .catch((e) => {
      uni.showToast({
        icon: "none",
        title: e.message
      });
    });
};
</script>

<style lang="scss" scoped>
@import url("./style.scss");
</style>
