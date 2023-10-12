<template>
  <view>
    <!-- 填写举报原因 -->
    <u-modal
      v-model="isShowReportResaonModal"
      :zoom="true"
      title="举报原因。"
      async-close
      confirm-text="举报"
      cancel-text="取消"
      show-cancel-button
      @confirm="submitReportResaon"
    >
      <u-input
        input-align="center"
        v-model="reportReason"
        type="text"
        maxlength="100"
      />
    </u-modal>
    <!-- 弹出举报入口 -->
    <u-action-sheet
      :list="list"
      v-model="showRpt"
      @click="showRptType = true"
    ></u-action-sheet>
    <!-- 展示举报选项 -->
    <u-action-sheet
      :list="typeList"
      @click="checkedReportType"
      v-model="showRptType"
    ></u-action-sheet>
  </view>
</template>

<script>
import { emMessages } from '@/EaseIM/emApis';
const { reportMessages } = emMessages();
export default {
  data() {
    return {
      title: '消息举报',
      list: [
        {
          text: '举报',
        },
      ],
      messageContent: {},
      isShowReportResaonModal: false,
      showRpt: false,
      showRptType: false,
      rptType: '', // 举报类型
      reportReason: '',
      typeList: [
        {
          text: '涉政',
        },
        {
          text: '涉黄',
        },
        {
          text: '广告',
        },
        {
          text: '辱骂',
        },
        {
          text: '暴恐',
        },
        {
          text: '违禁',
        },
      ],
    };
  },
  methods: {
    //打开举报入口
    openReportEntry(message) {
      this.showRpt = true;
      this.messageContent = { ...message };
    },
    //选择举报类别
    checkedReportType(repType) {
      console.log('repType', repType);
      this.rptType = String(repType);
      this.isShowReportResaonModal = true;
    },
    //提交举报
    async submitReportResaon() {
      if (this.reportReason === '') {
        this.$refs.uModal.clearLoading();
        uni.showToast({ title: '请填写举报原因', icon: 'none' });
        return false;
      }
      try {
        const params = {
          reportType: this.rptType, // 举报类型
          reportReason: this.reportReason, // 举报原因。
          messageId: this.messageContent.id,
        };
        await reportMessages(params);
        uni.showToast({ title: '举报成功', icon: 'none' });
      } catch (error) {
        console.log('>>>>举报失败', error);
        uni.showToast({ title: '举报失败', icon: 'none' });
      } finally {
        this.isShowReportResaonModal = false;
        this.showRpt = false;
        this.showRptType = false;
        this.messageContent = {};
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
