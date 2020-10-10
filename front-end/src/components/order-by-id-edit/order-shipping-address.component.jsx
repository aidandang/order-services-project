import React from 'react';

// dependencies
import { useLocation } from 'react-router-dom';
// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOrderTemp } from '../../state/order/order.selectors';
import { updateShippingAddressToOrder, updateCustomerToOrder } from '../../state/order/order.actions';
// ui settings
const liClassName = "list-group-item bg-item-list-cs list-group-item-action";

const OrderShippingAddress = ({
  orderTemp,
  updateShippingAddressToOrder,
  updateCustomerToOrder
}) => {

  const location = useLocation();

  let queryStr = location.search;

  if (queryStr.match(/select-customer/g)) {
    queryStr = location.search.replace('select-customer', 'add-items')
  } else {
    queryStr = location.search + '&stage=add-items'
  }

  const { customer, shippingAddress } = orderTemp;

  const handleChange = e => {
    e.stopPropagation();
    const id = e.target.value;
    updateShippingAddressToOrder(id);
  }

  return <>
    <div className="row">
      <div className="col"> 
        <div className="card my-3">
          <div className="card-header bg-card-cs">
            <div className="row">
              <div className="col text-uppercase font-weight-bold align-self-center">
                Customer Information
              </div>
              <div className="col text-right">
                <a 
                  href="/"
                  className="a-link-cs" 
                  onClick={e => {
                    e.preventDefault();
                    updateCustomerToOrder(null, null)
                  }}
                >
                  Remove
                </a>
              </div>
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
                      <span>{customer.nickname}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Account Number:</span>
                    </div>
                    <div className="col-8">
                      <span>{customer.account}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Billing Address:</span>
                    </div>
                    <div className="col-8">
                      <span>{customer.fullname}</span><br />
                      <span>{customer.streetAddress1}, {customer.city}, {customer.state}</span><br />
                      <span>Phone# {customer.phone}</span>
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
                    <div className="col-8 align-self-center" onChange={handleChange}>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="shippingAddress" id='billing' value='' defaultChecked={shippingAddress === ''} />
                        <label className="form-check-label" htmlFor='billing'>
                          Same as Billing Address
                        </label>
                      </div>
                      {
                        customer.shippingInfo && customer.shippingInfo.map(address => 
                          <div key={address._id} className="form-check">
                            <label className="form-check-label" htmlFor={address._id}>
                              <input 
                                className="form-check-input" 
                                type="radio" 
                                name="shippingAddress" 
                                id={address._id} 
                                value={address._id}
                                defaultChecked={shippingAddress === address._id}
                              />
                              <span>{customer.fullname}</span><br />
                              <span>{customer.streetAddress1}, {customer.city}, {customer.state}</span><br />
                              <span>Phone# {customer.phone}</span>
                            </label>
                          </div>
                        )
                      }
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
  orderTemp: selectOrderTemp
})

const mapDispatchToProps = dispatch => ({
  updateShippingAddressToOrder: id => dispatch(updateShippingAddressToOrder(id)),
  updateCustomerToOrder: (customer, shippingAddress) => dispatch(updateCustomerToOrder(customer, shippingAddress))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderShippingAddress);