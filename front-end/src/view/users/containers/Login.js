import React from 'react';

// import hooks
import { useHistory } from 'react-router-dom';
import { useForm } from '../../../hooks/useForm';

// import redux dependencies
import { connect } from 'react-redux';

// import other dependencies
import * as Yup from "yup";

// import components
import { postLogin } from '../../../state/_shared/middleware/api';
import { FetchType } from '../../../state/actions/data';
import LoginForm from '../components/LoginForm';

// set customer information schema
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

const Login = (props) => {
  const history = useHistory();

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
    props.postLogin('/users/login', formData, FetchType, history, '/app');
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

export default connect(null, { postLogin })(Login);