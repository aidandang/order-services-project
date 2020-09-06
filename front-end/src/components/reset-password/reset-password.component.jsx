import React, { useEffect } from 'react';

// dependencies
import * as Yup from "yup";
import { useParams } from 'react-router-dom';

// customs and utils
import { useForm } from '../../utils/useForm';

// components
import ResetPasswordForm from './reset-password-form.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { postUserAuthReq } from '../../state/api/auth-requests';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { clearAlertMessage } from '../../state/alert/alert.actions';

// set form schema
const formSchema = Yup.object().shape({
  password: Yup
    .string()
    .required("Please provide your password."),
  passwordConfirm: Yup
    .string()
    .oneOf([Yup.ref('password'), null], 'Confirmed password does NOT match.')
});

// set form state
const formState = {
  password: "",
  passwordConfirm: ""
};

const ResetPassword = ({ 
  postUserAuthReq, 
  alertMessage, 
  clearAlertMessage 
}) => {

  const params = useParams();

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
    postUserAuthReq(`/users/reset-password/${params.token}`, formData);
  }

  useEffect(() => {
    return () => {
      clearAlertMessage();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>
    <ResetPasswordForm 
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

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);