import React from 'react';

// dependencies
import { Link, useLocation } from 'react-router-dom';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCustomerData } from '../../state/customer/customer.selectors';

// ui settings
const liClassName = "list-group-item bg-item-list-cs list-group-item-action";

const CustomerInfo = ({
  data
}) => {

  const location = useLocation();

  const { byId } = data;

  return <>
    <div className="row">
      <div className="col-12">
        <div className="card my-3">
          <div className="card-header bg-card-cs">
            <div className="row">
              <div className="col text-uppercase font-weight-bold align-self-center">Customer Details</div>
            </div>
          </div>
          <ul className="list-group list-group-flush">
            <li className={liClassName}>
              <div className="row">
                <div className="col">
                  <div className="row">
                    <div className="col-4">
                      <span>Nickname:</span>
                    </div>
                    <div className="col-8">
                      <span>{byId.nickname}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Account Number:</span>
                    </div>
                    <div className="col-8">
                      <span>{byId.account}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Billing Address:</span>
                    </div>
                    <div className="col-8">
                      <span>{byId.fullname}</span><br />
                      <span>{byId.streetAddress1}, {byId.city}, {byId.state}</span><br />
                      <span>Phone# {byId.phone}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <Link 
                        to={`${location.pathname}?action=customer-edit`} 
                        className="a-link-cs"
                      >
                        Update Information
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className={liClassName}>
              <div className="row">
                <div className="col">
                  <div className="row">
                    <div className="col-4">
                      <span>Shipping Address:</span>
                    </div>
                    <div className="col-8 align-self-center">
                      <div className="form-check">
                        <label className="form-check-label" htmlFor='billing'>
                          <input 
                            className="form-check-input" 
                            type="radio" 
                            name="shippingAddress" 
                            value='' 
                            defaultChecked={(byId.shippingAddress === undefined || byId.shippingAddress === '')}
                            disabled={!(byId.shippingAddress === undefined || byId.shippingAddress === '')}
                          />
                            Same as Billing Address
                          </label>
                      </div>
                      {
                        byId.shippingInfo && byId.shippingInfo.map((address, index) => 
                          <div key={index} className="form-check">
                            <label className="form-check-label" htmlFor={address._id}>
                              <input 
                                className="form-check-input" 
                                type="radio" 
                                name="shippingAddress" 
                                id={address._id}
                                value={address._id}
                                defaultChecked={(byId.shippingAddress === address._id)}
                                disabled={!(byId.shippingAddress === address._id)}
                              />
                                <span>{address.fullname}</span><br />
                                <span>{address.streetAddress1}, {address.city}, {address.state}</span><br />
                                <span>Phone# {address.phone}</span>
                            </label>
                          </div>
                        )
                      }
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <Link 
                        to={`${location.pathname}?action=customer-addresses-update`} 
                        className="a-link-cs"
                      >
                        Update Shipping Information
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul> 
        </div>  
      </div> 
    </div>
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectCustomerData
})

export default connect(mapStateToProps)(CustomerInfo);