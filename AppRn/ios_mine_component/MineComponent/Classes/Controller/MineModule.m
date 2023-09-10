//
//  MineModule.m
//  MineComponent
//
//  Created by apple on 2022/1/12.
//

#import "MineModule.h"
#import "MineViewController.h"
#import <iOSConnect/ModuleStore.h>

@implementation MineModule

- (void)module:(BaseModule *)module registStore:(ModuleStore *)store
{
    [store registProtocol:NSProtocolFromString(@"MineProtocol") withBlock:^id _Nonnull{
        MineViewController *vc = [MineViewController new];
        return vc;
    }];
}
@end
