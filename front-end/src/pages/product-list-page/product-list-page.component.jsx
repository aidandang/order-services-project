import React from 'react';

// components
import Title from '../../components/title/title.component';
import ProductList from '../../components/product-list/product-list.component';

// initial values
const title = {
  name: 'Product List',
  message: 'Search for product(s) by name, style code and brand.'
}

const ProductListPage = () => {
  
  return <>
    <Title title={title} />
    <ProductList />
  </>
}

export default ProductListPage;