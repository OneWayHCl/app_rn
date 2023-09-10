/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  SectionList,
  Dimensions,
  StatusBar,
  useColorScheme,
  Appearance,
  TouchableOpacity,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import MyNavigationBar from '../components/MyNavigationBar';
import imageList from '../img/a_image_list';
import { contactViewModel } from './ContactViewModel';

const dimension = Dimensions.get('window')

// 获取屏幕高度和宽度
const { width, height } = Dimensions.get('window');

class ContactPage extends Component {

  componentDidMount() {
    console.log('componentDidMount-------');
  }

  // 获取随机数
  _getRandomInt(m: number) {
    const min = Math.ceil(1);
    const max = Math.floor(m > 0 ? m : 60);
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return randomNumber;
  }

  _getSectionName(index: number) {
    if (index == 1) {
      return 'A';
    } else if (index == 2) {
      return 'B';
    } else if (index == 3) {
      return 'C';
    } else if (index == 4) {
      return 'D';
    } else if (index == 5) {
      return 'E';
    } else if (index == 6) {
      return 'F';
    } else if (index == 7) {
      return 'G';
    } else if (index == 8) {
      return 'H';
    } else {
      return '#';
    }

  }

  // 头部搜索
  _headerView() {
    return <View style={styles.headContainer}>
      <TouchableOpacity activeOpacity={0.8}>
        <View style={styles.headSearch}>
          <Text style={styles.headSearchText}>🔍搜索</Text>
        </View>
      </TouchableOpacity>
    </View>;
  }

  // 组标题
  _renderSectionHeader(info: { section: { key: any, index: number, sectionName: string } }) {
    var index = info.section.index;
    var sectionName = info.section.sectionName;
    if (index == 0) {
      return <></>
    } else {
      return (
        <View style={{ height: 40 }}>
          <Text key={info.section.key} style={{ paddingLeft: 16, width: width, lineHeight: 40, textAlign: 'left', backgroundColor: 'rgb(237,237,237)', color: 'rgb(83,83,83)' }}>{sectionName}</Text>
        </View>
      )
    }
  }

  // 单个cell
  _renderItem(info: { item: { name: string , iconIndex: number }}) {
    return (
      <View style={styles.itemContainer}>
        <Image style={styles.itemIcon} source={imageList[info.item.iconIndex]}></Image>
        <View style={styles.itemContent}>
          <Text style={styles.itemName}>{info.item.name}</Text>
        </View>
      </View>
    );
  }

  // 分割线
  _itemSeparatorComponent() {
    return <View style={{ paddingLeft: 70, backgroundColor: '#fff' }} >
      <View
        style={{ width: width - 70, height: 1, backgroundColor: '#eee' }}
      />
    </View>
  }

  render() {
    const viewModel = contactViewModel;
    
    const allSections = [];

    // 第一组
    let section0 = {
      key: '',
      index: 0,
      sectionName: '',
      data: [
        {
          name: '新的朋友',
          iconIndex: this._getRandomInt(0)
        },
        {
          name: '群聊',
          iconIndex: this._getRandomInt(0)
        },
        {
          name: '公众号',
          iconIndex: this._getRandomInt(0)
        },
        {
          name: '企业微信联系人',
          iconIndex: this._getRandomInt(0)
        }
      ]
    }
    allSections.push(section0);

    // 其他组
    for (let i = 1; i < 10; i++) {
      let datas = [];
      const count = this._getRandomInt(10);
      for (let j = 0; j < count; j++) {
        datas.push(
          {
            name: '好友' + this._getRandomInt(0) + i + j,
            iconIndex: this._getRandomInt(0)
          },
        );
      }
      let section = {
        key: i + 'i',
        index: i,
        sectionName: this._getSectionName(i),
        data: datas
      }

      allSections.push(section);
    }

    const isDarkMode = Appearance.getColorScheme() === 'dark';
    const backgroundStyle = {
      backgroundColor: Colors.lighter,
    };

    return (
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <MyNavigationBar title={'通讯录'}  rightItem={true} />
        <SectionList
          renderSectionHeader={this._renderSectionHeader}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this._itemSeparatorComponent}
          sections={allSections}
          refreshing={false}
          onRefresh={() => { console.log("刷新") }}
          keyExtractor={(item, index) => ("index" + index + item)}
          onEndReached={(info) => { console.log("到达底部") }}
          onEndReachedThreshold={0}
          stickySectionHeadersEnabled={false}
          ListHeaderComponent={this._headerView}
          ListFooterComponent={() => <View style={{ height: 20}}></View>}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headContainer: {
    height: 50,
    paddingHorizontal: 15,
    paddingVertical: 4,
    backgroundColor: Colors.lighter,
  },
  headSearch: {
    backgroundColor: '#fff',
    width: width - 30,
    height: 32,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headSearchText: {
    color: '#666'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  itemContainer: {
    height: 55,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginHorizontal: 16
  },
  itemContent: {
    width: width - 100,
    height: 40
  },
  itemName: {
    color: '#000',
    fontSize: 16,
    lineHeight: 40
  },
  itemMessage: {
    color: '#666',
    fontSize: 14,
    lineHeight: 16
  },
  itemTime: {
    position: 'absolute',
    right: 0,
    top: 5
  }
});

export default ContactPage;
