import React from 'react';

// components
import ProductStyleInfo from './product-style-info.component';
import ProductStyleEdit from './product-style-edit.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProductById, selectProductIsEdit } from '../../state/product/product.selectors';

const ProductStyleTab = ({ 
  productById, 
  productIsEdit
}) => {

  return <>
    { (productById && !productIsEdit) && <ProductStyleInfo /> }
    { (productById && productIsEdit) && <ProductStyleEdit />  } 
  </>
}

const mapStateToProps = createStructuredSelector({
  productById: selectProductById,
  productIsEdit: selectProductIsEdit,
})

export default connect(mapStateToProps)(ProductStyleTab);