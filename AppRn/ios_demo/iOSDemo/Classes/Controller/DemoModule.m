//
//  DemoModule.m
//  iOSConnect
//
//  Created by hcl on 2022/9/4.
//

#import "DemoModule.h"
#import "DemoController.h"
#import <iOSConnect/ModuleStore.h>

@implementation DemoModule

- (void)module:(BaseModule *)module registStore:(ModuleStore *)store
{
    [store registProtocol:NSProtocolFromString(@"DemoProtocol") withBlock:^id _Nonnull{
        DemoController *vc = [DemoController new];
        return vc;
    }];
}

@end
