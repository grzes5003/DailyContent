import {FontAwesome} from '@expo/vector-icons';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Button, ColorSchemeName, Pressable, Text} from 'react-native';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';

import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import {RootStackParamList, RootTabParamList, RootTabScreenProps} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import TabOneScreen from "../screens/TabOneScreen";
import LoginScreen from "../screens/LoginScreen";
import {useAppSelector} from "../_helpers/store.hooks";
import {logout, selectLoggedIn} from "../_reducers/auth.reducer";
import {useDispatch} from "react-redux";
import Home from "../screens/Home";

const Drawer = createDrawerNavigator();

export function Navigation({colorScheme}: { colorScheme: ColorSchemeName }) {
    const loggedIn = useAppSelector(selectLoggedIn);
    const dispatch = useDispatch();

    const DrawerContent = (props: any) => (
        <DrawerContentScrollView style={{backgroundColor: 'black'}} {...props}>
            <DrawerItemList {...props} />
            {loggedIn ?
                <DrawerItem activeTintColor='white' inactiveTintColor='white' label="Logout" onPress={() => {
                    dispatch(logout())
                    props.navigation.navigate("Home")
                }}/> :
                <DrawerItem activeTintColor='white' inactiveTintColor='white' label="Login" onPress={() => {
                    props.navigation.navigate("Login")
                }}/>
            }
        </DrawerContentScrollView>
    )

    return (
        <Drawer.Navigator screenOptions={{drawerActiveTintColor: 'white', drawerInactiveTintColor: 'white'}}
                          initialRouteName="Home"
                          drawerContent={DrawerContent}
        >
            <Drawer.Screen options={{headerTransparent: true, headerTitle: ''}} name="Home" component={Home}/>
           {/*<Drawer.Screen name="Login" component={LoginScreen}/>*/}
        </Drawer.Navigator>
    );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Drawer" component={Navigation} options={{headerShown: false, headerTransparent: true}}/>
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
            <Stack.Group screenOptions={{presentation: 'modal'}}>
                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: true, headerTransparent: true, headerTintColor: 'white'}}/>
            </Stack.Group>
        </Stack.Navigator>
    );
}


function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={30} style={{marginBottom: -3}} {...props} />;
}