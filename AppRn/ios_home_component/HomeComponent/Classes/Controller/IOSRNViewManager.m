//
//  IOSRNViewManager.m
//  HomeComponent
//
//  Created by hcl on 2023/9/6.
//

#import "IOSRNViewManager.h"
#import "IOSRNView.h"

#import <React/RCTUIManager.h>

@implementation IOSRNViewManager

RCT_EXPORT_MODULE()

- (UIView *)view {
  return [IOSRNView new];
}

//RN传入的属性参数
RCT_EXPORT_VIEW_PROPERTY(params, NSDictionary)

//RN监听值改变的方法
RCT_EXPORT_VIEW_PROPERTY(onStatusChanged, RCTDirectEventBlock)

//RN侧主动调用 该组件的方法 原生侧最终触发实现
RCT_EXPORT_METHOD(doSomething : (nonnull NSNumber *)viewTag withMessage:(NSString *)message)
{
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
    UIView *view = viewRegistry[viewTag];

    if ([view conformsToProtocol:@protocol(IOSRNViewProtocol)]) {
      [(id<IOSRNViewProtocol>)view doSomething:message];
    } else {
      RCTLogError(@"view must conform to protocol IOSRNViewProtocol");
    }
  }];
}

@end
