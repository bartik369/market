import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import ENV from "../env.config";
import { IActor } from "../types/media";

type ActorState = {
    list: IActor[];
    loading: boolean;
    error: null | string;
}
const initialState: ActorState = {
    list: [],
    loading: false,
    error: null,
};

export const fetchActors = createAsyncThunk<IActor[], undefined, {rejectValue: String}>('actors/fetchActors',
async function(_, {rejectWithValue}) {
    const response = await axios.get(`${ENV.API_URL}api/actors`)
    
    if (!response.data) {
        return rejectWithValue('sever error')
    }
    return response.data
}
)

export const addActor = createAsyncThunk<IActor, IActor, {rejectValue: string}>(
    'actors/createActor',
    async function(data, {rejectWithValue}) {
        const actor = {
            id: '',
            name: data.name,
            surname: data.surname,
            picture: data.picture,
            link: data.link,
        };

        const response = await axios.post(`${ENV.API_URL}api/add-actor`, actor, {
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response) {
            return rejectWithValue('cant add task, there is some error')
        }
        return await response.data
    }
)

const actorSlice = createSlice({
    name: 'actor',
    initialState,
    reducers: {

    }, 
    extraReducers: (builder) => {
        builder
        .addCase(fetchActors.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchActors.fulfilled, (state, action) => {
            state.list = action.payload;
            state.loading = false;
        })
        .addCase(addActor.pending, (state) => {
            state.error = null;
        })
        .addCase(addActor.fulfilled, (state, action) => {
            state.list.push(action.payload)
        })
    }
});

export default actorSlice.reducer