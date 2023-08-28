import {
  UserProfile,
  useUser as useAuthZeroUser,
} from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';
import { User } from '#interfaces/user/user.interface';
import { useLoginMutation } from '@context/redux/user';

interface useLoginResponse {
  isLoading: boolean;
  error: Error | undefined;
  user: User | undefined;
}
export const useLogin = (): useLoginResponse => {
  const {
    user: authZeroUser,
    error: authZeroError,
    isLoading: authZeroIsLoading,
  } = useAuthZeroUser();
  const [login, { user }] = useLoginMutation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    if (authZeroUser && detectUserChange(user, authZeroUser)) {
      setIsLoading(true);
      login({
        zeroId: authZeroUser.sub,
        email: authZeroUser.email,
        name: authZeroUser.name,
        nickname: authZeroUser.nickname,
        picture: authZeroUser.picture,
      })
        .then((resp) => {
          setIsLoading(false);
          setError(undefined);
          return resp;
        })
        .catch((error: any) => {
          setIsLoading(false);
          setError(error);
        });
    }
  }, [authZeroUser, login, user]);

  return {
    isLoading: authZeroIsLoading || isLoading,
    user: undefined,
    error: authZeroError || error,
  };
};

const detectUserChange = (user?: User, authZeroUser?: UserProfile): boolean => {
  const validAuthZeroUser = authZeroUser?.email && authZeroUser?.sub;
  const userLoggedIn = validAuthZeroUser && !user;
  const userUpdated =
    user?.email &&
    authZeroUser?.email &&
    (user.name !== authZeroUser.name ||
      user.email !== authZeroUser.email ||
      user.nickname !== authZeroUser.nickname ||
      user.picture !== authZeroUser.picture);
  return !!validAuthZeroUser && (userLoggedIn || !!userUpdated);
};
