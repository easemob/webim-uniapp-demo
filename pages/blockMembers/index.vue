<template>
  <view>
    <u-navbar
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :left-text="navbarLeftText"
      :autoBack="true"
    >
    </u-navbar>
    <u-empty v-if="!blockUserList.length" text="黑名单列表为空"> </u-empty>
    <view v-else>
      <u-list @scrolltolower="scrolltolower">
        <u-list-item v-for="(blockItem, index) in blockUserList" :key="index">
          <u-cell @click="entryContactsDetailPage(blockItem)">
            <u-avatar
              slot="icon"
              shape="square"
              size="40"
              :src="showFriendAvatar(blockItem)"
              customStyle="margin: -3px 5px -3px 0"
            ></u-avatar>
            <view slot="title">
              <u--text
                :lines="1"
                :text="showFriendNickname(blockItem)"
                iconStyle="margin-left: 2px;"
              ></u--text>
            </view>
          </u-cell>
        </u-list-item>
      </u-list>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      defaultAvatar: "/static/images/new_ui/defaultAvatar.png",
    };
  },
  computed: {
    navbarLeftText() {
      return this.blockUserList.length > 0
        ? `黑名单（${this.blockUserList.length}）`
        : "黑名单";
    },
    blockUserList() {
      return this.$store.getters.blockUserList;
    },
    friendList() {
      return this.$store.state.ContactsStore.friendList;
    },
    friendUserInfoCollection() {
      return this.$store.getters.friendUserInfoCollection;
    },
    //好友头像展示
    showFriendAvatar() {
      return (hxId) => {
        if (
          this.friendUserInfoCollection[hxId] &&
          this.friendUserInfoCollection[hxId]?.avatarurl
        ) {
          return this.friendUserInfoCollection[hxId].avatarurl;
        } else {
          return this.defaultAvatar;
        }
      };
    },
    //好友昵称展示
    // showFriendNickname() {
    //   return (hxId) => {
    //     if (
    //       this.friendUserInfoCollection[hxId] &&
    //       this.friendUserInfoCollection[hxId]?.nickname
    //     ) {
    //       return this.friendUserInfoCollection[hxId].nickname;
    //     } else {
    //       return hxId;
    //     }
    //   };
    // },
    showFriendNickname() {
      return (hxId) => {
        const friend = this.friendList.find((friend) => friend.userId === hxId);
        if (friend) {
          if (friend.remark) {
            return friend.remark;
          } else if (
            this.friendUserInfoCollection[hxId] &&
            this.friendUserInfoCollection[hxId].nickname
          ) {
            return this.friendUserInfoCollection[hxId].nickname;
          } else {
            return hxId;
          }
        } else {
          return hxId;
        }
      };
    },
  },
  methods: {
    scrolltolower() {},
    entryContactsDetailPage(userId) {
      uni.navigateTo({
        url: `../contactsDetail/index?userId=${userId}`,
      });
    },
  },
};
</script>

<style scoped></style>
