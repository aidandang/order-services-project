import React from 'react';

// dependencies
import { Link, useLocation } from 'react-router-dom';

// ui settings
const liClassName = "list-group-item list-group-item-action bg-item-list-cs";

const ProductSearchForm = ({ 
  formData, 
  formSubmit,  
  onInputChange
}) => {

  const location = useLocation()

  return <>
    <div className="row">
      <div className="col">
        <div className="card my-3">
          <div className="card-header bg-card-cs">
            <div className="row">
              <div className="col text-uppercase font-weight-bold align-self-center">Search For Products</div>
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
                        <a href="" name="name" className="dropdown-item dropdown-item-cs" onClick={formSubmit}>Name</a>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="" name="styleCode" className="dropdown-item dropdown-item-cs" onClick={formSubmit}>Style</a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </li>

            <li className={liClassName}>
              <div className="row">
                <div className="col">
                  <Link 
                    to={`${location.pathname}?action=product-add`}
                    className="a-link-cs"
                  >
                    ( + ) Add a New Product
                  </Link>
                </div>
              </div>
            </li>

          </ul>
        </div>
      </div>
    </div>
  </>
}

export default ProductSearchForm;