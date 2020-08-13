import React from 'react'

// set some long classNames 
const liClassName = "list-group-item bg-item-list-cs list-group-item-action";

export default function LoginForm({ formData, formSubmit, errors, onInputChange, buttonDisabled }) {
  return <>

    <form onSubmit={formSubmit}>
      <div className="row">
        <div className="col-xl-4 col-lg-5 col-md-6 col-sm-7">
          {/* Account Information Card */}
          <div className="card mt-3">
            <div className="card-header bg-card-cs">
              <div className="row">
                <div className="col text-uppercase font-weight-bold">Account Information</div>
              </div>
            </div>
            <ul className="list-group list-group-flush">
              <li className={liClassName}>
                
                <div className="row">
                  
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="email">Email (*)</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        value={formData.email}
                        onChange={onInputChange} 
                      />
                      {errors.email.length > 0 ? <p className="mt-2 text-danger">{errors.email}</p> : null}
                    </div>
                  </div>
                  
                </div>
              </li>
              <li className={liClassName}>
                <div className="row">
                <div className="col">
                    <div className="form-group">
                      <label htmlFor="password">Password (*)</label>
                      <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        value={formData.password}
                        onChange={onInputChange}
                      />
                      {errors.password.length > 0 ? <p className="mt-2 text-danger">{errors.password}</p> : null}
                    </div>
                  </div> 
                </div>
              </li>

            </ul>
          </div>
          {/* End of Account Information Card */}
        </div>
      </div>

      <div className="row">
        <div className="col my-4">
          {/* Submit button */}
          <button 
            type="submit" 
            className={`btn btn-${buttonDisabled ? "secondary btn-custom-disabled" : "primary btn-custom"}`}
            disabled={buttonDisabled}
          >
            Login
          </button>
          {/* End of submit button */}
        </div>
      </div>

    </form>

  </>
}