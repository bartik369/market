import {configureStore} from '@reduxjs/toolkit'
import mediaReducer from './mediaSlice';
import actorReducer from './actorSlice';

const store = configureStore({
    reducer: {
      media: mediaReducer,
      actors: actorReducer,
    },
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 