import { OrderActionTypes } from './order.types';
import { acctToStr } from '../../components/utils/acctToStr';

const INITIAL_STATE = {
  data: {},
  orderTemp: {
    customer: null,
    shippingAddress: null,
    item: {},
    index: null,
    items: []
  }
}

function updateObjectInArray(array, action) {
  return array.map((item, index) => {
    if (index !== action.index) {
      return item
    }
    return {
      ...item,
      ...action.item
    }
  })
}

function removeItem(array, action) {
  let newArray = array.slice()
  newArray.splice(action.index, 1)
  return newArray
}

function convertAccountNumberToString(array) {
  return array.map(item => ({
      ...item,
      qty: String(item.qty),
      price: acctToStr(item.price),
      saleTax: acctToStr(item.saleTax),
      localCharge: acctToStr(item.localCharge),
      shippingCost: acctToStr(item.shippingCost)
  })) 
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
    case OrderActionTypes.ADD_ITEM_TO_ORDER:
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
          item: action.payload.item,
          index: action.payload.index
        }
      }
    case OrderActionTypes.UPDATE_ITEM_TO_ORDER:
      return {
        ...state,
        orderTemp: {
          ...state.orderTemp,
          items: updateObjectInArray(state.orderTemp.items, action.payload),
          item: {},
          index: null
        }
      }
    case OrderActionTypes.REMOVE_ITEM_FROM_ORDER:
      return {
        ...state,
        orderTemp: {
          ...state.orderTemp,
          items: removeItem(state.orderTemp.items, { index: action.payload }),
          item: {},
          index: null
        }
      }
    case OrderActionTypes.REMOVE_ORDER_TEMPLATE:
      return {
        ...state,
        orderTemp: {
          ...state.orderTemp,
          customer: null,
          shippingAddress: null,
          item: {},
          index: null,
          items: []
        }
      }
    case OrderActionTypes.COPY_TO_ORDER_TEMPLATE:
      return {
        ...state,
        orderTemp: {
          ...state.orderTemp,
          customer: action.payload.customer,
          shippingAddress: action.payload.shippingAddress === "" ? null : action.payload.shippingAddress,
          items: convertAccountNumberToString(action.payload.items)
        }
      }
    default:
      return state;
  }
}

export default orderReducer;