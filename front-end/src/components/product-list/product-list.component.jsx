import React, { useEffect } from 'react';

// components
import ProductSearch from '../product-search/product-search.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getReq } from '../../state/api/get-request';
import { ProductActionTypes } from '../../state/product/product.types';
import { selectAlertMessage } from '../../state/alert/alert.selectors';

// main component
const ProductList = ({ 
  getReq,
  alertMessage
}) => {

  useEffect(() => {
    const fetchSuccess = ProductActionTypes.PRODUCT_FETCH_SUCCESS;
    getReq('/products', fetchSuccess);
    // eslint-disable-next-line
  }, []);
  
  return <>
    { 
      alertMessage 
      ? <AlertMesg />
      : <ProductSearch />
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  alertMessage: selectAlertMessage
})

const mapDispatchToProps = dispatch => ({
  getReq: (pathname, fetchSuccess, queryStr) => dispatch(getReq(pathname, fetchSuccess, queryStr))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);