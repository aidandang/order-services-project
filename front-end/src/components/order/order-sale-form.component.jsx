import React from 'react';

// components
import { strToAcct } from '../utils/strToAcct';
import { acctToStr } from '../utils/acctToStr';

const OrderSaleForm = ({
  formData,
  errors,
  onInputChange,
  order
}) => {

  const { items } = order;

  let sum = 0;

  const subTotalCalc = () => (qty, price) => {
    const value = strToAcct(price) * Number(qty);
    sum = sum + value;
    return acctToStr(value);
  }
  
  const subTotal = subTotalCalc();

  const total = (sum, shippingCost, saleTax) => {
    return acctToStr(sum + strToAcct(shippingCost, saleTax))
  }

  return <>
    {/* Item Table */}
    <div className="row mt-3">
      <div className="col">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Style#</th>
                <th scope="col">Item/Description</th>
                <th scope="col" className="text-right">Qty</th>
                <th scope="col" className="text-right">Sale Price</th>
                <th scope="col" className="text-right">Shipping</th>
                <th scope="col" className="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 &&
                items.map((item, index) => 
                  <tr 
                    key={index} 
                    className="table-row-no-link-cs span-link-cs"
                    onClick={e => {
                      e.preventDefault()
                    }}
                  >
                    <td>{item.product.styleCode}</td>
                    <td>{`${item.product.name}/Color:${item.color.color}/Size:${item.size}${item.note && `/${item.note}`}`}</td>
                    <td className="text-right">{item.qty}</td>
                    <td className="text-right">{item.salePrice.length > 0 ? item.salePrice : '.00'}</td>
                    <td className="text-right">{item.shippingPrice.length > 0 ? item.shippingPrice : '.00'}</td>
                    <th scope="row" className="text-right">
                      {subTotal(item.qty, item.salePrice, item.shippingPrice)}
                    </th>
                  </tr>
                ) 
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
    {/* End of Item Table */}
  </>
}

export default OrderSaleForm;