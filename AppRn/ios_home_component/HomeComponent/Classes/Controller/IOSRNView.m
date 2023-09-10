//
//  IOSRNView.m
//  HomeComponent
//
//  Created by hcl on 2023/9/6.
//

#import "IOSRNView.h"

@interface IOSRNView()<IOSRNViewProtocol>

@property (strong, nonatomic) UIButton *button;
@property (strong, nonatomic) UILabel *label;
@property (assign, nonatomic) NSInteger timeValue;

@end

@implementation IOSRNView

- (instancetype)init {
    if (self = [super init]) {
        self.button = [[UIButton alloc] initWithFrame:CGRectMake(10, 20, 350, 20)];
        self.button.backgroundColor = [UIColor darkGrayColor];
        self.button.titleLabel.font = [UIFont systemFontOfSize:12];
        self.button.contentMode = UIViewContentModeLeft;
        [self.button setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
        [self.button addTarget:self action:@selector(buttonAction:) forControlEvents:UIControlEventTouchUpInside];
        [self addSubview:self.button];
        
        self.label = [[UILabel alloc] initWithFrame:CGRectMake(10, 50, 100, 20)];
        self.label.font = [UIFont systemFontOfSize:20];
        self.label.textColor = [UIColor blackColor];
        [self addSubview:self.label];
        
        self.backgroundColor = [UIColor orangeColor];
    }
    return self;
}

- (void)buttonAction:(id)sender {
    NSLog(@"buttonAction");
}

- (void)setParams:(NSDictionary *)params {
    NSLog(@"RN--setParams--to--Native:%@", params);
    
    self.timeValue = 0;
    [self performSelector:@selector(after) withObject:self afterDelay:5.0];
}

- (void)doSomething:(NSString *)message {
    [self.button setTitle:message forState:UIControlStateNormal];
}

- (void)after {
    if (self.timeValue < 5) {
        self.timeValue = 5;
    } else {
        self.timeValue += 5;
    }
    self.backgroundColor = self.timeValue%2 == 1 ? [UIColor redColor] : [UIColor orangeColor];
    self.label.text = [NSString stringWithFormat:@"%ld", self.timeValue];
    if (self.onStatusChanged) {
        self.onStatusChanged(@{@"timeValue": @(self.timeValue)});
    }
    [self performSelector:@selector(after) withObject:self afterDelay:5.0];
}

///点击位置超出父控件，响应事件
- (UIView *)hitTest:(CGPoint)point withEvent:(UIEvent *)event{
    int count = (int)self.subviews.count;
    for (int i=count-1; i>=0; i--) {
        UIView *subView = self.subviews[i];
        //点击事件作用在子控件上面，返回点击点
        CGPoint isPoint = [self convertPoint:point toView:subView];
        UIView *subv = [subView hitTest:isPoint withEvent:event];
        if (subv) {
            return subv;
        }
    }
    return self;
}
@end
