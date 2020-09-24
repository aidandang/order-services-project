import React, { useEffect } from 'react';

// dependencies
import { useLocation, useParams } from 'react-router-dom';
import queryString from 'query-string';
// components
import ProductByIdInfo from '../../components/product-by-id-info/product-by-id-info.component';
import ProductByIdEdit from '../../components/product-by-id-edit/product-by-id-edit.component';
import AlertMesg from '../../components/alert-mesg/alert-mesg.component';
// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ProductActionTypes } from '../../state/product/product.types';
import { getReq } from '../../state/api/get-request';
import { selectProductData } from '../../state/product/product.selectors';
import { selectAlertMessage } from '../../state/alert/alert.selectors';

const ProductByIdPage = ({
  getReq, 
  data, 
  alertMessage
}) => {

  const location = useLocation();
  const params = useParams();

  const queryObj = queryString.parse(location.search);
  const { type } = queryObj;

  const { byId } = data;

  useEffect(() => {
    const fetchSuccess = ProductActionTypes.PRODUCT_FETCH_SUCCESS;
    getReq('/products/' + params.id, fetchSuccess, location.search)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>
    {
      alertMessage 
      ? <AlertMesg />
      : <>
        { byId && type !== 'edit' && type !== 'delete' && <ProductByIdInfo product={byId} /> }
        { byId && type === 'edit' && <ProductByIdEdit product={byId} /> }
      </>
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  alertMessage: selectAlertMessage,
  data: selectProductData
})

const mapDispatchToProps = dispatch => ({
  getReq: (pathname, fetchSuccess, queryStr) => dispatch(getReq(pathname, fetchSuccess, queryStr))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductByIdPage);