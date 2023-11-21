function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * The user information, including the user ID and user account.
 */

/**
 * The video resolution.
 */
export class VideoDimensions {
  /**
   * The width (px) of the video encoding resolution.
   */

  /**
   * The height (px) of the video encoding resolution.
   */
  constructor(params) {
    _defineProperty(this, "width", void 0);

    _defineProperty(this, "height", void 0);

    if (params) {
      this.width = params.width;
      this.height = params.height;
    }
  }

}
/**
 * Definition of VideoEncoderConfiguration.
 */

export class VideoEncoderConfiguration {
  /**
   * The video frame dimensions (px), which is used to specify the video quality and measured by the total number of pixels along a
   * frame's width and height. The default value is 640 × 360.
   * You can customize the dimension, or select from the following list:
   * <ul>
   *         <li>120x120</li>
   *         <li>160x120</li>
   *         <li>180x180</li>
   *         <li>240x180</li>
   *         <li>320x180</li>
   *         <li>240x240</li>
   *         <li>320x240</li>
   *         <li>424x240</li>
   *         <li>360x360</li>
   *         <li>480x360</li>
   *         <li>640x360</li>
   *         <li>480x480</li>
   *         <li>640x480</li>
   *         <li>840x480</li>
   *         <li>960x720</li>
   *         <li>1280x720</li>
   * </ul>
   *
   * **Note**
   * <ul>
   *    <li> The value of the dimension does not indicate the orientation mode of the output ratio. For how to set the video orientation, see [<code>VideoOutputOrientationMode</code>]{@link VideoOutputOrientationMode}.</li>
   *    <li> Whether 720p+ can be supported depends on the device. If the device cannot support 720p, the frame rate will be lower than the one listed in the table.</li>
   * </ul>
   *
   */

  /**
   * The video frame rate (fps). The default value is 15. Users can either set the frame rate manually or choose from the following options.
   * We do not recommend setting this to a value greater than 30.
   */

  /**
   * The minimum video encoder frame rate (fps). The default value is Min(-1) (the SDK uses the lowest encoder frame rate).
   */

  /**
   * Bitrate of the video (Kbps). Refer to the table below and set your bitrate. If you set a bitrate beyond the proper range, the SDK automatically adjusts it to a value within the range.
   * You can also choose from the following options:
   *  - [`Standard`]{@link BitRate.Standard}: (Recommended) The standard bitrate mode. In this mode, the bitrates differ between the `LiveBroadcasting` and `Communication` profiles:
   *      - In the `Communication` profile, the video bitrate is the same as the base bitrate.
   *      - In the `LiveBroadcasting` profile, the video bitrate is twice the base bitrate.
   *  - [`Compatible`]{@link BitRate.Compatible}: The compatible bitrate mode. In this mode, the bitrate stays the same regardless of the profile. If you choose this mode for the `LiveBroadcasting` profile, the video frame rate may be lower than the set value.
   *
   * Agora uses different video codecs for different profiles to optimize the user experience. For example, the Communication profile prioritizes the smoothness while the `LiveBroadcasting` profile prioritizes the video quality (a higher bitrate). Therefore, We recommend setting this parameter as [`Standard`]{@link BitRate.Standard}.
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
   * **Note**
   *
   * The base bitrate in this table applies to the Communication profile.
   * The `LiveBroadcasting` profile generally requires a higher bitrate for better video quality.
   * We recommend setting the bitrate mode as [`Standard`]{@link BitRate.Standard}. You can also set the bitrate as the base bitrate value &times; 2.
   */

  /**
   * The minimum encoding bitrate (Kbps). The Agora SDK automatically adjusts the encoding bitrate to adapt to the network conditions. Using a value greater than the default value forces the video encoder to output high-quality images but may cause more packet loss and hence sacrifice the smoothness of the video transmission. That said, unless you have special requirements for image quality,
   * Agora does not recommend changing this value.
   */

  /**
   * The orientation mode.
   */

  /**
   * The video encoding degradation preference under limited bandwidth.
   */

  /**
   * Sets the mirror mode of the published local video stream.
   */
  constructor(params) {
    _defineProperty(this, "dimensions", void 0);

    _defineProperty(this, "frameRate", void 0);

    _defineProperty(this, "minFrameRate", void 0);

    _defineProperty(this, "bitrate", void 0);

    _defineProperty(this, "minBitrate", void 0);

    _defineProperty(this, "orientationMode", void 0);

    _defineProperty(this, "degradationPrefer", void 0);

    _defineProperty(this, "mirrorMode", void 0);

    if (params) {
      this.dimensions = params.dimensions;
      this.frameRate = params.frameRate;
      this.minFrameRate = params.minFrameRate;
      this.bitrate = params.bitrate;
      this.minBitrate = params.minBitrate;
      this.orientationMode = params.orientationMode;
      this.degradationPrefer = params.degradationPrefer;
      this.mirrorMode = params.mirrorMode;
    }
  }

}
/**
 * Sets the image enhancement options.
 */

export class BeautyOptions {
  /**
   * The contrast level, often used in conjunction with `lighteningLevel`.
   * The higher the value, the greater the contrast level. See [`LighteningContrastLevel`]{@link LighteningContrastLevel}.
   */

  /**
   * The brightening level, in the range [0.0,1.0], where 0.0 means the original brightening. The default value is 0.6. The higher the value, the greater the brightening level.
   */

  /**
   * The smoothness level, in the range [0.0,1.0], where 0.0 means the original smoothness.
   * The default value is 0.5. The higher the value, the greater the smoothness level.
   */

  /**
   * The redness level, in the range [0.0,1.0], where 0.0 means the original redness.
   * The default value is 0.1. The higher the value, the greater the redness level.
   */

  /**
   * The sharpness level, in the range [0.0,1.0], where 0.0 means the original sharpness.
   * The default value is 0.3. The higher the value, the greater the sharpness level.
   *
   * @since v3.6.2
   */
  constructor(params) {
    _defineProperty(this, "lighteningContrastLevel", void 0);

    _defineProperty(this, "lighteningLevel", void 0);

    _defineProperty(this, "smoothnessLevel", void 0);

    _defineProperty(this, "rednessLevel", void 0);

    _defineProperty(this, "sharpnessLevel", void 0);

    if (params) {
      this.lighteningContrastLevel = params.lighteningContrastLevel;
      this.lighteningLevel = params.lighteningLevel;
      this.smoothnessLevel = params.smoothnessLevel;
      this.rednessLevel = params.rednessLevel;
      this.sharpnessLevel = params.sharpnessLevel;
    }
  }

}
/**
 * Agora image properties. A class for setting the properties of the watermark and background images.
 */

export class AgoraImage {
  /**
   * HTTP/HTTPS URL address of the image on the broadcasting video. The maximum length of this parameter is 1024 bytes.
   */

  /**
   * Position of the image on the upper left of the broadcasting video on the horizontal axis.
   */

  /**
   * Position of the image on the upper left of the broadcasting video on the vertical axis.
   */

  /**
   * Width of the image on the broadcasting video.
   */

  /**
   * Height of the image on the broadcasting video.
   */

  /**
   * The layer number of the watermark or background image.
   *
   * When you use the watermark array to add a watermark or multiple watermarks, you must pass a value to `zOrder` in the range [1,255];
   * otherwise, the SDK reports an error. In other cases, `zOrder` can optionally be passed in the range [0,255],
   * with 0 being the default value. `0` means the bottom layer and `255` means the top layer.
   *
   * @since v3.6.2
   */

  /**
   * The transparency of the watermark or background image. The value range is [0.0,1.0]:
   * - `0.0`: Completely transparent.
   * - `1.0`: (Default) Opaque.
   *
   * @since v3.6.2
   */
  constructor(url, params) {
    _defineProperty(this, "url", void 0);

    _defineProperty(this, "x", void 0);

    _defineProperty(this, "y", void 0);

    _defineProperty(this, "width", void 0);

    _defineProperty(this, "height", void 0);

    _defineProperty(this, "zOrder", void 0);

    _defineProperty(this, "alpha", void 0);

    this.url = url;

    if (params) {
      this.x = params.x;
      this.y = params.y;
      this.width = params.width;
      this.height = params.height;
      this.zOrder = params.zOrder;
      this.alpha = params.alpha;
    }
  }

}
/**
 * The transcodingUser class, which defines the audio and video properties in the CDN live. Agora supports a maximum of 17 transcoding users in a CDN live streaming channel.
 */

export class TranscodingUser {
  /**
   * ID of the user in the CDN live streaming.
   */

  /**
   * Horizontal position of the video frame of the user from the top left corner of the CDN live streaming.
   */

  /**
   * Vertical position of the video frame of the user from the top left corner of the CDN live streaming.
   */

  /**
   * Width of the video frame of the user on the CDN live streaming. The default value is 360.
   */

  /**
   * Height of the video frame of the user on the CDN live streaming. The default value is 640.
   */

  /**
   * Layer position of video frame of the user on the CDN live streaming. The value ranges between 0 and 100. From v2.3.0, Agora SDK supports setting zOrder as 0. The smallest value is 0 (default value), which means that the video frame is at the bottom layer. The biggest value is 100, which means that the video frame is at the top layer.
   */

  /**
   * The transparency of the video frame of the user in the CDN live streaming that ranges between 0.0 and 1.0. 0.0 means that the video frame is completely transparent and 1.0 means opaque. The default value is 1.0.
   */

  /**
   * The audio channel ranging between 0 and 5. The default value is 0.
   *
   * - 0: (default) Supports dual channels. Depends on the upstream of the broadcaster.
   * - 1: The audio stream of the broadcaster uses the FL audio channel. If the broadcaster’s upstream uses multiple audio channels, these channels are mixed into mono first.
   * - 2: The audio stream of the broadcaster uses the FC audio channel. If the broadcaster’s upstream uses multiple audio channels, these channels are mixed into mono first.
   * - 3: The audio stream of the broadcaster uses the FR audio channel. If the broadcaster’s upstream uses multiple audio channels, these channels are mixed into mono first.
   * - 4: The audio stream of the broadcaster uses the BL audio channel. If the broadcaster’s upstream uses multiple audio channels, these channels are mixed into mono first.
   * - 5: The audio stream of the broadcaster uses the BR audio channel. If the broadcaster’s upstream uses multiple audio channels, these channels are mixed into mono first.
   *
   * **Note**
   *
   * Special players are needed if `audioChannel` is not set as 0.
   */
  constructor(uid, params) {
    _defineProperty(this, "uid", void 0);

    _defineProperty(this, "x", void 0);

    _defineProperty(this, "y", void 0);

    _defineProperty(this, "width", void 0);

    _defineProperty(this, "height", void 0);

    _defineProperty(this, "zOrder", void 0);

    _defineProperty(this, "alpha", void 0);

    _defineProperty(this, "audioChannel", void 0);

    this.uid = uid;

    if (params) {
      this.x = params.x;
      this.y = params.y;
      this.width = params.width;
      this.height = params.height;
      this.zOrder = params.zOrder;
      this.alpha = params.alpha;
      this.audioChannel = params.audioChannel;
    }
  }

}
/**
 * Color for [`VirtualBackgroundSource`]{@link VirtualBackgroundSource}
 */

export class Color {
  /**
   * Red value (0 - 255)
   */

  /**
   * Green value (0 - 255)
   */

  /**
   * Blue value (0 - 255)
   */

  /**
   * Create a color for [`VirtualBackgroundSource`]{@link VirtualBackgroundSource}
   * @param red Red value (0 - 255)
   * @param green Green value (0 - 255)
   * @param blue Blue value (0 - 255)
   */
  constructor(red, green, blue) {
    _defineProperty(this, "red", void 0);

    _defineProperty(this, "green", void 0);

    _defineProperty(this, "blue", void 0);

    this.red = red;
    this.green = green;
    this.blue = blue;
  }

}
/**
 * A class for managing user-specific CDN live audio/video transcoding settings.
 */

export class LiveTranscoding {
  /**
   * Width (pixel) of the video. The default value is 360.
   * - When pushing video streams to the CDN, the value range of `width` is [64,1920]. If the value is less than 64, Agora server automatically adjusts it to 64; if the value is greater than 1920, Agora server automatically adjusts it to 1920.
   * - If you push audio streams to the CDN, set the value of width × height to 0 × 0.
   */

  /**
   * Height (pixel) of the video. The default value is 640.
   * - When pushing video streams to the CDN, the value range of `height` is [64,1080]. If the value is less than 64, Agora server automatically adjusts it to 64; if the value is greater than 1080, Agora server automatically adjusts it to 1080.
   * - If you push audio streams to the CDN, set the value of width × height to 0 × 0.
   */

  /**
   * Bitrate (Kbps) of the CDN live output video stream. The default value is 400. Set this parameter according to the Video Bitrate Table. If you set a bitrate beyond the proper range,
   * the SDK automatically adapts it to a value within the range.
   */

  /**
   * Frame rate (fps) of the CDN live output video stream.
   * The value range is [0,30]. The default value is 15. Agora adjusts all values over 30 to 30.
   */

  /**
   * @deprecated
   * - `true`: Low latency with unassured quality.
   * - `false`: (Default) High latency with assured quality.
   */

  /**
   * Gop of the video frames in the CDN live stream. The default value is 30 fps.
   */

  /**
   * The watermark on the live video. The image format must be PNG.
   */

  /**
   * The array of watermarks on the live video. You can use `watermarkList` to add one or more watermarks.
   * The image format must be PNG.
   *
   * The total number of watermarks and background images on the live video must be greater than or equal to 0 and less than or equal to 10.
   *
   * @since v3.6.2
   */

  /**
   * The background image on the live video. The format must be in the PNG format.
   */

  /**
   * The array of background images on the live video. You can use `backgroundImageList` to add one or more background images. The image format must be PNG.
   * The total number of watermarks and background images on the live video must be greater than or equal to 0 and less than or equal to 10.
   *
   * @since v3.6.2
   */

  /**
   * Self-defined audio-sample rate: AudioSampleRateType.
   */

  /**
   * Bitrate (Kbps) of the CDN live audio output stream. The default value is 48 and the highest value is 128.
   */

  /**
   * The number of audio channels for the CDN live stream.
   *
   * Agora recommends choosing 1 (mono), or 2 (stereo) audio channels. Special players are required if you choose 3, 4, or 5.
   * - 1: (Default) Mono
   * - 2: Stereo
   * - 3: Three audio channels
   * - 4: Four audio channels
   * - 5: Five audio channels
   */

  /**
   * Audio codec profile type: AudioCodecProfileType. Set it as LC-AAC or HE-AAC. The default value is LC-AAC.
   */

  /**
   * Video codec profile type: VideoCodecProfileType. Set it as BASELINE, MAIN, or HIGH (default). If you set this parameter to other values, Agora adjusts it to the default value HIGH.
   */

  /**
   * The video codec type of the output video stream.
   *
   * @since v3.2.0
   */

  /**
   * Sets the background color.
   */

  /**
   * Reserved property. Extra user-defined information to send the Supplemental Enhancement Information (SEI) for the H.264/H.265 video stream to the CDN live client. Maximum length: 4096 Bytes.
   */

  /**
   * The metadata sent to the CDN live client.
   *
   * @deprecated This property is deprecated.
   */

  /**
   * An TranscodingUser object managing the user layout configuration in the CDN live stream. Agora supports a maximum of 17 transcoding users in a CDN live stream channel.
   */

  /**
   * @ignore
   */
  constructor(transcodingUsers, params) {
    _defineProperty(this, "width", void 0);

    _defineProperty(this, "height", void 0);

    _defineProperty(this, "videoBitrate", void 0);

    _defineProperty(this, "videoFramerate", void 0);

    _defineProperty(this, "lowLatency", void 0);

    _defineProperty(this, "videoGop", void 0);

    _defineProperty(this, "watermark", void 0);

    _defineProperty(this, "watermarkList", void 0);

    _defineProperty(this, "backgroundImage", void 0);

    _defineProperty(this, "backgroundImageList", void 0);

    _defineProperty(this, "audioSampleRate", void 0);

    _defineProperty(this, "audioBitrate", void 0);

    _defineProperty(this, "audioChannels", void 0);

    _defineProperty(this, "audioCodecProfile", void 0);

    _defineProperty(this, "videoCodecProfile", void 0);

    _defineProperty(this, "videoCodecType", void 0);

    _defineProperty(this, "backgroundColor", void 0);

    _defineProperty(this, "userConfigExtraInfo", void 0);

    _defineProperty(this, "metadata", void 0);

    _defineProperty(this, "transcodingUsers", void 0);

    _defineProperty(this, "advancedFeatures", void 0);

    if (params) {
      this.width = params.width;
      this.height = params.height;
      this.videoBitrate = params.videoBitrate;
      this.videoFramerate = params.videoFramerate;
      this.lowLatency = params.lowLatency;
      this.videoGop = params.videoGop;
      this.watermark = params.watermark;
      this.watermarkList = params.watermarkList;
      this.backgroundImage = params.backgroundImage;
      this.backgroundImageList = params.backgroundImageList;
      this.audioSampleRate = params.audioSampleRate;
      this.audioBitrate = params.audioBitrate;
      this.audioChannels = params.audioChannels;
      this.audioCodecProfile = params.audioCodecProfile;
      this.videoCodecProfile = params.videoCodecProfile;
      this.videoCodecType = params.videoCodecType;
      this.backgroundColor = params.backgroundColor;
      this.userConfigExtraInfo = params.userConfigExtraInfo;
      this.metadata = params.metadata;
      this.advancedFeatures = params.advancedFeatures;
    }

    this.transcodingUsers = transcodingUsers;
  }

}
/**
 * The ChannelMediaInfo class.
 */

export class ChannelMediaInfo {
  /**
   * The channel name.
   */

  /**
   * The token that enables the user to join the channel.
   */

  /**
   * The user ID.
   */
  constructor(channelName, uid, params) {
    _defineProperty(this, "channelName", void 0);

    _defineProperty(this, "token", void 0);

    _defineProperty(this, "uid", void 0);

    this.channelName = channelName;

    if (params) {
      this.token = params.token;
    }

    this.uid = uid;
  }

}
/**
 * The ChannelMediaRelayConfiguration class.
 */

export class ChannelMediaRelayConfiguration {
  /**
   * The information of the source channel: [`ChannelMediaInfo`]{@link ChannelMediaInfo}. It contains the following members:
   * - `channelName`: The name of the source channel. The default value is null, which means the SDK applies the name of the current channel.
   * - `uid`: ID of the host whose media stream you want to relay. The default value is 0, which means the SDK generates a random UID. You must set it as 0.
   * - `token`: The token for joining the source channel. It is generated with the `channelName` and `uid` you set in `srcInfo`.
   *  - If you have not enabled the App Certificate, set this parameter as the default value null, which means the SDK applies the App ID.
   *  - If you have enabled the App Certificate, you must use the token generated with the `channelName` and `uid`, and the `uid` must be set as 0.
   */

  /**
   * The information of the destination channel: [`ChannelMediaInfo`]{@link ChannelMediaInfo}. It contains the following members:
   * - `channelName`: The name of the destination channel.
   * - `uid`: ID of the host in the destination channel. The value ranges from 0 to (2<sup>32</sup>-1). To avoid UID conflicts, this uid must be different from any other UIDs in the destination channel. The default value is 0, which means the SDK generates a random UID.
   * - `token`: The token for joining the source channel. It is generated with the `channelName` and `uid` you set in `destInfo`.
   *  - If you have not enabled the App Certificate, set this parameter as the default value null, which means the SDK applies the App ID.
   *  - If you have enabled the App Certificate, you must use the token generated with the `channelName` and `uid`, and the `uid` must be set as 0.
   */
  constructor(srcInfo, destInfos) {
    _defineProperty(this, "srcInfo", void 0);

    _defineProperty(this, "destInfos", void 0);

    this.srcInfo = srcInfo;
    this.destInfos = destInfos;
  }

}
/**
 * Lastmile probe configuration.
 */

export class LastmileProbeConfig {
  /**
   * Whether to probe uplink of lastmile. i.e., audience don't need probe uplink bandwidth.
   */

  /**
   * Whether to probe downlink of lastmile.
   */

  /**
   * The expected maximum sending bitrate in bps in range of [100000,5000000]. It is recommended to set this value according to the required bitrate of selected video profile.
   */

  /**
   * The expected maximum receive bitrate in bps in range of [100000,5000000].
   */
  constructor(probeUplink, probeDownlink, expectedUplinkBitrate, expectedDownlinkBitrate) {
    _defineProperty(this, "probeUplink", void 0);

    _defineProperty(this, "probeDownlink", void 0);

    _defineProperty(this, "expectedUplinkBitrate", void 0);

    _defineProperty(this, "expectedDownlinkBitrate", void 0);

    this.probeUplink = probeUplink;
    this.probeDownlink = probeDownlink;
    this.expectedUplinkBitrate = expectedUplinkBitrate;
    this.expectedDownlinkBitrate = expectedDownlinkBitrate;
  }

}
/**
 * The position and size of the watermark image.
 */

export class Rectangle {
  /**
   * The horizontal offset from the top-left corner.
   */

  /**
   * The vertical offset from the top-left corner.
   */

  /**
   * The width (pixels) of the watermark image.
   */

  /**
   * The height (pixels) of the watermark image.
   */
  constructor(params) {
    _defineProperty(this, "x", void 0);

    _defineProperty(this, "y", void 0);

    _defineProperty(this, "width", void 0);

    _defineProperty(this, "height", void 0);

    if (params) {
      this.x = params.x;
      this.y = params.y;
      this.width = params.width;
      this.height = params.height;
    }
  }

}
/**
 * Agora watermark options. A class for setting the properties of watermark.
 */

export class WatermarkOptions {
  /**
   * Sets whether or not the watermark image is visible in the local video preview:
   * - `true`: (Default) The watermark image is visible in preview.
   * - `false`: The watermark image is not visible in preview.
   */

  /**
   * The watermark position in the landscape mode.
   */

  /**
   * The watermark position in the portrait mode.
   */
  constructor(params) {
    _defineProperty(this, "visibleInPreview", void 0);

    _defineProperty(this, "positionInLandscapeMode", void 0);

    _defineProperty(this, "positionInPortraitMode", void 0);

    if (params) {
      this.visibleInPreview = params.visibleInPreview;
      this.positionInLandscapeMode = params.positionInLandscapeMode;
      this.positionInPortraitMode = params.positionInPortraitMode;
    }
  }

}
/**
 * Configuration of the imported live interactive voice or video stream.
 */

export class LiveInjectStreamConfig {
  /**
   * Width (pixels) of the added stream to the live interactive streaming. The default value is 0, which is the same width as the original stream.
   */

  /**
   * Height (pixels) of the added stream to the live interactive streaming. The default value is 0, which is the same height as the original stream.
   */

  /**
   * Video GOP of the added stream to the live interactive streaming. The default value is 30 frames.
   */

  /**
   * Video frame rate of the added stream to the live interactive streaming. The default value is 15 fps.
   */

  /**
   * Video bitrate of the added stream to the live interactive streaming. The default value is 400 Kbps.
   *
   * **Note**
   *
   * The setting of the video bitrate is closely linked to the resolution. If you set the video bitrate beyond a reasonable range, the SDK sets it within a reasonable range instead.
   */

  /**
   * Audio sample rate of the added stream to the live interactive streaming. The default value is 44100 Hz.
   *
   * **Note**
   *
   * We recommend you use the default value and not reset it.
   */

  /**
   * Audio bitrate of the added stream to the live interactive streaming. The default value is 48 Kbps.
   *
   * **Note**
   *
   * We recommend you use the default value and not reset it.
   */

  /**
   * Audio channels to add into the live streaming. The value ranges between 1 and 2. The default value is 1.
   *
   * **Note**
   *
   * We recommend you use the default value and not reset it.
   */
  constructor(params) {
    _defineProperty(this, "width", void 0);

    _defineProperty(this, "height", void 0);

    _defineProperty(this, "videoGop", void 0);

    _defineProperty(this, "videoFramerate", void 0);

    _defineProperty(this, "videoBitrate", void 0);

    _defineProperty(this, "audioSampleRate", void 0);

    _defineProperty(this, "audioBitrate", void 0);

    _defineProperty(this, "audioChannels", void 0);

    if (params) {
      this.width = params.width;
      this.height = params.height;
      this.videoGop = params.videoGop;
      this.videoFramerate = params.videoFramerate;
      this.videoBitrate = params.videoBitrate;
      this.audioSampleRate = params.audioSampleRate;
      this.audioBitrate = params.audioBitrate;
      this.audioChannels = params.audioChannels;
    }
  }

}
/**
 * The metronome configuration, which is set in [`startRhythmPlayer`]{@link startRhythmPlayer} or [`configRhythmPlayer`]{@link configRhythmPlayer}.
 *
 * @since v3.4.2
 */

export class RhythmPlayerConfig {
  /**
   * The number of beats per measure. The range is 1 to 9. The default value is 4, which means that each measure contains one downbeat and three upbeats.
   */

  /**
   * Tempo (beats per minute). The range is 60 to 360. The default value is 60, which means that the metronome plays 60 beats in one minute.
   */

  /**
   * Whether to publish the sound of the metronome to remote users:
   * - `true`: (Default) Publish. Both the local user and remote users can hear the metronome.
   * - `false`: Do not publish. Only the local user can hear the metronome.
   */
  constructor(params) {
    _defineProperty(this, "beatsPerMeasure", void 0);

    _defineProperty(this, "beatsPerMinute", void 0);

    _defineProperty(this, "publish", void 0);

    if (params) {
      this.beatsPerMeasure = params.beatsPerMeasure;
      this.beatsPerMinute = params.beatsPerMinute;
      this.publish = params.publish;
    }
  }

}
/**
 * The definition of CameraCapturerConfiguration.
 */

export class CameraCapturerConfiguration {
  /**
   * The camera capture preference.
   */

  /**
   * The width (px) of the video image captured by the local camera. To customize the width of the video image, set `preference` as [`Manual`]{@link CameraCaptureOutputPreference.Manual} first, and then use `captureWidth`.
   *
   * @since v3.3.1.
   */

  /**
   * The height (px) of the video image captured by the local camera. To customize the height of the video image, set `preference` as [`Manual`]{@link CameraCaptureOutputPreference.Manual} first, and then use `captureHeight`.
   *
   * @since v3.3.1.
   */

  /**
   * The camera direction.
   */
  constructor(params) {
    _defineProperty(this, "preference", void 0);

    _defineProperty(this, "captureWidth", void 0);

    _defineProperty(this, "captureHeight", void 0);

    _defineProperty(this, "cameraDirection", void 0);

    if (params) {
      this.preference = params.preference;
      this.captureWidth = params.captureWidth;
      this.captureHeight = params.captureHeight;
      this.cameraDirection = params.cameraDirection;
    }
  }

}
/**
 * The channel media options.
 */

export class ChannelMediaOptions {
  /**
   * Determines whether to subscribe to audio streams when the user joins the channel.
   * - `true`: (Default) Subscribe.
   * - `false`: Do not subscribe.
   *
   * This member serves a similar function to the [`muteAllRemoteAudioStreams`]{@link RtcEngine.muteAllRemoteAudioStreams} method. After joining the channel, you can call the `muteAllRemoteAudioStreams` method to set whether to subscribe to audio streams in the channel.
   */

  /**
   * Determines whether to subscribe to video streams when the user joins the channel.
   * - `true`: (Default) Subscribe.
   * - `false`: Do not subscribe.
   *
   * This member serves a similar function to the [`muteAllRemoteVideoStreams`]{@link RtcEngine.muteAllRemoteVideoStreams} method. After joining the channel, you can call the `muteAllRemoteVideoStreams` method to set whether to subscribe to audio streams in the channel.
   */

  /**
   * Determines whether to publish the local audio stream when the user joins a channel:
   * - `true`: (Default) Publish.
   * - `false`: Do not publish.
   *
   * This member serves a similar function to the [`muteLocalAudioStream`]{@link RtcEngine.muteLocalAudioStream} method.
   * After the user joins the channel, you can call the `muteLocalAudioStream` method to set whether to publish the local audio stream in the channel.
   *
   * @since v3.4.5
   */

  /**
   * Determines whether to publish the local video stream when the user joins a channel:
   * - `true`: (Default) Publish.
   * - `false`: Do not publish.
   *
   * This member serves a similar function to the [`muteLocalVideoStream`]{@link RtcEngine.muteLocalVideoStream} method.
   * After the user joins the channel, you can call the `muteLocalVideoStream` method to set whether to publish the local video stream in the channel.
   *
   * @since v3.4.5
   */
  constructor(params) {
    _defineProperty(this, "autoSubscribeAudio", void 0);

    _defineProperty(this, "autoSubscribeVideo", void 0);

    _defineProperty(this, "publishLocalAudio", void 0);

    _defineProperty(this, "publishLocalVideo", void 0);

    if (params) {
      this.autoSubscribeAudio = params.autoSubscribeAudio;
      this.autoSubscribeVideo = params.autoSubscribeVideo;
      this.publishLocalAudio = params.publishLocalAudio;
      this.publishLocalVideo = params.publishLocalVideo;
    }
  }

}
/**
 * Definition of `EncryptionConfig`.
 *
 * @since v3.1.2.
 */

export class EncryptionConfig {
  /**
   * Encryption mode. The default encryption mode is `AES128GCM2`.
   * See [`EncryptionMode`]{@link EncryptionMode}.
   */

  /**
   * Encryption key in string type with unlimited length. Agora recommends using a 32-byte key.
   *
   * **Note**
   *
   * If you do not set an encryption key or set it as null, you cannot use the built-in encryption, and the SDK returns [`InvalidArgument(2)`]{@link ErrorCode.InvalidArgument}.
   */

  /**
   * The salt with the length of 32 bytes. Agora recommends using OpenSSL to generate the salt on your server.
   * For details, see *Media Stream Encryption*.
   *
   * @since v3.4.5
   *
   * Note: This parameter is only valid when you set the encryption mode as `AES128GCM2` or `AES256GCM2`.
   * Ensure that this parameter meets the following requirements:
   * - Android: This parameter is not 0.
   * - iOS: This parameter is not nil or 0, and the data length is 32 bytes.
   */
  constructor(params) {
    _defineProperty(this, "encryptionMode", void 0);

    _defineProperty(this, "encryptionKey", void 0);

    _defineProperty(this, "encryptionKdfSalt", void 0);

    if (params) {
      this.encryptionMode = params.encryptionMode;
      this.encryptionKey = params.encryptionKey;
      this.encryptionKdfSalt = params.encryptionKdfSalt;
    }
  }

}
/**
 * Statistics of the call.
 */

/**
 * The detailed options of a user.
 *
 * @since v3.2.0.
 */
export class ClientRoleOptions {
  /**
   * The latency level of an audience member in a live interactive streaming. See {@link AudienceLatencyLevelType}.
   */
  constructor(params) {
    _defineProperty(this, "audienceLatencyLevel", void 0);

    if (params) {
      this.audienceLatencyLevel = params.audienceLatencyLevel;
    }
  }

}
/**
 * Log file configurations.
 *
 * @since v3.3.1.
 */

export class LogConfig {
  /**
   * The absolute path of log files. The default file path is as follows:
   *   - Android: `/storage/emulated/0/Android/data/<package_name>/files/agorasdk.log`
   *   - iOS: `App Sandbox/Library/caches/agorasdk.log`
   * Ensure that the directory for the log files exists and is writable. You can use this parameter to rename the log files.
   */

  /**
   * The size (KB) of a log file. The default value is 1024 KB. If you set `fileSize` to 1024 KB, the SDK outputs at most 5 MB log files; if you set it to less than 1024 KB, the setting is invalid, and the maximum size of a log file is still 1024 KB.
   */

  /**
   * The output log level of the SDK.
   *
   * For example, if you set the log level to `WARN`, the SDK outputs the logs within levels `FATAL`, `ERROR`, and `WARN`.
   *
   * See [`LogLevel`]{@link enum LogLevel}.
   */
  constructor(params) {
    _defineProperty(this, "filePath", void 0);

    _defineProperty(this, "fileSize", void 0);

    _defineProperty(this, "level", void 0);

    if (params) {
      this.filePath = params.filePath;
      this.fileSize = params.fileSize;
      this.level = params.level;
    }
  }

}
/**
 * The configurations for the data stream.
 *
 * @since v3.3.1
 *
 * | `syncWithAudio` | `ordered` | SDK behaviors                                                |
 * | :-------------- | :-------- | :----------------------------------------------------------- |
 * | `false`         | `false`   | The SDK triggers the `StreamMessage` callback immediately after the receiver receives a data packet. |
 * | `true`          | `false`   | <ul><li>If the data packet delay is within the audio delay, the SDK triggers the <code>StreamMessage</code> callback when the synchronized audio packet is played out</li><li>If the data packet delay exceeds the audio delay, the SDK triggers the <code>StreamMessage</code> callback as soon as the data packet is received. In this case, the data packet is not synchronized with the audio packet.</li></ul>.  |
 * | `false`         | `true`    | <ul><li>If the delay of a data packet is within five seconds, the SDK corrects the order of the data packet.</li><li>If the delay of a data packet exceeds five seconds, the SDK discards the data packet.</li></ul> |
 * | `true`          | `true`    |    <ul><li>If the delay of a data packet is within the audio delay, the SDK corrects the order of the data packet.</li><li>If the delay of a data packet exceeds the audio delay, the SDK discards this data packet.</li></ul>                                                          |
 */

export class DataStreamConfig {
  /**
   * Whether to synchronize the data packet with the published audio packet.
   * - `true`: Synchronize the data packet with the audio packet.
   * - `false`: Do not synchronize the data packet with the audio packet.
   *
   * When you set the data packet to synchronize with the audio, then if the data packet delay is within the audio delay range, the SDK triggers the [`StreamMessage`]{@link RtcEngineEvents.StreamMessage} callback when the synchronized audio packet is played out. Do not set this parameter as `true` if you need the receiver to receive the data packet immediately. Agora recommends that you set this parameter to `true` only when you need to implement specific functions, for example lyric synchronization.
   */

  /**
   * Whether the SDK guarantees that the receiver receives the data in the sent order.
   * - `true`: Guarantee that the receiver receives the data in the sent order.
   * - `false`: Do not guarantee that the receiver receives the data in the sent order.
   *
   * Do not set this parameter to `true` if you need the receiver to receive the data immediately.
   */
  constructor(syncWithAudio, ordered) {
    _defineProperty(this, "syncWithAudio", void 0);

    _defineProperty(this, "ordered", void 0);

    this.syncWithAudio = syncWithAudio;
    this.ordered = ordered;
  }

}
/**
 * Configurations for the [`RtcEngine`]{@link RtcEngine}.
 *
 * @since v3.4.5
 */

export class RtcEngineContext {
  /**
   * The App ID issued to you by Agora. See [How to get the App ID](https://docs.agora.io/en/Agora%20Platform/token#get-an-app-id).
   * Only users in apps with the same App ID can join the same channel and communicate with each other. Use an App ID to create only
   * one `IRtcEngine` instance. To change your App ID, call `release` to destroy the current `IRtcEngine` instance and then call `createAgoraRtcEngine`
   * and `initialize` to create an `IRtcEngine` instance with the new App ID.
   */

  /**
   * The region for connection. This advanced feature applies to scenarios that have regional restrictions.
   *
   * For the regions that Agora supports, see [`AreaCode`]{@link AreaCode}. The area codes support bitwise operation.
   *
   * After specifying the region, the SDK connects to the Agora servers within that region.
   *
   */

  /**
   * The configuration of the log files that the SDK outputs. See [`LogConfig`]{@link LogConfig}.
   *
   * By default, the SDK outputs five log files, `agorasdk.log`, `agorasdk_1.log`, `agorasdk_2.log`, `agorasdk_3.log`, `agorasdk_4.log`, each with a default size of 1024 KB. These log files are encoded in UTF-8. The SDK writes the latest logs in `agorasdk.log`. When `agorasdk.log` is full, the SDK deletes the log file with the earliest modification time among the other four, renames `agorasdk.log` to the name of the deleted log file, and creates a new `agorasdk.log` to record latest logs.
   *
   * The log file records all log data for the SDK’s operation. Ensure that the directory for the log file exists and is writable.
   */
  constructor(appId, params) {
    _defineProperty(this, "appId", void 0);

    _defineProperty(this, "areaCode", void 0);

    _defineProperty(this, "logConfig", void 0);

    this.appId = appId;

    if (params) {
      this.areaCode = params.areaCode;
      this.logConfig = params.logConfig;
    }
  }

}
/**
 *
 * Configurations for the [`RtcEngine`]{@link RtcEngine}.
 *
 * @deprecated As of v3.4.5, this class is deprecated. Use [`RtcEngineContext`]{@link RtcEngineContext} instead.
 *
 * @since v3.3.1
 */

export class RtcEngineConfig extends RtcEngineContext {}
/**
 * Recording configuration, which is set in [`startAudioRecordingWithConfig`]{@link startAudioRecordingWithConfig}.
 */

export class AudioRecordingConfiguration {
  /**
   *
   * The absolute path (including the filename extensions) of the recording file. For example:
   * - On Android: `/sdcard/emulated/0/audio.aac`.
   * - On iOS: `/var/mobile/Containers/Data/audio.aac`.
   *
   * **Note**
   * Ensure that the path you specify exists and is writable.
   */

  /**
   * Audio recording quality. See [`AudioRecordingQuality`]{@link AudioRecordingQuality}.
   *
   * **Note** This parameter applies to AAC files only.
   */

  /**
   * Recording content. See [`AudioRecordingPosition`]{@link AudioRecordingPosition}.
   */

  /**
   * Recording sample rate (Hz). The following values are supported:
   * - 16000
   * - (Default) 32000
   * - 44100
   * - 48000
   *
   * **Note**
   * If this parameter is set to `44100` or `48000`, for better recording effects, Agora recommends recording WAV files or AAC files whose `recordingQuality` is `Medium` or `High`.
   *
   */

  /**
   * The recorded audio channel. The following values are supported:
   * - `1`: (Default) Mono channel.
   * - `2`: Dual channel.
   *
   * @since v3.6.2
   */
  constructor(filePath, params) {
    _defineProperty(this, "filePath", void 0);

    _defineProperty(this, "recordingQuality", void 0);

    _defineProperty(this, "recordingPosition", void 0);

    _defineProperty(this, "recordingSampleRate", void 0);

    _defineProperty(this, "recordingChannel", void 0);

    this.filePath = filePath;

    if (params) {
      this.recordingQuality = params.recordingQuality;
      this.recordingPosition = params.recordingPosition;
      this.recordingSampleRate = params.recordingSampleRate;
      this.recordingChannel = params.recordingChannel;
    }
  }

}
/**
 * The custom background image.
 *
 * @since v3.5.0.3
 */

export class VirtualBackgroundSource {
  /**
   * The type of the custom background image. See [`VirtualBackgroundSourceType`]{@link VirtualBackgroundSourceType}.
   */

  /**
   * The color of the custom background image.
   * The format is a hexadecimal integer defined by RGB, without the # sign, such as 0xFFB6C1 for light pink.
   * The default value is 0xFFFFFF, which signifies white. The value range is [0x000000,0xffffff]. If the value is invalid, the SDK replaces the original background image with a white background image.
   *
   * **Note**
   * This parameter takes effect only when the type of the custom background image is `Color`.
   */

  /**
   * The local absolute path of the custom background image. PNG and JPG formats are supported.
   * If the path is invalid, the SDK replaces the original background image with a white background image.
   *
   * **Note**
   * This parameter takes effect only when the type of the custom background image is `Img`.
   */

  /**
   * The degree of blurring applied to the custom background image. See [`VirtualBackgroundBlurDegree`]{@link VirtualBackgroundBlurDegree}.
   *
   * **Since** v3.5.2
   */
  constructor(params) {
    _defineProperty(this, "backgroundSourceType", void 0);

    _defineProperty(this, "color", void 0);

    _defineProperty(this, "source", void 0);

    _defineProperty(this, "blur_degree", void 0);

    if (params) {
      this.backgroundSourceType = params.backgroundSourceType;
      this.color = params.color;
      this.source = params.source;
      this.blur_degree = params.blur_degree;
    }
  }

}
/**
 * The information of an audio file, which is reported in [`RequestAudioFileInfo`]{@link RequestAudioFileInfo}.
 *
 * @since v3.5.2
 */

/**
 * The configuration of the audio call loop test.
 *
 * @since v3.5.2
 */
export class EchoTestConfiguration {
  /**
   * Whether to enable the audio device for the call loop test:
   * - true: (Default) Enables the audio device. To test the audio device, set this parameter as `true`.
   * - false: Disables the audio device.
   */

  /**
   * Reversed for future use.
   */

  /**
   * The token used to secure the audio call loop test. If you do not enable App Certificate in Agora
   * Console, you do not need to pass a value in this parameter; if you have enabled App Certificate in Agora Console,
   * you must pass a token in this parameter, the `uid` used when you generate the token must be 0xFFFFFFFF, and the
   * channel name used must be the channel name that identifies each audio loop tested. For server-side
   * token generation, see [Authenticate Your Users with Tokens](https://docs.agora.io/en/Interactive%20Broadcast/token_server?platform=All%20Platforms).
   */

  /**
   * The channel name that identifies each audio call loop. To ensure proper loop test functionality, the
   * channel name passed in to identify each loop test cannot be the same when users of the same project (App ID)
   * perform audio call loop tests on different devices.
   */
  constructor(params) {
    _defineProperty(this, "enableAudio", void 0);

    _defineProperty(this, "enableVideo", void 0);

    _defineProperty(this, "token", void 0);

    _defineProperty(this, "channelId", void 0);

    if (params) {
      this.enableAudio = params.enableAudio;
      this.enableVideo = params.enableVideo;
      this.token = params.token;
      this.channelId = params.channelId;
    }
  }

}
/**
 * Configurations for the local audio and video recording.
 *
 * @since v3.6.2
 */

export class MediaRecorderConfiguration {
  /**
   * The absolute path (including the filename extensions) for the recording file.
   * For example:
   * - Android: `/storage/emulated/0/Android/data/<package name>/files/example.mp4`
   * - iOS: `/App Sandbox/Library/Caches/example.mp4`
   *
   * **Note**
   * Ensure that the specified path exists and is writable.
   */

  /**
   * The format of the recording file. The SDK currently supports only `1`, which is MP4 format.
   */

  /**
   * The recording content:
   * - `0x1`: Only audio.
   * - `0x2`: Only video.
   * - `0x3`: (Default) Audio and video.
   */

  /**
   * The maximum recording duration, in milliseconds. The default value is `120000`.
   */

  /**
   * The interval (ms) of updating the recording information.
   * The value range is [1000,10000]. Based on the set value of `recorderInfoUpdateInterval`,
   * the SDK triggers the [`RecorderInfoUpdated`]{@link RtcEngineEvents.RecorderInfoUpdated} callback to report the updated recording information.
   */
  constructor(storagePath, containerFormat, streamType, maxDurationMs, recorderInfoUpdateInterval) {
    _defineProperty(this, "storagePath", void 0);

    _defineProperty(this, "containerFormat", void 0);

    _defineProperty(this, "streamType", void 0);

    _defineProperty(this, "maxDurationMs", void 0);

    _defineProperty(this, "recorderInfoUpdateInterval", void 0);

    this.storagePath = storagePath;
    this.containerFormat = containerFormat;
    this.streamType = streamType;
    this.maxDurationMs = maxDurationMs;
    this.recorderInfoUpdateInterval = recorderInfoUpdateInterval;
  }

}
/**
 * @ignore For future use
 */

export class ContentInspectModule {
  constructor() {
    _defineProperty(this, "type", void 0);

    _defineProperty(this, "interval", void 0);
  }

}
/**
 * @ignore For future use
 */

export class ContentInspectConfig {
  constructor() {
    _defineProperty(this, "extraInfo", void 0);

    _defineProperty(this, "modules", void 0);

    _defineProperty(this, "moduleCount", void 0);
  }

}
/**
 * @ignore For future use
 */

export class LocalAccessPointConfiguration {
  constructor() {
    _defineProperty(this, "ipList", void 0);

    _defineProperty(this, "domainList", void 0);

    _defineProperty(this, "verifyDomainName", void 0);

    _defineProperty(this, "mode", void 0);
  }

}
/**
 * The video noise reduction options.
 *
 * @since v3.6.2
 */

export class VideoDenoiserOptions {
  constructor() {
    _defineProperty(this, "denoiserMode", void 0);

    _defineProperty(this, "denoiserLevel", void 0);
  }

}
/**
 * The low-light enhancement options.
 *
 * @since v3.6.2
 */

export class LowLightEnhanceOptions {
  constructor() {
    _defineProperty(this, "lowlightEnhanceMode", void 0);

    _defineProperty(this, "lowlightEnhanceLevel", void 0);
  }

}
/**
 * The color enhancement options.
 *
 * @since v3.6.2
 */

export class ColorEnhanceOptions {
  constructor() {
    _defineProperty(this, "strengthLevel", void 0);

    _defineProperty(this, "skinProtectLevel", void 0);
  }

}
/**
 * Information for the recording file.
 *
 * @since v3.6.2
 */

/**
 * The configuration of the screen sharing.
 *
 * @since v3.7.0
 */
export class ScreenCaptureParameters {
  constructor() {
    _defineProperty(this, "captureAudio", void 0);

    _defineProperty(this, "audioParams", void 0);

    _defineProperty(this, "captureVideo", void 0);

    _defineProperty(this, "videoParams", void 0);
  }

}
/**
 * The video configuration for the shared screen stream.
 *
 * Only available for scenarios where `captureVideo` is `true`.
 *
 * @since v3.7.0
 */

export class ScreenVideoParameters {
  constructor() {
    _defineProperty(this, "bitrate", void 0);

    _defineProperty(this, "frameRate", void 0);

    _defineProperty(this, "dimensions", void 0);

    _defineProperty(this, "contentHint", void 0);
  }

}
/**
 * The audio configuration for the shared screen stream.
 *
 * Only available for scenarios where `captureAudio` is `true`.
 *
 * @since v3.7.0
 */

export class ScreenAudioParameters {
  constructor() {
    _defineProperty(this, "sampleRate", void 0);

    _defineProperty(this, "channels", void 0);

    _defineProperty(this, "captureSignalVolume", void 0);

    _defineProperty(this, "allowCaptureCurrentApp", void 0);
  }

}
/**
 * @ignore Contact support@agora.io.
 *
 * @since v3.7.0
 */

export class SpatialAudioParams {
  constructor() {
    _defineProperty(this, "speaker_azimuth", void 0);

    _defineProperty(this, "speaker_elevation", void 0);

    _defineProperty(this, "speaker_distance", void 0);

    _defineProperty(this, "speaker_orientation", void 0);

    _defineProperty(this, "enable_blur", void 0);

    _defineProperty(this, "enable_air_absorb", void 0);
  }

}
//# sourceMappingURL=Classes.js.map