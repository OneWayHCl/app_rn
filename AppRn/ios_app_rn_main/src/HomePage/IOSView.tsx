import React, { Component } from "react";
import {
  findNodeHandle,
  requireNativeComponent,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { NativeModules } from "react-native";
import { Text } from "react-native-elements";

const IOSView: React.ComponentType<{
  style?: StyleProp<ViewStyle>;
  params?: { [key: string]: string };
}> = ({ style, params, ...props }) => {
  let times = 0;
  const vManager = NativeModules.IOSRNViewManager;

  let _root: any;
  const _assignRoot = (component: any) => {
    _root = component;
  };

  console.log("IOSView---------" + times);

  return (
    <View style={{ width: 200, height: 100 }}>
      <IOSRNView
        ref={_assignRoot}
        params={{ data: "rn-params" }}
        onStatusChanged={(event: any) => {
          console.log("Native-Call-RN:", event.nativeEvent);
        }}
        style={StyleSheet.absoluteFill}
      />
      <TouchableOpacity
        onPress={() => {
          times += 1;
          let msg = "RN-To-Native-" + times;
          vManager.doSomething(findNodeHandle(_root), msg);
        }}
      >
        <Text>点击</Text>
      </TouchableOpacity>
    </View>
  );
};

const IOSRNView = (requireNativeComponent as any)("IOSRNView", IOSView);

export default IOSView;
