import React, { useEffect } from 'react';
import { IRouteComponentProps } from 'umi';
import styles from './layouts.less';
import Header from '../components/Header';
import PlayerWidget from '../components/PlayerWidget';
import Toast from '@/components/Toast';
import { Helmet } from 'umi';
import { Switch } from 'react-router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { RouterConfig } from './RouterConfig';
type BasicLayoutProps = IRouteComponentProps;



// const forward = {
//   from: { opacity: 0, transform: 'translateX(100%)' },
//   enter: {
//     opacity: 1,
//     transform: 'translateX(0)',
//   },
//   leave: { opacity: 0, transform: 'translateX(-100%)' },
//   config: { duration: 2000 },
// }

// const back = {
//   from: { opacity: 0, transform: 'translateX(-100%)' },
//   enter: {
//     opacity: 1,
//     transform: 'translateX(0)',
//   },
//   leave: { opacity: 0, transform: 'translateX(100%)' },
//   config: { duration: 2000 },
// }

let oldLocation: any = null;

const DEFAULT_SCENE_CONFIG = {
  enter: 'from-right',
  exit: 'to-right',
}

const BOTTOM_SCENE_CONFIG = {
  enter: 'from-bottom',
  exit: 'to-bottom',
}

const getSceneConfig = (location: any) => {
  if(!location)  return DEFAULT_SCENE_CONFIG;
  const reg = /\/music\/\S/i;
  return reg.test(location.pathname) ? BOTTOM_SCENE_CONFIG : DEFAULT_SCENE_CONFIG;
  // const matchedRoute = RouterConfig.find(config => new RegExp(`^${config.path}$`).test(location.pathname));
  // return (matchedRoute && matchedRoute.sceneConfig) || DEFAULT_SCENE_CONFIG;
}

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const { children, location, history } = props;
  // const newSwitch = (
  //   <Switch location={location}>{children.props.children}</Switch>
  // )
  useEffect(()=>{
    console.log('oldLocation:', oldLocation);
    console.log('location', location.pathname);
    oldLocation = location;
  }, [location.pathname]);
  // const animationClass = () => {
  //   const reg = /\/music\/\S/i;
  //   if(reg.test(location.pathname)) {
  //     return 'pop'
  //   } else {
  //     return history.action === 'PUSH' ? 'forward' : 'back'
  //   }
  // }

  const animationClass = () => {
    let classNames = '';
    if(history.action === 'PUSH') {
      classNames = 'forward-' + getSceneConfig(location).enter;
    } else if(history.action === 'POP') {
      classNames = 'back-' + getSceneConfig(oldLocation).exit;
    }
    return classNames;
  }

  // Example using React-Transition-Group
  // return (
  //   <TransitionGroup
  //     childFactory={(child: any) =>
  //       React.cloneElement(child, {
  //         classNames: history.action === 'PUSH' ? 'forward' : 'back',
  //       })
  //     }
  //   >
  //     <CSSTransition key={location.pathname} timeout={2000}>
  //       {newSwitch}
  //     </CSSTransition>
  //   </TransitionGroup>
  // );
  return(
    <div className={styles.layout}>
       <Helmet>
        <meta name="referrer" content="no-referrer" />
      </Helmet>
      <Header />
      <TransitionGroup
        childFactory={(child: any) =>
          React.cloneElement(child, {
            classNames: animationClass()
            // classNames: history.action === 'PUSH' ? 'forward' : 'back',
          })
        }
      >
        <CSSTransition key={location.pathname} timeout={500}>
          {/* <div className={styles.layout}> */}
            <Switch location={location}>{children.props.children}</Switch>
          {/* </div> */}
        </CSSTransition>
      </TransitionGroup>
      <PlayerWidget />
      <Toast/>
    </div>

  )
}

// const Main: React.FC<MainProps> = (props) => {
//   const { children } = props;
//   return(
//     <div className={styles.layout}>
//       <Helmet>
//         <meta name="referrer" content="no-referrer" />
//       </Helmet>
//       <Header />
//       {children}
//       <PlayerWidget />
//       <Toast/>
//     </div>
//   )
// }

export default BasicLayout;

// export default function Layout({
//   children,
//   location,
//   route,
//   history,
//   match,
// }: IRouteComponentProps) {
//   return (
//     <div className={styles.layout}>
//       <Helmet>
//         <meta name="referrer" content="no-referrer" />
//       </Helmet>
//       <Header />
//       {children}
//       <PlayerWidget />
//       <Toast/>
//     </div>
//   );
// }
