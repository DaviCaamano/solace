import {
  UserProfile,
  useUser as useAuthZeroUser,
} from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';
import { User } from '#interfaces/user/user.interface';
import { useLoginMutation } from '@context/redux/user';

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
    useLoginMutation();

  useEffect(() => {
    if (authZeroUser && detectUserChange(user, authZeroUser)) {
      login({
        zeroId: authZeroUser.sub,
        email: authZeroUser.email,
        name: authZeroUser.name,
        nickname: authZeroUser.nickname,
        picture: authZeroUser.picture,
      }).unwrap();
    }
  }, [authZeroUser, login, user]);

  return {
    isLoading: authZeroIsLoading || isLoading,
    user: isSuccess ? (user as User) : undefined,
    error: authZeroError || error,
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
