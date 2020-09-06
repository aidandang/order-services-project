import React, { useEffect } from 'react';

// dependencies
import * as Yup from "yup";

// customs and utils
import { useForm } from '../../utils/useForm';

// components
import RegisterForm from './register-form.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { postUserAuthReq } from '../../state/api/auth-requests';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { clearAlertMessage } from '../../state/alert/alert.actions';

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
  alertMessage, 
  clearAlertMessage  
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

  useEffect(() => {
    return () => {
      clearAlertMessage();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

const mapStateToProps = createStructuredSelector({
  errMessage: selectAlertMessage
})

const mapDispatchToProps = dispatch => ({
  postUserAuthReq: (endpoint, reqBody) => dispatch(postUserAuthReq(endpoint, reqBody)),
  clearAlertMessage: () => dispatch(clearAlertMessage())
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);