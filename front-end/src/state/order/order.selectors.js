import { createSelector } from 'reselect';

const selectOrder = state => state.order

export const selectOrderData = createSelector(
  [selectOrder],
  order => order.data
)

export const selectOrderTemp = createSelector(
  [selectOrder],
  order => order.orderTemp
)