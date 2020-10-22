import React, { useState, useEffect } from 'react';

// dependencies
import * as Yup from "yup";
import { useLocation, Redirect } from 'react-router-dom';
import queryString from 'query-string';

// components
import { Container, Card, Ul } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import CustomerAddressForm from './customer-address-form.component';
import AddressOptions from './address-options.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { patchReq } from '../../state/api/patch-request';
import { getReq } from '../../state/api/get-request';
import { CustomerActionTypes } from '../../state/customer/customer.types';
import { selectCustomerData } from '../../state/customer/customer.selectors';
import { selectAlertMessage } from '../../state/alert/alert.selectors';

// initial values
const formSchema = Yup.object().shape({
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
  action: "",
  fullname: "",
  othername: "",
  country: "",
  streetAddress1: "",
  streetAddress2: "",
  city: "",
  state: "",
  zipcode: "",
  phone: ""
};

const CustomerShippingInfo = ({
  patchReq,
  getReq,
  data,
  alertMessage
}) => {

  const location = useLocation();

  const [radio, setRadio] = useState('');
  const [success, setSuccess] = useState(false);

  const queryObj = queryString.parse(location.search);
  const { id } = queryObj;

  const { byId } = data;

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(formState, formState, formSchema);

  const formSubmit = e => {
    e.preventDefault();

    let customerTemp = null;

    const fetchSuccess = CustomerActionTypes.CUSTOMER_FETCH_SUCCESS;

    if (formData.action === 'add') {
      customerTemp = { 
        ...byId,
        shippingInfo: [ ...byId.shippingInfo, formData]
      }
    }

    if (formData.action === 'edit') {
      customerTemp = { 
        ...byId,
        shippingInfo: byId.shippingInfo.map(address => {
          if (address._id !== formData._id) {
            return address
          }
          return {
            ...address,
            ...formData
          }
        })
      }
    }
    
    patchReq('/customers/' + byId._id, fetchSuccess, customerTemp);
    setValues(prevState => ({
      ...prevState,
      action: ''
    }))
  }

  const formReset = () => {
    setValues(formState)
  }

  const handleRemoveSubmit = (e, id) => {
    e.preventDefault();

    const fetchSuccess = CustomerActionTypes.CUSTOMER_FETCH_SUCCESS;

    let newArray = byId.shippingInfo.slice()
    newArray.splice(id, 1)
    
    const customerTemp = { 
      ...byId,
      shippingInfo: newArray
    }
    patchReq('/customers/' + byId._id, fetchSuccess, customerTemp);
  }

  const handleRadioSubmit = (e) => {
    e.preventDefault();

    const updatedCustomer = {
      ...byId,
      shippingAddress: radio
    }

    const fetchSuccess = CustomerActionTypes.CUSTOMER_FETCH_SUCCESS;
    patchReq('/customers/' + byId._id, fetchSuccess, updatedCustomer, setSuccess)
  }

  const handleRadioOnChange = e => {
    e.stopPropagation();
    
    const value = e.target.value;
    setRadio(value)
  }

  useEffect(() => {
    const fetchSuccess = CustomerActionTypes.CUSTOMER_FETCH_SUCCESS;

    if ((byId === undefined) || (byId && byId._id !== id)) {
      getReq('/customers/' + id, fetchSuccess)
    }
    // eslint-disable-next-line
  }, [])

  return <>
    { alertMessage && <AlertMesg /> }

    {
      success && <Redirect to={location.state.from} />
    }

    { 
      byId && byId._id === id &&
      <>
        <Container width="col">
          <Card width="col" title="Shipping Information">
            <Ul>
              <AddressOptions
                handleRemoveSubmit={handleRemoveSubmit}
                handleRadioSubmit={handleRadioSubmit}
                handleRadioOnChange={handleRadioOnChange}
                byId={byId}
                formData={formData}
                setValues={setValues}
                formState={formState}
              />
            
              { (formData.action === 'add' || formData.action === 'edit' ) &&
                <CustomerAddressForm
                  formData={formData}
                  formSubmit={formSubmit} 
                  formReset={formReset}
                  errors={errors} 
                  onInputChange={onInputChange}
                  buttonDisabled={buttonDisabled}
                  buttonText={[formData.add ? 'Add Address' : 'Update', 'Reset']}
                />
              }
            </Ul>
          </Card>
        </Container>
      </>
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectCustomerData,
  alertMessage: selectAlertMessage
})

const mapDispatchToProps = dispatch => ({
  patchReq: (pathname, fetchSuccess, reqBody, setSuccess) => dispatch(
    patchReq(pathname, fetchSuccess, reqBody, setSuccess)
  ),
  getReq: (pathname, fetchSuccess, queryStr) => dispatch(
    getReq(pathname, fetchSuccess, queryStr)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerShippingInfo);