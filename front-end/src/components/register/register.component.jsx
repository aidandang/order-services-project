import React from 'react';

// dependencies
import * as Yup from "yup";

// customs and utils
import { useForm } from '../../utils/useForm';

// components
import RegisterForm from './register-form.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { postUserAuthReq } from '../../state/api/auth-requests';
import { selectAlertMessage } from '../../state/alert/alert.selectors';

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

const Register = ({ 
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
    postUserAuthReq('/users/signup', formData);
  }

  return <>
    {
      alertMessage
      ? <AlertMesg />
      : <RegisterForm 
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);