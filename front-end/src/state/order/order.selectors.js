import { createSelector } from 'reselect';

const selectOrder = state => state.order

export const selectOrderData = createSelector(
  [selectOrder],
  order => order.data
)

export const selectOrderComp = createSelector(
  [selectOrder],
  order => order.comp
)

export const selectOrderEditing = createSelector(
  [selectOrder],
  order => order.editing
)