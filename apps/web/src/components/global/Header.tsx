import Link from 'next/link';
import { capitalize } from '#utils/string';
import { UserMenu } from '@components/header';
import { useState } from 'react';
import { useLogin } from '@hooks';

export const Header = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { isLoading, error, user } = useLogin();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <div
      id={'header'}
      className={'w-full h-20 flex flex-col items-end justify-start pt-5 pr-12'}
    >
      {user ? (
        <LogoutLink name={user.name} setOpen={setOpen} />
      ) : isLoading ? (
        <LoadingLink />
      ) : (
        <LoginLink />
      )}
      {user && <UserMenu open={open} />}
    </div>
  );
};

const LoginLink = () => (
  <Link href={'/api/auth/login'}>
    <span className={'text-2xl text-[beige] hover:underline'}>Login</span>
  </Link>
);

const LoadingLink = () => (
  <span className={'text-2xl text-[disabledText] hover:underline cursor-none'}>
    Login
  </span>
);

interface LogoutLinkProps {
  name?: string | null;
  setOpen: Setter<boolean>;
}

const LogoutLink = ({ name, setOpen }: LogoutLinkProps) => (
  <a onClick={() => setOpen?.((prev: boolean) => !prev)}>
    <span className={'text-2xl text-[beige] hover:underline'}>
      {name ? `Hello ${capitalize(name)}` : 'Logout'}
    </span>
  </a>
);
