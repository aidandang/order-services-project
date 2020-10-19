import React, { useState } from 'react';

// dependencies
import * as Yup from "yup";
import { useLocation, Link, Redirect } from 'react-router-dom';
import queryString from 'query-string';

// components
import { useForm } from '../hook/use-form';
import { Button } from '../tag/tag.component';
import CustomerAddressForm from '../customer-address-form/customer-address-form.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { patchReq } from '../../state/api/patch-request';
import { selectCustomerData } from '../../state/customer/customer.selectors';
import { selectAlertMessage} from '../../state/alert/alert.selectors';
import { CustomerActionTypes } from '../../state/customer/customer.types'; 

// data and ui settings
const liClassName = "list-group-item bg-item-list-cs list-group-item-action";

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
  addressId: "",
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

const CustomerAddressAdd = ({
  patchReq,
  data,
  alertMessage
}) => {

  const location = useLocation();
  const [success, setSuccess] = useState(false);
  const { byId } = data;

  const queryObj = queryString.parse(location.search);
  const { id } = queryObj;

  const addressTemp = byId.shippingInfo.find(address => address._id === id)

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(addressTemp ? addressTemp : formState, formState, formSchema);

  const formSubmit = e => {
    e.preventDefault();

    const fetchSuccess = CustomerActionTypes.CUSTOMER_FETCH_SUCCESS;

    const customerTemp = { 
      ...byId,
      shippingInfo: byId.shippingInfo.map(address => {
        if (address._id !== id) {
          return address
        }
        return {
          ...address,
          ...formData
        }
      })
    }
    patchReq('/customers/' + byId._id, fetchSuccess, customerTemp, setSuccess);
  }

  const formReset = () => {
    setValues(formState)
  }

  return <>
  
    {
      success && <Redirect to={`${location.pathname}?action=customer-addresses-update`} />
    }

    { 
      alertMessage 
      ? <AlertMesg />
      : <form onSubmit={formSubmit}>
          <div className="row">
            <div className="col-12">
              <div className="card my-3">
                <div className="card-header bg-card-cs">
                  <div className="row">
                    <div className="col text-uppercase font-weight-bold align-self-center">Edit Address</div>
                    <div className="col text-right">
                      <Link 
                        to={`${location.pathname}?action=customer-addresses-update`} 
                        className="a-link-cs"
                      >
                        Close
                      </Link>
                    </div>
                  </div>
                </div>
                <ul className="list-group list-group-flush">
                  <CustomerAddressForm
                    formData={formData} 
                    errors={errors} 
                    onInputChange={onInputChange}
                  />
                  <li className={liClassName}>
                    <div className="row mt-3">
                      <div className="col-md-4">
                        <div className="form-group">
                          <Button 
                            type="submit" 
                            disabled={buttonDisabled}
                          >
                            Update
                          </Button>
                          <span className="mr-3"></span>
                          <Button
                            onClick={e => {
                              e.preventDefault();
                              formReset()
                            }}
                          >
                            Reset
                          </Button>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </form>
    }       
  </>
}

const mapStateToProps = createStructuredSelector({
  alertMessage: selectAlertMessage,
  data: selectCustomerData
})

const mapDispatchToProps = dispatch => ({
  patchReq: (pathname, fetchSuccess, reqBody, setSuccess) => dispatch(
    patchReq(pathname, fetchSuccess, reqBody, setSuccess))
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerAddressAdd);