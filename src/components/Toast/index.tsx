import cx from 'classnames';
import styles from './index.less';
import { useSelector, useDispatch } from 'umi';
import React, { useEffect, useRef } from 'react';

const Toast = () => {
  const toastContent: string = useSelector((state: any) => state.app.toastContent);
  const showToast: boolean = useSelector((state: any) => state.app.showToast);
  const dispatch = useDispatch();
  const timeoutRef = useRef() as React.MutableRefObject<any>;
  useEffect(()=>{
    if(toastContent !== '') {
      dispatch({
        type: 'app/toggleShowToast',
        payload: true
      });
      if(timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(()=>{
        dispatch({
          type: 'app/toggleShowToast',
          payload: false
        })
      }, 2500);
    }

    // () => clearTimeout(timeoutRef.current)
  }, [toastContent])

  const toastClass = cx(styles.toast, {
    [styles.visible]: showToast
  })
  return(
    <div className={toastClass}>{toastContent}</div>
  )

}

export default Toast;


