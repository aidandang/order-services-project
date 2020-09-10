import React from 'react';

// components
import Button from '../button/button.component';

// ui settings
import './register-form.styles.css';
const liClassName = "list-group-item list-group-item-action bg-item-list-cs";

export default function RegisterForm({ 
  formData, 
  formSubmit, 
  errors, 
  onInputChange, 
  buttonDisabled 
}) {
  return <>
    <form onSubmit={formSubmit}>
      <div className="row">
        <div className="col-sx-12 col-sm-10 col-md-8 col-lg-6">
          {/* The Card */}
          <div className="card mt-3">
            <ul className="list-group list-group-flush">
              <li className={liClassName}>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="name">Display Name (*)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        value={formData.name}
                        onChange={onInputChange} 
                      />
                      {errors.name.length > 0 ? <p className="mt-2 text-danger">{errors.name}</p> : null}
                    </div>
                  </div>
                  <div className="col-sm-6">
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
                  <div className="col-sm-6">
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
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="passwordConfirm">Confirm Password (*)</label>
                      <input 
                        type="password" 
                        className="form-control" 
                        id="passwordConfirm" 
                        value={formData.passwordConfirm}
                        onChange={onInputChange}
                      />
                      {/* fixed bug of passwordConfirm matched with password but still show */}
                      {(errors.passwordConfirm.length > 0) && (formData.passwordConfirm !== formData.password) ? <p className="mt-2 text-danger">{errors.passwordConfirm}</p> : null}
                    </div>
                  </div>  
                </div>
              </li>
              <li className={liClassName}>
                <div className="row mt-3">
                  <div className="col-md-4">
                    <div className="form-group">
                      {/* Submit button */}
                      <Button buttonDisabled={buttonDisabled}>
                        Submit
                      </Button>
                      {/* End of submit button */}
                    </div>
                  </div>
                </div>
              </li>  

            </ul>
          </div>
          {/* End of the Card */}
        </div>
      </div>
    </form>

  </>
}