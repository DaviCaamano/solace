import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginResponse, User } from '#interfaces/user/user.interface';

export const authApi = createApi({
  reducerPath: 'api/auth',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/auth',
  }),
  tagTypes: [],
  endpoints: (builder: ReduxEndpoint) => ({
    login: builder.mutation<LoginResponse, User | null>((user: User) => ({
      url: '/login',
      method: HttpMethod.post,
      data: user,
    })),
  }),
});

export type UseLoginMutation = () => [
  login: (user: User) => Promise<LoginResponse>,
  result: LoginResponse,
];
const useLoginMutation: UseLoginMutation = authApi.useLoginMutation;

const {
  useLoginQuery,
  /** Login User */
  login,
  useLazyLoginQuery,
} = authApi;

export {
  useLoginQuery,
  /** Login User */
  login,
  useLazyLoginQuery,
  useLoginMutation,
};
