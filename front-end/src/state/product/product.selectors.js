import { createSelector } from 'reselect';

const selectProduct = state => state.product

export const selectProductData = createSelector(
  [selectProduct],
  product => product.data
)

export const selectProdObj = createSelector(
  [selectProduct],
  product => product.prodObj
)