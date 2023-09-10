import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/reduxStore';
import App from './App';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const ProviderContainer = () => {
  return(
    <Provider store={store}>
      <App/>
    </Provider>
  );
}

AppRegistry.registerComponent('RNApp',()=> ProviderContainer);

class RNHighScores extends React.Component {
  render() {

    return (
      <View >
        <Text>
          2048 High Scores!
        </Text>
      </View>
    );
  }
}

const RNApp = ()=> {
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {/* <App/> */}
        <Text>RNNNN</Text>
    </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  highScoresTitle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  scores: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

// Module name
// AppRegistry.registerComponent('RNApp',()=> RNApp);