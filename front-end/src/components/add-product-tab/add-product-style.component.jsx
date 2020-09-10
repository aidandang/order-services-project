import React from 'react';

// dependencies
import * as Yup from "yup";

// utils and custom hooks
import { useForm } from '../custom-hooks/use-form';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectNewProduct } from '../../state/product/product.selectors'
import { setNewProductStyle } from '../../state/product/product.actions';

// components
import AddProductStyleForm from './add-product-style-form.component';

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
  active: Yup
    .boolean()
});

const AddProductStyle = ({ setNewProductStyle, newProduct }) => {

  // set form state
  const formState = {...newProduct}
  
  // set custom form hook
  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled
  ] = useForm(formState, formState, formSchema);

  // a new product form submit
  const formSubmit = e => {
    e.preventDefault();
    setNewProductStyle(formData)
  }

  return <>
    <AddProductStyleForm
      formSubmit={formSubmit}
      formData={formData} 
      errors={errors} 
      onInputChange={onInputChange} 
      buttonDisabled={buttonDisabled}
    />
  </>
}

const mapStateToProps = createStructuredSelector({
  newProduct: selectNewProduct
})

const mapDispatchToProps = dispatch => ({
  setNewProductStyle: (style) => dispatch(setNewProductStyle(style))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddProductStyle);