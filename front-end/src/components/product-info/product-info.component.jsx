import React, { useEffect } from 'react';

// dependencies
import { useParams } from 'react-router-dom'; 

// components
import ProductStyleInfo from '../product-style-info/product-style-info.component';
import ProductStyleEdit from '../product-style-edit/product-style-edit.component'

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProductById, selectProductIsEdit } from '../../state/product/product.selectors';
import { getReq } from '../../state/api/get-request';
import { ProductActionTypes } from '../../state/product/product.types';

// ui settings
import './product-info.styles.css';

const ProductInfo = ({ getReq, productById, productIsEdit }) => {

  const params = useParams();

  useEffect(() => {
    getReq(`/products/${params.id}`, ProductActionTypes.PRODUCT_GET_SUCCESS)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>
    {(productById && !productIsEdit) && <ProductStyleInfo />}
    {(productById && productIsEdit) && <ProductStyleEdit product={productById} />} 
  </>
}

const mapStateToProps = createStructuredSelector({
  productById: selectProductById,
  productIsEdit: selectProductIsEdit
})

const mapDispatchToProps = dispatch => ({
  getReq: (
    pathname, 
    fetchSuccess, 
    queryStr
  ) => dispatch(getReq(pathname, fetchSuccess, queryStr))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfo);