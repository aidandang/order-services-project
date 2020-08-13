import React from 'react';

// import ui settings
import { liClassName } from '../../../state/actions/uiSettings';

export default function AddBrandCard({
  pageActive
}) {
  return (
    <div className="col-lg-6">
      <div className="card my-3">
        <div className="card-header bg-card-cs">
          <div className="row">
            <div className="col text-uppercase font-weight-bold">Add Brand</div>
          </div>
        </div>
        <ul className="list-group list-group-flush">
      
          <li className={liClassName}>
            <div className="row"> 
              <div className="col-12 align-self-center text-center">
                <a 
                  href="/" 
                  className="a-link-cs" 
                  name="addBrand" 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    pageActive({
                      name: 'ADD_BRAND', 
                      id: '' }) 
                  }}
                >
                  Add a New Brand (+)
                </a>
              </div>
            </div>
          </li> 

        </ul>
      </div>
    </div>
  )
}