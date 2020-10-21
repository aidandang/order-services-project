import React, { useState } from 'react';

// dependencies
import * as Yup from "yup";
import { useLocation, Redirect } from 'react-router-dom';

// components
import { Container } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import SubmitCard from '../submit-card/submit-card.component';
import CustomerForm from '../customer-form/customer-form.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { patchReq } from '../../state/api/patch-request';
import { CustomerActionTypes } from '../../state/customer/customer.types';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { selectCustomerData } from '../../state/customer/customer.selectors';

// initial values
const formSchema = Yup.object().shape({
  username: Yup
    .string()
    .required(),
  email: Yup
    .string()
    .email(),
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
  username: "",
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
  patchReq,
  alertMessage,
  data
}) => {

  const { byId } = data;
  const customerTemp = byId ? { ...byId } : formState;
  
  const location = useLocation();

  const [success, setSuccess] = useState(false);

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(customerTemp, formState, formSchema);

  const formSubmit = () => {
    const fetchSuccess = CustomerActionTypes.CUSTOMER_FETCH_SUCCESS;
    const updatedCustomer = { ...formData };
    patchReq(`/customers/${updatedCustomer._id}`, fetchSuccess, updatedCustomer, setSuccess);
  }

  const formReset = () => {
    setValues(formState);
  }

  return <>

    {
      success && <Redirect to={{
        pathname: location.state.path,
        state: {
          key: location.key,
          path: location.pathname + location.search
        }
      }} />
    }

    { alertMessage && <AlertMesg /> }

    <Container width="col">
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
  </>
}

const mapStateToProps = createStructuredSelector({
  alertMessage: selectAlertMessage,
  data: selectCustomerData
})

const mapDispatchToProps = dispatch => ({
  patchReq: (pathname, fetchSuccess, reqBody, setSuccess) => dispatch(
    patchReq(pathname, fetchSuccess, reqBody, setSuccess)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerEdit);