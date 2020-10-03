import React from 'react';

// dependencies
import * as Yup from "yup";
// components
import { useForm } from '../custom-hooks/use-form';
import { convertSearchFormToQueryString } from '../utils/convert-search-form-to-query-string';
import ProductSearchForm from '../product-list/product-search-form.component';
import PaginationBar from '../pagination-bar/pagination-bar.component';
import SelectProduct from './select-product.component';
// redux
import { connect } from 'react-redux';
import { getReq } from '../../state/api/get-request';
import { ProductActionTypes } from '../../state/product/product.types';
import { createStructuredSelector } from 'reselect';
import { selectProductData } from '../../state/product/product.selectors';

// set form schema
const formSchema = Yup.object().shape({
  search: Yup
    .string()
});
// set form state
const formState = {
  search: ''
}

const OrderProducts = ({ 
  order,
  getReq,
  data,
  setOrder
}) => {

  const { items } = order;

  const [
    formData,
    errors, 
    onInputChange,
    buttonDisabled
  ] = useForm(formState, formState, formSchema);

  // handle search form 
  const formSubmit = (e) => {
    e.preventDefault();

    const fetchSuccess = ProductActionTypes.PRODUCT_FETCH_SUCCESS
    
    const queryStr = convertSearchFormToQueryString(e, formData);

    if (queryStr !== undefined) {
      getReq('/products', fetchSuccess, queryStr)
    }
  }

  return <>
    <ProductSearchForm
      formSubmit={formSubmit} 
      formData={formData}
      errors={errors}
      onInputChange={onInputChange}
      buttonDisabled={buttonDisabled}
    />

    {
      data.allIds &&
      <>
        <PaginationBar numberOfPages={data.info.pages} />
        <SelectProduct setOrder={setOrder} />
        <PaginationBar numberOfPages={data.info.pages} />
      </>
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectProductData
})

const mapDispatchToProps = dispatch => ({
  getReq: (pathname, fetchSuccess, queryStr) => dispatch(getReq(pathname, fetchSuccess, queryStr))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderProducts)