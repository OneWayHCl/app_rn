/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

  import React, { useEffect, type PropsWithChildren } from 'react';
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
   NavigatorIOS
 } from 'react-native';
//  import { Avatar, ListItem } from 'react-native-elements';
 
 import {
   Colors,
   DebugInstructions,
   Header,
   LearnMoreLinks,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
 
 import { useSelector, useDispatch } from 'react-redux';
 import { RootState, AppDispatch } from '../redux/reduxStore';
 
 import { changeSelectIndex, getBanners, getServiceIcons } from '../slice/ServiceSlice';
 import BrandTabCell from './BrandTabCell';
 import BrandIconCell from './BrandIconCell';
 import { ServiceDetailIcons, ServiceDetails } from '../model/serviceModel';
 import NewsInfoCell from './NewsInfoCell';
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 
 // 获取屏幕高度和宽度
 const { width, height } = Dimensions.get('window');
 
 // useEffect(() => {
 //   // 首次渲染，或者segmentIndex，categoryIndex状态发生变化，请求优惠券列表接口
 //   dispatch(
 //     getCouponList({
 //       segmentIndex: state.segmentIndex,
 //       categoryIndex: state.categoryIndex,
 //     }),
 //   );
 //   // eslint-disable-next-line react-hooks/exhaustive-deps
 // }, [state.segmentIndex, state.categoryIndex]);
 
 const ServicePage = ({route, navigation}) => {
 
   useEffect(() => {
     // 首次渲染
     dispatch(getServiceIcons());
     dispatch(getBanners());
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
 
   const isDarkMode = useColorScheme() === 'dark';
 
   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : '#ffffff',
   };
 
   const state = useSelector((state: RootState) => state.serviceCoupon);
   const dispatch = useDispatch<AppDispatch>();
 
   const tabItemClick = (item: ServiceDetails, index: number) => {
     console.log('tabItemClick-----', item, index);
     dispatch(changeSelectIndex(index));
   }
 
   const iconsItemClick = (item: ServiceDetailIcons, index: number) => {
     console.log('iconsItemClick-----',item, index);
     // dispatch(changeSelectIndex(index));
   }
 
   const newsItemClick = (url: string, index: number) => {
     console.log('newsItemClick-----', url, index);
     // dispatch(changeSelectIndex(index));
   }
 
   const selectIndex = state.selectIndex;
 
   const tabs = state.brandDetails;
 
   const selectIcons = selectIndex >= 0 ? state.brandDetails[selectIndex].icons.details : [];
 
   const newsList = state.newsBanners;
 
   const { itemId, itemName } = route.params;
 
   function DetailsScreen() {
     return (
       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <Text>Details Screen</Text>
       </View>
     );
   }
 
   const ListFooterComponent = (
     <>
       <View style={styles.brandsContainer}>
         <FlatList
           listKey={'1'}
           style={styles.brandsContainer}
           scrollEnabled={false}
           horizontal={true}
           keyExtractor={(item, index) => String(item.index) + String(index)}
           data={tabs}
           renderItem={({ item, index }) => {
             return <TouchableOpacity
               onPress={() => tabItemClick(item, index)}
               style={{}}
             >
               <BrandTabCell data={item} selected={selectIndex == index} />
             </TouchableOpacity>;
           }}
         />
       </View>
 
       <FlatList
         listKey={'2'}
         scrollEnabled={false}
         columnWrapperStyle={styles.iconsFlatListStyle}
         horizontal={false}
         numColumns={4}
         keyExtractor={(item, index) => String(item.id) + String(index)}
         data={selectIcons}
         renderItem={({ item, index }) => {
           return <BrandIconCell data={item} onPress={() => iconsItemClick(item, index)} />;
         }}
       />
 
       <FlatList
         listKey={'3'}
         scrollEnabled={false}
         style={styles.newsFlatListStyle}
         keyExtractor={(item, index) => String(item.id) + String(index)}
         data={newsList}
         renderItem={({ item ,index }) => {
           return <NewsInfoCell data={item} onPress={ (url: string) => newsItemClick(url, index)} />;
         }}
         ListHeaderComponent={
           newsList.length > 0 ?
             <View style={{ height: 52, paddingTop: 8, paddingLeft: 20, justifyContent: 'center' }}>
               <Text style={{ fontWeight: '500', fontSize: 14 }}>服务资讯</Text>
             </View> : null
         }
       />
     </>
   );
 
   const mainPage = (
       <SafeAreaView style={{ flex: 1 , backgroundColor: '#ffffff'}}>
         <StatusBar
           barStyle={!isDarkMode ? 'light-content' : 'dark-content'}
           backgroundColor={backgroundStyle.backgroundColor}
         />
         <View style={styles.navContainer}>
           <Text style={styles.navText}>服务{itemId+itemName}</Text>
           <View style={styles.navRight}><Button title='消息' onPress={
             () => navigation.navigate('App', { 
               itemId: 123,
               itemName: '222App'
             })
           }></Button></View>
         </View>
         <FlatList
           // keyExtractor={(item, index) => String(item) + String(index)}
           data={null}
           renderItem={() => {
             return null;
           }}
           ListFooterComponent={ListFooterComponent}
         />
       </SafeAreaView>
     );
   
 
 
   return mainPage;
 };
 
 
 
 const styles = StyleSheet.create({
   navContainer: {
     backgroundColor: '#ffffff',
     height: 44,
     justifyContent: 'center'
   },
   navText: {
     textAlign: 'center',
     fontSize: 16,
     fontWeight: '500',
   },
   navRight: {
     position: 'absolute',
     height: 44,
     marginRight : 0,
     alignSelf: 'flex-end',
     justifyContent: 'center',
     // backgroundColor: 'red'
   },
   brandsContainer: {
     height: 44,
     paddingLeft: 15,
     backgroundColor: '#ffffff'
   },
   iconsFlatListStyle: {
     flexWrap: 'wrap',
     paddingLeft: 10,
     paddingRight: 10,
     paddingTop: 6,
     width: width,
     backgroundColor: '#ffffff'
   },
   newsFlatListStyle: {
     backgroundColor: '#ffffff'
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
   },
 });
 
 export default ServicePage;
 function dispatch(arg0: any) {
   throw new Error('Function not implemented.');
 }
 
 {/* <View
         style={{
           backgroundColor: isDarkMode ? Colors.black : Colors.white,
         }}>
         <Button
           title="increment+"
           onPress={() => changeAction(2)}
         />
         <Text>{selectIndex}</Text>
 
         <Avatar
           size="large"
           rounded
           source={require('../img/Image_1.png')}
           onPress={() => { }}
           activeOpacity={0.7} />
       </View> */}