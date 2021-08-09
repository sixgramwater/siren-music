import styles from './index.less';
import ReturnButton from '../ReturnButton';
import { useSelector, useDispatch } from 'umi';
import cx from 'classnames';
// import { AppModelState } from '@/models';

const PlayList = () => {
  const playListOpen = useSelector((state: any) => state.app.playListOpen);
  const dispatch = useDispatch();
  const handleClickReturn = () => {};
  const handleClickMask = () => {
    dispatch({
      type: 'app/togglePlayListOpen',
      payload: false,
    });
  };
  const playListClass = cx(styles.playList, {
    [styles.visible]: playListOpen,
  });
  return (
    <div className={playListClass}>
      <div className={styles.mask} onClick={handleClickMask} />
      <div className={styles.layer}>
        <div className={styles.layerHeader}>
          <ReturnButton
            className={styles.returnButton}
            onClick={handleClickReturn}
          />
        </div>
        <div className={styles.layerBody}>
          <div className={styles.scrollView}></div>
        </div>
      </div>
    </div>
  );
};

export default PlayList;
