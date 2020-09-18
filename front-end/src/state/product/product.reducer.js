import { ProductActionTypes } from './product.types';

const INITIAL_STATE = {
  data: null,
  productObj: {}
}

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductActionTypes.PRODUCT_FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload
      }
    case ProductActionTypes.ADD_PRODUCT_STYLE:
      return {
        ...state,
        productObj: { ...state.productObj, ...action.payload }
      }
    default:
      return state;
  }
}

export default productReducer;