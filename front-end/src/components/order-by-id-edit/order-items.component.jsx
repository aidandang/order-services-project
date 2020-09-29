import React, { useState } from 'react';

// dependecies
import uuid from 'react-uuid';
// components
import { acctNumber } from '../utils/acctNumber';
import { acctToString } from '../utils/acctToString';
import SelectProduct from './select-product.component';

const subTotal = (qty, price, saleTax, localCharge, shippingCost) => {
  const value = acctNumber(price, saleTax, localCharge, shippingCost) * qty;
  return acctToString(value);
}

const OrderItems = ({ 
  order
}) => {

  const [active, setActive] = useState(false);

  return <>
    {/* customer table */}
    <div className="row my-3">
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
                <th scope="col" className="text-right"></th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(order.items).length > 0 && order.items.map((item, index) => 
              <tr 
                key={uuid()} 
                className="table-row-cs"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
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
                <td 
                  className="text-right"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <span className="table-link-cs text-danger"><i className="fas fa-minus"></i></span>
                </td>
              </tr>)}
              <tr 
                className="table-row-cs" 
                onClick={(e) => {
                  e.preventDefault();
                  setActive(true)
                }}
              >
                <td colSpan="9" className="text-center"><span className="a-link-cs">Add a New Item (+)</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    {/* <!-- end of customer table --> */}
    { 
      active &&
      <SelectProduct />
    }
  </>
}

export default OrderItems;