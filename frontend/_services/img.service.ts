import {config} from "../config";
import storage from "../_helpers/storage";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import {User} from "../_reducers/auth.reducer";
import {FileSystemSessionType} from "expo-file-system";


const getImg = (idx: number) => {
    const req = `${config.apiUrl}/img/${idx}`;

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
    const req = `${config.apiUrl}/img`;
    // const req = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Tom_Hiddleston_by_Gage_Skidmore.jpg/800px-Tom_Hiddleston_by_Gage_Skidmore.jpg'
    console.log('fetch all images from ', req)

    const promises = [];

    for (const x of Array(5).keys()) {
        promises.push(FileSystem.downloadAsync(
            `${req}/${x}`,
            FileSystem.documentDirectory + `${x}.jpg`,
            {
                sessionType: FileSystem.FileSystemSessionType.FOREGROUND
            }
        )
            .then(({uri}) => {
                console.log('Finished downloading to ', uri);
                return uri
            })
            .catch(error => {
                console.log('Finished downloading with error ');
                console.error(error);
            })
        );
    }

    return Promise.all(promises).then(values => {
        console.log('values ' + values);
        return values;
    }).catch(error => {
        console.log(error);
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
