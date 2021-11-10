import cx from 'classnames';
import styles from './index.less';
import Image from '@/components/Image';
import { Suspense } from 'react';
import LazyLoad from 'react-lazyload';

export interface AlbumItemProps {
  cover: string;
  name: string;
  cid: string;
  artists: string[];
  index: number;
  onClick?: (cid: string)=>void;
}

const AlbumItem: React.FC<AlbumItemProps> = (props) => {
  const { cover, name, cid, artists, index, onClick } = props;
  const handleItemClick = () => {
    onClick && onClick(cid);
  }
  return (
    <div
      className={styles.albumItem}
      style={{
        animationDelay: index * 0.1 + 's',
      }}
      onClick={handleItemClick}
    >
      <div className={styles.cover}>
        {/* <LazyLoad height={75} once> */}
        <img src={cover} referrerPolicy="no-referrer" />
        {/* </LazyLoad> */}
        {/* <Suspense fallback={
          <img src="../../../public/static/musicCover.jpg"></img>
        }>
          <Image imgSrc={cover}/>
        </Suspense> */}

        {/* <img src={cover} alt={name} referrerPolicy="no-referrer" /> */}
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.singerList}>
          {artists.map((artist, index) => (
            <span key={index}>{artist}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlbumItem;
