import { configureStore } from '@reduxjs/toolkit';
import boards from './slices/boardSlices';

export const store = configureStore({
  reducer: {
    boards,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
