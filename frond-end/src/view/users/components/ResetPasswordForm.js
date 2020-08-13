import React from 'react'

// set some long classNames 
const liClassName = "list-group-item bg-item-list-cs list-group-item-action";

export default function ResetPasswordForm({ formData, formSubmit, errors, onInputChange, buttonDisabled }) {
  return <>

    <form onSubmit={formSubmit}>
      <div className="row">
        <div className="col-xl-4 col-lg-5 col-md-6 col-sm-7">
          {/* Account Information Card */}
          <div className="card mt-3">
            <div className="card-header bg-card-cs">
              <div className="row">
                <div className="col text-uppercase font-weight-bold">New Password</div>
              </div>
            </div>
            <ul className="list-group list-group-flush">
              <li className={liClassName}>
                <div className="row">
                <div className="col">
                    <div className="form-group">
                      <label htmlFor="password">New Password (*)</label>
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
              <li className={liClassName}>
                <div className="row">
                <div className="col">
                    <div className="form-group">
                      <label htmlFor="passwordConfirm">New Password Confirm (*)</label>
                      <input 
                        type="password" 
                        className="form-control" 
                        id="passwordConfirm" 
                        value={formData.passwordConfirm}
                        onChange={onInputChange}
                      />
                      {/* fixed bug of passwordConfirm matched with password but still show */}
                      {((errors.passwordConfirm.length > 0) && (buttonDisabled === true)) ? <p className="mt-2 text-danger">{errors.passwordConfirm}</p> : null}
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
            Submit
          </button>
          {/* End of submit button */}
        </div>
      </div>

    </form>

  </>
}