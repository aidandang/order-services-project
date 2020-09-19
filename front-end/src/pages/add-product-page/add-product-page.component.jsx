import React from 'react';

// components
import Title from '../../components/title/title.component';
import AddProduct from '../../components/add-product/add-product.component';

const AddProductPage = () => {
  const title = {
    name: 'Add Product',
    message: 'Submit product after filling out product style and at least one product color.'
  }
  
  return <>
    <Title title={title} />
    <AddProduct />
  </>
}

export default AddProductPage;