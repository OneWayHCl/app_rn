//
//  MineViewController.h
//  MineComponent
//
//  Created by apple on 2022/1/10.
//

#import <UIKit/UIKit.h>
#import <iOSConnect/MineProtocol.h>

NS_ASSUME_NONNULL_BEGIN

@interface MineViewController : UITableViewController<MineProtocol>

@property (copy, nonatomic) NSString *mine;

@end

NS_ASSUME_NONNULL_END
