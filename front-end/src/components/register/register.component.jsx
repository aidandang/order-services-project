import React from 'react';

// dependencies
import * as Yup from "yup";

// customs and utils
import { useForm } from '../../utils/useForm';

// components
import RegisterForm from './register-form.component';

// redux
import { connect } from 'react-redux';
import { registerSubmit } from '../../state/api/api.requests';

// set form schema
const formSchema = Yup.object().shape({
  name: Yup
    .string()
    .required("Please provide your name"),
  email: Yup
    .string()
    .email("This must be a valid email address.")
    .required("Please provide your email."),
  password: Yup
    .string()
    .required("Please provide your password."),
  passwordConfirm: Yup
    .string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match.'),
  active: Yup
    .boolean()
});

// set form state
const formState = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
  active: false
};

const Register = ({ registerSubmit }) => {
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
    registerSubmit(formData);
  }

  return <>
    <RegisterForm 
      formData={formData} 
      formSubmit={formSubmit} 
      errors={errors} 
      onInputChange={onInputChange} 
      buttonDisabled={buttonDisabled}
    />
  </>
}

export default connect(null, { registerSubmit })(Register);