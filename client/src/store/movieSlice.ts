import { IMovie, ISearch } from './../types/media';
import { createSlice, PayloadAction, createAsyncThunk, AnyAction} from '@reduxjs/toolkit';
import axios from "axios";
import ENV from "../env.config";

type MovieState = {
    list: IMovie[];
    search: IMovie[];
    loading: boolean;
    error: null | string;
};

const initialState:MovieState = {
    list: [],
    search: [],
    loading: false,
    error: null,
};

export const getMovie = createAsyncThunk<IMovie, string>('movie/getMovie', 
async function(id,{rejectWithValue}) {
    const res = await axios.get(`${ENV.API_URL}api/movie/${id}`)

    if (!res.data) {
        return rejectWithValue('server error')
    }
    // return response.data
    return (await res.data) as IMovie
}
)

export const getMovies = createAsyncThunk <IMovie[], undefined,{rejectValue: String}>('movie/getMovies',
async function(_, {rejectWithValue, dispatch}) {
    const res = await axios.get(`${ENV.API_URL}api/movies`);
    
    if (!res.data) {
        return rejectWithValue('server error')
    }
    return res.data
}
)


export const createMovie = createAsyncThunk<IMovie, any, {rejectValue: String}>(
'movie/createMovie',
async function(movieData, {rejectWithValue}) {
    const res = await axios.post(`${ENV.API_URL}api/add-movie`, movieData, {
        headers: { 'Content-Type': 'multipart/form-data'},
    });
    
    if (!res.data) {
        return rejectWithValue('server error')
    }
    return res.data
}
)
export const searchMovie = createAsyncThunk<IMovie[], ISearch, {rejectValue: String}>(
    'movie/searchMovi',
    async function(searchRequest, {rejectWithValue}) {
        const res = await axios.post(`${ENV.API_URL}api/search-movie`, searchRequest, {
            headers: { 'Content-Type': 'application/json'},
        });
        
        if (!res) {
            return rejectWithValue('server error')
        }
        return res.data
    }
)

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        deleteSearch: (state, action) => {
            state.search = action.payload;
            state.loading = false;
        }
    },
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
        .addCase(searchMovie.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(searchMovie.fulfilled, (state, action) => {
            state.search = action.payload;
            state.loading = false;
        })
        .addMatcher(isError, (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})
export default movieSlice.reducer;
export const {deleteSearch} = movieSlice.actions

const isError = (action:AnyAction) => {
    return action.type.endsWith('rejected')
}