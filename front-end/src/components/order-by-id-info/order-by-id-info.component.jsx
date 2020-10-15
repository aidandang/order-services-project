import React from 'react';

// dependencies
import { useLocation } from 'react-router-dom';
import uuid from 'react-uuid';
import moment from 'moment';
// components
import Title from '../title/title.component';
import { strToAcct } from '../utils/strToAcct';
import { acctToStr } from '../utils/acctToStr';
// ui settings
const liClassName = "list-group-item bg-item-list-cs list-group-item-action";

const title = {
  name: 'Order Information',
  message: 'Detail information about the order. The information can be edited.',
}

const OrderByIdInfo = ({ order }) => {
  const orderTemp = {
    ...order,
    items: order.items.map(item => ({
      ...item,
      qty: String(item.qty),
      price: acctToStr(item.price),
      saleTax: acctToStr(item.saleTax),
      localCharge: acctToStr(item.localCharge),
      shippingCost: acctToStr(item.shippingCost)
    }))
  }

  let sum = 0;

  const total = () => (qty, price, saleTax, localCharge, shippingCost) => {
    const value = strToAcct(price, saleTax, localCharge, shippingCost) * Number(qty);
    sum = sum + value;
    return acctToStr(value);
  }
  
  const subTotal = total();

  const location = useLocation();
  const { customer, shippingAddress, orderNumber, createdAt } = orderTemp;

  title.button = {
    text: 'Edit',
    link: `${location.pathname}?type=edit`
  }

  const address = customer.shippingInfo.find(address => shippingAddress === address._id)

  return <>
    <Title title={title} />

    <div className="row">
      <div className="col"> 
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
              orderNumber && createdAt && <>
                <li className={liClassName}>
                  <div className="row">
                    <div className="col">
                      <div className="row">
                        <div className="col-4">
                          <span>Order Number:</span>
                        </div>
                        <div className="col-8">
                          <span>{orderNumber}</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <span>Created At:</span>
                        </div>
                        <div className="col-8">
                          <span>{moment(createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </>
            }
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
                          {
                            (shippingAddress === null || shippingAddress === '') 
                            ? 
                              <span>Same as Billing Address</span>
                            : <>
                              <span>{address.fullname}</span><br />
                              <span>{address.streetAddress1}, {address.city}, {address.state}</span><br />
                              <span>Phone# {address.phone}</span>
                            </>
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
              {Object.keys(orderTemp.items).length > 0
                ? orderTemp.items.map((item, index) => 
                  <tr key={uuid()} className="table-row-no-link-cs">
                    <td>{item.product.styleCode}/{item.color.color}</td>
                    <td>{`${item.product.name}/Size:${item.size}${item.note && `/${item.note}`}`}</td>
                    <td className="text-right">{item.qty}</td>
                    <td className="text-right">{item.price}</td>
                    <td className="text-right">{item.saleTax}</td>
                    <td className="text-right">{item.localCharge}</td>
                    <td className="text-right">{item.shippingCost}</td>
                    <th scope="row" className="text-right">
                      {subTotal(item.qty, item.price, item.saleTax, item.localCharge, item.shippingCost)}
                    </th>
                  </tr>
                ) 
                :
                  <tr className="table-row-no-link-cs">
                    <td colSpan="8" className="text-center">No items. Add items for the order.</td>
                  </tr>
              }
              {
                Object.keys(orderTemp.items).length > 0 && <>
                  <tr className="table-row-no-link-cs">
                    <td className="text-right"></td>
                    <td className="text-right"></td>
                    <td className="text-right"></td>
                    <td className="text-right"></td>
                    <td colSpan="2" className="text-right">Subtotals</td>
                    <td className="text-right"></td>
                    <td className="text-right">{acctToStr(sum)}</td>
                  </tr>
                  <tr className="table-row-no-link-cs">
                    <td className="text-right"></td>
                    <td className="text-right"></td>
                    <td className="text-right"></td>
                    <td className="text-right"></td>
                    <td colSpan="2" className="text-right">Discount</td>
                    <td className="text-right"></td>
                    <td className="text-right">.00</td>
                  </tr>
                  <tr className="table-row-no-link-cs">
                    <td className="text-right"></td>
                    <td className="text-right"></td>
                    <td className="text-right"></td>
                    <td className="text-right"></td>
                    <th scope="row" colSpan="2" className="text-right">Total</th>
                    <td className="text-right"></td>
                    <th scope="row" className="text-right">{acctToStr(sum)}</th>
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

export default OrderByIdInfo;