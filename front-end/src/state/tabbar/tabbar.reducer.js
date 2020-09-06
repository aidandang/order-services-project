import { TabbarActionTypes } from './tabbar.types';
import { TABBAR_LIST } from './tabbar.data';

const INITIAL_STATE = TABBAR_LIST;

const tabbarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TabbarActionTypes.SET_SELECTED_TAB:
      return {
        ...state,
        [action.payload.page]: { 
          ...state[action.payload.page], selectedTab: action.payload.tabId 
        }
      }
    default:
      return state;
  }
}

export default tabbarReducer;