import React from 'react';

// ui settings
import { liClassName } from '../../../state/actions/uiSettings';

// MAIN COMPONENT
export default function CustomerInfoCard({ 
  customer,
  address,
  saveCustomer
}) {
  return <>
    <div className="row">
      <div className="col-md-6">

        {/* Selected Customer Card */}
        <div className="card my-3">

          {/* Card Header */}
          <div className="card-header bg-card-cs">
            <div className="row">
              <div className="col text-uppercase font-weight-bold align-self-center">SELECTED CUSTOMER</div>
              <div className="col text-right">
                <a 
                  href="/" 
                  className="a-link-cs" 
                  name="saveCustomer"
                  // set undefined to update customerId of the order state to null
                  onClick={(e) => { 
                    e.preventDefault(); 
                    saveCustomer({ customer: undefined, address: undefined }, { name: 'CUSTOMER_LIST' }); 
                  }}
                >
                  Change
                </a>
              </div>
            </div>
          </div>
          {/* End of Card Header */}

          {/* Card Body */}
          <ul className="list-group list-group-flush">
            <li className={liClassName}>
              <div className="row">
                <div className="col">
                  <span className="font-weight-bold">{customer.fullname} - {customer.account}</span><br /><br />
                  <div>
                    <span className="font-weight-bold">Billing Address:</span><br />
                    <span>{customer.streetAddress1}, {customer.city}, {customer.state}</span><br />
                    <span>Phone# {customer.phone}</span>
                  </div><br />
                  <div>
                    <span className="font-weight-bold">Shipping Address:</span><br />
                    { customer._id === address._id ?
                      <div className="form-check">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          defaultChecked
                          disabled="disabled"
                        />
                        <label className="form-check-label" htmlFor="shippingIsBilling">
                          Same as Billing Address
                        </label>
                      </div>
                      : <>
                        <span>{address.fullname}</span><br />
                        <span>{address.streetAddress1}, {address.city}, {address.state}</span><br />
                        <span>Phone# {address.phone}</span>
                      </>
                    }   
                  </div>
                </div>
              </div>
            </li>
          </ul>
          {/* End of Card Body */}

        </div>
        {/* End of Selected Customer Card */}              

      </div>
    </div>                 
  </>
}