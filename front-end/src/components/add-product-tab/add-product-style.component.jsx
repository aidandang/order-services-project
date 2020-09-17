import React from 'react';

// dependencies
import * as Yup from "yup";

// utils and custom hooks
import { useForm } from '../custom-hooks/use-form';

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

export default AddProductStyle;