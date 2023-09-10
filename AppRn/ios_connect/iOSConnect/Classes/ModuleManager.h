//
//  ModuleManager.h
//  iOSConnect
//
//  Created by apple on 2022/1/12.
//

#import <Foundation/Foundation.h>

@class BaseModule;
@class ModuleStore;

NS_ASSUME_NONNULL_BEGIN

@interface ModuleManager : NSObject

+ (BOOL)registerModuleWithClassNames:(NSArray<NSString *> *)classNames;

+ (instancetype)shareManager;

@property (strong, nonatomic, readonly) NSArray<BaseModule *> *modules;

- (void)registStore:(ModuleStore *)store;

- (void)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions;

@end

NS_ASSUME_NONNULL_END
