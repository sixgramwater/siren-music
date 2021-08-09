import React, { useState } from 'react';
import styles from './index.less';
import Searchbar from './SearchInput';
import SearchResult from './SearchResult';
import Sider from '../Sider';
import { useSelector, useDispatch } from 'umi';
// import searchbar from '../Searchbar';

const Header = () => {
  const [input, setInput] = useState('');
  const siderOpen = useSelector((state: any) => state.app.siderOpen);
  const dispatch = useDispatch();
  const toggleSider = () => {
    const payload = !siderOpen;
    console.log('togglesider');
    dispatch({
      type: 'app/toggleSiderOpen',
      payload,
    });
  };
  const handleInputChange = (value: string) => {
    setInput(value);
  };

  return (
    <header className={styles.header}>
      <Searchbar onChange={handleInputChange} />
      <div className={styles.buttonNav} onClick={toggleSider}>
        <a className={styles.iconNav}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </a>
      </div>
      <SearchResult />
      <Sider />
    </header>
  );
};

export default Header;
