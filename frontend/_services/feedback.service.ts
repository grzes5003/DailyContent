import {config} from "../config";
import axios from "axios";
import {useAppSelector} from "../_helpers/store.hooks";
import {selectToken} from "../_reducers/auth.reducer";


const likeContent = (idx: number, token: string) => {

    const req = `${config.apiUrl}/rate/like/${idx}`;

    return axios.get<string>(req, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }).catch((error) => {
        console.log('error!: ', error)
        return error
    })
}

const dislikeContent = (idx: number, token: string) => {
    const req = `${config.apiUrl}/rate/like/${idx}`;

    return axios.get<string>(req, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }).catch((error) => {
        console.log('error!: ', error)
        return error
    })
}

export const feedbackService = {
    likeContent,
    dislikeContent
}