import React from 'react';

// dependencies
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

// components
import Title from '../../components/title/title.component';
import ProductList from '../../components/product-list/product-list.component';
import ProductAdd from '../../components/product-add/product-add.component';

// initial values
const title = {
  name: 'Product List',
  message: 'Search for product(s) by name, style code and brand.'
}

const ProductAllIds = () => {

  const location = useLocation();

  const queryStr = queryString.parse(location.search);
  const { action } = queryStr;

  return <>
    <Title title={title} />

    { action === undefined && <ProductList /> }
    { action === 'product-add' && <ProductAdd /> }
  </>
}

export default ProductAllIds;