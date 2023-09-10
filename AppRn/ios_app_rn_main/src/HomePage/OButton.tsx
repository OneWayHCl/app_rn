import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import { Image } from 'react-native-elements';

interface Props {
    title?: string | null;
    titleFont?: number | null; 
    iconSource?: any | null;
    iconSize?: number | null;
    onPress?: Function;
}

const OButton = (props: Props) => {

    const title = props.title;
    const source = props.iconSource;
    let titleFont = props.titleFont;
    if (titleFont && titleFont <= 0) {
        titleFont = 14;
    }
    let iconSize = props.iconSize;
    if (iconSize && iconSize <= 0) {
        iconSize = 20;
    }

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={()=>{
            if(props.onPress) {
                props.onPress();
            }
        }}>
            <View style={styles.contentContainer}>
                {title != null && (<Text ellipsizeMode='tail' numberOfLines={1} style={ [styles.itemText, { fontSize: titleFont ? titleFont : 14, flex: source ? 0.5:1 }] }>{title}</Text>)}
                {source != null && (<Image style={[styles.itemIcon, { width: iconSize ? iconSize : 20, height: iconSize ? iconSize : 20 }]} source={source} height={undefined} width={undefined}></Image>)}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        padding: 2,
        // overflow: 'hidden',
        // height: 42,
        // width: 100,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: 'red',
        borderWidth: 1,
        
    },
    itemIcon: {
        // width: 20,
        // height: 20,
        borderRadius: 5,
        marginHorizontal: 16,
        // flex: 0.5
    },
    itemText: {
        fontSize: 14,
        color: '#333333',
        textAlign: 'center',
        flex: 0.5
    },
});

export default OButton;