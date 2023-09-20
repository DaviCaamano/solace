import { loginEndpoint } from '@context/redux/api/user/index';
import { apiSlice } from '@context/redux/api';
import { ReduxQueryBuilder } from '#interfaces/redux';

type UserTags = 'User' | 'Note';
export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder: ReduxQueryBuilder<UserTags>) => ({
    login: loginEndpoint(builder),
  }),
});

export const { useLoginMutation } = userSlice;
