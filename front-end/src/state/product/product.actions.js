import { ProductActionTypes } from './product.types';

export const copyProductToById = (product) => ({
  type: ProductActionTypes.PRODUCT_COPY_TO_BY_ID,
  payload: product
})
