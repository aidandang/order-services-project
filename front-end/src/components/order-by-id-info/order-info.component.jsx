import React from 'react';

// dependencies
import uuid from 'react-uuid';
// components
import Button from '../button/button.component';
// ui settings
const liClassName = "list-group-item bg-item-list-cs list-group-item-action";

const OrderInfo = ({
  order
}) => {

  const { customer, shippingAddress } = order;

  return <>
    <div className="row">
      <div className="col-xl-8"> 
        <div className="card my-3">
          <div className="card-header bg-card-cs">
            <div className="row">
              <div className="col text-uppercase font-weight-bold align-self-center">
                Order Information
              </div>
            </div>
          </div>
          <ul className="list-group list-group-flush">
            {
              customer ? <>
                <li className={liClassName}>
                  <div className="row">
                    <div className="col">
                      <div className="row">
                        <div className="col-4">
                          <span>Nickname:</span>
                        </div>
                        <div className="col-8">
                          <span>{customer.nickname}</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <span>Account Number:</span>
                        </div>
                        <div className="col-8">
                          <span>{customer.account}</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <span>Billing Address:</span>
                        </div>
                        <div className="col-8">
                          <span>{customer.fullname}</span><br />
                          <span>{customer.streetAddress1}, {customer.city}, {customer.state}</span><br />
                          <span>Phone# {customer.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className={liClassName}>
                  <div className="row">
                    <div className="col">
                      <div className="row">
                        <div className="col-4">
                          <span>Shipping Address:</span>
                        </div>
                        <div className="col-8 align-self-center">
                          <div className="form-check">
                            <input className="form-check-input" type="radio" name="shippingAddress" id='billing' value='' defaultChecked={shippingAddress === ''} />
                            <label className="form-check-label" htmlFor='billing'>
                              Same as Billing Address
                            </label>
                          </div>
                          {
                            customer.shippingInfo && customer.shippingInfo.map(address => 
                              <div key={address._id} className="form-check">
                                <label className="form-check-label" htmlFor={address._id}>
                                  <input 
                                    className="form-check-input" 
                                    type="radio" 
                                    name="shippingAddress" 
                                    id={address._id} 
                                    value={address._id}
                                    defaultChecked={shippingAddress === address._id}
                                  />
                                  <span>{customer.fullname}</span><br />
                                  <span>{customer.streetAddress1}, {customer.city}, {customer.state}</span><br />
                                  <span>Phone# {customer.phone}</span>
                                </label>
                              </div>
                            )
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </>
              : <li className={liClassName}>
                <div className="row">
                  <div className="col">
                    <span>No information. Select a customer for the order.</span>
                  </div>
                </div>  
              </li>
            }
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
                    >
                      Submit
                    </Button>
                    <span className="mr-3"></span>
                    <Button
                      onClick={e => {
                        e.preventDefault();
                      }}
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>    
    </div>

    {/* Item Table */}
    <div className="row mt-3">
      <div className="col">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Style#/Color</th>
                <th scope="col">Item/Description</th>
                <th scope="col" className="text-right">Qty</th>
                <th scope="col" className="text-right">Price</th>
                <th scope="col" className="text-right">Sale Tax</th>
                <th scope="col" className="text-right">Local Charge</th>
                <th scope="col" className="text-right">Shipping Cost</th>
                <th scope="col" className="text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(order.items).length > 0
                ? order.items.map((item, index) => 
                  <tr key={uuid()} className="table-row-no-link-cs">
                    <td>{item.product.styleCode}/{item.color.color}</td>
                    <td>{`${item.product.name}/Size:${item.size}${item.note && `/${item.note}`}`}</td>
                    <td className="text-right">{item.qty}</td>
                    <td className="text-right">{item.price}</td>
                    <td className="text-right">{item.saleTax}</td>
                    <td className="text-right">{item.localCharge}</td>
                    <td className="text-right">{item.shippingCost}</td>
                    <th scope="row" className="text-right">--</th>
                  </tr>
                ) 
                :
                  <tr className="table-row-no-link-cs">
                    <td colSpan="8" className="text-center">No items. Add items for the order.</td>
                  </tr>
              }
              {
                Object.keys(order.items).length > 0 && <>
                  <tr className="table-row-no-link-cs">
                    <td className="text-right"></td>
                    <td className="text-right"></td>
                    <td className="text-right"></td>
                    <td className="text-right"></td>
                    <td colSpan="2" className="text-right">Subtotal</td>
                    <td className="text-right"></td>
                    <td className="text-right">--</td>
                  </tr>
                  <tr className="table-row-no-link-cs">
                    <td className="text-right"></td>
                    <td className="text-right"></td>
                    <td className="text-right"></td>
                    <td className="text-right"></td>
                    <td colSpan="2" className="text-right">Discount</td>
                    <td className="text-right"></td>
                    <td className="text-right">--</td>
                  </tr>
                  <tr className="table-row-no-link-cs">
                    <td className="text-right"></td>
                    <td className="text-right"></td>
                    <td className="text-right"></td>
                    <td className="text-right"></td>
                    <th scope="row" colSpan="2" className="text-right">Total</th>
                    <td className="text-right"></td>
                    <th scope="row" className="text-right">--</th>
                  </tr>
                </>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
    {/* End of Item Table */} 
  </>
}

export default OrderInfo;