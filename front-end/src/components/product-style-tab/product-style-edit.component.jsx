import React from 'react';

// dependencies
import * as Yup from "yup";

// components
import ProductStyleEditForm from './product-style-edit-form.component';

// utils
import { useForm } from '../custom-hooks/use-form';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { patchReq } from '../../state/api/patch-request';
import { selectProductById } from '../../state/product/product.selectors';
import { ProductActionTypes } from '../../state/product/product.types';
import { productSetIsEditing } from '../../state/product/product.actions';

// set form schema
const formSchema = Yup.object().shape({
  name: Yup
    .string()
    .required("Name is required."),
  styleCode: Yup
    .string()
    .required('Style code is required.'),
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
  styleCode: "",
  sku: "",
  desc: "",
  active: ""
};

const ProductStyleEdit = ({ 
  product, 
  productSetIsEditing, 
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
      productSetIsEditing={productSetIsEditing}
    />
  </>
}

const mapStateToProps = createStructuredSelector({
  product: selectProductById
})

const mapDispatchToProps = dispatch => ({
  productSetIsEditing: (value) => dispatch(productSetIsEditing(value)),
  patchReq: (
    pathname,
    reqBody, 
    fetchSuccess, 
    queryStr
  ) => dispatch(patchReq(pathname, reqBody, fetchSuccess, queryStr))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductStyleEdit);