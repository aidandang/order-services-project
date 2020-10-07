import React from 'react';

// ui settings
const liClassName = "list-group-item list-group-item-action bg-item-list-cs";

const CustomerSearchForm = ({ 
  formData, 
  formSubmit,  
  onInputChange
}) => {
  return <>
    <div className="row">
      <div className="col-lg-6">
        <div className="card my-3">
          <div className="card-header bg-card-cs">
            <div className="row">
              <div className="col text-uppercase font-weight-bold align-self-center">Search For Customers</div>
            </div>
          </div>
          <ul className="list-group list-group-flush">
            <li className={liClassName}>
              <div className="row">
                <div className="col-12 py-3">
                  <form className="form-inline" onSubmit={formSubmit}>
                    <div className="form-group mr-3 mb-2">
                      <label htmlFor="search" className="sr-only">Search</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="search" 
                        placeholder="Search"
                        onChange={onInputChange}
                        value={formData.search}
                      />
                    </div>
                    <div className="dropdown">
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <a 
                        className="btn btn-outline-primary btn-outline-cs dropdown-toggle mb-2" 
                        href="/" 
                        role="button" 
                        id="dropdownMenuLink" 
                        data-toggle="dropdown" 
                        aria-haspopup="true" 
                        aria-expanded="false"
                      >
                        Search By
                      </a>
                      <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="" name="account" className="dropdown-item dropdown-item-cs" onClick={formSubmit}>Account</a>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="" name="phone" className="dropdown-item dropdown-item-cs" onClick={formSubmit}>Phone</a>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="" name="nickname" className="dropdown-item dropdown-item-cs" onClick={formSubmit}>Nickname</a>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="" name="fullname" className="dropdown-item dropdown-item-cs" onClick={formSubmit}>Fullname</a>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="" name="streetAddress1" className="dropdown-item dropdown-item-cs" onClick={formSubmit}>Address</a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </>
}

export default CustomerSearchForm;