//
//  HomeProtocol.h
//  HomeComponent
//
//  Created by apple on 2022/1/12.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol HomeProtocol<NSObject>

@property (copy, nonatomic) NSString *home;

@end

@protocol HomeDetailProtocol <NSObject>

@property (nonatomic, copy) NSString *detail;

@end

NS_ASSUME_NONNULL_END
