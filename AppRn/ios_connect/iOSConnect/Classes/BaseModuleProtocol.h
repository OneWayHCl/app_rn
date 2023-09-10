//
//  BaseModuleProtocol.h
//  iOSConnect
//
//  Created by apple on 2022/1/12.
//

#import <Foundation/Foundation.h>

@class BaseModule;
@class ModuleStore;

NS_ASSUME_NONNULL_BEGIN

@protocol BaseModuleProtocol<NSObject>

- (void)module:(nullable BaseModule *)module registStore:(nullable ModuleStore *)store;

- (void)module:(nullable BaseModule *)module didFinishLaunchingWithOptions:(NSDictionary *)launchOptions;

@end

NS_ASSUME_NONNULL_END
