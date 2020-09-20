import React, { useEffect } from 'react';

// dependencies
import * as Yup from "yup";
import { useHistory, useLocation } from 'react-router-dom';
// utils and custom hooks
import { useForm } from '../custom-hooks/use-form';
// components
import AddStyleForm from './add-style-form.component';
// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProductObj } from '../../state/product/product.selectors';
import { addProductStyle } from '../../state/product/product.actions';
import { getReq } from '../../state/api/get-request';
import { BrandActionTypes } from '../../state/brand/brand.types';

// set form schema
const formSchema = Yup.object().shape({
  name: Yup
    .string()
    .required("Name is required."),
  brandId: Yup
    .string()
    .required("Brand is required."),
  styleCode: Yup
    .string()
    .required('Style code is required.'),
  styleImage: Yup
    .string()
    .required('Style image is required.'),
  sku: Yup
    .string(),
  desc: Yup
    .string(),
  active: Yup
    .boolean()
});
// set form state
const formState = {
  name: "",
  brandId: "",
  styleCode: "",
  styleImage: "",
  sku: "",
  desc: "",
  active: true
}

const AddStyle = ({
  productObj,
  addProductStyle,
  getReq
}) => {

  const history = useHistory();
  const location = useLocation();

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled
  ] = useForm(productObj.name ? productObj : formState, formState, formSchema);

  // a new product form submit
  const formSubmit = e => {
    e.preventDefault();
    addProductStyle(formData);
    history.push(`${location.pathname}?action=submit`);
  }

  useEffect(() => {
    const fetchSuccess = BrandActionTypes.BRAND_FETCH_SUCCESS;
    getReq('/brands', fetchSuccess)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>
    <AddStyleForm
      formSubmit={formSubmit}
      formData={formData} 
      errors={errors} 
      onInputChange={onInputChange} 
      buttonDisabled={buttonDisabled}
    />
  </>
}

const mapStateToProps = createStructuredSelector({
  productObj: selectProductObj
})

const mapDispatchToProps = dispatch => ({
  addProductStyle: payload => dispatch(addProductStyle(payload)),
  getReq: (pathname, fetchSuccess, queryStr) => dispatch(getReq(pathname, fetchSuccess, queryStr))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddStyle);