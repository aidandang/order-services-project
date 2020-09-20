import { ProductActionTypes } from './product.types';

export const addProductStyle = style => ({
  type: ProductActionTypes.ADD_PRODUCT_STYLE,
  payload: style 
})

export const addProductColor = color => ({
  type: ProductActionTypes.ADD_PRODUCT_COLOR,
  payload: color 
})

