import { OrderActionTypes } from './order.types';
import { acctToStr } from '../../components/utils/acctToStr';

const INITIAL_STATE = {
  data: {},
  editing: {
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
    case OrderActionTypes.SAVE_ORDER_CUSTOMER:
      return {
        ...state,
        editing: { 
          ...state.editing,
          customer: action.payload
        }
      }
    case OrderActionTypes.SAVE_ORDER_INFO:
      return {
        ...state,
        editing: { 
          ...state.editing,
          orderInfo: action.payload
        }
      }
    default:
      return state;
  }
}

export default orderReducer;