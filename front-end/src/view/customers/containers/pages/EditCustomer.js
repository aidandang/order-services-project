import React from 'react';

// import dependencies
import { connect } from 'react-redux';
import * as Yup from "yup";

// import custom components as helpers
import { useForm } from '../../../../utils/useForm';

// import _shared components

// import child components
import AccountInfoForm from '../../components/AccountInfoForm';
import BillingInfoForm from '../../components/BillingInfoForm';

// import redux middleware, actions and settings
import { patchData } from '../../../../state/_shared/middleware/api';
import { FetchType } from '../../../../state/actions/data';
import { setPageActive } from '../../../../state/actions/ui';

// CONSTANCE DECLARATION //
// redux state and dispatch map to props
const mapStateToProps = state => ({
  pageWrapper: state.ui.pageWrapper
})
const pageActive = (page) => dispatch => {
  dispatch(setPageActive(page));
}

// set form schema
const formSchema = Yup.object().shape({
  email: Yup
    .string()
    .email("Must be a valid email address."),
  nickname: Yup
    .string()
    .required("Must include a nickname"),
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
    .required("Phone is required"),
  shippingIsBilling: Yup
    .boolean(),
  shippingInfo: Yup
    .array(),
  rev: Yup
    .array()
});

// set form state
const formState = {
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

// MAIN COMPONENT
const EditCustomer = ({
  customer,
  patchData,
  pageActive,
  formType
}) => {

  // set custom form hook
  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled
  ] = useForm(customer, formState, formSchema);

  // Form submit function
  const formSubmit = e => {
    e.preventDefault();
    patchData('/customers/' + customer._id, formData, FetchType);
  }

  return <>
    {
      formType === 'ACCOUNT_INFO_FORM' 
      && <AccountInfoForm 
        formData={formData}
        formSubmit={formSubmit}
        errors={errors}
        onInputChange={onInputChange}
        pageActive={pageActive}
        buttonDisabled={buttonDisabled}
        title="ACCOUNT INFORMATION"
      />
    }
    {
      formType === 'BILLING_INFO_FORM'
      && <BillingInfoForm
        formData={formData}
        formSubmit={formSubmit}
        errors={errors}
        onInputChange={onInputChange}
        pageActive={pageActive}
        buttonDisabled={buttonDisabled}
        title="BILLING INFORMATION" 
      />
    }
  </>
}

export default connect(mapStateToProps, { patchData, pageActive })(EditCustomer);