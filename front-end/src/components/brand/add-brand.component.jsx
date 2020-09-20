import React, { useState } from 'react';

//dependencies
import * as Yup from "yup";
import { Redirect, useLocation } from 'react-router-dom';
// components
import { useForm } from '../custom-hooks/use-form';
import AddBrandForm from './add-brand-form.component';
import AlertMesg from '../../components/alert-mesg/alert-mesg.component';
// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { BrandActionTypes } from '../../state/brand/brand.types';
import { postReq } from '../../state/api/post-request';

// set form schema
const formSchema = Yup.object().shape({
  name: Yup
    .string()
    .required("Name is required."),
  preferredName: Yup
    .string()
    .required("Preferred name is required.")
});
// set form state
const formState = {
  name: "",
  preferredName: ""
};

const AddBrand = ({
  postReq,
  alertMessage
}) => {
  
  const location = useLocation();

  const [success, setSuccess] = useState(false);

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled
  ] = useForm(formState, formState, formSchema);

  const formSubmit = e => {
    e.preventDefault();
    const fetchSuccess = BrandActionTypes.BRAND_FETCH_SUCCESS;

    postReq('/brands', fetchSuccess, formData, setSuccess);
  }

  // main component
  return <>
    {success && <Redirect to={location.pathname} />}

    { alertMessage && <AlertMesg />}

    <AddBrandForm 
      formData={formData}
      errors={errors} 
      onInputChange={onInputChange} 
      buttonDisabled={buttonDisabled}
      formSubmit={formSubmit}
    />
  </>
}

const mapStateToProps = createStructuredSelector({
  alertMessage: selectAlertMessage
})

const mapDispatchToProps = dispatch => ({
  postReq: (pathname, fetchSuccess, reqBody, queryStr) => dispatch(postReq(
    pathname, fetchSuccess, reqBody, queryStr
  ))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddBrand);