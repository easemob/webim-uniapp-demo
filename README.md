

# 环信UNIAPP（Vue3 + Typescript）示例项目

## 本地运行

要在本地运行此项目，请按照以下步骤操作：

1. 在项目根目录安装依赖包：

    ```bash
    yarn
    ```

2. 运行方式
  - 在HBuilderX工具中运行起来
  - 在命令行工具中运行`npm run build:h5` 参考package.json中的 `scripts`支持的命令。

## 说明

运行平台支持
- IOS
- Android
- H5
- 微信小程序

本项目中使用的 `手机号验证码登录`、`获取手机验证码` 和 `设置头像` API接口是环信内部接口。在集成过程中，请替换为您自己的接口。


## 实现功能

### 登录

- **手机号验证码登录**
- **自定义Appkey用户名密码登录**
- **自动登录**

### 会话列表

- 删除会话
- 多端会话同步
- 置为已读

### 消息

- 获取服务端历史消息
- 文本消息
- 图片消息
- 视频消息
- 语音消息（Web端不支持发送）
- 撤回消息
- 本地通知消息
### 通讯录

- 我的好友
- 我加入的群组
- 黑名单

### 好友操作

- 申请好友
- 同意好友申请
- 拒绝好友申请
- 好友备注

### 群组操作

- 申请加群
- 创建群组
- 解散群组
- 离开群组
- 添加/移除群成员
- 查看全部群成员
- 接收加群邀请
- 拒绝加群邀请

### 系统通知

- 好友事件通知
- 群组事件通知

### 用户属性

- 设置用户头像、昵称、签名
- 获取联系人，群组成员用户属性

## 贡献指南

如果您有任何改进建议或遇到问题，请提交Issue或Pull Request。
