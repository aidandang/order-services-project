import { ProductActionTypes } from './product.types';

export const updateProductStyle = style => ({
  type: ProductActionTypes.UPDATE_PRODUCT_STYLE,
  payload: style 
})

export const addProductColor = color => ({
  type: ProductActionTypes.ADD_PRODUCT_COLOR,
  payload: color 
})

export const editProduct = byId => ({
  type: ProductActionTypes.EDIT_PRODUCT,
  payload: byId
})

