# webim-uniapp-demo

# 介绍
demo 包含以下功能
  - 最近通话
  - 通讯录
  - 通知（加好友、加群）
  - 设置

# 在本地跑起来
拉取代码，在HBuliderX工具中即可运行起来。

# 数据结构
```
登录页：
		login: {
			name:'',
			psd: '',
			grant_type: 'password',
		}
		
注册页：
		register: {
			username: '',
			password: ''
		}
		
通讯录页：
	   member:[],   //好友列表
	   
聊天页：
	   chatMsg:[{
			info:{
		        to:''         
			},
			username:'',      //用户名
			yourname:'',      //好友名
			msg: {
				type:'',    
				data:''
			},
			style:'',       //样式
			time:'',
			mid:''        //message ID
	   }]
	   
globalData: 
	userInfo: '',  //用户微信授权信息
	chatMsg: []   //用于存储离线消息
	unReadMessageNum: 0, //未读消息数
	saveFriendList: [],//加好友申请
	saveGroupInvitedList: [], //加群邀请
	isIPX: false //是否为iphone X //是否为iphoneX
	
缓存：
   myUsername: ''    //缓存登录用户名	   
   yourname + myName:''  //以用户名跟好友名为key来缓存聊天记录
```

# 项目结构
```shell
|- components 自定义组件目录
    |-chat 聊天页面
    |-swipedelete 测滑删除
|-static/images demo中用到的图片 还有表情
|-pages 功能页面
    |-register 注册页
    |-login 登录页
    |-login_token token登录页
    |-chat 最近联系人页（通话）
        |-chatroom 聊天室页
    |-main 联系人页
        |-add_new 加好友页
        |-group 群组页
            |-groupSetting 群组设置页
    |-notificaton 通知页
    |-notificaton_friendDetail 加好友通知页
    |-notificaton_groupDetail 加群组通知页
    |-setting 设置页
        |-setting_general 通用设置页
|-utils 工具类和sdk的一些配置
|-newSDK 环信sdk
|-app.vue 小程序根实例，存放一些全局变量，注册监听事件
|-app.json 注册页面以及全局的一些配置
|-app.css 一些全局样式
|-project.config.json工程的一些配置，和开发者工具 “详情” 中的设置一样
```


# 常见问题

+ 小程序开发工具提示错误信息：{type: 206}，并提示 illegal buffer，然后socket连接中断并提示{code: 1000, reason: "normal closure"}

  {type: 206}:账号在另外一端服务登陆，socket断连。提示illegal buffer不影响业务功能，后期sdk会屏蔽此提示
