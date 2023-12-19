<template>
  <view>
    <u-navbar
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      left-text="取消"
      :autoBack="true"
    >
      <!-- 添加群成员right -->
      <text
        slot="right"
        @click="actionCreateNewGroup"
        :class="[
          createGroupOptions.members.length
            ? 'edit_save_btn'
            : 'edit_save_btn_gray',
        ]"
      >
        {{
          createGroupOptions.members.length
            ? `创建（${createGroupOptions.members.length}）`
            : '下一步'
        }}
      </text>
    </u-navbar>
    <u-list @scrolltolower="scrolltolower">
      <u-checkbox-group
        v-model="createGroupOptions.members"
        placement="column"
        @change="checkboxChange"
      >
        <u-list-item v-for="friendItem in friendList" :key="friendItem.userId">
          <u-cell>
            <u-checkbox slot="icon" :name="friendItem.userId"> </u-checkbox>
            <u-avatar
              slot="icon"
              shape="square"
              size="40"
              :src="showFriendAvatar(friendItem.userId)"
              customStyle="margin: -3px 5px -3px 0"
            ></u-avatar>
            <view slot="title">
              <u--text
                :lines="1"
                :text="showFriendNickname(friendItem)"
                iconStyle="margin-left: 2px;"
              ></u--text>
            </view>
          </u-cell>
        </u-list-item>
      </u-checkbox-group>
    </u-list>
  </view>
</template>

<script>
import { CHAT_TYPE } from '@/EaseIM/constant';
import { emGroups } from '@/EaseIM/emApis';
const { createNewGroup } = emGroups();
export default {
  data() {
    return {
      createGroupOptions: {
        groupname: '群聊', //群组名称。
        desc: '这是一个私有群', //群组描述。
        members: [], //群成员的用户 ID 组成的数组，不包含群主的用户 ID。
        public: false, //是否为公开群
        allowinvites: false, //是否允许普通群成员邀请人入群
        inviteNeedConfirm: false, //邀请加群时是否需要受邀用户确认
        maxusers: 200, //群组最大成员数，默认为 200。
      },
    };
  },
  computed: {
    //好友列表
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
          return '/static/images/new_ui/defaultAvatar.png';
        }
      };
    },
    //好友昵称展示
    showFriendNickname() {
      return (userItem) => {
        const { userId, remark } = userItem;
        if (remark) {
          return remark;
        }
        if (
          this.friendUserInfoCollection[userId] &&
          this.friendUserInfoCollection[userId]?.nickname
        ) {
          return this.friendUserInfoCollection[userId].nickname;
        } else {
          return userId;
        }
      };
    },
  },
  methods: {
    checkboxChange(newList) {
      this.createGroupOptions.members = [...newList];
    },
    async actionCreateNewGroup() {
      try {
        await createNewGroup(this.createGroupOptions);
        await this.$store.dispatch('fetchJoinedGroupList', {
          isInit: true,
        });
        uni.showToast({
          title: `【${this.createGroupOptions.groupname}】群创建成功`,
          icon: 'none',
          duration: 1000,
        });
        setTimeout(() => {
          uni.navigateBack({
            delta: 1,
          });
        }, 1000);
      } catch {
        uni.showToast({
          title: '创建群失败',
          icon: 'none',
        });
      }
    },
    scrolltolower() {},
  },
};
</script>

<style scoped>
.edit_save_btn,
.edit_save_btn_gray {
  /* label_text */
  height: 18px;
  /* 简体中文/标签/中 */
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  /* identical to box height, or 129% */
  display: flex;
  align-items: center;
  text-align: right;

  /* Primary/5 */
  color: #009eff;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
}
.edit_save_btn_gray {
  color: #acb4b9;
}
</style>
