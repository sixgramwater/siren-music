import { Effect, Reducer, Subscription } from 'umi';
import { isMobile2 } from '../utils/utils';


const routes: routeItem[] = [
  {
    path: '/',
    name: 'HOME',
    name_cn: '首页'
  },
  {
    path: '/about',
    name: 'ABOUT',
    name_cn: '关于',
  },
  {
    path: '/music',
    name: 'MUSIC',
    name_cn: '音乐'
  },
  {
    path: '/contact',
    name: 'CONTACT',
    name_cn: '联系'
  }
]


export type routeItem = {
  path: string;
  name: string;
  name_cn: string;
}
export interface AppModelState {
  isMobile: boolean;
  routes?: routeItem[];
  curRouteIndex?: number;
  siderOpen?:boolean;
}

export interface AppModelType {
  namespace: 'app',
  state: AppModelState,
  reducers: {
    setMobile: Reducer,
    routeForward?: Reducer,
    routeBackward?: Reducer,
    setRoute?: Reducer,
    toggleSiderOpen?: Reducer,
  },
  effects: {

  },
  subscription: {
    setup: Subscription
  }
}

const AppModel: AppModelType = {
  namespace: 'app',
  state: {
    isMobile: false,
    routes: routes,
    curRouteIndex: 0,
    siderOpen: false,
  },
  reducers: {
    setMobile: (state: AppModelState, {payload}) => {
      return {
        ...state,
        isMobile: payload,
      }
    },
    routeForward: (state: AppModelState) => {
      if( state.curRouteIndex! >= state.routes!.length-1) {
        return state;
      } else {
        return {
          ...state,
          curRouteIndex: state.curRouteIndex!+1
        }
      }
    },
    routeBackward: (state: AppModelState): AppModelState => {
      if( state.curRouteIndex! <= 0) {
        return state;
      } else {
        return {
          ...state,
          curRouteIndex: state.curRouteIndex!-1
        }
      }
    },
    setRoute: (state: AppModelState, { payload }): AppModelState => {
      const index = state.routes!.findIndex(route=>route.path === payload)
      return (index === -1)
      ? state
      : {
        ...state,
        curRouteIndex: index
      }
    },
    toggleSiderOpen: (state: AppModelState, { payload }): AppModelState => {
      return {
        ...state,
        siderOpen: payload
      }
    }
  },
  effects: {

  },
  subscription: {
    setup({dispatch}) {
    }
  }
}

export default AppModel;
