import React from 'react';

// components
import Title from '../../components/title/title.component';
import AddProduct from '../../components/add-product/add-product.component';

// ui settings
const titleSettings = {
  title: 'Add Product',
  button: undefined
}

const AddProductPage = () => {
  return <>
    <Title settings={titleSettings} />
    <AddProduct />
  </>
}

export default AddProductPage;