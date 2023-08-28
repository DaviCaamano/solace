import { LoginResponse, NewUser, User } from '#interfaces/user';
import { HttpMethod } from '#interfaces/http';

export const loginEndpoint = (builder: ReduxEndpoint) =>
  builder.mutation<User[], void>({
    query: (user: NewUser) => ({
      url: '/user/login',
      method: HttpMethod.post,
      body: user,
    }),
    transformResponse: ({
      data,
    }: FetchResponse<LoginResponse>): User | null => {
      return data?.user;
    },
    invalidatesTags: [{ type: 'User' }, { type: 'Note', id: 'LIST' }],
  });
