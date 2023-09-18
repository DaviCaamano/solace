import colors from '@styles/tailwind/colors';
import { ReactNode } from 'react';
import Image from 'next/image';
interface BackgroundProps {
  children: ReactNode;
}
export const Background = ({ children }: BackgroundProps) => {
  return (
    <div
      id={'global-background'}
      className={'w-full h-full relative'}
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: colors.brown,
      }}
    >
      <div
        id={'global-background-framer'}
        className={
          'w-full md:w-[49.125rem] h-[16rem] md:h-[17.625rem] absolute bottom-0 right-0 md:right-5'
        }
      >
        <Image
          id={'global-background-image'}
          src={'/images/shared/global/bg-786.webp'}
          loader={imageLoader}
          fill={true}
          alt={'Notes for Solace Background'}
        />
      </div>
      {children}
    </div>
  );
};

enum BG {
  sm = '/images/shared/global/bg-0-320.webp',
  md = '/images/shared/global/bg-320-785.webp',
  lg = '/images/shared/global/bg-786.webp',
}
const imageLoader = ({ width }) =>
  typeof width === 'number'
    ? width > 785
      ? BG.lg
      : width > 320
      ? BG.md
      : BG.sm
    : BG.lg;
