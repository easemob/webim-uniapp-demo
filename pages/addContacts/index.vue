<template>
  <view>
    <!-- navbar -->
    <u-navbar
      title="联系人"
      :placeholder="true"
      leftIcon="arrow-left"
      :autoBack="true"
    >
      <view slot="center">
        <view class="add_contacts_subsection">
          <u-subsection
            :list="list"
            :current="current"
            @change="sectionChange"
          ></u-subsection>
        </view>
      </view>
    </u-navbar>

    <!-- 添加联系人入口 -->
    <template v-if="!isOpenedSearch">
      <view class="search_container">
        <view class="search_icon_box" @click="isOpenedSearch = true">
          <u-icon
            size="22"
            name="/static/images/new_ui/search_icon.png"
          ></u-icon>
          <text class="search_text" v-if="current === 0">搜索用户环信ID</text>
          <text class="search_text" v-if="current === 1">搜索群组ID</text>
        </view>
      </view>
    </template>
    <!-- 联系人搜索 -->
    <template v-else>
      <!-- 搜索input -->
      <view class="searching_container">
        <u-search
          shape="square"
          :focus="true"
          actionText="取消"
          :actionStyle="{
            color: ' #009EFF',
          }"
          :placeholder="current > 0 ? '搜索群组ID' : '搜索用户环信ID'"
          v-model="searchKeyword"
          @custom="cancelSearch"
          @search="actionSearch"
        ></u-search>
      </view>
      <!-- 搜索结果 -->
      <u-empty v-if="searchResult.length <= 0" mode="search"> </u-empty>
      <u-cell-group v-else :border="false">
        <!-- 好友搜索结果cell -->
        <u-cell v-if="current === 0" :border="false">
          <u-avatar
            slot="icon"
            shape="square"
            size="40"
            :src="
              searchResult[0] && searchResult[0].avatarurl
                ? searchResult[0].avatarurl
                : '/static/images/new_ui/defaultAvatar.png'
            "
            customStyle="margin: -3px 5px -3px 0"
          ></u-avatar>
          <view class="add_contacts_item_title" slot="title">
            <u--text
              class="conversation_item_title_text"
              :lines="1"
              :text="
                searchResult[0] && searchResult[0].nickname
                  ? searchResult[0].nickname
                  : '未知昵称'
              "
              iconStyle="margin-left: 2px;"
            >
            </u--text>
          </view>
          <u--text
            slot="label"
            size="14"
            color="#75828a"
            :lines="1"
            :text="`环信ID：${searchResult[0].userId}`"
          ></u--text>
          <view slot="value">
            <u-button
              size="mini"
              type="primary"
              :disabled="searchResult[0] && searchResult[0].sendAddMsg"
              :text="
                searchResult[0] && searchResult[0].sendAddMsg
                  ? '添加中'
                  : '添加'
              "
              @click="addFriend"
            ></u-button>
          </view>
        </u-cell>
        <!-- 群组搜索结果cell -->
        <u-cell v-if="current === 1" :border="false">
          <u-avatar
            slot="icon"
            shape="square"
            size="40"
            src="/static/images/new_ui/defaultGroupAvatar.png"
            customStyle="margin: -3px 5px -3px 0"
          ></u-avatar>
          <view class="add_contacts_item_title" slot="title">
            <u--text
              class="conversation_item_title_text"
              :lines="1"
              :text="
                searchResult[0] && searchResult[0].name
                  ? searchResult[0].name
                  : '未知群名'
              "
              iconStyle="margin-left: 2px;"
            >
            </u--text>
          </view>
          <view slot="label">
            <u--text
              size="14"
              color="#75828a"
              :lines="1"
              :text="`群组ID：${searchResult[0].id}`"
            ></u--text>
          </view>

          <view slot="value">
            <u-button
              size="mini"
              type="primary"
              :disabled="searchResult[0] && searchResult[0].sendAddMsg"
              :text="
                searchResult[0] && searchResult[0].joined
                  ? '发消息'
                  : searchResult[0] && searchResult[0].sendAddMsg
                  ? '申请中'
                  : '加入'
              "
              @click="applyJoinGroup"
            ></u-button>
          </view>
        </u-cell>
      </u-cell-group>
    </template>
    <u-toast ref="uToast"></u-toast>
  </view>
</template>

<script>
import { emContacts, emUserInfos, emGroups } from '@/EaseIM/emApis';
const { addContactFromServer } = emContacts();
const { fetchOtherInfoFromServer } = emUserInfos();
const { getGroupInfosFromServer, joinPublicGroup } = emGroups();
export default {
  data() {
    return {
      isOpenedSearch: false,
      list: ['找人', '找群'],
      current: 0,
      searchKeyword: '',
      searchResult: [],
    };
  },
  computed: {
    friendList() {
      return this.$store.state.ContactsStore.friendList;
    },
    groupList() {
      return this.$store.state.GroupStore.joinedGroupList;
    },
    loginUserId() {
      return this.$store.state.LoginStore.loginUserBaseInfos.loginUserId;
    },
  },
  methods: {
    sectionChange(index) {
      console.log(`当前选中第${index + 1}个选项`);
      this.current = index;
    },
    cancelSearch() {
      this.isOpenedSearch = false;
      this.searchKeyword = '';
      this.searchResult = [];
    },
    checkoutSearchKeyword(type) {
      if (type === 'friend') {
        if (this.searchKeyword == '') {
          this.$refs.uToast.show({ message: '请输入要添加的用户！' });
          return false;
        } else if (this.searchKeyword.toLowerCase() === this.loginUserId) {
          this.$refs.uToast.show({ message: '不可添加自己为好友！' });
          return false;
        } else if (
          this.friendList.some((i) => i.userId === this.searchKeyword)
        ) {
          this.$refs.uToast.show({
            message: '已经是你的好友',
          });
          return false;
        } else {
          return true;
        }
      }
      if (type === 'group') {
        if (this.searchKeyword == '') {
          this.$refs.uToast.show({ message: '请输入要加入的群组ID！' });
          return false;
        } else if (
          this.groupList.some((item) => this.searchKeyword === item.groupid)
        ) {
          this.$refs.uToast.show({
            message: '已加入了该群组',
          });
          return false;
        } else {
          return true;
        }
      }
    },
    async actionSearch() {
      //搜索好友
      if (this.current === 0) {
        if (!this.checkoutSearchKeyword('friend')) return;
        const result = await fetchOtherInfoFromServer([this.searchKeyword]);
        const userInfo = result[this.searchKeyword];
        userInfo.userId = this.searchKeyword;
        console.log('>>>>>>成功获取要添加的好友信息', userInfo);
        this.searchResult = [userInfo];
      }
      //搜索群组
      if (this.current === 1) {
        if (!this.checkoutSearchKeyword('group')) return;
        try {
          const result = await getGroupInfosFromServer(this.searchKeyword);
          console.log('>>>>>>>result', result);
          this.searchResult = result;
        } catch (error) {
          console.log('error', error);
          if (
            error?.data?.error_description &&
            error?.data?.error_description.includes('group member permission')
          ) {
            this.$refs.uToast.show({
              message: '该群为私有群，无法申请加入',
            });
            return;
          }
          this.$refs.uToast.show({
            message: error.data.error_description,
          });
        }
      }
    },
    //添加好友
    addFriend() {
      const userId = this.searchResult[0].userId;
      if (!userId) {
        this.$refs.uToast.show({ message: '请输入要添加的用户！' });
        return false;
      }
      try {
        addContactFromServer(userId, '加个好友吧！');
        this.$refs.uToast.show({
          message: '已发出好友申请',
        });
        this.searchResult[0] &&
          this.$set(this.searchResult[0], 'sendAddMsg', true);
      } catch (error) {
        console.log(`添加好友失败，错误信息：${JSON.stringify(error)}`);
        this.$refs.uToast.show({
          message: '好友添加失败',
        });
      }
    },
    //加入群组
    async applyJoinGroup() {
      const groupId = this.searchResult[0].id;
      if (!groupId) {
        this.$refs.uToast.show({ message: '请输入要加入的群组ID！' });
        return false;
      }
      try {
        await joinPublicGroup(groupId);
        this.$refs.uToast.show({
          message: '已加入该群组',
        });
        if (this.searchResult[0] && this.searchResult[0]?.membersonly) {
          this.$refs.uToast.show({
            message: '已申请加入群组，等待审批！',
          });
          this.searchResult[0] &&
            this.$set(this.searchResult[0], 'sendAddMsg', true);
        } else {
          this.searchResult[0] &&
            this.$set(this.searchResult[0], 'joined', true);
        }
      } catch (error) {
        console.log('加入群组失败', error);
        if (
          error?.data?.error_description &&
          error?.data?.error_description.includes('already in group')
        ) {
          uni.showToast({
            title: '你已加入该群组',
            icon: 'none',
          });
        } else {
          this.$refs.uToast.show({
            message: '加入群组失败',
          });
        }
      }
    },
    entryChatMessagePage() {
      console.log('>>>>执行跳转进入聊天消息页');
    },
  },
};
</script>

<style scoped>
@import './index.css';
</style>
