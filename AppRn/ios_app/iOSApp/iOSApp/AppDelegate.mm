//
//  AppDelegate.m
//  iOSApp
//
//  Created by apple on 2022/1/10.
//

#import "AppDelegate.h"
#import "MyTabBarController.h"
#import <iOSConnect/iOSConnect.h>
#import <iOSApp-Swift.h>
#import "iOSApp-Swift.h"
#import "JPFPSStatus.h"

@interface AppDelegate ()

@end

@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    
    NSString *path = [[NSBundle mainBundle] pathForResource:@"moduleList" ofType:@"plist"];
    NSArray *modules = [NSArray arrayWithContentsOfFile:path];
    [ModuleManager registerModuleWithClassNames:modules];
    [[ModuleManager shareManager] registStore:[ModuleStore sharedStore]];
    [[ModuleManager shareManager] application:application didFinishLaunchingWithOptions:launchOptions];
    
    self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    self.window.backgroundColor = [UIColor whiteColor];
    
    MyTabBarController *tabbarVC = [MyTabBarController new];
    self.window.rootViewController = tabbarVC;

    [self.window makeKeyAndVisible];
    
#if defined(DEBUG)||defined(_DEBUG)
    [[JPFPSStatus sharedInstance] open];
#endif
    
#if defined(DEBUG)||defined(_DEBUG)
    [[JPFPSStatus sharedInstance] openWithHandler:^(NSInteger fpsValue) {
//        NSLog(@"fpsvalue %@",@(fpsValue));
    }];
#endif
    return YES;
}

@end
