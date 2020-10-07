import { OrderActionTypes } from './order.types';

const INITIAL_STATE = {
  data: {},
  orderTemp: {
    customer: null,
    shippingAddress: null,
    item: {},
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
    case OrderActionTypes.UPDATE_PRODUCT_TO_ITEM:
      return {
        ...state,
        orderTemp: {
          ...state.orderTemp,
          item: { 
            ...state.orderTemp.item,
            product: action.payload
          }
        }
      }
    case OrderActionTypes.UPDATE_ITEM_TO_ORDER:
      return {
        ...state,
        orderTemp: {
          ...state.orderTemp,
          items: [...state.orderTemp.items, action.payload],
          item: {}
        }
      }
    case OrderActionTypes.EDIT_ORDER_ITEM:
      return {
        ...state,
        orderTemp: {
          ...state.orderTemp,
          item: action.payload
        }
      }
    default:
      return state;
  }
}

export default orderReducer;