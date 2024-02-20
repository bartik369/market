import {configureStore} from '@reduxjs/toolkit'
import moviesReducer from './movieSlice';
import actorReducer from './actorSlice';
import authSlice from './authSlice';

const store = configureStore({
    reducer: {
      movies: moviesReducer,
      actors: actorReducer,
      auth: authSlice,
    },
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 