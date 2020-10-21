import React, { useEffect } from 'react';

// dependencies
import queryString from 'query-string';
import { useLocation, useParams } from 'react-router-dom';

// components
import Title from '../../components/title/title.component';
import ProductInfo from '../../components/product-info/product-info.component';
import ProductEdit from '../../components/product-edit/product-edit.component';
import AlertMesg from '../../components/alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getReq } from '../../state/api/get-request';
import { selectProductData } from '../../state/product/product.selectors';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { ProductActionTypes } from '../../state/product/product.types';

// initial values
const title = {
  name: 'Product Infomation',
  message: 'Detail information of the product. Information can be edited.'
}

// main component
const ProductById = ({
  alertMessage,
  data,
  getReq
}) => {

  const location = useLocation();
  const params = useParams();

  const queryStr = queryString.parse(location.search);
  const { action } = queryStr;

  useEffect(() => {
    const fetchSuccess = ProductActionTypes.PRODUCT_FETCH_SUCCESS;
    getReq('/products/' + params.id, fetchSuccess)
    // eslint-disable-next-line
  }, [location.state]);

  return <>
    <Title title={title} />

    { alertMessage && <AlertMesg /> }
    {
      data.byId && data.byId._id === params.id && <>
        { action === undefined && <ProductInfo /> }
        { action === 'product-edit' && <ProductEdit /> }
      </>
    } 
  </>
}

const mapStateToProps = createStructuredSelector({
  alertMessage: selectAlertMessage,
  data: selectProductData
})

const mapDispatchToProps = dispatch => ({
  getReq: (pathname, fetchSuccess) => dispatch(
    getReq(pathname, fetchSuccess)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductById);