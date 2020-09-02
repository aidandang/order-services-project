import React from 'react';

// dependencies
import * as Yup from "yup";

// customs and utils
import { useForm } from '../../utils/useForm';

// components
import LoginForm from './login-form.component';

// redux
import { connect } from 'react-redux';
import { logInWithEmailAndPassword } from '../../state/api/api.requests';

// set form schema
const formSchema = Yup.object().shape({
  email: Yup
    .string()
    .email("This must be a valid email address.")
    .required("Please provide your email."),
  password: Yup
    .string()
    .required("Please provide your password.")
});

// set form state
const formState = {
  email: "",
  password: ""
};

const Login = ({ logInWithEmailAndPassword }) => {
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
    logInWithEmailAndPassword(formData)
  }

  return <>
    <LoginForm 
      formData={formData} 
      formSubmit={formSubmit} 
      errors={errors} 
      onInputChange={onInputChange} 
      buttonDisabled={buttonDisabled}
    />
  </>
}

export default connect(null, { logInWithEmailAndPassword })(Login);