import React from 'react';

// ui settings
import { liClassName } from '../../../state/actions/uiSettings';

export default function AddAddressCard({
  pageActive
}) {
  return (
    <div className="card my-3">
      <div className="card-header bg-card-cs">
        <div className="row">
          <div className="col text-uppercase font-weight-bold">ADD ADDRESS</div>
        </div>
      </div>
      <ul className="list-group list-group-flush">
    
        <li className={liClassName}>
          <div className="row"> 
            <div className="col-12 align-self-center text-center">
              <a 
                href="/" 
                className="a-link-cs" 
                name="accountInfo" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  pageActive({ name: 'ADD_ADDRESS' }) 
                }}
              >
                (+) Add a New Address
              </a>
            </div>
          </div>
        </li> 

      </ul>
    </div>
  )
}