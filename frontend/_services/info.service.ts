import {config} from "../config";
import axios from "axios";
import {ContentText} from "../_reducers/info.reducer";
import * as FileSystem from "expo-file-system";


const getInfo = (idx: number) => {
    const req = `${config.apiUrl}/info/${idx}`;

    return axios.get<string>(req, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        const {data} = response;

        console.log(' --------- got: ',data)
        return data as unknown as ContentText
    }).catch((error) => {
        console.log('error!: ', error)
        return error
    })
}

const getAllContent = () => {
    const req = `${config.apiUrl}/info`;
    console.log('fetch all content text from ', req)

    const promises = [];

    for (const x of Array(5).keys()) {
        promises.push(axios.get<string>(`${req}/${x}`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            const {data} = response;

            console.log(' --------- got: ',data)
            return data as unknown as ContentText
        }).catch((error) => {
            console.log('error!: ', error)
            return error
        }));
    }

    return Promise.all(promises).then(values => {
        console.log('values ' + values);
        return values;
    }).catch(error => {
        console.log(error);
    })
}

export const infoService = {
    getInfo,
    getAllContent
}
