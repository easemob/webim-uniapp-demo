/**
 * Regions for connection.
 */
export let AreaCode;
/**
 * Audio codec profile.
 */

(function (AreaCode) {
  AreaCode[AreaCode["CN"] = 1] = "CN";
  AreaCode[AreaCode["NA"] = 2] = "NA";
  AreaCode[AreaCode["EU"] = 4] = "EU";
  AreaCode[AreaCode["AS"] = 8] = "AS";
  AreaCode[AreaCode["JP"] = 16] = "JP";
  AreaCode[AreaCode["IN"] = 32] = "IN";
  AreaCode[AreaCode["GLOB"] = -1] = "GLOB";
})(AreaCode || (AreaCode = {}));

export let AudioCodecProfileType;
/**
 * Audio equalization band frequency.
 */

(function (AudioCodecProfileType) {
  AudioCodecProfileType[AudioCodecProfileType["LCAAC"] = 0] = "LCAAC";
  AudioCodecProfileType[AudioCodecProfileType["HEAAC"] = 1] = "HEAAC";
  AudioCodecProfileType[AudioCodecProfileType["HE_AAC_V2"] = 2] = "HE_AAC_V2";
})(AudioCodecProfileType || (AudioCodecProfileType = {}));

export let AudioEqualizationBandFrequency;
/**
 * The error information of the local audio.
 */

(function (AudioEqualizationBandFrequency) {
  AudioEqualizationBandFrequency[AudioEqualizationBandFrequency["Band31"] = 0] = "Band31";
  AudioEqualizationBandFrequency[AudioEqualizationBandFrequency["Band62"] = 1] = "Band62";
  AudioEqualizationBandFrequency[AudioEqualizationBandFrequency["Band125"] = 2] = "Band125";
  AudioEqualizationBandFrequency[AudioEqualizationBandFrequency["Band250"] = 3] = "Band250";
  AudioEqualizationBandFrequency[AudioEqualizationBandFrequency["Band500"] = 4] = "Band500";
  AudioEqualizationBandFrequency[AudioEqualizationBandFrequency["Band1K"] = 5] = "Band1K";
  AudioEqualizationBandFrequency[AudioEqualizationBandFrequency["Band2K"] = 6] = "Band2K";
  AudioEqualizationBandFrequency[AudioEqualizationBandFrequency["Band4K"] = 7] = "Band4K";
  AudioEqualizationBandFrequency[AudioEqualizationBandFrequency["Band8K"] = 8] = "Band8K";
  AudioEqualizationBandFrequency[AudioEqualizationBandFrequency["Band16K"] = 9] = "Band16K";
})(AudioEqualizationBandFrequency || (AudioEqualizationBandFrequency = {}));

export let AudioLocalError;
/**
 * The state of the local audio.
 */

(function (AudioLocalError) {
  AudioLocalError[AudioLocalError["Ok"] = 0] = "Ok";
  AudioLocalError[AudioLocalError["Failure"] = 1] = "Failure";
  AudioLocalError[AudioLocalError["DeviceNoPermission"] = 2] = "DeviceNoPermission";
  AudioLocalError[AudioLocalError["DeviceBusy"] = 3] = "DeviceBusy";
  AudioLocalError[AudioLocalError["RecordFailure"] = 4] = "RecordFailure";
  AudioLocalError[AudioLocalError["EncodeFailure"] = 5] = "EncodeFailure";
  AudioLocalError[AudioLocalError["Interrupted"] = 8] = "Interrupted";
})(AudioLocalError || (AudioLocalError = {}));

export let AudioLocalState;
/**
 * The reason for the change of the music file playback state.
 */

(function (AudioLocalState) {
  AudioLocalState[AudioLocalState["Stopped"] = 0] = "Stopped";
  AudioLocalState[AudioLocalState["Recording"] = 1] = "Recording";
  AudioLocalState[AudioLocalState["Encoding"] = 2] = "Encoding";
  AudioLocalState[AudioLocalState["Failed"] = 3] = "Failed";
})(AudioLocalState || (AudioLocalState = {}));

export let AudioMixingReason;
/**
 * The state of the audio mixing file.
 */

(function (AudioMixingReason) {
  AudioMixingReason[AudioMixingReason["CanNotOpen"] = 701] = "CanNotOpen";
  AudioMixingReason[AudioMixingReason["TooFrequentCall"] = 702] = "TooFrequentCall";
  AudioMixingReason[AudioMixingReason["InterruptedEOF"] = 703] = "InterruptedEOF";
  AudioMixingReason[AudioMixingReason["StartedByUser"] = 720] = "StartedByUser";
  AudioMixingReason[AudioMixingReason["OneLoopCompleted"] = 721] = "OneLoopCompleted";
  AudioMixingReason[AudioMixingReason["StartNewLoop"] = 722] = "StartNewLoop";
  AudioMixingReason[AudioMixingReason["AllLoopsCompleted"] = 723] = "AllLoopsCompleted";
  AudioMixingReason[AudioMixingReason["StoppedByUser"] = 724] = "StoppedByUser";
  AudioMixingReason[AudioMixingReason["PausedByUser"] = 725] = "PausedByUser";
  AudioMixingReason[AudioMixingReason["ResumedByUser"] = 726] = "ResumedByUser";
  AudioMixingReason[AudioMixingReason["OK"] = 0] = "OK";
})(AudioMixingReason || (AudioMixingReason = {}));

export let AudioMixingStateCode;
/**
 * Audio output routing.
 */

(function (AudioMixingStateCode) {
  AudioMixingStateCode[AudioMixingStateCode["Playing"] = 710] = "Playing";
  AudioMixingStateCode[AudioMixingStateCode["Paused"] = 711] = "Paused";
  AudioMixingStateCode[AudioMixingStateCode["Restart"] = 712] = "Restart";
  AudioMixingStateCode[AudioMixingStateCode["Stopped"] = 713] = "Stopped";
  AudioMixingStateCode[AudioMixingStateCode["Failed"] = 714] = "Failed";
})(AudioMixingStateCode || (AudioMixingStateCode = {}));

export let AudioOutputRouting;
/**
 * Audio profile.
 */

(function (AudioOutputRouting) {
  AudioOutputRouting[AudioOutputRouting["Default"] = -1] = "Default";
  AudioOutputRouting[AudioOutputRouting["Headset"] = 0] = "Headset";
  AudioOutputRouting[AudioOutputRouting["Earpiece"] = 1] = "Earpiece";
  AudioOutputRouting[AudioOutputRouting["HeadsetNoMic"] = 2] = "HeadsetNoMic";
  AudioOutputRouting[AudioOutputRouting["Speakerphone"] = 3] = "Speakerphone";
  AudioOutputRouting[AudioOutputRouting["Loudspeaker"] = 4] = "Loudspeaker";
  AudioOutputRouting[AudioOutputRouting["HeadsetBluetooth"] = 5] = "HeadsetBluetooth";
  AudioOutputRouting[AudioOutputRouting["AirPlay"] = 9] = "AirPlay";
})(AudioOutputRouting || (AudioOutputRouting = {}));

export let AudioProfile;
/**
 * Audio recording quality.
 */

(function (AudioProfile) {
  AudioProfile[AudioProfile["Default"] = 0] = "Default";
  AudioProfile[AudioProfile["SpeechStandard"] = 1] = "SpeechStandard";
  AudioProfile[AudioProfile["MusicStandard"] = 2] = "MusicStandard";
  AudioProfile[AudioProfile["MusicStandardStereo"] = 3] = "MusicStandardStereo";
  AudioProfile[AudioProfile["MusicHighQuality"] = 4] = "MusicHighQuality";
  AudioProfile[AudioProfile["MusicHighQualityStereo"] = 5] = "MusicHighQualityStereo";
})(AudioProfile || (AudioProfile = {}));

export let AudioRecordingQuality;
/**
 * Recording content.
 */

(function (AudioRecordingQuality) {
  AudioRecordingQuality[AudioRecordingQuality["Low"] = 0] = "Low";
  AudioRecordingQuality[AudioRecordingQuality["Medium"] = 1] = "Medium";
  AudioRecordingQuality[AudioRecordingQuality["High"] = 2] = "High";
  AudioRecordingQuality[AudioRecordingQuality["UltraHigh"] = 3] = "UltraHigh";
})(AudioRecordingQuality || (AudioRecordingQuality = {}));

export let AudioRecordingPosition;
/**
 * The state of the remote audio.
 */

(function (AudioRecordingPosition) {
  AudioRecordingPosition[AudioRecordingPosition["PositionMixedRecordingAndPlayback"] = 0] = "PositionMixedRecordingAndPlayback";
  AudioRecordingPosition[AudioRecordingPosition["PositionRecording"] = 1] = "PositionRecording";
  AudioRecordingPosition[AudioRecordingPosition["PositionMixedPlayback"] = 2] = "PositionMixedPlayback";
})(AudioRecordingPosition || (AudioRecordingPosition = {}));

export let AudioRemoteState;
/**
 * The reason of the remote audio state change.
 */

(function (AudioRemoteState) {
  AudioRemoteState[AudioRemoteState["Stopped"] = 0] = "Stopped";
  AudioRemoteState[AudioRemoteState["Starting"] = 1] = "Starting";
  AudioRemoteState[AudioRemoteState["Decoding"] = 2] = "Decoding";
  AudioRemoteState[AudioRemoteState["Frozen"] = 3] = "Frozen";
  AudioRemoteState[AudioRemoteState["Failed"] = 4] = "Failed";
})(AudioRemoteState || (AudioRemoteState = {}));

export let AudioRemoteStateReason;
/**
 * The preset local voice reverberation option.
 */

(function (AudioRemoteStateReason) {
  AudioRemoteStateReason[AudioRemoteStateReason["Internal"] = 0] = "Internal";
  AudioRemoteStateReason[AudioRemoteStateReason["NetworkCongestion"] = 1] = "NetworkCongestion";
  AudioRemoteStateReason[AudioRemoteStateReason["NetworkRecovery"] = 2] = "NetworkRecovery";
  AudioRemoteStateReason[AudioRemoteStateReason["LocalMuted"] = 3] = "LocalMuted";
  AudioRemoteStateReason[AudioRemoteStateReason["LocalUnmuted"] = 4] = "LocalUnmuted";
  AudioRemoteStateReason[AudioRemoteStateReason["RemoteMuted"] = 5] = "RemoteMuted";
  AudioRemoteStateReason[AudioRemoteStateReason["RemoteUnmuted"] = 6] = "RemoteUnmuted";
  AudioRemoteStateReason[AudioRemoteStateReason["RemoteOffline"] = 7] = "RemoteOffline";
})(AudioRemoteStateReason || (AudioRemoteStateReason = {}));

export let AudioReverbPreset;
/**
 * Audio reverberation type.
 */

(function (AudioReverbPreset) {
  AudioReverbPreset[AudioReverbPreset["Off"] = 0] = "Off";
  AudioReverbPreset[AudioReverbPreset["Popular"] = 1] = "Popular";
  AudioReverbPreset[AudioReverbPreset["RnB"] = 2] = "RnB";
  AudioReverbPreset[AudioReverbPreset["Rock"] = 3] = "Rock";
  AudioReverbPreset[AudioReverbPreset["HipHop"] = 4] = "HipHop";
  AudioReverbPreset[AudioReverbPreset["VocalConcert"] = 5] = "VocalConcert";
  AudioReverbPreset[AudioReverbPreset["KTV"] = 6] = "KTV";
  AudioReverbPreset[AudioReverbPreset["Studio"] = 7] = "Studio";
  AudioReverbPreset[AudioReverbPreset["FX_KTV"] = 1048577] = "FX_KTV";
  AudioReverbPreset[AudioReverbPreset["FX_VOCAL_CONCERT"] = 1048578] = "FX_VOCAL_CONCERT";
  AudioReverbPreset[AudioReverbPreset["FX_UNCLE"] = 1048579] = "FX_UNCLE";
  AudioReverbPreset[AudioReverbPreset["FX_SISTER"] = 1048580] = "FX_SISTER";
  AudioReverbPreset[AudioReverbPreset["FX_STUDIO"] = 1048581] = "FX_STUDIO";
  AudioReverbPreset[AudioReverbPreset["FX_POPULAR"] = 1048582] = "FX_POPULAR";
  AudioReverbPreset[AudioReverbPreset["FX_RNB"] = 1048583] = "FX_RNB";
  AudioReverbPreset[AudioReverbPreset["FX_PHONOGRAPH"] = 1048584] = "FX_PHONOGRAPH";
  AudioReverbPreset[AudioReverbPreset["VIRTUAL_STEREO"] = 2097153] = "VIRTUAL_STEREO";
})(AudioReverbPreset || (AudioReverbPreset = {}));

export let AudioReverbType;
/**
 * Audio sample rate.
 */

(function (AudioReverbType) {
  AudioReverbType[AudioReverbType["DryLevel"] = 0] = "DryLevel";
  AudioReverbType[AudioReverbType["WetLevel"] = 1] = "WetLevel";
  AudioReverbType[AudioReverbType["RoomSize"] = 2] = "RoomSize";
  AudioReverbType[AudioReverbType["WetDelay"] = 3] = "WetDelay";
  AudioReverbType[AudioReverbType["Strength"] = 4] = "Strength";
})(AudioReverbType || (AudioReverbType = {}));

export let AudioSampleRateType;
/**
 * Audio scenario.
 */

(function (AudioSampleRateType) {
  AudioSampleRateType[AudioSampleRateType["Type32000"] = 32000] = "Type32000";
  AudioSampleRateType[AudioSampleRateType["Type44100"] = 44100] = "Type44100";
  AudioSampleRateType[AudioSampleRateType["Type48000"] = 48000] = "Type48000";
})(AudioSampleRateType || (AudioSampleRateType = {}));

export let AudioScenario;
/**
 * The preset audio voice configuration used to change the voice effect.
 */

(function (AudioScenario) {
  AudioScenario[AudioScenario["Default"] = 0] = "Default";
  AudioScenario[AudioScenario["ChatRoomEntertainment"] = 1] = "ChatRoomEntertainment";
  AudioScenario[AudioScenario["Education"] = 2] = "Education";
  AudioScenario[AudioScenario["GameStreaming"] = 3] = "GameStreaming";
  AudioScenario[AudioScenario["ShowRoom"] = 4] = "ShowRoom";
  AudioScenario[AudioScenario["ChatRoomGaming"] = 5] = "ChatRoomGaming";
  AudioScenario[AudioScenario["IOT"] = 6] = "IOT";
  AudioScenario[AudioScenario["MEETING"] = 8] = "MEETING";
})(AudioScenario || (AudioScenario = {}));

export let AudioVoiceChanger;
/**
 * The camera capture preference.
 */

(function (AudioVoiceChanger) {
  AudioVoiceChanger[AudioVoiceChanger["Off"] = 0] = "Off";
  AudioVoiceChanger[AudioVoiceChanger["OldMan"] = 1] = "OldMan";
  AudioVoiceChanger[AudioVoiceChanger["BabyBoy"] = 2] = "BabyBoy";
  AudioVoiceChanger[AudioVoiceChanger["BabyGirl"] = 3] = "BabyGirl";
  AudioVoiceChanger[AudioVoiceChanger["ZhuBaJie"] = 4] = "ZhuBaJie";
  AudioVoiceChanger[AudioVoiceChanger["Ethereal"] = 5] = "Ethereal";
  AudioVoiceChanger[AudioVoiceChanger["Hulk"] = 6] = "Hulk";
  AudioVoiceChanger[AudioVoiceChanger["BEAUTY_VIGOROUS"] = 1048577] = "BEAUTY_VIGOROUS";
  AudioVoiceChanger[AudioVoiceChanger["BEAUTY_DEEP"] = 1048578] = "BEAUTY_DEEP";
  AudioVoiceChanger[AudioVoiceChanger["BEAUTY_MELLOW"] = 1048579] = "BEAUTY_MELLOW";
  AudioVoiceChanger[AudioVoiceChanger["BEAUTY_FALSETTO"] = 1048580] = "BEAUTY_FALSETTO";
  AudioVoiceChanger[AudioVoiceChanger["BEAUTY_FULL"] = 1048581] = "BEAUTY_FULL";
  AudioVoiceChanger[AudioVoiceChanger["BEAUTY_CLEAR"] = 1048582] = "BEAUTY_CLEAR";
  AudioVoiceChanger[AudioVoiceChanger["BEAUTY_RESOUNDING"] = 1048583] = "BEAUTY_RESOUNDING";
  AudioVoiceChanger[AudioVoiceChanger["BEAUTY_RINGING"] = 1048584] = "BEAUTY_RINGING";
  AudioVoiceChanger[AudioVoiceChanger["BEAUTY_SPACIAL"] = 1048585] = "BEAUTY_SPACIAL";
  AudioVoiceChanger[AudioVoiceChanger["GENERAL_BEAUTY_VOICE_MALE_MAGNETIC"] = 2097153] = "GENERAL_BEAUTY_VOICE_MALE_MAGNETIC";
  AudioVoiceChanger[AudioVoiceChanger["GENERAL_BEAUTY_VOICE_FEMALE_FRESH"] = 2097154] = "GENERAL_BEAUTY_VOICE_FEMALE_FRESH";
  AudioVoiceChanger[AudioVoiceChanger["GENERAL_BEAUTY_VOICE_FEMALE_VITALITY"] = 2097155] = "GENERAL_BEAUTY_VOICE_FEMALE_VITALITY";
})(AudioVoiceChanger || (AudioVoiceChanger = {}));

export let CameraCaptureOutputPreference;
/**
 * The camera direction.
 */

(function (CameraCaptureOutputPreference) {
  CameraCaptureOutputPreference[CameraCaptureOutputPreference["Auto"] = 0] = "Auto";
  CameraCaptureOutputPreference[CameraCaptureOutputPreference["Performance"] = 1] = "Performance";
  CameraCaptureOutputPreference[CameraCaptureOutputPreference["Preview"] = 2] = "Preview";
  CameraCaptureOutputPreference[CameraCaptureOutputPreference["Manual"] = 3] = "Manual";
})(CameraCaptureOutputPreference || (CameraCaptureOutputPreference = {}));

export let CameraDirection;
/**
 * The error code in AgoraChannelMediaRelayError.
 */

(function (CameraDirection) {
  CameraDirection[CameraDirection["Rear"] = 0] = "Rear";
  CameraDirection[CameraDirection["Front"] = 1] = "Front";
})(CameraDirection || (CameraDirection = {}));

export let ChannelMediaRelayError;
/**
 * The event code in `ChannelMediaRelayEvent`.
 */

(function (ChannelMediaRelayError) {
  ChannelMediaRelayError[ChannelMediaRelayError["None"] = 0] = "None";
  ChannelMediaRelayError[ChannelMediaRelayError["ServerErrorResponse"] = 1] = "ServerErrorResponse";
  ChannelMediaRelayError[ChannelMediaRelayError["ServerNoResponse"] = 2] = "ServerNoResponse";
  ChannelMediaRelayError[ChannelMediaRelayError["NoResourceAvailable"] = 3] = "NoResourceAvailable";
  ChannelMediaRelayError[ChannelMediaRelayError["FailedJoinSourceChannel"] = 4] = "FailedJoinSourceChannel";
  ChannelMediaRelayError[ChannelMediaRelayError["FailedJoinDestinationChannel"] = 5] = "FailedJoinDestinationChannel";
  ChannelMediaRelayError[ChannelMediaRelayError["FailedPacketReceivedFromSource"] = 6] = "FailedPacketReceivedFromSource";
  ChannelMediaRelayError[ChannelMediaRelayError["FailedPacketSentToDestination"] = 7] = "FailedPacketSentToDestination";
  ChannelMediaRelayError[ChannelMediaRelayError["ServerConnectionLost"] = 8] = "ServerConnectionLost";
  ChannelMediaRelayError[ChannelMediaRelayError["InternalError"] = 9] = "InternalError";
  ChannelMediaRelayError[ChannelMediaRelayError["SourceTokenExpired"] = 10] = "SourceTokenExpired";
  ChannelMediaRelayError[ChannelMediaRelayError["DestinationTokenExpired"] = 11] = "DestinationTokenExpired";
})(ChannelMediaRelayError || (ChannelMediaRelayError = {}));

export let ChannelMediaRelayEvent;
/**
 * The state code in [`ChannelMediaRelayState`]{@link ChannelMediaRelayState}.
 */

(function (ChannelMediaRelayEvent) {
  ChannelMediaRelayEvent[ChannelMediaRelayEvent["Disconnect"] = 0] = "Disconnect";
  ChannelMediaRelayEvent[ChannelMediaRelayEvent["Connected"] = 1] = "Connected";
  ChannelMediaRelayEvent[ChannelMediaRelayEvent["JoinedSourceChannel"] = 2] = "JoinedSourceChannel";
  ChannelMediaRelayEvent[ChannelMediaRelayEvent["JoinedDestinationChannel"] = 3] = "JoinedDestinationChannel";
  ChannelMediaRelayEvent[ChannelMediaRelayEvent["SentToDestinationChannel"] = 4] = "SentToDestinationChannel";
  ChannelMediaRelayEvent[ChannelMediaRelayEvent["ReceivedVideoPacketFromSource"] = 5] = "ReceivedVideoPacketFromSource";
  ChannelMediaRelayEvent[ChannelMediaRelayEvent["ReceivedAudioPacketFromSource"] = 6] = "ReceivedAudioPacketFromSource";
  ChannelMediaRelayEvent[ChannelMediaRelayEvent["UpdateDestinationChannel"] = 7] = "UpdateDestinationChannel";
  ChannelMediaRelayEvent[ChannelMediaRelayEvent["UpdateDestinationChannelRefused"] = 8] = "UpdateDestinationChannelRefused";
  ChannelMediaRelayEvent[ChannelMediaRelayEvent["UpdateDestinationChannelNotChange"] = 9] = "UpdateDestinationChannelNotChange";
  ChannelMediaRelayEvent[ChannelMediaRelayEvent["UpdateDestinationChannelIsNil"] = 10] = "UpdateDestinationChannelIsNil";
  ChannelMediaRelayEvent[ChannelMediaRelayEvent["VideoProfileUpdate"] = 11] = "VideoProfileUpdate";
  ChannelMediaRelayEvent[ChannelMediaRelayEvent["PauseSendPacketToDestChannelSuccess"] = 12] = "PauseSendPacketToDestChannelSuccess";
  ChannelMediaRelayEvent[ChannelMediaRelayEvent["PauseSendPacketToDestChannelFailed"] = 13] = "PauseSendPacketToDestChannelFailed";
  ChannelMediaRelayEvent[ChannelMediaRelayEvent["ResumeSendPacketToDestChannelSuccess"] = 14] = "ResumeSendPacketToDestChannelSuccess";
  ChannelMediaRelayEvent[ChannelMediaRelayEvent["ResumeSendPacketToDestChannelFailed"] = 15] = "ResumeSendPacketToDestChannelFailed";
})(ChannelMediaRelayEvent || (ChannelMediaRelayEvent = {}));

export let ChannelMediaRelayState;
/**
 * Channel profile.
 */

(function (ChannelMediaRelayState) {
  ChannelMediaRelayState[ChannelMediaRelayState["Idle"] = 0] = "Idle";
  ChannelMediaRelayState[ChannelMediaRelayState["Connecting"] = 1] = "Connecting";
  ChannelMediaRelayState[ChannelMediaRelayState["Running"] = 2] = "Running";
  ChannelMediaRelayState[ChannelMediaRelayState["Failure"] = 3] = "Failure";
})(ChannelMediaRelayState || (ChannelMediaRelayState = {}));

export let ChannelProfile;
/**
 * Client role in the `LiveBroadcasting` profile.
 */

(function (ChannelProfile) {
  ChannelProfile[ChannelProfile["Communication"] = 0] = "Communication";
  ChannelProfile[ChannelProfile["LiveBroadcasting"] = 1] = "LiveBroadcasting";
  ChannelProfile[ChannelProfile["Game"] = 2] = "Game";
})(ChannelProfile || (ChannelProfile = {}));

export let ClientRole;
/**
 * Reasons for the connection state change.
 */

(function (ClientRole) {
  ClientRole[ClientRole["Broadcaster"] = 1] = "Broadcaster";
  ClientRole[ClientRole["Audience"] = 2] = "Audience";
})(ClientRole || (ClientRole = {}));

export let ConnectionChangedReason;
/**
 * Connection states.
 */

(function (ConnectionChangedReason) {
  ConnectionChangedReason[ConnectionChangedReason["Connecting"] = 0] = "Connecting";
  ConnectionChangedReason[ConnectionChangedReason["JoinSuccess"] = 1] = "JoinSuccess";
  ConnectionChangedReason[ConnectionChangedReason["Interrupted"] = 2] = "Interrupted";
  ConnectionChangedReason[ConnectionChangedReason["BannedByServer"] = 3] = "BannedByServer";
  ConnectionChangedReason[ConnectionChangedReason["JoinFailed"] = 4] = "JoinFailed";
  ConnectionChangedReason[ConnectionChangedReason["LeaveChannel"] = 5] = "LeaveChannel";
  ConnectionChangedReason[ConnectionChangedReason["InvalidAppId"] = 6] = "InvalidAppId";
  ConnectionChangedReason[ConnectionChangedReason["InvalidChannelName"] = 7] = "InvalidChannelName";
  ConnectionChangedReason[ConnectionChangedReason["InvalidToken"] = 8] = "InvalidToken";
  ConnectionChangedReason[ConnectionChangedReason["TokenExpired"] = 9] = "TokenExpired";
  ConnectionChangedReason[ConnectionChangedReason["RejectedByServer"] = 10] = "RejectedByServer";
  ConnectionChangedReason[ConnectionChangedReason["SettingProxyServer"] = 11] = "SettingProxyServer";
  ConnectionChangedReason[ConnectionChangedReason["RenewToken"] = 12] = "RenewToken";
  ConnectionChangedReason[ConnectionChangedReason["ClientIpAddressChanged"] = 13] = "ClientIpAddressChanged";
  ConnectionChangedReason[ConnectionChangedReason["KeepAliveTimeout"] = 14] = "KeepAliveTimeout";
  ConnectionChangedReason[ConnectionChangedReason["ProxyServerInterrupted"] = 15] = "ProxyServerInterrupted";
  ConnectionChangedReason[ConnectionChangedReason["SameUidLogin"] = 19] = "SameUidLogin";
  ConnectionChangedReason[ConnectionChangedReason["TooManyBroadcasters"] = 20] = "TooManyBroadcasters";
})(ConnectionChangedReason || (ConnectionChangedReason = {}));

export let ConnectionStateType;
/**
 * The video encoding degradation preference under limited bandwidth.
 */

(function (ConnectionStateType) {
  ConnectionStateType[ConnectionStateType["Disconnected"] = 1] = "Disconnected";
  ConnectionStateType[ConnectionStateType["Connecting"] = 2] = "Connecting";
  ConnectionStateType[ConnectionStateType["Connected"] = 3] = "Connected";
  ConnectionStateType[ConnectionStateType["Reconnecting"] = 4] = "Reconnecting";
  ConnectionStateType[ConnectionStateType["Failed"] = 5] = "Failed";
})(ConnectionStateType || (ConnectionStateType = {}));

export let DegradationPreference;
/**
 * Encryption mode.
 *
 * Agora recommends using either the `AES128GCM2` or `AES256GCM2` encryption mode,
 * both of which support adding a salt and are more secure.
 */

(function (DegradationPreference) {
  DegradationPreference[DegradationPreference["MaintainQuality"] = 0] = "MaintainQuality";
  DegradationPreference[DegradationPreference["MaintainFramerate"] = 1] = "MaintainFramerate";
  DegradationPreference[DegradationPreference["MaintainBalanced"] = 2] = "MaintainBalanced";
})(DegradationPreference || (DegradationPreference = {}));

export let EncryptionMode;
/**
 * Error codes occur when the SDK encounters an error that cannot be recovered automatically without any app intervention.
 */

(function (EncryptionMode) {
  EncryptionMode[EncryptionMode["None"] = 0] = "None";
  EncryptionMode[EncryptionMode["AES128XTS"] = 1] = "AES128XTS";
  EncryptionMode[EncryptionMode["AES128ECB"] = 2] = "AES128ECB";
  EncryptionMode[EncryptionMode["AES256XTS"] = 3] = "AES256XTS";
  EncryptionMode[EncryptionMode["SM4128ECB"] = 4] = "SM4128ECB";
  EncryptionMode[EncryptionMode["AES128GCM"] = 5] = "AES128GCM";
  EncryptionMode[EncryptionMode["AES256GCM"] = 6] = "AES256GCM";
  EncryptionMode[EncryptionMode["AES128GCM2"] = 7] = "AES128GCM2";
  EncryptionMode[EncryptionMode["AES256GCM2"] = 8] = "AES256GCM2";
})(EncryptionMode || (EncryptionMode = {}));

export let ErrorCode;
/**
 * State of importing an external video stream in a live broadcast.
 */

(function (ErrorCode) {
  ErrorCode[ErrorCode["NoError"] = 0] = "NoError";
  ErrorCode[ErrorCode["Failed"] = 1] = "Failed";
  ErrorCode[ErrorCode["InvalidArgument"] = 2] = "InvalidArgument";
  ErrorCode[ErrorCode["NotReady"] = 3] = "NotReady";
  ErrorCode[ErrorCode["NotSupported"] = 4] = "NotSupported";
  ErrorCode[ErrorCode["Refused"] = 5] = "Refused";
  ErrorCode[ErrorCode["BufferTooSmall"] = 6] = "BufferTooSmall";
  ErrorCode[ErrorCode["NotInitialized"] = 7] = "NotInitialized";
  ErrorCode[ErrorCode["NoPermission"] = 9] = "NoPermission";
  ErrorCode[ErrorCode["TimedOut"] = 10] = "TimedOut";
  ErrorCode[ErrorCode["Canceled"] = 11] = "Canceled";
  ErrorCode[ErrorCode["TooOften"] = 12] = "TooOften";
  ErrorCode[ErrorCode["BindSocket"] = 13] = "BindSocket";
  ErrorCode[ErrorCode["NetDown"] = 14] = "NetDown";
  ErrorCode[ErrorCode["NoBufs"] = 15] = "NoBufs";
  ErrorCode[ErrorCode["JoinChannelRejected"] = 17] = "JoinChannelRejected";
  ErrorCode[ErrorCode["LeaveChannelRejected"] = 18] = "LeaveChannelRejected";
  ErrorCode[ErrorCode["AlreadyInUse"] = 19] = "AlreadyInUse";
  ErrorCode[ErrorCode["Abort"] = 20] = "Abort";
  ErrorCode[ErrorCode["InitNetEngine"] = 21] = "InitNetEngine";
  ErrorCode[ErrorCode["ResourceLimited"] = 22] = "ResourceLimited";
  ErrorCode[ErrorCode["InvalidAppId"] = 101] = "InvalidAppId";
  ErrorCode[ErrorCode["InvalidChannelId"] = 102] = "InvalidChannelId";
  ErrorCode[ErrorCode["NoServerResources"] = 103] = "NoServerResources";
  ErrorCode[ErrorCode["TokenExpired"] = 109] = "TokenExpired";
  ErrorCode[ErrorCode["InvalidToken"] = 110] = "InvalidToken";
  ErrorCode[ErrorCode["ConnectionInterrupted"] = 111] = "ConnectionInterrupted";
  ErrorCode[ErrorCode["ConnectionLost"] = 112] = "ConnectionLost";
  ErrorCode[ErrorCode["NotInChannel"] = 113] = "NotInChannel";
  ErrorCode[ErrorCode["SizeTooLarge"] = 114] = "SizeTooLarge";
  ErrorCode[ErrorCode["BitrateLimit"] = 115] = "BitrateLimit";
  ErrorCode[ErrorCode["TooManyDataStreams"] = 116] = "TooManyDataStreams";
  ErrorCode[ErrorCode["DecryptionFailed"] = 120] = "DecryptionFailed";
  ErrorCode[ErrorCode["ClientIsBannedByServer"] = 123] = "ClientIsBannedByServer";
  ErrorCode[ErrorCode["WatermarkParam"] = 124] = "WatermarkParam";
  ErrorCode[ErrorCode["WatermarkPath"] = 125] = "WatermarkPath";
  ErrorCode[ErrorCode["WatermarkPng"] = 126] = "WatermarkPng";
  ErrorCode[ErrorCode["WatermarkInfo"] = 127] = "WatermarkInfo";
  ErrorCode[ErrorCode["WatermarkAGRB"] = 128] = "WatermarkAGRB";
  ErrorCode[ErrorCode["WatermarkRead"] = 129] = "WatermarkRead";
  ErrorCode[ErrorCode["EncryptedStreamNotAllowedPublish"] = 130] = "EncryptedStreamNotAllowedPublish";
  ErrorCode[ErrorCode["InvalidUserAccount"] = 134] = "InvalidUserAccount";
  ErrorCode[ErrorCode["PublishStreamCDNError"] = 151] = "PublishStreamCDNError";
  ErrorCode[ErrorCode["PublishStreamNumReachLimit"] = 152] = "PublishStreamNumReachLimit";
  ErrorCode[ErrorCode["PublishStreamNotAuthorized"] = 153] = "PublishStreamNotAuthorized";
  ErrorCode[ErrorCode["PublishStreamInternalServerError"] = 154] = "PublishStreamInternalServerError";
  ErrorCode[ErrorCode["PublishStreamNotFound"] = 155] = "PublishStreamNotFound";
  ErrorCode[ErrorCode["PublishStreamFormatNotSuppported"] = 156] = "PublishStreamFormatNotSuppported";
  ErrorCode[ErrorCode["ModuleNotFound"] = 157] = "ModuleNotFound";
  ErrorCode[ErrorCode["AlreadyInRecording"] = 160] = "AlreadyInRecording";
  ErrorCode[ErrorCode["LoadMediaEngine"] = 1001] = "LoadMediaEngine";
  ErrorCode[ErrorCode["StartCall"] = 1002] = "StartCall";
  ErrorCode[ErrorCode["StartCamera"] = 1003] = "StartCamera";
  ErrorCode[ErrorCode["StartVideoRender"] = 1004] = "StartVideoRender";
  ErrorCode[ErrorCode["AdmGeneralError"] = 1005] = "AdmGeneralError";
  ErrorCode[ErrorCode["AdmJavaResource"] = 1006] = "AdmJavaResource";
  ErrorCode[ErrorCode["AdmSampleRate"] = 1007] = "AdmSampleRate";
  ErrorCode[ErrorCode["AdmInitPlayout"] = 1008] = "AdmInitPlayout";
  ErrorCode[ErrorCode["AdmStartPlayout"] = 1009] = "AdmStartPlayout";
  ErrorCode[ErrorCode["AdmStopPlayout"] = 1010] = "AdmStopPlayout";
  ErrorCode[ErrorCode["AdmInitRecording"] = 1011] = "AdmInitRecording";
  ErrorCode[ErrorCode["AdmStartRecording"] = 1012] = "AdmStartRecording";
  ErrorCode[ErrorCode["AdmStopRecording"] = 1013] = "AdmStopRecording";
  ErrorCode[ErrorCode["AdmRuntimePlayoutError"] = 1015] = "AdmRuntimePlayoutError";
  ErrorCode[ErrorCode["AdmRuntimeRecordingError"] = 1017] = "AdmRuntimeRecordingError";
  ErrorCode[ErrorCode["AdmRecordAudioFailed"] = 1018] = "AdmRecordAudioFailed";
  ErrorCode[ErrorCode["AdmPlayAbnormalFrequency"] = 1020] = "AdmPlayAbnormalFrequency";
  ErrorCode[ErrorCode["AdmRecordAbnormalFrequency"] = 1021] = "AdmRecordAbnormalFrequency";
  ErrorCode[ErrorCode["AdmInitLoopback"] = 1022] = "AdmInitLoopback";
  ErrorCode[ErrorCode["AdmStartLoopback"] = 1023] = "AdmStartLoopback";
  ErrorCode[ErrorCode["AdmNoPermission"] = 1027] = "AdmNoPermission";
  ErrorCode[ErrorCode["AudioBtScoFailed"] = 1030] = "AudioBtScoFailed";
  ErrorCode[ErrorCode["AdmNoRecordingDevice"] = 1359] = "AdmNoRecordingDevice";
  ErrorCode[ErrorCode["AdmNoPlayoutDevice"] = 1360] = "AdmNoPlayoutDevice";
  ErrorCode[ErrorCode["VdmCameraNotAuthorized"] = 1501] = "VdmCameraNotAuthorized";
  ErrorCode[ErrorCode["VcmUnknownError"] = 1600] = "VcmUnknownError";
  ErrorCode[ErrorCode["VcmEncoderInitError"] = 1601] = "VcmEncoderInitError";
  ErrorCode[ErrorCode["VcmEncoderEncodeError"] = 1602] = "VcmEncoderEncodeError";
  ErrorCode[ErrorCode["VcmEncoderSetError"] = 1603] = "VcmEncoderSetError";
  ErrorCode[ErrorCode["AudioBtNoRoute"] = 1800] = "AudioBtNoRoute";
})(ErrorCode || (ErrorCode = {}));

export let InjectStreamStatus;
/**
 * The state of the probe test result.
 */

(function (InjectStreamStatus) {
  InjectStreamStatus[InjectStreamStatus["StartSuccess"] = 0] = "StartSuccess";
  InjectStreamStatus[InjectStreamStatus["StartAlreadyExists"] = 1] = "StartAlreadyExists";
  InjectStreamStatus[InjectStreamStatus["StartUnauthorized"] = 2] = "StartUnauthorized";
  InjectStreamStatus[InjectStreamStatus["StartTimedout"] = 3] = "StartTimedout";
  InjectStreamStatus[InjectStreamStatus["StartFailed"] = 4] = "StartFailed";
  InjectStreamStatus[InjectStreamStatus["StopSuccess"] = 5] = "StopSuccess";
  InjectStreamStatus[InjectStreamStatus["StopNotFound"] = 6] = "StopNotFound";
  InjectStreamStatus[InjectStreamStatus["StopUnauthorized"] = 7] = "StopUnauthorized";
  InjectStreamStatus[InjectStreamStatus["StopTimedout"] = 8] = "StopTimedout";
  InjectStreamStatus[InjectStreamStatus["StopFailed"] = 9] = "StopFailed";
  InjectStreamStatus[InjectStreamStatus["Broken"] = 10] = "Broken";
})(InjectStreamStatus || (InjectStreamStatus = {}));

export let LastmileProbeResultState;
/**
 * The lightening contrast level.
 */

(function (LastmileProbeResultState) {
  LastmileProbeResultState[LastmileProbeResultState["Complete"] = 1] = "Complete";
  LastmileProbeResultState[LastmileProbeResultState["IncompleteNoBwe"] = 2] = "IncompleteNoBwe";
  LastmileProbeResultState[LastmileProbeResultState["Unavailable"] = 3] = "Unavailable";
})(LastmileProbeResultState || (LastmileProbeResultState = {}));

export let LighteningContrastLevel;
/**
 * The detailed error information of the local video.
 */

(function (LighteningContrastLevel) {
  LighteningContrastLevel[LighteningContrastLevel["Low"] = 0] = "Low";
  LighteningContrastLevel[LighteningContrastLevel["Normal"] = 1] = "Normal";
  LighteningContrastLevel[LighteningContrastLevel["High"] = 2] = "High";
})(LighteningContrastLevel || (LighteningContrastLevel = {}));

export let LocalVideoStreamError;
/**
 * The state of the local video stream.
 */

(function (LocalVideoStreamError) {
  LocalVideoStreamError[LocalVideoStreamError["OK"] = 0] = "OK";
  LocalVideoStreamError[LocalVideoStreamError["Failure"] = 1] = "Failure";
  LocalVideoStreamError[LocalVideoStreamError["DeviceNoPermission"] = 2] = "DeviceNoPermission";
  LocalVideoStreamError[LocalVideoStreamError["DeviceBusy"] = 3] = "DeviceBusy";
  LocalVideoStreamError[LocalVideoStreamError["CaptureFailure"] = 4] = "CaptureFailure";
  LocalVideoStreamError[LocalVideoStreamError["EncodeFailure"] = 5] = "EncodeFailure";
  LocalVideoStreamError[LocalVideoStreamError["CaptureInBackground"] = 6] = "CaptureInBackground";
  LocalVideoStreamError[LocalVideoStreamError["CaptureMultipleForegroundApps"] = 7] = "CaptureMultipleForegroundApps";
  LocalVideoStreamError[LocalVideoStreamError["DeviceNotFound"] = 8] = "DeviceNotFound";
  LocalVideoStreamError[LocalVideoStreamError["ExtensionCaptureStarted"] = 13] = "ExtensionCaptureStarted";
  LocalVideoStreamError[LocalVideoStreamError["ExtensionCaptureStoped"] = 14] = "ExtensionCaptureStoped";
  LocalVideoStreamError[LocalVideoStreamError["ExtensionCaptureDisconnected"] = 15] = "ExtensionCaptureDisconnected";
  LocalVideoStreamError[LocalVideoStreamError["ScreenCapturePermissionDenied"] = 16] = "ScreenCapturePermissionDenied";
})(LocalVideoStreamError || (LocalVideoStreamError = {}));

export let LocalVideoStreamState;
/**
 * Output log filter level.
 */

(function (LocalVideoStreamState) {
  LocalVideoStreamState[LocalVideoStreamState["Stopped"] = 0] = "Stopped";
  LocalVideoStreamState[LocalVideoStreamState["Capturing"] = 1] = "Capturing";
  LocalVideoStreamState[LocalVideoStreamState["Encoding"] = 2] = "Encoding";
  LocalVideoStreamState[LocalVideoStreamState["Failed"] = 3] = "Failed";
})(LocalVideoStreamState || (LocalVideoStreamState = {}));

export let LogFilter;
/**
 * Network quality.
 */

(function (LogFilter) {
  LogFilter[LogFilter["Off"] = 0] = "Off";
  LogFilter[LogFilter["Debug"] = 2063] = "Debug";
  LogFilter[LogFilter["Info"] = 15] = "Info";
  LogFilter[LogFilter["Warning"] = 14] = "Warning";
  LogFilter[LogFilter["Error"] = 12] = "Error";
  LogFilter[LogFilter["Critical"] = 8] = "Critical";
})(LogFilter || (LogFilter = {}));

export let NetworkQuality;
/**
 * Network type.
 */

(function (NetworkQuality) {
  NetworkQuality[NetworkQuality["Unknown"] = 0] = "Unknown";
  NetworkQuality[NetworkQuality["Excellent"] = 1] = "Excellent";
  NetworkQuality[NetworkQuality["Good"] = 2] = "Good";
  NetworkQuality[NetworkQuality["Poor"] = 3] = "Poor";
  NetworkQuality[NetworkQuality["Bad"] = 4] = "Bad";
  NetworkQuality[NetworkQuality["VBad"] = 5] = "VBad";
  NetworkQuality[NetworkQuality["Down"] = 6] = "Down";
  NetworkQuality[NetworkQuality["Unsupported"] = 7] = "Unsupported";
  NetworkQuality[NetworkQuality["Detecting"] = 8] = "Detecting";
})(NetworkQuality || (NetworkQuality = {}));

export let NetworkType;
/**
 * The detailed error information for streaming.
 */

(function (NetworkType) {
  NetworkType[NetworkType["Unknown"] = -1] = "Unknown";
  NetworkType[NetworkType["Disconnected"] = 0] = "Disconnected";
  NetworkType[NetworkType["LAN"] = 1] = "LAN";
  NetworkType[NetworkType["WIFI"] = 2] = "WIFI";
  NetworkType[NetworkType["Mobile2G"] = 3] = "Mobile2G";
  NetworkType[NetworkType["Mobile3G"] = 4] = "Mobile3G";
  NetworkType[NetworkType["Mobile4G"] = 5] = "Mobile4G";
  NetworkType[NetworkType["Mobile5G"] = 6] = "Mobile5G";
})(NetworkType || (NetworkType = {}));

export let RtmpStreamingErrorCode;
/**
 * The RTMP or RTMPS streaming state.
 */

(function (RtmpStreamingErrorCode) {
  RtmpStreamingErrorCode[RtmpStreamingErrorCode["OK"] = 0] = "OK";
  RtmpStreamingErrorCode[RtmpStreamingErrorCode["InvalidParameters"] = 1] = "InvalidParameters";
  RtmpStreamingErrorCode[RtmpStreamingErrorCode["EncryptedStreamNotAllowed"] = 2] = "EncryptedStreamNotAllowed";
  RtmpStreamingErrorCode[RtmpStreamingErrorCode["ConnectionTimeout"] = 3] = "ConnectionTimeout";
  RtmpStreamingErrorCode[RtmpStreamingErrorCode["InternalServerError"] = 4] = "InternalServerError";
  RtmpStreamingErrorCode[RtmpStreamingErrorCode["RtmpServerError"] = 5] = "RtmpServerError";
  RtmpStreamingErrorCode[RtmpStreamingErrorCode["TooOften"] = 6] = "TooOften";
  RtmpStreamingErrorCode[RtmpStreamingErrorCode["ReachLimit"] = 7] = "ReachLimit";
  RtmpStreamingErrorCode[RtmpStreamingErrorCode["NotAuthorized"] = 8] = "NotAuthorized";
  RtmpStreamingErrorCode[RtmpStreamingErrorCode["StreamNotFound"] = 9] = "StreamNotFound";
  RtmpStreamingErrorCode[RtmpStreamingErrorCode["FormatNotSupported"] = 10] = "FormatNotSupported";
  RtmpStreamingErrorCode[RtmpStreamingErrorCode["NotBroadcaster"] = 11] = "NotBroadcaster";
  RtmpStreamingErrorCode[RtmpStreamingErrorCode["TranscodingNoMixStream"] = 13] = "TranscodingNoMixStream";
  RtmpStreamingErrorCode[RtmpStreamingErrorCode["NetDown"] = 14] = "NetDown";
  RtmpStreamingErrorCode[RtmpStreamingErrorCode["InvalidAppid"] = 15] = "InvalidAppid";
  RtmpStreamingErrorCode[RtmpStreamingErrorCode["UnPublishOK"] = 100] = "UnPublishOK";
})(RtmpStreamingErrorCode || (RtmpStreamingErrorCode = {}));

export let RtmpStreamingState;
/**
 * Stream fallback option.
 */

(function (RtmpStreamingState) {
  RtmpStreamingState[RtmpStreamingState["Idle"] = 0] = "Idle";
  RtmpStreamingState[RtmpStreamingState["Connecting"] = 1] = "Connecting";
  RtmpStreamingState[RtmpStreamingState["Running"] = 2] = "Running";
  RtmpStreamingState[RtmpStreamingState["Recovering"] = 3] = "Recovering";
  RtmpStreamingState[RtmpStreamingState["Failure"] = 4] = "Failure";
  RtmpStreamingState[RtmpStreamingState["Disconnecting"] = 5] = "Disconnecting";
})(RtmpStreamingState || (RtmpStreamingState = {}));

export let StreamFallbackOptions;
/**
 * Reason for the user being offline.
 */

(function (StreamFallbackOptions) {
  StreamFallbackOptions[StreamFallbackOptions["Disabled"] = 0] = "Disabled";
  StreamFallbackOptions[StreamFallbackOptions["VideoStreamLow"] = 1] = "VideoStreamLow";
  StreamFallbackOptions[StreamFallbackOptions["AudioOnly"] = 2] = "AudioOnly";
})(StreamFallbackOptions || (StreamFallbackOptions = {}));

export let UserOfflineReason;
/**
 * The priority of the remote user.
 */

(function (UserOfflineReason) {
  UserOfflineReason[UserOfflineReason["Quit"] = 0] = "Quit";
  UserOfflineReason[UserOfflineReason["Dropped"] = 1] = "Dropped";
  UserOfflineReason[UserOfflineReason["BecomeAudience"] = 2] = "BecomeAudience";
})(UserOfflineReason || (UserOfflineReason = {}));

export let UserPriority;
/**
 * Self-defined video codec profile.
 */

(function (UserPriority) {
  UserPriority[UserPriority["High"] = 50] = "High";
  UserPriority[UserPriority["Normal"] = 100] = "Normal";
})(UserPriority || (UserPriority = {}));

export let VideoCodecProfileType;
/**
 * Video frame rate.
 */

(function (VideoCodecProfileType) {
  VideoCodecProfileType[VideoCodecProfileType["BaseLine"] = 66] = "BaseLine";
  VideoCodecProfileType[VideoCodecProfileType["Main"] = 77] = "Main";
  VideoCodecProfileType[VideoCodecProfileType["High"] = 100] = "High";
})(VideoCodecProfileType || (VideoCodecProfileType = {}));

export let VideoFrameRate;
/**
 * Bitrate of the video (Kbps). Refer to the table below and set your bitrate.
 * If you set a bitrate beyond the proper range, the SDK automatically adjusts it to a value within the range.
 *
 * **Video Bitrate Table**
 * <table>
 *     <tr>
 *         <th>Resolution</th>
 *         <th>Frame rate<p>(fps)</th>
 *         <th>Base Bitrate<p>(Kbps, for Communication)</th>
 *         <th>Live Bitrate<p>(Kbps, for Live Broadcasting)</th>
 *     </tr>
 *     <tr>
 *         <td>160*120</td>
 *         <td>15</td>
 *         <td>65</td>
 *         <td>130</td>
 *     </tr>
 *     <tr>
 *         <td>120*120</td>
 *         <td>15</td>
 *         <td>50</td>
 *         <td>100</td>
 *     </tr>
 *     <tr>
 *         <td>320*180</td>
 *         <td>15</td>
 *         <td>140</td>
 *         <td>280</td>
 *     </tr>
 *     <tr>
 *         <td>180*180</td>
 *         <td>15</td>
 *         <td>100</td>
 *         <td>200</td>
 *     </tr>
 *     <tr>
 *         <td>240*180</td>
 *         <td>15</td>
 *         <td>120</td>
 *         <td>240</td>
 *     </tr>
 *     <tr>
 *         <td>320*240</td>
 *         <td>15</td>
 *         <td>200</td>
 *         <td>400</td>
 *     </tr>
 *     <tr>
 *         <td>240*240</td>
 *         <td>15</td>
 *         <td>140</td>
 *         <td>280</td>
 *     </tr>
 *     <tr>
 *         <td>424*240</td>
 *         <td>15</td>
 *         <td>220</td>
 *         <td>440</td>
 *     </tr>
 *     <tr>
 *         <td>640*360</td>
 *         <td>15</td>
 *         <td>400</td>
 *         <td>800</td>
 *     </tr>
 *     <tr>
 *         <td>360*360</td>
 *         <td>15</td>
 *         <td>260</td>
 *         <td>520</td>
 *     </tr>
 *     <tr>
 *         <td>640*360</td>
 *         <td>30</td>
 *         <td>600</td>
 *         <td>1200</td>
 *     </tr>
 *     <tr>
 *         <td>360*360</td>
 *         <td>30</td>
 *         <td>400</td>
 *         <td>800</td>
 *     </tr>
 *     <tr>
 *         <td>480*360</td>
 *         <td>15</td>
 *         <td>320</td>
 *         <td>640</td>
 *     </tr>
 *     <tr>
 *         <td>480*360</td>
 *         <td>30</td>
 *         <td>490</td>
 *         <td>980</td>
 *     </tr>
 *     <tr>
 *         <td>640*480</td>
 *         <td>15</td>
 *         <td>500</td>
 *         <td>1000</td>
 *     </tr>
 *     <tr>
 *         <td>480*480</td>
 *         <td>15</td>
 *         <td>400</td>
 *         <td>800</td>
 *     </tr>
 *     <tr>
 *         <td>640*480</td>
 *         <td>30</td>
 *         <td>750</td>
 *         <td>1500</td>
 *     </tr>
 *     <tr>
 *         <td>480*480</td>
 *         <td>30</td>
 *         <td>600</td>
 *         <td>1200</td>
 *     </tr>
 *     <tr>
 *         <td>848*480</td>
 *         <td>15</td>
 *         <td>610</td>
 *         <td>1220</td>
 *     </tr>
 *     <tr>
 *         <td>848*480</td>
 *         <td>30</td>
 *         <td>930</td>
 *         <td>1860</td>
 *     </tr>
 *     <tr>
 *         <td>640*480</td>
 *         <td>10</td>
 *         <td>400</td>
 *         <td>800</td>
 *     </tr>
 *     <tr>
 *         <td>1280*720</td>
 *         <td>15</td>
 *         <td>1130</td>
 *         <td>2260</td>
 *     </tr>
 *     <tr>
 *         <td>1280*720</td>
 *         <td>30</td>
 *         <td>1710</td>
 *         <td>3420</td>
 *     </tr>
 *     <tr>
 *         <td>960*720</td>
 *         <td>15</td>
 *         <td>910</td>
 *         <td>1820</td>
 *     </tr>
 *     <tr>
 *         <td>960*720</td>
 *         <td>30</td>
 *         <td>1380</td>
 *         <td>2760</td>
 *     </tr>
 * </table>
 *
 * Agora uses different video codecs for different profiles to optimize the user experience. For example,
 * the Communication profile prioritizes the smoothness while the LIVE_BROADCASTING profile prioritizes the
 * video quality (a higher bitrate). Therefore, We recommend setting this parameter as STANDARD_BITRATE = 0.
 */

(function (VideoFrameRate) {
  VideoFrameRate[VideoFrameRate["Min"] = -1] = "Min";
  VideoFrameRate[VideoFrameRate["Fps1"] = 1] = "Fps1";
  VideoFrameRate[VideoFrameRate["Fps7"] = 7] = "Fps7";
  VideoFrameRate[VideoFrameRate["Fps10"] = 10] = "Fps10";
  VideoFrameRate[VideoFrameRate["Fps15"] = 15] = "Fps15";
  VideoFrameRate[VideoFrameRate["Fps24"] = 24] = "Fps24";
  VideoFrameRate[VideoFrameRate["Fps30"] = 30] = "Fps30";
  VideoFrameRate[VideoFrameRate["Fps60"] = 60] = "Fps60";
})(VideoFrameRate || (VideoFrameRate = {}));

export let BitRate;
/**
 * Video mirror mode.
 */

(function (BitRate) {
  BitRate[BitRate["Standard"] = 0] = "Standard";
  BitRate[BitRate["Compatible"] = -1] = "Compatible";
})(BitRate || (BitRate = {}));

export let VideoMirrorMode;
/**
 * Video output orientation mode.
 */

(function (VideoMirrorMode) {
  VideoMirrorMode[VideoMirrorMode["Auto"] = 0] = "Auto";
  VideoMirrorMode[VideoMirrorMode["Enabled"] = 1] = "Enabled";
  VideoMirrorMode[VideoMirrorMode["Disabled"] = 2] = "Disabled";
})(VideoMirrorMode || (VideoMirrorMode = {}));

export let VideoOutputOrientationMode;
/**
 * Quality change of the local video in terms of target frame rate and target bit rate since last count.
 */

(function (VideoOutputOrientationMode) {
  VideoOutputOrientationMode[VideoOutputOrientationMode["Adaptative"] = 0] = "Adaptative";
  VideoOutputOrientationMode[VideoOutputOrientationMode["FixedLandscape"] = 1] = "FixedLandscape";
  VideoOutputOrientationMode[VideoOutputOrientationMode["FixedPortrait"] = 2] = "FixedPortrait";
})(VideoOutputOrientationMode || (VideoOutputOrientationMode = {}));

export let VideoQualityAdaptIndication;
/**
 * The state of the remote video.
 */

(function (VideoQualityAdaptIndication) {
  VideoQualityAdaptIndication[VideoQualityAdaptIndication["AdaptNone"] = 0] = "AdaptNone";
  VideoQualityAdaptIndication[VideoQualityAdaptIndication["AdaptUpBandwidth"] = 1] = "AdaptUpBandwidth";
  VideoQualityAdaptIndication[VideoQualityAdaptIndication["AdaptDownBandwidth"] = 2] = "AdaptDownBandwidth";
})(VideoQualityAdaptIndication || (VideoQualityAdaptIndication = {}));

export let VideoRemoteState;
/**
 * The reason of the remote video state change.
 */

(function (VideoRemoteState) {
  VideoRemoteState[VideoRemoteState["Stopped"] = 0] = "Stopped";
  VideoRemoteState[VideoRemoteState["Starting"] = 1] = "Starting";
  VideoRemoteState[VideoRemoteState["Decoding"] = 2] = "Decoding";
  VideoRemoteState[VideoRemoteState["Frozen"] = 3] = "Frozen";
  VideoRemoteState[VideoRemoteState["Failed"] = 4] = "Failed";
})(VideoRemoteState || (VideoRemoteState = {}));

export let VideoRemoteStateReason;
/**
 * Video display mode.
 */

(function (VideoRemoteStateReason) {
  VideoRemoteStateReason[VideoRemoteStateReason["Internal"] = 0] = "Internal";
  VideoRemoteStateReason[VideoRemoteStateReason["NetworkCongestion"] = 1] = "NetworkCongestion";
  VideoRemoteStateReason[VideoRemoteStateReason["NetworkRecovery"] = 2] = "NetworkRecovery";
  VideoRemoteStateReason[VideoRemoteStateReason["LocalMuted"] = 3] = "LocalMuted";
  VideoRemoteStateReason[VideoRemoteStateReason["LocalUnmuted"] = 4] = "LocalUnmuted";
  VideoRemoteStateReason[VideoRemoteStateReason["RemoteMuted"] = 5] = "RemoteMuted";
  VideoRemoteStateReason[VideoRemoteStateReason["RemoteUnmuted"] = 6] = "RemoteUnmuted";
  VideoRemoteStateReason[VideoRemoteStateReason["RemoteOffline"] = 7] = "RemoteOffline";
  VideoRemoteStateReason[VideoRemoteStateReason["AudioFallback"] = 8] = "AudioFallback";
  VideoRemoteStateReason[VideoRemoteStateReason["AudioFallbackRecovery"] = 9] = "AudioFallbackRecovery";
})(VideoRemoteStateReason || (VideoRemoteStateReason = {}));

export let VideoRenderMode;
/**
 * Video stream type.
 */

(function (VideoRenderMode) {
  VideoRenderMode[VideoRenderMode["Hidden"] = 1] = "Hidden";
  VideoRenderMode[VideoRenderMode["Fit"] = 2] = "Fit";
  VideoRenderMode[VideoRenderMode["Adaptive"] = 3] = "Adaptive";
  VideoRenderMode[VideoRenderMode["FILL"] = 4] = "FILL";
})(VideoRenderMode || (VideoRenderMode = {}));

export let VideoStreamType;
/**
 * Warning codes occur when the SDK encounters an error that may be recovered automatically.
 * These are only notifications, and can generally be ignored. For example, when the SDK loses connection to the server,
 * the SDK reports the [`OpenChannelTimeout(106)`]{@link WarningCode.OpenChannelTimeout} warning and tries to reconnect automatically.
 */

(function (VideoStreamType) {
  VideoStreamType[VideoStreamType["High"] = 0] = "High";
  VideoStreamType[VideoStreamType["Low"] = 1] = "Low";
})(VideoStreamType || (VideoStreamType = {}));

export let WarningCode;
/**
 * The audio channel of the sound.
 */

(function (WarningCode) {
  WarningCode[WarningCode["InvalidView"] = 8] = "InvalidView";
  WarningCode[WarningCode["InitVideo"] = 16] = "InitVideo";
  WarningCode[WarningCode["Pending"] = 20] = "Pending";
  WarningCode[WarningCode["NoAvailableChannel"] = 103] = "NoAvailableChannel";
  WarningCode[WarningCode["LookupChannelTimeout"] = 104] = "LookupChannelTimeout";
  WarningCode[WarningCode["LookupChannelRejected"] = 105] = "LookupChannelRejected";
  WarningCode[WarningCode["OpenChannelTimeout"] = 106] = "OpenChannelTimeout";
  WarningCode[WarningCode["OpenChannelRejected"] = 107] = "OpenChannelRejected";
  WarningCode[WarningCode["SwitchLiveVideoTimeout"] = 111] = "SwitchLiveVideoTimeout";
  WarningCode[WarningCode["SetClientRoleTimeout"] = 118] = "SetClientRoleTimeout";
  WarningCode[WarningCode["SetClientRoleNotAuthorized"] = 119] = "SetClientRoleNotAuthorized";
  WarningCode[WarningCode["OpenChannelInvalidTicket"] = 121] = "OpenChannelInvalidTicket";
  WarningCode[WarningCode["OpenChannelTryNextVos"] = 122] = "OpenChannelTryNextVos";
  WarningCode[WarningCode["AudioMixingOpenError"] = 701] = "AudioMixingOpenError";
  WarningCode[WarningCode["AdmRuntimePlayoutWarning"] = 1014] = "AdmRuntimePlayoutWarning";
  WarningCode[WarningCode["AdmRuntimeRecordingWarning"] = 1016] = "AdmRuntimeRecordingWarning";
  WarningCode[WarningCode["AdmRecordAudioSilence"] = 1019] = "AdmRecordAudioSilence";
  WarningCode[WarningCode["AdmPlaybackMalfunction"] = 1020] = "AdmPlaybackMalfunction";
  WarningCode[WarningCode["AdmRecordMalfunction"] = 1021] = "AdmRecordMalfunction";
  WarningCode[WarningCode["AdmInterruption"] = 1025] = "AdmInterruption";
  WarningCode[WarningCode["AdmCategoryNotPlayAndRecord"] = 1029] = "AdmCategoryNotPlayAndRecord";
  WarningCode[WarningCode["AdmRecordAudioLowlevel"] = 1031] = "AdmRecordAudioLowlevel";
  WarningCode[WarningCode["AdmPlayoutAudioLowlevel"] = 1032] = "AdmPlayoutAudioLowlevel";
  WarningCode[WarningCode["AdmRecordIsOccupied"] = 1033] = "AdmRecordIsOccupied";
  WarningCode[WarningCode["AdmNoDataReadyCallback"] = 1040] = "AdmNoDataReadyCallback";
  WarningCode[WarningCode["AdmInconsistentDevices"] = 1042] = "AdmInconsistentDevices";
  WarningCode[WarningCode["ApmHowling"] = 1051] = "ApmHowling";
  WarningCode[WarningCode["AdmGlitchState"] = 1052] = "AdmGlitchState";
  WarningCode[WarningCode["ApmResidualEcho"] = 1053] = "ApmResidualEcho";
  WarningCode[WarningCode["SuperResolutionStreamOverLimitation"] = 1610] = "SuperResolutionStreamOverLimitation";
  WarningCode[WarningCode["SuperResolutionUserCountOverLimitation"] = 1611] = "SuperResolutionUserCountOverLimitation";
  WarningCode[WarningCode["SuperResolutionDeviceNotSupported"] = 1612] = "SuperResolutionDeviceNotSupported";
})(WarningCode || (WarningCode = {}));

export let AudioChannel;
/**
 * Video codec types.
 */

(function (AudioChannel) {
  AudioChannel[AudioChannel["Channel0"] = 0] = "Channel0";
  AudioChannel[AudioChannel["Channel1"] = 1] = "Channel1";
  AudioChannel[AudioChannel["Channel2"] = 2] = "Channel2";
  AudioChannel[AudioChannel["Channel3"] = 3] = "Channel3";
  AudioChannel[AudioChannel["Channel4"] = 4] = "Channel4";
  AudioChannel[AudioChannel["Channel5"] = 5] = "Channel5";
})(AudioChannel || (AudioChannel = {}));

export let VideoCodecType;
/**
 * The publishing state.
 *
 * @since v3.1.2.
 */

(function (VideoCodecType) {
  VideoCodecType[VideoCodecType["VP8"] = 1] = "VP8";
  VideoCodecType[VideoCodecType["H264"] = 2] = "H264";
  VideoCodecType[VideoCodecType["EVP"] = 3] = "EVP";
  VideoCodecType[VideoCodecType["E264"] = 4] = "E264";
})(VideoCodecType || (VideoCodecType = {}));

export let StreamPublishState;
/**
 * The subscribing state.
 *
 * @since v3.1.2.
 */

(function (StreamPublishState) {
  StreamPublishState[StreamPublishState["Idle"] = 0] = "Idle";
  StreamPublishState[StreamPublishState["NoPublished"] = 1] = "NoPublished";
  StreamPublishState[StreamPublishState["Publishing"] = 2] = "Publishing";
  StreamPublishState[StreamPublishState["Published"] = 3] = "Published";
})(StreamPublishState || (StreamPublishState = {}));

export let StreamSubscribeState;
/**
 * Events during the RTMP or RTMPS streaming.
 */

(function (StreamSubscribeState) {
  StreamSubscribeState[StreamSubscribeState["Idle"] = 0] = "Idle";
  StreamSubscribeState[StreamSubscribeState["NoSubscribed"] = 1] = "NoSubscribed";
  StreamSubscribeState[StreamSubscribeState["Subscribing"] = 2] = "Subscribing";
  StreamSubscribeState[StreamSubscribeState["Subscribed"] = 3] = "Subscribed";
})(StreamSubscribeState || (StreamSubscribeState = {}));

export let RtmpStreamingEvent;
/**
 * Audio session restriction.
 */

(function (RtmpStreamingEvent) {
  RtmpStreamingEvent[RtmpStreamingEvent["FailedLoadImage"] = 1] = "FailedLoadImage";
  RtmpStreamingEvent[RtmpStreamingEvent["UrlAlreadyInUse"] = 2] = "UrlAlreadyInUse";
  RtmpStreamingEvent[RtmpStreamingEvent["AdvancedFeatureNotSupport"] = 3] = "AdvancedFeatureNotSupport";
  RtmpStreamingEvent[RtmpStreamingEvent["RequestTooOften"] = 4] = "RequestTooOften";
})(RtmpStreamingEvent || (RtmpStreamingEvent = {}));

export let AudioSessionOperationRestriction;
/**
 * The options for SDK preset audio effects.
 */

(function (AudioSessionOperationRestriction) {
  AudioSessionOperationRestriction[AudioSessionOperationRestriction["None"] = 0] = "None";
  AudioSessionOperationRestriction[AudioSessionOperationRestriction["SetCategory"] = 1] = "SetCategory";
  AudioSessionOperationRestriction[AudioSessionOperationRestriction["ConfigureSession"] = 2] = "ConfigureSession";
  AudioSessionOperationRestriction[AudioSessionOperationRestriction["DeactivateSession"] = 4] = "DeactivateSession";
  AudioSessionOperationRestriction[AudioSessionOperationRestriction["All"] = 128] = "All";
})(AudioSessionOperationRestriction || (AudioSessionOperationRestriction = {}));

export let AudioEffectPreset;
/**
 * The options for SDK preset voice beautifier effects.
 */

(function (AudioEffectPreset) {
  AudioEffectPreset[AudioEffectPreset["AudioEffectOff"] = 0] = "AudioEffectOff";
  AudioEffectPreset[AudioEffectPreset["RoomAcousticsKTV"] = 33620224] = "RoomAcousticsKTV";
  AudioEffectPreset[AudioEffectPreset["RoomAcousticsVocalConcert"] = 33620480] = "RoomAcousticsVocalConcert";
  AudioEffectPreset[AudioEffectPreset["RoomAcousticsStudio"] = 33620736] = "RoomAcousticsStudio";
  AudioEffectPreset[AudioEffectPreset["RoomAcousticsPhonograph"] = 33620992] = "RoomAcousticsPhonograph";
  AudioEffectPreset[AudioEffectPreset["RoomAcousticsVirtualStereo"] = 33621248] = "RoomAcousticsVirtualStereo";
  AudioEffectPreset[AudioEffectPreset["RoomAcousticsSpacial"] = 33621504] = "RoomAcousticsSpacial";
  AudioEffectPreset[AudioEffectPreset["RoomAcousticsEthereal"] = 33621760] = "RoomAcousticsEthereal";
  AudioEffectPreset[AudioEffectPreset["RoomAcoustics3DVoice"] = 33622016] = "RoomAcoustics3DVoice";
  AudioEffectPreset[AudioEffectPreset["VoiceChangerEffectUncle"] = 33685760] = "VoiceChangerEffectUncle";
  AudioEffectPreset[AudioEffectPreset["VoiceChangerEffectOldMan"] = 33686016] = "VoiceChangerEffectOldMan";
  AudioEffectPreset[AudioEffectPreset["VoiceChangerEffectBoy"] = 33686272] = "VoiceChangerEffectBoy";
  AudioEffectPreset[AudioEffectPreset["VoiceChangerEffectSister"] = 33686528] = "VoiceChangerEffectSister";
  AudioEffectPreset[AudioEffectPreset["VoiceChangerEffectGirl"] = 33686784] = "VoiceChangerEffectGirl";
  AudioEffectPreset[AudioEffectPreset["VoiceChangerEffectPigKing"] = 33687040] = "VoiceChangerEffectPigKing";
  AudioEffectPreset[AudioEffectPreset["VoiceChangerEffectHulk"] = 33687296] = "VoiceChangerEffectHulk";
  AudioEffectPreset[AudioEffectPreset["StyleTransformationRnB"] = 33751296] = "StyleTransformationRnB";
  AudioEffectPreset[AudioEffectPreset["StyleTransformationPopular"] = 33751552] = "StyleTransformationPopular";
  AudioEffectPreset[AudioEffectPreset["PitchCorrection"] = 33816832] = "PitchCorrection";
})(AudioEffectPreset || (AudioEffectPreset = {}));

export let VoiceBeautifierPreset;
/**
 * The latency level of an audience member in interactive live streaming.
 *
 * **Note**
 *
 * Takes effect only when the user role is `Broadcaster`.
 */

(function (VoiceBeautifierPreset) {
  VoiceBeautifierPreset[VoiceBeautifierPreset["VoiceBeautifierOff"] = 0] = "VoiceBeautifierOff";
  VoiceBeautifierPreset[VoiceBeautifierPreset["ChatBeautifierMagnetic"] = 16843008] = "ChatBeautifierMagnetic";
  VoiceBeautifierPreset[VoiceBeautifierPreset["ChatBeautifierFresh"] = 16843264] = "ChatBeautifierFresh";
  VoiceBeautifierPreset[VoiceBeautifierPreset["ChatBeautifierVitality"] = 16843520] = "ChatBeautifierVitality";
  VoiceBeautifierPreset[VoiceBeautifierPreset["SingingBeautifier"] = 16908544] = "SingingBeautifier";
  VoiceBeautifierPreset[VoiceBeautifierPreset["TimbreTransformationVigorous"] = 16974080] = "TimbreTransformationVigorous";
  VoiceBeautifierPreset[VoiceBeautifierPreset["TimbreTransformationDeep"] = 16974336] = "TimbreTransformationDeep";
  VoiceBeautifierPreset[VoiceBeautifierPreset["TimbreTransformationMellow"] = 16974592] = "TimbreTransformationMellow";
  VoiceBeautifierPreset[VoiceBeautifierPreset["TimbreTransformationFalsetto"] = 16974848] = "TimbreTransformationFalsetto";
  VoiceBeautifierPreset[VoiceBeautifierPreset["TimbreTransformationFull"] = 16975104] = "TimbreTransformationFull";
  VoiceBeautifierPreset[VoiceBeautifierPreset["TimbreTransformationClear"] = 16975360] = "TimbreTransformationClear";
  VoiceBeautifierPreset[VoiceBeautifierPreset["TimbreTransformationResounding"] = 16975616] = "TimbreTransformationResounding";
  VoiceBeautifierPreset[VoiceBeautifierPreset["TimbreTransformationRinging"] = 16975872] = "TimbreTransformationRinging";
})(VoiceBeautifierPreset || (VoiceBeautifierPreset = {}));

export let AudienceLatencyLevelType;
/**
 * Log Level.
 *
 * @since v3.3.1.
 */

(function (AudienceLatencyLevelType) {
  AudienceLatencyLevelType[AudienceLatencyLevelType["LowLatency"] = 1] = "LowLatency";
  AudienceLatencyLevelType[AudienceLatencyLevelType["UltraLowLatency"] = 2] = "UltraLowLatency";
})(AudienceLatencyLevelType || (AudienceLatencyLevelType = {}));

export let LogLevel;
/**
 * Capture brightness level.
 *
 * @since v3.1.1.
 */

(function (LogLevel) {
  LogLevel[LogLevel["None"] = 0] = "None";
  LogLevel[LogLevel["Info"] = 1] = "Info";
  LogLevel[LogLevel["Warn"] = 2] = "Warn";
  LogLevel[LogLevel["Error"] = 4] = "Error";
  LogLevel[LogLevel["Fatal"] = 8] = "Fatal";
})(LogLevel || (LogLevel = {}));

export let CaptureBrightnessLevelType;
/**
 * @ignore
 * The reason why the super-resolution algorithm is not successfully enabled.
 */

(function (CaptureBrightnessLevelType) {
  CaptureBrightnessLevelType[CaptureBrightnessLevelType["Invalid"] = -1] = "Invalid";
  CaptureBrightnessLevelType[CaptureBrightnessLevelType["Normal"] = 0] = "Normal";
  CaptureBrightnessLevelType[CaptureBrightnessLevelType["Bright"] = 1] = "Bright";
  CaptureBrightnessLevelType[CaptureBrightnessLevelType["Dark"] = 2] = "Dark";
})(CaptureBrightnessLevelType || (CaptureBrightnessLevelType = {}));

export let SuperResolutionStateReason;
/**
 * @ignore
 *
 * The reason for the upload failure.
 *
 * @since v3.3.1.
 */

(function (SuperResolutionStateReason) {
  SuperResolutionStateReason[SuperResolutionStateReason["Success"] = 0] = "Success";
  SuperResolutionStateReason[SuperResolutionStateReason["StreamOverLimitation"] = 1] = "StreamOverLimitation";
  SuperResolutionStateReason[SuperResolutionStateReason["UserCountOverLimitation"] = 2] = "UserCountOverLimitation";
  SuperResolutionStateReason[SuperResolutionStateReason["DeviceNotSupported"] = 3] = "DeviceNotSupported";
})(SuperResolutionStateReason || (SuperResolutionStateReason = {}));

export let UploadErrorReason;
/**
 * The cloud proxy type.
 *
 * @since v3.3.1
 */

(function (UploadErrorReason) {
  UploadErrorReason[UploadErrorReason["Success"] = 0] = "Success";
  UploadErrorReason[UploadErrorReason["NetError"] = 1] = "NetError";
  UploadErrorReason[UploadErrorReason["ServerError"] = 2] = "ServerError";
})(UploadErrorReason || (UploadErrorReason = {}));

export let CloudProxyType;
/**
 * Quality of experience (QoE) of the local user when receiving a remote audio stream.
 *
 * @since v3.3.1
 */

(function (CloudProxyType) {
  CloudProxyType[CloudProxyType["None"] = 0] = "None";
  CloudProxyType[CloudProxyType["UDP"] = 1] = "UDP";
  CloudProxyType[CloudProxyType["TCP"] = 2] = "TCP";
})(CloudProxyType || (CloudProxyType = {}));

export let ExperienceQualityType;
/**
 * The reason for poor QoE of the local user when receiving a remote audio stream.
 *
 * @since v3.3.1
 */

(function (ExperienceQualityType) {
  ExperienceQualityType[ExperienceQualityType["Good"] = 0] = "Good";
  ExperienceQualityType[ExperienceQualityType["Bad"] = 1] = "Bad";
})(ExperienceQualityType || (ExperienceQualityType = {}));

export let ExperiencePoorReason;
/**
 * The options for SDK preset voice conversion effects.
 *
 * @since v3.3.1
 */

(function (ExperiencePoorReason) {
  ExperiencePoorReason[ExperiencePoorReason["None"] = 0] = "None";
  ExperiencePoorReason[ExperiencePoorReason["RemoteNetworkQualityPoor"] = 1] = "RemoteNetworkQualityPoor";
  ExperiencePoorReason[ExperiencePoorReason["LocalNetworkQualityPoor"] = 2] = "LocalNetworkQualityPoor";
  ExperiencePoorReason[ExperiencePoorReason["WirelessSignalPoor"] = 4] = "WirelessSignalPoor";
  ExperiencePoorReason[ExperiencePoorReason["WifiBluetoothCoexist"] = 8] = "WifiBluetoothCoexist";
})(ExperiencePoorReason || (ExperiencePoorReason = {}));

export let VoiceConversionPreset;
/**
 * The type of the custom background image.
 */

(function (VoiceConversionPreset) {
  VoiceConversionPreset[VoiceConversionPreset["Off"] = 0] = "Off";
  VoiceConversionPreset[VoiceConversionPreset["Neutral"] = 50397440] = "Neutral";
  VoiceConversionPreset[VoiceConversionPreset["Sweet"] = 50397696] = "Sweet";
  VoiceConversionPreset[VoiceConversionPreset["Solid"] = 50397952] = "Solid";
  VoiceConversionPreset[VoiceConversionPreset["Bass"] = 50397952] = "Bass";
})(VoiceConversionPreset || (VoiceConversionPreset = {}));

export let VirtualBackgroundSourceType;
/**
 * The reason why the virtual background is not successfully enabled or the message that confirms success.
 */

(function (VirtualBackgroundSourceType) {
  VirtualBackgroundSourceType[VirtualBackgroundSourceType["Color"] = 1] = "Color";
  VirtualBackgroundSourceType[VirtualBackgroundSourceType["Img"] = 2] = "Img";
  VirtualBackgroundSourceType[VirtualBackgroundSourceType["Blur"] = 3] = "Blur";
})(VirtualBackgroundSourceType || (VirtualBackgroundSourceType = {}));

export let VirtualBackgroundSourceStateReason;
/**
 * The information acquisition state, which is reported
 * in [`RequestAudioFileInfo`]{@link RequestAudioFileInfo}.
 *
 * @since v3.5.2
 */

(function (VirtualBackgroundSourceStateReason) {
  VirtualBackgroundSourceStateReason[VirtualBackgroundSourceStateReason["Success"] = 0] = "Success";
  VirtualBackgroundSourceStateReason[VirtualBackgroundSourceStateReason["ImageNotExist"] = 1] = "ImageNotExist";
  VirtualBackgroundSourceStateReason[VirtualBackgroundSourceStateReason["ColorFormatNotSupported"] = 2] = "ColorFormatNotSupported";
  VirtualBackgroundSourceStateReason[VirtualBackgroundSourceStateReason["DeviceNotSupported"] = 3] = "DeviceNotSupported";
})(VirtualBackgroundSourceStateReason || (VirtualBackgroundSourceStateReason = {}));

export let AudioFileInfoError;
/**
 * The channel mode, which is set in [`setAudioMixingDualMonoMode`]{@link setAudioMixingDualMonoMode}.
 *
 * @since v3.5.2
 */

(function (AudioFileInfoError) {
  AudioFileInfoError[AudioFileInfoError["Ok"] = 0] = "Ok";
  AudioFileInfoError[AudioFileInfoError["Failure"] = 1] = "Failure";
})(AudioFileInfoError || (AudioFileInfoError = {}));

export let AudioMixingDualMonoMode;
/**
 * The degree of blurring applied to the custom background image. See
 *
 * @since v3.5.2
 */

(function (AudioMixingDualMonoMode) {
  AudioMixingDualMonoMode[AudioMixingDualMonoMode["AUTO"] = 0] = "AUTO";
  AudioMixingDualMonoMode[AudioMixingDualMonoMode["L"] = 1] = "L";
  AudioMixingDualMonoMode[AudioMixingDualMonoMode["R"] = 2] = "R";
  AudioMixingDualMonoMode[AudioMixingDualMonoMode["MIX"] = 3] = "MIX";
})(AudioMixingDualMonoMode || (AudioMixingDualMonoMode = {}));

export let VirtualBackgroundBlurDegree;
/** The video codec type of the output video stream.

 @since v3.2.0
 */

(function (VirtualBackgroundBlurDegree) {
  VirtualBackgroundBlurDegree[VirtualBackgroundBlurDegree["Low"] = 1] = "Low";
  VirtualBackgroundBlurDegree[VirtualBackgroundBlurDegree["Medium"] = 2] = "Medium";
  VirtualBackgroundBlurDegree[VirtualBackgroundBlurDegree["High"] = 3] = "High";
})(VirtualBackgroundBlurDegree || (VirtualBackgroundBlurDegree = {}));

export let VideoCodecTypeForStream;
/** The proxy type.
 *
 * @since v3.6.2
 */

(function (VideoCodecTypeForStream) {
  VideoCodecTypeForStream[VideoCodecTypeForStream["H264"] = 1] = "H264";
  VideoCodecTypeForStream[VideoCodecTypeForStream["H265"] = 2] = "H265";
})(VideoCodecTypeForStream || (VideoCodecTypeForStream = {}));

export let ProxyType;
/** API for future use.
 * @ignore
 */

(function (ProxyType) {
  ProxyType[ProxyType["None"] = 0] = "None";
  ProxyType[ProxyType["Udp"] = 1] = "Udp";
  ProxyType[ProxyType["Tcp"] = 2] = "Tcp";
  ProxyType[ProxyType["Local"] = 3] = "Local";
  ProxyType[ProxyType["TcpAutoFallback"] = 4] = "TcpAutoFallback";
})(ProxyType || (ProxyType = {}));

export let ContentInspectResult;
/** API for future use.
 * @ignore
 */

(function (ContentInspectResult) {
  ContentInspectResult[ContentInspectResult["Neutral"] = 1] = "Neutral";
  ContentInspectResult[ContentInspectResult["Sexy"] = 2] = "Sexy";
  ContentInspectResult[ContentInspectResult["Porn"] = 3] = "Porn";
})(ContentInspectResult || (ContentInspectResult = {}));

export let WlAccReason;
/** API for future use.
 * @ignore
 */

(function (WlAccReason) {
  WlAccReason[WlAccReason["WeakSignal"] = 0] = "WeakSignal";
  WlAccReason[WlAccReason["ChannelCongestion"] = 1] = "ChannelCongestion";
})(WlAccReason || (WlAccReason = {}));

export let WlAccAction;
/**
 * Reasons for a user role switch failure.
 *
 * @since v3.7.0
 */

(function (WlAccAction) {
  WlAccAction[WlAccAction["CloseToWIFI"] = 0] = "CloseToWIFI";
  WlAccAction[WlAccAction["ConnectSSID"] = 1] = "ConnectSSID";
  WlAccAction[WlAccAction["Check5G"] = 2] = "Check5G";
  WlAccAction[WlAccAction["ModifySSID"] = 3] = "ModifySSID";
})(WlAccAction || (WlAccAction = {}));

export let ClientRoleChangeFailedReason;
/**
 * The content hint of the screen sharing.
 *
 * @since v3.7.0
 */

(function (ClientRoleChangeFailedReason) {
  ClientRoleChangeFailedReason[ClientRoleChangeFailedReason["TooManyBroadcasters"] = 1] = "TooManyBroadcasters";
  ClientRoleChangeFailedReason[ClientRoleChangeFailedReason["NotAuthorized"] = 2] = "NotAuthorized";
  ClientRoleChangeFailedReason[ClientRoleChangeFailedReason["RequestTimeOut"] = 3] = "RequestTimeOut";
  ClientRoleChangeFailedReason[ClientRoleChangeFailedReason["ConnectionFailed"] = 4] = "ConnectionFailed";
})(ClientRoleChangeFailedReason || (ClientRoleChangeFailedReason = {}));

export let VideoContentHint;

(function (VideoContentHint) {
  VideoContentHint[VideoContentHint["None"] = 0] = "None";
  VideoContentHint[VideoContentHint["Motion"] = 1] = "Motion";
  VideoContentHint[VideoContentHint["Details"] = 2] = "Details";
})(VideoContentHint || (VideoContentHint = {}));
//# sourceMappingURL=Enums.js.map