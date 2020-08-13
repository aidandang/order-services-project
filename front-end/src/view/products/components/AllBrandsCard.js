import React from 'react';

// ui settings
import { liClassName } from '../../../state/actions/uiSettings';

export default function AllBrandsCard({
  formSubmit,
  brand,
  brands,
  onInputChange,
  pageActive
}) {
  return (
    <div className="col-lg-6">
      <div className="card my-3">
        <div className="card-header bg-card-cs">
          <div className="row">
            <div className="col text-uppercase font-weight-bold">All Brands</div>
          </div>
        </div>

        <ul className="list-group list-group-flush">
          <li className={liClassName}>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="brand">Brand List</label>
                  <select 
                    className="custom-select text-capitalize"
                    id="brand"
                    value={brand}
                    onChange={onInputChange}
                  >
                    <option value="">...</option>
                    {brands.map(b=> <option key={b._id} value={b._id}>{b.name}</option>)}
                  </select>
                  <p className="mt-2">
                    <small>
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <a 
                        href="#" 
                        className="a-link-cs"
                        onClick={e => {
                          e.preventDefault();
                          pageActive({ name: 'ADD_BRAND'});
                        }}
                      >
                        (+) Add a New Brand 
                      </a>
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </li>
          {brand.length > 0 &&              
            <li className={liClassName}>
              <div className="row mt-3">
                <div className="col">
                  <div className="form-group">
                    {/* Submit button */}
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                      href="#"
                      className="btn btn-primary btn-custom mr-3"
                      name="EDIT_BRAND"
                      onClick={formSubmit}
                    >
                      Edit
                    </a>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                      href="#"
                      className="btn btn-primary btn-custom"
                      name="REMOVE_BRAND"
                      onClick={formSubmit}
                    >
                      Remove
                    </a>
                    {/* End of submit button */}
                  </div>
                </div>
              </div>
            </li>
          }  

        </ul>
      </div>
    </div>
  )
}