import { OrderActionTypes } from './order.types';

const INITIAL_STATE = {
  data: {}
}

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OrderActionTypes.ORDER_FETCH_SUCCESS:
      return {
        ...state,
        data: { ...state.data, ...action.payload }
      }
    default:
      return state;
  }
}

export default orderReducer;