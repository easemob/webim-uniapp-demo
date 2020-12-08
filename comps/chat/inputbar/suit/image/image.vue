<template>
	<view></view>
</template>
<script>
	let WebIM = require("../../../../../utils/WebIM")["default"];
	let msgType = require("../../../msgtype");
	let disp = require("../../../../../utils/broadcast");
	let msgStorage = require("../../../msgstorage");
	export default {
		data() {
			return {};
		},

		components: {},
		props: {
			username: {
				type: Object,
				default: () => ({})
			},
			chatType: {
				type: String,
				default: msgType.chatType.SINGLE_CHAT
			}
		},
		methods: {
			openCamera() {
				var me = this;
				uni.chooseImage({
					count: 1,
					sizeType: ["original", "compressed"],
					sourceType: ["camera"],

					success(res) {
						me.upLoadImage(res);
					}

				});
			},

			sendImage() {
				var me = this;
				uni.chooseImage({
					count: 1,
					sizeType: ["original", "compressed"],
					sourceType: ["album"],

					success(res) {
						console.log('选择的图片', res)
						me.upLoadImage(res);
					}

				});
			},

			isGroupChat() {
				return this.chatType == msgType.chatType.CHAT_ROOM;
			},

			getSendToParam() {
				return this.isGroupChat() ? this.username.groupId : this.username.your;
			},

			upLoadImage(res) {
				var me = this;
				var tempFilePaths = res.tempFilePaths;
				var token = WebIM.conn.context.accessToken;
				uni.getImageInfo({
					src: res.tempFilePaths[0],

					success(res) {
						var allowType = {
							jpg: true,
							jpeg: true,
							gif: true,
							png: true,
							bmp: true
						};
						var str = WebIM.config.appkey.split("#");
						var width = res.width;
						var height = res.height;
						var index = res.path.lastIndexOf(".");
						console.log('index>>',index);
						var filetype = ~index && res.path.slice(index + 1) || "";
						if (!res.type) {
							uni.showToast({
								title: "H5端，uni-app暂未支持",
                      			icon: "none"
							})
						}
						if (filetype.toLowerCase() in allowType || res.type in allowType) {
							uni.uploadFile({
								url: "https://a1-hsb.easemob.com/" + str[0] + "/" + str[1] + "/chatfiles",
								filePath: tempFilePaths[0],
								fileType: 'image',
								name: "file",
								header: {
									// "Content-Type": "multipart/form-data",
									'Content-Type': 'application/x-www-form-urlencoded',
									Authorization: "Bearer " + token
								},
								success: (res)=>{
									console.log('上传图片成功', res)
									if (res.statusCode == 400) {
										// 图片上传阿里云检验不合法
										// var errData = JSON.parse(res.data);
										// if (errData.error === 'content improper') {
										uni.showToast({
											title: "图片检测不合法",
											duration: 1000
										});
										return false
										// }
									}
									var data = res.data;
									var dataObj = JSON.parse(data);
									var id = WebIM.conn.getUniqueId(); // 生成本地消息 id

									var msg = new WebIM.message(msgType.IMAGE, id);
									var file = {
										type: msgType.IMAGE,
										size: {
											width: width,
											height: height
										},
										url: dataObj.uri + "/" + dataObj.entities[0].uuid,
										filetype: filetype,
										filename: tempFilePaths[0]
									};
									msg.set({
										apiUrl: WebIM.config.apiURL,
										body: file,
										from: me.username.myName,
										to: me.getSendToParam(),
										roomType: false,
										chatType: me.chatType,
										success: function(argument) {
											disp.fire('em.chat.sendSuccess', id);
										}
									});

									if (me.chatType == msgType.chatType.CHAT_ROOM) {
										msg.setGroup("groupchat");
									}

									WebIM.conn.send(msg.body);
									let obj = {
										msg: msg,
										type: msgType.IMAGE
									}
									me.saveSendMsg(obj);
								},
								fail: (err) => {
									console.log('上传失败', err)
								},
								complete: (err) => {
									console.log('上传完成', err)
								}
							});
						}
					}
				});
			},
			saveSendMsg(evt) {
				msgStorage.saveMsg(evt.msg, evt.type);
			}

		}
	};
</script>
