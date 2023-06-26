# webim-uniapp-demo-vue3

# 介绍

demo 包含以下核心功能

- 会话列表
- 系统通知
- 联系人
- 添加好友
- 群组创建
- 群组详情
- 我的
- 用户属性
- 单人聊天
- 群组聊天
- 文本、图片、语音、附件、个人名片收发。

# 在本地跑起来

拉取代码，在 HBuliderX 工具点击运行至想要的平台中即可运行起来。

# 项目结构核心目录说明

```shell
|- components 自定义组件目录
    |-emChat 聊天页面核心组件（消息列表、输入框相关代码）
    |-swipedelete 测滑删除组件
|-static/images demo中用到的图片 还有表情
|-EaseIM 环信IM核心逻辑文件
    |-config IM相关配置
    |-constant 相关常量
    |-imApis 项目中所用IM SDK api方法
    |-listener IM监听回调
    |-utils 相关工具
    |-index.js 核心sdk初始化在此js文件中完成并导出
|-layout 布局（tab-bar）
|-recorderCore H5录音包
|-pages 功能页面
    |-login 登录页
    |-home home页面
    |-conversation 会话列表页面
    |-contacts 联系人页
    |-me 我的页面
    |-addNewFriend 加好友页
    |-addGroups 创建新群
    |-groups 群组列表页
    |-groupSetting 群组设置页
    |-notificaton 通知入口页（群组、单人通知）
    |-notificatonFriendDetail 加好友通知页
    |-notificatonGroupDetail 加群组通知页
    |-moreMenu 更多功能页面
    |-profile 用户属性展示页
    |-searchMsg 消息搜索页面
    |-settingGeneral 设置功能
|-utils 工具类和sdk的一些配置
|-stores pinia store 全局状态管理
|-uni_modules uni插件包
|-node_modules 这个相信不需要特别说明（IMSDK在此中）
|-app.vue 项目根组件（注册IM监听事件、处理连接跳转）
|-app.json 注册页面以及全局的一些配置
|-app.css 一些全局样式
```

# 常见问题

- 如何从短信验证码方式登录切换为用户 id+密码登陆？
  > 答：在 login>loginState>usePwdLogin 此配置项改为 false 即可。
