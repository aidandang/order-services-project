import { CustomerActionTypes } from './customer.types';

export const addCustomer = (customer) => ({
  type: CustomerActionTypes.ADD_CUSTOMER,
  payload: customer
});

export const addCustomerAddress = (address) => ({
  type: CustomerActionTypes.ADD_CUSTOMER_ADDRESS,
  payload: address
})