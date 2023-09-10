//
//  RNAppCommonBridgeModule.m
//  iOSApp
//
//  Created by hcl on 2022/12/11.
//

#import "RNAppCommonBridgeModule.h"

@implementation RNAppCommonBridgeModule

RCT_EXPORT_MODULE(CommonBridgeModule);

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSString *, getApiHost) {
    return @"";
}

@end
