import React from 'react';

// dependencies
import * as Yup from "yup";
import { useParams } from 'react-router-dom';

// customs and utils
import { useForm } from '../../utils/useForm';

// components
import ResetPasswordForm from './reset-password-form.component';

// redux
import { connect } from 'react-redux';
import { postUserAuthReq } from '../../state/api/api.requests';

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

const ResetPassword = ({ postUserAuthReq }) => {

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
    postUserAuthReq(`/users/reset-password/${params.token}`, formData, 'resetPassword');
  }

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

export default connect(null, { postUserAuthReq })(ResetPassword);