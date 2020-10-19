import React, { useEffect, useState } from 'react';

// components
import ProductSearch from './product-search.component';
import ProductAdd from './product-add.component';
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

  const [action, setAction] = useState('');

  useEffect(() => {
    const fetchSuccess = ProductActionTypes.PRODUCT_FETCH_SUCCESS;
    getReq('/products', fetchSuccess);
    // eslint-disable-next-line
  }, []);
  
  return <>
    { 
      alertMessage 
      ? 
      <AlertMesg />
      : 
      <>
        { action === 'add' && <ProductAdd setAction={setAction} />}
        { action === '' && <ProductSearch setAction={setAction} />}
      </>
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