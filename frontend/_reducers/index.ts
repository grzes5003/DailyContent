import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import {authSlice} from './auth.reducer';
import {combineReducers} from 'redux';
import {images} from './img.reducer';
import {users} from './user.reducer';

const persistAuth = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['loggedIn', 'user']
};

const rootReducer = combineReducers({
    auth: persistReducer(persistAuth, authSlice.reducer),
});


export default rootReducer;