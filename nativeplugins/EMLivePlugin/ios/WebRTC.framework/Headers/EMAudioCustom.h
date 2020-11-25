//
//  EMAudioCustom.h
//  sources
//
//  Created by lixiaoming on 2019/11/27.
//

#import <Foundation/Foundation.h>


NS_ASSUME_NONNULL_BEGIN
@protocol EMAudioCustomDelegate <NSObject>

@required
- (void*) getAudioCustomBuffer;
- (bool) isEnabled;
- (int) channels;
- (int) samples;

@end

@interface EMAudioCustom : NSObject
@property (nonatomic, weak) id<EMAudioCustomDelegate> delegate;
+ (instancetype)sharedClient;
- (void*) GetAudioCustomBuffer;
- (bool) IsEnabled;
- (int) GetChannels;
- (int) GetSamples;
@end

NS_ASSUME_NONNULL_END
