import React, { useEffect } from 'react';

// dependencies
import * as Yup from "yup";
import queryString from 'query-string';
import { useLocation, useHistory } from 'react-router-dom';

// utils
import { useForm } from '../custom-hooks/use-form';
import { convertSearchFormToQueryString } from '../utils/convert-search-form-to-query-string';

// components
import SearchProductForm from './search-product-form.component';
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

// set form schema
const formSchema = Yup.object().shape({
  search: Yup
    .string()
});
// set form state
const formState = {
  search: ''
}

const ProductList = ({ 
  getReq, 
  data, 
  alertMessage
}) => {
  const location = useLocation();
  const history = useHistory();

  const queryObj = queryString.parse(location.search);

  const [
    formData,
    errors, 
    onInputChange,
    buttonDisabled
  ] = useForm(formState, formState, formSchema);

  // handle search form 
  const formSubmit = (e) => {
    e.preventDefault();
    
    const queryStr = convertSearchFormToQueryString(e, formData);

    if (queryStr !== undefined) {
      history.push('/app/product' + queryStr)
    }
  }

  // handle pagination
  const onPageChange = (page) => {
    queryObj.page = page;
    const queryStr = '?' + queryString.stringify(queryObj);

    history.push('/app/product' + queryStr)
  }

  useEffect(() => {
    const fetchSuccess = ProductActionTypes.PRODUCT_FETCH_SUCCESS;
    getReq('/products', fetchSuccess, location.search)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search])
  
  return <>
    { 
      alertMessage 
      ? <AlertMesg />
      : <> 
        <SearchProductForm
          formSubmit={formSubmit} 
          formData={formData}
          errors={errors}
          onInputChange={onInputChange}
          buttonDisabled={buttonDisabled}
        />
        {
          data && data.info && <>
            <PaginationBar 
              page={queryObj.page ? Number(queryObj.page) : 1} 
              pages={data.info.pages}
              onPageChange={onPageChange} 
            />
            <PreviewProducts /> 
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