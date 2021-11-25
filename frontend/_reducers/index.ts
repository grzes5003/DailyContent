import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import {authSlice} from './auth.reducer';
import {combineReducers} from 'redux';
import {imgSlice} from './img.reducer';
import {users} from './user.reducer';

const persistAuth = {
    key: 'auth',
    storage: AsyncStorage,
    whitelist: ['loggedIn', 'user']
};

const persistImgs = {
    key: 'img',
    storage: AsyncStorage,
}

const rootReducer = combineReducers({
    auth: persistReducer(persistAuth, authSlice.reducer),
    img: persistReducer(persistImgs, imgSlice.reducer)
});


export default rootReducer;
