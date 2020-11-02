import React, { useState, useEffect } from 'react';

// dependencies
import * as Yup from "yup";

// components
import { Container, Card, Ul } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component';
import CustomerForm from './customer-form.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { patchReq } from '../../state/api/api.requests';
import { selectCustomerData } from '../../state/customer/customer.selectors';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { CustomerActionTypes } from '../../state/customer/customer.types';
import { setCustomerComp } from '../../state/customer/customer.actions';

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
  data,
  patchReq,
  alertMessage,
  setCustomerComp
}) => {

  const { byId } = data;

  const [success, setSuccess] = useState(false);

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(byId, formState, formSchema);

  const formSubmit = () => {
    const fetchSuccess = CustomerActionTypes.CUSTOMER_FETCH_SUCCESS;
    const reqBody = { ...formData }

    patchReq(`/customers/${byId._id}`, fetchSuccess, reqBody, setSuccess, 'customer-edit');
  }

  const formReset = () => {
    setValues(formState);
  }

  const goBack = () => {
    setCustomerComp('customer-info')
  }

  useEffect(() => {
    if (success) setCustomerComp('customer-info')
    // eslint-disable-next-line
  }, [success])

  return <>

    { alertMessage && alertMessage.component === 'customer-edit' && <AlertMesg/> }
    
    <Container width="col" goBack={goBack}>
      <form>
        <Card width="col" title={'Edit Customer'}>
          <Ul>
            <CustomerForm
              formData={formData} 
              errors={errors} 
              onInputChange={onInputChange}
            />
            <SubmitOrReset 
              buttonName={'Update'}
              buttonDisabled={buttonDisabled}
              formSubmit={formSubmit}
              formReset={formReset}
            />
          </Ul>
        </Card>
      </form>
    </Container>
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectCustomerData,
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
  )),
  setCustomerComp: comp => dispatch(setCustomerComp(comp))
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerEdit);