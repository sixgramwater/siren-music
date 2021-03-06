import styles from './index.less';
import ReturnButton from '../ReturnButton';
import { useSelector, useDispatch } from 'umi';
import cx from 'classnames';
import ScrollView from '@/components/ScrollView';
import { musicDetailProps, songType } from '@/models/music';
import ListItem from './playListItem';
// import { AppModelState } from '@/models';

const PlayList = () => {
  const playListOpen = useSelector((state: any) => state.app.playListOpen);
  const songs: songType[] = useSelector((state: any) => state.music.songs);
  const curMusic: musicDetailProps = useSelector(
    (state: any) => state.music.curMusic,
  );
  const playingState = useSelector((state: any) => state.music.playingState);
  const dispatch = useDispatch();
  const handleClickReturn = () => {
    dispatch({
      type: 'app/togglePlayListOpen',
      payload: false,
    });
  };
  const handleClickMask = () => {
    dispatch({
      type: 'app/togglePlayListOpen',
      payload: false,
    });
  };
  const playListClass = cx(styles.playList, {
    [styles.visible]: playListOpen,
  });
  return (
    <div className={playListClass}>
      <div className={styles.mask} onClick={handleClickMask} />
      <div className={styles.layer}>
        <div className={styles.layerHeader}>
          <ReturnButton
            className={styles.returnButton}
            onClick={handleClickReturn}
          />
        </div>
        <div className={styles.layerBody}>
          <ScrollView>
            {songs.map((song: songType, index) => (
              <ListItem
                key={song.cid}
                index={index + 1}
                artist={song.artists[0]}
                title={song.name}
                cid={song.cid}
                active={curMusic.cid === song.cid}
                onClick={() => {
                  if (playingState === 'playing') {
                    dispatch({
                      type: 'music/loadAndPlay',
                      payload: song.cid,
                    });
                  } else {
                    dispatch({
                      type: 'music/loadSongs',
                      payload: song.cid,
                    });
                  }
                }}
              />
            ))}
          </ScrollView>
          {/* <div className={styles.scrollView}></div> */}
        </div>
      </div>
    </div>
  );
};

export default PlayList;
