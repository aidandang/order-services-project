import React from 'react';

// dependencies
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

// components
import Title from '../../components/title/title.component';
import ProductInfo from '../../components/product-info/product-info.component';

// initial values
const title = {
  name: 'Product Infomation',
  message: 'Detail information of the product. Information can be edited.'
}

// main component
const ProductInfoPage = () => {

  const location = useLocation();

  const queryObj = queryString.parse(location.search);
  const { action } = queryObj;
  
  return <>

    <Title title={title} />

    { action === 'product-info' && <ProductInfo /> }
    { action === undefined && <ProductInfo /> }
  </>
}

export default ProductInfoPage;