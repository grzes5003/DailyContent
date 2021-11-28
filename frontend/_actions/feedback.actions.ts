import {ThunkAction} from "redux-thunk";
import {RootState} from "../types";
import {AnyAction} from "redux";
import {feedbackService} from "../_services/feedback.service";
import {setErrors} from "../_reducers/img.reducer";


const likeContent = (idx: number): ThunkAction<void, RootState, unknown, AnyAction> =>
    async dispatch => {
        console.log('like dispatch!')
        feedbackService.likeContent(idx)
            .catch(error => dispatch(setErrors(error)))
    };


const dislikeContent = (idx: number): ThunkAction<void, RootState, unknown, AnyAction> =>
    async dispatch => {
        console.log('dislike dispatch!')
        feedbackService.dislikeContent(idx)
            .catch(error => dispatch(setErrors(error)))
    };


export const feedbackActions = {
    likeContent,
    dislikeContent
}



