import { ProductActionTypes } from './product.types';

const INITIAL_STATE = {
  allIds: null,
  info: null,
  queryStr: '',
  byId: null
}

const fetchSuccessOptions = (state, action) => {
  if (action.payload.result.allIds) 
    return {
      ...state,
      allIds: action.payload.result.allIds,
      info: action.payload.result.info,
      queryStr: action.payload.queryStr
    }
  if (action.payload.result.byId)
    return {
      ...state,
      byId: action.payload.result.byId
    }

  return state;
}

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductActionTypes.GET_SUCCESS:
      return fetchSuccessOptions(state, action)
    default:
      return state;
  }
}

export default productReducer;