import {ThunkAction} from "redux-thunk";
import {RootState} from "../types";
import {AnyAction} from "redux";
import {addImg as addImage, setErrors, setImages, setLoading} from "../_reducers/img.reducer";
import {imgService} from "../_services/img.service";
import {infoService} from "../_services/info.service";
import {setContent} from "../_reducers/info.reducer";
import {ContentInfo} from "../components/Model";


const addInfo = (idx: number): ThunkAction<void, RootState, unknown, AnyAction> =>
    async dispatch => {
        console.log('image dispatch!')
        dispatch(setLoading(true))

        infoService.getInfo(idx)
            .then(
                image => dispatch(addInfo(image)),
                error => dispatch(setErrors(error))
            )
    };

const getAllContent = (): ThunkAction<void, RootState, unknown, AnyAction> =>
    async dispatch => {
        console.log('get all images dispatch!');
        dispatch(setLoading(true))

        infoService.getAllContent()
            .then(
                content => dispatch(setContent(content as unknown as ContentInfo[])),
                error => dispatch(setErrors(error))
            )
    };

export const infoActions = {
    addInfo,
    getAllContent
}
