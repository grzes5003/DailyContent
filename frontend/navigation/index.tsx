import {FontAwesome} from '@expo/vector-icons';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ColorSchemeName, Pressable, Text} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';

import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import {RootStackParamList, RootTabParamList, RootTabScreenProps} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import TabOneScreen from "../screens/TabOneScreen";
import LoginScreen from "../screens/LoginScreen";

const Drawer = createDrawerNavigator();

export default function Navigation({colorScheme}: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Drawer.Navigator
                screenOptions={{}}
                initialRouteName="Home">
                <Drawer.Screen name="Home" component={TabOneScreen}/>
                {/*<Drawer.Screen name="Notifications" component={NotFoundScreen} />*/}
                <Drawer.Screen name="Login" component={LoginScreen} />
            </Drawer.Navigator>
            <Stack.Group screenOptions={{presentation: 'modal'}}>
                <Stack.Screen name="Modal" component={ModalScreen}/>
            </Stack.Group>
            {/*<RootNavigator/>*/}
        </NavigationContainer>
    );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Root" component={TabOneScreen} options={{headerShown: false}}/>
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
            <Stack.Group screenOptions={{presentation: 'modal'}}>
                <Stack.Screen name="Modal" component={ModalScreen}/>
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