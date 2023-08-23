export const Login = () => {
  return (
    <div id={'Login'} className='w-full h-full'>
      <LoginRow />
    </div>
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
