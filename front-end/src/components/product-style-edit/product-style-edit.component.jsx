import React from 'react';

// dependencies
import * as Yup from "yup";

// components
import ProductStyleEditForm from './product-style-edit-form.component';

// utils
import { useForm } from '../../utils/useForm';

// redux
import { connect } from 'react-redux';
import { patchReq } from '../../state/api/patch-request';
import { ProductActionTypes } from '../../state/product/product.types';
import { productSetIsEdit } from '../../state/product/product.actions';

// ui settings
import './product-style-edit.styles.css';

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
  sku: Yup
    .string(),
  desc: Yup
    .string(),
  colors: Yup
    .array(),
  rev: Yup
    .array(),
  active: Yup
    .boolean()
});

// set form state
const formState = {
  name: "",
  brandId: "",
  styleCode: "",
  sku: "",
  desc: "",
  colors: [],
  rev: [],
  active: ""
};

const ProductStyleEdit = ({ 
  product, 
  productSetIsEdit, 
  patchReq 
}) => {
  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled
  ] = useForm(product, formState, formSchema);

  // Form submit function
  const formSubmit = e => {
    e.preventDefault();

    let changes = { ...formData };

    // clean up brand array which used to get brand name
    if (changes.brand.length > 0) {
      delete changes['brand'];
    }

    const fetchSuccess = ProductActionTypes.PRODUCT_PATCH_SUCCESS
    const reqBody = { ...formData }
    const pathname = `/products/${product._id}`;
    
    patchReq(pathname, reqBody, fetchSuccess);
  }

  return <>
    <ProductStyleEditForm
      formSubmit={formSubmit}
      formData={formData}
      errors={errors}
      onInputChange={onInputChange}
      buttonDisabled={buttonDisabled}
      productSetIsEdit={productSetIsEdit}
    />
  </>
}

const mapDispatchToProps = dispatch => ({
  productSetIsEdit: (value) => dispatch(productSetIsEdit(value)),
  patchReq: (
    pathname,
    reqBody, 
    fetchSuccess, 
    queryStr
  ) => dispatch(patchReq(pathname, reqBody, fetchSuccess, queryStr))
})

export default connect(null, mapDispatchToProps)(ProductStyleEdit);