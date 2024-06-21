import { configureStore } from '@reduxjs/toolkit';
import { podcastsReducer } from './podcastsReducer';

export const store = configureStore({
  reducer: {
    podcastsReducer: podcastsReducer,
  },
});
