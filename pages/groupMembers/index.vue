<template>
  <view>
    <u-navbar
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :left-text="navbarLeftText"
      :autoBack="true"
    >
      <!-- 群成员right -->
      <template
        v-if="
          groupMembersShowType === GROUP_MEMEBERS_SHOW_TYPE.READ_ONLY &&
          memberPermissionCheck
        "
      >
        <u-icon
          slot="right"
          size="24"
          name="/static/images/new_ui/contacts/add_contacts.png"
          @click="handleInGroupMembers(GROUP_MEMEBERS_SHOW_TYPE.ADD_NEW_MEMBER)"
        ></u-icon>
        <u-icon
          slot="right"
          size="24"
          name="/static/images/new_ui/contacts/del_contacts.png"
          @click="handleInGroupMembers(GROUP_MEMEBERS_SHOW_TYPE.DEL_MEMBER)"
        ></u-icon>
      </template>
      <!-- 添加群成员right -->
      <template
        v-if="
          groupMembersShowType === GROUP_MEMEBERS_SHOW_TYPE.ADD_NEW_MEMBER &&
          memberPermissionCheck
        "
      >
        <text
          slot="right"
          :class="[
            checkboxValue.length ? 'edit_save_btn' : 'edit_save_btn_gray',
          ]"
          >添加</text
        >
      </template>
      <!-- 删除群成员right -->
      <template
        v-if="
          groupMembersShowType === GROUP_MEMEBERS_SHOW_TYPE.DEL_MEMBER &&
          memberPermissionCheck
        "
      >
        <text
          slot="right"
          @click="setGroupMembersModalContent"
          :class="[
            checkboxValue.length > 0 ? 'edit_delete_btn' : 'edit_save_btn_gray',
          ]"
          >删除（{{ checkboxValue.length }}）</text
        >
      </template>
      <!-- 转让群成员right -->
      <template
        v-if="
          groupMembersShowType === GROUP_MEMEBERS_SHOW_TYPE.TRANSFER_OWNER &&
          memberPermissionCheck
        "
      >
        <text
          slot="right"
          @click="setGroupMembersModalContent"
          :class="[radiovalue ? 'edit_save_btn' : 'edit_save_btn_gray']"
          >确认</text
        >
      </template>
    </u-navbar>
    <!-- 群成员list -->
    <view>
      <u-list @scrolltolower="scrolltolower">
        <!-- 单选框模式 -->
        <template
          v-if="groupMembersShowType == GROUP_MEMEBERS_SHOW_TYPE.TRANSFER_OWNER"
        >
          <u-radio-group
            v-model="radiovalue"
            placement="column"
            @change="radioChange"
          >
            <u-list-item
              v-for="(groupMemberItem, key, index) in groupMembersProfileData"
              :key="key"
            >
              <u-cell>
                <u-radio
                  slot="icon"
                  v-show="isShowRadio"
                  shape="square"
                  :name="key"
                  :disabled="key === loginUserId || key === getGroupOwner"
                >
                </u-radio>
                <u-avatar
                  slot="icon"
                  shape="square"
                  size="40"
                  :src="groupMembersAvatarUrl(groupMemberItem)"
                  customStyle="margin: -3px 5px -3px 0"
                ></u-avatar>
                <view slot="title">
                  <u--text
                    :lines="1"
                    :text="groupMembersNickname(groupMemberItem, key)"
                    iconStyle="margin-left: 2px;"
                  ></u--text>
                </view>
              </u-cell>
            </u-list-item>
          </u-radio-group>
        </template>
        <!-- 复选框模式 -->
        <template v-else>
          <u-checkbox-group
            v-model="checkboxValue"
            placement="column"
            @change="checkboxChange"
          >
            <u-list-item
              v-for="(groupMemberItem, key, index) in groupMembersProfileData"
              :key="key"
            >
              <u-cell>
                <u-checkbox
                  v-show="isShowCheckbox"
                  slot="icon"
                  :name="key"
                  :disabled="key === loginUserId || key === getGroupOwner"
                >
                </u-checkbox>
                <u-avatar
                  slot="icon"
                  shape="square"
                  size="40"
                  :src="groupMembersAvatarUrl(groupMemberItem)"
                  customStyle="margin: -3px 5px -3px 0"
                ></u-avatar>
                <view slot="title">
                  <u--text
                    :lines="1"
                    :text="groupMembersNickname(groupMemberItem, key)"
                    iconStyle="margin-left: 2px;"
                  ></u--text>
                </view>
              </u-cell>
            </u-list-item> </u-checkbox-group
        ></template>
      </u-list>
    </view>
    <!-- modal -->
    <u-modal
      :show="isShowGroupMembersModal"
      showCancelButton
      @confirm="onGroupMembersModalConfirm"
      @cancel="cancelShowGroupMembersModal"
    >
      <text class="group_members_modal_content">
        {{ groupMembersModalContent }}
      </text>
    </u-modal>
  </view>
</template>

<script>
import { EMClient } from '@/EaseIM';
import { GROUP_ROLE_TYPE, GROUP_ROLE_TYPE_NAME } from '@/EaseIM/constant';
import { emGroups } from '@/EaseIM/emApis';
import { GROUP_MEMEBERS_SHOW_TYPE } from '@/constant';
const { listGroupMembersFromServer } = emGroups();
export default {
  data() {
    return {
      GROUP_MEMEBERS_SHOW_TYPE,
      GROUP_ROLE_TYPE,
      GROUP_ROLE_TYPE_NAME,
      pageNum: 1,
      pageSize: 10,
      groupId: '',
      groupMembersShowType: GROUP_MEMEBERS_SHOW_TYPE.READ_ONLY,
      groupRole: 0,
      /* radio */
      isShowRadio: false,
      radiovalue: '',
      /* checkbox */
      isShowCheckbox: false,
      checkboxValue: [],
      /* modal */
      isShowGroupMembersModal: false,
      groupMembersModalContent: '',
    };
  },
  onLoad(options) {
    this.groupId = options.groupId;
    this.groupRole = options.groupRole * 1;
    this.groupMembersShowType = options.groupMembersShowType * 1;
    console.log('>>>>groupMembersProfileList', this.groupMembersProfileData);
    if (
      options.groupMembersShowType == GROUP_MEMEBERS_SHOW_TYPE.TRANSFER_OWNER
    ) {
      this.isShowRadio = true;
    }
    if (!this.groupMembersProfileData) {
      this.fetchInGroupMembers();
    }
  },
  computed: {
    navbarLeftText() {
      let text = '';
      switch (this.groupMembersShowType) {
        case GROUP_MEMEBERS_SHOW_TYPE.READ_ONLY:
          text = '群成员';
          break;
        case GROUP_MEMEBERS_SHOW_TYPE.TRANSFER_OWNER:
          text = '选择新群主 ';
          break;
        case GROUP_MEMEBERS_SHOW_TYPE.ADD_NEW_MEMBER:
          text = '添加群成员';
          break;
        case GROUP_MEMEBERS_SHOW_TYPE.DEL_MEMBER:
          text = '删除群成员';
          break;
        default:
          text = '群成员';
          break;
      }
      return text;
    },
    loginUserId() {
      return EMClient.user;
    },
    getGroupOwner() {
      const inGroupOwner = this.$store.getters.joinedGroupList.find(
        (item) => item.groupId === this.groupId
      )?.owner;
      console.log('inGroupOwner', inGroupOwner);
      return inGroupOwner;
    },
    memberPermissionCheck() {
      return this.groupRole < GROUP_ROLE_TYPE[GROUP_ROLE_TYPE_NAME.MEMBER];
    },
    groupMembersCount() {},
    groupMembersProfileData() {
      return this.$store.getters.groupMembersProfile[this.groupId];
    },
    groupMembersNickname() {
      /**
       * 群内属性为自定义key-value 这里Demo自定义昵称为nickName，因此取nickName
       * 其次获取了个人用户属性，用户属性昵称字段固定为nickname
       * 默认展示用户id
       */
      return (groupMemberItem, key) => {
        if (groupMemberItem?.nickName) {
          return groupMemberItem.nickName;
        } else if (groupMemberItem?.nickname) {
          return groupMemberItem.nickname;
        } else {
          return key;
        }
      };
    },
    groupMembersAvatarUrl() {
      /**
       * Demo种为定义群成员头像字段，因此默认优先取用户属性头像字段
       */
      return (groupMemberItem) => {
        if (groupMemberItem?.avatarurl) {
          return groupMemberItem.avatarurl;
        } else {
          return '/static/images/new_ui/defaultAvatar.png';
        }
      };
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
    radioChange(newVal) {
      console.log('>>>>>>>>radioChange', newVal);
      this.radiovalue = newVal;
    },
    checkboxChange(newList) {
      console.log('????????', newList);
      this.checkboxValue = [...newList];
    },
    //操作群组成员
    handleInGroupMembers(type) {
      this.groupMembersShowType = type;
      !this.isShowCheckbox && (this.isShowCheckbox = true);
    },
    //展开modal
    setGroupMembersModalContent() {
      if (this.groupMembersShowType == GROUP_MEMEBERS_SHOW_TYPE.DEL_MEMBER) {
        if (!this.checkboxValue.length) return;
        let content = '';
        //组建modal内容
        if (this.checkboxValue.length == 1) {
          content = this.getMemberGroupNickname(this.checkboxValue[0]);
          this.groupMembersModalContent = `确认移除“${content}”？`;
        } else if (
          this.checkboxValue.length > 1 &&
          this.checkboxValue.length <= 3
        ) {
          let checkedMembers = this.checkboxValue;
          checkedMembers.forEach((emId, index) => {
            if (index != checkedMembers.length - 1) {
              content += `${this.getMemberGroupNickname(emId)}，`;
            } else {
              content += `${this.getMemberGroupNickname(emId)}。`;
            }
          });
          this.groupMembersModalContent = `确认删除“${content}”这${this.checkboxValue.length}位群成员？`;
        } else if (this.checkboxValue.length > 3) {
          let checkedMembers = this.checkboxValue.slice(0, 3);
          checkedMembers.forEach((emId, index) => {
            if (index != checkedMembers.length - 1) {
              content += `${this.getMemberGroupNickname(emId)}，`;
            } else {
              content += `${this.getMemberGroupNickname(emId)}。`;
            }
          });
          this.groupMembersModalContent = `确认删除“${content}”等${this.checkboxValue.length}位群成员？`;
        }
      }
      if (
        this.groupMembersShowType == GROUP_MEMEBERS_SHOW_TYPE.TRANSFER_OWNER
      ) {
        let content = '';
        content = this.getMemberGroupNickname(this.radiovalue);
        this.groupMembersModalContent = `确认转让群主身份给“${content}”？`;
      }
      this.$nextTick(() => {
        this.isShowGroupMembersModal = true;
      });
    },
    //取消展示modal
    cancelShowGroupMembersModal() {
      if (this.groupMembersShowType == GROUP_MEMEBERS_SHOW_TYPE.DEL_MEMBER) {
        this.checkboxValue = [];
        this.isShowCheckbox = false;
        this.groupMembersShowType = GROUP_MEMEBERS_SHOW_TYPE.READ_ONLY;
        this.isShowGroupMembersModal = false;
      }
      if (
        this.groupMembersShowType == GROUP_MEMEBERS_SHOW_TYPE.TRANSFER_OWNER
      ) {
        this.radiovalue = '';
        this.isShowGroupMembersModal = false;
      }
    },
    //modal 点击确认
    onGroupMembersModalConfirm() {
      if (this.groupMembersShowType == GROUP_MEMEBERS_SHOW_TYPE.DEL_MEMBER) {
        this.actionDeleteInGroupMembers();
      }
      if (
        this.groupMembersShowType == GROUP_MEMEBERS_SHOW_TYPE.TRANSFER_OWNER
      ) {
        this.actionTransferGroupOwner();
      }
    },
    //获取用户对应群组昵称
    getMemberGroupNickname(emId) {
      let nickname = '';
      nickname =
        this.groupMembersProfileData[emId]?.nickName ||
        this.groupMembersProfileData[emId]?.nickname ||
        emId;
      return nickname;
    },
    //执行删除群组成员
    async actionDeleteInGroupMembers() {
      const memberList = this.checkboxValue;
      try {
        await this.$store.dispatch('deleteInGroupMembers', {
          groupId: this.groupId,
          memberList,
        });
        uni.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 2000,
        });
      } catch (error) {
        console.log('>>>>>删除失败', error);
        uni.showToast({
          title: '删除失败',
          icon: 'none',
          duration: 2000,
        });
      } finally {
        this.isShowCheckbox = false;
        this.isShowGroupMembersModal = false;
        this.checkboxValue = [];
      }
    },
    //执行转让群组功能
    async actionTransferGroupOwner() {
      if (!this.groupId && !this.radiovalue) return;
      try {
        await this.$store.dispatch('transferGroupOwners', {
          groupId: this.groupId,
          newOwner: this.radiovalue,
        });
        uni.showToast({
          icon: 'none',
          title: '已转让',
          duration: 2000,
        });
        setTimeout(() => {
          uni.navigateBack();
        }, 1000);
      } catch (error) {
        console.log('>>>>转让失败', error);
        uni.showToast({
          icon: 'none',
          title: '转让失败，请重新操作',
          duration: 2000,
        });
      }
    },
    scrolltolower() {},
  },
};
</script>

<style scoped>
.edit_save_btn,
.edit_save_btn_gray,
.edit_delete_btn {
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
.edit_delete_btn {
  color: #ff002b;
}
.edit_save_btn_gray {
  color: #acb4b9;
}
.group_members_modal_content {
  /* A Short Title Is Best */

  width: 308.28px;
  height: 52px;

  /* 简体中文/次级标题/大 */
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  /* or 144% */
  text-align: center;

  color: #000000;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
}
</style>
