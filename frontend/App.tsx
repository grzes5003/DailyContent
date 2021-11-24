import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import React from 'react';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from "./hooks/useColorScheme";
import Navigation from './navigation';

import {store, persistor} from "./_helpers/store.helper";
import {Provider} from 'react-redux';
import {PersistGate} from "redux-persist/integration/react";

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
                        <Navigation colorScheme={colorScheme}/>
                        <StatusBar/>
                    </PersistGate>
                </Provider>
            </SafeAreaProvider>
        );
    }
}
