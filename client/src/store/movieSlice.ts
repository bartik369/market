import { IMovie } from './../types/media';
import { createSlice, PayloadAction, createAsyncThunk, AnyAction} from '@reduxjs/toolkit';
import axios from "axios";
import ENV from "../env.config";

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

export const getMovie = createAsyncThunk<IMovie, string>('movie/getMovie', 
async function(id,{rejectWithValue}) {
    const response = await axios.get(`${ENV.API_URL}api/movie/${id}`)

    if (!response.data) {
        return rejectWithValue('server error')
    }
    // return response.data
    return (await response.data) as IMovie
}
)

export const getMovies = createAsyncThunk <IMovie[], undefined,{rejectValue: String}>('movie/getMovies',
async function(_, {rejectWithValue, dispatch}) {
    const response = await axios.get(`${ENV.API_URL}api/movies`);
    
    if (!response.data) {
        return rejectWithValue('server error')
    }
    return response.data
}
)


export const createMovie = createAsyncThunk<IMovie, any, {rejectValue: String}>(
'movie/createMovie',
async function(movieData, {rejectWithValue}) {
    const response = await axios.post(`${ENV.API_URL}api/add-movie`, movieData, {
        headers: { 'Content-Type': 'multipart/form-data'},
    });
    
    if (!response.data) {
        return rejectWithValue('server error')
    }
    return response.data
}
)

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getMovies.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getMovies.fulfilled, (state, action) => {
            state.list = action.payload;
            state.loading = false;
        })
        .addCase(createMovie.pending, (state) => {
            state.error = null;
        })
        .addCase(createMovie.fulfilled, (state, action) => {
            state.list.push(action.payload)
        })
        .addMatcher(isError, (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})
export default movieSlice.reducer;

const isError = (action:AnyAction) => {
    return action.type.endsWith('rejected')
}