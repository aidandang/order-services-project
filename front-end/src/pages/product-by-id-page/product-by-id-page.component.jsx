import React from 'react';

// components
import Title from '../../components/title/title.component';
import ProductById from '../../components/product-by-id/product-by-id.component';

const ProductByIdPage = () => {
  const title = {
    name: 'Product Detail',
    message: 'Detail information about the product. The information can be edited.'
  }
  
  return <>
    <Title title={title} />
    <ProductById />
  </>
}

export default ProductByIdPage;