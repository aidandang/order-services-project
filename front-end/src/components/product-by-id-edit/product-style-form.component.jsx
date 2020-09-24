import React from 'react';

// dependencies
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';
// ui settings
const liClassName = "list-group-item bg-item-list-cs list-group-item-action";

const ProductStyleForm = ({
  formSubmit,
  formData,
  errors, 
  onInputChange,
  brands
}) => {

  const location = useLocation();
  const queryObj = queryString.parse(location.search);
  const { type } = queryObj;

  return <>
    <form onSubmit={formSubmit}>
      <div className="row">
        <div className="col-12">
          <div className="card my-3">
            <div className="card-header bg-card-cs">
              <div className="row">
                <div className="col text-uppercase font-weight-bold">Product Style</div>
              </div>
            </div>
            <ul className="list-group list-group-flush">
              <li className={liClassName}>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label htmlFor="brandId">Brand (*)</label>
                      <select 
                        className="custom-select text-capitalize"
                        id="brandId"
                        value={formData.brandId ? formData.brandId : ""}
                        onChange={onInputChange}
                      >
                        <option value="">...</option>
                        {brands && brands.map(brand => <option key={brand._id} value={brand._id}>{brand.name}</option>)}
                      </select>
                      <small>
                        <Link to={`${location.pathname}?type=${type}&action=add-brand`} className="a-link-cs">(+) Add a New Brand</Link>
                      </small>
                      {errors.brandId.length > 0 ? <p className="mt-2 text-danger">{errors.brandId}</p> : null}
                    </div>
                  </div>

                  <div className="col-lg-6">
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
                  <div className="col-lg-6">
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
                  <div className="col-lg-6">
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
                      <label htmlFor="styleImage">Image URL (*)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="styleImage" 
                        value={formData.styleImage}
                        onChange={onInputChange} 
                      />
                      <small>Copy image hyperlink in here.</small>
                      {errors.styleImage.length > 0 ? <p className="mt-2 text-danger">{errors.styleImage}</p> : null}
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

            </ul>
          </div>
        </div>
      </div>
    </form>
  </>
}

export default ProductStyleForm;