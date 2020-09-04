import { TabbarActionTypes } from './tabbar.types';

export const setSelectedTab = (page, tabId) => ({
  type: TabbarActionTypes.SET_SELECTED_TAB,
  payload: { page, tabId }
})

export const setTabbarMessage = (page, message) => ({
  type: TabbarActionTypes.SET_TABBAR_MESSAGE,
  payload: { page, message }
})