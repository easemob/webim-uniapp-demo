<template>
  <view class="inform">
    <text class="defaultText" v-if="!contactsInformNoticList.length"
      >暂时没有新的通知</text
    >

    <view
      v-for="(item, index) in contactsInformNoticList"
      :key="index"
      class="itemBar"
    >
      <!-- 需要按钮处理类型通知 -->
      <template v-if="item.showBtn">
        <view class="notInfoDetContent">
          <view class="headContent">
            <image src="/static/images/theme2x.png"></image>
          </view>
          <view class="infoContent">
            <text class="itemName">{{ item.from }}</text>
            <text v-show="item.type === 'subscribe'">申请添加您为好友</text>
          </view>
        </view>
        <view class="buttonContent">
          <view
            v-if="!item.handleText"
            :data-from="item.from"
            class="rejectBtn"
            @tap="rejectApply(item, index)"
            >拒绝</view
          >
          <view v-if="!item.handleText" class="centerLine"></view>
          <view
            v-if="!item.handleText"
            :data-from="item.from"
            class="agreeBtn"
            @tap="agreeApply(item, index)"
            >同意</view
          >
          <view v-if="item.handleText" class="actionDone">{{
            item.handleText
          }}</view>
        </view>
      </template>
      <template v-else>
        <view class="notInfoDetContent" @click="readedTheInform(index)">
          <view class="headContent">
            <image src="/static/images/theme2x.png"></image>
          </view>
          <view class="infoContent">
            <text class="itemName">{{ item.from }}</text>
            <text>{{ item.handleText || '未知系统通知' }}</text>
          </view>
          <view v-if="!item.isHandled" class="notInfoDetContent_bage"> </view>
        </view>
      </template>
    </view>
  </view>
</template>

<script>
import { INFORM_TYPE } from '@/EaseIM/constant';
import { emContacts } from '@/EaseIM/emApis';
const { acceptContactInvite, declineContactInvite } = emContacts();
export default {
  data() {
    return {
      friendList: [],
      myName: '',
    };
  },

  components: {},
  props: {},
  computed: {
    contactsInformNoticList() {
      return this.$store.state.InformStore.informData.contactsInform;
    },
  },

  onShow() {
    uni.hideHomeButton && uni.hideHomeButton();
  },

  methods: {
    async agreeApply(sourceItem, index) {
      let informData = { ...sourceItem };
      // 同意
      //此处直接取的stores中的对象引用，因此直接进行了修改，同时引用对象中的内容也同步进行了变化。
      try {
        acceptContactInvite(informData.from);
        informData.type = 'subscribed';
        informData.handleText = '已同意';
        informData.isHandled = true;
        this.$store.commit('CHANGE_INFORM', {
          informType: INFORM_TYPE.CONTACTS,
          informParams: informData,
          index,
        });
        // 调用好友接口并更新好友列表以及用户属性等数据。
        await this.$store.dispatch('fetchFriendList');
        // 获取好友用户属性
        await this.$store.dispatch('setFriendUserInfotoMap');
      } catch (error) {
        console.log('first error: ', error);
        uni.showToast({
          title: '好友申请同意失败',
          icon: 'none',
        });
      }
    },
    async rejectApply(sourceItem, index) {
      let informData = { ...sourceItem };
      try {
        declineContactInvite(sourceItem.from);
        informData.type = 'unsubscribed';
        informData.handleText = '已拒绝';
        informData.isHandled = true;
        this.$store.commit('CHANGE_INFORM', {
          informType: INFORM_TYPE.CONTACTS,
          informParams: informData,
          index,
        });
        uni.showToast({
          title: '已拒绝对方的好友申请',
          icon: 'none',
        });
      } catch (error) {
        uni.showToast({
          title: '已拒绝对方的好友申请失败',
          icon: 'none',
        });
      }
    },
    readedTheInform(index) {
      this.$store.commit('READED_INFROM', {
        index,
      });
    },
  },
};
</script>
<style>
@import './friendDetail.css';
</style>
