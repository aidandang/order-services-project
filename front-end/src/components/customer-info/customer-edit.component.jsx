import React, { useState, useEffect } from 'react';

// dependencies
import * as Yup from "yup";

// components
import { Container } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import SubmitCard from '../submit-card/submit-card.component';
import CustomerForm from '../customer-form/customer-form.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { patchReq } from '../../state/api/api.requests';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { CustomerActionTypes } from '../../state/customer/customer.types';

// initial values
const formSchema = Yup.object().shape({
  email: Yup
    .string()
    .email()
    .required(),
  nickname: Yup
    .string()
    .required(),
  fullname: Yup
    .string()
    .required(),
  othername: Yup
    .string()
    .ensure(),
  country: Yup
    .string()
    .required(),
  streetAddress1: Yup
    .string()
    .required(),
  streetAddress2: Yup
    .string()
    .ensure(),
  city: Yup
    .string()
    .required(),
  state: Yup
    .string()
    .required(),
  zipcode: Yup
    .string()
    .required(),
  phone: Yup
    .string()
    .required()
});

const formState = {
  email: "",
  nickname: "",
  fullname: "",
  othername: "",
  country: "",
  streetAddress1: "",
  streetAddress2: "",
  city: "",
  state: "",
  zipcode: "",
  phone: ""
}

// main component
const CustomerEdit = ({
  byId,
  patchReq,
  alertMessage,
  goBack
}) => {

  const [success, setSuccess] = useState(false);

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(byId, formState, formSchema);

  const formSubmit = () => {
    const pathname = `/customers/${byId._id}`;
    const fetchSuccess = CustomerActionTypes.CUSTOMER_FETCH_SUCCESS;
    const reqBody = { ...formData }
    const component = 'customer-edit';

    patchReq(pathname, fetchSuccess, reqBody, setSuccess, component);
  }

  const formReset = () => {
    setValues(formState);
  }

  useEffect(() => {
    if (success) goBack()
    // eslint-disable-next-line
  }, [success])

  return <>

    { alertMessage && alertMessage.component === 'customer-edit' && <AlertMesg/> }

    {
      !success &&
      <Container width="col" goBack={goBack}>
        <form onSubmit={formSubmit}>  
          <div className="row">
            <div className="col-12 col-xl-8">
              <CustomerForm
                formData={formData} 
                errors={errors} 
                onInputChange={onInputChange}
                formTitle={"Edit Customer"}
              />
            </div>
            <div className="col-12 col-xl-4">
              <SubmitCard
                formSubmit={formSubmit}
                handleSecond={formReset}
                buttonDisabled={buttonDisabled}
                buttonText={['Update', 'Reset']}
              />
            </div>
          </div>
        </form>
      </Container>
    }

  </>
}

const mapStateToProps = createStructuredSelector({
  alertMessage: selectAlertMessage
})

const mapDispatchToProps = dispatch => ({
  patchReq: (
    pathname, 
    fetchSuccess, 
    reqBody, 
    setSuccess, 
    component
  ) => dispatch(patchReq(
    pathname,
    fetchSuccess,
    reqBody,
    setSuccess,
    component
  ))
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerEdit);