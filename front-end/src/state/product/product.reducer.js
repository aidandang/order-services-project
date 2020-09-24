import { ProductActionTypes } from './product.types';

const INITIAL_STATE = {
  data: {}
}

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductActionTypes.PRODUCT_FETCH_SUCCESS:
      return {
        ...state,
        data: { ...state.data, ...action.payload }
      }
    case ProductActionTypes.UPDATE_PRODUCT_STYLE:
      return {
        ...state,
        prodObj: { ...state.prodObj, ...action.payload }
      }
    case ProductActionTypes.ADD_PRODUCT_COLOR:
      return {
        ...state,
        prodObj: {
          ...state.prodObj,
          colors: [ ...state.prodObj.colors, action.payload ]
        }
      }
    default:
      return state;
  }
}

export default productReducer;