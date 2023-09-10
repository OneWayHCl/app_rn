//
//  ModuleManager.m
//  iOSConnect
//
//  Created by apple on 2022/1/12.
//

#import "ModuleManager.h"
#import "BaseModule.h"
#import "ModuleStore.h"

@interface ModuleManager(){
    NSDictionary<NSString *, BaseModule *> *moduleMap;
    NSArray *modules;
}
@property (assign, nonatomic) BOOL registed;
@end

@implementation ModuleManager
- (instancetype)init
{
    if (self = [super init]) {
        
    }
    return self;
}

- (NSArray<BaseModule *> *)modules
{
    return modules;
}

+ (instancetype)private_shareManager {
    static ModuleManager *instance;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        instance = [[self alloc] init];
    });
    return instance;
}

+ (instancetype)shareManager
{
    ModuleManager *instance = [ModuleManager private_shareManager];
    return instance.registed ? instance : nil;
}

+ (BOOL)registerModuleWithClassNames:(NSArray<NSString *> *)classNames {
    return [[ModuleManager private_shareManager] loadModulesWithClassNames:classNames];
}

- (BOOL)loadModulesWithClassNames:(NSArray<NSString *> *)classNames
{
    if (![classNames isKindOfClass:NSArray.class]) {
        return NO;
    }
    NSMutableDictionary *dict = [NSMutableDictionary dictionary];
    NSMutableArray *array_modules = [NSMutableArray new];
    
    for (NSString *moduleName in classNames) {
        Class cls = NSClassFromString(moduleName);
        if (cls == NULL) {
            NSAssert(NO, @"%@ 不存在", moduleName);
            continue;
        }
        if (![cls isSubclassOfClass:[BaseModule class]]) {
            NSAssert(NO, @"Module %@ 必须是BaseModule子类", moduleName);
            continue;
        }
        id instance = [[cls alloc] init];
        if ([dict objectForKey:moduleName] != nil) {
            NSAssert(NO, @"Module %@ 只能添加一次，不允许重复添加", moduleName);
            continue;
        }
        if (instance == nil) {
            NSAssert(NO, @"Module %@ 创建实例失败", moduleName);
            continue;
        }
        [dict setObject:instance forKey:moduleName];
        [array_modules addObject:instance];
    }
    moduleMap = [NSDictionary dictionaryWithDictionary:dict];
    modules = [NSArray arrayWithArray:array_modules];
    self.registed = YES;
    return YES;
}

- (void)registStore:(ModuleStore *)store
{
    for (BaseModule *module in modules) {
        [module module:module registStore:store];
    }
}

- (void)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    for (BaseModule *module in modules) {
        [module module:module didFinishLaunchingWithOptions:launchOptions];
    }
}

@end
