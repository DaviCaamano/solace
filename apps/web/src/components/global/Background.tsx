import styles from '@styles/shared/shared.module.css';
import colors from '@styles/tailwind/colors';
import { ReactNode } from 'react';

interface BackgroundProps {
  children: ReactNode;
}
export const Background = ({ children }: BackgroundProps) => {
  return (
    <div
      className={`${styles.background}  w-full h-full relative`}
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: colors.brown,
      }}
    >
      {children}
    </div>
  );
};
