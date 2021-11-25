import {createAsyncThunk, Dispatch} from "@reduxjs/toolkit";
import {userService} from '../_services/user.service'
import {ThunkAction} from "redux-thunk";
import {AuthState, setErrors, setLoading, setUser} from "../_reducers/auth.reducer";
import {Action, AnyAction} from "redux";
import userConstants from "../constants/UserConstants";
import {authService} from "../_services/auth.service";
import { createAction, nanoid } from '@reduxjs/toolkit'


// const login = createAsyncThunk(
//     'auth/login',
//     async (username: string) => {
//         return await userService.login(username,username);
//     }
// )
//
// export const authActions = {
//     login
// }

const login = ( {username, password}: {username: string, password: string} ): ThunkAction<void, AuthState, unknown, AnyAction> => {
    return async dispatch => {
        console.log('login dispatch!')
        dispatch(setLoading(true))
        authService.login(username, password)
            .then(user => dispatch(setUser(user)))
            .catch(error => dispatch(setErrors(error)))
    }
}

const logi = ({username, password}: { username: string, password: string }, dispatch: Dispatch) => {
    console.log('login dispatch!')
    dispatch(setLoading(true))
    return authService.login(username, password)
        .then(user => dispatch(setUser(user)))
        .catch(error => dispatch(setErrors(error)))
}

const register = ({username, password}: {username: string, password: string}): ThunkAction<void, AuthState, unknown, AnyAction> => {
    return async dispatch => {
        console.log('register dispatch!')
        dispatch(setLoading(true))

        authService.register({ username, password })
            .then(user => dispatch(setUser(user)))
            .catch(error => dispatch(setErrors(error)))
    }
}

export const authActions = {
    logi,
    login,
    register
}
