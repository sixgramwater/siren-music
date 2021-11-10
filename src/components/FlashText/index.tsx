import React, { useEffect, useRef } from 'react';
import styles from './index.less';
import ShuffleText from '@/utils/shuffleText';
import cx from 'classnames';

export interface FlashTextProps {
  text: string;
  className?: string;
}

const FlashText: React.FC<FlashTextProps> = (props) => {
  const { text, className } = props;
  const textRef = useRef() as React.MutableRefObject<any>;
  useEffect(()=>{
    let text = new ShuffleText(textRef.current);
    text.start();
  }, [text]);
  const FlashTextClass = cx(styles.flashText, className)

  return (
    <div className={FlashTextClass}>
      <div className={styles.overflowText}>
        <span className={styles.content} ref={textRef}>{text}</span>
      </div>
    </div>
  );
};

export default FlashText;
