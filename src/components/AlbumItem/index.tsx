import cx from 'classnames';
import styles from './index.less';

export interface AlbumItemProps {
  cover: string;
  name: string;
  cid: string;
  artists: string[];
  index: number;
}

const AlbumItem: React.FC<AlbumItemProps> = (props) => {
  const { cover, name, cid, artists, index } = props;
  return (
    <div
      className={styles.albumItem}
      style={{
        animationDelay: index * 0.1 + 's',
      }}
    >
      <div className={styles.cover}>
        <img src={cover} alt={name} referrerPolicy="no-referrer" />
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
