import {createSlice, PayloadAction, createAsyncThunk, AnyAction} from '@reduxjs/toolkit';
import axios from 'axios';
import ENV from '../env.config';
import { IAuthData, IUser } from '../types/auth';

type AuthState = {
    user: IUser;
    token: string | null;
    error: string | null;
    success: boolean;
    loading:boolean;
}

const initialState: AuthState = {
    user: {
        email: '',
        password: ''
    },
    token: null,
    error: null,
    success: false,
    loading: false,
}

export const createUser = createAsyncThunk<IUser, IUser, {rejectValue: string}>(
    'users/createUser',
    async function (userData, {rejectWithValue}) {
        console.log(userData)
        try {
        const res = await axios.post(`${ENV.API_URL}api/create-user/`, userData, {
            headers: { 'Content-Type': 'application/json'},
        });
        return res.data 
        } catch (error: any) {
           
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            } 
        }
    });



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(createUser.pending, (state) => {

        })
        .addMatcher(isError, (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
});

export default authSlice.reducer
const isError = (action:AnyAction) => {
    return action.type.endsWith('rejected')
}