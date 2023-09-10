//
//  BottomSpringAnimationPop.m
//
//  Created by 胡聪林 on 2022/6/27.
//

#import "BottomSpringAnimationPop.h"
//#import "pop/POP.h"

///上拉超过customView高度比例系数（例：customView高度200，能上拉最高到220）
#define kRatio 0.1

#define kScreenWidth [UIScreen mainScreen].bounds.size.width
#define kScreenHeight [UIScreen mainScreen].bounds.size.height

@interface BottomSpringAnimationPop()<CAAnimationDelegate, UIGestureRecognizerDelegate>

///半透背景
@property (nonatomic, strong) UIView *maskView;

///容器View
@property (nonatomic, strong) UIView *contentView;

///初始坐标
@property (nonatomic, assign) CGPoint myInitLocation;

///回弹动画起点坐标
@property (nonatomic, assign) CGPoint endLocation;

///y坐标差值
@property (nonatomic, assign) CGFloat dValueY;

///传入的自定义View高度
@property (nonatomic, assign) CGFloat customHeight;

///容器View的高度
@property (nonatomic, assign) CGFloat contentHeight;

///传入的自定义View的背景颜色
@property (nonatomic, strong) UIColor *customBackgroundColor;

///上一个拖拽值记录时间
@property (nonatomic, assign) NSTimeInterval lastAddTime;

///拖拽过程的Y坐标值
@property (nonatomic, strong) NSMutableArray *translationYList;

@end

@implementation BottomSpringAnimationPop

#pragma mark - 初始化
- (instancetype)initWithCustomView:(UIView *)customView {
    if (self = [super init]) {
        [self setupSubViewsWithCustomView:customView];
    }
    return self;
}

///显示
- (void)show {
    
    self.maskView.hidden = NO;
    self.contentView.hidden = NO;
    self.contentView.userInteractionEnabled = YES;

    self.contentView.frame = CGRectMake(0, kScreenHeight, kScreenWidth, self.contentHeight);
     
    [UIView animateWithDuration:0.25 animations:^{
         
        self.contentView.frame = CGRectMake(0, kScreenHeight - self.customHeight, kScreenWidth, self.contentHeight);
        self.maskView.alpha = 1.0;
    } completion:^(BOOL finished) {
         
        //弹框显示完成，获取动画所需的初始坐标点
        self.myInitLocation = CGPointMake(CGRectGetMidX(self.contentView.frame), CGRectGetMidY(self.contentView.frame));
    }];
}

///隐藏
- (void)dismiss {
    
    self.contentView.userInteractionEnabled = NO;
     
    [UIView animateWithDuration:0.25 animations:^{
         
        self.contentView.frame = CGRectMake(0, kScreenHeight, kScreenWidth, self.contentHeight);
        self.maskView.alpha = 0;
    } completion:^(BOOL finished) {
         
        self.maskView.hidden = YES;
        self.contentView.hidden = YES;
        self.contentView.userInteractionEnabled = YES;
    }];
}

#pragma mark - Private Function
- (void)setupSubViewsWithCustomView:(UIView *)customView {
    
    //自定义view高度
    _customHeight = CGRectGetHeight(customView.frame);
    
    //容器View高度为：customView高度的1.2倍
    //因为了防止上拉可能出现底部有空隙，因此直接设置为1.2倍高（kRatio为上拉比例系数，值为0.1）
    _contentHeight = self.customHeight * (1 + kRatio * 2);
    
    //初始化y坐标差值为0
    _dValueY = 0;
    
    //蒙层背景
    self.maskView = [[UIView alloc] initWithFrame:[UIScreen mainScreen].bounds];
    self.maskView.backgroundColor = [UIColor colorWithWhite:0 alpha:0.4];
    UITapGestureRecognizer *tap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(handleTapGestures:)];
    [self.maskView addGestureRecognizer:tap];
    [[UIApplication sharedApplication].keyWindow addSubview:self.maskView];
    self.maskView.alpha = 0;
    self.maskView.hidden = YES;
    
    //容器
    CGRect contentFrame = CGRectMake(0, kScreenHeight, kScreenWidth, self.contentHeight);
    self.contentView = [[UIView alloc] initWithFrame:contentFrame];
    self.contentView.userInteractionEnabled = YES;
    self.contentView.layer.cornerRadius = 20;
    self.contentView.layer.masksToBounds = YES;
    [self.maskView addSubview:self.contentView];
    self.contentView.hidden = YES;
    
    //给容器View添加手势
    UIPanGestureRecognizer *pan =  [[UIPanGestureRecognizer alloc]initWithTarget:self action:@selector(handlePanGestures:)];
    [self.contentView addGestureRecognizer:pan];
    
    //设置容器View的背景色和自定义View一样，没有则默认设置为白色
    if (customView.backgroundColor) {
        self.contentView.backgroundColor = customView.backgroundColor;
    } else {
        self.contentView.backgroundColor = [UIColor whiteColor];
    }
    
    //自定义View
    [self.contentView addSubview:customView];
    customView.frame = CGRectMake(0, 0, customView.frame.size.width, customView.frame.size.height);
}

///处理蒙层手势点击
- (void)handleTapGestures:(UITapGestureRecognizer *)paramSender {
    CGPoint location = [paramSender locationInView:self.contentView];
    //点击区域在容器contentView以外，则直接退出弹框。（因容器位于底部，则判断y值小于0即可）
    if (location.y < 0) {
        [self dismiss];
    }
}

///处理容器contentView拖拽手势
- (void)handlePanGestures:(UIPanGestureRecognizer *)paramSender {

    if (paramSender.state == UIGestureRecognizerStateBegan) {
        //拖动开始
        CGPoint beganLocation = [paramSender locationInView:paramSender.view.superview];
        
        //每次拖动开始，计算出这次y坐标差值
        self.dValueY = _myInitLocation.y - beganLocation.y;
        
        //初始化或清空 用于存储y坐标变化的数组
        if (_translationYList == nil) {
            _translationYList = [NSMutableArray new];
        } else {
            [_translationYList removeAllObjects];
        }
    } else if (paramSender.state == UIGestureRecognizerStateChanged) {
        //拖动中
        CGPoint location = [paramSender locationInView:paramSender.view.superview];
        
        //拖动中初步计算出contentView当前需要移动到位置的中心点
        CGPoint myLocation = CGPointMake(_myInitLocation.x, location.y + _dValueY);
        
        //限制拖拽高度：只计算比初始位置高出一个自定义View的高度
        if (myLocation.y > _myInitLocation.y - _customHeight) {
            
            if (myLocation.y > _myInitLocation.y) {
                //拖动在弹框顶部以下范围，跟手改变contentView的位置
                paramSender.view.center = myLocation;
                [self.maskView setNeedsDisplay];
                
                //实时更新终止坐标点
                _endLocation = myLocation;
                
                //拖动处于弹框顶部高度之下时，存储拖动的y坐标值
                CGPoint translation = [paramSender translationInView:paramSender.view];
                
                NSLog(@"-----------%@", NSStringFromCGPoint(_endLocation));
                
                //拖拽点两次时间差大于0.02秒则清空数组
                NSTimeInterval endTime = [NSDate date].timeIntervalSince1970;
                NSLog(@"---last:%f", self.lastAddTime);
                NSLog(@"---end:%f", endTime);
                if (endTime - self.lastAddTime > 0.02) {
                    [_translationYList removeAllObjects];
                }
                //存储拖拽点y坐标值
                [_translationYList addObject:@(translation.y)];
                self.lastAddTime = [NSDate date].timeIntervalSince1970;

            } else {
                //拖动超过弹框顶部，对增量y值按系数进行衰减计算：新y坐标 = 初始y值 + 系数 * y坐标增量值
                CGFloat newY = _myInitLocation.y + kRatio * (myLocation.y - _myInitLocation.y);
                
                CGPoint newLocation = CGPointMake(myLocation.x, newY);
                paramSender.view.center = newLocation;
                [self.maskView setNeedsDisplay];
                
                //实时更新终止坐标点
                _endLocation = newLocation;
            }
        }
        //else {
        // 到这里，则拖拽超过最高高度，contentView不再跟随手势
        //}

    } else if (paramSender.state ==  UIGestureRecognizerStateEnded) {
        //拖动结束
        NSTimeInterval endTime = [NSDate date].timeIntervalSince1970;
        CGPoint translation = [paramSender translationInView:paramSender.view];

        //根据拖拽最后三个Y坐标值判断是否为向下拖动趋势
        BOOL isDownwardTrend = NO;
        if (_translationYList.count > 2) {
            double last0 = [_translationYList.lastObject doubleValue];
            double last1 = [_translationYList[_translationYList.count - 2] doubleValue];
            double last2 = [_translationYList[_translationYList.count - 3] doubleValue];
            if (last0 > last1 && last1 > last2) {
                isDownwardTrend = YES;
            }
        }

        if (isDownwardTrend) {
            //趋势为向下，关闭弹框
            [self dismiss];
        } else {
            CGFloat minY = CGRectGetMinY(self.contentView.frame);
            if ((kScreenHeight - minY) < _customHeight * 0.5) {
                //小于弹框高度一半，关闭弹框
                [self dismiss];
            } else {
                //大于弹框高度一半，回弹显示弹框
                [self popSpringAnimation];
            }
        }
    }

    if (paramSender.state == UIGestureRecognizerStateCancelled ||
        paramSender.state == UIGestureRecognizerStateFailed) {
        //兼容异常情况：若出现取消或失败状态时，收起弹框
        [self dismiss];
    }
}

//回弹动画
- (void)popSpringAnimation {
//    POPSpringAnimation *animation = [POPSpringAnimation animationWithPropertyNamed:kPOPLayerPosition];
//
//    animation.fromValue = [NSValue valueWithCGPoint:_endLocation];
//    animation.toValue = [NSValue valueWithCGPoint:_myInitLocation];
//    animation.delegate = self;
//    //弹力
//    animation.springBounciness = 6;
//    //速度
//    animation.springSpeed = 42;
//    //摩擦力
//    animation.dynamicsFriction = 40;
//
//    self.contentView.center = _myInitLocation;
//    [self.contentView.layer pop_addAnimation:animation forKey:@"Animation"];
//    [self.maskView setNeedsDisplay];
    
    CASpringAnimation *springAnimation = [CASpringAnimation animationWithKeyPath:@"position.y"];
    springAnimation.delegate = self;
    springAnimation.fromValue = @(self.endLocation.y);
    springAnimation.toValue = @(self.myInitLocation.y);
    //弹力：6 速度：42 摩擦力：0.8
    
    //质量，影响图层运动时的弹簧惯性，质量越大，弹簧拉伸和压缩的幅度越大 Defaults to one
//    springAnimation.mass = 1;
    
    //刚度系数(劲度系数/弹性系数)，刚度系数越大，形变产生的力就越大，运动越快 Defaults to 100
    springAnimation.stiffness = 600;//100;
    
    //阻尼系数，阻止弹簧伸缩的系数，阻尼系数越大，停止越快 Defaults to 10
    springAnimation.damping = 80;//10;
    
    //初始速率，动画视图的初始速度大小 Defaults to zero
    //速率为正数时，速度方向与运动方向一致，速率为负数时，速度方向与运动方向相反
    springAnimation.initialVelocity = 42;//10;
    
    //估算时间 返回弹簧动画到停止时的估算时间，根据当前的动画参数估算
    NSLog(@"====%f",springAnimation.settlingDuration);
    springAnimation.duration = springAnimation.settlingDuration;
    
    // removedOnCompletion 默认为YES 为YES时，动画结束后，恢复到原来状态
    springAnimation.removedOnCompletion = NO;
//    springAnimation.fillMode = kCAFillModeForwards;
    
    self.contentView.center = _myInitLocation;
    [self.contentView.layer addAnimation:springAnimation forKey:@"springAnimation"];
    [self.maskView setNeedsDisplay];
}

//#pragma mark - POPAnimationDelegate
//- (void)pop_animationDidStop:(POPAnimation *)anim finished:(BOOL)finished {
//    self.contentView.userInteractionEnabled = YES;
//}
//
//- (void)pop_animationDidStart:(POPAnimation *)anim {
//    self.contentView.userInteractionEnabled = NO;
//}
- (void)animationDidStart:(CAAnimation *)anim {
    self.contentView.userInteractionEnabled = NO;
}

- (void)animationDidStop:(CAAnimation *)anim finished:(BOOL)flag {
    self.contentView.userInteractionEnabled = YES;
}
@end
