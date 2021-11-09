import React, { useEffect } from 'react';
import styles from './index.less';
import { MdAlbum } from 'react-icons/md';
import { useSelector, useDispatch } from 'umi';
import { albumType } from '@/models/music';
import AlbumItem from '@/components/AlbumItem';
import ScrollView from '@/components/ScrollView';

const PageMusic = () => {
  // const dispatch = useDispatch();
  const albums: albumType[] = useSelector((state: any) => state.music.albums);
  // useEffect(()=>{
  //   console.log(albums);
  // })
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
          {/* {
            [1,2,3,4,5,6].map(item=>(
              <div key={item}>{item}</div>
            ))
          } */}
          {albums.map((album: albumType, index) => (
            <AlbumItem
              cover={album.coverUrl}
              cid={album.cid}
              name={album.name}
              artists={album.artistes}
              index={index}
              key={album.cid}
            />
          ))}
        </ScrollView>
      </div>
    </div>
  );
};

export default PageMusic;
