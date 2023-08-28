import { LoginResponse, NewUser, User } from '#interfaces/user';
import { HttpMethod } from '#interfaces/http';
import { transformErrorResponse } from '@utils/redux';

export const loginEndpoint = (builder: ReduxEndpoint) =>
  builder.mutation<User[], void>({
    query: (user: NewUser) => ({
      url: '/user/login',
      method: HttpMethod.post,
      body: user,
    }),
    transformResponse: (resp: LoginResponse): User | null => {
      return resp?.user;
    },
    transformErrorResponse: transformErrorResponse,
    invalidatesTags: [{ type: 'User' }, { type: 'Note', id: 'LIST' }],
  });
