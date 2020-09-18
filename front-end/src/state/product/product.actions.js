import { ProductActionTypes } from './product.types';

export const addProductStyle = style => ({
  type: ProductActionTypes.ADD_PRODUCT_STYLE,
  payload: style 
})