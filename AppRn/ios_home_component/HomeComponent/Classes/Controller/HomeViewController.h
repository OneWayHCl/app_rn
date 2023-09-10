//
//  HomeViewController.h
//  HomeComponent
//
//  Created by apple on 2022/1/10.
//

#import <UIKit/UIKit.h>
#import <iOSConnect/HomeProtocol.h>

NS_ASSUME_NONNULL_BEGIN

@interface HomeViewController : UITableViewController<HomeProtocol>

@property (copy, nonatomic) NSString *home;

@end

NS_ASSUME_NONNULL_END
