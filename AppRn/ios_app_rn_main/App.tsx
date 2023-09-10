import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
// import PageOneScreen from './study/pages/PageOne';
// import PageTwoScreen from './study/pages/PageTwo';
// import PageThreeScreen from './study/pages/PageThree';
// import PageFourScreen from './study/pages/PageFour';
// import PageFiveScreen from './study/pages/PageFive';
// import DetailPageScreen from './study/sub_pages/DetailPage';
import DetailPageScreen from './src/sub_pages/DetailPage';
import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import HomePage from './src/HomePage';
import ContactPage from './src/ContactPage';
import DiscoverPage from './src/DiscoverPage';
import MinePage from './src/MinePage';
import ChatDetailPage from './src/HomePage/ChatPage';
import PageThreeScreen from './src/page/PageThree';
import PageFourScreen from './src/page/PageFour';

const BottomTab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

const { width, height } = Dimensions.get('window');

const BottomTabNav = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let sourceRequire = require('./src/img/chats.png');
          let itemName = '微信';
        if (route.name === '微信') {
            sourceRequire = focused ? require('./src/img/chats_h.png') : require('./src/img/chats.png');
            itemName = '微信';
          } else if (route.name === '通讯录') {
            sourceRequire = focused ? require('./src/img/contacts_h.png') : require('./src/img/contacts.png');
            itemName = '通讯录';
          }  else if (route.name === '发现') {
            sourceRequire = focused ? require('./src/img/discover_h.png') : require('./src/img/discover.png');
            itemName = '发现';
          }  else if (route.name === '我的') {
            sourceRequire = focused ? require('./src/img/mine_h.png') : require('./src/img/mine.png');
            itemName = '我的';
          } 

          // You can return any component that you like here!
          // return <Ionicons name={iconName} size={size} color={color} />;
          return <View style={{ alignItems: 'center', paddingTop: 1, width: (width - 50)/5, height: 49 }}>
            <Image source={sourceRequire} style={{ position: 'absolute', top: 6, width: 25, height: 25, resizeMode: 'center' }} />
            <Text style={{ position: 'absolute', top: 32, width: (width - 50)/5, height: 18, textAlign: 'center', fontSize: 11, fontWeight: '500', color: color }} >{itemName}</Text>
            </View>
        },
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: '#555',
      })}
    >
      <BottomTab.Screen name='微信' component={HomePage} />
      <BottomTab.Screen name='通讯录' component={ContactPage} />
      <BottomTab.Screen name='发现' component={DiscoverPage} />
      <BottomTab.Screen name='我的' component={MinePage} />
    </BottomTab.Navigator>
  );
}

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      {/* <RootStack.Navigator>
        <RootStack.Screen name='HomeScreen' component={HomeScreen}></RootStack.Screen>
      </RootStack.Navigator> */}
      <RootStack.Navigator initialRouteName={'BottomTabNav'} screenOptions={{
        headerShown: false,
        fullScreenGestureEnabled: true
      }}>
        <RootStack.Screen name='BottomTabNav' component={BottomTabNav} />
        <RootStack.Screen name='DetailPage' component={DetailPageScreen} />
        <RootStack.Screen name='ChatDetailPage' component={ChatDetailPage} />
        <RootStack.Screen name='PageThree' component={PageThreeScreen} />
        <RootStack.Screen name='PageFour' component={PageFourScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

