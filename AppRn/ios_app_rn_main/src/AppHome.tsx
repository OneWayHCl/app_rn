import * as React from 'react';
import { Button, View, Text, TextInput, useColorScheme, TouchableOpacity } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function DetailsScreen({ route, navigation }) {

    /* 2. Get the param */
    const { itemId, otherParam } = route.params;
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
            <Text>itemId: {JSON.stringify(itemId)}</Text>
            <Text>otherParam: {JSON.stringify(otherParam)}</Text>
            <Button
                title="Go to Details... again"
                onPress={() =>
                    navigation.push('Details', {
                        itemId: Math.floor(Math.random() * 100),
                    })
                }
            />
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
}

function DetailsScreen1({ navigation }) {

    /* 2. Get the param */
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>DetailsScreen1 Screen</Text>

            <Button
                title="Go to Details... again"
                onPress={() =>
                    navigation.push('Details', {
                        itemId: Math.floor(Math.random() * 100),
                    })
                }
            />
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
}

function HomeScreen({ navigation, route }) {

    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        // Use `setOptions` to update the button that we previously specified
        // Now the button includes an `onPress` handler to update the count
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => setCount((c) => c + 1)} title="Update count" />
            ),
            headerLeft: () => (
                <Button
                    onPress={() => {
                        navigation.navigate('Details1', {
                            itemId: 86,
                            otherParam: 'anything you want here',
                        });
                    }}
                    title="Left"
                    color="#fff"
                />
            ),
        });
    }, [navigation]);

    React.useEffect(() => {
        if (route.params?.post) {
            // Post updated, do something with `route.params.post`
            // For example, send the post to the server
        }
    }, [route.params?.post]);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>{count}</Text>
            <Button
                title="Update title"
                onPress={() => navigation.setOptions({ title: 'Updated' })}
            />
            <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
            <Text>Home Screen</Text>
            <Button
                title="Go to Details"
                onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    navigation.navigate('Details', {
                        itemId: 86,
                        otherParam: 'anything you want here',
                    });
                }}
            />
            <Button
                title="Go to Details1"
                onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    navigation.navigate('Details1', {
                        itemId: 86,
                        otherParam: 'anything you want here',
                    });
                }}
            />
            <Button
                title="Create post"
                onPress={() => navigation.navigate('CreatePost')}
            />
            <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
        </View>
    );
}

function CreatePostScreen({ navigation, route }) {
    const [postText, setPostText] = React.useState('');

    return (
        <>
            <TextInput
                multiline
                placeholder="What's on your mind?"
                style={{ height: 200, padding: 10, backgroundColor: 'white' }}
                value={postText}
                onChangeText={setPostText}
            />
            <Button
                title="Done"
                onPress={() => {
                    // Pass and merge params back to home screen
                    navigation.navigate({
                        name: 'Home',
                        params: { post: postText },
                        merge: true,
                    });
                }}
            />
            <Button
                title="Done to Detail"
                onPress={() => {
                    // Pass and merge params back to home screen
                    navigation.navigate('CreatePost', {
                        screen: 'Home',
                        params: { post: postText },
                    });
                }}
            />
        </>
    );
}

interface Props {
    data: string;
}
function RightView(props: Props) {
    const title = props.data;
    return (
        <TouchableOpacity>
            <View>
                <Text style={{ fontSize: 16, color: '#f00'}}>右按钮{title}</Text>
            </View>
        </TouchableOpacity>

    );
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AppHome1() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    // headerShown: false,
                    headerStyle: {
                        backgroundColor: '#aaa',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerRight: (props) => <RightView data='123' />,
                    headerLeft: () => (
                        <Button
                            onPress={() => console.log('This is a button!')}
                            title="Info"
                            color="#fff"
                        />
                    ),
                }}
                initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        title: 'My home',
                    }}
                    initialParams={{ itemId: 42 }} />
                <Stack.Screen name="CreatePost" component={CreatePostScreen} />
                <Stack.Screen name="Details" component={DetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

function AppHome({ navigation }) {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#aaa',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerRight: (props) => <RightView data='123' />,
                    headerLeft: () => (
                        <Button
                            onPress={() => {
                                console.log('LeftItem');
                            }}
                            title="LeftItem"
                            color="#000"
                        />
                    ),
                }}
                initialRouteName="Home">
                <Stack.Group>
                    <Stack.Screen name="CreatePost" component={CreatePostScreen} />
                    <Stack.Screen name="Details" component={DetailsScreen} />
                    <Stack.Screen name="Home" component={HomeScreen} />
                </Stack.Group>
                <Stack.Group screenOptions={{ presentation: 'modal' }}>
                    <Stack.Screen name='Details1' component={DetailsScreen1}></Stack.Screen>
                    {/* <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{
                            title: 'My home',
                        }}
                        initialParams={{ itemId: 42 }} /> */}
                    {/* <Stack.Screen name="CreatePost" component={CreatePostScreen} />
                    <Stack.Screen name="Details" component={DetailsScreen} /> */}
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
        
    );
}

export default AppHome;


