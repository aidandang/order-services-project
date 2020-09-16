import { ProductActionTypes } from './product.types';

export const setEditingStyle = (value) => ({
  type: ProductActionTypes.SET_EDITING_STYLE,
  payload: value
})

export const setNewProductStyle = (style) => ({
  type: ProductActionTypes.SET_NEW_PRODUCT_STYLE,
  payload: style
})

export const setProductColor = (color) => ({
  type: ProductActionTypes.SET_PRODUCT_COLOR,
  payload: color
})