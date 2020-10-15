import React from 'react';

// dependecies
import uuid from 'react-uuid';
// components
import { strToAcct } from '../utils/strToAcct';
import { acctToStr } from '../utils/acctToStr';
// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOrderTemp } from '../../state/order/order.selectors';
import { editOrderItem } from '../../state/order/order.actions';

const subTotal = (qty, price, saleTax, localCharge, shippingCost) => {
  const value = strToAcct(price, saleTax, localCharge, shippingCost)*Number(qty)
  return acctToStr(value);
}

const OrderItems = ({
  orderTemp,
  editOrderItem
}) => {

  const handleColor = (product, selectedColor) => {
    const result = product.colors.find(color => color._id === selectedColor);
    return result.color
  }

  return <>
    <div className="row mt-3">
      <div className="col">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Style#</th>
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
              {Object.keys(orderTemp.items).length > 0 && orderTemp.items.map((item, index) => 
                <tr 
                  key={uuid()} 
                  className="table-row-cs"
                  onClick={(e) => {
                    e.stopPropagation();
                    editOrderItem(item, index);
                  }}
                >
                  <td>{item.product.styleCode}</td>
                  <td>{`${item.product.name}/Color:${handleColor(item.product, item.color)}/Size:${item.size}${item.note && `/${item.note}`}`}</td>
                  <td className="text-right">{item.qty}</td>
                  <td className="text-right">{item.price}</td>
                  <td className="text-right">{item.saleTax}</td>
                  <td className="text-right">{item.localCharge}</td>
                  <td className="text-right">{item.shippingCost}</td>
                  <th scope="row" className="text-right">
                    {subTotal(item.qty, item.price, item.saleTax, item.localCharge, item.shippingCost)}
                  </th>
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
  editOrderItem: (item, index) => dispatch(editOrderItem(item, index))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderItems);