import React from 'react';
import styles from './index.less';
import { ProfileFilled } from '@ant-design/icons';
import cx from 'classnames';
import { useSelector } from 'umi';

export interface SearchResultProps {}

const SearchResult = () => {
  const showSearchResult = useSelector(
    (state: any) => state.app.showSearchResult,
  );

  const showSearchResultClass = cx(styles.searchResult, {
    [styles.show]: showSearchResult,
  });
  return (
    <div className={showSearchResultClass}>
      <div className={styles.albumArea}>
        <div className={styles.title}>
          <ProfileFilled className={styles.icon} />
          <span>MUSIC</span>
        </div>
        <div className={styles.divider}>
          <div className={styles.line}></div>
        </div>
        <div className={styles.albumList}>
          <div className={styles.scrollView}></div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
