import userConstants from "../constants/UserConstants";
import imgConstants from "../constants/ImgConstants";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "./auth.reducer";
import {RootState} from "../_helpers/store.helper";

export interface ImgState {
    loading: boolean
    images: string[]
    error: string
}

const initialState: ImgState = {
    loading: false,
    images: [],
    error: ''
}

export const imgSlice = createSlice({
    name: 'img',
    initialState,
    reducers: {
        setLoading: (state, {payload}: PayloadAction<boolean>) => {
            state.loading = payload
        },

        setErrors: (state, {payload}: PayloadAction<string>) => {
            state.error = payload
            state.loading = false
        },

        setImages: (state, {payload}: PayloadAction<any>) => {
            state.images = payload
            state.loading = false
        },

        addImg: (state, {payload}: PayloadAction<any>) => {
            state.images.push(payload)
            state.loading = false
        }
    }
})

export const {setLoading, setErrors, setImages, addImg} = imgSlice.actions

export const selectImgLoading = (state: RootState) => state.img.loading
export const selectImgUri = (state: RootState) => state.img.images

export default imgSlice.reducer
