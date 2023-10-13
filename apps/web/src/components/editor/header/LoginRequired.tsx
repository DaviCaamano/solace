import Link from 'next/link';
import { PropsWithChildren } from 'react';

export interface LoginRequiredProps extends PropsWithChildren {
  isLoggedIn: boolean | undefined;
}

export const LoginRequired = ({ children, isLoggedIn }: LoginRequiredProps) => {
  if (!isLoggedIn) {
    return (
      <Link href={'/api/auth/login'} className={'login-required cursor-pointer'}>
        {children}
      </Link>
    );
  }
  return children;
};
