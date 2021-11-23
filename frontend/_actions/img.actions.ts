import {ThunkAction} from "redux-thunk";
import {RootState} from "../types";
import {AnyAction} from "redux";
import {userService} from "../_services/user.service";
import userConstants from "../constants/UserConstants";
import {imgService} from "../_services/img.service";
import imgConstants from "../constants/ImgConstants";


const getImg = (idx: number): ThunkAction<void, RootState, unknown, AnyAction> =>
    async dispatch => {
        console.log('image dispatch!')
        dispatch(request(idx))

        imgService.getImg(idx)
            .then(
                img => {
                    dispatch(success(img));
                    // history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    // dispatch(alertActions.error(error));
                }
            )

        function request(idx: number) {
            return {type: imgConstants.GET_IMAGE_REQUEST, idx}
        }

        function success(img: any) {
            return {type: imgConstants.GET_IMAGE_SUCCESS, img}
        }

        function failure(error: any) {
            console.log("ERROR LOGIN: error=", error);
            return {type: imgConstants.GET_IMAGE_FAILURE, error}
        }
    };



export const imgActions = {
    getImg
}