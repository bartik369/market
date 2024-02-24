import {createSlice, PayloadAction, createAsyncThunk, AnyAction} from '@reduxjs/toolkit';
import { createUser, authUser, checkValidToken} from './actions/authActions';
import axios from 'axios';
import ENV from '../env.config';
import { IUser} from '../types/auth';

type AuthState = {
    user: IUser;
    token: string | null;
    error: string | null;
    success: boolean;
    loading:boolean;
}

const initialState: AuthState = {
    user: {
        _id: '',
        email: '',
        roles: [],
        member: [],
    },
    token: null,
    error: null,
    success: false,
    loading: false,
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials:(state, action) => {
            const {user, token} = action.payload
            state.user = user;
            state.token = token;
        },
        logOut:(state, action) => {
            // state.user = {email: '', password: ''}
            state.token = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(authUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(authUser.fulfilled, (state, {payload}) => {
            state.token = payload.token;
            state.user = payload.user;
            state.success = true;
        })
        .addMatcher(isError, (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
});

export default authSlice.reducer
export const  {setCredentials, logOut} = authSlice.actions;
export const selectCurrenttUser = (state: AuthState) => state.user;
export const selectCurrentToken = (state: AuthState) => state.token;

const isError = (action:AnyAction) => {
    return action.type.endsWith('rejected')
}