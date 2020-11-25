<template>
	<view v-if="visible" class="wraper">
		<view>
			<button type="default" @tap="callVideo">会议模式</button>
			<button
				type="default"
				@tap="cancel"
			> 取消 </button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				visible: false
			}
		},
		methods: {
			show(){
				this.setData({
					visible: true
				})
			},
			cancel(){
				console.log('取消')
				this.setData({
					visible: false
				})
			},
	
			callAudio(){
				//this.triggerEvent('makeAudioCall', 'single')
				this.$emit("makeAudioCall", null, 'single');
				this.cancel()
			},
	
			callVideo(){
				console.log('callVideo')
				this.$emit("makeVideoCall", null, 'single');
				//this.triggerEvent('makeVideoCall', 'single')
				this.cancel()
			}
		}
	}
</script>

<style>
.wraper{
	position: fixed;
	bottom: 0;
	height: 200rpx;
	width: 100%;
	z-index: 9;
	background: #FFFFFF;
}
.other-button-hover {
  background-color: blue;
}
.button-cancel {
	position: absolute;
	width: 100%;
	bottom: 0;
}
</style>
