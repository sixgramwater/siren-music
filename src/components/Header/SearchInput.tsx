import styles from './index.less';
import React, { useState, useRef } from 'react';
import cx from 'classnames';
import { SearchOutlined } from '@ant-design/icons';

export interface SearchInputProps {
  // value: string;
  onChange: (value: string) => void;
}
const SearchInput: React.FC<SearchInputProps> = (props) => {
  const {
    onChange,
  } = props;
  const [isInput, setIsInput] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const inputRef = useRef() as React.RefObject<HTMLInputElement>;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;
    if(input === '') {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
    onChange && onChange(input.toUpperCase())
  }
  return (
    <div className={styles.searchInput}>
      <div className={styles.input}>
        <div className={styles.wrapper}>
          <input
            ref={inputRef}
            className={styles.inner}
            onBlur={()=>setIsInput(false)}
            onFocus={()=>setIsInput(true)}
            onChange={(e)=>handleChange(e)}
          />
          {
            (!isInput && isEmpty) &&
            <span className={styles.placeholder}>A WORLD OF UNFAMILIAR</span>
          }
          <div className={styles.iconSearch}>
            <SearchOutlined style={{
              color: '#a2a6ae',
              fontWeight: 700,
            }}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchInput;
