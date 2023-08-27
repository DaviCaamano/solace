import { UserProfile } from '@auth0/nextjs-auth0/client';
import { useUser } from '@auth0/nextjs-auth0/dist/client';
import { useEffect, useState } from 'react';
import { useLoginMutation } from '@services/api/redux';
import { User } from '#interfaces/user/user.interface';

interface useLoginResponse {
  isLoading: boolean;
  error: Error;
  user: User;
}
export const useLogin = (): useLoginResponse => {
  const {
    user: authZeroUser,
    error: authZeroError,
    isLoading: authZeroIsLoading,
  } = useUser();
  const [login, user] = useLoginMutation();

  const [isLoading, setIsLoading] = useState<boolean>(authZeroIsLoading);
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    if (detectUserChange(user.current, authZeroUser)) {
      setIsLoading(true);
      login(authZeroUser)
        .then(() => {
          setIsLoading(false);
          setError(undefined);
        })
        .catch((error: any) => {
          setIsLoading(false);
          setError(error);
        });
    }
  }, [authZeroUser, login, user]);

  return {
    isLoading: authZeroIsLoading || isLoading,
    user,
    error: authZeroError || error,
  };
};

const detectUserChange = (user?: User, authZeroUser?: UserProfile): boolean => {
  const userLoggedIn = authZeroUser && !user;
  const userUpdated =
    user &&
    authZeroUser &&
    (user.name !== authZeroUser.name ||
      user.email !== authZeroUser.email ||
      user.nickname !== authZeroUser.nickname ||
      user.picture !== authZeroUser.picture);
  return userLoggedIn || userUpdated;
};
