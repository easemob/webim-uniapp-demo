<template>
  <view>
    <alert-screen
      v-if="callKitStatus.localClientStatus === CALLSTATUS.receivedConfirmRing"
    />
    <!-- <single-container /> -->
  </view>
</template>

<script setup>
import AlertScreen from './alertScreen';
// import SingleContainer from './singleContainer/index.nvue';
import useManageChannel from './callKitManage/useManageChannel';
import { CALLSTATUS } from './contants';
const { callKitStatus } = useManageChannel();
</script>

<style></style>
