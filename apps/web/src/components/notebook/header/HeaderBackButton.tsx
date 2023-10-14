import styles from '@components/notebook/notebook.module.scss';
import { ArrowLeft } from 'phosphor-react';
import { colors } from '@styles/tailwind';

interface BackButtonProps {
  show: boolean;
  onClick: () => void;
}
export const HeaderBackButton = ({ onClick, show }: BackButtonProps) => (
  <div className={`${styles.headerBack} ${show ? 'block' : 'hidden'}`}>
    <div className={styles.headerBackBackground} />
    <div className={styles.headerBackIconContainer}>
      <div className={styles.headerBackIconFramer} onClick={onClick}>
        <ArrowLeft
          size={44}
          color={colors.mug}
          weight={'bold'}
          style={{ zIndex: 1 }}
          className={styles.headerBackIcon}
        />
      </div>
    </div>
  </div>
);
