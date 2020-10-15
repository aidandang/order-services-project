import { CustomerActionTypes } from './customer.types';

const INITIAL_STATE = {
  data: {},
  customerTemp: {
    shippingInfo: []
  }
}

const customerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CustomerActionTypes.CUSTOMER_FETCH_SUCCESS:
      return {
        ...state,
        data: { ...state.data, ...action.payload }
      } 
    case CustomerActionTypes.ADD_CUSTOMER:
      return {
        ...state,
        customerTemp: { ...state.customerTemp, ...action.payload }
      }
    case CustomerActionTypes.ADD_CUSTOMER_ADDRESS:
      return {
        ...state,
        customerTemp: { 
          ...state.customerTemp,
          shippingInfo: [ ...state.customerTemp.shippingInfo, action.payload]
        }
      }
    default:
      return state
  }
}

export default customerReducer;