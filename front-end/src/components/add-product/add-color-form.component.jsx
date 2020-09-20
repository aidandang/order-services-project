import React from 'react';

// dependencies
import { Link, useLocation } from 'react-router-dom';
// components
import Button from '../button/button.component';
// ui settings
const liClassName = "list-group-item bg-item-list-cs list-group-item-action";

export default function AddColorForm({ 
  formSubmit, 
  formData, 
  errors, 
  onInputChange,
  buttonDisabled 
}) {

  const location = useLocation();

  return <>
    <form onSubmit={formSubmit}>
      <div className="row">
        <div className="col-12">
          <div className="card my-3">
            <div className="card-header bg-card-cs">
              <div className="row">
                <div className="col text-uppercase font-weight-bold align-self-center">Add Color</div>
                <div className="col text-right">
                  <Link 
                    to={location.pathname} 
                    className="a-link-cs"
                  >
                    Close
                  </Link>
                </div>
              </div>
            </div>
            <ul className="list-group list-group-flush">

              <li className={liClassName}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="color">Color (*)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="color" 
                        value={formData.color}
                        onChange={onInputChange}
                      />
                      <small>Copy and paste color from the product's website.</small>
                      {errors.color.length > 0 ? <p className="mt-2 text-danger">{errors.color}</p> : null}
                    </div>
                  </div>
                </div>
              </li>

              <li className={liClassName}>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="url">URL</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="url" 
                        value={formData.url}
                        onChange={onInputChange}
                      />
                      <small>Copy and paste url from the product's website.</small>
                      {errors.url.length > 0 ? <p className="mt-2 text-danger">{errors.url}</p> : null}
                    </div>
                  </div>
                </div>
              </li>

              <li className={liClassName}>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="image">Image</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="image" 
                        value={formData.image}
                        onChange={onInputChange}
                      />
                      <small>Copy and paste image address from the product's website.</small>
                      {errors.image.length > 0 ? <p className="mt-2 text-danger">{errors.image}</p> : null}
                    </div>
                  </div>
                </div>
              </li>

              <li className={liClassName}>      
                <div className="row">
                  <div className="col mt-3">
                    <div className="form-group">
                      {/* Submit button */}
                      <Button 
                        type="submit" 
                        disabled={buttonDisabled}
                      >
                        Add Color
                      </Button>
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