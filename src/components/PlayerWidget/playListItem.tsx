import React from 'react';
import styles from './index.less';
import cx from 'classnames';

export interface ListItemProps {
  active?: boolean;
  title: string;
  artist: string;
  index: number;
  cid: string;
}

const ListItem: React.FC<ListItemProps> = (props) => {
  const { active = false, title, artist, index, cid } = props;
  const activeClass = cx(styles.listItem, {
    [styles.active]: active,
  });
  return (
    <div className={activeClass}>
      <div className={styles.badge}>{index}</div>
      <div className={styles.content}>
        <div className={styles.title}>
          <div className={styles.overflowText}>
            <span className={styles.content}>{title}</span>
          </div>
        </div>
        <div className={styles.artist}>{artist}</div>
      </div>
    </div>
  );
};

export default ListItem;