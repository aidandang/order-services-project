import React from 'react';

// import dependencies
import uuid from 'react-uuid';

// import helpers
import { currencyMask } from '../../../utils/helpers';

// ui settings
import { liClassName } from '../../../state/actions/uiSettings';

const subTotal = (qty, price, saleTax, localCharge, shippingCost) => {
  const total = (
    qty.replace(/,/g, '')*100 
    * (price.replace(/,/g, '')*100 + saleTax.replace(/,/g, '')*100 + localCharge.replace(/,/g, '')*100 + shippingCost.replace(/,/g, '')*100)
    /100
  );
  const value = currencyMask(total.toString(), 60);

  return value;
}

// MAIN COMPONENT
export default function OrderDetails({
  order
}) {
  return <>
    <div className="row">

      {/* Customer Infomation */}
      <div className="col-md-6"> 
        <div className="card my-3">

          {/* Card Header */}
          <div className="card-header bg-card-cs">
            <div className="row">
              <div className="col text-uppercase font-weight-bold align-self-center">
                {order.customer ? `${order.customer.nickname} - ${order.customer.account}` : 'Customer Information'}
              </div>
            </div>
          </div>
          {/* End of Card Header */}

          {/* Card Body */}
          <ul className="list-group list-group-flush">
            <li className={liClassName}>
              <div className="row">
                <div className="col">
                  {order.customer 
                  ? <div>
                      <span className="font-weight-bold">Billing Address:</span><br />
                      <span>{order.customer.fullname}</span><br />
                      <span>{order.customer.streetAddress1}, {order.customer.city}, {order.customer.state}</span><br />
                      <span>Phone# {order.customer.phone}</span>
                    </div>
                  : <span>No information. Select a customer for the order.</span>}
                </div>
              </div>
            </li>
          </ul>
          {/* End of Card Body */}

        </div>             
      </div>
      {/* End of Customer Infomation */}

      {/* Shipping Infomation */}
      <div className="col-md-6"> 
        <div className="card my-3">

          {/* Card Header */}
          <div className="card-header bg-card-cs">
            <div className="row">
              <div className="col text-uppercase font-weight-bold align-self-center">ORDER INFORMATION</div>
            </div>
          </div>
          {/* End of Card Header */}

          {/* Card Body */}
          <ul className="list-group list-group-flush">
            <li className={liClassName}>
              <div className="row">
                <div className="col">
                  {order.address 
                  ? <div>
                      <span className="font-weight-bold">Shipping Address:</span><br />
                      <span>{order.address.fullname}</span><br />
                      <span>{order.address.streetAddress1}, {order.address.city}, {order.address.state}</span><br />
                      <span>Phone# {order.address.phone}</span>
                    </div>
                  : <span>No information. Select a customer for the order.</span>}
                </div>
              </div>
            </li>
          </ul>
          {/* End of Card Body */}

        </div>             
      </div>
      {/* End of Shipping Infomation */}  

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
              {order.items 
                ? order.items.map((item, index) => 
                  <tr key={uuid()} className="table-row-cs">
                    <td>{item.colorId}</td>
                    <td>{item.productId}</td>
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
                  <tr className="table-row-cs">
                    <td colSpan="8" className="text-center">No items. Add items for the order.</td>
                  </tr>
              }
              <tr>
                <td colSpan="8" className="text-center"></td>
              </tr>
              <tr className="table-row-cs">
                <td colSpan="3">Subtotal</td>
                <td className="text-right">0</td>
                <td className="text-right">0</td>
                <td className="text-right">0</td>
                <td className="text-right">0</td>
                <td className="text-right">0</td>
              </tr>
              <tr className="table-row-cs">
                <td colSpan="3">Discount</td>
                <td className="text-right"></td>
                <td className="text-right"></td>
                <td className="text-right"></td>
                <td className="text-right"></td>
                <td className="text-right">0</td>
              </tr>
              <tr className="table-row-cs">
                <th scope="row" colSpan="3">Total</th>
                <td className="text-right"></td>
                <td className="text-right"></td>
                <td className="text-right"></td>
                <td className="text-right"></td>
                <th scope="row" className="text-right">0</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    {/* End of Item Table */}                 
  </>
}