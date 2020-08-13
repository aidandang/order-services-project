import React from 'react';

// ui settings
import { liClassName } from '../../../state/actions/uiSettings';

export default function BrandForm({ 
  formData, 
  formSubmit, 
  errors, 
  onInputChange, 
  buttonDisabled,
  pageActive,
  page,
  title
}) {
  return <>
    <form onSubmit={formSubmit}>
      <div className="row">
        <div className="col">

          {/* Add Brand Card */}
          <div className="card my-3">
            <div className="card-header bg-card-cs">
              <div className="row">
                <div className="col text-uppercase font-weight-bold align-self-center">{title}</div>
                <div className="col text-right">
                  <a 
                    href="/" 
                    className="a-link-cs" 
                    name="closePage" 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      pageActive(page) 
                    }}
                  >
                    Close
                  </a>
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
                        id="name"
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
                        id="preferredName" 
                        value={formData.preferredName}
                        onChange={onInputChange}
                      />
                      <small>Brand's preferred name if diffenrent. Copy the same brand name if not.</small>
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
                      <button 
                        type="submit" 
                        className={`btn btn-${buttonDisabled ? "secondary btn-custom-disabled" : "primary btn-custom"}`}
                        disabled={buttonDisabled}
                      >
                        Submit
                      </button>
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