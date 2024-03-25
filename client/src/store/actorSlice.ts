import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import ENV from '../env.config';
import * as contentConst from '../utils/constants/content';
import { IActor} from '../types/media';

type ActorState = {
    list: IActor[];
    loading: boolean;
    error: null | string;
};
const initialState: ActorState = {
    list: [],
    loading: false,
    error: null,
};

export const getActors = createAsyncThunk<IActor[], undefined, {rejectValue: String}>('actors/getActors',
async function(_, {rejectWithValue}) {
    const response = await axios.get(`${ENV.API_URL}${ENV.API_ACTORS}`);
    
    if (!response.data) {
        return rejectWithValue(contentConst.serverError);
    }
    return response.data;
});

export const getMovieActors = createAsyncThunk<IActor[], string[], {rejectValue: String}>('actors/getMovieActors',
async function(data, {rejectWithValue}) {
    const response = await axios.post(`${ENV.API_URL}${ENV.API_MOVIE_ACTORS}`, data);
 
    if (!response.data) {
        return rejectWithValue(contentConst.serverError);
    }
    return response.data;
});

export const addActor = createAsyncThunk<IActor, any, {rejectValue: string}>(
    'actors/createActor',
    async function(formData, {rejectWithValue}) {
        const response = await axios.post(`${ENV.API_URL}${ENV.API_ADD_ACTOR}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data'},
        });

        if (!response) {
            return rejectWithValue(contentConst.serverError);
        }
        return await response.data;
    });

const actorSlice = createSlice({
    name: 'actor',
    initialState,
    reducers: {

    }, 
    extraReducers: (builder) => {
        builder
        .addCase(getActors.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getActors.fulfilled, (state, action) => {
            state.list = action.payload;
            state.loading = false;
        })
        .addCase(addActor.pending, (state) => {
            state.error = null;
        })
        .addCase(addActor.fulfilled, (state, action) => {
            state.list.push(action.payload)
        })
        .addCase(getMovieActors.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getMovieActors.fulfilled, (state, action) => {
            state.list = action.payload;
            state.loading = false;
        })
    }
});

export default actorSlice.reducer