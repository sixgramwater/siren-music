import React from 'react';
import { useSelector, useDispatch } from 'umi';
import styles from './index.less';

export interface PlayerProps {

}

const Player: React.FC<PlayerProps> = (props) => {
  return(
    <div className={styles.player}>
      <div className={styles.info}>
        <div className={styles.picWrapper}>

        </div>
        <div className={styles.musicTitle}></div>
      </div>
      <div className={styles.control}></div>
    </div>
  )
}

export default Player;
