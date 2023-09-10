import {configureStore} from '@reduxjs/toolkit';

// 要添加的所有业务模块reducer
import { myReducer } from '../slice/mySlice';
import { serviceReducer } from '../slice/ServiceSlice';

// 全局redux store，整个APP只需要一个store，在之类添加各种业务模块的Reducer
const store = configureStore({
  reducer: {
    coupon: myReducer,
    // 添加其他reducer
    serviceCoupon: serviceReducer
  },
});

export default store;

// 用来解决TS中的类型错误
// 我们使用 ReturnType 和 typeof 来获得全局 state 的类型，供其他组件调用的使用使用
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;