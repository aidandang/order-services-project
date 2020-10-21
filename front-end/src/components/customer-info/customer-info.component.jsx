import React from 'react';

// dependencies
import { Link, useLocation } from 'react-router-dom';

// components
import { Card, Ul, Li } from '../tag/tag.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCustomerData } from '../../state/customer/customer.selectors';

const CustomerInfo = ({
  data
}) => {

  const location = useLocation();

  const { byId } = data;

  return <>
    <Card width="col" title="Customer Information">
      <Ul>
        <Li>
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
                    to={{
                      pathname: location.pathname,
                      search: location.search ? `${location.search}&action=customer-edit` : `?action=customer-edit`,
                      state: {
                        key: location.key,
                        path: location.pathname + location.search
                      }
                    }}
                    className="a-link-cs"
                  >
                    Update Information
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Li>
        <Li>
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
                    to={{
                      pathname: location.pathname,
                      search: location.search ? `${location.search}&action=customer-shipping-info` : `?action=customer-shipping-info`,
                      state: {
                        key: location.key,
                        path: location.pathname + location.search
                      }
                    }}
                    className="a-link-cs"
                  >
                    Update Shipping Information
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Li>
      </Ul>
    </Card>
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectCustomerData
})

export default connect(mapStateToProps)(CustomerInfo);