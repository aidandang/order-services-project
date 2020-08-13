import React from 'react';

// import dependecies
import uuid from 'react-uuid';

// import containers, components, actions and settings
import { liClassName } from '../../../state/actions/uiSettings';

export default function EditProductForm({ 
  formSubmit,
  formData,  
  errors, 
  onInputChange, 
  buttonDisabled,
  pageActive,
  brands 
}) {
  return <>
    <form onSubmit={formSubmit}>
      <div className="row">
        <div className="col-12">

          {/* Product Information Card */}
          <div className="card my-3">

            <div className="card-header bg-card-cs">
              <div className="row">
                <div className="col text-uppercase font-weight-bold">EDIT PRODUCT</div>
                <div className="col text-right">
                  <a href="/" 
                    className="a-link-cs" 
                    name="generalInfo" 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      pageActive({
                        name: 'GENERAL_INFO', 
                        id: '' }) 
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
                      <label htmlFor="brandId">Brand (*)</label>
                      <select 
                        className="custom-select text-capitalize"
                        id="brandId"
                        value={formData.brandId ? formData.brandId : ""}
                        onChange={onInputChange}
                      >
                        <option value="">...</option>
                        {brands.map(brand => <option key={uuid()} value={brand._id}>{brand.name}</option>)}
                      </select>
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <small>Go to Brands tab for creating a new brand.
                      </small>
                      {errors.brandId.length > 0 ? <p className="mt-2 text-danger">{errors.brandId}</p> : null}
                    </div>
                  </div>
                </div>
              </li>

              <li className={liClassName}>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="name">Name (*)</label>
                      <input 
                        type="text"
                        className="form-control" 
                        id="name"
                        value={formData.name}
                        onChange={onInputChange}
                      />
                      <small>Name is required and should be unique.</small>
                      {errors.name.length > 0 ? <p className="mt-2 text-danger">{errors.name}</p> : null}
                    </div>
                  </div>
                </div>
              </li>

              <li className={liClassName}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="styleCode">Style Code (*)</label>
                      <input 
                        type="text"
                        className="form-control" 
                        id="styleCode"
                        value={formData.styleCode}
                        onChange={onInputChange}
                      />
                      <small>Style code is required.</small>
                      {errors.styleCode.length > 0 ? <p className="mt-2 text-danger">{errors.styleCode}</p> : null}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="sku">SKU</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="sku" 
                        value={formData.sku}
                        onChange={onInputChange}
                      />
                      <small>SKU can be scanned from the product label.</small>
                      {errors.sku.length > 0 ? <p className="mt-2 text-danger">{errors.sku}</p> : null}
                    </div>
                  </div>
                </div>
              </li>
              
              <li className={liClassName}>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="desc">Description</label>
                      <textarea 
                        type="text" 
                        className="form-control" 
                        id="desc" 
                        value={formData.desc}
                        onChange={onInputChange} 
                      />
                      <small>Copy a short description of the product in here.</small>
                      {errors.desc.length > 0 ? <p className="mt-2 text-danger">{errors.desc}</p> : null}
                    </div>
                  </div>
                </div>
              </li>

              <li className={liClassName}>
                <div className="row mt-3">
                  <div className="col">
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
          {/* End of Product Information Card */}

        </div>
      </div>
    </form>
  </>
}