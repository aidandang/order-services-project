import React from 'react';

// dependencies
import { useLocation, Link } from 'react-router-dom';
// ui settings
const liClassName = "list-group-item bg-item-list-cs list-group-item-action";

export default function ShippingInfo({
  customer
}) {

  const location = useLocation();

  return (
    <div  className="card my-3">
      <div className="card-header bg-card-cs">
        <div className="row">
          <div className="col text-uppercase font-weight-bold">SHIPPING ADDRESS</div>
        </div>  
      </div>
      <ul className="list-group list-group-flush">
        <li className={liClassName}>
          <div className="row"> 
            <div className="col-12 align-self-center text-center">
              <Link 
                to={`${location.pathname}?type=edit&action=add-address`} 
                className="a-link-cs"
              >
                (+) Add a New Address 
              </Link>
            </div>
          </div>
        </li>
        {
          customer && customer.shippingInfo && customer.shippingInfo.length > 0 &&
            customer.shippingInfo.map((address, index) => 
              <li key={address._id} className={liClassName}>
                <div className="row">
                  <div className="col-12 align-self-center">
                    <span className="font-weight-bold">{address.fullname}</span><br />
                    <span>{`${address.streetAddress1},`}</span><br />
                    <span>{`${address.city}, ${address.state} ${address.zipcode}`}</span><br />
                    <span>{address.phone}</span>
                  </div>
                </div>
              </li>
            )
        }
      </ul>
    </div>
  )
}