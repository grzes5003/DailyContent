import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import React from 'react';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from "./hooks/useColorScheme";
import Navigation, {navigationRef} from './navigation';

import {store, persistor} from "./_helpers/store.helper";
import {Provider} from 'react-redux';
import {PersistGate} from "redux-persist/integration/react";
import RootNavigator from "./navigation";
import {NavigationContainer} from "@react-navigation/native";
import Toast from 'react-native-toast-message';

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        {/*<Navigation colorScheme={colorScheme}/>*/}
                        <NavigationContainer ref={navigationRef}>
                            <RootNavigator/>
                        </NavigationContainer>
                        {/*<StatusBar/>*/}
                        <Toast />
                    </PersistGate>
                </Provider>
            </SafeAreaProvider>
        );
    }
}
