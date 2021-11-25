import axios from "axios";
import {config} from "../config";
import {User} from "../_reducers/auth.reducer";


const login = (username: string, password: string) => {
    const req = `${config.loginServiceUrl}/login`;

    return axios.post<string>(req, {
        username,
        password
    }, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => {
        const {data} = response

        console.log(' --------- got: ', response)
        return data as unknown as User
    }).catch(error => {
        console.log('error!: ', error.response)
        return Promise.reject(error)
    })
}

const register = ({username, password}: { username: string, password: string }) => {
    const req = `${config.loginServiceUrl}/register`;

    return axios.post<string>(req, {
        username,
        password
    }, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        const {data} = response

        console.log(' --------- got: ',response)
        return JSON.parse(data) as User
    }).catch((error) => {
        console.log('error!: ', error)
        return error
    })
}

export const authService = {
    login,
    register
}
