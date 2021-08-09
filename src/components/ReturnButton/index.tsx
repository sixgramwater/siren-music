import React from 'react';
import cx from 'classnames';
import styles from './index.less';

export interface ReturnButtonProps {
  onClick?: () => void;
  className?: string;
}

const ReturnButton: React.FC<ReturnButtonProps> = (props) => {
  const { onClick, className } = props;
  const returnButtonClass = cx(styles.returnButton, className);
  return (
    <div className={returnButtonClass} onClick={onClick}>
      <div className={styles.viewPort}>
        <div className={styles.icon}></div>
      </div>
    </div>
  );
};

export default ReturnButton;
