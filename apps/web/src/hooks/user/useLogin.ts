import {
  UserProfile,
  useUser as useAuthZeroUser,
} from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';
import { useLoginMutation } from '@context/redux/user';
import { User } from '#interfaces/user/user.interface';

interface useLoginResponse {
  isLoading: boolean;
  error: string | undefined;
  user: User | undefined;
}
export const useLogin = (): useLoginResponse => {
  const {
    user: authZeroUser,
    error: authZeroError,
    isLoading: authZeroIsLoading,
  } = useAuthZeroUser();

  const [login, { data: user, error, isLoading, isSuccess }] =
    useLoginMutation?.({
      fixedCacheKey: 'login',
    });

  useEffect(() => {
    if (authZeroUser && user && detectUserChange(user, authZeroUser)) {
      login({
        zeroId: authZeroUser.sub as string,
        email: authZeroUser.email as string,
        name: authZeroUser.name || undefined,
        nickname: authZeroUser.nickname || undefined,
        picture: authZeroUser.picture || undefined,
      }).unwrap();
    }
  }, [authZeroUser, login, user]);

  return {
    isLoading: authZeroIsLoading || isLoading,
    user: isSuccess ? (user as User) : undefined,
    error: (authZeroError?.message ||
      authZeroError ||
      (error as Error)?.message ||
      error) as string | undefined,
  };
};

const detectUserChange = (user?: User, authZeroUser?: UserProfile): boolean => {
  const validAuthZeroUser = authZeroUser?.email && authZeroUser?.sub;
  const userLoggedIn = validAuthZeroUser && !user;
  const userUpdated =
    user &&
    authZeroUser?.email &&
    (user.name !== authZeroUser.name ||
      user.email !== authZeroUser.email ||
      user.nickname !== authZeroUser.nickname ||
      user.picture !== authZeroUser.picture);
  return !!validAuthZeroUser && (userLoggedIn || !!userUpdated);
};
