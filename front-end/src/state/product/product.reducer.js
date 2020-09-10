import { ProductActionTypes } from './product.types';

const INITIAL_STATE = {
  allIds: null,
  info: null,
  queryStr: '',
  byId: null,
  isEditing: false,
  newProduct: {
    brandId: '',
    name: '',
    styleCode: '',
    sku: '',
    desc: '',
    active: true
  },
  doneAddingStyle: false
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
    case ProductActionTypes.PRODUCT_GET_SUCCESS:
      return fetchSuccessOptions(state, action);
    case ProductActionTypes.PRODUCT_PATCH_SUCCESS:
      return {
        ...state,
        byId: action.payload.result.byId,
        isEditing: false
      }
    case ProductActionTypes.PRODUCT_SET_IS_EDITING:
      return {
        ...state,
        isEditing: action.payload
      }
    case ProductActionTypes.SET_NEW_PRODUCT_STYLE:
      return {
        ...state,
        newProduct: {
          ...state.newProduct, ...action.payload
        },
        doneAddingStyle: true
      }
    default:
      return state;
  }
}

export default productReducer;