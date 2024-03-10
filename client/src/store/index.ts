import {configureStore} from '@reduxjs/toolkit'
import moviesReducer from './movieSlice';
import actorReducer from './actorSlice';
import authReducer from './authSlice';
import { apiSlice } from './apiSlice';
import { adminApi } from './adminApi';

const store = configureStore({
    reducer: {
      [adminApi.reducerPath]: adminApi.reducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
      movies: moviesReducer,
      actors: actorReducer,
      auth: authReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(
      apiSlice.middleware, 
      adminApi.middleware,
    ),
    devTools: true,
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 