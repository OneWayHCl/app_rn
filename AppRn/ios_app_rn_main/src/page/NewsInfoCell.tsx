import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';
import { ServiceBanners } from '../model/serviceModel';

// 获取屏幕高度和宽度
const { width } = Dimensions.get('window');

interface Props {
    data: ServiceBanners;
    onPress: Function;
}

const NewsInfoCell = (props: Props) => {
    const url = props.data.url;
    return (
        <TouchableOpacity onPress={() => { props.onPress(url) }}>
            <View style={styles.mainContainer}>
            <Image
                source={{ uri: url }}
                style={{ width: width - 40, height: 120, borderRadius: 8 }}
            />
        </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        width: width - 40,
        height: 120,
        marginTop: 8,
        marginLeft: 20,
    },
});

export default NewsInfoCell;