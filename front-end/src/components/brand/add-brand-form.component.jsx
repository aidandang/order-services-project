import React from 'react';

// dependencies
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';
// components
import Button from '../button/button.component';
// ui settings
const liClassName = "list-group-item bg-item-list-cs list-group-item-action";

export default function BrandForm({ 
  formData, 
  formSubmit, 
  errors, 
  onInputChange, 
  buttonDisabled
}) {

  const location = useLocation();

  const queryObj = queryString.parse(location.search);
  const { type } = queryObj;

  return <>
    <form onSubmit={formSubmit}>
      <div className="row">
        <div className="col">

          {/* Add Brand Card */}
          <div className="card my-3">
            <div className="card-header bg-card-cs">
              <div className="row">
                <div className="col text-uppercase font-weight-bold align-self-center">Add Brand</div>
                <div className="col text-right">
                  <Link 
                    to={`${location.pathname}?type=${type}`}
                    className="a-link-cs" 
                  >
                    Close
                  </Link>
                </div>
              </div>
            </div>
            <ul className="list-group list-group-flush">

              <li className={liClassName}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="name">Name (*)</label>
                      <input 
                        type="text"
                        className="form-control" 
                        name="name"
                        value={formData.name}
                        onChange={onInputChange}
                      />
                      <small>Name should be unique.</small>
                      {errors.name.length > 0 ? <p className="mt-2 text-danger">{errors.name}</p> : null}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="preferredName">Preferred Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="preferredName" 
                        value={formData.preferredName}
                        onChange={onInputChange}
                      />
                      <small>Preferred name for the brand.</small>
                      {errors.preferredName.length > 0 ? <p className="mt-2 text-danger">{errors.preferredName}</p> : null}
                    </div>
                  </div>
                </div>
              </li>

              <li className={liClassName}>      
                <div className="row">
                  <div className="col mt-3">
                    <div className="form-group">
                      {/* Submit button */}
                      <Button 
                        type="submit" 
                        disabled={buttonDisabled}
                      >
                        Add Brand
                      </Button>
                      {/* End of submit button */}
                    </div>
                  </div>
                </div>
              </li>
              
            </ul>
          </div>
          {/* End of Add Brand Card */}

        </div>
      </div>
    </form>
  </>
}