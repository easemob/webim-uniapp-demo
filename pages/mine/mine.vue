<template>
  <view class="mine_container">
    <!-- header -->
    <view class="mine_container_header">
      <view class="mine_container_header_avatar">
        <u-avatar size="100" shape="square" :src="loginUserAvatar"></u-avatar>
      </view>
      <view class="mine_container_header_nickname">
        <u--text
          color="#171A1C"
          lineHeigth="28"
          :bold="true"
          size="20"
          :text="loginUserNickname"
        ></u--text>
      </view>
      <view class="mine_container_header_sign">
        <u--text
          :lines="3"
          color="#464E53"
          size="14"
          lineHeight="18"
          align="center"
          :text="loginUserSign"
        ></u--text>
      </view>
      <view @click="copyEaseUserId">
        <u--text
          class="header_hxId"
          :text="`环信ID：${loginUserId || ''}`"
          size="12"
          color="#ACB4B9"
          suffixIcon="/static/images/new_ui/mine/copy_icon.png"
        ></u--text>
      </view>
    </view>
    <!-- setting -->
    <u-cell-group title="设置">
      <u-cell isLink @click="isShowPresenceSettings = true">
        <u-icon
          slot="icon"
          size="32"
          name="/static/images/new_ui/mine/presence_cell_icon.png"
          isLink
        ></u-icon>
        <text class="setting_title" slot="title">在线状态</text>
        <text class="setting_value" slot="value">{{ presenceStatus }}</text>
      </u-cell>
      <u-cell isLink @click="entryProfilePage">
        <u-icon
          slot="icon"
          size="32"
          name="/static/images/new_ui/mine/profile_cell_icon.png"
          isLink
        ></u-icon>
        <text class="setting_title" slot="title">个人信息</text>
      </u-cell>
      <u-cell isLink @click="entryGeneralSettingPage">
        <u-icon
          slot="icon"
          size="32"
          name="/static/images/new_ui/mine/general_cell_icon.png"
          isLink
        ></u-icon>
        <text class="setting_title" slot="title">通用</text>
      </u-cell>
      <!-- 消息通知该功能与实际原生端推送相关，但目前暂无uniApp集成环信推送相关功能因此暂时注释。 -->
      <!-- <u-cell isLink @click="entryNoDistrubingSettingPage">
        <u-icon
          slot="icon"
          size="32"
          name="/static/images/new_ui/mine/inform_cell_iocn.png"
          isLink
        ></u-icon>
        <text class="setting_title" slot="title">消息通知</text>
      </u-cell> -->
      <u-cell isLink @click="entryPrivacySettingPage">
        <u-icon
          slot="icon"
          size="32"
          name="/static/images/new_ui/mine/privacy_cell_icon.png"
          isLink
        ></u-icon>
        <text class="setting_title" slot="title">隐私</text>
      </u-cell>
      <u-cell
        isLink
        @click="entryAboutEasemobPage"
        :value="getEasemobUniAppSDKVersion"
      >
        <u-icon
          slot="icon"
          size="32"
          name="/static/images/new_ui/mine/about_cell_icon.png"
          isLink
        ></u-icon>
        <text class="setting_title" slot="title">关于</text>
      </u-cell>
    </u-cell-group>
    <!-- login -->
    <u-cell-group title="登录">
      <u-cell>
        <text class="mine_login_title" slot="title" @click="logoutEM">
          退出登录
        </text>
      </u-cell>
    </u-cell-group>
    <!-- presence -->
    <u-action-sheet
      :show="isShowPresenceSettings"
      @close="isShowPresenceSettings = false"
      :actions="presenceList"
      cancelText="取消"
      @select="presenceClick"
      :safeAreaInsetBottom="true"
      round="16"
    >
    </u-action-sheet>
    <u-modal
      :show="isShowPresenceCustomModal"
      title="自定义在线状态"
      widt="340px"
    >
      <!-- #ifdef H5 || APP-PLUS -->
      <view class="presence_modal_content" slot="default">
        <u--textarea
          v-model="customPresence"
          height="20"
          placeholder="请填写"
          maxlength="16"
          border="surround"
        >
        </u--textarea>
        <text class="textarea_count">{{ customPresence.length }}/16</text>
      </view>
      <!-- #endif -->
      <!-- #ifndef H5 || APP-PLUS-->
      <view class="presence_modal_content" slot="default" style="width: 100%">
        <u-input
          v-model="customPresence"
          height="20"
          placeholder="请填写"
          maxlength="16"
          border="surround"
        >
        </u-input>
        <text class="textarea_count">{{ customPresence.length }}/16</text>
      </view>
      <!-- #endif -->
      <view class="presence_modal_footer" slot="confirmButton">
        <u-button
          customStyle="width:148px;"
          text="取消"
          plain
          @click="cancelSettingPresence"
        ></u-button>
        <u-button
          customStyle="width:148px;"
          text="确认"
          color="#009EFF"
          @click="confirmSettingPresence"
        ></u-button>
      </view>
    </u-modal>
  </view>
</template>

<script>
import { EMClient } from '@/EaseIM';
import { emConnect, emPresence } from '@/EaseIM/emApis';
const { closeEaseIM } = emConnect();
const { publishPresence } = emPresence();
export default {
  data() {
    return {
      loginUserId: EMClient.user,
      isShowPresenceSettings: false,
      isShowPresenceCustomModal: false,
      customPresence: '',
      defaultAvatar: '/static/images/new_ui/defaultAvatar.png',
      presenceList: [
        {
          name: '在线',
          type: 0,
          color: '#009EFF',
          fontSize: '16px',
        },
        {
          name: '离线',
          type: 1,
          color: '#009EFF',
          fontSize: '16px',
        },
        {
          name: '离开',
          type: 2,
          color: '#009EFF',
          fontSize: '16px',
        },
        {
          name: '请勿打扰',
          type: 3,
          color: '#009EFF',
          fontSize: '16px',
        },
        {
          name: '自定义',
          type: 4,
          color: '#009EFF',
          fontSize: '16px',
        },
      ],
    };
  },
  onShow() {
    uni.hideHomeButton && uni.hideHomeButton();
  },
  computed: {
    loginUserProfiles() {
      return this.$store.state.LoginStore.loginUserProfiles;
    },
    loginUserPresence() {
      return this.$store.state.ContactsStore.loginUserPresenceInfoMap;
    },
    loginUserAvatar() {
      if (this.loginUserProfiles.avatarurl) {
        return this.loginUserProfiles?.avatarurl;
      } else {
        return this.defaultAvatar;
      }
    },
    loginUserNickname() {
      if (this.loginUserProfiles.nickname) {
        return this.loginUserProfiles.nickname;
      } else {
        return this.loginUserId;
      }
    },
    loginUserSign() {
      if (this.loginUserProfiles.sign) {
        return this.loginUserProfiles.sign;
      } else {
        return '无个性，不签名。';
      }
    },
    getEasemobUniAppSDKVersion() {
      return `Easemob UniApp SDK v${EMClient.version}`;
    },
    presenceStatus() {
      const presenceInfo = this.loginUserPresence;
      if (Object.values(presenceInfo).includes(this.loginUserId)) {
        const statusDetails = presenceInfo.statusDetails;
        let isOnline = false;
        for (const item of statusDetails) {
          if (item.status === 1) {
            isOnline = true;
            break;
          }
        }
        if (isOnline) {
          if (presenceInfo.ext) {
            switch (presenceInfo.ext) {
              case 'Cloaking':
                return '请勿打扰';
              case 'Online':
                return '在线';
              case 'Leave':
                return '离开';
              case 'Offline':
                return '离线';
              default:
                return presenceInfo.ext;
            }
          } else {
            return '在线';
          }
        } else {
          return '离线';
        }
      }
      return ''; // 如果没有找到用户的在线状态，默认返回 "滋滋"
    },
  },
  methods: {
    //复制环信ID
    copyEaseUserId() {
      uni.setClipboardData({
        data: this.loginUserId,
        success: (res) => {
          uni.showToast({
            title: '已复制',
            icon: 'none',
            duration: 1000,
          });
        },
        fail: () => {
          uni.showToast({
            title: '复制失败',
            icon: 'none',
            duration: 1000,
          });
        },
      });
    },
    //custom presence
    cancelSettingPresence() {
      this.isShowPresenceCustomModal = false;
      this.customPresence = '';
    },
    confirmSettingPresence() {
      publishPresence(this.customPresence);
      this.isShowPresenceCustomModal = false;
      this.customPresence = '';
    },
    entryProfilePage() {
      uni.navigateTo({
        url: '../mine/myProfile',
      });
    },
    // 点击设置presence
    presenceClick(e) {
      if (e.type === 4) {
        this.isShowPresenceCustomModal = true;
      } else {
        let presenceValue = '';
        switch (e.type) {
          case 0:
            presenceValue = 'Online';
            break;
          case 1:
            presenceValue = 'Offline';
            break;
          case 2:
            presenceValue = 'Leave';
            break;
          case 3:
            presenceValue = 'Cloaking';
            break;
        }
        publishPresence(presenceValue);
      }
    },
    //跳转至通用设置
    entryGeneralSettingPage() {
      uni.navigateTo({
        url: '../mine/generalSetting',
      });
    },
    //跳转至消息免打扰设置
    entryNoDistrubingSettingPage() {
      uni.navigateTo({
        url: '../mine/noDisturbingSetting',
      });
    },
    //跳转至隐私设置
    entryPrivacySettingPage() {
      uni.navigateTo({
        url: '../mine/privacySetting',
      });
    },
    entryAboutEasemobPage() {
      uni.navigateTo({
        url: '../mine/aboutEasemob',
      });
    },
    //退出登录
    logoutEM: function () {
      uni.showModal({
        title: '确认退出当前账号？',
        success: (res) => {
          if (res.confirm) {
            //关闭环信websocket连接。
            closeEaseIM();
            //reset vuex中缓存数据
            this.$store.commit('RESET_STORE');
            uni.redirectTo({
              url: '../login/login',
            });
            //清除本地缓存登录用户信息
            uni.removeStorageSync('EM_LOGIN_INFOS');
          }
        },
      });

      console.log('first');
    },
  },
};
</script>
<style>
@import './mine.css';
</style>
