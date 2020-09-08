import React from 'react';

// dependencies
import * as Yup from "yup";

// customs and utils
import { useForm } from '../../utils/useForm';

// components
import LoginForm from './login-form.component';
import AlertMesg from '../../components/alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { postUserAuthReq } from '../../state/api/auth-requests';
import { selectAlertMessage } from '../../state/alert/alert.selectors';

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

const Login = ({ 
  postUserAuthReq, 
  alertMessage
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
    postUserAuthReq('/users/login', formData)
  }

  return <>
    { 
      alertMessage 
      ? <AlertMesg />
      : <LoginForm 
        formData={formData} 
        formSubmit={formSubmit} 
        errors={errors} 
        onInputChange={onInputChange} 
        buttonDisabled={buttonDisabled}
      />
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  alertMessage: selectAlertMessage
})

const mapDispatchToProps = dispatch => ({
  postUserAuthReq: (endpoint, reqBody) => dispatch(postUserAuthReq(endpoint, reqBody))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);