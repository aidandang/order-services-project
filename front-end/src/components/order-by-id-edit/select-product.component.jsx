import React from 'react';

// dependencies
import * as Yup from "yup";
// components
import { useForm } from '../custom-hooks/use-form';
import SelectProductForm from './select-product-form.component';

// set form schema
const formSchema = Yup.object().shape({
  size: Yup
    .string(),
  qty: Yup
    .string()
    .required(),
  price: Yup
    .string()
    .required(),
  saleTax: Yup
    .string(),
  localCharge: Yup
    .string(),
  shippingCost: Yup
    .string(),
  note: Yup
    .string()
})
// set form state
const formState = {
  size: "",
  qty: "",
  price: "",
  saleTax: "",
  localCharge: "",
  shippingCost: "",
  note: ""
};

const SelectProduct = () => {

  // set custom form hook
  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled
  ] = useForm(formState, formState, formSchema);

  // form submit function
  const formSubmit = e => {
    e.preventDefault();
  }

  return <>
    <SelectProductForm 
      formSubmit={formSubmit}
      formData={formData}
      errors={errors} 
      onInputChange={onInputChange} 
      buttonDisabled={buttonDisabled}
    />
  </>
}

export default SelectProduct;