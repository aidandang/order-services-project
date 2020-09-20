import { ProductActionTypes } from './product.types';

const INITIAL_STATE = {
  data: null,
  productObj: {
    colors: []
  }
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
    case ProductActionTypes.ADD_PRODUCT_COLOR:
      return {
        ...state,
        productObj: { 
          ...state.productObj,
          colors: [...state.productObj.colors, action.payload]
        }
      }
    default:
      return state;
  }
}

export default productReducer;