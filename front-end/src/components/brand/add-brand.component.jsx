import React from 'react';

//dependencies
import * as Yup from "yup";

// components
import { useForm } from '../custom-hooks/use-form';
import AddBrandForm from './add-brand-form.component';

// set form schema
const formSchema = Yup.object().shape({
  name: Yup
    .string()
    .required("Name is required."),
  preferredName: Yup
    .string()
    .required("Preferred name is required.")
});
// set form state
const formState = {
  name: "",
  preferredName: ""
};

const AddBrand = () => {

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled
  ] = useForm(formState, formState, formSchema);

  const formSubmit = e => {
    e.preventDefault();
  }

  // main component
  return <>
    <AddBrandForm 
      formData={formData}
      errors={errors} 
      onInputChange={onInputChange} 
      buttonDisabled={buttonDisabled}
      formSubmit={formSubmit}
    />
  </>
}

export default AddBrand;