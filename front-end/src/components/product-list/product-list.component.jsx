import React from 'react';

// dependencies
import * as Yup from "yup";
import queryString from 'query-string';

// utils
import { useForm } from '../../utils/useForm';
import { searchFormValidation } from '../../utils/searchFormValidation';

// components
import SearchProductForm from '../search-product-form/search-product-form.component';
import PreviewProducts from '../preview-products/preview-products.component';
import PaginationBar from '../pagination-bar/pagination-bar.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProductAllIds } from '../../state/product/product.selectors';
import { getReq } from '../../state/api/get-request';
import { ProductActionTypes } from '../../state/product/product.types';

// ui settings
import './product-list.styles.css';

// set form schema
const formSchema = Yup.object().shape({
  search: Yup
    .string(),
  page: Yup
    .number()
});

// set form state
const formState = {
  search: '',
  field: '',
  page: 1
}

const ProductList = ({ getReq, products }) => {

  const fetchSuccess = ProductActionTypes.GET_SUCCESS;
  const { allIds, info, queryObj } = products;
  
  // set custom form hook
  const [
    formData,
    errors, 
    onInputChange,
    buttonDisabled
  ] = useForm(formState, formState, formSchema);

  // form submit function
  const formSubmit = (e) => {
    e.preventDefault();
    
    const queryStr = searchFormValidation(e, formData);

    if (queryStr !== undefined) {
      getReq('/products', fetchSuccess, queryStr)
    }
  }

  // handle pagination
  const onPageChange = (page) => {
  
    const updatedQueryObj = { ...queryObj, page }
    const queryStr = '?' + queryString.stringify(updatedQueryObj)

    getReq('/products', fetchSuccess, queryStr)
  }
  
  return <>
    <SearchProductForm
      formSubmit={formSubmit} 
      formData={formData}
      errors={errors}
      onInputChange={onInputChange}
      buttonDisabled={buttonDisabled}
    />

    { 
      allIds && <>
        <PaginationBar 
          page={queryObj.page ? Number(queryObj.page) : 1} 
          pages={info.pages}
          onPageChange={onPageChange} 
        />
        <PreviewProducts /> 
      </>
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  products: selectProductAllIds
})

const mapDispatchToProps = dispatch => ({
  getReq: (pathname, fetchSuccess, queryStr) => dispatch(getReq(pathname, fetchSuccess, queryStr))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);