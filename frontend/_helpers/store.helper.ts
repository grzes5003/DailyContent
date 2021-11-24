import { createStore, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import {authSlice} from '../_reducers/auth.reducer';
import thunkMiddleware from 'redux-thunk';
import { persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
// @ts-ignore
import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';
//
// export const store = createStore(
//     rootReducer,
//     applyMiddleware(
//         thunkMiddleware,
//         loggerMiddleware
//     )
// );
//
// export const persistor = persistStore(store);

const loggerMiddleware = createLogger();

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
        serializableCheck: false,
    }).prepend(
        thunkMiddleware,
        loggerMiddleware
    )
})

export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch