import { RootState } from './index';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError} from '@reduxjs/toolkit/query'
import { setCredentials, logOut } from "./authSlice";
import ENV from "../env.config";


const baseQuery = fetchBaseQuery({
    baseUrl: ENV.API_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token
        console.log(token)

        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        } else {
        }
        return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {

    // try to get a new token
    const refreshResult = await baseQuery('/refreshToken', api, extraOptions)

    if (refreshResult .data) {
      // store the new token
      api.dispatch(setCredentials(refreshResult.data))
      // retry the initial query
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logOut(null))
    }
  }
  return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({
      
    })
});