import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../_helpers/store.helper";
import {imgSlice} from "./img.reducer";

export interface ContentText {
    title: string
    description: string
}

export interface InfoState {
    content: ContentText[]
    error: string
    loading: boolean
}

const initialState: InfoState = {
    content: [],
    error: '',
    loading: false
}

export const infoSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {
        setLoading: (state, {payload}: PayloadAction<boolean>) => {
            state.loading = payload
        },

        setErrors: (state, {payload}: PayloadAction<string>) => {
            state.error = payload
            state.loading = false
        },

        setContent: (state, {payload}: PayloadAction<ContentText[]>) => {
            state.content = payload
            state.loading = false
        },

        addInfo: (state, {payload}: PayloadAction<ContentText>) => {
            state.content.push(payload)
            state.loading = false
        }
    }
})

export const {setLoading, setErrors, setContent, addInfo} = infoSlice.actions

export const selectInfoLoading = (state: RootState) => state.info.loading
export const selectContentText = (state: RootState) => state.info.content;

export default infoSlice.reducer