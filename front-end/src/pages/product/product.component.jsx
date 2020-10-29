import React from 'react';

// dependencies
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

// components
import Title from '../../components/title/title.component';
import ProductList from '../../components/product-list/product-list.component';
import GetBrandList from '../../components/product-add/get-brand-list.component';
import ProductInfo from '../../components/product-info/product-info.component';

// initial values
const title = {
  name: 'Product',
  message: 'Search for product(s) by name, style code and brand.'
}

const Product = () => {

  const location = useLocation();

  const queryStr = queryString.parse(location.search);
  const { id, action } = queryStr;

  return <>
    <Title title={title} />

    { action === undefined && <ProductList /> }
    { action === 'product-info' && id !== undefined && 
      <ProductInfo 
        pathname={`/products/${id}`}
        component="product-info"
      /> 
    }
    { action === 'product-add' && <GetBrandList pathname={`/brands`} component="product-add" /> }
  </>
}

export default Product;