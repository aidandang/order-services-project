import { createSelector } from 'reselect';

const selectTabbar = state => state.tabbar;

export const selectLoginTabbar = createSelector(
  [selectTabbar],
  tabbar => tabbar.login
)

export const selectRegisterTabbar = createSelector(
  [selectTabbar],
  tabbar => tabbar.register
)

export const selectForgotPasswordTabbar = createSelector(
  [selectTabbar],
  tabbar => tabbar.forgotPassword
)

export const selectResetPasswordTabbar = createSelector(
  [selectTabbar],
  tabbar => tabbar.resetPassword
)

export const selectProductListTabbar = createSelector(
  [selectTabbar],
  tabbar => tabbar.productList
)