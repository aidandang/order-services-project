import React from 'react';

// imports ui settings
import { liClassName } from '../../../state/actions/uiSettings';

export default function AddressCard({
  customer,
  address,
  pageActive,
  saveCustomer,
  tab
}) {
  return (
    <div  className="card my-3">
      <div className="card-header bg-card-cs">
        <div className="row">
          <div className="col text-uppercase font-weight-bold">ADDRESS</div>
          {tab !== 'ADD_ORDER' &&
            <div className="col text-right">
              <a 
                href="/" 
                className="a-link-cs mr-2" 
                name="accountInfo" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  pageActive({
                    name: 'EDIT_ADDRESS', 
                    id: address._id 
                  }) 
                }}
              >
                Edit
              </a>{'|'} 
              <a 
                href="/" 
                className="a-link-cs ml-2" 
                name="accountInfo" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  pageActive({
                    name: 'REMOVE_ADDRESS', 
                    id: address._id 
                  })
                }}
              >
                Remove
              </a>
            </div>
          }
        </div>
      </div>
      <ul 
        className="list-group list-group-flush"
        onClick={e => {
          e.preventDefault();
          if (tab === 'ADD_ORDER') 
            saveCustomer(
              { customer, address },
              { name: 'CUSTOMER_INFO' }
            )
        }}        
      >
        <li className={liClassName}>
          <div className="row">
            <div className="col-12 align-self-center">
              <span className="font-weight-bold">{address.fullname}</span><br />
              <span>{`${address.streetAddress1},`}</span><br />
              <span>{`${address.city}, ${address.state} ${address.zipcode}`}</span><br />
              <span>{address.phone}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}