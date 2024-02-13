import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Action } from '@remix-run/router';
import axios from "axios";
import ENV from "../env.config";
import { IMovie } from "../types/media";

type MovieState = {
    list: IMovie[];
    loading: boolean;
    error: null | string;
};

const initialState:MovieState = {
    list: [],
    loading: false,
    error: null,
};

export const getMovies = createAsyncThunk <IMovie[], undefined,{rejectValue: String}>('movie/getMovie',
async function(_, {rejectWithValue}) {
    const response = await axios.get(`${ENV.API_URL}api/movies`);
    
    if (!response.data) {
        return rejectWithValue('server error')
    }
    return response.data
}
)

export const createMovie = createAsyncThunk<IMovie, any, {rejectValue: String}>('movie/createMovie',
async function(movieData, {rejectWithValue}) {
    const response = await axios.post(`${ENV.API_URL}api/add-actor`, movieData, {
        headers: {'Content-Type': 'application/json'},
    });
    
    if (!response.data) {
        return rejectWithValue('server error')
    }
    return await response.data
}
)

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(getMovies.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(getMovies.fulfilled, (state, action) => {
            state.list = action.payload;
            state.loading = false;
        })
        .addCase(createMovie.pending, (state) => {
            state.error = null
        })
        .addCase(createMovie.fulfilled, (state, action) => {
            state.list.push(action.payload)
        })
    }
})
export default movieSlice.reducer