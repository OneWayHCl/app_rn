//
//  IOSRNView.h
//  HomeComponent
//
//  Created by hcl on 2023/9/6.
//

#import <UIKit/UIKit.h>
#import <React/RCTComponent.h>

@protocol IOSRNViewProtocol

- (void)doSomething:(NSString *_Nullable)message;

@end

NS_ASSUME_NONNULL_BEGIN

@interface IOSRNView : UIView

@property (strong, nonatomic) NSDictionary *params;

@property (copy, nonatomic) RCTDirectEventBlock onStatusChanged;

@end

NS_ASSUME_NONNULL_END
