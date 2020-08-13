import React from 'react';

// ui settings
import { liClassName } from '../../../state/actions/uiSettings';

export default function ItemDetailsForm({ 
  formData, 
  formSubmit, 
  errors, 
  onInputChange, 
  buttonDisabled,
  product,
  color
}) {

  return <>
    <form onSubmit={formSubmit}>
      <div className="row">
        <div className="col-12">

          {/* Product Information Card */}
          <div className="card my-3">

            <div className="card-header bg-card-cs">
              <div className="row">
                <div className="col text-uppercase font-weight-bold">Item Description</div>
              </div>
            </div>

            <ul className="list-group list-group-flush">

              <li className={liClassName}>
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="productName">Item Name</label>
                      <input 
                        type="text"
                        className="form-control" 
                        id="productName"
                        placeholder={`${product.brand[0].preferredName} - ${product.name}`}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </li>
              <li className={liClassName}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="styleCode">Style Code</label>
                      <input 
                        type="text"
                        className="form-control" 
                        id="styleCode"
                        placeholder={product.styleCode}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="color">Color</label>
                      <input 
                        type="text"
                        className="form-control" 
                        id="color"
                        placeholder={color.color}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </li>

              <li className={liClassName}>
                <div className="row">
                  <div className="col-lg-2">
                    <div className="form-group">
                      <label htmlFor="size">Size</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="size" 
                        value={formData.size}
                        onChange={onInputChange}
                      />
                      <small>Product's size.</small>
                      {errors.size.length > 0 ? <p className="mt-2 text-danger">{errors.size}</p> : null}
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="form-group">
                      <label htmlFor="qty">Qty (*)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="qty" 
                        value={formData.qty}
                        onChange={onInputChange}
                      />
                      <small>Qty of that size.</small>
                      {errors.qty.length > 0 ? <p className="mt-2 text-danger">{errors.qty}</p> : null}
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label htmlFor="price">Price (*)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="price" 
                        value={formData.price}
                        onChange={onInputChange}
                      />
                      <small>Price per unit.</small>
                      {errors.price.length > 0 ? <p className="mt-2 text-danger">{errors.price}</p> : null}
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label htmlFor="saleTax">Sale Tax</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="saleTax" 
                        value={formData.saleTax}
                        onChange={onInputChange}
                      />
                      <small>Sale tax per unit.</small>
                      {errors.saleTax.length > 0 ? <p className="mt-2 text-danger">{errors.saleTax}</p> : null}
                    </div>
                  </div>
                </div>
              </li>

              <li className={liClassName}>
                <div className="row">
                
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label htmlFor="localCharge">Local Charge</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="localCharge" 
                        value={formData.localCharge}
                        onChange={onInputChange}
                      />
                      <small>Local charge per unit.</small>
                      {errors.localCharge.length > 0 ? <p className="mt-2 text-danger">{errors.localCharge}</p> : null}
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label htmlFor="shippingCost">Shipping Cost</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="shippingCost" 
                        value={formData.shippingCost}
                        onChange={onInputChange}
                      />
                      <small>ShippingCost per unit.</small>
                      {errors.shippingCost.length > 0 ? <p className="mt-2 text-danger">{errors.shippingCost}</p> : null}
                    </div>
                  </div>
                </div>
              </li>

              <li className={liClassName}>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="note">Note</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="note" 
                        value={formData.note}
                        onChange={onInputChange}
                      />
                      <small>Additional Note.</small>
                      {errors.note.length > 0 ? <p className="mt-2 text-danger">{errors.note}</p> : null}
                    </div>
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
                        className={`btn btn-${buttonDisabled ? "secondary btn-custom-disabled" : "primary btn-custom"}`}
                        disabled={buttonDisabled}
                      >
                        Save
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