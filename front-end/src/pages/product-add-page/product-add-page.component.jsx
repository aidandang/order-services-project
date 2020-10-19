import React from 'react';

// components
import Title from '../../components/title/title.component';
import ProductAdd from '../../components/product-add/product-add.component';

// initial values
const title = {
  name: 'Add Product',
  message: 'Create a new product needed for an order item.'
}

const ProductAddPage = () => {
  
  return <>
    <Title title={title} />
    <ProductAdd />    
  </>
}

export default ProductAddPage;