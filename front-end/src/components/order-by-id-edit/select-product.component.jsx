import React, { useState } from 'react';

// dependencies
import * as Yup from "yup";
// components
import { useForm } from '../hook/use-form';
import ProductSearchForm from '../product-list/product-search-form.component';
import PreviewProducts from '../product-list/preview-products.component';
import PaginationBar from '../pagination-bar/pagination-bar.component';
import { convertSearchFormToQueryString } from '../utils/convert-search-form-to-query-string';
import ItemForm from './item-form.component';
// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProductData } from '../../state/product/product.selectors';
import { selectOrderTemp } from '../../state/order/order.selectors';
import { getReq } from '../../state/api/get-request';
import { ProductActionTypes } from '../../state/product/product.types';
import { updateProductToItem } from '../../state/order/order.actions';

// set form schema
const formSchema = Yup.object().shape({
  search: Yup
    .string()
});
// set form state
const formState = {
  search: ''
}

const SelectProduct = ({ 
  orderTemp,
  getReq, 
  data,
  updateProductToItem
}) => {

  const { item } = orderTemp
  
  const [
    formData,
    errors, 
    onInputChange,
    buttonDisabled
  ] = useForm(formState, formState, formSchema);

  const [active, setActive] = useState(null)

  // handle search form 
  const formSubmit = (e, page) => {
    e.preventDefault();

    const fetchSuccess = ProductActionTypes.PRODUCT_FETCH_SUCCESS;
    
    let queryStr = convertSearchFormToQueryString(e, formData);

    if (queryStr !== undefined) {
      if (page) queryStr = queryStr + `${queryStr === '' ? '?' : '&'}page=${page}`;
      getReq('/products', fetchSuccess, queryStr);
      setActive(page)
    }
  }

  const handleOnClick = (e, product) => {
    e.preventDefault();
    updateProductToItem(product)
  }
  
  return <>
    { item.product
      ?
        <ItemForm />
      : <>
        <ProductSearchForm 
          formSubmit={formSubmit} 
          formData={formData}
          errors={errors}
          onInputChange={onInputChange}
          buttonDisabled={buttonDisabled}
        />
        {
          data && data.info && <>
            <PaginationBar  
              numberOfPages={data.info.pages}
              limit={5}
              onPageChange={formSubmit}
              page={active}
            />
            <PreviewProducts handleOnClick={handleOnClick} />
            <PaginationBar 
              numberOfPages={data.info.pages}
              limit={5}
              onPageChange={formSubmit}
              page={active}
            /> 
          </>
        }
      </>
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectProductData,
  orderTemp: selectOrderTemp
})

const mapDispatchToProps = dispatch => ({
  getReq: (pathname, fetchSuccess, queryStr) => dispatch(getReq(pathname, fetchSuccess, queryStr)),
  updateProductToItem: product => dispatch(updateProductToItem(product))
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectProduct);