import { createSelector } from 'reselect';

const selectCustomer = state => state.customer;

export const selectCustomerData = createSelector(
  [selectCustomer],
  customer => customer.data
)

export const selectCustomerTemp = createSelector(
  [selectCustomer],
  customer => customer.customerTemp
)
