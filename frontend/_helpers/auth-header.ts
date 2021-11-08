import storage from "./storage";
import {userData} from "../types";

export function authHeader(): Headers | {} {
    // return authorization header with jwt token
    return storage.load({
        key: 'user'
    }).then(
        user => {
            if (user && user.data && user.data.token) {
                console.log("authHeader: ", user.data.token);
                return new Headers({
                    'Authorization': 'Bearer ' + user.data.token,
                    'withCredentials': 'true',
                    'credentials': 'include',
                });
            } else {
                return {};
            }
        }
    ).catch(
        err => {
            // any exception including data not found
            // goes to catch()
            console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    console.log(err.message)
                    break;
                case 'ExpiredError':
                    console.log(err.message)
                    break;
            }
        }
    )
}
