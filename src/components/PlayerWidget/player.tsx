import React from 'react';
import { useSelector, useDispatch } from 'umi';
// import { Image } from ''
import styles from './index.less';
import { FaPlay, FaListUl, FaPause } from 'react-icons/fa';
import cx from 'classnames';
import { useAudio } from '@/utils/playAudio';
import { musicDetailProps, albumType } from '@/models/music';
import FlashText from '@/components/FlashText'

export interface PlayerProps {}

const Player: React.FC<PlayerProps> = (props) => {
  const curMusic: musicDetailProps = useSelector(
    (state: any) => state.music.curMusic,
  );
  const albums: albumType[] = useSelector((state: any) => state.music.albums);
  const curAlbumIndex = albums.findIndex((album) => {
    return curMusic.albumCid === album.cid;
  });
  const curAlbum = albums[curAlbumIndex];
  // const albums: albumType = useSelector((state: any)=>state.music.albums)
  const coverImg = require('../../../public/static/musicCover.jpg');
  const playingState = useSelector((state: any) => state.music.playingState);
  const playListOpen = useSelector((state: any) => state.app.playListOpen);
  // const {playingState, play, stop} = useAudio('https://res01.hycdn.cn/64eb52c7ec48e88242d62b77d5d1131a/61124691/siren/audio/20210802/20b4109ab03adb5f450c162b1e532dbd.mp3')
  // let state = 'paused';
  const dispatch = useDispatch();
  const handleOpenPlayList = () => {
    // console.log('click')
    dispatch({
      type: 'app/togglePlayListOpen',
      payload: !playListOpen,
    });
  };
  const handleShowMusicPlay = () => {
    dispatch({
      type: 'app/toggleShowMusicPlay',
      payload: true,
    });
  };
  const listIconActiveClass = cx(styles.iconWrapper, {
    [styles.active]: playListOpen,
  });
  const handleTogglePlay = () => {
    if (playingState === 'playing') {
      // stop();
      dispatch({
        type: 'music/stopSongs',
      });
    } else {
      // play();
      dispatch({
        type: 'music/playSongs',
      });
      console.log('click play');
    }
  };
  return (
    <div className={styles.player}>
      <div className={styles.info} onClick={handleShowMusicPlay}>
        <div className={styles.picWrapper}>
          <img src={curAlbum.coverUrl} className={styles.coverPic}></img>
        </div>
        <div className={styles.musicTitle}>
          <FlashText text={curMusic.name}/>
        </div>
      </div>
      <div className={styles.control}>
        <div className={styles.iconWrapper} onClick={handleTogglePlay}>
          {playingState === 'playing' ? <FaPause /> : <FaPlay />}
        </div>
        <div className={listIconActiveClass} onClick={handleOpenPlayList}>
          <FaListUl />
        </div>
      </div>
    </div>
  );
};

export default Player;
