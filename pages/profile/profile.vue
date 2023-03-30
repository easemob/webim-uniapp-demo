<template>
    <view>
		<view class="head_pic" @click="to_select_avatar">
			<text>头像</text>
		    <image :src="loginUserAvactar"></image>
		</view>
		<view class="head_pic" @click="showEditModal">
			<text>昵称</text>
			<text>{{profileForm.nickname || ''}}</text>
		</view>
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
            },
			loginUserInfos:null,
			defaultAvatar: "/static/images/theme2x.png",
        }
    },
	onLoad() {
		this.setData({
			loginUserInfos:getApp().globalData.userInfoFromServer
		})
	},
    onShow(){
        const loginUserInfos = getApp().globalData.userInfoFromServer;
        this.profileForm = Object.assign(this.profileForm,loginUserInfos);
    },
    computed: {
        loginUserAvactar(){
            return this.loginUserInfos?.avatarurl || this.defaultAvatar;
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