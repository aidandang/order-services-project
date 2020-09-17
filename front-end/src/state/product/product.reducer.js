import { ProductActionTypes } from './product.types';

const INITIAL_STATE = {
  data: null
}

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductActionTypes.PRODUCT_FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload
      }
    default:
      return state;
  }
}

export default productReducer;