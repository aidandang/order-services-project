import React from 'react';

// dependencies
import { useLocation, Link } from 'react-router-dom';
import queryString from 'query-string';
import uuid from 'react-uuid';
// ui settings
const liClassName = "list-group-item bg-item-list-cs list-group-item-action";

const PreviewAddresses = ({
  addresses,
  setValues
}) => {

  const location = useLocation();

  const queryObj = queryString.parse(location.search);
  const { type } = queryObj;

  const removeAddress = (e, index) => {
    e.preventDefault();
    setValues(prevState => ({ 
      ...prevState,
      shippingAddress: prevState.shippingAddress.filter((address, idx) => idx !== index)
    }))
  } 

  return <>
    <div className="card my-3">
      <div className="card-header bg-card-cs">
        <div className="row">
          <div className="col text-uppercase font-weight-bold">Shipping Address</div>
        </div>
      </div>
      <ul className="list-group list-group-flush">
    
        <li className={liClassName}>
          <div className="row"> 
            <div className="col-12 align-self-center text-center">
              <Link 
                to={`${location.pathname}?type=${type}&action=add-color`} 
                className="a-link-cs"
              >
                (+) Add a New Address 
              </Link>
            </div>
          </div>
        </li>
        { 
          addresses.length > 0 &&
            addresses.map((address, index) => 
              <li key={uuid()} className={liClassName}>
                <div className="row"> 
                  <div className="col align-self-center text-center">
                    <span className="font-weight-bold">{address.fullname}</span><br />
                    <span>{`${address.streetAddress1},`}</span><br />
                    <span>{`${address.city}, ${address.state} ${address.zipcode}`}</span><br />
                    <span>{address.phone}</span>
                  </div>
                  <div className="col align-self-center">
                    <span className="on-click" onClick={e => removeAddress(e, index)}>Remove</span>
                  </div>
                </div>
              </li>
            )
        }  
      </ul>
    </div>
  </>
}

export default PreviewAddresses;