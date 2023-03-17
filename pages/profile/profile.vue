<template>
    <view>
        <u-cell-group>
            <u-cell-item title="头像" :allow="false" @click="to_select_avatar">
                <template #right-icon>
                    <view class="head_pic">
                        <image :src="loginUserAvactar"></image>
                    </view>
                </template>
            </u-cell-item>
            <u-cell-item title="昵称" :value="profileForm.nickname || ''" @click="showEditModal"></u-cell-item>
            <!-- <u-cell-item title="邮箱" :value="profileForm.mail || ''"></u-cell-item>
            <u-cell-item title="手机号" :value="profileForm.phone || ''"></u-cell-item>
            <u-cell-item title="性别" :value="genderDisplay(profileForm.gender) || ''"></u-cell-item>
            <u-cell-item title="生日" :value="profileForm.birth || ''"></u-cell-item>
            <u-cell-item title="个性签名" :value="profileForm.sign || ''"></u-cell-item> -->
        </u-cell-group>
        <u-modal v-model="isShowEditModal" title='更改昵称' async-close confirm-text="保存" cancel-text="取消" show-cancel-button @confirm="saveNickname">
            <u-input input-align="center" v-model="nickname" type="text"  maxlength="15"  />
        </u-modal>

    </view>
</template>
<script>
let disp = require("../../utils/broadcast");
export default {
    data() {
        return {
            isShowEditModal: false,
            nickname:'',
            profileForm: {
                nickname: '',
                avatarurl: '',
                mail: '',
                phone: '',
                gender: '',
                birth: '',
                sign: '',
            }
        }
    },
    onShow(){
        console.log('>>>>触发onSHow')
        const loginUserInfos = getApp().globalData.userInfoFromServer;
        console.log('loginUserInfos',loginUserInfos.avatarurl)
        this.profileForm = Object.assign(this.profileForm,loginUserInfos);
    },
    computed: {
        loginUserAvactar(){
            return getApp().globalData.userInfoFromServer?.avatarurl || this.defaultAvatar;
        },
        //处理性别展示
        genderDisplay(){
            return (gender)=>{
                if(gender === 1){
                    return '男';
                }else if(gender === 2){
                    return '女';
                }else{
                    return '未知';
                }
            }
        }
  
  },
  methods: {
    to_select_avatar(){
        uni.navigateTo({
            url: "../profile/selectAvatar"
        });
    },
    showEditModal(){
        this.isShowEditModal = true;
        this.nickname = this.profileForm.nickname;
    },
    //保存更改的用户昵称
    async saveNickname(e){
        if(!this.nickname) return
        try {
            await uni.WebIM.conn.updateUserInfo('nickname', this.nickname)
            disp.fire('em.mian.profile.update')
            this.profileForm.nickname = this.nickname
            this.isShowEditModal = false;
        } catch (error) {
            uni.showToast({
                title: '保存失败',
                icon: 'none',
                duration: 2000
            })
            
        }
    },
    
  },
}
</script>
<style>
    @import "./profile.css";
</style>