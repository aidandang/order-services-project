import { createSelector } from 'reselect';

const selectTabbar = state => state.tabbar;

export const selectAddProductTabbar = createSelector(
  [selectTabbar],
  tabbar => tabbar.addProduct
)