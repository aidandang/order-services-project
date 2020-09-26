import React from 'react';

// import dependencies
import * as Yup from "yup";
// components
import { useForm } from '../custom-hooks/use-form';
import AddColorForm from './add-color-form.component';

// set form schema
const formSchema = Yup.object().shape({
  color: Yup
    .string()
    .required("Color is required"),
  image: Yup
    .string(),
  url: Yup
    .string()
});
// set form state
const formState = {
  color: "",
  image: "",
  url: ""
};

// MAIN COMPONENT
const AddColor = ({
  setNewColor
}) => {

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(formState, formState, formSchema);

  // Form submit function
  const formSubmit = e => {
    e.preventDefault();
    setNewColor(prevState => ({
      ...prevState,
      colors: [ ...prevState.colors, formData ]
    }));
    setValues(formState)
  }

  return <>
    <AddColorForm
      formSubmit={formSubmit}
      formData={formData}
      errors={errors}
      onInputChange={onInputChange}
      buttonDisabled={buttonDisabled}
    />
  </>
}

export default AddColor;