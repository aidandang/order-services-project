import React from 'react';

// import dependencies
import { connect } from 'react-redux';
import * as Yup from "yup";

// import custom components as helpers
import { useForm } from '../../../../hooks/useForm';

// import _shared components

// import child components
import AddressForm from '../../components/AddressForm';

// import redux middleware, actions and settings
import { postData } from '../../../../state/_shared/middleware/api';
import { FetchType } from '../../../../state/actions/data';
import { setPageActive } from '../../../../state/actions/ui';

// CONSTANCE DECLARATION //
// redux state and dispatch map to props
const mapStateToProps = state => ({
  customer: state.data.customers.byId
})
const pageActive = (page) => dispatch => {
  dispatch(setPageActive(page));
}

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
  customer,
  postData,
  pageActive
}) => {

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
    postData('/customers/' + customer._id + '/shippinginfo', formData, FetchType, { name: 'ADDRESS_LIST' });
  }

  return <>
    <AddressForm 
      formData={formData} 
      formSubmit={formSubmit} 
      errors={errors} 
      onInputChange={onInputChange}
      pageActive={pageActive} 
      buttonDisabled={buttonDisabled}
      title={'ADD ADDRESS'}
    />
  </>
}

export default connect(mapStateToProps, { postData, pageActive })(AddAddress);