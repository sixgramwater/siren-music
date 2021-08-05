import React, { useState } from 'react';
import styles from './index.less';
import Searchbar from './SearchInput';
import SearchResult from './SearchResult';
// import searchbar from '../Searchbar';

const Header = () => {
  const [input, setInput] = useState('');
  const handleInputChange = (value: string) => {
    setInput(value);
  }
  return(
    <header className={styles.header}>
      <Searchbar
        onChange={handleInputChange}
      />
      <div className={styles.buttonNav}>
        <a className={styles.iconNav}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </a>
      </div>
      <SearchResult />
    </header>
  )
}

export default Header;
