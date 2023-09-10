import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';


// 优惠券使用的状态state接口定义
interface myListStateTypes {
    segmentIndex: number; // 顶部segment选中index，默认为0，选中第一个
    categoryIndex: number; // 领取状态index，默认为-1，没有选中任何
    loading: boolean; //是否显示loading，默认显示
    segmentTitles: string[];
    categoryTitles: string[];
  }
  
  // 所有状态的初始值
  const initialState: myListStateTypes = {
    segmentIndex: 10,
    categoryIndex: 5,
    loading: true,
    segmentTitles: ['优惠券', '购物卡', '商品兑换券', '回收券'],
    categoryTitles: ['新领取', '快过期', '已使用', '已失效'],
  };

// 创建优惠券slice(action + reducer)
const mySlice = createSlice({
    name: 'myListSlice',
    initialState: initialState,
    reducers: {
      changeValueAdd: (state, action: PayloadAction<number>) => {
        console.log(action.payload);
        state.segmentIndex += action.payload;
      },
      changeValueMus: (state, action: PayloadAction<number>) => {
        state.segmentIndex -= action.payload;
      },
      changeLoading: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
      },
    },
  });
  
  export const {changeValueAdd, changeValueMus, changeLoading} =
    mySlice.actions;
  export const myReducer = mySlice.reducer;