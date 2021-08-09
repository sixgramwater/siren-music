import styles from './index.less';

const PlayList = () => {
  return(
    <div className={styles.playList}>
      <div className={styles.mask}></div>
      <div className={styles.layer}>
        <div className={styles.layerHeader}>
          <div className={styles.returnButton}>

          </div>
        </div>
        <div className={styles.layerBody}>
          <div className={styles.scrollView}>

          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayList;
