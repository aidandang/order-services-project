import React from 'react';

// dependencies
import * as Yup from "yup";
// utils and custom hooks
import { useForm } from '../custom-hooks/use-form';
// components
import AddStyleForm from './add-style-form.component';
// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProductObj } from '../../state/product/product.selectors';
import { addProductStyle } from '../../state/product/product.actions';

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
  addProductStyle
}) => {
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
  }

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
  addProductStyle: payload => dispatch(addProductStyle(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddStyle);