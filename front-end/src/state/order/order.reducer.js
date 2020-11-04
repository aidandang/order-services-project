import { OrderActionTypes } from './order.types';
// import { acctToStr } from '../../components/utils/acctToStr';

const INITIAL_STATE = {
  data: {},
  editing: {
    isSelectingProduct: false,
    isSelectingCustomer: false,
    item: {},
    items: [],
    sale: {}
  }
}

function addItemToArray(array, action) {
  return [...array, action.payload]
}

function updateItemInArray(array, payload) {
  return array.map((item, index) => {
    if (index !== payload.index) {
      return item
    }
    return {
      ...item,
      ...payload.item
    }
  })
}

function removeItemInArray(array, index) {
  let newArray = array.slice()
  newArray.splice(index, 1)
  return newArray
}

// function convertAccountNumberToString(array) {
//   return array.map(item => ({
//       ...item,
//       qty: String(item.qty),
//       price: acctToStr(item.price),
//       saleTax: acctToStr(item.saleTax),
//       localCharge: acctToStr(item.localCharge),
//       shippingCost: acctToStr(item.shippingCost)
//   })) 
// }

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OrderActionTypes.ORDER_FETCH_SUCCESS:
      return {
        ...state,
        data: { ...state.data, ...action.payload }
      }
    case OrderActionTypes.SAVE_ORDER_INFO:
      return {
        ...state,
        editing: { 
          ...state.editing,
          info: action.payload
        }
      }
    case OrderActionTypes.SAVE_ORDER_ITEM:
      return {
        ...state,
        editing: {
          ...state.editing,
          items: addItemToArray(state.editing.items, action),
          item: {}
        }
      }
    case OrderActionTypes.SELECT_PRODUCT_TO_ORDER:
      return {
        ...state,
        editing: {
          ...state.editing,
          item: {
            ...state.editing.item,
            product: action.payload.product,
            color: action.payload.color
          },
          isSelectingProduct: false
        }
      }
    case OrderActionTypes.SET_IS_SELECTING_PRODUCT:
      return {
        ...state,
        editing: {
          ...state.editing,
          isSelectingProduct: action.payload
        }
      }
    case OrderActionTypes.UPDATE_ORDER_ITEM:
      return {
        ...state,
        editing: {
          ...state.editing,
          items: updateItemInArray(state.editing.items, action.payload),
          item: {}
        }
      }
    case OrderActionTypes.REMOVE_ORDER_ITEM:
      return {
        ...state,
        editing: {
          ...state.editing,
          items: removeItemInArray(state.editing.items, action.payload)
        }
      }
    case OrderActionTypes.SAVE_ORDER_COST:
      return {
        ...state,
        editing: { 
          ...state.editing,
          cost: action.payload
        }
      }
    case OrderActionTypes.SAVE_ORDER_RECEIVING:
      return {
        ...state,
        editing: { 
          ...state.editing,
          receiving: action.payload
        }
      }
    case OrderActionTypes.SAVE_ORDER_SALE:
      return {
        ...state,
        editing: { 
          ...state.editing,
          sale: action.payload
        }
      }
    case OrderActionTypes.SET_IS_SELECTING_CUSTOMER:
      return {
        ...state,
        editing: {
          ...state.editing,
          isSelectingCustomer: action.payload
        }
      }
    case OrderActionTypes.SELECT_CUSTOMER_TO_ORDER:
      return {
        ...state,
        editing: {
          ...state.editing,
          sale: {
            ...state.editing.sale,
            customer: { ...action.payload }
          },
          isSelectingCustomer: false
        }
      }
    default:
      return state;
  }
}

export default orderReducer;