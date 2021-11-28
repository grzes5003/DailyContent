import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import {authSlice} from './auth.reducer';
import {combineReducers} from 'redux';
import {imgSlice} from './img.reducer';
import {users} from './user.reducer';
import {infoSlice} from "./info.reducer";

const persistAuth = {
    key: 'auth',
    storage: AsyncStorage,
    whitelist: ['loggedIn', 'user']
};

const persistImgs = {
    key: 'img',
    storage: AsyncStorage,
}

const persistInfo = {
    key: 'info',
    storage: AsyncStorage
}

const rootReducer = combineReducers({
    auth: persistReducer(persistAuth, authSlice.reducer),
    img: persistReducer(persistImgs, imgSlice.reducer),
    info: persistReducer(persistInfo, infoSlice.reducer)
});


export default rootReducer;
