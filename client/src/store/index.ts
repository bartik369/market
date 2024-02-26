import {configureStore} from '@reduxjs/toolkit'
import moviesReducer from './movieSlice';
import actorReducer from './actorSlice';
import authReducer from './authSlice';
import { apiSlice } from './apiSlice';

const store = configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      movies: moviesReducer,
      actors: actorReducer,
      auth: authReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 