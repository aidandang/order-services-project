import React from 'react';

// components
import Title from '../../components/title/title.component';
import ProductList from '../../components/product-list/product-list.component';

// ui settings
import './product-list-page.styles.css';
const titleSettings = {
  title: 'Products',
  button: undefined
}

const ProductListPage = () => {
  return <>
    <Title settings={titleSettings} />
    <ProductList />
  </>   
}

export default ProductListPage;