import React from 'react';

// ui settings
import { liClassName } from '../../../state/actions/uiSettings';

export default function DeleteColorCard({ 
  color, 
  formSubmit, 
  pageActive, 
  title 
}) {
  return <>
    <form onSubmit={formSubmit}>
      <div className="row">
        <div className="col-6">
          <div className="card my-3">
            <div className="card-header bg-card-cs">
              <div className="row">
                <div className="col text-uppercase font-weight-bold align-self-center">{title}</div>
                <div className="col text-right">
                  <a 
                    href="/" 
                    className="a-link-cs" 
                    name="colorList" 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      pageActive({ name: 'COLOR_LIST', id: '' }) 
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
                  <div className="col-12 align-self-center">
                    <span className="font-weight-bold">{color.color}</span>
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
                        className="btn btn-primary btn-custom"
                      >
                        Remove
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