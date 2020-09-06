import { TabbarActionTypes } from './tabbar.types';

export const setSelectedTab = (page, tabId) => ({
  type: TabbarActionTypes.SET_SELECTED_TAB,
  payload: { page, tabId }
})