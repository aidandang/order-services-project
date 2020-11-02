import { CustomerActionTypes } from './customer.types';

export const copyCustomerToById = customer => ({
  type: CustomerActionTypes.CUSTOMER_COPY_TO_BY_ID,
  payload: customer
})

export const setCustomerComp = comp => ({
  type: CustomerActionTypes.SET_CUSTOMER_COMPONENT,
  payload: comp
})
