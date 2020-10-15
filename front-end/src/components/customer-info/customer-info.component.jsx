import React from 'react';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCustomerData } from '../../state/customer/customer.selectors';

// ui settings
const liClassName = "list-group-item bg-item-list-cs list-group-item-action";

const CustomerInfo = ({
  data
}) => {

  const { byId } = data;

  return <>
    { 
      byId && <>
    
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
                  <input 
                    className="form-check-input" 
                    type="radio" 
                    name="shippingAddress" 
                    value='' 
                    defaultChecked={byId.shippingAddress === undefined} />
                  <label className="form-check-label" htmlFor='billing'>
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
                          defaultChecked={byId.shippingAddress === address._id}
                        />
                        <span>{byId.fullname}</span><br />
                        <span>{byId.streetAddress1}, {byId.city}, {byId.state}</span><br />
                        <span>Phone# {byId.phone}</span>
                      </label>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </li>
      
      </>
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectCustomerData
})

export default connect(mapStateToProps)(CustomerInfo);