import {config} from "../config";
import storage from "../_helpers/storage";


const getImg = (idx: number) => {
    const requestOptions: RequestInit = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    };

    const req = `${config.apiUrl}/images/${idx}`;

    return fetch(req, requestOptions)
        .then(handleResponse)
        .then(img => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            // storage.save({
            //     key: 'img', // Note: Do not use underscore("_") in key!
            //     data: img,
            // });
            const imgObjectURL = URL.createObjectURL(img);
            console.log(imgObjectURL);
            return img;
        });
}


function handleResponse(response: any) {
    console.log('GOT RESPONSE!')
    return response.blob();
}

export const imgService = {
    getImg
}