import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '@context/redux/api/api.slice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { saveEditToLocalStorageMiddleware } from '@context/redux/editor/save-edit-to-local-storage.middleware';
import { editorSlice } from '@context/redux/editor';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    editor: editorSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware).concat(saveEditToLocalStorageMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
