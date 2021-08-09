import styles from './index.less';
import React from 'react';

interface ScrollViewProps {

}

const ScrollView: React.FC<ScrollViewProps> = (props) => {
  const {
    children
  } = props;
  return(
    <div className={styles.scrollView}>
      <div className={styles.container}>
        <div className={styles.scroller}>
          {children}
        </div>
      </div>
      <div className={styles.scrollBar}></div>
    </div>
  )
}

export default ScrollView;
