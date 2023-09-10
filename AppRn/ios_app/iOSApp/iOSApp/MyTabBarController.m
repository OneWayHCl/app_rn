//
//  MyTabBarController.m
//  iOSApp
//
//  Created by apple on 2022/1/10.
//

#import "MyTabBarController.h"
#import <iOSConnect/iOSConnect.h>
#import <LHPerformanceStatusBar/LHPerformanceMonitorService.h>

@interface MyTabBarController ()

@end

@implementation MyTabBarController

- (instancetype)init
{
    if (self = [super init]) {
        self.viewControllers = [self controllers];
    }
    return self;
}

- (void)viewDidLoad {
    [super viewDidLoad];

    self.tabBar.translucent = NO;
    self.tabBar.unselectedItemTintColor = [UIColor yellowColor];
    self.tabBar.tintColor = [UIColor redColor];
    self.tabBar.barTintColor = [UIColor orangeColor];
    self.tabBar.backgroundColor = [UIColor orangeColor];
    
    if (@available(iOS 15.0, *)) {
        UITabBarAppearance *appearance = [[UITabBarAppearance alloc] init];
        [appearance configureWithOpaqueBackground];
        appearance.backgroundColor = [UIColor orangeColor];
        self.tabBar.standardAppearance = appearance;
        self.tabBar.scrollEdgeAppearance = appearance;
    }

//    CGFloat width = [UIScreen mainScreen].bounds.size.width;
//    [self.tabBar setBackgroundImage:[UIImage new]];
//    [self.tabBar setShadowImage:[self imageWithColor:[UIColor blueColor] size:CGSizeMake(width, 1)]];
}

- (UIImage *)imageWithColor:(UIColor *)color size:(CGSize)size
{
    if (!color || size.width <= 0 || size.height <= 0) {
        return nil;
    }
    CGRect rect = CGRectMake(0.0f, 0.0f, size.width, size.height);
    UIGraphicsBeginImageContextWithOptions(rect.size, NO, 0);
    CGContextRef context = UIGraphicsGetCurrentContext();
    CGContextSetFillColorWithColor(context, color.CGColor);
    CGContextFillRect(context, rect);
    UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    return image;
}

- (NSArray *)controllers
{
    UIViewController<HomeProtocol> *homeVc = [[ModuleStore sharedStore] instanceWithProtocol:@protocol(HomeProtocol)];
    UIImage *homeImage = [[UIImage imageNamed:@"a02_01_shouy1"] imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
    homeVc.tabBarItem.image = homeImage;
    UIImage *homeSelectedImage = [[UIImage imageNamed:@"a02_01_shouy2"] imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
    homeVc.tabBarItem.selectedImage = homeSelectedImage;
    UINavigationController *homeNav = [[UINavigationController alloc] initWithRootViewController:homeVc];

    UIViewController<MineProtocol> *mineVc = [[ModuleStore sharedStore] instanceWithProtocol:NSProtocolFromString(@"MineProtocol")];
    UIImage *myImage = [[UIImage imageNamed:@"a02_01_wod1"] imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
    mineVc.tabBarItem.image = myImage;
    UIImage *mySelectedImage = [[UIImage imageNamed:@"a02_01_wod2"] imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
    mineVc.tabBarItem.selectedImage = mySelectedImage;
    UINavigationController *mineNav = [[UINavigationController alloc] initWithRootViewController:mineVc];
    
    UIViewController<OtherProtocol> *homeVc2 = [[ModuleStore sharedStore] instanceWithProtocol:@protocol(OtherProtocol)];
    UIImage *homeImage2 = [[UIImage imageNamed:@"a02_01_shouy1"] imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
    homeVc2.tabBarItem.image = homeImage2;
    UIImage *homeSelectedImage2 = [[UIImage imageNamed:@"a02_01_shouy2"] imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
    homeVc2.tabBarItem.selectedImage = homeSelectedImage2;
    UINavigationController *homeNav2 = [[UINavigationController alloc] initWithRootViewController:homeVc2];
    
    UIViewController<DemoProtocol> *demoVc = [[ModuleStore sharedStore] instanceWithProtocol:NSProtocolFromString(@"DemoProtocol")];
    UIImage *demoImage = [[UIImage imageNamed:@"a02_01_wod1"] imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
    demoVc.tabBarItem.image = demoImage;
    UIImage *demoSelectedImage = [[UIImage imageNamed:@"a02_01_wod2"] imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
    demoVc.tabBarItem.selectedImage = demoSelectedImage;
    UINavigationController *demoNav = [[UINavigationController alloc] initWithRootViewController:demoVc];
    
    return @[homeNav, mineNav, homeNav2, demoNav];
}

- (void)tabBar:(UITabBar *)tabBar didSelectItem:(UITabBarItem *)item atIndex:(NSInteger)index
{
    self.selectedIndex = index;
}

- (void)changeSelectedIndex:(NSInteger)index popToRoot:(BOOL)pop
{
    NSInteger count = self.viewControllers.count;
    if (index < count) {
        if (pop) {
            UIViewController *controller = [self.viewControllers objectAtIndex:index];
            if ([controller isKindOfClass:[UINavigationController class]]) {
                UINavigationController *nav = (UINavigationController *)controller;
                [nav popToRootViewControllerAnimated:NO];
            }
        }
        self.selectedIndex = index;
    }
}
@end
