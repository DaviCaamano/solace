import { loginEndpoint } from '@context/redux/user';
import { apiSlice } from '@context/redux/api';
import { ReduxQueryBuilder, UseMutationHook } from '#interfaces/redux';
import { NewUser, User } from '#interfaces/user';
import { LoginDto } from '~user/dto';

type UserTags = 'User' | 'Note';
export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder: ReduxQueryBuilder<UserTags>) => ({
    login: loginEndpoint(builder),
  }),
});

/** Manually Typing Hooks for Intellij incompatibility with Redux Toolkit Query */
export const useLoginMutation = userSlice.endpoints.login
  .useMutation as UseMutationHook<LoginDto, User | null, UserTags>;
