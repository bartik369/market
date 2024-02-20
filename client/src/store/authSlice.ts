import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import ENV from '../env.config';
import { IAuthData, IUser } from '../types/auth';

type AuthState = {
    user: IUser;
    token: string | null;
    error: string | null;
    success: boolean;
}

const initialState: AuthState = {
    user: {
        email: '',
        password: ''
    },
    token: null,
    error: null,
    success: false,
}



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

    }
});

export default authSlice.reducer