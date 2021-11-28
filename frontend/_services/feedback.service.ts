import {config} from "../config";
import axios from "axios";


const likeContent = (idx: number) => {
    const req = `${config.apiUrl}/like/${idx}`;

    return axios.get<string>(req, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    }).catch((error) => {
        console.log('error!: ', error)
        return error
    })
}

const dislikeContent = (idx: number) => {
    const req = `${config.apiUrl}/like/${idx}`;

    return axios.get<string>(req, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
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