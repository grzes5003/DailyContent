import {ThunkAction} from "redux-thunk";
import {RootState} from "../types";
import {AnyAction} from "redux";
import {userService} from "../_services/user.service";
import userConstants from "../constants/UserConstants";
import {imgService} from "../_services/img.service";
import imgConstants from "../constants/ImgConstants";
import {setLoading, addImg as addImage, setImages, setErrors} from "../_reducers/img.reducer";


const addImg = (idx: number): ThunkAction<void, RootState, unknown, AnyAction> =>
    async dispatch => {
        console.log('image dispatch!')
        dispatch(setLoading(true))

        imgService.getImg(idx)
            .then(
                image => dispatch(addImage(image)),
                error => dispatch(setErrors(error))
            )
    };

const getAllImages = (): ThunkAction<void, RootState, unknown, AnyAction> =>
    async dispatch => {
        console.log('get all images dispatch!');
        dispatch(setLoading(true))

        imgService.getAllImgs()
            .then(
                images => dispatch(setImages(images)),
                error => dispatch(setErrors(error))
            )
    };

export const imgActions = {
    addImg,
    getAllImages
}
