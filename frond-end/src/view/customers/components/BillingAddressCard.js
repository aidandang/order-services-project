import React from 'react';

// imports ui settings
import { liClassName } from '../../../state/actions/uiSettings';

export default function BillingAddressCard({
  customer,
  pageActive,
  saveCustomer,
  tab
}) {
  return (
    <div  className="card my-3">
      <div className="card-header bg-card-cs">
        <div className="row">
          <div className="col text-uppercase font-weight-bold">Billing Address</div>
        </div>
      </div>
      <ul 
        className="list-group list-group-flush"
        onClick={e => {
          e.preventDefault();
          if (tab === 'ADD_ORDER') 
            saveCustomer(
              { customer, address: customer },
              { name: 'CUSTOMER_INFO' }
            )
        }}       
      >
        <li className={liClassName}>
          <div className="row">
            <div className="col-12 align-self-center">
              <span className="font-weight-bold">{customer.fullname}</span><br />
              <span>{`${customer.streetAddress1},`}</span><br />
              <span>{`${customer.city}, ${customer.state} ${customer.zipcode}`}</span><br />
              <span>{customer.phone}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}