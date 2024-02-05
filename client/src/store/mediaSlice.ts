import { IMedia } from './../types/media';
import {createSlice} from '@reduxjs/toolkit'

type MediaState = {
    list: IMedia[]
}
const initialState: MediaState = {
    list: []
}

const mediaSlice = createSlice({
    name: 'media',
    initialState,
    reducers: {
        addMedia(state, action) {
            
        }
    }
});

export default mediaSlice.reducer