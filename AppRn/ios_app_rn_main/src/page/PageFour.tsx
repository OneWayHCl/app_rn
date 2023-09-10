import React, { useEffect, type PropsWithChildren } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  Dimensions,
  NavigatorIOS,
} from "react-native";
import { Avatar, Image, ListItem } from "react-native-elements";

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/reduxStore";

import {
  changeSelectIndex,
  getBanners,
  getServiceIcons,
} from "../slice/ServiceSlice";
import BrandTabCell from "./BrandTabCell";
import BrandIconCell from "./BrandIconCell";
import { ServiceDetailIcons, ServiceDetails } from "../model/serviceModel";
import NewsInfoCell from "./NewsInfoCell";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WaterfallFlow from "react-native-waterfall-flow";

const PageFourScreen = ({ navigation }) => {
  useEffect(() => {
    // 首次渲染
    // dispatch(getServiceIcons());
    // dispatch(getBanners());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : "#ffffff",
  };

  const state = useSelector((state: RootState) => state.serviceCoupon);
  const dispatch = useDispatch<AppDispatch>();

  const tabItemClick = (item: ServiceDetails, index: number) => {
    console.log("tabItemClick-----", item, index);
    dispatch(changeSelectIndex(index));
  };

  const iconsItemClick = (item: ServiceDetailIcons, index: number) => {
    console.log("iconsItemClick-----", item, index);
    // dispatch(changeSelectIndex(index));
  };

  const newsItemClick = (url: string, index: number) => {
    console.log("newsItemClick-----", url, index);
    // dispatch(changeSelectIndex(index));
  };

  const selectIndex = state.selectIndex;

  const tabs = state.brandDetails;

  const selectIcons =
    selectIndex >= 0 ? state.brandDetails[selectIndex].icons.details : [];

  const newsList = state.newsBanners;

  const dataList = [];

  for (let i = 0; i < 100; i++) {
    let obj = { title: 'title' + i }
    dataList.push(obj);
  }

  const mainPage = (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <StatusBar
        barStyle={!isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <WaterfallFlow
        data={dataList}
        numColumns={2}
        // onRefresh={()=>{
        //     console.log('onRefresh--------');
        // }}
        onEndReached={()=>{
            console.log('onEndReached--------');
        }}
        ListHeaderComponent={()=>{
            return <View style={{ height: 100, backgroundColor: 'yellow'}}>
                <Text>ListHeaderComponent</Text>
            </View>
        }}
        ListFooterComponent={()=>{
            return <View style={{ height: 50, backgroundColor: 'orange'}}>
                <Text>ListFooterComponent</Text>
            </View>
        }}
        renderItem={({ item, index, columnIndex }) => {
          return (
            <TouchableOpacity onPress={() => {}}>
              <View style={{
                height: columnIndex === 0 ? 80 : 110,
        //   paddingLeft: columnIndex === 0 ? 12 : 6,
        //   paddingRight: columnIndex === 0 ? 6 : 12,
        //   paddingTop: 3,
        //   paddingBottom: 3,
          borderColor: 'red',
          borderWidth: 1
        }}>
              <Text>title: {item.title}</Text>
              <Text>index: {index}</Text>
              <Text>columnIndex: {columnIndex}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
  return mainPage;
};

export default PageFourScreen;