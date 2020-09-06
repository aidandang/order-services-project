import React, { useEffect } from 'react';

// dependencies
import * as Yup from "yup";

// customs and utils
import { useForm } from '../../utils/useForm';

// components
import ForgotPasswordForm from './forgot-password-form.component';
import AlertMesg from '../../components/alert-mesg/alert-mesg.component';

// ui settings
import './forgot-password.styles.css';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { postReq } from '../../state/api/post-request';
import { AlertActionTypes } from '../../state/alert/alert.types';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { clearAlertMessage } from '../../state/alert/alert.actions';

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
  postReq,
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
    
    const fetchSuccess = AlertActionTypes.SET_ALERT_MESSAGE
    
    postReq(
      '/users/forgot-password',
      formData, 
      fetchSuccess
    )
  }

  useEffect(() => {
    return () => {
      clearAlertMessage();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return <>
    { alertMessage && <AlertMesg alertMessage={alertMessage} />}

    <ForgotPasswordForm 
      formData={formData} 
      formSubmit={formSubmit} 
      errors={errors} 
      onInputChange={onInputChange} 
      buttonDisabled={buttonDisabled}
    />
  </>
}

const mapStateToProps = createStructuredSelector({
  alertMessage: selectAlertMessage
})

const mapDispatchToProps = dispatch => ({
  postReq: (pathname, reqBody, fetchSuccess, queryStr) => dispatch(postReq(pathname, reqBody, fetchSuccess, queryStr)),
  clearAlertMessage: () => dispatch(clearAlertMessage())
})

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);