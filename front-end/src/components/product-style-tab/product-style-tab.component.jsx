import React from 'react';

// components
import ProductStyleInfo from './product-style-info.component';
import ProductStyleEdit from './product-style-edit.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProductById, selectProductIsEditing } from '../../state/product/product.selectors';

const ProductStyleTab = ({ 
  productById, 
  productIsEditing
}) => {

  return <>
    { (productById && !productIsEditing) && <ProductStyleInfo /> }
    { (productById && productIsEditing) && <ProductStyleEdit />  } 
  </>
}

const mapStateToProps = createStructuredSelector({
  productById: selectProductById,
  productIsEditing: selectProductIsEditing,
})

export default connect(mapStateToProps)(ProductStyleTab);