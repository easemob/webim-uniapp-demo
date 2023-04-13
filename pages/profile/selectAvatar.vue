<template>
  <view class="wrap">
    <view
      :class="[
        { check_style: index === chooseAvatarIndex },
        'avatar_container',
      ]"
      v-for="(item, index) in defaultAvatarImgNum"
      :key="index"
    >
      <image
        class="avatar_img"
        :src="avatarUrl(item)"
        @click="chooseAvatar(index)"
      ></image>
    </view>
    <view class="save_btn">
      <button type="primary" @click="saveAvatar">确定</button>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import disp from '@/utils/broadcast';
const avatarBaseUrl =
  'https://download-sdk.oss-cn-beijing.aliyuncs.com/downloads/IMDemo/avatar/';
//此处是H5与小程序for循环其实num不同，所以定义了一个数组。
const defaultAvatarImgNum = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const chooseAvatarIndex = ref(0);
const avatarUrl = computed(() => {
  return (avatarNum) => {
    return avatarBaseUrl + 'Image' + avatarNum + '.png';
  };
});
const chooseAvatar = (avatarNum) => {
  chooseAvatarIndex.value = avatarNum;
};
const saveAvatar = async () => {
  console.log('>>>>>保存URI');
  //待更新的url
  let avatarUrl =
    avatarBaseUrl + 'Image' + (chooseAvatarIndex.value + 1) + '.png';
  console.log(avatarUrl);
  try {
    await uni.WebIM.conn.updateUserInfo('avatarurl', avatarUrl);
    uni.showToast({
      title: '保存成功',
      icon: 'success',
    });
    disp.fire('em.mian.profile.update');
    setTimeout(() => {
      uni.redirectTo({
        url: '../setting/setting',
      });
    }, 300);
  } catch (e) {
    uni.showToast({
      title: '保存失败',
      icon: 'none',
    });
  }
};
</script>

<style>
.wrap {
  width: 100%;
  height: 100%;
  padding: 24rpx;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
}
.avatar_container {
  width: 200rpx;
  height: 200rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
.avatar_img {
  width: 66rpx;
  height: 66rpx;
}
.check_style {
  background: #f3f3f3;
}
.save_btn {
  width: 100%;
  height: 80rpx;
}
</style>
