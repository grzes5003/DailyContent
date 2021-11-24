// import userConstants from '../constants/UserConstants';
// import storage from "../_helpers/storage";
// import {LoginAction} from "../types";
//
// const user = storage.load({
//     key: 'user'
// }).then(
//     user => {
//         console.log('called !!!');
//         if (user && user.data && user.data.token) {
//             console.log("authHeader: ", user.data.token);
//             return new Headers({
//                 'Authorization': 'Bearer ' + user.data.token,
//                 'withCredentials': 'true',
//                 'credentials': 'include',
//             });
//         } else {
//             return {};
//         }
//     }
// ).catch(
//     err => {
//         // any exception including data not found
//         // goes to catch()
//         console.warn('coo? ' + err.message);
//         switch (err.name) {
//             case 'NotFoundError':
//                 // TODO;
//                 break;
//             case 'ExpiredError':
//                 // TODO
//                 break;
//         }
//     }
// )
//
// console.log('user:    :::: ', user)
// const initialState = user ? {loggedIn: true, user} : {};
//
// export function authentication(state = initialState, action: LoginAction) {
//     switch (action.type) {
//         case userConstants.LOGIN_REQUEST:
//             return {
//                 loggingIn: true,
//             };
//         case userConstants.LOGIN_SUCCESS:
//             return {
//                 loggedIn: true,
//                 user: action.payload
//             };
//         case userConstants.LOGIN_FAILURE:
//             return {
//                 login_failure: true
//             };
//         case userConstants.LOGOUT:
//             return {
//                 logout_successful: true
//             };
//
//         // register
//         case userConstants.REGISTER_SUCCESS:
//             return {
//                 success: true
//             }
//         case userConstants.REGISTER_FAILURE:
//             return {
//                 error: action.error
//             }
//         default:
//             return state
//     }
// }