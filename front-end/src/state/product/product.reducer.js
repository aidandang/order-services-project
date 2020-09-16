import { ProductActionTypes } from './product.types';

const INITIAL_STATE = {
  allIds: null,
  info: null,
  queryStr: '',
  byId: null,
  newProduct: {
    brandId: '',
    name: '',
    styleCode: '',
    sku: '',
    desc: '',
    active: true,
    colors: []
  },
  addingStyle: false,
  editingStyle: false,
  addingColor: false,
  editingColor: false,
  deletingColor: false
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
        editingStyle: false
      }
    case ProductActionTypes.SET_EDITING_STYLE:
      return {
        ...state,
        editingStyle: action.payload
      }
    case ProductActionTypes.SET_NEW_PRODUCT_STYLE:
      return {
        ...state,
        newProduct: {
          ...state.newProduct, ...action.payload
        },
        addingStyle: false,
        addingColor: true
      }
    case ProductActionTypes.SET_PRODUCT_COLOR:
      return {
        ...state,
        newProduct: {
          ...state.newProduct,
          colors: [...state.newProduct.colors, action.payload]
        }
      }
    default:
      return state;
  }
}

export default productReducer;