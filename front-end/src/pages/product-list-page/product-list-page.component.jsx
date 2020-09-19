import React from 'react';

// components
import Title from '../../components/title/title.component';
import ProductList from '../../components/product-list/product-list.component';

const ProductListPage = () => {
  const title = {
    name: 'Product List',
    message: 'A product can be searched by either its name or style.'
  }
  
  return <>
    <Title title={title} />
    <ProductList />
  </>
}

export default ProductListPage;