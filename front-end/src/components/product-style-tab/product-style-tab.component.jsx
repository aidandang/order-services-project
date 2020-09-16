import React from 'react';

// components
import ProductStyleInfo from './product-style-info.component';
import ProductStyleEdit from './product-style-edit.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProductById, selectEditingStyle } from '../../state/product/product.selectors';

const ProductStyleTab = ({ 
  productById, 
  editingStyle
}) => {

  return <>
    { (productById && !editingStyle) && <ProductStyleInfo /> }
    { (productById && editingStyle) && <ProductStyleEdit />  } 
  </>
}

const mapStateToProps = createStructuredSelector({
  productById: selectProductById,
  editingStyle: selectEditingStyle,
})

export default connect(mapStateToProps)(ProductStyleTab);