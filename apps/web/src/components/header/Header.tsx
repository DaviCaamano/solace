import Link from 'next/link';
import { UserMenu } from '@components/header/index';
import { ReactNode, useEffect, useState } from 'react';
import { useLogin } from '@hooks/user';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const Header = () => {
  const { isLoading, error, user } = useLogin();
  return (
    <HeaderBar>
     <UserMenu loggedIn={!!user?.id} />
      <ErrorMessage error={error} />
      <LoadingLink show={isLoading} />
      <LoginLink show={!error && !user && !isLoading} />
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

const LoginLink = ({ show }: { show: boolean }) => (
  <Link href={'/api/auth/login'}>
    <span
      className={`absolute right-5 text-xl text-latte hover:underline fade_7 ${!show && 'fadeOut pointer-events-none'}`}
    >
      Login
    </span>
  </Link>
);

const LoadingLink = ({ show }: { show: boolean }) => {
  const [ready, setReady] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => setReady(true), 1500);
  });
  return (
    <span
      className={`absolute right-5 text-xl text-disabledText hover:underline cursor-none fade_7 ${
        !ready || !show ? 'fadeOut pointer-events-none' : 'opacity-50'
      }`}
    >
      Loading...
    </span>
  );
};
