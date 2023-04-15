<template>
	<view>
		<u-modal class="selcet_modal" title="选择好友名片" v-model="showSelectUserModal" :show-cancel-button="true" @confirm="confirmPicked" @cancel="cannelPick">
				<scroll-view scroll-y="true" class="scroll-Y" @touchmove.stop>
					<u-radio-group v-model="value" :wrap="true">
								<u-radio 
									v-for="(item, index) in friendList" :key="index" 
									:name="item.hxId"
								>
									{{item.nickname || item.hxId}}
								</u-radio>
					</u-radio-group>
				</scroll-view>
		</u-modal>
	</view>
</template>
	
<script>
	export default {
		props:{
			showModal:{
				type:Boolean,
				default:false
			}
		},
		data() {	
			return {
				showSelectUserModal:this.showModal,
				friendList: [],
				value:''
			}
		},
		watch:{
			showModal(newVal,oldVal){
				console.log('>>>>监听到showModal',newVal)
				if(newVal){
					this.initFriendList()
				}
				this.showSelectUserModal = newVal
			}
		},
		methods: {
			initFriendList(){
				const friendUserInfos = getApp().globalData.friendUserInfoMap
				const membersList = uni.getStorageSync('member')
				let friendList = []
				membersList.length && membersList.map(item=>{
					const member = {
						hxId:'',
						nickname:''
					}
					item.name && (member.hxId = item.name)
					if(friendUserInfos.has(item.name)){
						friendUserInfos.get(item.name)?.nickname?(member.nickname = friendUserInfos.get(item.name).nickname) : item.name
					}
					return friendList.push(member)
				})
				console.log('friendList',friendList)
				this.friendList = friendList
			},
			confirmPicked(){
				const callback = ()=>{
					this.value = ''
				}
				this.$emit('sendUserCardMessage',this.value,callback)
			},
			cannelPick(){
				this.value = ''
				this.$parent.showModal = false
			}
		}
	}
</script>
<style lang="scss" scoped>
	.slot-content {
		font-size: 28rpx;
		color: $u-content-color;
		padding-left: 30rpx;
	}
	/deep/ .u-mode-center-box{
		padding: 0 50rpx;
	}
	.scroll-Y{
		height: 300rpx;
	}
</style>