import React, { useEffect, useRef } from 'react';
import styles from './index.less';
import ShuffleText from '@/utils/shuffleText'

export interface FlashTextProps {
  text: string;
}

const FlashText: React.FC<FlashTextProps> = (props) => {
  const { text } = props;
  const textRef = useRef() as React.MutableRefObject<any>;
  useEffect(()=>{
    let text = new ShuffleText(textRef.current);
    text.start();
  }, [text])
  return (
    <div className={styles.flashText}>
      <div className={styles.overflowText}>
        <span className={styles.content} ref={textRef}>{text}</span>
      </div>
    </div>
  );
};

export default FlashText;
