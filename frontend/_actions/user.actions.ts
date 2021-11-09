import userConstants from '../constants/UserConstants';
import {userService} from '../_services/user.service';
import {ThunkAction} from "redux-thunk";
import {RootState} from "../types";
import {AnyAction} from "redux";
// TODO
// import {alertActions} from './';
// import {history} from '../_helpers';

const login = (username: string, password: string): ThunkAction<void, RootState, unknown, AnyAction> =>
    async dispatch => {
        console.log('login dispatch!')
        dispatch(request({username}))

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    // history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    // dispatch(alertActions.error(error));
                }
            )

        function request(user: { username: string; }) {
            return {type: userConstants.LOGIN_REQUEST, user}
        }

        function success(user: any) {
            return {type: userConstants.LOGIN_SUCCESS, user}
        }

        function failure(error: any) {
            console.log("ERROR LOGIN: error=", error);
            return {type: userConstants.LOGIN_FAILURE, error}
        }
    };


const register = (username: string, password: string, email: string) => {
    return (dispatch: (arg0: { type: string; error?: any; }) => void) => {
        dispatch(request());

        userService.register(username, password, email)
            .then(
                _ => {
                    dispatch(success());
                    // dispatch(alertActions.success("Register successful"));
                    // history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    // dispatch(alertActions.error(error));
                }
            )
    };

    function request() {
        return {type: userConstants.REGISTER_REQUEST}
    }

    function success() {
        return {type: userConstants.REGISTER_SUCCESS}
    }

    function failure(error: any) {
        console.log("ERROR REGISTER: error=", error);
        return {type: userConstants.REGISTER_FAILURE, error}
    }
};

const logout = () => {
    userService.logout();
    return {type: userConstants.LOGOUT};
};


const getAll = () => {
    return (dispatch: (arg0: { type: string; users?: any; error?: any; }) => void) => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {type: userConstants.GETALL_REQUEST}
    }

    function success(users: any) {
        return {type: userConstants.GETALL_SUCCESS, users}
    }

    function failure(error: any) {
        return {type: userConstants.GETALL_FAILURE, error}
    }
}



export const userActions = {
    login,
    logout,
    register,
    getAll
};