import { createSelector } from 'reselect';

const selectProduct = state => state.product

export const selectProductData = createSelector(
  [selectProduct],
  product => product.data
)

export const selectProductObj = createSelector(
  [selectProduct],
  product => product.productObj
)