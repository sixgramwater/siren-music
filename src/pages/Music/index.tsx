import React, { useEffect } from 'react';
import styles from './index.less';
import { MdAlbum } from 'react-icons/md';
import { useSelector, useDispatch } from 'umi';
import { albumType } from '@/models/music';
import { albumDetailProps } from '@/models/music';
import AlbumItem from '@/components/AlbumItem';
import ScrollView from '@/components/ScrollView';
import AlbumDetail from './albumDetail';

const PageMusic = () => {
  const dispatch = useDispatch();
  const albums: albumType[] = useSelector((state: any) => state.music.albums);
  const curAlbum: albumDetailProps = useSelector((state: any)=> state.music.curAlbum);
  // useEffect(()=>{
  //   console.log(albums);
  // })
  const handleAlbumItemClick = (cid: string) => {
    dispatch({
      type: 'music/fetchAlbumDetail',
      payload: cid,
    });
    dispatch({
      type: 'app/toggleShowAlbumDetail',
      payload: true,
    });

    dispatch({
      type: 'app/toggleShowHeaderReturnButton',
      payload: true,
    })
  }
  return (
    <div className={styles.pageMusic}>
      <div className={styles.title}>
        <MdAlbum className={styles.icon} />
        <span>ALBUMS</span>
      </div>
      <div className={styles.divider}>
        <div className={styles.line}></div>
      </div>
      <div className={styles.content}>
        <ScrollView>
          {albums.map((album: albumType, index) => (
            <AlbumItem
              cover={album.coverUrl}
              cid={album.cid}
              name={album.name}
              artists={album.artistes}
              index={index}
              key={album.cid}
              onClick={handleAlbumItemClick}
            />
          ))}
        </ScrollView>
      </div>
      <AlbumDetail
        {...curAlbum}

      />
    </div>
  );
};

export default PageMusic;
