import React from 'react';

// dependecies
import uuid from 'react-uuid';
// components
import { acctNumber } from '../utils/acctNumber';
import { acctToString } from '../utils/acctToString';
// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOrderTemp } from '../../state/order/order.selectors';
import { editOrderItem } from '../../state/order/order.actions';

const subTotal = (qty, price, saleTax, localCharge, shippingCost) => {
  const value = acctNumber(price, saleTax, localCharge, shippingCost) * qty;
  return acctToString(value);
}

const OrderItems = ({
  orderTemp,
  editOrderItem
}) => {
  return <>
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
                <th scope="col" className="text-right"></th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(orderTemp.items).length > 0 && orderTemp.items.map((item, index) => 
                <tr 
                  key={uuid()} 
                  className="table-row-cs"
                  onClick={(e) => {
                    e.stopPropagation();
                    editOrderItem(item);
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
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </>
}

const mapStateToProps = createStructuredSelector({
  orderTemp: selectOrderTemp
})

const mapDispatchToProps = dispatch => ({
  editOrderItem: product => dispatch(editOrderItem(product))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderItems);