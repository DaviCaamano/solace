import styles from '@styles/shared/shared.module.css';
import { poppinsFont } from '@fonts/poppins/poppins.font';
import colors from '@styles/colors';

interface BackgroundProps {
  children: React.ReactNode;
}
export const Background = ({ children }: BackgroundProps) => {
  return (
    <div
      className={`${styles.background} ${poppinsFont.className} w-full h-full relative`}
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
