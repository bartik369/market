import { IUser } from '../types/auth';
import { apiSlice } from "./apiSlice";
import { setCredentials } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
    endpoints: builder =>({
        signupUser:builder.mutation({
            query: credentials => ({
                url: 'api/create-user/',
                method: 'POST',
                body: {...credentials}
            }),
            transformResponse:(result: {data: {user: IUser}}) => 
            result.data.user
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
                url: 'api/logout',
                credentials: 'include',
            })
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
        profileUser: builder.query<IUser, string>({
            query: (id) => ({
                url: `api/profile/${id}`,
                credentials: 'include',
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