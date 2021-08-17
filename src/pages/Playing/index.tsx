import styles from './index.less';
import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { useSelector, useDispatch } from 'umi';
import { BiAlbum } from 'react-icons/bi';
import FlashText from '@/components/FlashText';
import { musicDetailProps } from '@/models/music';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { AiFillBackward, AiFillForward } from 'react-icons/ai';
import { IoPause, IoPlay } from 'react-icons/io5';
import { FaRandom } from 'react-icons/fa';
import { IoMdVolumeLow } from 'react-icons/io';

const PageMusicPlay = () => {
  const showMusicPlay = useSelector((state: any) => state.app.showMusicPlay);
  const showVolumePanel = useSelector(
    (state: any) => state.app.showVolumePanel,
  );
  const curMusic: musicDetailProps = useSelector(
    (state: any) => state.music.curMusic,
  );
  const curTime: number = useSelector((state: any) => state.music.curTime);
  const curVolume: number = useSelector((state: any) => state.music.volume);
  const playingState = useSelector((state: any) => state.music.playingState);
  const duration: number = useSelector((state: any) => state.music.duration);
  const [sliderValue, setSliderValue] = useState(0);
  const [volumeSliderValue, setVolumeSliderValue] = useState(curVolume);
  useEffect(() => {
    // dispatch({
    //   type: 'music/setVolume',
    //   payload: volumeSliderValue,
    // })
    dispatch({
      type: 'music/setPlayingVolume',
      payload: volumeSliderValue,
    });
  }, [volumeSliderValue]);
  useEffect(() => {
    setSliderValue(curTime);
  }, [curTime]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'music/loadSongs',
      payload: '953910',
    });
  }, []);
  const handleClosePage = () => {
    dispatch({
      type: 'app/toggleShowMusicPlay',
      payload: false,
    });
  };
  const timeFormat = (time: number) => {
    // let temp = time.toFixed(0);
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    const formatted = `${minutes.toFixed(0).padStart(2, '0')}:${seconds
      .toFixed(0)
      .padStart(2, '0')}`;
    return formatted;
  };
  const getLoopModeIcon = () => {};

  const handleSlideChange = (value: number) => {
    setSliderValue(value);
  };
  const handleVolumeSliderChange = (value: number) => {
    setVolumeSliderValue(value);
    dispatch({
      type: 'app/requestToast',
      payload: `音量: ${Math.round(value*100)}`
    })
  };

  const handleChangeCurTime = (value: number) => {
    console.log(value);
    dispatch({
      type: 'music/playSongsFrom',
      payload: value,
    });
  };

  const handleTogglePlay = () => {
    dispatch({
      type: 'music/playSongs',
    });
  };

  const handleTogglePause = () => {
    dispatch({
      type: 'music/stopSongs',
    });
  };
  const pageMusicPlayClass = cx(styles.pageMusicPlay, {
    [styles.show]: showMusicPlay,
  });
  return (
    // <CSSTransition
    //   in={showMusicPlay}
    //   classNames={styles.page}
    //   // unmountOnExit
    //   timeout={300}
    // >
    <div className={pageMusicPlayClass}>
      <div className={styles.pageHeader}>
        <div className={styles.closeBtn} onClick={handleClosePage}></div>
        <div className={styles.listBtn}>
          <span className={styles.listText}>PLAYLIST</span>
          <div className={styles.iconWrapper}>
            <BiAlbum className={styles.icon} />
          </div>
        </div>
      </div>
      <div className={styles.pageBody}>
        <div className={styles.musicInfo}>
          <div className={styles.musicTitle}>
            <FlashText text={curMusic.name} />
          </div>
          <div className={styles.musicArtists}>
            <FlashText text={curMusic.artists[0]} />
          </div>
        </div>
        <div className={styles.playing}>
          <div className={styles.visualizerWrapper}>
            <canvas className="visualizer" width="300px" height="50px"></canvas>
          </div>
        </div>
      </div>
      <div className={styles.pageFooter}>
        <div className={styles.progress}>
          <div className={styles.time}>
            <div className={styles.timeContent}>
              {curTime ? timeFormat(sliderValue) : `00:00`}
            </div>
            <div>/</div>
            <div className={styles.timeContent}>
              {duration ? timeFormat(duration) : '00:00'}
            </div>
          </div>
          <div className={styles.progressBar}>
            <Slider
              value={sliderValue}
              // value={curTime?curTime:0}
              max={duration ? duration : 100}
              onChange={handleSlideChange}
              onAfterChange={handleChangeCurTime}
              style={{
                touchAction: 'none',
              }}
              railStyle={{
                height: '2px',
                backgroundColor: '#2d2e2f',
              }}
              trackStyle={{
                height: '2px',
                backgroundColor: '#c6c9ce',
              }}
              handleStyle={{
                width: '12px',
                height: '12px',
                border: '2px solid #c6c9ce',
                backgroundColor: '#c6c9ce',
              }}
            />
          </div>
        </div>
        <div className={styles.control}>
          <div className={styles.iconWrapper}>
            <FaRandom size={18} />
          </div>
          <div className={styles.iconWrapper}>
            <AiFillBackward size={24} />
          </div>
          <div className={styles.iconWrapper}>
            {playingState === 'playing' ? (
              <IoPause size={24} onClick={handleTogglePause} />
            ) : (
              <IoPlay size={24} onClick={handleTogglePlay} />
            )}
          </div>
          <div className={styles.iconWrapper}>
            <AiFillForward size={24} />
          </div>
          <div
            className={styles.volume}
            onClick={() =>
              dispatch({
                type: 'app/toggleShowVolumePanel',
                payload: true,
              })
            }
          >
            <div className={styles.iconWrapper}>
              <IoMdVolumeLow size={24} />
            </div>
            <div
              className={cx(styles.volumePanel, {
                [styles.visible]: showVolumePanel,
              })}
            >
              <div
                className={styles.mask}
                onClick={(e) => {
                  dispatch({
                    type: 'app/toggleShowVolumePanel',
                    payload: false,
                  });
                  e.stopPropagation();
                }}
              />
              <div className={styles.iconWrapper}>
                <IoMdVolumeLow size={24} />
              </div>
              <Slider
                vertical={true}
                max={1}
                startPoint={0}
                step={0.01}
                // startPoint={0.5}
                // reverse
                value={volumeSliderValue}
                defaultValue={0.5}
                onChange={handleVolumeSliderChange}
                style={{
                  margin: '0 auto',
                }}
                railStyle={{
                  width: '2px',
                  backgroundColor: '#2d2e2f',
                }}
                trackStyle={{
                  width: '2px',
                  backgroundColor: '#c6c9ce',
                }}
                handleStyle={{
                  width: '12px',
                  height: '12px',
                  border: '2px solid #c6c9ce',
                  backgroundColor: '#c6c9ce',
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.playList}></div>
    </div>
    // </CSSTransition>
  );
};

export default PageMusicPlay;
