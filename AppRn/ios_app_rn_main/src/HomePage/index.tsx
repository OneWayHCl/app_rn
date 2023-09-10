/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Dimensions, FlatList, Image, Modal, SafeAreaView, StatusBar, StyleSheet, Text, TouchableHighlight, TouchableOpacity, useColorScheme, View } from "react-native";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import MyNavigationBar from "../components/MyNavigationBar";
import imageList from "../img/a_image_list";
import PageThreeScreen from "../page/PageThree";
import OButton from "./OButton";
import { observe } from "mobx";

import {observer} from 'mobx-react-lite'
import HomeViewModel from "./HomeViewModel";
import { contactViewModel } from "../ContactPage/ContactViewModel";
import IOSView from "./IOSView";

// 获取屏幕高度和宽度
const { width, height } = Dimensions.get('window');

// 获取随机数
const getRandomInt = (m: number)=> {
  const min = Math.ceil(1);
  const max = Math.floor(m > 0 ? m : 60);
  const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNumber;
}


const HomePage = ({ route, navigation }) => {

  const viewModel = useRef<HomeViewModel>();
  if (viewModel.current == null) {
    viewModel.current = new HomeViewModel();
  }

  // contactViewModel.increment();
  console.log(contactViewModel.count);

    //   //只执行一次
    //   useEffect(()=>{
    //     // 副效应函数体
    //   },[]);
    // //viewModel发生变化，执行一次
    // useEffect(()=>{
    //     // 副效应函数体
    // }, [viewModel]);



  // const [modalVisible, setModalVisible] = useState(false);
  let list = new Array();
  
  // return (
  //   <View style={styles.centeredView}>
      

  //     <TouchableHighlight
  //       style={styles.openButton}
  //       onPress={() => {
  //         setModalVisible(true);
  //       }}
  //     >
  //       <Text style={styles.textStyle}>Show Modal</Text>
  //     </TouchableHighlight>
  //   </View>
  // );

  let _flatList:FlatList<{
    key: string;
    title: string;
    iconIndex: number;
    message: string;
    time: string;
}>;

  // _flatList;
  // _flatList.current;

  console.log(route.params, navigation);
  // const { itemId, itemName } = route.params;
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1
  };

  let dataList = [];
  for (let i = 0; i < 60; i++) {
    const hour = getRandomInt(23);
    const min = getRandomInt(59);
    let dict = { 
      key: 'item' + i,
      title: '聊天窗' + i, 
      iconIndex: getRandomInt(59),
      message: '元旦快乐，祝开心快乐' + i,
      time: (hour < 10 ? '0' + hour : hour) + ':' + (min < 10 ? '0' + min : min)
    };
    dataList.push(dict);
  }

  // console.log('-------',dataList);

  const _renderItemAction = (item: any) => {
    console.log(item.title);
    // navigation.push('ChatDetailPage', item);
    // navigation.push('PageThree');
    navigation.push('PageFour');
    console.log('++++++++++++++++++++++++_renderItemAction');
    // console.log(_flatList);

  }

  // 头部搜索
  const _headerView = () => {
    return <View style={styles.headContainer}>
      <TouchableOpacity activeOpacity={0.8} onPress={()=>{
        contactViewModel.increment();
      }}>
        <View style={styles.headSearch}>
          <Text style={styles.headSearchText}>🔍搜索</Text>
        </View>
      </TouchableOpacity>
      {/* <View style={{  borderColor: 'red', borderWidth: 1, flexDirection: 'row', width: width - 50, overflow: 'visible', marginBottom: 10}}>
      <Button title='123' color='#aaaaaa' onPress={()=>{
        setModalVisible(true);
      }}></Button>
      <Button title='123' color={'red'} ></Button>
      <Text>11123123123123123</Text>
      <Text>!!!!!1112312312312311123123123123123123</Text>
      </View> */}

      {/* <OButton title={"按钮超级长的一个按钮按钮超级长的一个按钮按钮超级长的一个按钮"} titleFont={20} iconSource={require('../img/icon_10.jpg')} iconSize={50} onPress={()=>{
        console.log('按鈕點擊--点击');
      }}></OButton>
      <OButton title={"按鈕"} iconSource={require('../img/icon_11.jpg')} iconSize={30}></OButton>
      <OButton title={'超级按钮'}></OButton> */}
    </View>;
  }

  // 聊天cell
  const _renderItemCell = ({ item, index }) => {
    return <TouchableHighlight
      activeOpacity={0.8}
      onPress={()=>_renderItemAction(item)}>
      <View style={styles.itemContainer}>
        <Image style={styles.itemIcon} source={imageList[item.iconIndex]}></Image>
        <View style={styles.itemContent}>
          <Text style={styles.itemName}>{item.title}</Text>
          <Text style={styles.itemMessage}>{item.message}</Text>
          <Text style={styles.itemTime}>{item.time}</Text>
        </View>
      </View>
    </TouchableHighlight>
  }

  // 分割线
  const _itemSeparatorComponent = () => {
    return <View style={{ paddingLeft: 82, backgroundColor: '#fff' }} >
      <View
        style={{ width: width - 82, height: 1, backgroundColor: '#ddd' }}
      />
    </View>
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View>
        <IOSView></IOSView>
      </View>
      <MyNavigationBar title={'微信'} rightItem={true} rightClick={()=>{
        console.log('MyNavigationBar----click');
        viewModel.current?.changeVisible(true);
      }} />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <FlatList
          ref={(lst: FlatList<{
            key: string;
            title: string;
            iconIndex: number;
            message: string;
            time: string;
        }> ) => _flatList = lst}
          data={dataList}
          ListHeaderComponent={_headerView}
          ItemSeparatorComponent={_itemSeparatorComponent}
          renderItem={_renderItemCell}
          // scrollsToTop={false}
          
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={viewModel.current.modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          // setModalVisible(!modalVisible);
          
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                viewModel.current?.changeVisible(false);
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </SafeAreaView>

  );
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
  itemContainer: {
    height: 65,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginHorizontal: 16
  },
  itemContent: {
    width: width - 100,
    height: 45
  },
  itemName: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 26
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
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: "center",
    // width: width,
    // height: height * 0.5,
    backgroundColor: '#000000aa',
  },
  modalView: {
    width: width,
    height: 500,
    marginBottom: 0,
    // marginTop: height - 300,
    backgroundColor: "red",
    borderRadius: 20,
    padding: 0,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default observer(HomePage);