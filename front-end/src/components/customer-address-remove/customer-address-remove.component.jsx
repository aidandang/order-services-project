import React, { useState } from 'react';

// dependencies
import { useLocation, Link, Redirect } from 'react-router-dom';
import queryString from 'query-string';

// components
import { Button } from '../tag/tag.component';
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

// main component
const CustomerAddressRemove = ({
  patchReq,
  data,
  alertMessage
}) => {

  const location = useLocation();
  const [success, setSuccess] = useState(false);
  const { byId } = data;

  const queryObj = queryString.parse(location.search);
  const { id } = queryObj;

  const formSubmit = e => {
    e.preventDefault();

    const fetchSuccess = CustomerActionTypes.CUSTOMER_FETCH_SUCCESS;

    let newArray = byId.shippingInfo.slice()
    newArray.splice(id, 1)
    
    const customerTemp = { 
      ...byId,
      shippingInfo: newArray
    }
    patchReq('/customers/' + byId._id, fetchSuccess, customerTemp, setSuccess);
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
                    <div className="col text-uppercase font-weight-bold align-self-center">Remove Address</div>
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
                  <li className={liClassName}>
                    <span>Do you want to remove?</span>
                  </li>
                  <li className={liClassName}>
                    <div className="row mt-3">
                      <div className="col-md-4">
                        <div className="form-group">
                          <Button 
                            type="submit"
                          >
                            Remove
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerAddressRemove);