import { IUser } from '../types/auth';
import { apiSlice } from "./apiSlice";
import { createApi } from '@reduxjs/toolkit/query';
import { logOut, setCredentials } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
    endpoints: builder =>({
        signupUser:builder.mutation({
            query: credentials => ({
                url: 'api/create-user/',
                method: 'POST',
                body: {...credentials}
            }),
        }),
        signinUser:builder.mutation({
            query: credentials => ({
                url: 'api/auth/',
                method: 'POST',
                body: {...credentials},
                credentials: 'include',
            })
        }),
        logoutUser: builder.mutation<void, void>({
            query: () => ({
                url: 'api/logout/',
                method: 'POST',
                credentials: 'include',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    dispatch(logOut(null))
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        refresh: builder.mutation({
            query:() => ({
                url: 'api/refresh-token/',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log(data)
                    const { accessToken } = data
                    dispatch(setCredentials({ accessToken }))
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        profileUser: builder.query({
            query: (id) => ({
                url: `api/profile/${id}`,
                method: 'GET'
            }),
        }),
        

    })
});

export const {
    useSigninUserMutation, 
    useSignupUserMutation,
    useLogoutUserMutation,
    useProfileUserQuery,
    useRefreshMutation,
} = authApi;