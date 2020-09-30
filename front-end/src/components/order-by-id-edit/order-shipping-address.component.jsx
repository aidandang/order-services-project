import React from 'react';

// dependencies
import { useHistory, useLocation } from 'react-router-dom';
// components 
import Button from '../button/button.component';
// ui settings
const liClassName = "list-group-item bg-item-list-cs list-group-item-action";

const OrderShippingAddress = ({
  customer,
  setOrder
}) => {

  const location = useLocation();
  const history = useHistory();

  const handleChange = e => {
    e.stopPropagation();
    console.log('hello')

  }

  const formSubmit = e => {
    e.preventDefault();
    console.log(e.target)
  }

  return <>
    <form onSubmit={formSubmit}>
      <div className="row">
        <div className="col-xl-8"> 
          <div className="card my-3">
            <div className="card-header bg-card-cs">
              <div className="row">
                <div className="col text-uppercase font-weight-bold align-self-center">
                  Customer Information
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
                          <input className="form-check-input" type="radio" name="shippingAddress" id='billing' value='' />
                          <label className="form-check-label" htmlFor='billing'>
                            Same as Billing Address
                          </label>
                        </div>
                        {
                          customer.shippingInfo && customer.shippingInfo.map(address => 
                            <div key={address._id} className="form-check">
                              <label className="form-check-label" htmlFor={address._id}>
                                <input className="form-check-input" type="radio" name="shippingAddress" id={address._id} value={address} />
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
        <div className="col-xl-4"> 
          
            <div className="card my-3">
              <div className="card-header bg-card-cs">
                <div className="row">
                  <div className="col text-uppercase font-weight-bold">Update Confirmation</div>
                </div>
              </div>
              <ul className="list-group list-group-flush">
                <li className={liClassName}>      
                  <div className="row">
                    <div className="col mt-3">
                      <div className="form-group">
                        <Button 
                          type="submit" 
                        >
                          Save
                        </Button>
                        <span className="mr-3"></span>
                        <Button
                          onClick={e => {
                            e.preventDefault();
                            setOrder(prevState => ({
                              ...prevState,
                              customer: null
                            }))
                          }}
                        >
                          Cancel
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
  </>
}

export default OrderShippingAddress;