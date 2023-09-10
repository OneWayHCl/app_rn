//
//  ModuleStore.h
//  iOSConnect
//
//  Created by apple on 2022/1/12.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

#define ModuleWithProtocol(protocol) [[ModuleStore sharedStore] instanceWithProtocol:protocol];

@interface ModuleStore : NSObject

+ (instancetype)sharedStore;
- (nullable id)instanceWithProtocol:(Protocol *)protocol;
- (void)registProtocol:(Protocol *)protocol withBlock:(id (^)(void))block;

@end

NS_ASSUME_NONNULL_END
