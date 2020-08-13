import React from 'react';

// ui settings
import { liClassName } from '../../../state/actions/uiSettings';

export default function AddProductCard({
  pageActive
}) {
  return <>
    <div className="card my-3">
      <div className="card-header bg-card-cs">
        <div className="row">
          <div className="col text-uppercase font-weight-bold">ADD PRODUCT</div>
        </div>
      </div>
      <ul className="list-group list-group-flush">
        <li 
          className={`${liClassName} li-link-cs`}
          onClick={(e) => { 
            e.preventDefault(); 
            pageActive({ name: 'ADD_PRODUCT' }) 
          }}
        >
          <div className="row"> 
            <div className="col-12 align-self-center text-center">
              <span className="a-link-cs">Add a New Product (+)</span>
            </div>
          </div>
        </li> 
      </ul>
    </div>
  </>
}