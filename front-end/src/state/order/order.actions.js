import { OrderActionTypes } from './order.types';

export const updateCustomerToOrder = (customer, shippingAddress) => ({
  type: OrderActionTypes.UPDATE_CUSTOMER_TO_ORDER,
  payload: {
    customer,
    shippingAddress
  }
})

export const updateShippingAddressToOrder = (id) => ({
  type: OrderActionTypes.UPDATE_SHIPPING_ADDRESS_TO_ORDER,
  payload: id
})

export const updateProductToItem = (product) => ({
  type: OrderActionTypes.UPDATE_PRODUCT_TO_ITEM,
  payload: product
})

export const updateItemToOrder = (item) => ({
  type: OrderActionTypes.UPDATE_ITEM_TO_ORDER,
  payload: item
})

export const editOrderItem = (item) => ({
  type: OrderActionTypes.EDIT_ORDER_ITEM,
  payload: item
})