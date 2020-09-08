import { ProductActionTypes } from './product.types';

export const productSetIsEdit = (value) => ({
  type: ProductActionTypes.PRODUCT_SET_IS_EDIT,
  payload: value
})