import React from 'react';

// dependencies
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
// components
import ProductList from '../../components/product-list/product-list.component';
import ProductByIdEdit from '../../components/product-by-id-edit/product-by-id-edit.component';

const ProductListPage = () => {

  const location = useLocation();

  const queryObj = queryString.parse(location.search);
  const { type } = queryObj;
  
  return <>
    { type !== 'add' && <ProductList /> }
    { type === 'add' && <ProductByIdEdit />}
  </>
}

export default ProductListPage;