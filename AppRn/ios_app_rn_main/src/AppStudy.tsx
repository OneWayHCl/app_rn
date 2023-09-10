// import * as React from 'react';
// import { Button, View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { IconButton } from 'react-native-paper';
// import { Component } from 'react';
// // import { Image } from 'react-native-elements';
// import { Image } from 'react-native';
// // import CustomToast from './src/page/MyButton';
// // import { Tab } from 'react-native-elements/dist/tab/Tab';

// function SettingsScreen({ navigation }) {
//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//             <Text>Settings Screen</Text>
//             <Button
//                 title="Go to Profile"
//                 onPress={() => navigation.navigate('Profile')}
//             />
//         </View>
//     );
// }

// function ProfileScreen({ navigation }) {
//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//             <Text>Profile Screen</Text>
//             <Button
//                 title="Go to Settings"
//                 onPress={() => navigation.navigate('Settings')}
//             />
//         </View>
//     );
// }

// function HomeScreen({ navigation }) {
//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//             <Text>Home Screen</Text>
//             <Button
//                 title="Go to Details"
//                 onPress={() => navigation.navigate('Details')}
//             />
//         </View>
//     );
// }

// function DetailsScreen({ navigation }) {
//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//             <Text>Details Screen</Text>
//             <Button
//                 title="Go to Details... again"
//                 onPress={() => navigation.push('Details')}
//             />
//         </View>
//     );
// }


// // const TabBarItem = (props: {
// //     tintColor: string;
// //     backgroundColor: string;
// //     normalImage: string;
// //     selectedImage: string;
// //     selected: boolean;
// // }) => {

// //     const title = props.tintColor;
// //     const selected = props.selected;
// //     console.log(title, selected);
// //     return (
// //         <Image source={require('./src/img/home.png')} width={25} height={25} />
// //     );
// // };



// const Tab = createBottomTabNavigator();
// const SettingsStack = createNativeStackNavigator();
// const HomeStack = createNativeStackNavigator();
// const NavStack = createNativeStackNavigator();

// export default function AppStudyHome() {
//     return (
//         <NavigationContainer>
//             <Tab.Navigator screenOptions={({ route }) => ({
//                 tabBarIcon: ({ focused, color, size }) => {
//                     let sourceRequire = require('./src/img/home.png');
//                     switch (route.name) {
//                         case "First":
//                             sourceRequire = require('./src/img/home.png');
//                             break;
//                         case "Second":
//                             sourceRequire = require('./src/img/mine.png');
//                             break;
//                     }
//                     return (
//                         <View style={{ width: 25, height: 25, backgroundColor: '#f0f' }}><Image source={sourceRequire} style={{ width: 25, height: 25 }} /></View>
//                     )
//                 },
//                 tabBarBackground: () => {
//                     return <View style={{ backgroundColor: '#eee', height: 83, width: 400 }}></View>
//                 },
//                 tabBarShowLabel: false,
//                 headerShown: false,
//             })}>
//                 <Tab.Screen name="First">
//                     {() => (
//                         <SettingsStack.Navigator>
//                             <SettingsStack.Screen
//                                 name="Settings"
//                                 component={SettingsScreen}
//                             />
//                             <SettingsStack.Screen name="Profile" component={ProfileScreen} />
//                         </SettingsStack.Navigator>
//                     )}
//                 </Tab.Screen>
//                 <Tab.Screen name="Second">
//                     {() => (
//                         <HomeStack.Navigator>
//                             <HomeStack.Screen name="Home" component={HomeScreen} />
//                             <HomeStack.Screen name="Details" component={DetailsScreen} />
//                         </HomeStack.Navigator>
//                     )}
//                 </Tab.Screen>
//             </Tab.Navigator>
//         </NavigationContainer>

//     );
// }


// import * as React from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home!</Text>
//     </View>
//   );
// }

// function SettingsScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Settings!</Text>
//     </View>
//   );
// }

// function MineScreen() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Mine!</Text>
//       </View>
//     );
//   }

// function MyTabBar({ state, descriptors, navigation }) {
//   return (
//     <View style={{ flexDirection: 'row', height: 80, backgroundColor: '#aaa', alignItems: 'center', paddingBottom: 34}}>
//       {state.routes.map((route, index) => {
//         const { options } = descriptors[route.key];
//         const label =
//           options.tabBarLabel !== undefined
//             ? options.tabBarLabel
//             : options.title !== undefined
//             ? options.title
//             : route.name;

//         const isFocused = state.index === index;

//         const onPress = () => {
//           const event = navigation.emit({
//             type: 'tabPress',
//             target: route.key,
//           });

//           if (!isFocused && !event.defaultPrevented) {
//             navigation.navigate(route.name);
//           }
//         };

//         const onLongPress = () => {
//           navigation.emit({
//             type: 'tabLongPress',
//             target: route.key,
//           });
//         };

//         return (
//           <TouchableOpacity
//             accessibilityRole="button"
//             accessibilityState={isFocused ? { selected: true } : {}}
//             accessibilityLabel={options.tabBarAccessibilityLabel}
//             testID={options.tabBarTestID}
//             onPress={onPress}
//             onLongPress={onLongPress}
//             style={{ flex: 1 }}
//           >
//             <Text style={{ color: isFocused ? '#673ab7' : '#222', textAlign: 'center' }}>
//               {label}
//             </Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

// const Tab = createBottomTabNavigator();

// export default function AppStudyHome() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Settings" component={SettingsScreen} />
//         <Tab.Screen name='Mine' component={MineScreen}/>
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }


// You can import Ionicons from @expo/vector-icons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
import * as React from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home!</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Detail')}
            />
        </View>
    );
}

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}

function ServerScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Server Screen</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            />
        </View>
    );
}

function DetailScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
            <Button
                title="Go to Details... again"
                onPress={() => navigation.push('Detail')}
            />
        </View>
    );
}

const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

const TabNav = () => {

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = 'ios-list';

                    // if (route.name === 'Home') {
                    //     iconName = focused
                    //         ? 'ion-chatbox'
                    //         : 'ion-chatbox';
                    // } else if (route.name === 'Settings') {
                    //     iconName = focused ? 'ios-list-box' : 'ios-list';
                    // }

                    // You can return any component that you like here!
                    // return <Ionicons name={iconName} size={size} color={color} />;
                    return <View style={{ width: 100, height: 30, alignItems: 'center', backgroundColor: '#aaa'}}>
                        <Text>{route.name}</Text>
                    </View>
                },
                tabBarActiveTintColor: 'red',
                tabBarInactiveTintColor: 'black',
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
}

export default function AppStudyHome() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff'}}>
            <NavigationContainer>
            <RootStack.Navigator initialRouteName={'TabNav'}>
                <RootStack.Screen name='TabNav' component={TabNav} />
                <RootStack.Screen name="Setting" component={SettingsScreen} />
                <RootStack.Screen name='Server' component={ServerScreen} />
                <RootStack.Screen name='Detail' component={DetailScreen} />
            </RootStack.Navigator>
        </NavigationContainer>
        </SafeAreaView>
        
    );
}
