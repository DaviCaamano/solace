import { ReactNode } from 'react';
interface BackgroundProps {
  children: ReactNode;
}
export const Background = ({ children }: BackgroundProps) => {
  return (
    <div id={'global-background'} className={'relative w-full h-full overflow-hidden bg-chalkboard min-w-[100vw]'}>
      <div
        id={'global-background-framer'}
        className={
          'absolute bottom-0 overflow-hidden xs:right-[50%] xs:translate-x-[40%] sm:translate-x-[50%] md:right-0 md:translate-x-0'
        }
      >
        <div
          id={'global-background-image-container'}
          className={'flex justify-end items-end h-[17.625rem] w-full xs:min-w-[49.125rem] '}
        >
          <picture>
            <source
              media={'(min-width: 320px)'}
              srcSet={'/images/shared/global/bg-786.webp'}
              style={{ width: '786px' }}
            />
            <img
              id={'global-background-image'}
              src={'/images/shared/global/bg-0-319.webp'}
              alt={'Notes for Solace Background'}
            />
          </picture>
        </div>
      </div>
      {children}
    </div>
  );
};
