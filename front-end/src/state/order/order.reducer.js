import { OrderActionTypes } from './order.types';

const INITIAL_STATE = {
  data: {},
  orderTemp: {
    customer: null,
    shippingAddress: null,
    product: null,
    items: []
  }
}

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OrderActionTypes.ORDER_FETCH_SUCCESS:
      return {
        ...state,
        data: { ...state.data, ...action.payload }
      }
    case OrderActionTypes.UPDATE_CUSTOMER_TO_ORDER:
      return {
        ...state,
        orderTemp: { 
          ...state.orderTemp,
          customer: action.payload.customer,
          shippingAddress: action.payload.shippingAddress
        }
      }
    case OrderActionTypes.UPDATE_SHIPPING_ADDRESS_TO_ORDER:
      return {
        ...state,
        orderTemp: {
          ...state.orderTemp,
          shippingAddress: action.payload 
        }
      }
    case OrderActionTypes.UPDATE_PRODUCT_TO_ORDER:
      return {
        ...state,
        orderTemp: {
          ...state.orderTemp,
          product: action.payload
        }
      }
    default:
      return state;
  }
}

export default orderReducer;