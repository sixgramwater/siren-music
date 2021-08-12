import React, { useEffect } from 'react';
import styles from './index.less';

export interface FlashTextProps {
  text: string;
}

const FlashText: React.FC<FlashTextProps> = (props) => {
  const { text } = props;
  return (
    <div className={styles.flashText}>
      <div className={styles.overflowText}>
        <span className={styles.content}>{text}</span>
      </div>
    </div>
  );
};

export default FlashText;
