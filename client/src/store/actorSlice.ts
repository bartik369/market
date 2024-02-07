import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
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
    const response = await axios.get('api/actors')
    
    if (!response.data) {
        return rejectWithValue('sever error')
    }
    return response.data
}
)

export const addActor = createAsyncThunk<IActor, string, {rejectValue: string}>('actors/createActor',
    async function(text, {rejectWithValue, dispatch}) {
        const actor = {
            id: '',
            name: text,
            surname: text,
            picture: text,
            link: text,
        };
        const response = await axios.post('api/add-actor', {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(actor)
        });

        if (!response) {
            return 
        }
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
            state.loading = false
        })
    }
});

export default actorSlice.reducer