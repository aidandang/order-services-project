import React from 'react';

// dependencies
import { Link } from 'react-router-dom';

// firebase
import { signInWithGoogle } from '../../firebase/firebase.utils';

// components
import Button from '../button/button.component';

// ui settings
import './login-form.styles.css';
const liClassName = "list-group-item list-group-item-action bg-item-list-cs";

export default function LoginForm({ 
  formData, 
  formSubmit, 
  errors, 
  onInputChange, 
  buttonDisabled 
}) {
  return <>
    <form onSubmit={formSubmit}>
      <div className="row">
        <div className="col-lg-6">
          {/* Account Information Card */}
          <div className="card mt-3">
            <ul className="list-group list-group-flush">
              <li className={liClassName}>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="email">Email (*)</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        name="email" 
                        value={formData.email}
                        onChange={onInputChange} 
                      />
                      {errors.email.length > 0 ? <p className="mt-2 text-danger">{errors.email}</p> : null}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="password">Password (*)</label>
                      <input 
                        type="password" 
                        className="form-control" 
                        name="password" 
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
                  <div className="col-sm-6">
                    <div className="form-group">
                      <Link className="a-link-cs" to='/forgot-password'>Forgot Your Password?</Link>
                    </div>
                  </div>
                </div>
              </li>
              <li className={liClassName}>
                <div className="row mt-3">
                  <div className="col">
                    <div className="form-group">
                      {/* Submit button */}
                      <Button 
                        type='submit'
                        disabled={buttonDisabled}
                      >
                        Sign in
                      </Button>
                      <span className='mr-3'></span>
                      <Button  
                        onClick={e => {
                          e.preventDefault();
                          signInWithGoogle();
                        }}
                        isGoogleSignIn
                      >
                        <i className="fab fa-google text-light"></i><span className='mr-2'></span>Sign in with Google
                      </Button>
                      {/* End of submit button */}
                    </div>
                  </div>
                </div>
              </li>  

            </ul>
          </div>
          {/* End of Account Information Card */}
        </div>
      </div>
    </form>

  </>
}