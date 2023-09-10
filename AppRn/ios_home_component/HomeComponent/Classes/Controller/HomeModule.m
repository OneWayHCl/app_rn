//
//  HomeModule.m
//  HomeComponent
//
//  Created by apple on 2022/1/12.
//

#import "HomeModule.h"
#import "HomeViewController.h"
#import <iOSConnect/ModuleStore.h>

@implementation HomeModule

- (void)module:(BaseModule *)module registStore:(ModuleStore *)store
{
    [store registProtocol:NSProtocolFromString(@"HomeProtocol") withBlock:^id _Nonnull{
        HomeViewController *vc = [HomeViewController new];
        return vc;
    }];
}
@end
