<template>
   <view class="wrap">
        <view :class="[{'check_style':index === chooseAvatarIndex},'avartar_container']" v-for="(item,index) in 9" :key="index">
            <u-avatar :src="avatarUrl(item)" @click="chooseAvatar(index)"></u-avatar>
        </view>
        <view class="save_btn">
            <u-button type="primary" @click="saveAvatar">确定</u-button>
        </view>
	</view>
</template>

<script>
let disp = require("../../utils/broadcast");
const avatarBaseUrl = 'https://download-sdk.oss-cn-beijing.aliyuncs.com/downloads/IMDemo/avatar/'
    export default {
        data(){
            return {
                avatarBaseUrl: avatarBaseUrl,
                chooseAvatarIndex: 0
            }
        },
        computed: {
            avatarUrl(){
                return avatarNum => {
                    return this.avatarBaseUrl + 'Image' + avatarNum + '.png'
                }
            }
        },
        methods: {
            chooseAvatar(avatarNum){
                this.chooseAvatarIndex = avatarNum
            },
            async saveAvatar(){
                console.log('>>>>>保存URI')
                //待更新的url
                let avatarUrl = this.avatarBaseUrl + 'Image' + (this.chooseAvatarIndex + 1) + '.png'
                console.log(avatarUrl)
                try {
                    await uni.WebIM.conn.updateUserInfo('avatarurl', avatarUrl)
                    uni.showToast({
                        title: '保存成功',
                        icon:'success',
                    })
                    disp.fire('em.mian.profile.update')
                } catch (e) {
                    uni.showToast({
                        title: '保存失败',
                        icon: 'none'
                    })
                } finally {
                    setTimeout(
                        () =>
                        uni.redirectTo({
                            url: "../profile/profile",
                    }),500);
                }
                
                

            }
        },
    }
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
 .avartar_container{
    width: 200rpx;
    height: 200rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
} 

.check_style{
    background: #F3F3F3;
}
.save_btn{
	width: 100%;
	height: 80rpx;
}
</style>