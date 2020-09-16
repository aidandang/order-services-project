import { createSelector } from 'reselect';
import queryString from 'query-string';

const selectProduct = state => state.product

export const selectProductAllIds = createSelector(
  [selectProduct],
  product => ({
    allIds: product.allIds,
    info: product.info,
    queryObj: queryString.parse(product.queryStr)
  })
)

export const selectProductById = createSelector(
  [selectProduct],
  product => product.byId
)

export const selectEditingStyle = createSelector(
  [selectProduct],
  product => product.editingStyle
)

export const selectNewProduct = createSelector(
  [selectProduct],
  product => product.newProduct
)

export const selectDoneAddingStyle = createSelector(
  [selectProduct],
  product => product.doneAddingStyle
)