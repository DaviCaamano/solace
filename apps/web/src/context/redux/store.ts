import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '@context/redux/api';
import { setupListeners } from '@reduxjs/toolkit/query';
import { editorSlice } from '@context/redux/editor/editor';
import { saveEditToCookieMiddleware } from '@context/redux/editor/save-edit-to-cookie.middleware';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    editor: editorSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(saveEditToCookieMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
