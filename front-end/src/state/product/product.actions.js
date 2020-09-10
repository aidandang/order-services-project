import { ProductActionTypes } from './product.types';

export const productSetIsEditing = (value) => ({
  type: ProductActionTypes.PRODUCT_SET_IS_EDITING,
  payload: value
})

export const setNewProductStyle = (style) => ({
  type: ProductActionTypes.SET_NEW_PRODUCT_STYLE,
  payload: style
})