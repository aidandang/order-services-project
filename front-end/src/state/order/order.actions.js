import { OrderActionTypes } from './order.types';

export const saveOrderInfo = payload => ({
  type: OrderActionTypes.SAVE_ORDER_INFO,
  payload
})

export const saveOrderItem = payload => ({
  type: OrderActionTypes.SAVE_ORDER_ITEM,
  payload
})

export const updateOrderItem = (item, index) => ({
  type: OrderActionTypes.UPDATE_ORDER_ITEM,
  payload: {
    item,
    index
  }
})

export const selectProductToOrder = payload => ({
  type: OrderActionTypes.SELECT_PRODUCT_TO_ORDER,
  payload
})

export const setIsSelectingProduct = payload => ({
  type: OrderActionTypes.SET_IS_SELECTING_PRODUCT,
  payload
})

export const removeOrderItem = index => ({
  type: OrderActionTypes.REMOVE_ORDER_ITEM,
  payload: index
})

export const saveOrderCost = payload => ({
  type: OrderActionTypes.SAVE_ORDER_COST,
  payload
})

export const saveOrderReceiving = payload => ({
  type: OrderActionTypes.SAVE_ORDER_RECEIVING,
  payload
})

export const saveOrderSale = payload => ({
  type: OrderActionTypes.SAVE_ORDER_SALE,
  payload
})

export const setIsSelectingCustomer = payload => ({
  type: OrderActionTypes.SET_IS_SELECTING_CUSTOMER,
  payload
})

export const selectCustomerToOrder = customer => ({
  type: OrderActionTypes.SELECT_CUSTOMER_TO_ORDER,
  payload: customer
})
