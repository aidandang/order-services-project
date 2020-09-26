import { ProductActionTypes } from './product.types';

export const addProductColor = color => ({
  type: ProductActionTypes.ADD_PRODUCT_COLOR,
  payload: color 
})

