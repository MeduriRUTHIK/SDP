'use client';
import { configureStore } from '@reduxjs/toolkit';
// apislice
import { apiSlice } from './features/api/apiSlice';
import authSlice from './features/auth/authSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

// call the load user function on every page load
const instializeApp = async () => {
  // await store.dispatch(apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true }));
  await store.dispatch(apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true }));
};

instializeApp();
