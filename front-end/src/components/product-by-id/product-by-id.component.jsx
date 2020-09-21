import React, { useEffect } from 'react';

// dependencies
import { useLocation, useParams } from 'react-router-dom';
// components
import AlertMesg from '../alert-mesg/alert-mesg.component';
import PreviewColors from '../add-product/preview-colors.component';
import ProductInfo from './product-info.component';
// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProductData } from '../../state/product/product.selectors';
import { getReq } from '../../state/api/get-request';
import { ProductActionTypes } from '../../state/product/product.types';
import { selectAlertMessage } from '../../state/alert/alert.selectors';

const ProductById = ({ 
  getReq, 
  data, 
  alertMessage
}) => {

  const params = useParams();
  const location = useLocation();
  
  useEffect(() => {
    const fetchSuccess = ProductActionTypes.PRODUCT_FETCH_SUCCESS;
    getReq('/products/' + params.id, fetchSuccess, location.search)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search])
  
  return <>
    { 
      alertMessage 
      ? <AlertMesg />
      : <> 
        <div className="row">
          <div className="col-xl-8 add-style-col">
            <ProductInfo product={(data && data.byId) ? data.byId : null} />
          </div>
          <div className="col-xl-4 add-color-col">
            <PreviewColors productObj={(data && data.byId) ? data.byId : null}/>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductById);