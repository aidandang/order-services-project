import React, { useState } from 'react';

// dependencies
import { Redirect } from 'react-router-dom';
import Button from '../button/button.component';

// components
import CustomerInfo from '../customer-info/customer-info.component';
import AddCustomerAddress from '../add-customer/add-customer-address.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { postReq } from '../../state/api/post-request';
import { CustomerActionTypes } from '../../state/customer/customer.types';
import { selectCustomerTemp } from '../../state/customer/customer.selectors';

// ui settings
const liClassName = "list-group-item bg-item-list-cs list-group-item-action";

const CustomerSubmit = ({
  customerTemp,
  setSaved,
  postReq
}) => {

  const [success, setSuccess] = useState(false);
  const [addAddress, setAddAddress] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    
    const fetchSuccess = CustomerActionTypes.CUSTOMER_FETCH_SUCCESS;
    postReq('/customers', fetchSuccess, customerTemp, setSuccess);
  }

  const handleBack = e => {
    e.preventDefault();
    setSaved(false);
  }

  const handleAddAddress = e => {
    e.preventDefault();
    setAddAddress(true);
  }

  return <>
    {
      success && <Redirect to={'/app/customer'} />
    }
    {
      addAddress === false &&
        <div className="row">
          <div className="col"> 
            <div className="card my-3">
              <div className="card-header bg-card-cs">
                <div className="row">
                  <div className="col text-uppercase font-weight-bold align-self-center">
                    Customer Information
                  </div>
                </div>
              </div>
              <ul className="list-group list-group-flush">
                
                <CustomerInfo />

                <li className={liClassName}>
                  <div className="row">
                    <div className="col">
                      <div className="row">
                        <div className="col">
                          <a 
                            href="/" 
                            className="a-link-cs"
                            onClick={e => handleAddAddress(e)}
                          >
                            ( + ) Add Shipping Address
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                
                <li className={liClassName}>      
                  <div className="row">
                    <div className="col mt-3">
                      <div className="form-group">
                        <Button
                          onClick={(e) => handleSubmit(e)}
                        >
                          Submit
                        </Button>
                        <span className="mr-3"></span>
                        <Button
                          onClick={(e) => handleBack(e)}
                        >
                          Back
                        </Button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>             
          </div>  
        </div>
    }
    { addAddress === true && <AddCustomerAddress setAddAddress={setAddAddress} />}
  </>
}

const mapStateToProps = createStructuredSelector({
  customerTemp: selectCustomerTemp
})

const mapDispatchToProps = dispatch => ({
  postReq: (pathname, fetchSuccess, reqBody, setSuccess) => dispatch(
    postReq(pathname, fetchSuccess, reqBody, setSuccess)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSubmit);