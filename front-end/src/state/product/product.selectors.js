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