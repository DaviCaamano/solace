import { configureStore } from '@reduxjs/toolkit';
import { reducer as userSlice } from '@context/redux/slices/user.redux.slice';
import { authApi } from '@services/api/redux';

export function makeStore() {
  return configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      user: userSlice,
    },
  });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
