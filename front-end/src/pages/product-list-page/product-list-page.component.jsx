import React from 'react';

// dependencies
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

// components
import Title from '../../components/title/title.component';
import ProductList from '../../components/product-list/product-list.component';
import ProductAdd from '../../components/product-add/product-add.component';

// initial values
const title = {
  name: 'Product List',
  message: 'Search for product(s) by name, style code and brand.'
}

const ProductListPage = () => {

  const location = useLocation();

  const queryObj = queryString.parse(location.search);
  const { action } = queryObj;
  
  return <>

    <Title title={title} />

    { action === 'product-add' && <ProductAdd /> }
    { action === 'product-list' && <ProductList /> }
    { action === undefined && <ProductList /> }
  </>
}

export default ProductListPage;