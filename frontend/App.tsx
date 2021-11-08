import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import React from 'react';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from "./hooks/useColorScheme";
import Navigation from './navigation';

import {store} from "./_helpers/store.helper";
import {Provider} from 'react-redux';

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <Provider store={store}>
                    <Navigation colorScheme={colorScheme}/>
                    <StatusBar/>
                </Provider>
            </SafeAreaProvider>
        );
    }
}
