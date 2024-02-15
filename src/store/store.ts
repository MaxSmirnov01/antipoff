import { configureStore } from '@reduxjs/toolkit';
import { api } from '../api/api';
import userReduser from './userSlice';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    userAvatar: userReduser,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
