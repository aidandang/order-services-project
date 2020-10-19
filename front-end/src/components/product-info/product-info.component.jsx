import React, { useEffect, useState } from 'react';

// dependecies
import { useParams } from 'react-router-dom';

// components
import ProductStyle from './product-style.component';
import ProductColor from './product-color.component';
import ProductEdit from './product-edit.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getReq } from '../../state/api/get-request';
import { selectProductData } from '../../state/product/product.selectors';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { ProductActionTypes } from '../../state/product/product.types';

const ProductInfo = ({ 
  getReq,
  data,
  alertMessage 
}) => {

  const params = useParams();
  const { byId } = data;

  const [action, setAction] = useState('');

  useEffect(() => {
    const fetchSuccess = ProductActionTypes.PRODUCT_FETCH_SUCCESS;
    getReq('/products/' + params.id, fetchSuccess)
    // eslint-disable-next-line
  }, []);

  return <>
    {
      alertMessage 
      ? <AlertMesg />
      : 
      <>
        {
          byId && action === '' && 
          <div className="row">
            <div className="col-xl-8 add-style-col">
              <ProductStyle product={byId} setAction={setAction} />
            </div>
            <div className="col-xl-4 add-color-col">
              <ProductColor/>
            </div>
          </div>
        }
        {
          byId && action === 'edit' &&
          <ProductEdit product={byId} setAction={setAction} />
        }
      </> 
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectProductData,
  alertMessage: selectAlertMessage
})

const mapDispatchToProps = dispatch => ({
  getReq: (pathname, fetchSuccess) => dispatch(getReq(pathname, fetchSuccess))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfo);