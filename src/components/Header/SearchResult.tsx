import React from 'react';
import styles from './index.less';
import { ProfileFilled } from '@ant-design/icons'

export interface SearchResultProps {

}

const SearchResult = () => {
  return(
    <div className={styles.searchResult}>
      <div className={styles.albumArea}>
        <div className={styles.title}>
          <ProfileFilled className={styles.icon}/>
          <span>MUSIC</span>
        </div>
        <div className={styles.divider}>
          <div className={styles.line}></div>
        </div>
        <div className={styles.albumList}>
          <div className={styles.scrollView}>

          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchResult;
