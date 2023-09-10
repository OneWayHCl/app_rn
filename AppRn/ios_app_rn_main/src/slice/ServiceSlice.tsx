import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ServiceDetails, ServiceDetailIcons, ServiceBanners, Response, ServiceIcons } from '../model/serviceModel';

// https://msec.opposhop.cn/configs/v1/serviceIcons 
// https://msec.opposhop.cn/configs/v1/banners/010408
// 获取优惠券列表接口
export const getServiceIcons = createAsyncThunk(
  'serviceSlice/getServiceIcons',
  async (param, thunkAPI) => {
    try {
      var url =
        'https://msec.opposhop.cn/configs/v1/serviceIcons';
      console.log(url);
      let response = await fetch(url, {
        method: 'GET',
        headers: {
          // Accept: 'application/json',
          'Content-Type': 'application/json',
          // TOKENSID:
          //   'TOKEN_eyJhbGciOiJFQ0RTQSIsInYiOiIxIn0.eyJleHAiOjE2NjgxNzA4NTUyODEsImlkIjoiODYwMDQ3ODIwIiwiaWRjIjoic2hvdW1pbmciLCJ0aWQiOiIxYVFsMlJFQy9mb0tpU29PRHJIZi9pMnBEMkdVQlB6a2VFZERkUWJqMHhYTFMzbjB4QkRBZmtpdUl2ME0zdVg3T3JYT1IyV2RESDJZUzZqeDUraUU4Q3hGbWQ3M0t2Q2duWFVtNUdOUHdPdz0ifQ.MEUCIDl6UtwnCpX0FqLCDzxDQ4gUkZsoRJkGgILmG52lJJPaAiEA8xinKPnVvnq8wVHKqMxhWXG2X86yxWm4I1XYGAzjwHg',
        },
      });
      let jsonData = await response.json();
      return thunkAPI.fulfillWithValue(jsonData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getBanners = createAsyncThunk(
  'serviceSlice/getBanners',
  async (param, thunkAPI) => {
    try {
      var url =
        'https://msec.opposhop.cn/configs/v1/banners/010408';
      console.log(url);
      let response = await fetch(url, {
        method: 'GET',
        headers: {
          // Accept: 'application/json',
          'Content-Type': 'application/json',
          // TOKENSID:
          //   'TOKEN_eyJhbGciOiJFQ0RTQSIsInYiOiIxIn0.eyJleHAiOjE2NjgxNzA4NTUyODEsImlkIjoiODYwMDQ3ODIwIiwiaWRjIjoic2hvdW1pbmciLCJ0aWQiOiIxYVFsMlJFQy9mb0tpU29PRHJIZi9pMnBEMkdVQlB6a2VFZERkUWJqMHhYTFMzbjB4QkRBZmtpdUl2ME0zdVg3T3JYT1IyV2RESDJZUzZqeDUraUU4Q3hGbWQ3M0t2Q2duWFVtNUdOUHdPdz0ifQ.MEUCIDl6UtwnCpX0FqLCDzxDQ4gUkZsoRJkGgILmG52lJJPaAiEA8xinKPnVvnq8wVHKqMxhWXG2X86yxWm4I1XYGAzjwHg',
        },
      });
      let jsonData = await response.json();
      return thunkAPI.fulfillWithValue(jsonData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// 服务数据
interface myServiceStateTypes {
    selectIndex: number; // 顶部segment选中index，默认为0，选中第一个
    loading: boolean; //是否显示loading，默认显示
    brandDetails: ServiceDetails[];
    newsBanners: ServiceBanners[];
  }

  const icon00: ServiceDetailIcons = {
    id: 83,
    title: "以旧换新测试链接",
    url: "https://dsfs.oppo.com/archives/202205/testing2_202205091105316278896f288eb.png?_w_=132&_h_=132",
    link: "https://yihuan-test.wanyol.com/static/index.html#/?channelId=100010"
  }

  const icon01: ServiceDetailIcons = {
    id: 51,
    title: "维修服务",
    url: "https://dsfs.oppo.com/archives/202203/testing_20220301100349621d8211aa349.png?_w_=387&_h_=137",
    link: "https://hd.oppo.com/act/m/2019/service/index.html?us=service&is_simple=1"
}

  

  const icon10: ServiceDetailIcons = {
    id: 383,
    title: "在线客服",
    url: "https://dsfs.oppo.com/archives/202112/testing_2021122403125761c5715571b2c.png?_w_=132&_h_=132",
    link: "https://oppo.soboten.com/chat/h5/v2/index.html?sysnum=e9a42cb03e7249beaae30bfb81922088&channelid=2"
}

const icon11: ServiceDetailIcons = {
    id: 384,
    title: "服务网点",
    url: "https://dsfs.oppo.com/archives/202112/testing_2021122403122761c571732156e.png?_w_=132&_h_=132",
    link: "oppostore://www.opposhop.cn/app/store/goodslist?code=010500&title=原生列表页面"
}

const serviceIcons0: ServiceIcons = {
  details: [icon01, icon00,icon10, icon11, icon10, icon11]
}

const details0: ServiceDetails = {
  index: 0,
  name: 'OPPO',
  brand: 'OPPO',
  icons: serviceIcons0
}

const serviceIcons1: ServiceIcons = {
  details: [icon10, icon11, icon00, icon01]
}
  const details1: ServiceDetails = {
    index: 1,
    name: '其他',
    brand: '其他',
    icons: serviceIcons1
}

  const banner0: ServiceDetailIcons = {
    id: 6,
    url: "https://dsfs.oppo.com/archives/202203/testing_20220301100349621d8211aa349.png?_w_=387&_h_=137",
    link: "https://drp-test.wanyol.com/marketing-h5/#/apptService/protectiveFilm/home?apptServiceId=129&apptLoginType=3",
    title: "预约贴膜",
  }

  const banner1: ServiceDetailIcons = {
    id: 7,
    url: "https://dsfs.oppo.com/archives/202102/testing2_2021020903023960223713341f7.png?_w_=984&_h_=350",
    link: "https://hd.oppo.com/act/m/2020/huabeifenqi/index.html",
    title: "花呗分期",
}

  // 所有状态的初始值
  const initialState: myServiceStateTypes = {
    selectIndex: -1,
    loading: true,
    brandDetails: [],
    newsBanners: [],
  };

// 创建服务页slice(action + reducer)
const serviceSlice = createSlice({
    name: 'serviceSlice',
    initialState: initialState,
    reducers: {
      changeSelectIndex: (state, action: PayloadAction<number>) => {
        // console.log(action.payload);
        state.selectIndex = action.payload;
      },
    },
    extraReducers(builder) {
      // 获取优惠券列表结果
      builder
        .addCase(getServiceIcons.pending, () => {
          // 加载之前
          // state.loading = true;
          // Loading.show();
          console.log('加载之前');
        })
        .addCase(getServiceIcons.fulfilled, (state, action) => {
          console.log('加载接口成功0');
          // 接口成功
          const jsonData = action.payload;
          // console.log(JSON.stringify(jsonData));
          // Loading.hidden();
          state.loading = false;
  
          const response: Response<ServiceDetails[]> = JSON.parse(
            JSON.stringify(jsonData),
          );
            
          // console.log(jsonData);
          if (response.meta.code !== 200) {
            // Toast.showError(response.errorMessage);
            console.log('加载接口失败');
          } else {
            console.log('加载接口成功');
            console.log(response.details);
            // Toast.showSuccess('加载成功');
            state.brandDetails = response.details;
            state.selectIndex = 0;
          }
        })
        .addCase(getServiceIcons.rejected, (state, action) => {
          console.log('加载接口失败');
          // 接口失败
          const error = action.payload;
          console.log(error);
          // Loading.hidden();
          state.loading = false;
  
          // Toast.showError('网络错误');
        });

        builder
        .addCase(getBanners.pending, () => {
          // 加载之前
          // state.loading = true;
          // Loading.show();
        })
        .addCase(getBanners.fulfilled, (state, action) => {
          // 接口成功
          const jsonData = action.payload;
          // console.log(JSON.stringify(jsonData));
          // Loading.hidden();
          state.loading = false;
  
          const response: Response<ServiceDetailIcons[]> = JSON.parse(
            JSON.stringify(jsonData),
          );
  
          if (response.meta.code !== 200) {
            // Toast.showError(response.errorMessage);
          } else {
            // Toast.showSuccess('加载成功');
            state.newsBanners = response.details;
          
          }
        })
        .addCase(getBanners.rejected, (state, action) => {
          // 接口失败
          const error = action.payload;
          console.log(error);
          // Loading.hidden();
          state.loading = false;
  
          // Toast.showError('网络错误');
        });
    },
  });
  
  export const { changeSelectIndex } = serviceSlice.actions;
  export const serviceReducer = serviceSlice.reducer;

// function dispatch(arg0: {
//   payload: number; // Accept: 'application/json',
//   // Accept: 'application/json',
//   type: string;
// }) {
//   throw new Error('Function not implemented.');
// }
