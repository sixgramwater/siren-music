import styles from './index.less';
import useScroll from '../utils/useScroll';
import useWheel from '../utils/useWheel';
import { useSelector, useDispatch, AppModelState } from 'umi';
// import { AppModelState } from '../models/index';
import React, { CSSProperties, useState, useEffect } from 'react';
import { isMobile2 } from '../utils/utils';
import { useSwipe } from '../utils/useSwipe';
import { useAudio } from '../utils/playAudio';
import PageMusic from './Music';
import PageMusicPlay from './Playing';

interface PageProps {
  visible: boolean;
  key: number;
}

const About = ({ visible = false }: PageProps) => {
  const visibleStyle: CSSProperties = visible
    ? {
        opacity: 1,
        zIndex: 1,
      }
    : {
        opacity: 0,
        zIndex: 0,
      };
  const appState: AppModelState = useSelector((state: any) => state.app);
  const isMobile = appState.isMobile;
  return (
    <div style={visibleStyle} className={styles.page}>
      <h1>About</h1>
      {isMobile && <h2>is mobile</h2>}
    </div>
  );
};

const Music = ({ visible = false }: PageProps) => {
  const isMobile = useSelector((state: any) => state.app.isMobile);
  // const isMobile = appState.isMobile;
  const visibleStyle: CSSProperties = visible
    ? {
        opacity: 1,
        zIndex: 1,
      }
    : {
        opacity: 0,
        zIndex: 0,
      };
  return (
    <div style={visibleStyle} className={styles.page}>
      <h1>Music</h1>
    </div>
  );
};

export default function IndexPage() {
  // const [playingState, play, stop] = useAudio('https://res01.hycdn.cn/f49617330a27b290f30df5d2f81d7809/61120A21/siren/audio/20210802/20b4109ab03adb5f450c162b1e532dbd.mp3')
  // const scroll = useScroll({
  //   onScrollUp: () => console.log('up'),
  //   onScrollDown: () => console.log('down'),
  // });
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   const result = isMobile2(navigator.userAgent);
  //   console.log('useEffect', result);
  //   dispatch({
  //     type: 'app/setMobile',
  //     payload: result,
  //   });
  // }, [navigator.userAgent]);
  // const appState: AppModelState = useSelector((state: any) => state.app);
  // const isMobile = appState.isMobile;
  // // console.log(isMobile)
  // const [page, setPage] = useState(0);
  // useSwipe({
  //   onSwipeLeft: () => {
  //     if (page >= 1) return;
  //     setPage((prev) => prev + 1);
  //   },
  //   onSwipeRight: () => {
  //     if (page <= 0) return;
  //     setPage((prev) => prev - 1);
  //   },
  // });
  // useWheel({
  //   onWheelDown: () => {
  //     if (page >= 1) return;
  //     setPage((prev) => prev + 1);
  //   },
  //   onWheelUp: () => {
  //     if (page <= 0) return;
  //     setPage((prev) => prev - 1);
  //   },
  // });
  return (
    <div className={styles.layout}>
      {/* <h1 className={styles.title}>Page index</h1> */}
      {/* <About visible={page === 0} key={0} />
      <Music visible={page === 1} key={1} /> */}
      <PageMusic />
      <PageMusicPlay />
    </div>
  );
}
