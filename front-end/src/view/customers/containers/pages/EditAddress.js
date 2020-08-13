import React from 'react';

// import dependencies
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as Yup from "yup";

// import custom components as helpers
import { useForm } from '../../../../utils/useForm';

// import _shared components

// import child components
import AddressForm from '../../components/AddressForm';

// import redux middleware, actions and settings
import { patchData } from '../../../../state/_shared/middleware/api';
import { setPageActive } from '../../../../state/actions/ui';
import { FetchType } from '../../../../state/actions/data';

// CONSTANCE DECLARATION //
// redux state and dispatch map to props
const mapStateToProps = (state) => ({
  customer: state.data.customers.byId,
  pageWrapper: state.ui.pageWrapper
});
const pageActive = (page) => dispatch => {
  dispatch(setPageActive(page));
}

// set customer information schema
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

// MAIN COMPONENT
const EditAddress = ({
  pageWrapper,
  customer,
  patchData,
  pageActive
}) => {
  const { page } = pageWrapper.tabbar.active;
  const params = useParams();
  
  const query = `/shippinginfo/${page.id}`;
  const address = customer.shippingInfo.find(address => 
    address._id === page.id
  );

  // set custom form hook
  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled
  ] = useForm(address, formState, formSchema);

  // Form submit function
  const formSubmit = e => {
    e.preventDefault();
    patchData('/customers/' + params.id + query, formData, FetchType, { name: 'ADDRESS_LIST' });
  }

  return <>
 
    <AddressForm 
      formData={formData} 
      formSubmit={formSubmit} 
      errors={errors} 
      onInputChange={onInputChange}
      pageActive={pageActive}
      buttonDisabled={buttonDisabled}
      title={'EDIT ADDRESS'}
    />
    
  </>
}

export default connect(mapStateToProps, { patchData, pageActive })(EditAddress);