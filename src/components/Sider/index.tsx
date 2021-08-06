import React from 'react';
import styles from './index.less';
import { useSelector, useDispatch } from 'umi';
import { routeItem } from '../../models/index';
import { useRoute } from '../../utils/useRoute';
import cx from 'classnames'
// import { useSelector } from 'umi'

interface MenuItemProps {
  route: routeItem,
  onClick?: () => void;
}
const MenuItem: React.FC<MenuItemProps> = ({route}) => {
  const dispatch = useDispatch();
  // const [{ },
  //   toggleRouteForward,
  //   toggleRouteBackward,
  //   jumpToRoute] = useRoute();
  // const handleClick = () => {
  //   jumpToRoute(route.path)
  // }
  const handleClick = () => {
    dispatch({
      type: 'app/setRoute',
      payload: route.path
    })
  }
  return(
    <a className={styles.menuItem} onClick={handleClick}>
      <span>{route.name}</span>
      <span>{route.name_cn}</span>
    </a>
  )
}

const Sider = () => {
  const siderOpen = useSelector((state: any)=>state.app.siderOpen);
  const routes: routeItem[] = useSelector((state: any) => state.app.routes);
  const dispatch = useDispatch();

  const toggleSiderClose = () => {
    dispatch({
      type: 'app/toggleSiderOpen',
      payload: false
    })
  };

  const handleClickMask = (e: React.MouseEvent) => {
    toggleSiderClose();
  }

  return(
    <nav className={cx(styles.nav, {
      [styles.visible]: siderOpen
    })}>
      <div className={styles.mask} onClick={(e)=>handleClickMask(e)}></div>
      <div className={cx(styles.wrapper, {
        [styles.visible]: siderOpen
      })}>
        <div className={styles.wrapperInner}>
          <div className={styles.content}>
          {
            routes.map((route, index)=>{
              return (
                <React.Fragment key={index}>
                  <MenuItem route={route} key={route.path}/>
                  {
                    (index !== routes.length -1) &&
                    <div className={styles.divider}>
                      <div className={styles.line}></div>
                    </div>
                  }
                </React.Fragment>
              )
            })
          }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Sider;

