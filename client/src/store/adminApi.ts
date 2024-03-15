import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISlider, ISliderUpdate } from "../types/media";
import { IUser } from "../types/auth";
import ENV from "../env.config";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: ENV.API_URL }),
  tagTypes: ['Slides'],
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
    getSlides: builder.query<ISlider[], void>({
      query:() => ({
          url:'/api/get-slides',
          method: 'GET'
      }),
      providesTags: (result) =>
      result
        ? [
            ...result.map(({ _id }) => ({ type: 'Slides' as const, _id })),
            { type: 'Slides', _id: 'LIST' },
          ]
        : [{ type: 'Slides', _id: 'LIST' }],
  }),
    addSlide: builder.mutation<ISlider, any>({
      query: (data) => ({
        url: "/api/add-slide",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['Slides'],
    }),
    getSlide: builder.mutation<ISliderUpdate, string>({
      query: (id) => ({
        url:`/api/get-slide/`,
        method: 'POST',
        body: {id: id}
      })
    }),
    deleteSlide: builder.mutation<ISlider, string>({
      query:(id) => ({
        url:'/api/delete-slide',
        method:'DELETE',
        body: {id: id}
      }),
      invalidatesTags: ['Slides'],
    }),
    updateSide: builder.mutation<ISlider, any>({
      query:(body) => ({
        url: '/api/update-slide',
        method: 'PUT',
        body: body,
      }),
      transformResponse: (response: { data: ISlider }, meta, arg) => response.data
    })
  }),
});
export const { 
    useGetUsersQuery, 
    useGetMoviesCountQuery, 
    useAddSlideMutation,
    useGetSlidesQuery,
    useGetSlideMutation,
    useDeleteSlideMutation,
    useUpdateSideMutation,
 } =
  adminApi;
