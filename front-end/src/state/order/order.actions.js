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

export const updateProductToOrder = (product) => ({
  type: OrderActionTypes.UPDATE_PRODUCT_TO_ORDER,
  payload: product
})