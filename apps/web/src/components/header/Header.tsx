import { LoginLink } from './LoginLink';
import { UserMenu } from './UserMenu';
import { ReactNode } from 'react';
import { useLogin } from '@hooks/user';

export const Header = () => {
  const { isLoading, isLoggedOut, error } = useLogin();

  return (
    <HeaderBar>
      <UserMenu loggedIn={!isLoading && !isLoggedOut} />
      <ErrorMessage error={error} />
      <LoginLink show={!isLoading && isLoggedOut} />
    </HeaderBar>
  );
};

const HeaderBar = ({ children, className }: { children?: ReactNode; className?: string }) => (
  <div id={'header'} className={'w-full h-20 flex flex-col items-end justify-start pt-4 pr-12 ' + className}>
    {children}
  </div>
);

const ErrorMessage = ({ error }: { error?: string }) => (
  <span className={`absolute right-5 fade_7 ${!error && 'fadeOut pointer-events-none'}`}>{error}</span>
);
