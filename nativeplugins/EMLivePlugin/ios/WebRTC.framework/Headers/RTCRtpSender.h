/*
 *  Copyright 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree. An additional intellectual property rights grant can be found
 *  in the file PATENTS.  All contributing project authors may
 *  be found in the AUTHORS file in the root of the source tree.
 */

#import <Foundation/Foundation.h>

#import "RTCDtmfSender.h"
#import "RTCMacros.h"
#import "RTCMediaStreamTrack.h"
#import "RTCRtpParameters.h"

NS_ASSUME_NONNULL_BEGIN

@class RTCRtpSender;
RTC_OBJC_EXPORT
@protocol RTCRtpSendDelegate <NSObject>
// Called when the first RTP packet is sended.
- (void)rtpSender:(RTCRtpSender *)rtpSender
    didSendFirstPacketForMediaType:(RTCRtpMediaType)mediaType;

@end


RTC_OBJC_EXPORT
@protocol RTCRtpSender <NSObject>

/** A unique identifier for this sender. */
@property(nonatomic, readonly) NSString *senderId;

/** The currently active RTCRtpParameters, as defined in
 *  https://www.w3.org/TR/webrtc/#idl-def-RTCRtpParameters.
 */
@property(nonatomic, copy) RTCRtpParameters *parameters;

/** The RTCMediaStreamTrack associated with the sender.
 *  Note: reading this property returns a new instance of
 *  RTCMediaStreamTrack. Use isEqual: instead of == to compare
 *  RTCMediaStreamTrack instances.
 */
@property(nonatomic, copy, nullable) RTCMediaStreamTrack *track;

/** The RTCDtmfSender accociated with the RTP sender. */
@property(nonatomic, readonly, nullable) id<RTCDtmfSender> dtmfSender;

/** The delegate of RTCRtpSender */
@property(nonatomic, weak) id<RTCRtpSendDelegate> delegate;

/** Add moniotr of first packet sended */
- (void)setObserver;

/** Remove moniotr of first packet sended */
- (void)clearObserver;

@end

RTC_OBJC_EXPORT
@interface RTCRtpSender : NSObject <RTCRtpSender>

- (instancetype)init NS_UNAVAILABLE;

@end

NS_ASSUME_NONNULL_END
