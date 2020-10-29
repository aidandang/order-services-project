import { OrderActionTypes } from './order.types';

export const saveOrderCustomer = (customer) => ({
  type: OrderActionTypes.SAVE_ORDER_CUSTOMER,
  payload: customer
})

export const saveOrderInfo = (payload) => ({
  type: OrderActionTypes.SAVE_ORDER_INFO,
  payload
})

