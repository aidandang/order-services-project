import { TabbarActionTypes } from './tabbar.types';
import { INITIAL_STATE } from './tabbar.data';

const tabbarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TabbarActionTypes.SET_SELECTED_TAB:
      return {
        ...state,
        [action.payload.page]: { 
          ...state[action.payload.page], selectedTab: action.payload.tabId 
        }
      }
    case TabbarActionTypes.SET_TABBAR_MESSAGE:
      return {
        ...state,
        [action.payload.page]: { 
          ...state[action.payload.page], message: action.payload.message
        }
      }
    default:
      return state;
  }
}

export default tabbarReducer;