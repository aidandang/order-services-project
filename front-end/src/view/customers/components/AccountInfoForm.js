import React from 'react';

// ui setting
import { liClassName } from '../../../state/actions/uiSettings';

export default function AccountInfoForm({ 
  formData, 
  formSubmit, 
  errors, 
  onInputChange,
  pageActive, 
  buttonDisabled, 
  title 
}) {
  return <>
    <form onSubmit={formSubmit}>
      <div className="row my-3">
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-card-cs">
              <div className="row">
                <div className="col text-uppercase font-weight-bold align-self-center">{title}</div>
                <div className="col text-right">
                  <a 
                    href="/" 
                    className="a-link-cs" 
                    name="accountInfo" 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      pageActive({ name: 'GENERAL_INFO' }) 
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
                      <label htmlFor="email">Email</label>
                      <input 
                        type="email"
                        className="form-control" 
                        id="email"
                        value={formData.email}
                        onChange={onInputChange}
                      />
                      <small>Email is optional</small>
                      {errors.email.length > 0 ? <p className="mt-2 text-danger">{errors.email}</p> : null}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="nickname">Nickname</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="nickname" 
                        value={formData.nickname}
                        onChange={onInputChange}
                      />
                      <small>Nickname is required</small>
                      {errors.nickname.length > 0 ? <p className="mt-2 text-danger">{errors.nickname}</p> : null}
                    </div>
                  </div>
                </div>
              </li>

              <li className={liClassName}>
                <div className="row mt-3">
                  <div className="col-md-4">
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
        </div>
      </div>
    </form>                  
  </>
}