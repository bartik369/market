import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISlider } from "../types/media";
import { IUser } from "../types/auth";
import ENV from "../env.config";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: ENV.API_URL }),
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => ({
        url: "/api/users",
        method: "GET",
      }),
    }),
    getMoviesCount: builder.query<number, void>({
      query: () => ({
        url: "/api/movies-count",
        method: "GET",
      }),
    }),
    addSlide: builder.mutation<undefined, any>({
      query: (data) => ({
        url: "/api/add-slide",
        method: "POST",
        body: data,
      }),
    }),
    getSlides: builder.query<ISlider[], void>({
        query:() => ({
            url:'/api/get-slides',
            method: 'GET'
        })
    })
  }),
});
export const { 
    useGetUsersQuery, 
    useGetMoviesCountQuery, 
    useAddSlideMutation,
    useGetSlidesQuery,
 } =
  adminApi;
