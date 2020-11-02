import { CustomerActionTypes } from './customer.types';

const INITIAL_STATE = {
  data: {},
  comp: ''
}

const customerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CustomerActionTypes.CUSTOMER_FETCH_SUCCESS:
      return {
        ...state,
        data: { ...state.data, ...action.payload }
      } 
    case CustomerActionTypes.CUSTOMER_COPY_TO_BY_ID:
      return {
        ...state,
        data: { 
          ...state.data,
          byId: { ...action.payload }
        }
      }
    case CustomerActionTypes.SET_CUSTOMER_COMPONENT:
      return {
        ...state,
        comp: action.payload
      }   
    default:
      return state
  }
}

export default customerReducer;