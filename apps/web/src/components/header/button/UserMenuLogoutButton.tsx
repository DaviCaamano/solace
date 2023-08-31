export const UserMenuLogoutButton = () => {
  return (
    <div id={'logout-text'} className={tw.container}>
      <span
        className={'text-xl text-center decoration-1 w-full  '}
        style={{ textDecorationThickness: '1px', textDecoration: 'inherit' }}
      >
        Logout
      </span>
    </div>
  );
};

const tw: Tailwind = {
  container: `w-full flex justify-start align-center 
    transition-all delay-[300ms] duration-[300ms] delay-2
    bg-mug hover:delay-0 hover:bg-pink hover:text-pink-complement`,
};
