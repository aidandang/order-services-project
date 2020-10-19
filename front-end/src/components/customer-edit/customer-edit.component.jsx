import React, { useState } from 'react';

// dependencies
import * as Yup from "yup";
import { useLocation, Link, Redirect } from 'react-router-dom';

// components
import { useForm } from '../hook/use-form';
import { Button } from '../tag/tag.component';
import CustomerForm from '../customer-form/customer-form.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { patchReq } from '../../state/api/patch-request';
import { CustomerActionTypes } from '../../state/customer/customer.types';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { selectCustomerData } from '../../state/customer/customer.selectors';

// ui settings
const liClassName = "list-group-item bg-item-list-cs list-group-item-action";

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
    buttonDisabled
  ] = useForm(customerTemp, formState, formSchema);

  const formSubmit = () => {
    const fetchSuccess = CustomerActionTypes.CUSTOMER_FETCH_SUCCESS;
    const updatedCustomer = { ...formData };
    patchReq(`/customers/${updatedCustomer._id}`, fetchSuccess, updatedCustomer, setSuccess);
  }

  return <>
    {
      success && <Redirect to={`${location.pathname}?action=customer-info`} />
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
                    <div className="col text-uppercase font-weight-bold">Edit Customer</div>
                    <div className="col font-weight-bold text-right">
                      <Link 
                        to={`${location.pathname}?action=customer-info`} 
                        className="a-link-cs"
                      >
                        Close
                      </Link>
                    </div>
                  </div>
                </div>
                <ul className="list-group list-group-flush">

                  <CustomerForm
                    formData={formData} 
                    errors={errors} 
                    onInputChange={onInputChange}
                  />

                  <li className={liClassName}>      
                    <div className="row">
                      <div className="col mt-3">
                        <div className="form-group">
                          <Button
                            type="submit" 
                            onClick={e => {
                              e.preventDefault();
                              formSubmit();
                            }}
                            disabled={buttonDisabled}
                          >
                            Update
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
    patchReq(pathname, fetchSuccess, reqBody, setSuccess)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerEdit);