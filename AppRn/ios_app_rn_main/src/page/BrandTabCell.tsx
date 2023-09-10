import React, { useState } from 'react';
import {
    NativeModules,
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
// import MyRNView from './MyRNView';
import { ServiceDetails } from '../model/serviceModel';

interface Props {
    data: ServiceDetails;
    selected: boolean;
}

const BrandTabCell = (props: Props) => {
    // const [folding, setFolding] = useState(true); //view是否是展开的，默认非展开
    // const [height, setHeight] = useState(100); //view的总高度，非展开是100
    const title = props.data.brand;
    const selected = props.selected;
    console.log(title, selected);
    return (
        <View style={styles.mainContainer}>
            <View style={styles.textContainer}>
                <Text style={selected ? styles.textSelectStyle : styles.textStyle}>{title}</Text>
            </View>
            <View style={ selected ? styles.bottomLine : styles.bottomNoLine }></View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: { 
        height: 44, 
        paddingLeft: 10, 
        paddingRight: 10, 
     },
     textContainer: {
        height: 42,
        justifyContent: 'center', 
     },
     textSelectStyle: {
        fontSize: 14, 
        color: '#000000'
     },
     textStyle: {
        fontSize: 14, 
        color: '#333333'
     },
     bottomLine: {
        height: 2,
        backgroundColor: '#111111'
     },
     bottomNoLine: {
        height: 2,
        backgroundColor: '#ffffff'
     }
  });

export default BrandTabCell;