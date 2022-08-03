

export default function pushStorageSave(data) {
    let newAry = JSON.parse(uni.getStorageSync("pushStorageData")) || [];
    console.log('newAry>>>', newAry);
    const { userId, type } = data; 
    if (!newAry.includes(userId) && type === "add") {      
        console.log('1>>>>>>');  
        newAry.push(userId);
    } else if (newAry.includes(userId) && type === "remove") {
        console.log('2>>>>>');
        newAry = newAry.filter(item => item !== userId);
    }
    uni.setStorage({
        key: 'pushStorageData',
        data: JSON.stringify(newAry),
        success: function (params) {
            console.log('>>>>>><<<<<<<<', JSON.parse(uni.getStorageSync("pushStorageData")));
        }
    });
};