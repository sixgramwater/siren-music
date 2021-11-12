import styles from './index.less';
import React, { useState, useRef } from 'react';
import cx from 'classnames';
import { SearchOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'umi';

export interface SearchInputProps {
  // value: string;
  onChange: (value: string) => void;
  style?: React.CSSProperties;
  className?: string;
}
const SearchInput: React.FC<SearchInputProps> = (props) => {
  const { onChange, style, className } = props;
  const dispatch = useDispatch();
  const [isInput, setIsInput] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const inputRef = useRef() as React.RefObject<HTMLInputElement>;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;
    if (input === '') {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
    onChange && onChange(input.toUpperCase());
  };
  const handleClickMask = () => {
    dispatch({
      type: 'app/toggleSiderOpen',
      payload: false,
    });
  };
  const seachInputClass = cx(styles.searchInput, className);
  return (
    <div className={seachInputClass} style={style}>
      <div className={styles.input}>
        <div className={styles.mask} onClick={handleClickMask}></div>
        <div className={styles.wrapper}>
          <input
            ref={inputRef}
            className={styles.inner}
            onBlur={() => setIsInput(false)}
            onFocus={() => setIsInput(true)}
            onChange={(e) => handleChange(e)}
          />
          {!isInput && isEmpty && (
            <span className={styles.placeholder}>A WORLD OF UNFAMILIAR</span>
          )}
          <div className={styles.iconSearch}>
            <SearchOutlined
              style={{
                color: '#a2a6ae',
                fontWeight: 700,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
