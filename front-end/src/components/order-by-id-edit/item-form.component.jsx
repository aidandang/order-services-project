import React from 'react';

// dependencies
import * as Yup from "yup";
// components
import { useForm } from '../custom-hooks/use-form';
import Button from '../button/button.component';
// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOrderTemp } from '../../state/order/order.selectors';
import { addItemToOrder, removeItemFromOrder, updateItemToOrder, updateProductToItem } from '../../state/order/order.actions';
// ui settings
const liClassName = "list-group-item bg-item-list-cs list-group-item-action";

// set form schema
const formSchema = Yup.object().shape({
  size: Yup
    .string()
    .required(),
  qty: Yup
    .number()
    .moreThan(0)
    .required(),
  price: Yup
    .number()
    .moreThan(0)
    .required(),
  saleTax: Yup
    .number(),
  localCharge: Yup
    .number(),
  shippingCost: Yup
    .number(),
  note: Yup
    .string(),
  color: Yup
    .string()
    .required()
})

const ItemForm = ({
  orderTemp,
  addItemToOrder,
  updateItemToOrder,
  removeItemFromOrder,
  updateProductToItem
}) => {

  const { item, index } = orderTemp;

  // Check if brand name was deleted or not to avoid system crash for undefined error.
  let brandName = "N/A";
  if (item.product && item.product.brand && item.product.brand[0].preferredName.length > 0) brandName = item.product.brand[0].preferredName;

  const formState = {
    product: item.product || "",
    color: item.color || "",
    size: item.size || "",
    qty: item.qty || "",
    price: item.price || "",
    saleTax: item.saleTax || 0,
    localCharge: item.localCharge || 0,
    shippingCost: item.shippingCost || 0,
    note: item.note || ""
  };

  const initialErrorState = {
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
  ] = useForm(formState, initialErrorState, formSchema);

  const formSubmit = e => {
    e.preventDefault();
    const newItem = formData;
    if (index !== null) {
      updateItemToOrder(newItem, index)
    } else {
      addItemToOrder(newItem);
    }
  }

  const handleRemoveButton = e => {
    e.preventDefault();
    if (index !== null) {
      removeItemFromOrder(index)
    } else {
      updateProductToItem(null)
    }
  }

  return <>
    <form onSubmit={formSubmit}>
      <div className="row">
        <div className="col-xl-8"> 
          <div className="card my-3">
            <div className="card-header bg-card-cs">
              <div className="row">
                <div className="col text-uppercase font-weight-bold">Item Information</div>
              </div>
            </div>
            <ul className="list-group list-group-flush">
              <li className={liClassName}>
                <div className="row">
                  <div className="col-4 align-self-center"><span className="font-weight-bold">Name</span></div>
                  <div className="col-8">{item.product.name}</div>
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
                  <div className="col-8">{item.product.styleCode}</div>
                </div>
              </li>
              <li className={liClassName}>
                <div className="row">
                  <div className="col-4 align-self-center"><span className="font-weight-bold">Description</span></div>
                  <div className="col-8">{item.product.desc}</div>
                </div>
              </li>
              <li className={liClassName}>
                <div className="row">
                  <div className="col-4 align-self-center">
                    <span className="font-weight-bold">Color (*)</span>
                  </div>
                  <div className="col-8 align-self-center" onChange={onInputChange}>
                    {item.product.colors.map(color =>
                      <div key={color._id} className="form-check">
                        <label className="form-check-label" htmlFor={color._id}>
                          <input 
                            className="form-check-input" 
                            type="radio" 
                            name="color" 
                            id={color._id} 
                            value={color._id}
                            defaultChecked={item.color && item.color === color._id}
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
                      <label htmlFor="size">Size (*)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="size" 
                        value={formData.size}
                        onChange={onInputChange}
                      />
                      <small>Product's size.</small>
                      {errors.size.length > 0 ? <p className="mt-2 text-danger">{errors.size}</p> : null}
                    </div>
                  </div>
                  <div className="col-xl-3">
                    <div className="form-group">
                      <label htmlFor="qty">Qty (*)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="qty"
                        placeholder="0"
                        value={formData.qty}
                        onChange={onInputChange}
                      />
                      <small>Qty of that size.</small>
                      {errors.qty.length > 0 ? <p className="mt-2 text-danger">{errors.qty}</p> : null}
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="form-group">
                      <label htmlFor="price">Price (*)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="price"
                        placeholder="0"
                        value={formData.price}
                        onChange={onInputChange}
                      />
                      <small>Price per unit.</small>
                      {errors.price.length > 0 ? <p className="mt-2 text-danger">{errors.price}</p> : null}
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
                        name="saleTax"
                        value={formData.saleTax}
                        onChange={onInputChange}
                      />
                      <small>Sale tax per unit.</small>
                      {errors.saleTax.length > 0 ? <p className="mt-2 text-danger">{errors.saleTax}</p> : null}
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label htmlFor="localCharge">Local Charge</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="localCharge"
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
                        name="shippingCost"
                        value={formData.shippingCost}
                        onChange={onInputChange}
                      />
                      <small>Shipping cost per unit.</small>
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
                        name="note" 
                        value={formData.note}
                        onChange={onInputChange}
                      />
                      <small>Additional Note.</small>
                      {errors.note.length > 0 ? <p className="mt-2 text-danger">{errors.note}</p> : null}
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
                      <Button
                        type="submit"
                        disabled={buttonDisabled}
                      >
                        {item.color ? 'Update Item' : 'Add Item'}
                      </Button>
                      <span className="mr-3"></span>
                      <Button
                        onClick={handleRemoveButton}
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

const mapDispatchToProps = dispatch => ({
  addItemToOrder: item => dispatch(addItemToOrder(item)),
  updateItemToOrder: (item, index) => dispatch(updateItemToOrder(item, index)),
  removeItemFromOrder: (index) => dispatch(removeItemFromOrder(index)),
  updateProductToItem: (product) => dispatch(updateProductToItem(product))
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemForm);