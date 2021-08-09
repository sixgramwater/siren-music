import React from 'react';
import { useSelector, useDispatch } from 'umi';
// import { Image } from ''
import styles from './index.less';
import { FaPlay, FaListUl } from 'react-icons/fa'


export interface PlayerProps {

}

const Player: React.FC<PlayerProps> = (props) => {
  const coverImg = require('../../../public/static/musicCover.jpg');
  return(
    <div className={styles.player}>
      <div className={styles.info}>
        <div className={styles.picWrapper}>
          <img src={coverImg} className={styles.coverPic}></img>
        </div>
        <div className={styles.musicTitle}>
          <div className={styles.overflowText}>
            <span className={styles.content}>
              ACROSS THE WIND
            </span>
          </div>
        </div>
      </div>
      <div className={styles.control}>
        <div className={styles.iconWrapper}>
          <FaPlay/>
        </div>
        <div className={styles.iconWrapper}>
          <FaListUl/>
        </div>
      </div>
    </div>
  )
}

export default Player;
