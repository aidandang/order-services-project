import React from 'react';

// ui settings
import { liClassName } from '../../../state/actions/uiSettings';

export default function SearchProductCard({ 
  formData, 
  formSubmit,  
  onInputChange,
  pageActive,
  page
}) {
  return <>
    <div className="card my-3">
      <div className="card-header bg-card-cs">
        <div className="row">
          <div className="col text-uppercase font-weight-bold">SEARCH FOR PRODUCTS</div>
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
                    id="search" 
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
                    <a href="" name="name" className="dropdown-item" onClick={formSubmit}>Name</a>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a href="" name="styleCode" className="dropdown-item" onClick={formSubmit}>Style</a>
                  </div>
                </div>
              </form>
              <small className="text-muted">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a 
                  href="#" 
                  className="a-link-cs"
                  onClick={e => {
                    e.preventDefault();
                    pageActive(page);
                  }}
                >
                  (+) Add a New Product 
                </a>
              </small>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </>
}