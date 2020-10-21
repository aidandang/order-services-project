import React, { useState } from 'react';

// dependencies
import * as Yup from "yup";
import { Redirect, useLocation } from 'react-router-dom';

// components
import { Container } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import SubmitCard from '../submit-card/submit-card.component';
import CustomerForm from '../customer-form/customer-form.component';

// redux
import { connect } from 'react-redux';
import { postReq } from '../../state/api/post-request';
import { CustomerActionTypes } from '../../state/customer/customer.types';

// initial values
const formSchema = Yup.object().shape({
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
  postReq
}) => {

  const location = useLocation();

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

    postReq('/customers', fetchSuccess, newCustomer, setSuccess);
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

    <Container width="col">
      <form onSubmit={formSubmit}>
        <div className="row">
          <div className="col-12 col-xl-8">
            <CustomerForm
              formData={formData} 
              errors={errors} 
              onInputChange={onInputChange}
              formTitle={"Add a new customer"}
            />
          </div>
          <div className="col-12 col-xl-4">
            <SubmitCard
              formSubmit={formSubmit}
              handleSecond={formReset}
              buttonDisabled={buttonDisabled}
              buttonText={['Add Customer', 'Reset']}
            />
          </div>
        </div>
      </form>
    </Container>               
  </>
}

const mapDispatchToProps = dispatch => ({
  postReq: (pathname, fetchSuccess, reqBody, setSuccess) => dispatch(
    postReq(pathname, fetchSuccess, reqBody, setSuccess)
  )
})

export default connect(null, mapDispatchToProps)(CustomerAdd);