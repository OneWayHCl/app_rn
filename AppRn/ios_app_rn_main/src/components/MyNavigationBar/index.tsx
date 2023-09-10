/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from "react";
import { Button, Dimensions, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { Image } from "react-native";
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { contactViewModel } from "../../ContactPage/ContactViewModel";

// 获取屏幕高度和宽度
const { width, height } = Dimensions.get('window');

const MyNavigationBar = (props: { title: String, rightItem: boolean, rightClick?: Function }) => {

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    height: 44
  };
  return (
    <View style={[backgroundStyle, styles.container]}>
      <Text style={styles.textStyle}>{props.title}</Text>
      {props.rightItem &&
        <TouchableOpacity onPress={()=> {
          if (props.rightClick) {
            props.rightClick();
          }
        }}>
          <Image source={require('../../img/add_icon.png')} style={styles.iconStyle} />
        </TouchableOpacity>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 15
  },
  textStyle: {
    textAlign: 'center',
    lineHeight: 44,
    fontSize: 18,
    fontWeight: '500',
    position: 'absolute',
    width: width
  },
  iconStyle: {
    width: 30,
    height: 30,
    marginTop: 5
  }
});

export default MyNavigationBar;