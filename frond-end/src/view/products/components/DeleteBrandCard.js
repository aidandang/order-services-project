import React from 'react';

// ui settings
const liClassName = "list-group-item bg-item-list-cs list-group-item-action";

export default function DeleteBrandCard({ 
  brand, 
  formSubmit, 
  pageActive, 
  title 
}) {
  return <>
    <form onSubmit={formSubmit}>
      <div className="row">
        <div className="col-6">
          <div className="card mt-3">
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
                      pageActive({ name: 'BRAND_LIST' }) 
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
                    Do you want to remove <span className="font-weight-bold">{brand.name}</span>?<br />
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