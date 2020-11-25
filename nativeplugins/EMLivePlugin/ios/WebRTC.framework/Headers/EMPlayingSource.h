//
//  EMPlayingSource.h
//  sources
//
//  Created by 杜洁鹏 on 2019/4/29.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol EMPlayingSourceDelegate <NSObject>
@required
- (BOOL)hasStart;
- (size_t)get_samples_per_channel;
- (size_t)get_num_channels;
- (int)get_sample_rate_hz;
- (int)getVolumePercentage;
- (void *)getOriginalDataForPlayout;
- (void *)getOriginalDataForSend;
@end

@interface EMPlayingSource : NSObject

@property (nonatomic, weak) id<EMPlayingSourceDelegate> delegate;

- (instancetype)initWithDelegate:(nullable id<EMPlayingSourceDelegate>)aDelegate;

@end


@protocol EMWebRTCAudioDataDelegate <NSObject>


- (void)localAudioData:(NSData *)aAudioData
                  size:(int)aDataSize
            sampleRate:(int)aSampleRate
               channel:(int)aChannel;

- (void)remoteAudioData:(NSData *)aAudioData
                   size:(int)aDataSize
             sampleRate:(int)aSampleRate
                channel:(int)aChannel;

@end

@interface EMAudioData : NSObject

@property (nonatomic, weak) id<EMWebRTCAudioDataDelegate> delegate;

- (instancetype)initWithDelegate:(nullable id<EMWebRTCAudioDataDelegate>)aDelegate;

@end

NS_ASSUME_NONNULL_END
