import React from 'react';

// import hooks
import { useForm } from '../../../hooks/useForm';

// import redux dependencies
import { connect } from 'react-redux';

// import other dependencies
import * as Yup from "yup";

// import components
import { postData } from '../../../state/_shared/middleware/api';
import { FetchType } from '../../../state/actions/data';
import ForgotPasswordForm from '../components/ForgotPasswordForm';

// set customer information schema
const formSchema = Yup.object().shape({
  email: Yup
    .string()
    .email("This must be a valid email address.")
    .required("Please provide your email.")
});

// set form state
const formState = {
  email: ""
};

const ForgotPassword = (props) => {

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
    props.postData('/users/forgotpassword', formData, FetchType);
  }

  return <>
    <ForgotPasswordForm 
      formData={formData} 
      formSubmit={formSubmit} 
      errors={errors} 
      onInputChange={onInputChange} 
      buttonDisabled={buttonDisabled}
    />
  </>
}

export default connect(null, { postData })(ForgotPassword);