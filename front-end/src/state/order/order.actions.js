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

export const addItemToOrder = (item) => ({
  type: OrderActionTypes.ADD_ITEM_TO_ORDER,
  payload: item
})

export const editOrderItem = (item, index) => ({
  type: OrderActionTypes.EDIT_ORDER_ITEM,
  payload: {
    item,
    index
  }
})

export const updateItemToOrder = (item, index) => ({
  type: OrderActionTypes.UPDATE_ITEM_TO_ORDER,
  payload: {
    item,
    index
  }
})

export const removeItemFromOrder = (index) => ({
  type: OrderActionTypes.REMOVE_ITEM_FROM_ORDER,
  payload: index
})

export const copyToOrderTemplate = (order) => ({
  type: OrderActionTypes.COPY_TO_ORDER_TEMPLATE,
  payload: order
})