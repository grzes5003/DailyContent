import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import { RootState } from '../_helpers/store.helper'
import {authActions} from "../_actions/auth.actions";
import {userService} from "../_services/user.service";

export interface User {
    id: number,
    token: string,
    username: string
}

export interface AuthState {
    loggedIn: boolean
    loading: boolean
    error: string
    user?: User
}

const initialState: AuthState = {
    loggedIn: false,
    loading: false,
    error: '',
    user: undefined
}

const login = createAsyncThunk(
    'auth/login',
    async (username: string) => {
        return await userService.login(username,username);
    }
)


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // loginRequest: state => {
        //     console.log('logging in dispatch');
        //     state.loading = true
        // },
        // loginSuccess: (state, action) => {
        //     state.loading = false
        //     state.loggedIn = true
        //     state.username = action.payload.username
        // },
        // loginFailure: (state, action) => {
        //     state.loggedIn = false;
        //     state.loading = false;
        //     state.error = action.payload.error
        // }
        setLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.loading = payload
        },

        setErrors: (state, { payload }: PayloadAction<string>) => {
            state.error = payload
            state.loggedIn = false
        },

        setUser: (state, { payload }: PayloadAction<User>) => {
            state.user = payload
            state.loggedIn = true
        },
    }
})

// export const { loginRequest, loginSuccess, loginFailure } = authSlice.actions
export const { setLoading, setErrors, setUser } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectLoggedIn = (state: RootState) => state.auth.loggedIn

export default authSlice.reducer