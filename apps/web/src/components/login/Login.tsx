import Iframe from 'react-iframe';

export const Login = () => {
  return (
    <Iframe
      url='/api/auth/login'
      id='login'
      className='w-full h-full'
      display='block'
      position='relative'
    />
  );
};

const LoginRow = () => {
  return (
    <div className={'LOGIN_ROW w-full h-48'}>
      <label>Username</label>
      <input className={'LOGIN_ROW_INPUT w-full h-20'} />
    </div>
  );
};
