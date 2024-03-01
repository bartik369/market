import { 
    IMovie, 
    ISearch, 
    IMovieRatind, 
    IMovieAddFavorite, 
    IMovieFavorites, 
    IExistFavorite } from './../types/media';
import { createSlice, PayloadAction, createAsyncThunk, AnyAction} from '@reduxjs/toolkit';
import axios from "axios";
import ENV from "../env.config";
import { Action } from '@remix-run/router';

type MovieState = {
    list: IMovie[];
    favorites: string[]
    search: IMovie[];
    loading: boolean;
    error: null | string;
};

const initialState:MovieState = {
    list: [],
    favorites: [],
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
    'movie/searchMovie',
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
export const setRating = createAsyncThunk<unknown, IMovieRatind, {rejectValue: String}>(
    'movie/setRating',
    async function(ratingData, {rejectWithValue}) {
        const res = await axios.post(`${ENV.API_URL}api/set-rating`, ratingData, {
            headers: { 'Content-Type': 'application/json'},
        });
        
        if (!res) {
            return rejectWithValue('server error')
        }
        return res.data
    }
)
export const addFavorite = createAsyncThunk<unknown, IMovieAddFavorite, {rejectValue: String}>(
    'movie/addFavorite',
    async function(ratingData, {rejectWithValue}) {
        const res = await axios.post(`${ENV.API_URL}api/add-favorite`, ratingData, {
            headers: { 'Content-Type': 'application/json'},
        });
        
        if (!res) {
            return rejectWithValue('server error')
        }
        return res.data
    }
)
export const getFavorites = createAsyncThunk<IMovieFavorites, IExistFavorite, {rejectValue: String}>(
    'movie/getFavorites',
    async function(id, {rejectWithValue}) {
        const res = await axios.post(`${ENV.API_URL}api/favorites`, id, {
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
        },
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
        .addCase(getFavorites.fulfilled, (state, action) => {
            state.favorites = action.payload.movies
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