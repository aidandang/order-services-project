import { createSelector } from 'reselect';

const selectTabbar = state => state.tabbar;

export const selectProductListTabbar = createSelector(
  [selectTabbar],
  tabbar => tabbar.productList
)

export const selectAddProductTabbar = createSelector(
  [selectTabbar],
  tabbar => tabbar.addProduct
)