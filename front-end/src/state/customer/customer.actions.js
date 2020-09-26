import { CustomerActionTypes } from './customer.types';

export const addCustomerAddress = address => ({
  type: CustomerActionTypes.ADD_CUSTOMER_ADDRESS,
  payload: address
})