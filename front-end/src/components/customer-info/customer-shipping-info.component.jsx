import React, { useState, useEffect } from 'react';

// dependencies
import * as Yup from "yup";

// components
import { Container, Card, Ul } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import CustomerAddressForm from './customer-address-form.component';
import AddressOptions from './address-options.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { patchReq } from '../../state/api/api.requests';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { CustomerActionTypes } from '../../state/customer/customer.types';

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
  byId,
  patchReq,
  alertMessage,
  goBack
}) => {

  const [radio, setRadio] = useState('');
  const [success, setSuccess] = useState(false);

  let customerTemp = null;

  const pathname = `/customers/${byId._id}`;
  const fetchSuccess = CustomerActionTypes.CUSTOMER_FETCH_SUCCESS;
  const component = 'customer-shipping-info';

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(formState, formState, formSchema);

  const formSubmit = e => {
    e.preventDefault();

    const obj =  { ...formData };
    delete obj.action;
    delete obj.handle;

    if (formData.action === 'add') {
      customerTemp = { 
        ...byId,
        shippingInfo: [ ...byId.shippingInfo, obj]
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
            ...obj
          }
        })
      }
    }

    const reqBody = { ...customerTemp }
    patchReq(pathname, fetchSuccess, reqBody, null, component);
    setValues(prevState => ({
      ...prevState,
      action: ''
    }))
  }

  const formReset = () => {
    const obj = { ...formState }
    delete obj.action

    setValues(prevState => ({
      ...prevState,
      ...obj
    }))
  }

  const handleRemoveSubmit = (e, id) => {
    e.preventDefault();

    let newArray = byId.shippingInfo.slice()
    newArray.splice(id, 1)
    
    customerTemp = { 
      ...byId,
      shippingInfo: newArray
    }

    const reqBody = { ...customerTemp }
    patchReq(pathname, fetchSuccess, reqBody, null, component);
    setValues(prevState => ({
      ...prevState,
      action: ''
    }))
  }

  const handleRadioSubmit = (e) => {
    e.preventDefault();

    customerTemp = {
      ...byId,
      shippingAddress: radio
    }

    const reqBody = { ...customerTemp }
    patchReq(pathname, fetchSuccess, reqBody, setSuccess, component);
  }

  const handleRadioOnChange = e => {
    e.stopPropagation();
    setRadio(e.target.value)
  }

  useEffect(() => {
    if (success) goBack()
    // eslint-disable-next-line
  }, [success])

  return <>
    { alertMessage && alertMessage.component === 'customer-shipping-info' && <AlertMesg/> }

    {
      !success &&
      <Container width="col" goBack={goBack}>
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerShippingInfo);