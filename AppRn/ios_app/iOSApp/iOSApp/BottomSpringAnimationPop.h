//
//  BottomSpringAnimationPop.h
//
//  Created by 胡聪林 on 2022/6/27.
//

#import <UIKit/UIKit.h>

@interface BottomSpringAnimationPop : NSObject

///初始化
- (instancetype)initWithCustomView:(UIView *)customView;

///显示
- (void)show;

///隐藏
- (void)dismiss;

@end
