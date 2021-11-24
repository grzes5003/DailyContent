import {config} from "../config";
import storage from "../_helpers/storage";
import axios from "axios";
import {User} from "../_reducers/auth.reducer";


const getImg = (idx: number) => {
    const req = `${config.apiUrl}/images/${idx}`;

    return axios.get<string>(req, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        const {data} = response;

        console.log(' --------- got: ',data)
        return data as string
    }).catch((error) => {
        console.log('error!: ', error)
        return error
    })
}

const getAllImgs = () => {
    const req = `${config.apiUrl}/images/all`;

    return axios.get<string>(req, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        const {data} = response;

        console.log(' --------- got: ',data)
        return data as string
    }).catch((error) => {
        console.log('error!: ', error)
        return error
    })
}

function handleResponse(response: any) {
    console.log('GOT RESPONSE!')
    return response.blob();
}

export const imgService = {
    getImg,
    getAllImgs
}
