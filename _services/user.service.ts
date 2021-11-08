import {config} from '../config';
import {authHeader} from '../_helpers/auth-header';
import storage from "../_helpers/storage";


const login = (username: string, password: string) => {
    const requestOptions: RequestInit = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({username, password})
    };

    const req = `${config.loginServiceUrl}/login`;

    return fetch(req, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            storage.save({
                key: 'user', // Note: Do not use underscore("_") in key!
                data: JSON.stringify(user),
                expires: null
            });
            console.log("LOGIN set up user: ", user);

            return user;
        });
};

const register = (username: string, password: string, email: string) => {

    const user_data = {
        nickname: username,
        surname: username,
        email: email,
        passwd: password
    }

    const requestOptions: RequestInit = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(user_data)
    };

    const req = `${config.loginServiceUrl}/register`;

    return fetch(req, requestOptions)
        .then(handleResponse)
        .then();
};

const logout = () => {
    const requestOptions: RequestInit = {
        method: 'GET',
        credentials: 'include',
    };
    console.log("logout action!");

    localStorage.removeItem('user');

    return fetch(`${config.loginServiceUrl}/logout`, requestOptions).then(handleResponse);
};

const getAll = () => {
    // TODO probably buggy
    const requestOptions: RequestInit = {
        method: 'GET',
        headers: authHeader()
    };
    console.log("getALL header: ", requestOptions);

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse)
};

function handleResponse(response: any) {
    const jsonPr = (t: string) => {
        try {
            let o = JSON.parse(t);
            if (o && typeof o === "object") {
                return o;
            }
        } catch (e) {}
        return false;
    }
    console.log("handleResponse: resp: ", response);
    return response.text().then((text: string) => {
        console.log("handleResponse: ", text);
        const data = text && jsonPr(text);
        console.log("handleResponse: json: ", data);
        if (!response.ok) {
            console.log("handleResponse: not ok", response.statusText);
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                // window.location.reload(false);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        console.log("handleResponse: data: ", data);
        return data;
    });
}

export const userService = {
    login,
    logout,
    register,
    getAll
};