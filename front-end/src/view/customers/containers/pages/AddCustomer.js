import React from 'react';

// import dependencies
import { connect } from 'react-redux';
import * as Yup from "yup";

// import components, actions, settings.
import { useForm } from '../../../../hooks/useForm';

// import _shared components.

// import child components
import AddCustomerForm from '../../components/AddCustomerForm';

// import redux middleware, actions and settings
import { postData } from '../../../../state/_shared/middleware/api';
import { FetchType } from '../../../../state/actions/data';
import { setPageActive } from '../../../../state/actions/ui';

// CONSTANCE DECLARATION //
// map states and dispatches to the props
const pageActive = page => dispatch => {
  dispatch(setPageActive(page))
}

// set form schema
const formSchema = Yup.object().shape({
  username: Yup
    .string()
    .required("Username is required"),
  email: Yup
    .string()
    .email("Must be a valid email address."),
  nickname: Yup
    .string()
    .required("Must include a nickname"),
  fullname: Yup
    .string()
    .required("Name is required"),
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
    .required("Phone is required"),
  ext: Yup
    .string()
    .ensure(),
  shippingIsBilling: Yup
    .boolean(),
  shippingInfo: Yup
    .array(),
  rev: Yup
    .array()
});

// set form state
const formState = {
  username: "",
  email: "",
  nickname: "",
  fullname: "",
  othername: "",
  country: "",
  streetAddress1: "",
  streetAddress2: "",
  city: "",
  state: "",
  zipcode: "",
  phone: "",
  shippingInfo: [],
  shippingIsBilling: true,
  status: "na",
  rev: []
};

// main component
const AddCustomer = ({
  postData,
  pageActive
}) => {

  const page = { name: 'CUSTOMER_LIST' };

  // set custom form hook
  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled
  ] = useForm(formState, formState, formSchema);

  // Form submit function
  const formSubmit = e => {
    e.preventDefault();
    postData('/customers', formData, FetchType, page);
  }

  return <>
    <AddCustomerForm 
      formSubmit={formSubmit}
      formData={formData} 
      errors={errors} 
      onInputChange={onInputChange} 
      buttonDisabled={buttonDisabled}
      pageActive={pageActive}
      page={page}
    />
  </>
}

export default connect(null, { postData, pageActive })(AddCustomer);