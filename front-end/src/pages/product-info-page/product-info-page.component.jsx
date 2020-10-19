import React from 'react';

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
  return <>
    <Title title={title} />
    <ProductInfo />
  </>
}

export default ProductInfoPage;