import RtcEngine, {
	RtcChannel
} from '../../Agora-RTC-JS/index';
import {
	ClientRole,
	ChannelProfile
} from '../../Agora-RTC-JS/common/Enums';
import {
	AGORA_APP_ID
} from '../contants';
import {
	requestAndroidPermission
} from '../utils/permision';
let rtcClient = null;
let localUid = ''
const useBasicAgoraRtc = () => {
	const initRtcClient = async () => {
		rtcClient = await RtcEngine.create(AGORA_APP_ID);
		await rtcClient.setChannelProfile(ChannelProfile.LiveBroadcasting);
		await rtcClient.setClientRole(ClientRole.Broadcaster);
		console.log('>>>>>>>+++++++rtcClient', rtcClient);
		addRtcListener();
	};
	const addRtcListener = () => {
		console.log('>>>>>>声网相关监听挂载');
		rtcClient.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
			console.info('JoinChannelSuccess', channel, uid, elapsed);
		});
		rtcClient.addListener('UserJoined', (uid, elapsed) => {
			console.info('UserJoined', uid, elapsed);
		});
		rtcClient.addListener('UserOffline', (uid, reason) => {
			console.info('UserOffline', uid, reason);
		});
		rtcClient.addListener('LeaveChannel', (stats) => {
			console.info('LeaveChannel', stats);
		});
	};
	const joinRtcChannel = async (channelToken, channelName, channelUserId) => {
		console.log('>>>>>调用了加入rtcChannel', channelToken, channelName, channelUserId);
		if (uni.getSystemInfoSync().platform === 'android') {
			await requestAndroidPermission('android.permission.RECORD_AUDIO');
			await requestAndroidPermission('android.permission.CAMERA');
		}
		try {
			(await rtcClient) &&
			// rtcClient.joinChannelWithUserAccount(channelToken, channelName, channelUserId);
			rtcClient.joinChannel(
				channelToken,
				channelName,
				null,
				channelUserId
			);
		} catch (error) {
			console.log('++++++++加入失败', error);
		}
	};

	const leaveRtcChannel = async () => {
		(await rtcClient) && rtcClient.leaveChannel();
	};
	return {
		rtcClient,
		initRtcClient,
		addRtcListener,
		joinRtcChannel,
		leaveRtcChannel,
	};
};

export default useBasicAgoraRtc;