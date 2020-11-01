import React from 'react';

// components
import Title from '../../components/title/title.component';
import Product from '../../components/product/product.component';

// initial values
const title = {
  name: 'Product',
  message: 'Search for product(s) by name, style code and brand.'
}

const ProductPage = () => {

  return <>
    <Title title={title} />
    <Product />
  </>
}

export default ProductPage;