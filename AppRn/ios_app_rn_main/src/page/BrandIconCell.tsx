import React, { useState } from 'react';
import {
    NativeModules,
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    Image
} from 'react-native';
// import MyRNView from './MyRNView';
import { ServiceDetailIcons } from '../model/serviceModel';
// import { Avatar, ListItem } from 'react-native-elements';

interface Props {
    data: ServiceDetailIcons;
    onPress: Function;
}

const BrandIconCell = (props: Props) => {

    const title = props.data.title;
    const url = props.data.url;
    
    return (
        <TouchableOpacity onPress={ ()=> {
            props.onPress();
        }}>
            <View style={styles.mainContainer}>
            <View style={styles.iconContainer}>
                <Image
                    source={{ uri: url }}
                    style={{ width: 30, height: 30 }}
                />
            </View>
            <View style={styles.textContainer}>
                <Text numberOfLines={1} style={styles.textStyle}>{title}</Text>
            </View>
        </View>
        </TouchableOpacity>
    );
};

// 获取屏幕高度和宽度
const { width, height } = Dimensions.get('window');


const styles = StyleSheet.create({
    mainContainer: {
        width: (width-20)/4,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        // borderColor: '#eeeeee',
        // borderWidth: 1
    },
    iconContainer: {
        justifyContent: 'center',
    },
    textContainer: {
        height: 20,
        paddingTop: 5,
        justifyContent: 'center',

    },
    textStyle: {
        fontSize: 12,
    },
});

export default BrandIconCell;