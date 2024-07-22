<template>
  <view
    :class="[
      'text_msg_contatiner',
      isSelf(msgBody)
        ? 'text_msg_contatiner_mine'
        : 'text_msg_contatiner_other',
    ]"
  >
    {{ msgBody.msg }}
    <text
      :class="isSelf(msgBody) ? 'edited_text_msg' : 'edited_text_msg_other'"
      v-if="msgBody.modifiedInfo"
      >已编辑</text
    >
  </view>
</template>

<script>
export default {
  props: {
    msgBody: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {};
  },
  computed: {
    isSelf() {
      return (item) => {
        return (
          item.from ===
          this.$store.state.LoginStore.loginUserBaseInfos.loginUserId
        );
      };
    },
  },
  methods: {},
};
</script>

<style scoped>
.text_msg_contatiner {
  /* 简体中文/文本/大 */
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  /* or 138% */

  /* Neutral/1 */
  color: #171a1c;
  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
}
.text_msg_contatiner_other {
  /* Frame 613 */

  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 7px 12px;
  /* Primary/5 */

  background: #e6f5ff;
  border-radius: 12px 16px 16px 4px;

  /* Alphabet/Body/Large */
  font-family: 'SF Pro';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  /* or 138% */
  letter-spacing: 0.002em;

  /* Neutral/98 */
  color: #171a1c;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
}
.text_msg_contatiner_mine {
  /* Frame 613 */

  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 7px 12px;

  /* Primary/95 */
  background: #009eff;
  border-radius: 16px 12px 4px 16px;

  /* Sei la cosa più bella che mi sia mai capitata, non so stare senza te. */

  /* Alphabet/Body/Large */
  font-family: 'SF Pro';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  /* or 138% */
  letter-spacing: 0.002em;

  /* Neutral/1 */
  color: #f9fafa;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
}
.edited_text_msg,
.edited_text_msg_other {
  /* 已编辑 */
  width: 100%;
  /* 简体中文/文本/超小 */
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;
  /* identical to box height, or 127% */
  text-align: right;

  /* Neutral Special/98 */
  color: #f8f9fc;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;
  text-align: right;
}
.edited_text_msg_other {
  color: #5270ad;
  text-align: left;
}
</style>
