import React from 'react';

// dependencies
import * as Yup from "yup";

// customs and utils
import { useForm } from '../../utils/useForm';

// components
import ForgotPasswordForm from './forgot-password-form.component';

// ui settings
import './forgot-password.styles.css';

// redux
import { connect } from 'react-redux';
import { postReq } from '../../state/api/api.requests';
import { TabbarActionTypes } from '../../state/tabbar/tabbar.types';

// set form schema
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

const ForgotPassword = ({
  postReq
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
    postReq('/users/forgot-password', formData, 'forgotPassword', TabbarActionTypes.SET_TABBAR_MESSAGE)
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

export default connect(null, { postReq })(ForgotPassword);