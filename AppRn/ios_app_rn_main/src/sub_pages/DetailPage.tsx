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
 import { Button, Text, View } from "react-native";
 
 
 const DetailPageScreen = ({ route ,navigation }) => {

    console.log(route.params);
    // const { itemId, itemName } = route.params;
     return (
         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
             <Text>DetailPageScreen</Text>
             <Button
                 title="Go to DetailPage"
                 onPress={() => navigation.push('DetailPage')}
             />
         </View>
     );
 }
 
 export default DetailPageScreen;