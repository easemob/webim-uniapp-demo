<template>
  <view>
    <u-popup round="16" :show="show" @close="close" @open="open">
      <view class="message_more_func_container">
        <!-- 复制 -->
        <view
          v-if="msgBody.type === MESSAGE_TYPE.TEXT"
          class="message_more_func_item u-border-bottom"
          @click="copyTextMessage"
        >
          <u-icon
            class="message_more_func_item_content_icon"
            size="24"
            name="/static/images/new_ui/message/messagPopup/copy_msg_icon.png"
          ></u-icon>
          <text class="message_more_func_item_title">复制</text>
        </view>
        <!-- 回复 -->
        <view
          class="message_more_func_item u-border-bottom"
          @click="replyMessage"
        >
          <u-icon
            class="message_more_func_item_content_icon"
            size="24"
            name="/static/images/new_ui/message/messagPopup/reply_msg_icon.png"
          ></u-icon>
          <text class="message_more_func_item_title">回复</text>
        </view>
        <!-- 编辑(该功能由于使用z-pagging视图更新机制,在更新最新一条消息时存在缺陷因此暂时注释) -->
        <!-- <view
          v-if="isSelf && msgBody.type === MESSAGE_TYPE.TEXT"
          class="message_more_func_item u-border-bottom"
          @click="editMessage"
        >
          <u-icon
            class="message_more_func_item_content_icon"
            size="24"
            name="/static/images/new_ui/message/messagPopup/edit_msg_icon.png"
          ></u-icon>
          <text class="message_more_func_item_title">编辑</text>
        </view> -->
        <!-- 删除 -->
        <view
          class="message_more_func_item u-border-bottom"
          @click="alertSencondConfirmModal"
        >
          <u-icon
            class="message_more_func_item_content_icon"
            size="24"
            name="/static/images/new_ui/message/messagPopup/del_msg_icon.png"
          ></u-icon>
          <text class="message_more_func_item_title">删除</text>
        </view>
        <!-- 撤回 -->
        <view
          v-if="isSelf"
          class="message_more_func_item u-border-bottom"
          @click="recallMessage"
        >
          <u-icon
            class="message_more_func_item_content_icon"
            size="24"
            name="/static/images/new_ui/message/messagPopup/recall_msg_icon.png"
          ></u-icon>
          <text class="message_more_func_item_title">撤回</text>
        </view>
      </view>
    </u-popup>
    <u-modal
      :show="isShowSencondConfirmModal"
      :zoom="true"
      title="确认删除这条消息？"
      content="删除后，对方依旧可以看到这条消息。"
      confirm-text="确认"
      cancel-text="取消"
      show-cancel-button
      @confirm="deleteLocalMessage"
      @cancel="isShowSencondConfirmModal = false"
    >
    </u-modal>
  </view>
</template>

<script>
import { EMClient } from '@/EaseIM';
import { getEMKey } from '@/EaseIM/utils';
import { emAboutAck } from '@/EaseIM/emApis';
import { MESSAGE_TYPE, MESSAGE_STATUS } from '@/EaseIM/constant';
const { sendRecallAckMsg } = emAboutAck();
export default {
  data() {
    return {
      MESSAGE_TYPE,
      show: false,
      isShowSencondConfirmModal: false,
      msgBody: {},
    };
  },
  computed: {
    isSelf() {
      const { from } = this.msgBody;
      return (
        from === this.$store.state.LoginStore.loginUserBaseInfos.loginUserId
      );
    },
  },
  methods: {
    open() {
      // console.log('open');
    },
    close() {
      this.show = false;
    },
    alertMessagePopup(msgBody) {
      this.msgBody = Object.assign({}, msgBody);
      this.show = true;
    },
    //复制文本消息至剪切板
    copyTextMessage() {
      uni.setClipboardData({
        data: this.msgBody.msg,
        success: (res) => {
          uni.showToast({
            title: '已复制',
            icon: 'none',
          });
        },
        fail: (e) => {
          console.log('文本复制失败', e);
          uni.showToast({
            title: '复制失败',
            icon: 'none',
          });
        },
        complete: () => {
          this.show = false;
        },
      });
    },
    //回复消息
    replyMessage() {
      this.$emit('callReplyMessage');
      this.show = false;
    },
    //编辑消息
    editMessage() {
      this.$emit('callEditMessage');
      this.show = false;
    },
    //弹出二次确认模态框【删除消息】
    alertSencondConfirmModal() {
      this.isShowSencondConfirmModal = true;
      this.show = false;
    },
    //删除本地消息
    deleteLocalMessage() {
      const key = getEMKey(
        EMClient.user,
        this.msgBody.from,
        this.msgBody.to,
        this.msgBody.chatType
      );
      const params = {
        key: key,
        mid: this.msgBody.id,
      };
      this.$store.commit('DELETE_MESSAGE_FROM_COLLECTION', params);
      uni.showToast({
        icon: 'none',
        title: '删除成功',
      });
      this.isShowSencondConfirmModal = false;
    },
    //撤回消息
    async recallMessage() {
      try {
        const params = {
          mid: this.msgBody.id,
          to: this.msgBody.to,
          chatType: this.msgBody.chatType,
        };
        await sendRecallAckMsg(params);
        uni.showToast({
          title: '撤回成功',
          icon: 'none',
        });
        //向消息状态集合缓存中更新该条消息的状态
        this.$store.commit('UPDATE_MESSAGE_COLLECTION_STATUS', {
          key: params.mid,
          status: MESSAGE_STATUS.RECALL,
        });
      } catch (error) {
        console.log('撤回失败', error);
        if (error?.type === 504) {
          uni.showToast({
            title: '已超过可撤回时间',
            icon: 'none',
          });
          return false;
        }
        uni.showToast({
          title: '撤回失败',
          icon: 'none',
        });
      } finally {
        this.show = false;
      }
    },
  },
};
</script>

<style scoped>
.message_more_func_container {
  width: 100%;
  padding: 20px 15px 20px 15px;
}
.message_more_func_item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 56px;
}
.message_more_func_item_title {
  /* Enabled */

  width: 32px;
  height: 22px;

  /* 简体中文/文本/大 */
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  /* identical to box height, or 138% */
  text-align: center;

  /* Neutral/1 */
  color: #171a1c;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;
}
.modal_text_content {
  /* A message should be a short, complete sentence. */

  width: 308.28px;
  height: 18px;

  /* 简体中文/标签/中 */
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  /* identical to box height, or 129% */
  text-align: center;

  /* Neutral/5 */
  color: #75828a;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;
}
</style>
