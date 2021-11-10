import React, { useState } from 'react';
import styles from './index.less';
import Searchbar from './SearchInput';
import SearchResult from './SearchResult';
import Sider from '../Sider';
import ReturnButton from '../ReturnButton';
import { useSelector, useDispatch } from 'umi';
import cx from 'classnames';
// import searchbar from '../Searchbar';

const Header = () => {
  const [input, setInput] = useState('');
  const siderOpen = useSelector((state: any) => state.app.siderOpen);
  const showHeaderReturnButton = useSelector((state:any) => state.app.showHeaderReturnButton);
  const dispatch = useDispatch();
  const handleClickReturnButton = () => {
    dispatch({
      type: 'app/toggleShowAlbumDetail',
      payload: false
    })
  }
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

  const returnButtonClass = cx(styles.returnButton, {
    [styles.show]: showHeaderReturnButton
  })

  const searchBarClass = cx({
    [styles.hide]: showHeaderReturnButton
  })

  return (
    <header className={styles.header}>
      <Searchbar onChange={handleInputChange} className={searchBarClass}/>
      <div className={styles.buttonNav} onClick={toggleSider}>
        <a className={styles.iconNav}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </a>
      </div>
      <SearchResult />
      <Sider />
      <ReturnButton className={returnButtonClass} onClick={handleClickReturnButton}/>
    </header>
  );
};

export default Header;
