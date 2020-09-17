import React from 'react';

// components
import ProductStyleInfo from './product-style-info.component';
import ProductStyleEdit from './product-style-edit.component';

const ProductStyleTab = ({ 
  productById, 
  editingStyle
}) => {

  return <>
    { (productById && !editingStyle) && <ProductStyleInfo /> }
    { (productById && editingStyle) && <ProductStyleEdit />  } 
  </>
}

export default ProductStyleTab;