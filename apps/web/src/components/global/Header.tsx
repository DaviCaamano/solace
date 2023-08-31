import Link from 'next/link';
import { capitalize } from '#utils/string';
import { UserMenu } from '@components/header';
import { ReactNode, useEffect, useState } from 'react';
import { useLogin } from '@hooks';

export const Header = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { isLoading, error, user } = useLogin();

  return (
    <HeaderBar>
      <ErrorMessage error={error} />
      <Greeting name={user?.name} setOpen={setOpen} />
      <LoadingLink show={isLoading} />
      <LoginLink show={!error && !user && !isLoading} />
      <UserMenu open={open} setOpen={setOpen} />
    </HeaderBar>
  );
};

const HeaderBar = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => (
  <div
    id={'header'}
    className={
      'w-full h-20 flex flex-col items-end justify-start pt-5 pr-12 ' +
      className
    }
  >
    {children}
  </div>
);

const ErrorMessage = ({ error }: { error?: string }) => (
  <span className={`absolute right-5 fade_7 ${!error && 'fadeOut'}`}>
    {error}
  </span>
);

const LoginLink = ({ show }: { show: boolean }) => (
  <Link href={'/api/auth/login'}>
    <span
      className={`absolute right-5 text-xl text-beige hover:underline fade_7 ${
        !show && 'fadeOut'
      }`}
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
        !ready || !show ? 'fadeOut' : 'opacity-50'
      }`}
    >
      Loading...
    </span>
  );
};

interface LogoutLinkProps {
  name?: string | null;
  setOpen: Setter<boolean>;
}
const Greeting = ({ name, setOpen }: LogoutLinkProps) => (
  <a onClick={() => setOpen?.((prev: boolean) => !prev)}>
    <span
      className={`absolute right-5 text-xl text-beige hover:underline decoration-1 fade_7 cursor-pointer ${
        !name && 'fadeOut'
      }`}
    >
      {name ? `Hello ${capitalize(name).split('@')?.[0]}` : 'Logout'}
    </span>
  </a>
);
