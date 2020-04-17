<template name="toast">
	<view class="toast_content_box">
		<view class="toast_content" v-if="isHidefil">
			<view class="toast_content_border"></view>
			<view class="toast_content_icon">
				<image class="toast_icon_img" src="/static/images/filled@2x.png"></image>
			</view>
			<view class="toast_content_text">{{content}}</view>
		</view>

		<view class="toast_content_box">
			<view class="toast_content" v-if="isHidescss">
				<view class="toast_content_border toast_success"></view>
				<view class="toast_content_icon">
					<image class="toast_icon_img" src="/static/images/success@2x.png"></image>
				</view>
				<view class="toast_content_text">{{content}}</view>
			</view>
		</view>
	</view>
</template>