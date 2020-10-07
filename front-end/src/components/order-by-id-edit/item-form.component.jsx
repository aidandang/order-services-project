import React from 'react';

// dependencies
import { Link } from 'react-router-dom';
import * as Yup from "yup";
// components
import { useForm } from '../custom-hooks/use-form';
import Button from '../button/button.component';
// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOrderTemp } from '../../state/order/order.selectors';
// ui settings
const liClassName = "list-group-item bg-item-list-cs list-group-item-action";

// set form schema
const formSchema = Yup.object().shape({
  size: Yup
    .string(),
  qty: Yup
    .string()
    .required(),
  price: Yup
    .string()
    .required(),
  saleTax: Yup
    .string(),
  localCharge: Yup
    .string(),
  shippingCost: Yup
    .string(),
  note: Yup
    .string(),
  product: Yup
    .object(),
  color: Yup
    .string()
    .required()
})

const ItemForm = ({
  orderTemp
}) => {

  const { product } = orderTemp;

  // Check if brand name was deleted or not to avoid system crash for undefined error.
  let brandName = "N/A";
  if (product && product.brand && product.brand[0].preferredName.length > 0) brandName = product.brand[0].preferredName;

  const formState = {
    product: {},
    color: "",
    size: "",
    qty: "",
    price: "",
    saleTax: "",
    localCharge: "",
    shippingCost: "",
    note: ""
  };

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled
  ] = useForm(formState, formState, formSchema);

  const formSubmit = e => {
    e.preventDefault();
  }

  return <>
    <form onSubmit={formSubmit}>
      <div className="row">
        <div className="col-xl-8"> 
          <div className="card my-3">
            <div className="card-header bg-card-cs">
              <div className="row">
                <div className="col text-uppercase font-weight-bold">Product Information</div>
              </div>
            </div>
            <ul className="list-group list-group-flush">
              <li className={liClassName}>
                <div className="row">
                  <div className="col-4 align-self-center"><span className="font-weight-bold">Name</span></div>
                  <div className="col-8">{product.name}</div>
                </div>
              </li>
              <li className={liClassName}>
                <div className="row">
                  <div className="col-4 align-self-center"><span className="font-weight-bold">Brand</span></div>
                  <div className="col-8">{brandName}</div>
                </div>
              </li>
              <li className={liClassName}>
                <div className="row">
                  <div className="col-4 align-self-center"><span className="font-weight-bold">Style No.</span></div>
                  <div className="col-8">{product.styleCode}</div>
                </div>
              </li>
              <li className={liClassName}>
                <div className="row">
                  <div className="col-4 align-self-center"><span className="font-weight-bold">Description</span></div>
                  <div className="col-8">{product.desc}</div>
                </div>
              </li>
              <li className={liClassName}>
                <div className="row">
                  <div className="col-4 align-self-center">
                    <span className="font-weight-bold">Color</span>
                  </div>
                  <div className="col-8 align-self-center" onChange={onInputChange}>
                    {product.colors.map(color =>
                      <div key={color._id} className="form-check">
                        <label className="form-check-label" htmlFor={color._id}>
                          <input 
                            className="form-check-input" 
                            type="radio" 
                            name="color" 
                            id={color._id} 
                            value={color._id}
                          />
                          <span>{color.color}</span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </li>
              <li className={liClassName}>
                <div className="row">
                  <div className="col-xl-3">
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
                    </div>
                  </div>
                  <div className="col-xl-3">
                    <div className="form-group">
                      <label htmlFor="qty">Qty (*)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="qty" 
                        name="integerInput"
                        value=""
                        onChange=""
                      />
                      <small>Qty of that size.</small>
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="form-group">
                      <label htmlFor="price">Price (*)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="price"
                        name="currencyInput"
                        value=""
                        onChange=""
                      />
                      <small>Price per unit.</small>
                    </div>
                  </div>
                </div>
              </li>
              <li className={liClassName}>
                <div className="row">
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label htmlFor="saleTax">Sale Tax</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="saleTax"
                        name="currencyInput" 
                        value=""
                        onChange=""
                      />
                      <small>Sale tax per unit.</small>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label htmlFor="localCharge">Local Charge</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="localCharge"
                        name="currencyInput" 
                        value=""
                        onChange=""
                      />
                      <small>Local charge per unit.</small>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label htmlFor="shippingCost">Shipping Cost</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="shippingCost"
                        name="currencyInput" 
                        value=""
                        onChange=""
                      />
                      <small>Shipping cost per unit.</small>
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
                        value=""
                        onChange=""
                      />
                      <small>Additional Note.</small>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>           
        </div>
        <div className="col-xl-4"> 
          <div className="card my-3">
            <div className="card-header bg-card-cs">
              <div className="row">
                <div className="col text-uppercase font-weight-bold">Action</div>
              </div>
            </div>
            <ul className="list-group list-group-flush">
              <li className={liClassName}>      
                <div className="row">
                  <div className="col mt-3">
                    <div className="form-group">
                      <Link 
                        to="/"
                        className="btn btn-primary btn-link text-light"
                      >
                        Next
                      </Link>
                      <span className="mr-3"></span>
                      <Button
                        onClick={e => {
                          e.preventDefault();
                        }}
                      >
                        Remove
                      </Button>
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

const mapStateToProps = createStructuredSelector({
  orderTemp: selectOrderTemp
})

export default connect(mapStateToProps)(ItemForm);