import React from 'react';
import styles from './index.less';
import cx from 'classnames';
import Image from '../../components/Image';
import FlashText from '@/components/FlashText';
import { useSelector, useDispatch, connect } from 'umi';
import ScrollView from '../../components/ScrollView';
import ListItem from '../../components/PlayerWidget/playListItem';
import { songInAlbumType } from '@/models/music';
import RevealButton from '@/components/RevealButton';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Motion, spring, StaggeredMotion } from 'react-motion';
// import { motion } from 'framer-motion';

interface songType {
  cid: string;
  name: string;
  albumCid: string;
  artists: string[];
}

interface AlbumDetailProps {
  // cover: string;
  cid: string; // album cid
  belong?: string;
  name: string;
  coverDeUrl?: string;
  coverUrl: string;
  intro?: string;
  songs: songInAlbumType[];
  loading?: any;
}

const AlbumDetail: React.FC<AlbumDetailProps> = (props) => {
  const {
    // cover,
    cid,
    belong,
    coverUrl,
    coverDeUrl,
    intro,
    songs,
    name,
    loading,
  } = props;
  const showAlbumDetail = useSelector(
    (state: any) => state.app.showAlbumDetail,
  );
  // const curAlbum = useSelector((state: any)=>)
  // const loading = useSelector(state=>state.loading)
  // React.useEffect(()=>{
  //   // console.log(songs);
  //   console.log(defaultItemStyles)
  // }, [])
  const handleClickAlbumItem = () => {};
  const handleClickRevealButton = () => {};

  const initialStyle = {
    scaleY: 0,
  };
  const defaultItemStyles = new Array(songs.length).fill(0).map(() => {
    return {
      x: 0.5,
      o: 0,
    };
  });
  // const delay = (callback: Function, timeout: number, defaultValue: any) => {
  //   let timer =
  // }
  const [showAllIntro, setShowAllIntro] = React.useState(false);
  const introArray = intro ? intro.split('\n').slice(0, -1) : [];

  // React.useEffect(()=>{
  //   console.log(loading);
  //   console.log(songs);
  // }, [])

  const albumDetailClass = cx(styles.albumDetail, {
    [styles.show]: showAlbumDetail,
  });

  const displayIntro = () => {
    if (!intro) return '';
    else {
      return showAllIntro ? (
        introArray.map((str, index) => <p key={index}>{str}</p>)
      ) : (
        <p>{introArray[0]}</p>
      );
    }
  };

  const nextStyles = (previousStyles: any) => {
    if (loading) return defaultItemStyles;
    else {
      // console.log(previousStyles);
      return previousStyles.map((prev: any, i: number) => {
        // debugger

        return i === 0
          ? { x: spring(0), o: spring(1) }
          : {
              x: spring(previousStyles![i - 1].x),
              o: spring(previousStyles![i - 1].o),
            };
      });
    }
  };

  return (
    // !loading &&
    <div className={albumDetailClass}>
      <Motion style={!loading ? { scaleY: spring(1) } : initialStyle}>
        {(interpolatesStyles) => (
          <div
            className={styles.cover}
            style={{
              transform: `scaleY(${interpolatesStyles.scaleY})`,
            }}
          >
            {!loading && (
              <img src={coverDeUrl} alt="cover" className={styles.coverImg} />
            )}
          </div>
        )}
      </Motion>

      <div className={styles.infoAndPlay}>
        <div className={styles.info}>
          <div className={styles.name}>
            <FlashText text={name} className={styles.flashText} />
            {/* {name} */}
          </div>
          <div className={styles.singers}>塞壬唱片-MSR</div>
        </div>
        <RevealButton
          className={styles.playButton}
          onClick={handleClickRevealButton}
        >
          PLAY
        </RevealButton>
      </div>
      <div className={styles.wave}></div>
      <div className={styles.intro}>
        <div className={styles.scroll}>
          <div className={styles.introWrapper}>
            <div className={styles.introInner}>
              {
                // showAllIntro ?
                displayIntro()
              }
            </div>
          </div>
        </div>
        <div className={styles.arrow}>
          <i className={styles.icon}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 13">
              <path
                fillRule="evenodd"
                stroke="#c9cdd0"
                strokeWidth="2px"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                fill="none"
                d="M3.249,1.105 L8.644,6.500 L3.249,11.895 "
              ></path>
            </svg>
          </i>
          <i className={styles.icon}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 13">
              <path
                fillRule="evenodd"
                stroke="#c9cdd0"
                strokeWidth="2px"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                fill="none"
                d="M3.249,1.105 L8.644,6.500 L3.249,11.895 "
              ></path>
            </svg>
          </i>
          {/* <i className={styles.icon}></i> */}
        </div>
      </div>
      <div className={styles.songList}>
        {/* {songs.le} */}
        <ScrollView>
          {/* <TransitionGroup> */}
          {/* <Motion>

          </Motion> */}
          <StaggeredMotion
            defaultStyles={defaultItemStyles}
            // styles={(prevInterpolatedStyles) => prevInterpolatedStyles!.map((_, i)=>{
            //   return i === 0
            //   ? { x: spring(0), o: spring(1) }
            //   : { x: spring(prevInterpolatedStyles![i-1].x), o: spring(prevInterpolatedStyles![i-1].o)}
            // })}
            styles={nextStyles}
          >
            {
              (interpolatesStyles: any) => {
                // console.log(interpolatesStyles);
                // const song = songs[index]
                return (
                  <>
                    {interpolatesStyles.map((style: any, index: number) => {
                      const song = songs[index];
                      return (
                        song && (
                          <ListItem
                            index={index + 1}
                            key={song.cid}
                            cid={song.cid}
                            title={song.name}
                            artist={song.artistes[0]}
                            onClick={handleClickAlbumItem}
                            className={styles.listItem}
                            style={{
                              opacity: interpolatesStyles[index].o,
                              transform: `translateX(${
                                interpolatesStyles[index].x * 100
                              }%)`,
                            }}
                          />
                        )
                      );
                    })}
                  </>
                );
              }
              // (
              //   <>
              //     {
              //       songs.map((song,index)=>(
              //         //
              //           <ListItem
              //             index={index+1}
              //             key={song.cid}
              //             cid={song.cid}
              //             title={song.name}
              //             artist={song.artistes[0]}
              //             onClick={handleClickAlbumItem}
              //             className={styles.listItem}
              //             style={{
              //               opacity: interpolatesStyles[index].o,
              //               transform: `translateX(${interpolatesStyles[index].x*100}%)`,
              //             }}
              //           />
              //       ))
              //     }
              //   </>
              // )
            }
          </StaggeredMotion>
          {/* { songs &&
              songs.map((song,index)=>(
                //
                  <ListItem
                    index={index+1}
                    key={song.cid}
                    cid={song.cid}
                    title={song.name}
                    artist={song.artistes[0]}
                    onClick={handleClickAlbumItem}
                    className={styles.listItem}
                    style={{transitionDelay: (index+1)*0.1+'s'}}
                  />
              ))
            } */}
          {/* </TransitionGroup> */}
        </ScrollView>
      </div>
    </div>
  );
};

export default connect(({ loading }: any) => {
  return {
    loading: loading.effects['music/fetchAlbumDetail'],
  };
})(AlbumDetail);
