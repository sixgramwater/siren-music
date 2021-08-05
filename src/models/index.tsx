import { Effect, Reducer, Subscription } from 'umi';
import { isMobile2 } from '../utils/utils';

export interface AppModelState {
  isMobile: boolean;
}

export interface AppModelType {
  namespace: 'app',
  state: AppModelState,
  reducers: {
    setMobile: Reducer
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
  },
  reducers: {
    setMobile: (state, {payload}) => {
      return {
        ...state,
        isMobile: payload,
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
