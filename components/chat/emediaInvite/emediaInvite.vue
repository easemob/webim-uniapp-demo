<template>
	<view class="wraper">
		<view class="search" v-if="search_btn">
			<view bindtap="openSearch">
				<icon type="search" size="13"></icon>
				<text>搜索</text>
			</view>
		</view>
	
		<view class="search_input" v-if="search_friend">
			<view>
				<icon type="search" size="13"></icon>
				<input placeholder="搜索" 
					placeholder-style="color:#CFCFCF;line-height:20px;font-size:12px;" 
					auto-focus
					confirm-type="search"
					type='text'
					bindconfirm="onSearch"
					bindinput="onInput"
					:value="input_code"
					></input>
					<icon type="clear" size="13" catchtap='clearInput' v-if="show_clear"></icon>
			</view>
			<text bindtap="cancel">取消</text>
		</view>
		
		<scroll-view
			class="content" 
			enable-back-to-top
			scroll-y="true"
			scroll-with-animation="true" 
			:style="{height: second_height + 'px'}"
		> 
	
		<checkbox-group v-for="item in renderList" :data-item="item" :key="item.member||item.owner"  :id="item.id" :data-id='item.id' @change="checkboxChange"> 
	
			<view class="tap_mask" @tap="into_room" :data-username="item.member||item.owner">
	          	<view class="address_bottom" :data-username="item.member||item.owner" @tap="into_room">
					<image src="../../../static/images/theme2x.png" @tap="into_room" :data-username="item.member||item.owner"></image>
		          	<text @tap="into_room" :data-username="item.member||item.owner">{{item.member||item.owner}}</text>
		          	<checkbox :value="item.member||item.owner" :checked="item.checked" :disabled="item.disabled"/>
	      		</view>
	  		</view>
	
		</checkbox-group>
		</scroll-view>
	
		<view class="btnWraper">
			<button class="button" @tap="startConfr">{{buttonText}}</button>
			<button class="button red" @tap="goBack">返回</button>
		</view>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				search_btn: true,
				search_friend: false,
				groupMember: [],
				serchList: [],
		
				checkedValue: [],
				renderList: [],
				buttonText: '发起会议',
				second_height: 450,
				show_clear: false,
			}
		},
		props: {
		  username: {
		    type: Object,
		    default: () => ({})
		  },
		  action: {
		    type: String,
		    default: ''
		  }
		},
		mounted() {
			console.log('邀请页面的参数', this)
			console.log(this.properties)
			var that = this
			// 获取系统信息
			wx.getSystemInfo({
				success: function (res) {
					console.log('height=' + res.windowHeight);
					console.log('width=' + res.windowWidth);
					// 计算主体部分高度,单位为px
					that.setData({
					  // second部分高度 = 利用窗口可使用高度 - first部分高度（这里的高度单位为px，所有利用比例将300rpx转换为px）
					  second_height: res.windowHeight - res.windowWidth / 750 * 300
					})
				}
			})

			if(this.action == 'invite'){
				this.setData({
					buttonText: '邀请'
				})
			}

			var roomId = this.username&&this.username.groupId
			console.log('roomId', this.username)
			roomId&&this.getGroupMember(roomId)
		},
		methods: {
			getGroupMember: function(roomId){
				var me = this;
				// 获取群成员
				var pageNum = 1,
					pageSize = 1000;
				var options = {
					pageNum: pageNum,
					pageSize: pageSize,
					groupId: roomId,
					success: function(resp){
						console.log('获取群成员', resp)
						if(resp && resp.data){
							me.setData({
								groupMember: resp.data
							});
							me.getRenderList(resp.data)
						}
					},
					error: function(err){
	
					}
				};
				uni.WebIM.conn.listGroupMember(options);
			},
	
			getRenderList(list){
				console.log('this.checkedValue', this.checkedValue)
				let serchList = list.map((item) => {
					for (var i = 0; i < this.checkedValue.length; i++) {
						if((item.member&&item.member.indexOf(this.checkedValue[i]) != -1) || (item.owner&&item.owner.indexOf(this.checkedValue[i]) != -1)){
							item.checked = true
							return item
							break;
						}else{
							item.checked = false
						}
					}
					return item
				})
	
				serchList.forEach((item) => {
					if(item.member == wx.WebIM.conn.context.userId || item.owner == wx.WebIM.conn.context.userId){
						item.disabled = true
					}
					
				})
				this.setData({
					renderList: serchList
				})
				console.log('serchList >>>>', serchList)
	
			},
	
	
			checkboxChange: function (e) {
				console.log('checkbox发生change事件，携带value值为：', e)
				if(this.checkedValue.indexOf(e.detail.value) == -1 && e.detail.value[0]){
					this.checkedValue.push(e.detail.value[0])
					console.log(this.checkedValue)
				}else{
					let value = e.target.dataset.item.name
					this.checkedValue.splice(this.checkedValue.indexOf(value), 1)
					console.log(this.checkedValue)
				}
			},
	
			openSearch: function(){
				this.setData({
					search_btn: false,
					search_friend: true,
					show_mask: true,
					gotop: true
				});
			},
	
			cancel: function(){
				this.setData({
					search_btn: true,
					search_friend: false,
					gotop: false
					//show_mask: false
				});
				//this.getBrands(this.member)
			},
	
			
	
			onInput(e){
	
				let inputValue = e.detail.value
				if (inputValue) {
					this.setData({
						show_clear: true
					})
				} else {
					this.setData({
						show_clear: false
					})
				}
			},
	
			clearInput: function(){
				this.setData({
					input_code: '',
					show_clear: false
				})
			},
	
			cancel: function(){
				this.setData({
					search_btn: true,
					search_friend: false,
				});
				let original = this.groupMember||[]
				this.getRenderList(original)
			},
	
			onSearch: function(val){
				let searchValue = val.detail.value
				let member = this.groupMember;
				let serchList = [];
				member.forEach((item, index)=>{
					if(String(item.member).indexOf(searchValue) != -1 || String(item.owner).indexOf(searchValue) != -1){
						serchList.push(item)
					}
				})
				// this.setData({
				// 	groupMember: serchList
				// })
	
				this.getRenderList(serchList)
			},
	
			startConfr(){
				this.$emit('onStartConfr', {confrMember: this.checkedValue, action: this.action, groupId: this.username.groupId})
				this.setData({
					checkedValue: []
				})
			},
	
			goBack(){
				this.setData({
					checkedValue: []
				})
				this.$emit('goBack')
			},
			
			into_room(){
				
			}
		}
	}
</script>
<style>
@import "./emediaInvite.css";
</style>

