//
//  ModuleStore.m
//  iOSConnect
//
//  Created by apple on 2022/1/12.
//

#import "ModuleStore.h"
#import <pthread.h>

@interface ModuleStore(){
    NSMutableDictionary *_protocol_dict;
    pthread_rwlock_t _protocl_safeLock;
}

@end

@implementation ModuleStore

+ (instancetype )sharedStore {
    static ModuleStore *_sharedStore;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        _sharedStore = [[self alloc] init];
    });
    return _sharedStore;
}

- (instancetype)init {
    if (self = [super init]) {
        _protocol_dict = [NSMutableDictionary new];
        pthread_rwlock_init(&_protocl_safeLock, NULL);
    }
    return self;
}

- (void)dealloc
{
    pthread_rwlock_destroy(&_protocl_safeLock);
}

- (void)registProtocol:(Protocol *)protocol withBlock:(id (^)(void))block {
    assert(nil != protocol);
    if (nil == protocol) {
        return;
    }
    
    assert(NULL != block);
    if (NULL == block) {
        return;
    }
    
    pthread_rwlock_wrlock(&_protocl_safeLock);
    if (block) {
        [_protocol_dict setObject:block forKey:NSStringFromProtocol(protocol)];
    }
    pthread_rwlock_unlock(&_protocl_safeLock);
}

- (id)instanceWithProtocol:(Protocol *)protocol
{
    id instance = nil;
    id (^generate_instance)(void) = NULL;
    
    assert(nil != protocol);
    if (nil == protocol) {
        return nil;
    }
    
    pthread_rwlock_rdlock(&_protocl_safeLock);
    generate_instance = [_protocol_dict objectForKey:NSStringFromProtocol(protocol)];
    pthread_rwlock_unlock(&_protocl_safeLock);
    
    if (NULL != generate_instance) {
        instance = generate_instance();
    }
    
    assert(nil == instance || [instance conformsToProtocol:protocol]);
    
    return [instance conformsToProtocol:protocol] ? instance : nil;
}


@end
