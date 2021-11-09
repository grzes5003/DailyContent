import {Action, ActionCreator, AnyAction} from "redux";
import {userService} from "../_services/user.service";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../types";

const userConstants = {
    LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
    LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
    LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',

    REGISTER_REQUEST: 'USERS_REGISTER_REQUEST',
    REGISTER_SUCCESS: 'USERS_REGISTER_SUCCESS',
    REGISTER_FAILURE: 'USERS_REGISTER_FAILURE',

    LOGOUT: 'USERS_LOGOUT',

    GETALL_REQUEST: 'USERS_GETALL_REQUEST',
    GETALL_SUCCESS: 'USERS_GETALL_SUCCESS',
    GETALL_FAILURE: 'USERS_GETALL_FAILURE',
};

export interface LoginRequest extends Action {
    type: 'USERS_LOGIN_REQUEST',
    payload: {
        username: string,
        password: string
    }
}

export default userConstants;