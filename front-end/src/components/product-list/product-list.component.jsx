import React, { useEffect } from 'react';

// dependencies
import { useLocation } from 'react-router-dom';
// components
import Title from '../title/title.component';
import ProductSearch from './product-search.component';
import PreviewProducts from './preview-products.component';
import PaginationBar from '../pagination-bar/pagination-bar.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';
// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProductData } from '../../state/product/product.selectors';
import { getReq } from '../../state/api/get-request';
import { ProductActionTypes } from '../../state/product/product.types';
import { selectAlertMessage } from '../../state/alert/alert.selectors';

const title = {
  name: 'Product List',
  message: 'A product can be searched by either its name or style.'
}

const ProductList = ({ 
  getReq, 
  data, 
  alertMessage
}) => {
  
  const location = useLocation();

  title.button = {
    text: 'Add',
    link: `${location.search}?type=add`
  }
  
  useEffect(() => {
    const fetchSuccess = ProductActionTypes.PRODUCT_FETCH_SUCCESS;
    getReq('/products', fetchSuccess, location.search)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search])
  
  return <>
    <Title title={title} />
    { 
      alertMessage 
      ? <AlertMesg />
      : <> 
        <ProductSearch />
        {
          data && data.info && <>
            <PaginationBar  
              numberOfPages={data.info.pages}
              limit={5}
            />
            <PreviewProducts />
            <PaginationBar 
              numberOfPages={data.info.pages}
              limit={5}
            /> 
          </>
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);