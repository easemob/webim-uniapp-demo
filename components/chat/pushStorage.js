
var WebIM = require("../../utils/WebIM")["default"];
export function pushStorageSave(data) {
    // JSON.parse(uni.getStorageSync("pushStorageData")) ||
    let currentLoginUser = WebIM.conn.context.userId
    let newObj = uni.getStorageSync("pushStorageData") || {};
    let newAry = newObj[currentLoginUser] || [];
    const { userId, type } = data; 
    if (!newAry.includes(userId) && type === "add") {      
        newAry = newAry.concat(userId);
    } else if (newAry.includes(userId)  && type === "remove") {
        newAry = newAry.filter(item => item !== userId);
    }
    newObj[currentLoginUser] = newAry;
    uni.setStorage({
        key: 'pushStorageData',
        data: newObj,
        success: function (params) {
            console.log('uni.setStorage>>>', uni.getStorageSync("pushStorageData"));
        }
    });
};

export function onGetSilentConfig(message) {
    console.log('message>>>',message);
    const currentLoginUser = WebIM.conn.context.userId;
    const { from, to, type } = message;
    const res = uni.getStorageInfoSync();
    console.log("uni.getStorageSync('pushStorageData')>>>", uni.getStorageSync('pushStorageData'));
    let pushObj = uni.getStorageSync('pushStorageData') || {};
    console.log('obj>>>', pushObj);
    let pushAry = pushObj[currentLoginUser] || [];
    console.log('pushAry>>>', pushAry);
    const option = {
        conversationId: type === "chat" ? from : to,
        type: type === "chat" ? "singleChat" : "groupChat",
    };
    console.log('option>>>',option);
    WebIM.conn.getSilentModeForConversation(option).then((res) => {
        if (res.data.type === "NONE") {
            if (!pushAry.includes(option.conversationId)) {
                pushAry.push(option.conversationId)
            }
        }
        pushObj.pushAry = pushAry;
        uni.setStorage({
            key: 'pushStorageData',
            data: pushObj,
            success: function (params) {
                console.log('>>>>>>', JSON.parse(uni.getStorageSync("pushStorageData")));
            }
        });
    });
}