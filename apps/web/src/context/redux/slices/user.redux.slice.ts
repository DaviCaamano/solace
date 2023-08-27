import { createSlice } from '@reduxjs/toolkit';
import { User } from '#interfaces/user/user.interface';
import { PayloadAction } from '@reduxjs/toolkit/src/createAction';

export const userSlice = createSlice<User | null, any, 'user'>({
  name: 'user',
  initialState: null,
  reducers: {
    login: {
      reducer: (prev: User, { payload: current }: PayloadAction<User>) => {
        return current || prev || null;
      },
      prepare: (user: User): PreparedAction<User> => ({
        payload: user,
      }),
    },
    logout: {
      reducer: () => null,
      prepare: () => null,
    },
  },
});

export const { reducer } = userSlice;
