<template>
  <view>
    <view class="contain">
      <view class="build_group" @tap="buildNewGroups">
        <image src="/static/images/invite_theme2x.png"></image>
        <text style="">新建群聊</text>
        <image
          style="margin: 20px 15px"
          class="next2"
          src="/static/images/next2.png"
        ></image>
      </view>
      <!-- 群聊列表 -->
      <view
        v-for="(item, index) in joinedGroupList"
        :key="item.groupid + index"
        class="groupList"
      >
        <view class="info">
          <image
            src="/static/images/groupTheme.png"
            :data-username="item.groupname"
          ></image>
        </view>
        <view
          class="nbr_body"
          :data-username="item.groupname"
          :data-roomid="item.groupid"
          @tap="entryemChat"
        >
          <text :data-username="item.groupname">{{ item.groupname }}</text>
        </view>
        <view
          class="edit"
          @tap="editTheGroup"
          :data-username="item.groupname"
          :data-roomid="item.groupid"
        >
          <image
            src="/static/images/edit.png"
            :data-username="item.groupname"
          ></image>
        </view>
      </view>
    </view>

    <view class="mask" @tap="close_mask" v-if="show_mask"></view>
  </view>
</template>

<script>
import { CHAT_TYPE } from '@/EaseIM/constant';
export default {
  data() {
    return {
      search_btn: true,
      search_friend: false,
      show_mask: false,
      groupList: [],
      // 群聊列表
      myName: '',
    };
  },

  computed: {
    joinedGroupList() {
      return this.$store.state.GroupStore.joinedGroupList;
    },
    loginUserId() {
      return this.$store.state.LoginStore.loginUserBaseInfos.loginUserId;
    },
  },
  methods: {
    entryemChat(params) {
      console.log('>>>>', params);
      const { groupid } = params;
      const chatType = CHAT_TYPE.GROUP_CHAT;
      //   uni.navigateTo({
      //     url: `../emChatContainer/index?targetId=${groupid}&chatType=${chatType}`,
      //   });
    },

    buildNewGroups: function () {
      uni.navigateTo({
        url: '../addNewGroups/addNewGroups',
      });
    },
    editTheGroup: function (event) {
      var nameList = {
        myName: this.loginUserId,
        groupName: event.currentTarget.dataset.username,
        groupid: event.currentTarget.dataset.roomid,
      };
      uni.navigateTo({
        url:
          '../groupSetting/groupSetting?groupInfo=' + JSON.stringify(nameList),
      });
    },
  },
};
</script>
<style>
@import './groups.css';
</style>
