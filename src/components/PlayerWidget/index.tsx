import Player from './player';
import PlayList from './playList';
import styles from './index.less';

const PlayerWidget = () => {
  return(
    <div className={styles.playerWidget}>
      <Player/>
      <PlayList/>
    </div>
  )
}

export default PlayerWidget;
