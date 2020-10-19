import React, { useState } from 'react';

// dependencies
import { useLocation, Link, Redirect } from 'react-router-dom';

// components
import AlertMesg from '../alert-mesg/alert-mesg.component';
import { Button } from '../tag/tag.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { patchReq } from '../../state/api/patch-request';
import { CustomerActionTypes } from '../../state/customer/customer.types';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { selectCustomerData } from '../../state/customer/customer.selectors';

// ui settings
const liClassName = "list-group-item bg-item-list-cs list-group-item-action";

const CustomerAddressesUpdate = ({
  patchReq,
  alertMessage,
  data
}) => {

  const location = useLocation();

  const [radio, setRadio] = useState('');
  const [success, setSuccess] = useState(false);

  const { byId } = data;

  const formSubmit = (e) => {
    e.preventDefault();

    const updatedCustomer = {
      ...byId,
      shippingAddress: radio
    }

    const fetchSuccess = CustomerActionTypes.CUSTOMER_FETCH_SUCCESS;
    patchReq('/customers/' + byId._id, fetchSuccess, updatedCustomer, setSuccess)
  }

  const handleOnChange = e => {
    e.stopPropagation();
    
    const value = e.target.value;
    setRadio(value)
  }

  return <>

    {
      success && <Redirect to={`${location.pathname}?action=customer-info`} />
    }

    { 
      alertMessage 
      ? <AlertMesg />
      : 
        <div className="row">
          <div className="col-12">
            <div className="card my-3">
              <div className="card-header bg-card-cs">
                <div className="row">
                  <div className="col text-uppercase font-weight-bold">Shipping Information</div>
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
              <form onSubmit={formSubmit}>
                <ul className="list-group list-group-flush" onChange={handleOnChange}>
                  <li className={liClassName}>
                    <div className="row">
                      <div className="col-9 align-self-center">
                        <div className="form-check">
                          <label className="form-check-label" htmlFor='billing'>
                            <input 
                              className="form-check-input" 
                              type="radio" 
                              name="shippingAddress" 
                              value='' 
                              defaultChecked={byId.shippingAddress === undefined || byId.shippingAddress === ''}
                            />
                              <span className="font-weight-bold">{byId.fullname}</span>
                              <span>{`, ${byId.streetAddress1}, ${byId.city}, ${byId.state}, ${byId.phone} (same as Billing Address)`}</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </li>
                  {
                    byId.shippingInfo.length > 0 && byId.shippingInfo.map((address, index) =>
                      <li key={index} className={liClassName}>
                        <div className="row">
                          <div className="col-9 align-self-center">
                            <div key={index} className="form-check">
                              <label className="form-check-label" htmlFor={address._id}>
                                <input 
                                  className="form-check-input" 
                                  type="radio" 
                                  name="shippingAddress"
                                  value={address._id}
                                  defaultChecked={byId.shippingAddress === address._id}
                                />
                                  <span className="font-weight-bold">{address.fullname}</span>
                                  <span>{`, ${address.streetAddress1}, ${address.city}, ${address.state}, ${address.phone}`}</span>
                              </label>
                            </div>
                          </div>
                          <div className="col-3 text-right">
                            <Link to={`${location.pathname}?action=customer-address-edit&id=${address._id}`} className="a-link-cs">Edit</Link>
                            {
                              byId.shippingAddress !== address._id && <>
                                <span>{' | '}</span>
                                <Link to={`${location.pathname}?action=customer-address-remove&id=${address._id}`} className="a-link-cs">Remove</Link>
                              </>
                            }
                          </div>
                        </div>
                      </li>
                    )
                  }

                  <li className={liClassName}>
                    <div className="row">
                      <div className="col">
                        <Link to={`${location.pathname}?action=customer-address-add`} className="a-link-cs">
                          ( + ) Add a New Address
                        </Link>
                      </div>  
                    </div>
                  </li>

                  <li className={liClassName}>
                    <div className="row mt-3">
                      <div className="col-md-4">
                        <div className="form-group">
                          <Button 
                            type="submit"
                          >
                            Use This Address
                          </Button>
                        </div>
                      </div>
                    </div>
                  </li>

                </ul>
              </form>
            </div>
          </div>        
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerAddressesUpdate);