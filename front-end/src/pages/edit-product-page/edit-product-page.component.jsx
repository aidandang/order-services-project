import React from 'react';

// components
import Title from '../../components/title/title.component';
import EditProduct from '../../components/edit-product/edit-product.component';

const EditProductPage = () => {
  const title = {
    name: 'Edit Product',
    message: 'Update product style and product color.'
  }
  
  return <>
    <Title title={title} />
    <EditProduct />
  </>
}

export default EditProductPage;