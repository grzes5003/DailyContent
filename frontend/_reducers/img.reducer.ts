import userConstants from "../constants/UserConstants";
import imgConstants from "../constants/ImgConstants";


export function images(state = {images: Blob}, action: { type: any; image: any; error: any; }) {
    switch (action.type) {
        case imgConstants.GET_IMAGE_REQUEST:
            return {
                images: state.images,
                loading: true
            };
        case imgConstants.GET_IMAGE_SUCCESS:
            return {
                // images: [...state.images, action.image]
                images: state.images
            };
        case imgConstants.GET_IMAGE_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}