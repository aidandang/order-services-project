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
import { setCustomerComp } from '../../state/customer/customer.actions';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { postReq } from '../../state/api/api.requests';
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
const CustomerAdd = ({
  postReq,
  alertMessage,
  setCustomerComp
}) => {

  const [success, setSuccess] = useState(false);

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(formState, formState, formSchema);

  const formSubmit = () => {
    
    const fetchSuccess = CustomerActionTypes.CUSTOMER_FETCH_SUCCESS;
    const newCustomer = { ...formData };

    postReq('/customers', fetchSuccess, newCustomer, setSuccess, 'customer-add');
  }

  const formReset = () => {
    setValues(formState);
  }

  const goBack = () => {
    setCustomerComp('')
  }

  useEffect(() => {
    if (success) setCustomerComp('customer-info')
    // eslint-disable-next-line
  }, [success])

  return <>

    { alertMessage && alertMessage.component === 'customer-add' && <AlertMesg /> }

    <Container width="col" goBack={goBack}>
      <form>
        <Card width="col" title={'Add a new customer'}>
          <Ul>
            <CustomerForm
              formData={formData} 
              errors={errors} 
              onInputChange={onInputChange}
            />
            <SubmitOrReset 
              buttonName={'Add Customer'}
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
  alertMessage: selectAlertMessage
})

const mapDispatchToProps = dispatch => ({
  postReq: (
    pathname, 
    fetchSuccess, 
    reqBody, 
    setSuccess,
    component
  ) => dispatch(postReq(
    pathname, 
    fetchSuccess, 
    reqBody, 
    setSuccess,
    component
  )),
  setCustomerComp: comp => dispatch(setCustomerComp(comp))
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerAdd);