import {createAsyncThunk} from "@reduxjs/toolkit";
import {userService} from '../_services/user.service'
import {ThunkAction} from "redux-thunk";
import {AuthState, setErrors, setLoading, setUser} from "../_reducers/auth.reducer";
import {Action, AnyAction} from "redux";
import userConstants from "../constants/UserConstants";
import {authService} from "../_services/auth.service";


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

const login = (username: string): ThunkAction<void, AuthState, unknown, Action<string>> => {
    return async dispatch => {
        console.log('login dispatch!')
        dispatch(setLoading(true))
        authService.login(username, username)
            .then(
                user => {
                    dispatch(setUser(user));
                    // history.push('/');
                },
                error => {
                    dispatch(setErrors(error));
                    // dispatch(alertActions.error(error));
                }
            )
    }
}

export const authActions = {
    login
}