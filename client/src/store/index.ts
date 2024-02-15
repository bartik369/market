import {configureStore} from '@reduxjs/toolkit'
import moviesReducer from './movieSlice';
import actorReducer from './actorSlice';

const store = configureStore({
    reducer: {
      movies: moviesReducer,
      actors: actorReducer,
    },
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 