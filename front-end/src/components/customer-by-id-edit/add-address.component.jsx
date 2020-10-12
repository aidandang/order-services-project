import React from 'react';

// dependencies
import * as Yup from "yup";
// components
import { useForm } from '../hook/use-form';
import AddAddressForm from './add-address-form.component';

// set form schema
const formSchema = Yup.object().shape({
  fullname: Yup
    .string()
    .required("First Name is required"),
  othername: Yup
    .string()
    .ensure(),
  country: Yup
    .string()
    .required("Country is required"),
  streetAddress1: Yup
    .string()
    .required("Street Address is required"),
  streetAddress2: Yup
    .string()
    .ensure(),
  city: Yup
    .string()
    .required("City is required"),
  state: Yup
    .string()
    .required("State is required"),
  zipcode: Yup
    .string()
    .required("Zip Code is required"),
  phone: Yup
    .string()
    .required("Phone is required")
});
// set form state
const formState = {
  fullname: "",
  othername: "",
  country: "",
  streetAddress1: "",
  streetAddress2: "",
  city: "",
  state: "",
  zipcode: "",
  phone: ""
};

const AddAddress = ({
  setNewAddress
}) => {

  // set custom form hook
  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(formState, formState, formSchema);

  const formSubmit = e => {
    e.preventDefault();
    setNewAddress(prevState => ({
      ...prevState,
      shippingInfo: [ ...prevState.shippingInfo, formData ]
    }));
    setValues(formState)
  }

  return <>
    <AddAddressForm 
      formData={formData} 
      formSubmit={formSubmit} 
      errors={errors} 
      onInputChange={onInputChange}
      buttonDisabled={buttonDisabled}
    />
  </>
}

export default AddAddress;