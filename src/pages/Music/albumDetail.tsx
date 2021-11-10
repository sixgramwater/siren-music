import React from 'react';
import styles from './index.less';
import cx from 'classnames';
import Image from '../../components/Image';
import FlashText from '@/components/FlashText';
import { useSelector, useDispatch } from 'umi';
import ScrollView from '../../components/ScrollView';
import ListItem from '../../components/PlayerWidget/playListItem';
import { songInAlbumType } from '@/models/music'

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
    name
  } = props;
  const showAlbumDetail = useSelector((state:any) => state.app.showAlbumDetail);

  const handleClickAlbumItem = () => {

  }

  React.useEffect(()=>{
    console.log(songs);
  })

  const albumDetailClass = cx(styles.albumDetail,{
    [styles.show]: showAlbumDetail
  })

  return(
    <div className={albumDetailClass}>
      <div className={styles.cover}>
        {/* <Image
          imgSrc={coverUrl}
          className={styles.coverImg}
        /> */}
        <img src={coverDeUrl} alt="cover" className={styles.coverImg}/>
      </div>
      <div className={styles.infoAndPlay}>
        <div className={styles.info}>
          <div className={styles.name}>
            <FlashText text={name} className={styles.flashText}/>
            {/* {name} */}
          </div>
          <div className={styles.singers}>塞壬唱片-MSR</div>
        </div>
        <div className={styles.revealButton}>
          <span>PLAY</span>
        </div>
      </div>
      <div className={styles.intro}>
        {intro}
      </div>
      <div className={styles.songList}>
        {/* {songs.le} */}
        <ScrollView>
          { songs &&
            songs.map((song,index)=>(
              <ListItem
                index={index+1}
                key={song.cid}
                cid={song.cid}
                title={song.name}
                artist={song.artistes[0]}
                onClick={handleClickAlbumItem}
              />
            ))
          }
        </ScrollView>
      </div>
    </div>
  )
}

export default AlbumDetail;
