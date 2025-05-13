// store/Store.ts
import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './coursesSlice';
import Userseducer from './userSlice';

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    user: Userseducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
